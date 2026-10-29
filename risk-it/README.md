# RISK IT!

A StillAwake Media Roblox experience: walk up, risk it, get launched, try again.
Eight 5–20 second challenges on neon islands over a synthwave void, plus THE VAULT (cosmetic fail
trails and launch bursts bought with GUTS). Fail and you're ragdolled into
orbit with a headline. Win and you bank GUTS, medals and personal bests.

Docs: [Master plan](docs/MASTER_PLAN.md) · [Checklist](docs/PROGRESS_CHECKLIST.md) ·
[Architecture](docs/ARCHITECTURE.md) · [Research & decisions](docs/RESEARCH_AND_DESIGN_DECISIONS.md) ·
[Test plan](docs/TEST_PLAN.md) · [Playtest findings](docs/PLAYTEST_FINDINGS.md) ·
[Release checklist](docs/RELEASE_CHECKLIST.md)

## Getting the code into Studio

With Rojo (recommended once installed): `rojo serve` and connect the Rojo plugin.

Without Rojo (what was used during development):

1. Open a blank Baseplate. In Properties set **Lighting → Technology = Future**.
2. Run `tools/place_setup.luau` in the command bar (sets FallenPartsDestroyHeight, removes the baseplate).
3. `python3 tools/studio_sync.py` → writes `tools/out/sync_*.luau`; run each chunk in the command bar
   (or serve `tools/out` on localhost and fetch it, which is how the MCP workflow does it).
4. Press Play.

## Testing

`tools/tests/regression.client.luau` is an end-to-end bot that plays every challenge through the real
remotes and prints PASS/FAIL. Run it on the Client during a playtest. Details in
[TEST_PLAN](docs/TEST_PLAN.md).
