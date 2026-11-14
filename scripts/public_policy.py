"""Shared allowlist and checks for the public repository and website assets."""
from __future__ import annotations

from pathlib import Path, PurePosixPath
import re
import struct
import xml.etree.ElementTree as ET


SITE = PurePosixPath("versoes/evolucao")
ROOT_FILES = frozenset({
    ".gitignore", "README.md", ".github/workflows/pages.yml",
    "scripts/build-release.py", "scripts/update-galleries.py",
    "scripts/public_policy.py", "scripts/check-public.py",
})
IMAGE_SUFFIXES = frozenset({".png", ".webp", ".avif", ".svg"})
_PRIVATE_DIRECTORIES = frozenset({"original", "originals", "originais", "raw", "private", "privado"})
_ORIGINAL_EXCEPTION = "hero-carro-original.png"
_FONT_LICENSE = re.compile(r"OFL(?:[-_][A-Za-z0-9_-]+)?\.txt\Z")


def _parts(value: str | Path | PurePosixPath) -> tuple[str, ...]:
    raw = str(value)
    if "\\" in raw or raw.startswith("/") or any(p in {"", ".", ".."} for p in raw.split("/")):
        return ()
    return PurePosixPath(raw).parts


def is_public_path(value: str | Path | PurePosixPath) -> bool:
    """Accept a project-relative file path; directories and absolute paths fail."""
    parts = _parts(value)
    if not parts:
        return False
    name = "/".join(parts)
    if name in ROOT_FILES:
        return True
    if parts[:2] != SITE.parts or any(part.startswith(".") for part in parts):
        return False
    relative = PurePosixPath(*parts[2:])
    if len(relative.parts) == 1:
        return relative.suffix in {".html", ".css", ".js"}
    if relative.parts[0] != "assets" or len(relative.parts) < 2:
        return False
    asset = PurePosixPath(*relative.parts[1:])
    lowered = [part.casefold() for part in asset.parts]
    if any("whatsapp" in part or part.startswith("readme") for part in lowered):
        return False
    if any(part in _PRIVATE_DIRECTORIES or part.startswith("original") for part in lowered[:-1]):
        return False
    if any(word in asset.name.casefold() for word in ("original", "originais")) and asset.as_posix() != _ORIGINAL_EXCEPTION:
        return False
    if asset.suffix in IMAGE_SUFFIXES:
        return True
    if asset.parts[0] == "fonts" and len(asset.parts) == 2:
        return asset.suffix == ".woff2" or bool(_FONT_LICENSE.fullmatch(asset.name))
    return False


def media_signature_error(path: Path) -> str | None:
    """Check actual media headers using only the Python standard library."""
    suffix = path.suffix.lower()
    if suffix not in IMAGE_SUFFIXES | {".woff2"}:
        return None
    with path.open("rb") as stream:
        header = stream.read(4096)
    if suffix == ".png":
        valid = len(header) >= 33 and header[:8] == b"\x89PNG\r\n\x1a\n" and header[12:16] == b"IHDR"
        if valid:
            valid = all(struct.unpack(">II", header[16:24]))
    elif suffix == ".webp":
        valid = len(header) >= 20 and header[:4] == b"RIFF" and header[8:12] == b"WEBP" and header[12:16] in {b"VP8 ", b"VP8L", b"VP8X"}
    elif suffix == ".avif":
        box_size = int.from_bytes(header[:4], "big")
        brands = [header[8:12]] + [header[i:i + 4] for i in range(16, min(box_size, len(header)), 4)]
        valid = len(header) >= 16 and header[4:8] == b"ftyp" and 16 <= box_size <= path.stat().st_size and bool({b"avif", b"avis"}.intersection(brands))
    elif suffix == ".woff2":
        valid = len(header) >= 48 and header[:4] == b"wOF2" and int.from_bytes(header[8:12], "big") == path.stat().st_size
    else:
        if path.stat().st_size > 2_000_000:
            return "SVG excede o tamanho aceito para inspeção"
        data = path.read_bytes()
        if re.search(br"<!DOCTYPE|<!ENTITY", data, re.I):
            return "SVG com declaração de entidade não é aceito"
        try:
            root = ET.fromstring(data)
            valid = root.tag in {"svg", "{http://www.w3.org/2000/svg}svg"}
        except ET.ParseError:
            valid = False
    return None if valid else f"conteúdo não corresponde ao formato {suffix}"


_SECRET_PATTERNS = {
    "chave privada": re.compile(r"-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----"),
    "token GitHub": re.compile(r"\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,})\b"),
    "credencial AWS": re.compile(r"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b"),
    "token de API": re.compile(r"\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}\b"),
    "token Slack": re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{20,}\b"),
    "conexão com senha": re.compile(r"\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis)://[^\s/:]+:[^\s/@]+@"),
    "atribuição de credencial": re.compile(r"(?im)^\s*[\"']?(?:api[_-]?key|access[_-]?token|secret[_-]?key|password|passwd|client[_-]?secret|auth[_-]?token|service[_-]?role[_-]?key)[\"']?\s*[:=]\s*[\"'][^\"'\n]{8,}[\"']"),
}


def secret_kinds(data: bytes) -> list[str]:
    """Return only detection categories; never return credential values."""
    if b"\0" in data:
        return []
    try:
        value = data.decode("utf-8")
    except UnicodeDecodeError:
        return []
    return [name for name, pattern in _SECRET_PATTERNS.items() if pattern.search(value)]
