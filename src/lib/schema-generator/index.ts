/**
 * Schema markup generator: field definitions, JSON-LD builder and validator
 * for /tools/schema-markup-generator.
 *
 * Kept free of React so the rules can be unit-tested and so the page copy and
 * the validator cannot drift apart: the page renders FIELD help text and the
 * validator reads the same `level` on each field.
 *
 * Requirement levels follow Google Search Central's structured-data docs
 * (checked 2026-10-29). Where Google lists no required properties
 * (Organization, Article, Person), the generator still requires a name or
 * headline, because markup without one describes nothing. Those are labelled
 * "needed" rather than "required by Google" in the UI.
 */

export type SchemaType =
  | "Organization"
  | "LocalBusiness"
  | "Article"
  | "Product"
  | "BreadcrumbList"
  | "FAQPage"
  | "Person";

export type FieldKind = "text" | "textarea" | "url" | "urls" | "date" | "email" | "tel" | "number" | "select";
export type Level = "required" | "recommended" | "optional";

export type Field = {
  key: string;
  label: string;
  kind: FieldKind;
  level: Level;
  help?: string;
  placeholder?: string;
  options?: readonly string[];
};

/** Rows for the two list-shaped types. `a`/`b` are name+url or question+answer. */
export type Row = { a: string; b: string };

export type FormState = { values: Record<string, string>; rows: Row[] };

export type Issue = { level: "error" | "warning" | "note"; field?: string; message: string };

export const SCHEMA_TYPES: readonly { type: SchemaType; label: string; blurb: string }[] = [
  { type: "Organization", label: "Organization", blurb: "Who runs the site: name, logo, profiles." },
  { type: "LocalBusiness", label: "Local business", blurb: "A business with a physical address customers visit or are served from." },
  { type: "Article", label: "Article / blog post", blurb: "Headline, author and dates for an article page." },
  { type: "Product", label: "Product", blurb: "A product with a price, or with ratings and reviews." },
  { type: "BreadcrumbList", label: "Breadcrumbs", blurb: "The trail from the homepage to this page." },
  { type: "FAQPage", label: "FAQ page", blurb: "Questions and answers. Google retired the FAQ rich result in May 2026." },
  { type: "Person", label: "Person", blurb: "An author, founder or public figure." },
];

export const LOCAL_BUSINESS_SUBTYPES = [
  "LocalBusiness",
  "ProfessionalService",
  "Store",
  "Restaurant",
  "HomeAndConstructionBusiness",
  "AutomotiveBusiness",
  "HealthAndBeautyBusiness",
  "LegalService",
  "MedicalBusiness",
  "FinancialService",
] as const;

export const ARTICLE_SUBTYPES = ["Article", "BlogPosting", "NewsArticle"] as const;

export const AVAILABILITY = ["InStock", "OutOfStock", "PreOrder", "BackOrder", "Discontinued", "LimitedAvailability"] as const;

const NAME: Field = { key: "name", label: "Name", kind: "text", level: "required" };
const URL_F: Field = { key: "url", label: "Website or page URL", kind: "url", level: "recommended", placeholder: "https://example.com" };
const SAME_AS: Field = {
  key: "sameAs",
  label: "Profiles elsewhere (one URL per line)",
  kind: "urls",
  level: "recommended",
  help: "LinkedIn, Instagram, Wikipedia, a Google Business Profile link. These tie the entity to independent sources.",
};
const ADDRESS: Field[] = [
  { key: "streetAddress", label: "Street address", kind: "text", level: "required" },
  { key: "addressLocality", label: "City", kind: "text", level: "required" },
  { key: "addressRegion", label: "Province / state", kind: "text", level: "required", placeholder: "QC" },
  { key: "postalCode", label: "Postal code", kind: "text", level: "required" },
  { key: "addressCountry", label: "Country (2-letter code)", kind: "text", level: "required", placeholder: "CA" },
];

export const FIELDS: Record<SchemaType, Field[]> = {
  Organization: [
    { ...NAME, help: "The name you trade under, exactly as it appears on your site." },
    URL_F,
    { key: "logo", label: "Logo URL", kind: "url", level: "recommended", help: "A square or wide image file, at least 112×112px." },
    { key: "description", label: "Description", kind: "textarea", level: "recommended", help: "One or two plain sentences on what you do and for whom." },
    { key: "email", label: "Email", kind: "email", level: "optional" },
    { key: "telephone", label: "Phone", kind: "tel", level: "optional", placeholder: "+1-514-555-0100" },
    SAME_AS,
  ],
  LocalBusiness: [
    { key: "subtype", label: "Business type", kind: "select", level: "required", options: LOCAL_BUSINESS_SUBTYPES, help: "Pick the most specific type that is true. LocalBusiness is the safe default." },
    NAME,
    ...ADDRESS,
    { key: "telephone", label: "Phone", kind: "tel", level: "recommended", placeholder: "+1-514-555-0100" },
    URL_F,
    { key: "image", label: "Photo URL", kind: "url", level: "recommended", help: "A real photo of the business, storefront or work." },
    { key: "priceRange", label: "Price range", kind: "text", level: "optional", placeholder: "$$", help: "Fewer than 100 characters, e.g. $$ or $50–$200." },
    { key: "openingHours", label: "Opening hours (one rule per line)", kind: "textarea", level: "recommended", placeholder: "Mo-Fr 09:00-17:00\nSa 10:00-14:00", help: "Days as Mo Tu We Th Fr Sa Su, times in 24-hour HH:MM." },
    { key: "latitude", label: "Latitude", kind: "number", level: "recommended", placeholder: "45.5019" },
    { key: "longitude", label: "Longitude", kind: "number", level: "recommended", placeholder: "-73.5674" },
    SAME_AS,
  ],
  Article: [
    { key: "subtype", label: "Article type", kind: "select", level: "required", options: ARTICLE_SUBTYPES },
    { key: "headline", label: "Headline", kind: "text", level: "required", help: "The article's title as shown on the page." },
    { key: "url", label: "Article URL", kind: "url", level: "recommended" },
    { key: "image", label: "Image URL(s), one per line", kind: "urls", level: "recommended", help: "Google recommends 16×9, 4×3 and 1×1 versions." },
    { key: "authorName", label: "Author name", kind: "text", level: "recommended", help: "A real person or organization, not a job title." },
    { key: "authorUrl", label: "Author profile URL", kind: "url", level: "recommended", help: "A page about the author, so the name resolves to someone." },
    { key: "datePublished", label: "Date published", kind: "date", level: "recommended" },
    { key: "dateModified", label: "Date modified", kind: "date", level: "recommended" },
    { key: "publisherName", label: "Publisher name", kind: "text", level: "optional" },
  ],
  Product: [
    NAME,
    { key: "description", label: "Description", kind: "textarea", level: "recommended" },
    { key: "image", label: "Image URL(s), one per line", kind: "urls", level: "recommended" },
    { key: "brand", label: "Brand", kind: "text", level: "recommended" },
    { key: "sku", label: "SKU", kind: "text", level: "optional" },
    { key: "gtin", label: "GTIN / UPC / EAN", kind: "text", level: "optional", help: "8, 12, 13 or 14 digits." },
    { key: "price", label: "Price", kind: "number", level: "recommended", placeholder: "49.99", help: "Numbers only. No currency symbol, no thousands separator." },
    { key: "priceCurrency", label: "Currency (ISO 4217)", kind: "text", level: "recommended", placeholder: "CAD" },
    { key: "availability", label: "Availability", kind: "select", level: "recommended", options: AVAILABILITY },
    { key: "offerUrl", label: "Product page URL", kind: "url", level: "optional" },
    { key: "ratingValue", label: "Average rating", kind: "number", level: "optional", help: "Only if real customer ratings appear on the page." },
    { key: "reviewCount", label: "Number of reviews", kind: "number", level: "optional" },
  ],
  BreadcrumbList: [],
  FAQPage: [],
  Person: [
    NAME,
    URL_F,
    { key: "jobTitle", label: "Job title", kind: "text", level: "recommended" },
    { key: "worksFor", label: "Works for (organization name)", kind: "text", level: "recommended" },
    { key: "image", label: "Photo URL", kind: "url", level: "optional" },
    { key: "description", label: "Short bio", kind: "textarea", level: "optional" },
    SAME_AS,
  ],
};

/** Labels for the row editor on the two list-shaped types. */
export const ROW_LABELS: Partial<Record<SchemaType, { a: string; b: string; add: string; min: number }>> = {
  BreadcrumbList: { a: "Page name", b: "Page URL", add: "Add a level", min: 2 },
  FAQPage: { a: "Question", b: "Answer", add: "Add a question", min: 1 },
};

/** Example data so the tool opens in a working state. Clearly fictional. */
export const EXAMPLES: Record<SchemaType, FormState> = {
  Organization: {
    values: {
      name: "Example Studio",
      url: "https://example.com",
      logo: "https://example.com/logo.png",
      description: "A Montréal design studio building websites for small businesses.",
      sameAs: "https://www.linkedin.com/company/example-studio",
    },
    rows: [],
  },
  LocalBusiness: {
    values: {
      subtype: "ProfessionalService",
      name: "Example Studio",
      streetAddress: "123 Rue Example",
      addressLocality: "Montréal",
      addressRegion: "QC",
      postalCode: "H2X 1Y4",
      addressCountry: "CA",
      telephone: "+1-514-555-0100",
      url: "https://example.com",
      openingHours: "Mo-Fr 09:00-17:00",
    },
    rows: [],
  },
  Article: {
    values: {
      subtype: "BlogPosting",
      headline: "How to choose a website platform",
      url: "https://example.com/blog/choose-a-platform",
      authorName: "Alex Example",
      authorUrl: "https://example.com/about/alex",
      datePublished: "2026-10-01",
      dateModified: "2026-10-20",
    },
    rows: [],
  },
  Product: {
    values: { name: "Example Mug", brand: "Example Studio", price: "24.00", priceCurrency: "CAD", availability: "InStock", image: "https://example.com/mug.jpg" },
    rows: [],
  },
  BreadcrumbList: {
    values: {},
    rows: [
      { a: "Home", b: "https://example.com/" },
      { a: "Guides", b: "https://example.com/guides" },
      { a: "Choosing a platform", b: "https://example.com/guides/choosing-a-platform" },
    ],
  },
  FAQPage: {
    values: {},
    rows: [
      { a: "Do you work with clients outside Montréal?", b: "Yes. Most projects run remotely, with calls scheduled in Eastern time." },
      { a: "How long does a website take?", b: "A small business site usually takes four to eight weeks from kickoff to launch." },
    ],
  },
  Person: {
    values: { name: "Alex Example", url: "https://example.com/about/alex", jobTitle: "Founder", worksFor: "Example Studio" },
    rows: [],
  },
};

const lines = (s: string | undefined) =>
  (s ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

const clean = (s: string | undefined) => (s ?? "").trim();

/** Drops empty strings, empty arrays and objects that end up holding only @type. */
function prune(value: unknown): unknown {
  if (Array.isArray(value)) {
    const out = value.map(prune).filter((v) => v !== undefined);
    return out.length ? out : undefined;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const p = prune(v);
      if (p !== undefined) out[k] = p;
    }
    const keys = Object.keys(out);
    if (!keys.length || (keys.length === 1 && keys[0] === "@type")) return undefined;
    return out;
  }
  if (typeof value === "string") return value.trim() ? value.trim() : undefined;
  return value;
}

const num = (s: string | undefined) => {
  const v = clean(s);
  return v && Number.isFinite(Number(v)) ? Number(v) : v || undefined;
};

/** Builds the JSON-LD object for a type. Empty fields are left out. */
export function buildSchema(type: SchemaType, form: FormState): Record<string, unknown> {
  const v = form.values;
  const one = (k: string) => clean(v[k]) || undefined;
  const many = (k: string) => {
    const l = lines(v[k]);
    return l.length > 1 ? l : l[0];
  };
  let body: Record<string, unknown>;

  switch (type) {
    case "Organization":
      body = { "@type": "Organization", name: one("name"), url: one("url"), logo: one("logo"), description: one("description"), email: one("email"), telephone: one("telephone"), sameAs: lines(v.sameAs) };
      break;
    case "LocalBusiness":
      body = {
        "@type": one("subtype") || "LocalBusiness",
        name: one("name"),
        image: one("image"),
        url: one("url"),
        telephone: one("telephone"),
        priceRange: one("priceRange"),
        address: {
          "@type": "PostalAddress",
          streetAddress: one("streetAddress"),
          addressLocality: one("addressLocality"),
          addressRegion: one("addressRegion"),
          postalCode: one("postalCode"),
          addressCountry: one("addressCountry")?.toUpperCase(),
        },
        geo: { "@type": "GeoCoordinates", latitude: num(v.latitude), longitude: num(v.longitude) },
        openingHours: lines(v.openingHours).length > 1 ? lines(v.openingHours) : lines(v.openingHours)[0],
        sameAs: lines(v.sameAs),
      };
      break;
    case "Article":
      body = {
        "@type": one("subtype") || "Article",
        headline: one("headline"),
        url: one("url"),
        mainEntityOfPage: one("url"),
        image: many("image"),
        author: { "@type": "Person", name: one("authorName"), url: one("authorUrl") },
        datePublished: one("datePublished"),
        dateModified: one("dateModified"),
        publisher: { "@type": "Organization", name: one("publisherName") },
      };
      break;
    case "Product": {
      const hasRating = clean(v.ratingValue) || clean(v.reviewCount);
      body = {
        "@type": "Product",
        name: one("name"),
        description: one("description"),
        image: many("image"),
        brand: { "@type": "Brand", name: one("brand") },
        sku: one("sku"),
        gtin: one("gtin"),
        offers: {
          "@type": "Offer",
          price: one("price"),
          priceCurrency: one("priceCurrency")?.toUpperCase(),
          availability: one("availability") ? `https://schema.org/${one("availability")}` : undefined,
          url: one("offerUrl"),
        },
        aggregateRating: hasRating ? { "@type": "AggregateRating", ratingValue: num(v.ratingValue), reviewCount: num(v.reviewCount) } : undefined,
      };
      break;
    }
    case "BreadcrumbList": {
      const rows = form.rows.filter((r) => clean(r.a) || clean(r.b));
      body = {
        "@type": "BreadcrumbList",
        itemListElement: rows.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: clean(r.a), item: clean(r.b) || undefined })),
      };
      break;
    }
    case "FAQPage": {
      const rows = form.rows.filter((r) => clean(r.a) || clean(r.b));
      body = {
        "@type": "FAQPage",
        mainEntity: rows.map((r) => ({ "@type": "Question", name: clean(r.a), acceptedAnswer: { "@type": "Answer", text: clean(r.b) } })),
      };
      break;
    }
    case "Person":
      body = { "@type": "Person", name: one("name"), url: one("url"), jobTitle: one("jobTitle"), worksFor: { "@type": "Organization", name: one("worksFor") }, image: one("image"), description: one("description"), sameAs: lines(v.sameAs) };
      break;
  }

  return { "@context": "https://schema.org", ...((prune(body) as Record<string, unknown>) ?? { "@type": type }) };
}

/** The JSON-LD as page-ready text, optionally wrapped in its script tag. */
export function renderJsonLd(schema: Record<string, unknown>, wrap: boolean) {
  // Escaping "<" keeps a value like "</script>" from closing the tag early.
  const json = JSON.stringify(schema, null, 2).replace(/</g, "\\u003c");
  return wrap ? `<script type="application/ld+json">\n${json}\n</script>` : json;
}

const isUrl = (s: string) => {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
};
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/.test(s) && !Number.isNaN(Date.parse(s));
const HOURS = /^(Mo|Tu|We|Th|Fr|Sa|Su)([-,](Mo|Tu|We|Th|Fr|Sa|Su))*( ([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d)?$/;

/** Checks the form against the field rules plus the type-specific ones. */
export function validate(type: SchemaType, form: FormState): Issue[] {
  const issues: Issue[] = [];
  const v = form.values;

  for (const f of FIELDS[type]) {
    const raw = clean(v[f.key]);
    if (!raw) {
      if (f.level === "required") issues.push({ level: "error", field: f.key, message: `${f.label} is required.` });
      else if (f.level === "recommended") issues.push({ level: "warning", field: f.key, message: `${f.label} is recommended.` });
      continue;
    }
    if (f.kind === "url" && !isUrl(raw)) issues.push({ level: "error", field: f.key, message: `${f.label} must be a full URL starting with https://.` });
    if (f.kind === "urls") {
      const bad = lines(raw).filter((l) => !isUrl(l));
      if (bad.length) issues.push({ level: "error", field: f.key, message: `${f.label}: "${bad[0]}" is not a full URL.` });
    }
    if (f.kind === "date" && !isDate(raw)) issues.push({ level: "error", field: f.key, message: `${f.label} must be an ISO 8601 date, like 2026-10-29.` });
    if (f.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) issues.push({ level: "error", field: f.key, message: `${f.label} doesn't look like an email address.` });
    if (f.kind === "tel" && !/^\+?[\d\s().-]{7,}$/.test(raw)) issues.push({ level: "warning", field: f.key, message: `${f.label}: use digits with the country code, like +1-514-555-0100.` });
    if (f.kind === "number" && !Number.isFinite(Number(raw))) issues.push({ level: "error", field: f.key, message: `${f.label} must be a plain number, like 49.99.` });
  }

  if (type === "LocalBusiness") {
    const country = clean(v.addressCountry);
    if (country && !/^[A-Za-z]{2}$/.test(country)) issues.push({ level: "error", field: "addressCountry", message: "Country must be a 2-letter ISO 3166 code, like CA or US." });
    for (const l of lines(v.openingHours)) if (!HOURS.test(l)) issues.push({ level: "error", field: "openingHours", message: `Opening hours "${l}" isn't in the form Mo-Fr 09:00-17:00.` });
    const lat = Number(clean(v.latitude)), lng = Number(clean(v.longitude));
    if (clean(v.latitude) && (lat < -90 || lat > 90)) issues.push({ level: "error", field: "latitude", message: "Latitude must be between -90 and 90." });
    if (clean(v.longitude) && (lng < -180 || lng > 180)) issues.push({ level: "error", field: "longitude", message: "Longitude must be between -180 and 180." });
    if (clean(v.priceRange).length >= 100) issues.push({ level: "error", field: "priceRange", message: "Price range must be under 100 characters." });
  }

  if (type === "Article") {
    const pub = clean(v.datePublished), mod = clean(v.dateModified);
    if (pub && mod && isDate(pub) && isDate(mod) && Date.parse(mod) < Date.parse(pub)) issues.push({ level: "error", field: "dateModified", message: "Date modified is earlier than date published." });
  }

  if (type === "Product") {
    const price = clean(v.price), cur = clean(v.priceCurrency);
    const hasOffer = !!price;
    const hasRating = !!clean(v.ratingValue) && !!clean(v.reviewCount);
    if (!hasOffer && !hasRating) issues.push({ level: "error", message: "Google's product snippets need a price, or a rating with a review count. Add one of them." });
    // Only the case the generic number check lets through (e.g. "1e3", "-5"); otherwise it would repeat.
    if (price && Number.isFinite(Number(price)) && /[^\d.]/.test(price)) issues.push({ level: "error", field: "price", message: "Price must be digits and a decimal point only, like 1299.00." });
    if (price && !cur) issues.push({ level: "error", field: "priceCurrency", message: "A price needs its currency, like CAD." });
    if (cur && !/^[A-Za-z]{3}$/.test(cur)) issues.push({ level: "error", field: "priceCurrency", message: "Currency must be a 3-letter ISO 4217 code, like CAD or USD." });
    const r = Number(clean(v.ratingValue));
    if (clean(v.ratingValue) && (r < 0 || r > 5)) issues.push({ level: "warning", field: "ratingValue", message: "Ratings are assumed to be out of 5. A different scale needs bestRating set." });
    if (clean(v.ratingValue) && !clean(v.reviewCount)) issues.push({ level: "error", field: "reviewCount", message: "A rating needs the number of reviews behind it." });
    const gtin = clean(v.gtin);
    if (gtin && !/^(\d{8}|\d{12}|\d{13}|\d{14})$/.test(gtin)) issues.push({ level: "error", field: "gtin", message: "GTIN must be 8, 12, 13 or 14 digits." });
  }

  const rowSpec = ROW_LABELS[type];
  if (rowSpec) {
    const rows = form.rows.filter((r) => clean(r.a) || clean(r.b));
    if (rows.length < rowSpec.min) issues.push({ level: "error", message: type === "BreadcrumbList" ? "A breadcrumb trail needs at least two levels." : "Add at least one question and answer." });
    rows.forEach((r, i) => {
      if (!clean(r.a)) issues.push({ level: "error", message: `Row ${i + 1}: ${rowSpec.a} is empty.` });
      if (type === "FAQPage" && !clean(r.b)) issues.push({ level: "error", message: `Row ${i + 1}: Answer is empty.` });
      if (type === "BreadcrumbList") {
        const last = i === rows.length - 1;
        if (!clean(r.b) && !last) issues.push({ level: "error", message: `Row ${i + 1}: every level except the last needs a URL.` });
        if (clean(r.b) && !isUrl(clean(r.b))) issues.push({ level: "error", message: `Row ${i + 1}: "${clean(r.b)}" is not a full URL.` });
      }
    });
  }

  if (type === "FAQPage") {
    issues.push({ level: "note", message: "Google stopped showing FAQ rich results on 7 May 2026. FAQPage is still valid schema.org markup that other systems can read, but it won't produce a rich result in Google Search." });
  }

  return issues;
}
