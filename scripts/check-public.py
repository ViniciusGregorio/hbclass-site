#!/usr/bin/env python3
"""Inspect tracked and untracked public candidates without changing Git state."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import subprocess
import sys

from public_policy import is_public_path, media_signature_error, secret_kinds

ROOT = Path(__file__).resolve().parents[1]


def git_paths(*args: str) -> list[str]:
    result = subprocess.run(["git", "ls-files", *args, "-z"], cwd=ROOT, check=True, capture_output=True)
    return [name for name in result.stdout.decode("utf-8").split("\0") if name]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="Emitir relatório estruturado, sem valores de credenciais.")
    parser.add_argument("--list-denied", action="store_true", help="Listar em JSON os caminhos rastreados fora da lista pública; não altera o índice.")
    args = parser.parse_args()
    try:
        tracked = git_paths("--cached")
        untracked = git_paths("--others", "--exclude-standard")
        denied_tracked = sorted(name for name in tracked if not is_public_path(name))
        denied_untracked = sorted(name for name in untracked if not is_public_path(name))
        if args.list_denied:
            print(json.dumps(denied_tracked, ensure_ascii=False, indent=2))
            return 0
        findings = [{"path": name, "reason": "arquivo rastreado fora da lista pública"} for name in denied_tracked]
        findings.extend({"path": name, "reason": "arquivo não rastreado liberado pelo Git, mas fora da lista pública"} for name in denied_untracked)
        candidates = sorted(set(tracked + untracked))
        for name in candidates:
            if not is_public_path(name):
                continue
            path = ROOT / name
            if path.is_symlink() or any(parent.is_symlink() for parent in path.parents if parent != ROOT):
                findings.append({"path": name, "reason": "link simbólico não é permitido"})
                continue
            if not path.is_file():
                findings.append({"path": name, "reason": "arquivo rastreado ausente no disco"})
                continue
            error = media_signature_error(path)
            if error:
                findings.append({"path": name, "reason": error})
            for category in secret_kinds(path.read_bytes()):
                findings.append({"path": name, "reason": "possível credencial: " + category})
        report = {"ok": not findings, "tracked": len(tracked), "untracked": len(untracked), "deniedTracked": denied_tracked, "deniedUntracked": denied_untracked, "findings": findings}
        if args.json:
            print(json.dumps(report, ensure_ascii=False, indent=2))
        elif findings:
            print(f"Verificação pública: {len(findings)} pendência(s).")
            for finding in findings:
                print(f"- {finding['path']}: {finding['reason']}")
            print("Nenhum arquivo ou registro Git foi alterado. Valores de credenciais não são exibidos.")
        else:
            print(f"Verificação pública OK: {len(candidates)} arquivo(s), sem caminhos negados ou achados nos padrões examinados.")
        return 0 if not findings else 1
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        message = f"Não foi possível concluir a verificação ({type(error).__name__})."
        if args.json:
            print(json.dumps({"ok": False, "error": message}, ensure_ascii=False))
        else:
            print(message, file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
