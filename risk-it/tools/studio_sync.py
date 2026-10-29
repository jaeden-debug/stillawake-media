#!/usr/bin/env python3
"""Generate Luau that mirrors src/ into an open Studio place (Rojo-equivalent layout, no Rojo needed).

Usage: python3 tools/studio_sync.py [max_chars_per_chunk]
Writes tools/out/sync_N.luau chunks; run each in Studio's command bar or via MCP execute_luau (Edit datamodel).
Mapping mirrors default.project.json:
  src/shared  -> ReplicatedStorage.RiskIt
  src/server  -> ServerScriptService.RiskItServer
  src/client  -> StarterPlayer.StarterPlayerScripts.RiskItClient
"""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPPING = [
    ("src/shared", 'game:GetService("ReplicatedStorage")', "RiskIt"),
    ("src/server", 'game:GetService("ServerScriptService")', "RiskItServer"),
    ("src/client", 'game:GetService("StarterPlayer"):WaitForChild("StarterPlayerScripts")', "RiskItClient"),
]

PRELUDE = """local function folder(parent, name)
\tlocal f = parent:FindFirstChild(name)
\tif not f then f = Instance.new("Folder"); f.Name = name; f.Parent = parent end
\treturn f
end
local function put(parent, name, class, source)
\tlocal s = parent:FindFirstChild(name)
\tif s and s.ClassName ~= class then s:Destroy(); s = nil end
\tif not s then s = Instance.new(class); s.Name = name; s.Parent = parent end
\ts.Source = source
end
local n = 0
"""


def long_string(text: str) -> str:
    level = 1
    while ("]" + "=" * level + "]") in text:
        level += 1
    eq = "=" * level
    return f"[{eq}[\n{text}]{eq}]"


def classify(filename: str):
    if filename.endswith(".server.luau"):
        return filename[: -len(".server.luau")], "Script"
    if filename.endswith(".client.luau"):
        return filename[: -len(".client.luau")], "LocalScript"
    return filename[: -len(".luau")], "ModuleScript"


def statements():
    out = []
    for src, service, top in MAPPING:
        base = os.path.join(ROOT, src)
        for dirpath, _, files in sorted(os.walk(base)):
            rel = os.path.relpath(dirpath, base)
            parts = [] if rel == "." else rel.split(os.sep)
            parent_expr = f'folder({service}, "{top}")'
            for p in parts:
                parent_expr = f'folder({parent_expr}, "{p}")'
            for f in sorted(files):
                if not f.endswith(".luau"):
                    continue
                name, cls = classify(f)
                with open(os.path.join(dirpath, f), encoding="utf-8") as fh:
                    text = fh.read()
                out.append(f'put({parent_expr}, "{name}", "{cls}", {long_string(text)})\nn += 1\n')
    return out


def main():
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else 60000
    outdir = os.path.join(ROOT, "tools", "out")
    os.makedirs(outdir, exist_ok=True)
    for f in os.listdir(outdir):
        os.remove(os.path.join(outdir, f))
    chunks, cur = [], ""
    for st in statements():
        if cur and len(cur) + len(st) > limit:
            chunks.append(cur)
            cur = ""
        cur += st
    if cur:
        chunks.append(cur)
    for i, body in enumerate(chunks, 1):
        with open(os.path.join(outdir, f"sync_{i}.luau"), "w", encoding="utf-8") as fh:
            fh.write(PRELUDE + body + f'return "chunk {i}/{len(chunks)}: " .. n .. " scripts"\n')
    print(f"{len(chunks)} chunk(s) in tools/out")


if __name__ == "__main__":
    main()
