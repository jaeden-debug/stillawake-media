---
title: "Intelligent Document Processing, Explained Honestly"
date: "2026-08-15"
excerpt: "IDP is the step after OCR: it decides what the extracted characters mean. That step is where the value is, and also where vendor accuracy claims stop being trustworthy at document scale."
category: "AI Automation"
featured: false
author: "Jaeden Doody"
---

# Intelligent Document Processing, Explained Honestly

**Intelligent document processing is the step after OCR. OCR turns an image into characters; IDP decides what those characters mean — which number is the invoice total, which date is the due date, which rows belong to a single line item — and attaches a confidence score to each answer. The extra step is where the business value is, and it is also the reason a "99% accurate" claim can be technically true and practically useless.**

## IDP versus OCR versus "AI document processing"

**OCR** converts pixels into text. Mature, commoditized, and on clean printed documents it is close to solved.

**IDP** takes that text plus its position on the page and produces structured fields: `invoice_number`, `total`, `due_date`, `line_items[]`. Modern systems are layout-aware — they read where something sits, not just what it says — which is why a total is identified partly by being bottom-right and bold, not only by the word "Total". That layout dependence is also why tables and multi-column pages are the hard part rather than the easy part.

**"AI document processing"** is a marketing term that covers both, plus classification (what kind of document is this) and sometimes downstream reasoning. When evaluating vendors, force the distinction: ask which fields are extracted, and what happens when the model is unsure.

## Why "99% accurate" is misleading

The number is meaningless without a unit. Vendors quote three different ones, and they are not close to interchangeable.

**Character-level accuracy** is the friendliest. At 99% character accuracy, a 12-character invoice number has a `1 − 0.99¹²` chance of containing at least one wrong character — about **11%**. Roughly one invoice number in nine is wrong, from a headline figure of 99%.

**Field-level accuracy** is what actually matters, and it compounds the same way. At 98% per field across 20 fields, `1 − 0.98²⁰` means about **33% of documents** contain at least one incorrect field.

**Document-level accuracy** — every field correct on the whole document — is the only number that maps to "can this go through without a human". It is always the lowest and it is almost never the one quoted.

And all three are measured on the vendor's benchmark set, not your mail. Ask two questions: accurate at what unit, and measured on whose documents.

## Where accuracy genuinely breaks down

The failure modes are consistent and predictable:

- **Handwriting**, especially cursive and free-form annotations in margins — the "approved, use PO 4471" scrawl that changes the meaning of the document.
- **Tables**, particularly ones that span pages, use merged cells, or carry a subtotal row that looks structurally identical to a line item.
- **Poor captures.** Phone photos with skew and shadow, 200 dpi scans, fax artifacts, and thermal receipts that have faded to low contrast.
- **Multi-column layouts**, where reading order becomes genuinely ambiguous and text from column two can be interleaved into column one.
- **Overlapping marks** — stamps and signatures crossing printed text.
- **Bilingual documents.** In Canada, invoices with French and English labels side by side confuse field classifiers trained on one language, and *Total* meaning the same thing in both is not the reassurance it appears to be — *Date* is not, and *Facture* versus *Invoice* headers change which layout template the classifier picks.

Notice that none of these are exotic. They are what real inboxes contain, which is why pilots run on clean sample documents produce numbers that do not survive contact with production.

## The metric that actually matters: straight-through rate

Working IDP systems are not built around being right. They are built around knowing when they might be wrong.

Each extracted field comes with a confidence score. You set a threshold; anything below it routes to a human. The real design decision is not "how accurate is the model" — it is **what confidence threshold you set, and what the resulting review queue costs**.

That makes **straight-through processing rate** the number to optimize: the percentage of documents that clear the whole pipeline without human touch, at an error rate you have agreed is acceptable. A system with 92% accuracy and well-calibrated confidence beats a system with 96% accuracy that is confidently wrong, because the first one flags its own failures and the second one launders them into your ledger.

Ask any vendor for their calibration behaviour, not just their accuracy. A model that reports high confidence on wrong answers is worse than a less accurate honest one.

## How to size a pilot honestly

Five steps, and the third is the one that gets skipped:

1. **Pull a real sample.** 100–200 documents drawn at random from the last twelve months. Not the clean ones. Random means the phone photos and the faxes come along.
2. **Label ground truth by hand.** Someone types out what every field should be. This is tedious and unavoidable — without it you have no denominator and cannot measure accuracy at all, only vibes.
3. **Measure straight-through rate at your chosen threshold**, plus the average time to clear one exception. The second number is what determines staffing.
4. **Compute payback against review cost, not entry cost.** The comparison is not "typing time versus zero". It is "typing time versus review time plus exception handling plus the maintenance of a pipeline".
5. **Plan for the low end of your confidence interval.** A 90% straight-through result measured on 150 documents is really somewhere around 84–94%. Staff for 84%. If it lands better, you are pleasantly surprised instead of short-handed.

An honest limitation: sample sizes that small cannot tell you about the rare document type that is 2% of volume and 40% of your pain. Ask the people who currently do the work which documents they dread, and make sure those are in the sample deliberately.

## The regression problem, and what protects against it

Document pipelines drift. A supplier changes their invoice template, a model version updates, and extraction quality degrades silently — the same silent-failure pattern that affects every automation. The protection is a fixed set of documents with known correct answers, run on every change.

We use exactly that pattern on [BankDeMark](/work/bankdemark), a product Jaeden owns and operates rather than a client project: **26 golden test cases** across 13 calculators, run before anything ships. The domain is different; the discipline is identical. If you cannot re-verify a known set of inputs after a change, you cannot safely change anything.

## What IDP does not solve

It does not fix the reason you are extracting data in the first place.

If a supplier emails PDFs, IDP reads the PDFs — but the higher-return fix is often getting the data structured at source: a form, an API, an EDI feed, a portal upload. That is unglamorous and frequently unavailable, because the sender has no incentive to change. Still, before scoping an extraction project, count how much of the volume comes from your top five senders. If it is most of it, a conversation with five counterparties may beat a pipeline.

IDP is the right answer when the source is genuinely outside your control and the volume is genuinely high. It is the wrong answer when it is being used to avoid a process conversation.

If you have a document workload and want an honest read on whether a pipeline pays back, our [AI automation](/ai-automation) and [custom software development](/software-development) work starts with the sample-and-measure step above, and [pricing](/pricing) reflects that. Describe it in writing at [stillawake.studio/start](https://stillawake.studio/start) — you get a written scope back, not a sales call.
