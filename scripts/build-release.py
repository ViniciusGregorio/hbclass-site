#!/usr/bin/env python3
"""Prepare the public homepage with shared file and media checks; no deployment."""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from urllib.parse import unquote, urlsplit

from public_policy import is_public_path, media_signature_error, secret_kinds

ROOT = Path(__file__).resolve().parents[1]


def local_reference(value: str) -> bool:
    return bool(value and not value.startswith(("#", "//")) and not urlsplit(value).scheme)


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("src", "href", "data-src", "poster"):
            value = attrs.get(key, "")
            if local_reference(value):
                self.paths.append(value)
        srcset = attrs.get("srcset", "")
        if srcset and not srcset.startswith("data:"):
            self.paths.extend(item.split()[0] for item in srcset.split(",") if item.split() and local_reference(item.split()[0]))


def manifest_sources(value):
    if isinstance(value, dict):
        for key, item in value.items():
            if key in {"src", "image", "poster"} and isinstance(item, str) and local_reference(item):
                yield item
            else:
                yield from manifest_sources(item)
    elif isinstance(value, list):
        for item in value:
            yield from manifest_sources(item)


def verify_references(folder: Path) -> int:
    """Verify HTML, CSS, gallery manifest and literal JS asset references."""
    references = []
    for path in folder.glob("*.html"):
        parser = References()
        parser.feed(path.read_text(encoding="utf-8"))
        references.extend((path, value) for value in parser.paths)
    for path in folder.glob("*.css"):
        css = path.read_text(encoding="utf-8")
        for match in re.finditer(r"url\(\s*(['\"]?)(.*?)\1\s*\)", css):
            if local_reference(match.group(2)):
                references.append((path, match.group(2)))
    manifest = folder / "media-config.js"
    if manifest.is_file():
        match = re.search(r"window\.HBC_MEDIA\s*=\s*(\{.*\})\s*;\s*$", manifest.read_text(encoding="utf-8"), re.S)
        if not match:
            raise RuntimeError("Manifesto de mídia inválido; esperado objeto JSON em window.HBC_MEDIA.")
        references.extend((manifest, value) for value in manifest_sources(json.loads(match.group(1))))
    for path in folder.glob("*.js"):
        for match in re.finditer(r"[\"']?(?:src|image|poster)[\"']?\s*:\s*[\"'](assets/[^\"']+)[\"']", path.read_text(encoding="utf-8")):
            references.append((path, match.group(1)))
    missing = []
    for owner, value in references:
        local = unquote(urlsplit(value).path)
        if not local:
            continue
        target = ((folder / local.lstrip("/")) if local.startswith("/") else (owner.parent / local)).resolve()
        valid = target.is_relative_to(folder) and (target.is_file() or (target / "index.html").is_file())
        if not valid:
            missing.append(f"{owner.relative_to(folder)}: {value}")
    if missing:
        raise RuntimeError("Recursos locais ausentes ou fora da publicação: " + "; ".join(sorted(set(missing))))
    return len(references)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--version", required=True, choices=("evolucao",))
    parser.add_argument("--output", default="dist")
    parser.add_argument("--domain", default="hbclass.com.br")
    args = parser.parse_args()
    if len(args.domain) > 253 or any(not re.fullmatch(r"[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?", label) for label in args.domain.split(".")):
        parser.error("Use somente o hostname do domínio, sem protocolo ou caminho.")
    source = ROOT / "versoes" / args.version
    output = (ROOT / args.output).resolve()
    if not output.is_relative_to(ROOT) or output == ROOT or output.relative_to(ROOT).parts[0] not in {"dist", "release"}:
        parser.error("A saída deve ficar em dist/ ou release/, separada dos arquivos de origem.")
    marker = output / ".hbc-release.json"
    if output.exists() and not marker.is_file():
        parser.error("A pasta de saída já existe e não foi gerada por este script.")
    subprocess.run([sys.executable, str(ROOT / "scripts/update-galleries.py"), "--site", str(source)], check=True)
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = Path(tempfile.mkdtemp(prefix=".hbc-build-", dir=output.parent)).resolve()
    copied = 0
    excluded = 0
    try:
        for path in sorted(source.rglob("*")):
            if not path.is_file() and not path.is_symlink():
                continue
            relative = path.relative_to(ROOT)
            if not is_public_path(relative):
                excluded += 1
                continue
            if path.is_symlink() or any(parent.is_symlink() for parent in path.parents if parent != ROOT):
                raise RuntimeError(f"Arquivo público deve ser real, sem link simbólico: {relative}")
            error = media_signature_error(path)
            if error:
                raise RuntimeError(f"{relative}: {error}")
            categories = secret_kinds(path.read_bytes())
            if categories:
                raise RuntimeError(f"{relative}: possível credencial ({', '.join(categories)}); valores não exibidos.")
            target = temporary / path.relative_to(source)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(path, target)
            copied += 1
        index = temporary / "index.html"
        html = index.read_text(encoding="utf-8")
        if '<link rel="canonical"' not in html:
            html = html.replace("</head>", f'<link rel="canonical" href="https://{args.domain}/"></head>')
        index.write_text(html, encoding="utf-8")
        (temporary / ".nojekyll").write_text("", encoding="utf-8")
        (temporary / "CNAME").write_text(args.domain + "\n", encoding="utf-8")
        (temporary / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: https://{args.domain}/sitemap.xml\n", encoding="utf-8")
        (temporary / "sitemap.xml").write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
            f"<url><loc>https://{args.domain}/</loc></url></urlset>\n", encoding="utf-8")
        references = verify_references(temporary)
        (temporary / ".hbc-release.json").write_text(json.dumps({"version": args.version, "domain": args.domain, "files": copied, "references": references}, indent=2) + "\n", encoding="utf-8")
        if output.exists():
            shutil.rmtree(output)
        temporary.replace(output)
    finally:
        if temporary.exists():
            shutil.rmtree(temporary)
    print(f"Versão {args.version} preparada em {output.relative_to(ROOT)}/: {copied} arquivos públicos, {excluded} excluídos e {references} referências verificadas. Nenhum deploy ou DNS alterado.")


if __name__ == "__main__":
    main()
