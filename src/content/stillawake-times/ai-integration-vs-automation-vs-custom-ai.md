---
title: "AI Integration vs AI Automation vs Custom AI: What You're Actually Buying"
date: "2026-08-15"
excerpt: "Three labels, three different products: integration connects an existing model to your systems, automation runs a workflow on a trigger, and custom AI trains or hosts a model you own."
category: "AI Automation"
featured: false
author: "Jaeden Doody"
---

**These three labels describe genuinely different products. AI integration connects an existing model to systems you already run — it is plumbing, and the model is rented. AI automation is a workflow that runs on a trigger, and it may contain no model at all. Custom AI means a model you train, fine-tune or host yourself, which you own and must keep running forever. The prices differ by an order of magnitude, and so does what you are left holding when the vendor leaves.**

You can tell which one a vendor is selling by asking a single question: *where does the model live, and who pays for it every month?* Everything else in the proposal follows from that answer.

## AI integration: renting intelligence, owning the wiring

An integration takes a model that already exists — Claude, GPT, Gemini — and connects it to your data and your interfaces. Nobody trains anything. The engineering work is entirely about plumbing: authentication, getting your data into a shape the model can use, handling failures, deciding what the model is allowed to see and allowed to do, and building the interface where a human interacts with it.

The part vendors undersell is that **the hard problem is context, not the model.** A model with no access to your systems produces confident, plausible, wrong answers about your business. It will guess your return policy. It will invent a product you discontinued. It is not malfunctioning; it has no way to know.

This is the problem ZylX exists to solve. ZylX is our own product — built by StillAwake Media, not a client project — and its job is unglamorous: connect a business's actual systems, build a persistent layer of context that survives across sessions instead of being re-explained every time, and expose that context to authorized AI assistants through MCP so they answer from real data rather than guessing. The point is not a smarter model. The point is that the model stops making things up because it can finally look.

**Cost shape:** build cost is a normal software project — scoped, bounded, delivered. Running cost is per-request and paid to whoever hosts the model. That second number is the one to insist on, and it is the one most proposals omit.

I am not going to quote a per-request price here, and I would be suspicious of anyone who does without seeing your traffic. Model pricing changes several times a year and the cost depends entirely on how much context each request carries. What you should demand instead is a **measured** figure: run your real volume through a prototype for a week and report the actual spend. Any vendor who cannot produce that number after two weeks of building has not built enough to know.

## AI automation: a workflow, sometimes with no AI in it

Automation is a workflow that fires on a trigger and does a sequence of things. An order comes in, so it writes to the accounting system, notifies fulfilment, and updates a dashboard. Someone submits a form, so it is routed, tagged, and answered.

Here is the useful and unpopular distinction: **most valuable business automation contains no model whatsoever.** It is rules. If-this-then-that, executed reliably, forever, at three in the morning.

We built the payment reconciliation for [TravelDesign By Lisa's](/work/lisa-travel-design) automated eSIM store. A customer buys, Stripe takes payment, the supplier fulfils, and the transaction is matched and reconciled without anyone touching it. That system runs the business's revenue operations and it has no language model in it, because the requirement was correctness, and rules are correct in a way probabilistic systems structurally are not.

**When a model genuinely earns its place in an automation** is when the input is unstructured and messy — free-text email, a PDF invoice in an unpredictable layout, a support message that needs classifying by intent. Rules break on messy input. Models handle it.

**When it does not**, and this is the honest failure mode I watch people walk into: paying model inference costs to do arithmetic, to move a value between two fields, or to pick between three known options that a lookup table already covers. That is not an AI project. It is a script wearing a costume, it costs more per run than the script, and it will occasionally be wrong at something a script would never be wrong at.

I have talked clients out of AI automation more than once for exactly this reason. This article is about the procurement decision — which of the three things you are buying — not about whether automation is worth doing.

**Cost shape:** build cost is bounded. Running cost is often near zero if it is rules-based, and non-zero per-execution if a model is involved. The real ongoing cost of automation is **maintenance** — every system it touches will change its API, and something will break. Ask who fixes it, and confirm the answer is in writing.

## Custom AI: owning a model, and everything that comes with it

Custom AI means the model itself is yours — trained from scratch, fine-tuned on your data, or an open model you host on infrastructure you control.

The legitimate reasons to do this are narrow and specific:

- **Data that cannot leave your building.** Regulatory or contractual constraints that rule out sending information to a third-party API.
- **A genuinely specialized domain** where general models underperform and you have a large, clean, labelled dataset — the operative word being *labelled*.
- **Volume so high** that per-request pricing costs more than running your own inference.
- **Latency requirements** an external API cannot meet.

The reason people actually ask for it is usually different: it sounds more substantial than "we connected an API," and the phrase "custom AI development company" carries some of the highest cost-per-click in Canadian search — reported into the low hundreds of dollars per click. High CPC is a signal about vendor competition, not about whether you need the thing.

**Cost shape, and this is where it diverges hardest:** the build is the smaller half. You take on inference infrastructure that runs whether or not anyone uses it, model drift as your data changes, retraining cycles, evaluation harnesses so you can tell whether a new version is better or worse, and a monitoring story. A rented model is somebody else's operations problem. An owned model is a permanent line item and a permanent responsibility.

The 2026 Canadian range for a serious custom build starts around $5,000 for narrow scope and passes $30,000 quickly as integrations multiply — the drivers are broken down in [custom software development cost in Canada](/stillawake-times/custom-software-development-cost-canada). Custom model work sits at the far end of that and adds a recurring bill that never stops. Budget for the second year, not the launch.

## The decision, in the order I actually ask it

**Is the input structured?** If yes, write a script. It will be cheaper, faster, deterministic, and debuggable at 2am. Structured input plus a model is the most common overspend in this category.

**Does it need to know things about your business?** Then the problem is context, not intelligence, and the work is integration. Nothing gets better by choosing a larger model when the model cannot see your inventory.

**Can your data leave your infrastructure?** If no — regulated data, contractual restriction — you are in custom-hosted territory, and you should price the operations, not just the build.

**Do you have a labelled dataset?** If no, you cannot fine-tune. "We have a lot of data" and "we have training data" are unrelated statements, and the gap between them is months of labelling work nobody scoped.

**What is the per-request cost at real volume?** If the vendor cannot answer with a measured number, the project has not been prototyped.

## The honest limitation

Every one of these categories can produce something that demos beautifully and fails in production, and it fails for the same reason: the demo ran on clean data and the business does not have clean data.

The system that reconciles payments works because someone spent unglamorous time on what happens when the supplier response is late, when the amount does not match, when a refund lands mid-cycle. The AI assistant that answers correctly does so because someone connected it to the real inventory and gave it a way to say "I don't know." That work is most of the project and none of the pitch.

If you want to see what we build rather than read about it, [our work](/work) is public with real numbers, [ZylX and our other products](/products) are documented, and the [AI automation](/ai-automation) and [software development](/software-development) pages describe how we scope this. Our published rates are on the [pricing page](/pricing).

---

Describe the problem — not the technology — in writing at [stillawake.studio/start](https://stillawake.studio/start) and you get a written scope back, including the cases where the answer is a plain script and you should not spend money on a model. No sales call.
