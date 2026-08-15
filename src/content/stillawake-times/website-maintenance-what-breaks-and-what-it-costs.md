---
title: "Website Maintenance: What Actually Breaks, and What It Costs"
date: "2026-08-15"
excerpt: "Live websites fail in four predictable ways: dependency drift, platform API changes, expired credentials, and update conflicts. Three of the four are silent, which is why they get expensive."
category: "Web Performance"
featured: false
author: "Jaeden Doody"
---

**Websites do not decay randomly. Live sites break in four predictable ways — dependency drift, platform API changes, expired credentials on integrations, and conflicts introduced by updates — and three of the four fail silently. The cost of maintenance is not the cost of fixing things. It is the cost of finding out, which is why the expensive failures are always the ones nobody noticed for six weeks.**

Below is what each failure actually looks like, what it costs to fix after the fact versus prevent, and — the part care-plan sales pages leave out — the cases where paying for a maintenance plan is not worth it.

## Failure one: dependency drift

Every modern site is built on layers of other people's code — a framework, a runtime, a build tool, dozens of libraries. Those layers keep moving whether your site does or not.

The site keeps working. That is what makes this deceptive. The failure surfaces the day you need to change something.

**The named failure mode: "it works until you touch it."** A site runs untouched for two years. You ask for a one-word copy change. The developer pulls the project down, and it will not build: the Node version it needs reached end of life, a library it depends on has a breaking change three major versions back, and a transitive dependency was deprecated. A ten-minute edit becomes a two-day upgrade, quoted as an emergency, on a day you needed the change to be live.

This is the most common surprise invoice in the industry and it is entirely a function of elapsed time. A site touched quarterly never encounters it. A site touched every two years encounters it every two years.

**Prevented by:** small, regular dependency updates with a test suite that proves nothing broke. **Cost of prevention:** minutes per month. **Cost of neglect:** a multi-day upgrade project, at emergency pricing, at the worst possible time.

## Failure two: platform and API changes

Anything your site talks to is a moving target. Payment processors deprecate API versions. Google changes analytics and ads endpoints. Shopify, Stripe, mapping providers and email services all publish version sunsets, and they do sunset them.

**The named failure mode: the deprecation email that went to a former employee.** The warning was sent, months in advance, to an address nobody reads. The endpoint is switched off. Checkout starts erroring, or — worse — starts silently skipping conversion tracking while still accepting orders, so you spend a month optimizing ad spend against numbers that are wrong.

**Prevented by:** knowing which external services the site depends on and who receives their notices. That inventory takes an hour to make once and is worth more than most audits.

## Failure three: expired credentials and integrations

The quietest category, and the one that costs the most revenue per incident.

Concrete versions I have seen or had to repair on inherited sites:

- **An SMTP or transactional-email credential expires.** The contact form still shows the thank-you message. The email goes nowhere. Nobody complains, because the people who would complain are the leads you never received. This can run for months.
- **A domain or SSL auto-renewal fails on an expired credit card.** The site goes to a browser security warning. Traffic drops to near zero within hours.
- **An OAuth token for a connected service expires.** Inventory sync, calendar booking, or CRM push stops. The website looks perfect.
- **A DNS record is edited during an unrelated change** and email delivery quietly degrades to spam folders.

The pattern is the same every time: the visible site is fine, so nothing triggers an alarm. **The fix is not skill, it is monitoring** — an automated submission through the real contact form on a schedule catches the first case in a day rather than a quarter.

## Failure four: update conflicts

On plugin- or app-based platforms, an auto-update to one component can change behaviour another component depended on. A theme update resets a customization. A payment app and a subscription app both try to modify the cart. A page-builder release changes how a block renders and a layout collapses on mobile only.

**The named failure mode: the mobile-only break.** Nobody checks the site on a phone after an update, and the majority of traffic is mobile. Two weeks of degraded conversion before anyone notices.

**Prevented by:** staging environments and — the real answer — automated tests that open the important pages and assert they still work.

## Testing is the actual maintenance mechanism

This is the part I would emphasize over every other line in a care plan: maintenance is not "we log in and look around." Looking around does not scale and does not catch silent failures.

What catches them is a test suite that runs on every change. The client platform we operate for [TravelDesign By Lisa](/work/lisa-travel-design) is covered by **412 automated tests** across 834 URLs; [BankDeMark](/work/bankdemark) — which I own and operate rather than serve as a client — runs **26 golden test cases** across 91 URLs and holds 100/100/100 Lighthouse. Those numbers are not a bragging metric. They are the reason a dependency upgrade on either of those sites is a routine Tuesday instead of a gamble.

If you are evaluating a maintenance provider, ask exactly one question: *what is checked automatically, and what happens when a check fails?* If the answer involves a person remembering to look, you are buying a calendar reminder.

## What it costs: reactive versus preventive

| Failure | Typical reactive path | Preventive path |
| --- | --- | --- |
| Dependency drift | Multi-day upgrade before any change can ship, at emergency rates | Minutes per month, absorbed into a plan |
| API deprecation | Broken checkout or lost tracking, diagnosed under pressure | An inventory of dependencies and a monitored inbox |
| Expired credential | Weeks of lost leads, unrecoverable | Automated form and uptime checks |
| Update conflict | Silent conversion loss until someone notices | Staging plus automated page tests |
| Security patch missed | Cleanup, possible reputation and data consequences | Routine patching |

For a concrete price anchor, ours are published rather than quoted on request: one-time emergency support runs **$150–$600 CAD** depending on scope, and ongoing plans are listed on [website maintenance](/website-maintenance) and [pricing](/pricing). The reason emergency work costs more is not opportunism. It is that diagnosing an unfamiliar broken system under time pressure is genuinely harder than preventing the break.

## When a care plan is not worth it

I would rather say this plainly than sell a subscription to someone who does not need one.

**A maintenance plan is probably not worth paying for if all of the following are true:**

- The site is static or near-static — a handful of pages, no login, no checkout.
- It has no integrations. No CRM, no booking, no payment, no inventory sync.
- It is on a fully managed host that patches the platform for you.
- You do not change it. No new pages, no seasonal updates.
- Nothing measurable depends on it being up this hour.

In that situation, a plan is close to pure insurance against a low-probability event, and self-insuring is a defensible business decision. What you should still do, at zero cost: put the domain and SSL renewals on a card that will not expire, set a calendar reminder to submit your own contact form once a month, and make sure you can name who holds the registrar login.

**A plan is worth it when any one of these is true:** money moves through the site; leads arrive through a form you would not notice failing; you have more than a couple of integrations; the site is a platform with apps that auto-update; or organic search is a meaningful channel — because a site that is down, slow, or throwing errors loses ground fast, and [the diagnosis order for a site that stops ranking](/stillawake-times/why-is-my-website-not-ranking-on-google) starts with exactly these mechanical failures. Performance regressions belong in the same bucket; the thresholds are in [the Core Web Vitals guide](/stillawake-times/core-web-vitals-guide).

## The honest limitation of any maintenance plan

A care plan keeps a site alive. It does not make it better. Uptime, patches and green tests do not write content, do not improve conversion, and do not win rankings. Plenty of businesses buy maintenance, see nothing improve, and conclude they were sold nothing — and they are half right. They bought the absence of a bad month, which is real but invisible.

Be clear with yourself about which one you are buying. If the site is stable and the business needs growth, spend the money on growth. If the site is fragile and the business depends on it, fix the fragility first — a growth programme built on a site that breaks quietly is money poured through a hole.

---

If you are not sure which category you are in, describe the site — platform, integrations, last time anyone updated it. You get a written assessment and a fixed-price scope, with no sales call: **[stillawake.studio/start](https://stillawake.studio/start)**. If the honest answer is that you do not need a plan, that is what it will say.
