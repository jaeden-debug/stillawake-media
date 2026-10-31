---
title: "How to Make a Roblox Game With AI Agents (Our Workflow)"
date: "2026-10-31"
updated: "2026-10-31"
excerpt: "How we build Stillskin Forest on Roblox with AI coding agents: one moderator, seven specialists, shared contracts, one owner per script and evidence-only testing."
category: "Game Development"
featured: false
author: "Jaeden Doody"
image: "/games/stillskin-forest/branding/stillskin-forest-hero.webp"
ogImage: "/games/stillskin-forest/branding/stillskin-forest-social.jpg"
faqSchema: true
howTo: "The method, step by step"
---

> **Definition.** A *moderator-led multi-agent workflow* is a way to build software with several AI coding agents at once. One coordinating agent, the moderator, is the only one that talks to the human owner. It turns decisions into owned tasks, routes every change between agents, and keeps a written record of what is built, tested, blocked and approved.

We used this workflow on 31 October 2026 to overhaul [Stillskin Forest](/games/stillskin-forest), our co-op zombie survival-horror game on Roblox, three days after it went public on 28 October 2026. One moderator session coordinated seven specialist [Claude Code](https://www.anthropic.com/claude-code) sessions, all working on the same live Roblox place at the same time. This article is the full method: the roles, the documents, the rules, the templates we actually used, a timeline of the day, what broke, and when you shouldn't do this at all.

*By Jaeden Doody · Published 31 October 2026 · Last updated and last verified 31 October 2026.*

<figure>
  <img src="/games/stillskin-forest/branding/stillskin-forest-hero.webp" alt="Survivors with headlamps on a forest trail at dusk in Stillskin Forest" width="2560" height="1440" loading="lazy" />
  <figcaption>Stillskin Forest, the Roblox game this workflow was built around.</figcaption>
</figure>

## Contents

- [Key takeaways](#key-takeaways)
- [Terms used in this article](#terms-used-in-this-article)
- [Why one AI agent wasn't enough](#why-one-ai-agent-wasnt-enough)
- [The method, step by step](#the-method-step-by-step)
- [Roles: who does what](#roles-who-does-what)
- [The shared documents](#the-shared-documents)
- [The status ladder](#the-status-ladder)
- [Ownership: one owner per script](#ownership-one-owner-per-script)
- [Contracts before code](#contracts-before-code)
- [One editor, one lock](#one-editor-one-lock)
- [Testing in three tiers](#testing-in-three-tiers)
- [Honesty rules](#honesty-rules)
- [Human approvals](#human-approvals)
- [The feedback loop](#the-feedback-loop)
- [Templates you can copy](#templates-you-can-copy)
- [A timeline of the day](#a-timeline-of-the-day)
- [Failure modes and the fixes we used](#failure-modes-and-the-fixes-we-used)
- [When not to use this approach](#when-not-to-use-this-approach)
- [FAQ](#faq)
- [Conclusion](#conclusion)
- [About the author](#about-the-author)

## Key takeaways

- **One voice to the owner.** The owner talks only to the moderator. Seven agents never ask the owner seven versions of the same question.
- **Ownership beats coordination.** Every script has exactly one owning agent. Changes to someone else's script are requested, not made.
- **Contracts come first.** The interfaces between systems were written and versioned before any agent built against them. Ours went from v1 to v1.3 in a day.
- **"Verified" needs evidence.** A task is only verified when a test was executed and its result recorded. Everything else is "implemented" or "testing".
- **Shared tools need a lock.** One Roblox Studio editor, one holder at a time, 10 to 20 minutes per hold.
- **Humans keep the decisions.** Design choices, security fixes, population caps and anything hard to undo waited for the owner's explicit approval.
- **Label every number.** Studio measurements were labelled "Studio, not PS4". Estimates were labelled as estimates with a confidence level. Nothing measured on a device nobody had was ever claimed.

## Terms used in this article

**Owner.** The human who owns the game and makes product decisions. In this article, that's me.

**Moderator.** The coordinating AI session. It plans, routes, tracks, runs multiplayer QA, and is the only session that talks to the owner.

**Specialist agent.** An AI coding session with one area of the game, such as combat or the economy. It builds, tests its own work, and reports to the moderator.

**Contract.** A short written agreement about an interface between two systems: who owns it, who uses it, and the shape of the data.

**Task.** One unit of work with an ID, a priority, an owner, dependencies and acceptance criteria.

**Lock.** A text file that says which agent may drive the shared editor right now, with a queue for everyone else.

**Published.** Live in the game players can join. Built-but-unpublished work never appears on the website as if it were live.

## Why one AI agent wasn't enough

We didn't start with eight agents. From 24 October, Stillskin Forest was built by Claude Code sessions working alongside a separate Codex agent, which owned the Dread hiding encounter and a set of presentation modules. Even with two agents, the coordination lived in shared files: an ownership registry that said which agent owned which script, an integration queue for changes that crossed that line, written contracts, and a lock for the Studio editor. That week produced the town, the asylum, the zombie AI, the lobby, the loot and the economy.

It also showed the limit of a few sessions doing everything. The project's own state document grew to well over 1,500 lines of dated changes. A session holding all of it at once spent real time re-reading, re-checking, and switching between a combat bug, a map edit and a shop price in the same hour. The limit wasn't skill. It was attention and context.

On 31 October we took the same file-based coordination one step further. For the first time, one moderator ran seven specialist agents in parallel.

The overhaul on 31 October had more parallel work than one session could hold. It covered an inventory that the HUD could trust, combat events that fired once per kill, a reward pipeline, a new trader, new map areas, saved sessions with friends, a security audit, PS4 performance and the website. Most of those systems touch each other. The question wasn't whether to split the work. It was how to split it without seven agents breaking each other's code.

The answer was more organisation, not a smarter prompt. We kept the ownership registry, contracts and lock that had worked for two agents, and added one coordinator and a rule that nothing counts until it's tested.

## The method, step by step

1. **Put one moderator between the owner and the agents.** The owner talks only to the moderator. It turns decisions into tasks, routes them to the right agent, and reports back in plain language.
2. **Write the architecture and ownership table first.** Before any task starts, every script in the game is assigned to exactly one agent, and shared configuration is split into one named section per owner.
3. **Write the contracts before the code.** Agree each interface between systems, give it an owner and a version, and only then let agents build against it in parallel.
4. **Turn the work into tasks with acceptance criteria.** Each task gets an ID, priority, owner, dependencies and a testable definition of done, on one master checklist.
5. **Serialise access to anything shared.** Use a lock file for the single editor, back up every script before editing, and patch with atomic read-modify-write edits.
6. **Test in three tiers.** Agents smoke-test their own work solo; the moderator runs batched multiplayer QA; anything only a human can judge goes on a separate owner list.
7. **Enforce honesty rules.** "Verified" requires an executed test and recorded evidence; estimates and Studio-only numbers are labelled as such.
8. **Route risky decisions to the owner.** Security fixes, design changes, caps and anything hard to undo wait for an explicit yes.
9. **Close the loop after every task.** Each agent reports done, files changed, tests with evidence, blockers and next; the moderator updates the record and unblocks dependents.
10. **Publish only from the record.** The game is published by the moderator after the gates pass and the owner says so, and the website is updated only from changelog rows marked published.

## Roles: who does what

| Role | Owns | Reports to |
|---|---|---|
| Owner (human) | Product decisions, approvals, device and feel checks | — |
| Moderator | Plan, master checklist, contracts, routing, multiplayer QA, publishing | Owner |
| Gameplay agent | Combat, weapons, inventory, items | Moderator |
| World agent | Map, regions, zombie AI and encounters | Moderator |
| Economy agent | Rewards, saving and sessions, achievements, the trader | Moderator |
| Interface agent | HUD, menus, sleep, map screen, client performance | Moderator |
| Security and QA agent | Independent exploit audit, then the multi-client QA queue | Moderator |
| Website agent | The public website, the game wiki, SEO | Moderator |
| Performance agent | PS4 performance analysis, then world polish | Moderator |

Two things about this table matter more than the role names.

First, the split follows the code, not the feature list. A "new trader" feature touched three owners: the world agent built the station, the economy agent built the buying logic, and the gameplay agent supplied the items. The trader contract told each of them where their part ended.

Second, the security agent built nothing. It's a separate session whose only job was to look for ways to cheat the game, which is why it found things the builders missed. When its audit was done, it took over the multiplayer test queue, so the same independent eye checked the fixes.

## The shared documents

AI sessions don't share memory. They share files. Every agent reads the same small set of documents at the start of a task and writes to them when it finishes. These are the ones we used:

- **Architecture and rules.** How the project is set up, the working rules every agent follows, and the ownership table.
- **Master checklist.** Every task in one table: ID, priority, owner, dependencies, task, acceptance criteria, status.
- **Shared contracts.** Every interface between systems, with owner, consumers and version history.
- **One task file per agent.** The agent's queue, plus the test procedure and evidence for each task it touches.
- **Integration log.** One line per change that landed: date, who, task ID, what, evidence.
- **Test results.** One line per executed test: what was set up, how it was run, and PASS, FAIL or INCONCLUSIVE.
- **Blockers.** What's stuck, what would unblock it, and who owns the unblock.
- **QA queue.** Multiplayer test steps waiting for a batch, with pass criteria.
- **Player-facing changelog.** One plain-language line per change players will see, with a status the moderator sets to "published" only after the game is published.

The rule that makes these useful: **if it isn't written down, it didn't happen.** An agent's chat reply saying "done" changes nothing. A checklist status, a test-results line and an integration-log line do.

## The status ladder

Every task moves through the same states. The moderator owns the checklist; agents propose status changes in their reports.

| Status | Meaning | Who can set it |
|---|---|---|
| NOT_STARTED | In the queue, nobody working on it | Moderator |
| IN_PROGRESS | An agent is building it | Owning agent |
| IMPLEMENTED | Built in the editor, not yet tested in play | Owning agent |
| TESTING | Solo test passed; waiting for multiplayer QA or an owner check | Owning agent, with evidence |
| VERIFIED | Every acceptance test executed and recorded | Moderator, from the test log |
| BLOCKED | Can't move until something else happens | Anyone, with the unblock named |

The distinction between IMPLEMENTED and VERIFIED is the whole point. On the day, an agent changed a task from TESTING back to IMPLEMENTED after finding that its own test had run against the wrong copy of a module. That's the system working. A status went down because the evidence didn't hold.

## Ownership: one owner per script

The fastest way to break a game with several agents is two of them editing the same script. So every script in Stillskin Forest has exactly one owning agent, listed in the ownership table. The combat code belongs to the gameplay agent, the zombie AI to the world agent, the reward code to the economy agent, the HUD to the interface agent.

When an agent needs a change in a script it doesn't own, it writes the request down and sends it through the moderator, who routes it to the owner. A real example: the reward pipeline needed the Freeze Device to report its hits like every other weapon. The economy agent couldn't add that line itself, because the freeze code belongs to the world agent. The request went through the moderator, the world agent added the event, and the economy agent consumed it.

Shared configuration was handled the same way. The game's main config module was split into named sections, one per owner. An agent may edit its own section and nothing else. That one rule removed a whole class of bug where one agent's change silently reverted another's numbers.

New ownership questions came up all day, for example a third-party script nobody had claimed, or a new module that didn't exist when the table was written. The moderator settled each one and appended it to the ownership table, so the answer was on record for every later task.

## Contracts before code

Before anyone wrote overhaul code, the moderator wrote the contracts. Each one fits on half a page:

- **Who owns it**, meaning who is allowed to change the implementation.
- **Who consumes it**, meaning who will break if it changes.
- **The shape**: function names, event payloads, attribute names.
- **Rules**, such as "every kill fires exactly once" or "the snapshot revision only goes up".

The contracts covered the authoritative inventory snapshot, combat events, rewards and achievements, world time, sleep safety, safe zones, map data, region discovery, waypoints, the trader, the saved-session payload, and the config namespaces.

Contracts are what make parallel work possible. The interface agent built the new hotbar against the inventory contract while the gameplay agent was still building the inventory behind it. It even shipped a stand-in that built the same snapshot shape from the old data, so the HUD worked before and after the real inventory landed.

When a contract had to change, it got a new version and a line explaining why. The inventory contract went to v1.2 when the gameplay agent recorded the API as actually built. The unique-items contract went to v1.3 when the moderator approved a policy for re-taking a lost rifle. The file as a whole reached v1.3 by the end of the day. Consumers read the version line, not a chat message, to know something moved.

## One editor, one lock

A Roblox game lives in a single place, and on this project Roblox Studio is the source of truth: there is no Git repository for the game itself, only a mirror of the scripts on disk. Every agent edits through the same Studio session. Two agents starting a play test at once, or one moving the camera while another captures a screenshot, corrupt each other's work.

The fix is low-tech: a lock file with a holder line and a queue. Before an agent starts a play test, moves the camera or does bulk world edits, it checks the holder. If it isn't free, the agent adds itself to the queue and does something else. A hold should last 10 to 20 minutes at most, and the agent sets the holder back to `free` the moment it's done. Reading scripts and making small, atomic script patches don't need the lock, but play tests always do.

Two editing habits went with the lock:

- **Back up before you touch.** Before an agent's first edit to a script, it clones the original into a backup folder named for the day and agent.
- **Atomic read-modify-write.** Every patch reads the script's current source, makes the exact replacement, checks it applied, and writes it back in one operation. Never paste a whole saved copy over a script someone else may have changed since. The economy agent's largest patch of the day was 44 coordinated edits applied this way in one step.

## Testing in three tiers

**Tier 1: solo smoke tests.** Each agent tests its own task in a solo Studio play test, under the lock, for at most about 10 minutes per hold. The agent writes what it set up, what it did and what it observed. For example: "Mini AK fired 20 rounds in 5.5 seconds; hotbar showed 10/280 afterwards, matching the server."

**Tier 2: multiplayer QA.** Anything involving two or more players goes into the QA queue with exact steps and pass criteria. The moderator, and later the dedicated QA agent, runs those in batches of two to four test clients and logs every result. Agents don't run multi-client sessions themselves, which keeps the shared editor free and the test conditions consistent.

**Tier 3: owner checks.** Some things an agent can't honestly judge: whether a sound fits, how a charged punch feels, whether the map is readable on a phone, and anything on a real PS4. These go on a separate list for the owner and are never marked done by an agent. A PS4 performance number nobody measured on a PS4 doesn't exist.

## Honesty rules

AI agents are inclined to report success. The rules exist so they can't without proof:

1. **No invented results.** No test result, asset ID, badge ID, sound ID or performance number that wasn't produced or read from a real source.
2. **Verified means executed.** "VERIFIED only with an executed test and recorded evidence." A test that ran against the wrong thing makes the status go back down.
3. **Label the device.** Our performance numbers come from Roblox Studio on a Mac. Every one is labelled "Studio, not PS4", and the article about our console work says so too.
4. **Label estimates.** When the performance agent ranked PS4 fixes, each came with an estimated improvement range, its basis (a Studio measurement, a part count, or engine documentation) and a confidence level, presented as an estimate.
5. **Only what's live goes public.** The website describes only what's in the published game. Built-but-unpublished changes wait on a branch until the moderator confirms the publish.

## Human approvals

The agents don't make product decisions. The owner does, and the moderator turns each decision into routed tasks. Decisions the owner made on the day included:

- approving each tier of security fixes before they were applied;
- the policy on what players may give to teammates;
- zombie population caps for performance;
- lowering the lobby's maximum player count;
- a set of loot changes;
- the design of saved sessions with friends;
- a late change of mind on friendly fire: survivors can never damage each other. It replaced a "reduced damage" default that two agents had already built.

The last one shows why decisions go through the moderator. One owner sentence, "no damage between survivors", meant edits by two owners, retiring one setting from saved data without breaking old saves, and a new line in the player changelog. The moderator wrote that as routed tasks within minutes. Nobody had to remember to tell anyone.

Anything that changes something outside the game, like a Creator Dashboard setting, a publish or a website merge, waits for an explicit yes in the same way.

## The feedback loop

After every task, or at least every 45 minutes, each agent sends the moderator the same short report: completed task IDs, files changed, tests run with evidence, blockers, and what's next. The moderator then:

- updates the checklist, integration log and blockers;
- unblocks whoever was waiting on that task;
- reassigns work if priorities changed;
- batches anything multiplayer into the QA queue;
- tells the owner what happened, in plain language and in one message rather than seven.

The owner's view is a short stream of decisions and outcomes. The agents' view is a precise record they can pick up from at any time, even after a session restarts.

## Templates you can copy

These are sanitised versions of the formats we actually used. Adapt the columns to your project; keep the discipline.

**A task row on the master checklist**

```
| ID    | Pri | Owner | Deps  | Task                                          | Acceptance                                  | Status  |
| A1-12 | P1  | 1     | A1-01 | Fire Kill/Hit combat events exactly once      | Duplicate death callbacks produce one Kill  | TESTING |
```

**An agent report to the moderator**

```
Done: A4-01 (InventoryUI reads the server snapshot)
Files: InventoryUI (client)
Tests: solo Play, pistol given Mag=0 → hotbar "0/30" in red  PASS
       live fire Mini AK 20→0 in 5.5 s → "10/280" matches server  PASS
Blockers: multiplayer reconnect test needs a QA batch (queued)
Next: A4-06 sleep threat check, once the world agent ships its threat query
```

**A contract entry**

```
C-COMBAT (owner: gameplay; consumers: economy)
Event Kill { eventId, attacker, target, weapon, headshot } — exactly once per death
Event Hit  { eventId, attacker, target, weapon, damage, headshot, friendly }
v1.1: owner sets a "live" flag once Kill fires for real; until then consumers fall back to counters
```

**A lock entry**

```
Holder: interface agent · since 07:26 UTC · perf re-profile, max 25 min
Queue: world agent (ritual test) → gameplay agent (combat smoke)
```

**An integration-log line**

```
2026-10-31 · economy · A3-10 · friendly-fire setting retired per owner decision; old saves read and ignore it · mirror synced
```

**A player-changelog line**

```
2026-10-31 · world · A2-08 · The ritual is a real siege now: waves storm the circle until the candles burn down · TESTING
```

## A timeline of the day

Times are approximate and in UTC, taken from the integration log, test results and reports.

| Time (UTC) | What happened |
|---|---|
| ~06:45 | The moderator writes the architecture, master checklist, contracts, per-agent task files and queues. |
| ~06:50 | Assignments go out. Two of four messages are held by their sessions' permission settings until the owner releases them. |
| ~07:00 | The interface agent records a performance baseline in Studio. The economy agent reports that "the run doesn't auto-start". |
| ~07:13 | Root cause: the test had loaded a second copy of a server module, which reset the game state. A new testing rule goes into the architecture doc. |
| ~07:14 | The economy agent applies one atomic 24-edit patch: saved-item identity, giftable-supply rules and session settings. |
| ~07:24 | Owner-approved security fixes land as one 16-edit patch. |
| ~07:26–07:31 | Performance re-profile: moving cosmetic light scripts off the server cut server script time by 31% in the Studio test scene. |
| ~07:34 | Saved sessions with friends land as one 44-edit patch, with an additive save migration. |
| ~07:43 | The performance agent's PS4 report is final: ranked fixes with estimated gains and confidence levels. |
| ~07:50 | Achievements reworked: 73 entries in 8 categories, all 22 existing IDs kept. |
| ~07:55 | The new trader service lands, built across three owners against the trader contract. |
| ~08:00 | The owner decides survivors never damage each other. The friendly-fire setting is retired the same hour. |
| Same morning | The lobby's maximum player count is lowered on the Creator Dashboard after owner approval and re-read to confirm. Website fixes are merged through pull requests with checks. |

None of the overhaul is published at the time of writing. It goes live when multiplayer QA passes and the owner says so, and only then does the website describe it.

## Failure modes and the fixes we used

**Testing a copy instead of the game.** An agent loaded a server module from a Studio command to inspect it. Roblox ran the module's body again as a fresh copy, which reset the clock and made it look as if runs never started. Hours went into a bug that wasn't there. *Fix:* during play tests, never load server modules from the console. Each system exposes a Studio-only test hook, and tests drive the game only through those.

**Trusting the frame counter in an unfocused editor.** When Studio's window loses focus it throttles to about 67 ms per frame, roughly 15 FPS, and can open the pause menu. Every wall-clock FPS number from an unattended run was useless. *Fix:* measure work time instead, meaning render CPU time and the script profiler, and keep the window focused for any timing run.

**Messages that never arrived.** Messages between sessions running under different permission settings were held for the human to approve. The moderator thought two agents had their assignments; they didn't. *Fix:* check delivery notices, never treat silence as agreement, and ask the owner to release held messages.

**Two writers, one value.** Before the overhaul, about 20 scripts wrote the player's ammo directly and the HUD polled for changes, so it sometimes showed rounds you didn't have. *Fix:* one server-owned, revisioned inventory snapshot. Every change goes through it, and the HUD redraws only when the revision moves.

**Two payment paths.** Points and the in-game currency were paid by separate code paths, so caps and missed events produced "points but no money". *Fix:* one idempotent reward pipeline that pays both together and never pays the same event twice.

**A function that was never called.** Punching in the live game did nothing because a check tested whether a function existed instead of calling it, so it was always true. Nobody noticed until an input audit traced every binding. *Fix:* audit inputs end to end, and the punch fix is waiting for the next publish.

**A late design change.** Two agents had already built a "reduced friendly fire" default when the owner decided teammates should never hurt each other. *Fix:* the moderator routed the change to both owners in one pass, and the save format kept reading old values while ignoring them.

**The audit nobody asked the builders to do.** The independent security agent found 51 exploit candidates across the game. None of them came from the builders' own testing. *Fix:* keep an auditor who builds nothing, route every finding to its owner, and fix in tiers the owner approves. We don't publish the details.

<figure>
  <img src="/games/stillskin-forest/branding/stillskin-forest-night-chase.webp" alt="A survivor runs from a crowd of infected along a lantern-lit forest trail at night" width="1672" height="941" loading="lazy" />
  <figcaption>Night chases are where combat, zombie AI, rewards and the HUD all meet, and where most cross-owner bugs showed up.</figcaption>
</figure>

## When not to use this approach

**Small projects.** If one session can hold the whole codebase in mind, a moderator and seven specialists are overhead. Our first week was one session, and that was right.

**Work that can't be split by ownership.** If two agents would need to edit the same files all day, they should be one agent. Ownership is the foundation; without it the rest doesn't hold.

**No written contracts.** If you can't describe the interface between two systems in half a page, you aren't ready to build them in parallel.

**No human time.** The owner still decides, approves and does the device checks. If nobody can answer "should survivors hurt each other?" within the hour, agents will either stall or guess. Guessing is worse.

**A single shared tool with long exclusive sessions.** If your editor, simulator or test rig is needed by every agent for long stretches, the lock queue becomes the bottleneck. Seven agents then wait for one window.

**When you can't verify.** If you can't run real tests, the workflow produces a lot of confident "implemented" work. Its value comes from the verified column.

## FAQ

### What is a moderator-led multi-agent workflow?

It's a way of running several AI coding agents on one project, where a single coordinating agent, the moderator, is the only one that talks to the human owner. It splits work into owned tasks, keeps a shared written record of progress and routes every change between agents.

### Can you make a Roblox game with AI agents?

Yes. Stillskin Forest is built with AI coding agents that write and test Luau scripts and edit the game in Roblox Studio. A human owner makes the design decisions, approves risky changes and does the checks only a person can do, such as playing on a real console.

### How many AI agents should work on one game at once?

As many as you can give separate ownership to, and no more. We ran seven specialists plus a moderator because the game split cleanly into seven areas of code. If two agents would edit the same files, merge them into one.

### How do you stop AI agents from overwriting each other's work?

Give every script exactly one owner, route change requests through the moderator, split shared configuration into one named section per owner, back up before editing, patch atomically, and use a lock for anything only one agent can use at a time.

### What does the moderator agent actually do?

It writes the plan, contracts and checklist, routes tasks and change requests, runs multiplayer QA, turns the owner's decisions into tasks, and reports back to the owner in plain language. It doesn't build gameplay itself, and it is the only session that publishes.

### How do you know an AI agent's work actually works?

You require evidence. A task only counts as verified when a test was executed and its result recorded. Agents smoke-test their own work, the moderator runs multiplayer tests, and anything that needs human judgement or real hardware stays on the owner's list.

### Do the agents talk to each other directly?

They can message each other for facts, but any change to another agent's work goes through the moderator. That keeps the record complete and stops two agents agreeing on something the owner never approved.

### What happens when the owner changes their mind?

The moderator turns the new decision into routed tasks for every affected owner and updates the contracts and changelog. When we switched from reduced to zero friendly fire, two owners changed their code and the save format kept reading old values safely.

### Is this expensive?

It uses more compute than one session, because eight sessions run at once. It saves owner time and rework: fewer conflicting edits, fewer false bug-hunts, and decisions made once. Whether that trade is worth it depends on how much parallel work you really have.

### Does this work outside Roblox?

The method isn't Roblox-specific. Ownership, contracts, a status ladder, a lock for shared tools, tiered testing and evidence-only verification apply to any codebase. Roblox just makes the shared-editor problem obvious.

## Conclusion

The tools weren't the hard part of building a game with several AI agents. Organisation was: knowing who owns what, writing down how systems talk to each other, not letting anyone call work done without proof, and keeping one calm voice between the owner and seven busy sessions. That organisation is what let eight sessions change the same live Roblox game on the same morning without breaking each other's work.

If you want to try it, start smaller than we did. Two specialists and a moderator, an ownership table, one contract and a checklist with a status ladder will teach you most of it in a day. Then add agents only where you can give them something to own.

For more on the game itself, start at the [Stillskin Forest wiki](/games/stillskin-forest/wiki) or the [development log](/games/stillskin-forest/wiki/updates/development-log). For building your own game, see [how to make a Roblox game](/stillawake-times/how-to-make-a-roblox-game), [how to make a horror game in Roblox Studio](/stillawake-times/how-to-make-a-horror-game-in-roblox-studio) and [how to fix lag in Roblox games](/stillawake-times/how-to-fix-lag-in-roblox-studio).

## About the author

[Jaeden Doody](/founder/jaeden-doody) is the Montreal-based founder of StillAwake Media, building software, AI systems, and practical business solutions for modern companies. He owns Stillskin Forest and made the product decisions described in this article.
