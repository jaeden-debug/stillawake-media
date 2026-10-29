---
title: "How Much Does It Cost to Build an App in Canada? (2026 Breakdown)"
date: "2026-10-29"
excerpt: "App cost in Canada depends on platform, accounts, payments and integrations. Our published bands: internal web apps $12,000–$25,000, SaaS MVPs from $35,000."
category: "Software Development"
featured: false
author: "Jaeden Doody"
---

**What an app costs to build in Canada is decided by four things: which platforms it runs on (web, iOS, Android, or all three), who logs in and what each of them is allowed to do, whether money moves through it, and how many outside systems it has to talk to.** At StillAwake, our published pricing model puts an internal web app for your own team at **$12,000–$25,000 CAD**, a customer-facing portal **from $18,000** (around $19,500 once it connects to a system you already run), and a public sign-up SaaS MVP at **from $35,000** — the last two always scoped in a paid discovery phase before a fixed price. A native or cross-platform mobile app sits on top of that, because it adds app-store work, device testing and a second (or third) release pipeline.

If you want a number for your own idea rather than ours, the [app development cost calculator](/tools/app-development-cost-calculator) walks through the same questions this article does and gives you a range with its assumptions shown. For websites, stores and smaller builds, the general [project cost calculator](/tools/project-cost-calculator) covers the rest.

This article is specifically about **apps** — mobile apps, cross-platform apps, web apps and SaaS products that people sign into and use repeatedly. If what you need is a bespoke internal system (an ERP replacement, a back-office tool, an integration layer), the companion guide on [what custom software development costs in Canada](/stillawake-times/custom-software-development-cost-canada) is the better fit.

## First decision: what kind of app is it?

"An app" covers products that differ in cost by a factor of five or more. Before anyone can price yours, it has to land in one of these buckets:

| App type | Who uses it | Typical shape |
|---|---|---|
| **Internal web app** | Your own team | Login, database, a few core screens, reporting, admin |
| **Customer portal** | Your clients log in | Accounts, roles, the client's own records, an admin side for you |
| **SaaS / platform** | Anyone can sign up | Self-serve sign-up, billing, onboarding, multiple surfaces, admin |
| **Mobile app (iOS/Android)** | Consumers or field staff | Everything above, plus device features, push notifications, store review |
| **Companion app** | Customers of an existing business | A mobile front end to a system you already run |

The single question that moves price the most is the one our own pricing flow asks first for software: **who uses it?** "Just our team" is a different product from "our customers log in", which is a different product again from "anyone can sign up". Each step adds roles, edge cases, abuse scenarios and support load. If you're not yet sure you need custom software at all, the [honest test](/do-i-need-custom-software) is worth ten minutes before you go further.

## Native vs cross-platform vs web app (PWA)

This is the second-largest cost decision, and the one most often made for the wrong reasons.

**A web app** runs in the browser on every device. One codebase, no store review, instant updates. A [custom web application](/stillawake-times/what-is-a-custom-web-application) is usually the cheapest way to put software in front of users, and it's what most business tools, portals and SaaS MVPs should start as. A **progressive web app (PWA)** adds installability and some offline behaviour, though device access and push notification support are more limited than in a store app, particularly on iOS.

**A cross-platform app** (React Native, Flutter) ships one shared codebase to both iOS and Android as real store apps. You get push notifications, background location, camera, biometrics and a store listing, at well under the cost of building two native apps. This is our default for mobile: we build with React Native and Expo — the same stack behind [Stalkr](/work/stalkr-navtrl), a real-time location app we built for NAVTRL that reached a TestFlight-ready build in 24 days. (Stalkr is in TestFlight beta and hasn't shipped to the public App Store yet.)

**Native apps** (Swift for iOS, Kotlin for Android) are two separate codebases. That roughly means two builds, two test passes and two release pipelines. Native is justified when the product depends on deep platform features, heavy graphics, or performance a shared layer can't deliver — not as a default.

The practical rule: **if the app's job can be done in a browser, start there.** Go cross-platform when you need what only a store app gives you (reliable push, background location, hardware access, store discovery). Go native when a cross-platform build has demonstrably hit a wall.

## Where the money actually goes in an app build

The screens you can see in a mockup are rarely the expensive part. These are the line items that decide the number.

### Design

App design is not just the happy path. Every screen has empty, loading, error and permission-denied states, and mobile adds small screens, thumb reach, offline states and platform conventions that differ between iOS and Android. A twelve-screen app is often forty or fifty designed states.

### Authentication

"Users can log in" sounds like one feature. In practice it's sign-up, email verification, password reset, session handling, possibly social login (Sign in with Apple, Google), and account deletion. Note that [Apple's guideline 5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) says that if your app supports account creation, you must also offer account deletion within the app — and guideline 4.8 requires an equivalent privacy-focused login option if you offer social sign-in. Both are requirements that has to be designed in, not discovered at review.

### User roles and permissions

Cost scales with the number of **distinct roles**, not the number of users. An app with one kind of user is straightforward. An app where admins see everything, managers see their team, and customers see only their own records needs a permission model enforced on the server and in the database, not just hidden buttons. On Stalkr, row-level security covers every table, including location data — that's the level of care any app with personal data needs.

### Integrations

Every third-party API — CRM, accounting, shipping, calendar, maps, an internal system — is a dependency with its own rate limits, outages and breaking changes. Our pricing model treats connecting to an unusual internal system as something that **widens the top of a range, not the floor**, because until you've seen the other side's API, nobody knows how hard it is.

### Payments: Stripe vs app store in-app purchase

This is where app budgets are most often wrong, because the rules depend on **what you're selling**, not on which payment provider you prefer.

- **Physical goods and real-world services** (a product shipped, a booking, a delivery, a service consumed outside the app) must *not* use Apple's in-app purchase. Apple's guideline 3.1.3(e) says such apps "must use purchase methods other than in-app purchase", such as Apple Pay or card entry. That usually means [Stripe](https://stripe.com/en-ca/pricing), which charges a published per-transaction fee and no platform commission.
- **Digital goods and features unlocked inside the app** (subscriptions, premium features, in-game currency) generally must use the store's billing on iOS, under [App Store Review Guideline 3.1.1](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase). As of October 2026, apps on the **US storefront** may link out to other purchase methods; outside the US, including Canada, that's restricted to specific entitlements.

The commission side, as of October 2026, from the platforms' own documentation:

| | Apple App Store | Google Play (Canada) |
|---|---|---|
| Standard rate on digital sales | 30% | 15% on the first US$1M of annual revenue, 30% above |
| Subscriptions | You receive 70% in a subscriber's first year, 85% after one year of paid service | 15% |
| Small developer rate | 15% via the [Small Business Program](https://developer.apple.com/app-store/small-business-program/) (under US$1M in prior-year proceeds) | Covered by the 15% tier above |

Apple's subscription split comes from its [subscriptions page](https://developer.apple.com/app-store/subscriptions/), which also notes Small Business Program members receive 85% from the first billing cycle. Google's rates come from its [service fees page](https://support.google.com/googleplay/android-developer/answer/112622); Google has introduced a new fee structure in the US, UK, EEA, Australia and Japan during 2026, while Canada remains on the rates above at the time of writing. These change often — check both pages before you build a revenue model on them.

The build-cost implication: in-app purchase and Stripe are **separate integrations** with separate receipt validation, refund handling and edge cases. An app that sells both digital and physical things needs both.

### Admin panel

Almost every app needs a back office: managing users, handling support requests, correcting data, issuing refunds, moderating content. It's the most commonly forgotten line item because users never see it. Our pricing model includes an admin surface in every software tier for that reason.

### Infrastructure and hosting

A database, file storage, authentication service, background jobs, email delivery and push notification services. For an early-stage app, these managed services are often modest per month; they grow with usage, storage and outbound email/notification volume. The cost to *build* infrastructure is mostly about setting up environments (development, staging, production), backups and monitoring properly — small if planned in, painful if retrofitted.

### Testing

Web apps get tested across browsers. Mobile apps get tested across devices, OS versions, screen sizes, poor connections and permission states (location denied, notifications off). Stalkr's QA checklist ran to 60 cases with explicit pass thresholds. Testing is the line item most often cut to hit a number, and the one that most decides how expensive year two is.

### Deployment and app store review

Web apps deploy whenever you want. Store apps go through review, and the accounts cost money:

- **Apple Developer Program:** US$99 per membership year ([Apple](https://developer.apple.com/programs/whats-included/)), with fee waivers available to eligible nonprofits, accredited educational institutions and government entities.
- **Google Play Console:** a US$25 one-time registration fee ([Google](https://support.google.com/googleplay/android-developer/answer/6112435)).

The fees are trivial. The work isn't: store listings, screenshots, privacy disclosures, account-deletion flows, review rejections and resubmissions all take time. Your app should be published under **your** developer account, not your developer's — otherwise you don't fully own the product.

### Maintenance

Apps are owned, not purchased. iOS and Android ship major versions every year, store policies change, dependencies age, and SDKs get deprecated. A mobile app left alone will eventually stop building or be pulled from a store for targeting an old API level. Budget for maintenance from the start; our guide to [what breaks in a website and what it costs](/stillawake-times/website-maintenance-what-breaks-and-what-it-costs) explains the same dynamic for the web side.

## Four cost examples, with the assumptions stated

The first three figures come directly from StillAwake's published pricing model — the same engine behind our [project cost calculator](/tools/project-cost-calculator). The fourth deliberately has no StillAwake number, and we explain why. All figures are in Canadian dollars, before tax.

### Example 1: Internal web app for your team — $12,000–$25,000

**Assumptions:** Only your staff use it. Login, a database designed around your data, core screens, reporting, and admin create/edit/delete. Hosting environment and deployment included. Requirements are reasonably well known going in. No customer accounts, no payments, no integration with an unusual internal system.

**What moves it within the range:** the low end assumes known requirements; the high end assumes more workflows and integrations. Adding payments, customer accounts or a connection to existing internal software are priced as additions on top.

### Example 2: Customer portal — from $19,500, scoped first

**Assumptions:** Your clients log in to see their own records; your team manages everything from an admin side. Authentication, roles and permissions, database design, a customer surface, an admin surface, hosting and deployment. In our calibration scenario, the portal also connects to an internal system the business already uses.

**Why "from" and not a range:** with two audiences and an integration we haven't seen, the requirements *are* the product. Our model routes every portal through discovery before quoting a fixed price, rather than guessing.

### Example 3: SaaS MVP — from $35,000, scoped first

**Assumptions:** Anyone can sign up. Authentication, billing, a dashboard and the core workflow that makes the product worth paying for, plus roles, multiple surfaces (public, user, admin), hosting and deployment. Web-first.

**What usually pushes it up:** a second user type (for example, a marketplace with buyers and sellers), team accounts, usage-based billing, real-time features, or launching on mobile at the same time as the web.

Discovery for examples 2 and 3 starts from $1,800 and is credited against the build if you go ahead.

### Example 4: Cross-platform mobile app (iOS + Android) — no published band

**Assumptions:** A React Native app shipping to both stores, with accounts, push notifications, a backend, an admin panel, and either Stripe (for physical goods or services) or in-app purchase (for digital features).

**Why we don't publish a number:** mobile isn't a separate tier in our pricing model; it's scoped through discovery, because the spread between "a companion app that shows your customers their bookings" and "a real-time location app with geofences and SOS" is enormous. As a reasoning aid only: start from the closest web example above, then add the mobile-specific work — device and OS testing, push infrastructure, store listings and review, offline handling, and a second release pipeline. Any agency that quotes a firm mobile price from a one-paragraph description is guessing.

For general orientation, published Canadian and North American market ranges for apps vary so widely between sources and methodologies that we don't repeat them here. A written scope for your specific app will tell you more than any industry average.

## Pricing models: fixed price, time and materials, or phased MVP

How you pay matters almost as much as how much.

**Fixed price** works when the scope is genuinely defined. You know the cost up front; the developer carries the risk of underestimating. The catch: it only protects you if the scope is written down precisely, and every change becomes a change request. This is how we quote every build — after scoping.

**Time and materials** (paying for hours or days worked) works when requirements are genuinely uncertain or evolving. It's flexible, but the budget risk sits with you. It's appropriate for ongoing development after launch, less so for a first build with a fixed budget.

**Phased MVP** is the approach we recommend for most new apps: a paid discovery phase that produces a written scope, then a fixed-price first version containing only what's needed to test the idea with real users, then further phases priced once you've learned something. It's slower to "everything" and much faster to the truth about whether the app works.

## How to keep an app budget under control

- **Launch on the web first** unless a store app is essential to the product.
- **Cut roles before features.** One user type at launch is much cheaper than three.
- **Use existing services** for auth, payments, email and maps rather than building them.
- **Decide what you're selling before choosing a payment flow** — physical vs digital changes everything above.
- **Put maintenance in the first budget,** not the second.
- **Own your accounts:** domain, hosting, Apple and Google developer accounts, and the code repository.

## The honest question before you build

Can an existing product do 80% of this? If yes, using it is often the right answer, and a good studio will say so. Custom apps are justified when the thing that makes you different is exactly the thing off-the-shelf tools can't do — or when the app *is* the product.

If you've decided it's worth building, our [software development](/software-development) page covers how we work, and the [app development cost calculator](/tools/app-development-cost-calculator) will give you a range with every assumption visible. When you're ready for a real number, [describe the project](/contact) and you'll get a written scope back — including an honest answer if we think you shouldn't build it.
