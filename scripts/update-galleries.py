#!/usr/bin/env python3
"""Rebuild B's local photo manifest without evaluating JavaScript or changing photos."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import sys
from urllib.parse import quote, unquote


GALLERIES = {
    "aeroporto": ("Transfer aeroporto", "Airport transfers", "assets/novas/transferofc001.webp"),
    "corporativo": ("Transporte corporativo", "Corporate transportation", "assets/novas/corporativoofc001.webp"),
    "disposicao": ("Disposição executiva", "Chauffeur at disposal", "assets/novas/disposicao01.webp"),
    "eventos": ("Eventos", "Events", "assets/novas/eventos-experiencia-v2.webp"),
    "aviacao": ("Aviação Executiva & FBO", "EXECUTIVE AVIATION & FBO", "assets/novas/aviacao-executiva-fbo-v2.webp"),
    "hoteis": ("Hotéis", "Hotels", "assets/novas/hoteis-experiencia-v2.webp"),
    "receptivo": ("Receptivo Executivo", "Executive Meet & Greet", "assets/novas/receptivoexecutivoofc001.webp"),
    "assistants": ("Assistants & Secretaries", "Assistants & Secretaries", "assets/novas/assitantssecretariesofc001.webp"),
    "familyoffice": ("Family Office & Private Clients", "Family Office & Private Clients", "assets/novas/FAMILYOFFICE_PRIVATECLIENTS.webp"),
    "andre": ("André Gregório", "André Gregório", "assets/galerias/andre/retrato-escritorio-v2.webp"),
}
EXTENSIONS = {".png", ".webp", ".avif"}
# Keep previous public URLs available without returning retired portraits to the carousel.
RETIRED_GALLERY_FILES = {"andre": {"retrato-escritorio.webp", "retrato-terno.webp"}}
HEADER = """/* High Business Class — local photo galleries.
 * Rebuild: python3 scripts/update-galleries.py (from the project root).
 * Edit alt.pt / alt.en for accurate descriptions. Existing descriptions survive rebuilding.
 * related shares existing project photos across galleries without duplicating files.
 * fit (cover/contain) and position control framing without editing the source photo.
 * Keep the assignment as valid JSON: quoted keys, no trailing commas, no JS expressions.
 * No remote calls: this file also works when index.html is opened with file://.
 */
window.HBC_MEDIA = """


def read_existing(path: Path) -> dict:
    if not path.exists():
        return {}
    match = re.search(r"window\.HBC_MEDIA\s*=\s*(\{.*\})\s*;\s*$", path.read_text(encoding="utf-8"), re.DOTALL)
    if not match:
        raise ValueError(f"{path}: esperado window.HBC_MEDIA = {{ ... }}; com conteúdo JSON válido. Arquivo preservado.")
    value = json.loads(match.group(1))
    if not isinstance(value, dict) or not isinstance(value.get("galleries", {}), dict):
        raise ValueError(f"{path}: configuração de galerias inválida. Arquivo preservado.")
    return value


def sort_key(path: Path) -> list:
    return [int(part) if part.isdigit() else part.casefold() for part in re.split(r"(\d+)", path.name)]


def generic_alt(key: str, label_pt: str, label_en: str, position: int) -> dict:
    if key == "andre":
        return {"pt": f"André Gregório — fotografia {position}", "en": f"André Gregório — photo {position}"}
    return {"pt": f"{label_pt} — fotografia {position}", "en": f"{label_en} — photo {position}"}


def local_source(site: Path, value: str) -> str:
    if not isinstance(value, str) or not value.startswith("assets/") or any(char in value for char in "\\?#"):
        raise ValueError(f"Imagem relacionada precisa estar em assets/: {value!r}")
    path = Path(unquote(value))
    target = site / path
    if ".." in path.parts or path.suffix.casefold() not in EXTENSIONS or target.is_symlink() or not target.is_file() or not target.resolve().is_relative_to((site / "assets").resolve()):
        raise ValueError(f"Imagem relacionada inválida ou ausente: {value!r}")
    return quote(path.as_posix(), safe="/")


def slide_metadata(src: str, previous: dict, default_alt: dict) -> dict:
    alt = previous.get("alt")
    slide = {"src": src, "alt": alt if isinstance(alt, (dict, str)) else default_alt}
    if previous.get("fit") in {"cover", "contain"}:
        slide["fit"] = previous["fit"]
    if isinstance(previous.get("position"), str) and re.fullmatch(r"(?:center|top|bottom|left|right|\d{1,3}%)(?: (?:center|top|bottom|left|right|\d{1,3}%))?", previous["position"]):
        slide["position"] = previous["position"]
    return slide


def update(site: Path) -> dict:
    if not (site / "index.html").is_file():
        raise ValueError(f"Pasta de site inválida: {site}. index.html não encontrado.")
    destination = site / "media-config.js"
    existing = read_existing(destination)
    old_galleries = existing.get("galleries", {})
    manifest = {"interval": existing.get("interval", 5000), "galleries": {}}
    for key, (label_pt, label_en, fallback) in GALLERIES.items():
        if not (site / fallback).is_file():
            raise ValueError(f"Imagem inicial não encontrada: {site / fallback}. Nenhum manifesto foi alterado.")
        folder = site / "assets" / "galerias" / key
        folder.mkdir(parents=True, exist_ok=True)
        files = sorted((path for path in folder.iterdir() if path.is_file() and not path.is_symlink() and path.suffix.casefold() in EXTENSIONS and path.name not in RETIRED_GALLERY_FILES.get(key, set())), key=sort_key)
        old_entry = old_galleries.get(key, {})
        if not isinstance(old_entry, dict):
            old_entry = {}
        # The former combined Hotels & FBO service is now two separate services.
        if key == "hoteis" and old_entry.get("label") == {"pt": "Hotéis & FBO", "en": "Hotels & FBO"}:
            old_entry = {**old_entry, "label": {"pt": label_pt, "en": label_en}}
        old_slides = {
            slide["src"]: slide
            for slide in old_entry.get("slides", [])
            if isinstance(slide, dict) and isinstance(slide.get("src"), str)
        }
        related = old_entry.get("related", [])
        if not isinstance(related, list) or any(not isinstance(item, dict) for item in related):
            raise ValueError(f"{key}: related deve ser uma lista de fotos com src e alt.")
        related = [slide_metadata(local_source(site, item.get("src")), item, generic_alt(key, label_pt, label_en, i + 1)) for i, item in enumerate(related)]
        sources = [fallback] + [quote(path.relative_to(site).as_posix(), safe="/") for path in files] + [item["src"] for item in related]
        related_by_src = {item["src"]: item for item in related}
        slides = []
        for position, src in enumerate(dict.fromkeys(sources), start=1):
            old = old_slides.get(src, related_by_src.get(src, {}))
            slides.append(slide_metadata(src, old, generic_alt(key, label_pt, label_en, position)))
        manifest["galleries"][key] = {
            "label": old_entry.get("label", {"pt": label_pt, "en": label_en}),
            "slides": slides,
        }
        if related:
            manifest["galleries"][key]["related"] = related
    # Escaping avoids executable markup if someone later embeds this config into HTML.
    payload = json.dumps(manifest, ensure_ascii=False, indent=2).replace("<", "\\u003c").replace(">", "\\u003e").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    content = HEADER + payload + ";\n"
    temporary = destination.with_suffix(".js.tmp")
    temporary.write_text(content, encoding="utf-8")
    temporary.replace(destination)
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser(description="Atualiza fotos dos serviços e de André na versão B, sem alterar os arquivos das imagens.")
    parser.add_argument("--site", type=Path, default=Path(__file__).resolve().parents[1] / "versoes" / "evolucao", help="Pasta que contém index.html e assets (padrão: versoes/evolucao).")
    args = parser.parse_args()
    try:
        manifest = update(args.site.resolve())
    except (OSError, ValueError, TypeError) as error:
        print(f"Erro: {error}", file=sys.stderr)
        return 1
    for key, gallery in manifest["galleries"].items():
        count = len(gallery["slides"])
        print(f"{key}: {count} foto{'s' if count != 1 else ''} — {'carrossel habilitado' if count > 1 else 'imagem única preservada'}")
    print(f"Manifesto atualizado: {args.site.resolve() / 'media-config.js'}")
    print("Revise alt.pt e alt.en em media-config.js. Nenhuma imagem foi modificada.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
