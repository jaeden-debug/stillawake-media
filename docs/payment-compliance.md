# Payment options — compliance record

**Version 1.0 · verified 2026-08-15 · applies to pricing kernel `payments.ts`**

This document exists so that a future session does not re-derive the law from
memory. Every conclusion below is tied to a primary source. Where a conclusion
is an inference rather than a quotation, it says so.

**Nothing in this document is legal advice, and nothing here has been reviewed
by counsel.** The strongest status any conclusion can carry is
`VERIFIED_PRIMARY` — meaning it is supported by the quoted text of a statute or
regulation, not that a lawyer has blessed it. See "Counsel gates".

---

## 0. The one-line summary

StillAwake offers **the same total price, split into a small number of payments,
with no interest, no fees, and no price difference for paying over time.**

That combination is what keeps the arrangement outside consumer-credit
regulation in every jurisdiction examined. Each element is load-bearing. Remove
any one of them and the analysis below stops applying.

---

## 1. The decisive distinction: business vs consumer

Every regime examined keys on the same distinction, and in every one of them a
business client falls outside the consumer-credit rules entirely.

| Regime | Consumer test | Business client |
|---|---|---|
| Québec CPA | "a **natural person**, except a merchant who obtains goods or services for the purposes of his business" (s.1(e)) | Outside the Act |
| US Regulation Z | Applies to consumer credit | Exempt — §1026.3(a)(1),(2) |
| EU CCD2 | "a natural person who acts for purposes which are outside his or her trade, business or profession" (art.3(1)) | Outside the Directive |
| UK RAO/CCA | "individual" (incl. some sole traders/small partnerships) | Business-purpose exemption; also art.60F(2) |

**CLAIM** — An incorporated company, however small, is never a "consumer" under
the Québec *Consumer Protection Act*.
**JURISDICTION** Québec · **SOURCE** *Consumer Protection Act*, CQLR c. P-40.1, s.1(e)
· `https://www.legisquebec.gouv.qc.ca/en/document/cs/P-40.1`
**QUOTE** "'consumer' means a natural person, except a merchant who obtains goods
or services for the purposes of his business"
**CONSEQUENCE** Classification is by legal form + purpose, not by company size.
A one-person incorporated shop is B2B. **CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — A sole proprietor buying a website for their business is also not a
consumer, because the definition excludes a merchant acquiring services for
business purposes.
**SOURCE** same, s.1(e) · **CONFIDENCE** `VERIFIED_PRIMARY` on the text.
**OPEN** Where a natural person's purchase is genuinely mixed (part personal),
Québec courts look at the predominant purpose. Treat mixed-purpose natural
persons as consumers. **CONFIDENCE** `INFERENCE` — conservative default.

**CLAIM** — The Québec CPA covers **services**, not only goods.
**SOURCE** s.2: "This Act applies to every contract for goods **or services**
entered into between a consumer and a merchant in the course of his business."
**CONSEQUENCE** We cannot escape the CPA by arguing "we sell services".
**CONFIDENCE** `VERIFIED_PRIMARY`.

---

## 2. Is a no-charge payment schedule "credit"?

**CLAIM** — Under Québec law, deferring payment **without charges** is not
"credit", because the statutory definition requires charges.
**SOURCE** CPA s.1(f): "'credit' means the right granted by a merchant to a
consumer to perform an obligation within a term **in consideration of certain
charges**"; s.66: "This division contemplates all contracts of credit".
**CONSEQUENCE** With zero charges, the credit division (s.66 ff. — disclosure,
credit rate, statements of account) is not engaged.
**CONFIDENCE** `INFERENCE` — the definitional chain is explicit in the text, but
this is a construction of two sections rather than a single quotable rule.
**COUNSEL GATE** `Q1` below.

**CLAIM — the trap.** A discount for paying cash *is itself a credit charge*.
**SOURCE** CPA s.70(g): the credit charges include "the value of the rebate or of
the **discount to which the consumer is entitled if he pays cash**".
**CONSEQUENCE** **This is why the instalment total must equal the single-payment
total.** If StillAwake ever charged less for paying in full, the difference would
be a credit charge, the arrangement would become a contract of credit, and the
entire disclosure regime would attach. This is enforced in code — see
`assertNoCreditCharge` in `payments.ts`.
**CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — StillAwake does not need an OPC permit for this model.
**SOURCE** CPA s.321: permits are required of, relevantly, "(b) every merchant
who makes contracts of **loan of money** governed by this Act" and "(g) every
merchant who enters into a **high-cost credit contract**".
**CONSEQUENCE** Deferring payment for one's own services is neither a loan of
money nor high-cost credit at a 0% charge. **CONFIDENCE** `VERIFIED_PRIMARY` on
the text; `INFERENCE` on the application. **COUNSEL GATE** `Q1`.

---

## 3. Ceilings that apply if the client turns out to be a consumer

The public calculator cannot verify who is reading it. So the publicly
advertised schedules are built to the **strictest** of these ceilings.

| Jurisdiction | Consumer ceiling before regulation attaches | Source |
|---|---|---|
| US | **4 instalments or fewer** (excluding down payment), no finance charge | Reg Z §1026.2(a)(17)(i) |
| EU | paid in full **within 50 days of delivery**, no interest/charges | CCD2 art.2(2)(h) |
| UK | **≤12 payments within 12 months**, no interest or charges | RAO art.60F(2) |
| Québec | no charges ⇒ not "credit" (§2 above) | CPA s.1(f) |

**CLAIM** — In the US, more than four instalments is consumer credit **even with
no finance charge**.
**SOURCE** 12 CFR §1026.2(a)(17)(i): "A person who regularly extends consumer
credit that is subject to a finance charge **or is payable by written agreement
in more than four installments** (not including a down payment)".
**CONSEQUENCE** The publicly advertised maximum is 4 payments. Longer schedules
are business-only. Note §1026.2(a)(17)(v) — "regularly" means more than 25 times
in the preceding calendar year — so a low volume of consumer plans may not make
StillAwake a "creditor" at all; we do not rely on that, because volume changes.
**CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — US business credit is entirely exempt from Regulation Z.
**SOURCE** §1026.3(a): exempt is "(1) An extension of credit primarily for a
business, commercial or agricultural purpose. (2) An extension of credit to
other than a natural person." **CONFIDENCE** `VERIFIED_PRIMARY`.
**OPEN** State-level retail instalment sales and lender-licensing statutes are
**not** researched here and vary widely. `COUNSEL GATE Q4`.

**CLAIM** — In the EU, a supplier's own deferred payment escapes CCD2 only if it
is completed within 50 days of delivery.
**SOURCE** Directive (EU) 2023/2225 (CCD2) art.2(2)(h): excluded are deferred
payments where "(i) a supplier of goods or a provider of services, without a
third party offering credit, gives the consumer time to pay ...; (ii) the
purchase price is to be paid free of interest and without any other charges ...;
and (iii) the payment is to be entirely executed **within 50 days of the
delivery** of the good or service."
**CONSEQUENCE** For an EU consumer, any schedule running past delivery is
regulated consumer credit. EU consumer schedules are therefore disabled.
CCD2 applies from **20 November 2026** — i.e. imminent. **CONFIDENCE**
`VERIFIED_PRIMARY`.

**CLAIM** — The UK exempts ≤12 payments over ≤12 months where the credit is free
of interest and charges.
**SOURCE** Financial Services and Markets Act 2000 (Regulated Activities) Order
2001, art.60F(2): exempt where "(b) the number of payments to be made by the
borrower is not more than twelve, (c) those payments are required to be made
within a period of 12 months or less ..., and (d) the credit is ... (ii) provided
without interest or other charges".
**CONSEQUENCE** Sets our absolute ceiling of 12 payments / 12 months for any
schedule, anywhere. **CONFIDENCE** `VERIFIED_PRIMARY`.
**OPEN** The UK's BNPL reforms (S.I. 2025/1205; amendments dated 15/07/2026 on
the legislation.gov.uk record for art.60F) may narrow this. `COUNSEL GATE Q5`.

---

## 4. Interest, late fees and penalties

**CLAIM** — A late-payment interest rate expressed per month is capped at 5% per
annum unless the contract states the equivalent annual rate.
**SOURCE** *Interest Act*, RSC 1985 c. I-15, s.4: where interest is "made payable
at a rate or percentage per day, week, month, or at any rate ... for any period
less than a year, no interest exceeding the rate or percentage of five per cent
per annum shall be chargeable ... unless the contract contains **an express
statement of the yearly rate or percentage of interest** to which the other rate
or percentage is equivalent."
**CONSEQUENCE** The common agency clause "1.5% per month on overdue accounts",
written without "(18% per annum)", is recoverable only at 5%. Any late-interest
clause must state the annual rate. **CONFIDENCE** `VERIFIED_PRIMARY`.
Also s.3: where interest is payable but no rate is fixed, the rate is 5% p.a.

**CLAIM** — Flat late fees and NSF fees count as "interest" for the criminal-rate
offence, and the criminal rate is 35% APR.
**SOURCE** *Criminal Code*, RSC 1985 c. C-46, s.347(2): "'criminal rate' means an
annual percentage rate of interest ... that exceeds **35 per cent** on the credit
advanced"; "'interest' means the aggregate of all charges and expenses, whether
in the form of a **fee, fine, penalty, commission** or other similar charge ...
paid or payable for the advancing of credit".
**CONSEQUENCE** A flat fee on a small deferred balance can imply an enormous APR.
StillAwake charges **no** flat late or failed-payment fees. **CONFIDENCE**
`VERIFIED_PRIMARY`.

**CLAIM** — For consumer contracts in Québec, a stipulated fixed penalty is
outright prohibited.
**SOURCE** CPA s.13: "Any stipulation requiring the consumer, upon the
non-performance of his obligation, to pay a stipulated fixed amount or percentage
of charges, penalties or damages, **other than the interest accrued, is
prohibited**." And s.12: "No costs may be claimed from a consumer unless the
amount thereof is precisely indicated in the contract."
**CONSEQUENCE** No late fees, no "collection costs", no admin charges in consumer
agreements. We apply this to all agreements for simplicity.
**CONFIDENCE** `VERIFIED_PRIMARY`.

---

## 5. Acceleration and suspension

**CLAIM** — In a Québec consumer contract, an acceleration clause requires a
written notice with a statement of account and takes effect only after 30 days,
and the consumer may ask a court to vary the terms — and this applies **whether
or not the contract is a credit contract**.
**SOURCE** CPA s.14 ("Sections 105 to 110 apply, with the necessary
modifications, ... to contracts containing a clause of forfeiture of benefit of
the term, **whether or not such contracts are contracts of credit**"); s.105
(notice + statement of account); s.106 ("takes effect only after the expiry of
**30 days** following the receipt of the notice"); s.107 (court may vary).
**CONSEQUENCE** Zero-charge status does **not** buy us out of the acceleration
regime. Our model therefore prefers **suspension of work** over acceleration of
the balance. Where acceleration is used with a consumer, the 30-day notice is
mandatory. **CONFIDENCE** `VERIFIED_PRIMARY`.

---

## 6. Termination of the service contract

**CLAIM** — A consumer's right to terminate a service contract cannot be
contracted away.
**SOURCE** CPA s.11.4: "Any stipulation which excludes the application of all or
part of **articles 2125 and 2129 of the Civil Code** regarding the resiliation of
contracts of enterprise and for services is prohibited."
**CONSEQUENCE** CCQ art.2125 lets the client unilaterally resiliate even though
work is under way; art.2129 entitles the contractor to the value of work done and
expenses. A "no refunds, all instalments remain due on cancellation" clause is
unenforceable against a consumer. The agreement must instead settle up for work
performed. **CONFIDENCE** `VERIFIED_PRIMARY` as to s.11.4.
**OPEN** The CCQ articles themselves were not fetched in this pass; their effect
is stated from the CPA's reference to them. `COUNSEL GATE Q2`.

---

## 7. Ownership / IP until final payment

**CLAIM** — "StillAwake owns everything until final payment" is not a
free-standing safe clause.
**SOURCE** CPA s.15: "Sections 133 to 149 apply, with the necessary
modifications, to a contract, **whether a contract of credit or not**, whereby
the transfer of ownership of **goods sold** by a merchant to a consumer is
deferred until the performance by the consumer of the whole or a part of his
obligation."
**CONSEQUENCE** s.15 speaks of *goods*, so it does not obviously catch a licence
of software or copyright in a website. But it shows the legislature actively
polices deferred-ownership structures in consumer dealings, and the instalment
sale rules (s.133–149) carry repossession formalities we do not want to inherit.
**IMPLEMENTATION** Use a **licence that converts on final payment** rather than a
retention of ownership: StillAwake grants a limited licence to use deliverables
during the project, and assigns/licenses fully on payment in full. Background IP,
frameworks, reusable components and open-source stay StillAwake's or their
licensors' throughout. **CONFIDENCE** `INFERENCE`. `COUNSEL GATE Q3`.

---

## 8. French language — the workflow this actually forces

**CLAIM** — StillAwake's standard agreement is a contract of adhesion, so for a
Québec client the **French version must be handed over first**, and only then may
the parties agree to be bound by the English one.
**SOURCE** *Charter of the French Language*, CQLR c. C-11, s.55 (as amended by
2022 c.14 / Bill 96), first and second paragraphs: "Contracts pre-determined by
one party and the related documents, must be drawn up in French. The parties to
such a contract may be bound only by its version in a language other than French
**if, after its French version has been remitted to the adhering party**, such is
their express wish. ... No party may, **unless the French version of the contract
... has been given to the other party and that party has explicitly expressed
willingness** in that regard, (1) make the other party adhere to a contract of
adhesion drawn up in a language other than French; or (2) send the other party a
document related to that contract if the document is drawn up in a language other
than French."
**CONSEQUENCE — this is the point the boilerplate gets wrong.** A clause reading
"by signing, the client agrees to contract in English" is **not sufficient**. The
French version must actually have been provided *before* the election. Our flow
must therefore (a) generate the French version, (b) remit it, (c) record the
client's explicit election with a timestamp, and only then (d) proceed in
English. `recordLanguageElection` in the contract layer exists for this.
**CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — This is **not** limited to consumers. It binds B2B dealings too.
**SOURCE** s.55 speaks of "the adhering party", not "the consumer".
**CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — Clients outside Québec are exempt.
**SOURCE** s.55, fourth paragraph: the first paragraph does not apply to "(3) a
contract used in relations with **persons outside Québec**."
**CONSEQUENCE** The French-first workflow is triggered by the client being in
Québec, not by StillAwake being in Québec. **CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — We may not charge for the French version.
**SOURCE** s.55, third paragraph: "No party ... may require from the other party
any sum whatsoever for the drawing up of the French version".
**CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — Where the versions differ, the client picks whichever favours them.
**SOURCE** s.55 area / Charter provision on discrepancies: "the adhering party or
the consumer ... may invoke either version, according to his interests."
**CONSEQUENCE** The FR and EN versions must say the same thing. Divergence is a
one-way risk. **CONFIDENCE** `VERIFIED_PRIMARY`.

---

## 9. Sales tax timing — a real cash-flow consequence

**CLAIM** — Writing fixed payment dates into the agreement makes GST/QST payable
on those dates **whether or not the client actually pays**.
**SOURCE** *Excise Tax Act*, RSC 1985 c. E-15:
- s.152(1): consideration "shall be deemed to become due on the earliest of ...
  (c) the day the recipient is **required to pay** that consideration or part to
  the supplier **pursuant to an agreement in writing**."
- s.168(1): "Tax ... is payable by the recipient on the earlier of the day the
  consideration ... is paid and the day the consideration ... **becomes due**."
- s.168(2): where consideration becomes due on more than one day, tax is payable
  on each such day on that part.
**CONSEQUENCE** Longer schedules mean remitting tax on money not yet received.
This is an independent, non-consumer-law reason to keep schedules short and to
take a meaningful deposit. **CONFIDENCE** `VERIFIED_PRIMARY`.

**CLAIM** — A true deposit is not taxed until applied.
**SOURCE** ETA s.168(9): "a deposit ..., whether refundable or not, given in
respect of a supply shall not be considered as consideration paid for the supply
**unless and until the supplier applies the deposit** as consideration".
**CONSEQUENCE** If the first payment is invoiced as the first instalment (not
held as a deposit), tax applies immediately. Our schedules invoice each payment,
so tax follows each invoice. **CONFIDENCE** `VERIFIED_PRIMARY`.
**OPEN** QST is broadly harmonised with GST but was not separately verified in
this pass. `COUNSEL GATE Q6`.

---

## 10. What is enabled, and what is not

Enforced by `payments.ts`. Public advertising is deliberately narrower than what
may be offered in a written proposal.

| Schedule | Public calculator | In proposal (B2B) | Consumer |
|---|---|---|---|
| Pay in full | yes | yes | yes |
| 2 payments | **yes** | yes | yes |
| 3 payments | **yes** | yes | yes |
| 4 payments | **yes** | yes | yes |
| 6 payments | no | B2B, supported jurisdictions | **disabled** |
| 12 payments | no | B2B, ≤12 months, counsel gate `Q5` | **disabled** |
| Interest-bearing | no | no | no |
| Higher price for instalments | **never** — s.70(g) | never | never |
| Third-party financing | no — not offered | no | no |

Public cap of 4 is the US Reg Z line. Everything advertised publicly is
simultaneously within the US (≤4), UK (≤12/12mo), EU (completed by delivery) and
Québec (no charges) ceilings, so it is safe regardless of who is reading.

---

## 11. Counsel gates

Each must be answered by a Québec-qualified lawyer before the corresponding
capability is switched on. None can be self-certified.

- **Q1** — Does a 0%-charge, same-price instalment schedule for services fall
  outside "credit" in CPA s.1(f), such that no OPC permit (s.321) and no credit
  disclosure (s.66 ff.) is required? *Gates: consumer instalment schedules.*
- **Q2** — Given CPA s.11.4 and CCQ arts. 2125/2129, what is the maximum
  enforceable cancellation position against a consumer mid-project?
  *Gates: cancellation terms for consumers.*
- **Q3** — Is a licence-converting-on-final-payment structure preferable to
  retention of ownership, and does CPA s.15 reach software deliverables?
  *Gates: the IP clause.*
- **Q4** — Which US states' retail instalment sales / lender licensing statutes
  are triggered by a >4-instalment consumer plan? *Gates: US consumer schedules.*
- **Q5** — Do the UK BNPL reforms (S.I. 2025/1205, effective 2026) remove the
  art.60F(2) exemption for merchant-provided deferred payment?
  *Gates: 12-payment schedules.*
- **Q6** — QST timing parity with ETA ss.152/168, and QST on a forfeited deposit.
  *Gates: nothing; accounting accuracy only.*

Until each is answered, the corresponding capability stays `false` in
`payments.ts` and the contract status stays `COUNSEL_REVIEW_RECOMMENDED`.

---

## 12. Source register

| # | Instrument | Provisions used | URL |
|---|---|---|---|
| 1 | Consumer Protection Act, CQLR c. P-40.1 (QC) | 1(e), 1(f), 2, 11.4, 12, 13, 14, 15, 66, 70(g), 105–107, 321 | https://www.legisquebec.gouv.qc.ca/en/document/cs/P-40.1 |
| 2 | Charter of the French Language, CQLR c. C-11 | 55 | https://www.legisquebec.gouv.qc.ca/en/document/cs/C-11 |
| 3 | Interest Act, RSC 1985 c. I-15 | 3, 4 | https://laws-lois.justice.gc.ca/eng/acts/I-15/ |
| 4 | Criminal Code, RSC 1985 c. C-46 | 347(1), 347(2) | https://laws-lois.justice.gc.ca/eng/acts/C-46/section-347.html |
| 5 | Excise Tax Act, RSC 1985 c. E-15 | 152(1), 168(1), 168(2), 168(9) | https://laws-lois.justice.gc.ca/eng/acts/E-15/ |
| 6 | Regulation Z, 12 CFR Part 1026 (US) | 1026.2(a)(17), 1026.3(a) | https://www.ecfr.gov/current/title-12/part-1026 |
| 7 | Directive (EU) 2023/2225 (CCD2) | 2(2)(h), 3(1) | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023L2225 |
| 8 | FSMA 2000 (Regulated Activities) Order 2001 (UK) | 60F(2) | https://www.legislation.gov.uk/uksi/2001/544/article/60F |

All fetched and quoted 2026-08-15. Statutes change; re-verify before relying on
this document after **2027-02-15**.

## 13. Not researched

Deliberately out of scope for this pass. Do not assume these are safe.

- Provinces other than Québec, individually (Ontario CPA 2002/2023, BC BPCPA,
  Alberta CPA). Canadian consumers outside Québec are treated as unsupported.
- US state law of any kind.
- Any jurisdiction outside CA/US/EU/UK.
- Subscriptions, retainers, care plans, hosting and maintenance billing. These
  are a different legal animal (contracts involving sequential performance, with
  their own cancellation regimes) and were explicitly excluded from this pass.
- PCI-DSS and payment-processor contractual terms.
- Whether StillAwake's own Stripe agreement permits scheduled invoicing of this
  kind.
