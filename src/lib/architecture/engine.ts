/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE ARCHITECTURE RECOMMENDER — 3 of 5 · THE ENGINE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Deterministic, explainable, and biased toward LESS.
 *
 * No model is called here and none should be. A recommendation that changes
 * between two identical inputs is not advice, and a stack assembled by
 * plausible-sounding generation is exactly the failure this file exists to
 * prevent. Every output is a pure function of `ProjectRequirements`, every
 * decision names the signal that drove it, and the whole thing is tested
 * against twelve archetypes that assert what is NOT recommended.
 *
 * ── THE LADDER ───────────────────────────────────────────────────────────
 *
 * `classify` walks DOWN a complexity ladder and stops at the first class whose
 * requirements are genuinely met. It never climbs to the most capable class
 * the requirements would tolerate. Two tests decide almost everything:
 *
 *   Does anyone SIGN IN?            → if no, there is no auth and no database.
 *   Does the business STORE things  → if no, there is no backend of ours.
 *   beyond pages and enquiries?
 *
 * Nearly every over-engineered proposal in this industry fails one of those
 * two questions and gets built anyway.
 *
 * ── THE ORDER OF PREFERENCE ──────────────────────────────────────────────
 *
 *   simplicity → requirements fit → maintainability → client usability →
 *   cost → scalability
 *
 * Scalability last, deliberately. "It'll scale" is the most expensive sentence
 * in software and it is almost always answering a question nobody asked.
 */

import type {
  Alternative,
  ArchitectureClassId,
  Complexity,
  Component,
  Confidence,
  EducationalLinkId,
  ProjectRequirements,
  Recommendation,
} from "./types";

/** Bumped when the RULES change — not when a label is reworded. */
export const ARCHITECTURE_VERSION = "2026.08.1";

/* ── classification ───────────────────────────────────────────────────────── */

type Classification = {
  classId: ArchitectureClassId;
  reasons: string[];
  /** More than one setup would genuinely have worked. Caps confidence at `reasonable`. */
  closeCall: boolean;
};

/**
 * Does this need to be an application?
 *
 * The bar is people signing in, or the business owning data beyond its pages
 * and its enquiries. Not "it feels complicated", not "they mentioned an
 * integration", and emphatically not "they have a lot of pages".
 */
function needsApplication(r: ProjectRequirements): boolean {
  return r.accounts !== "none" || r.persistentData;
}

/**
 * Does a CUSTOM FRONTEND earn its place, or would a builder do?
 *
 * This is the most-abused decision in the field, so the list is closed and
 * every entry is a thing builders are genuinely bad at: search-led content at
 * scale, programmatic location pages, a second language done properly,
 * behaviour the platform does not have, and integrations that need real code.
 * "The design is ambitious" is NOT on the list — builders are good at design.
 */
function needsCustomFrontend(r: ProjectRequirements): boolean {
  return (
    r.seo === "strategic" ||
    r.contentScale === "large" ||
    r.multiLocation ||
    r.customWorkflow ||
    r.integrations === "internal" ||
    r.bookings === "build" ||
    r.ordering === "build"
  );
}

/**
 * Is there content worth managing, or is this a page that gets written once?
 *
 * Scale counts as much as stated intent here. A site with a services section,
 * an about page and a handful of others accumulates edits whether or not
 * anyone ticked a box saying so, and being unable to change your own opening
 * hours is a worse outcome than an editor nobody opens.
 */
function needsManagedContent(r: ProjectRequirements): boolean {
  if (r.editing === "frequent") return true;
  if (r.contentScale === "large" || r.contentScale === "standard") return true;
  if (r.seo === "strategic") return true;
  return false;
}

function classify(r: ProjectRequirements): Classification {
  const reasons: string[] = [];

  if (r.goal === "brand") {
    return { classId: "none", reasons: ["brand_no_architecture"], closeCall: false };
  }

  if (r.goal === "seo") {
    return { classId: "existing_stack", reasons: ["seo_works_on_existing"], closeCall: false };
  }

  if (r.goal === "automation") {
    reasons.push("automation_is_a_workflow");
    if (r.integrations === "internal") reasons.push("internal_system_involved");
    return {
      classId: "automation_layer",
      reasons,
      // An AI-judgement automation is close to being an application in its own
      // right, and pretending otherwise would be overconfident.
      closeCall: r.kind === "ai",
    };
  }

  if (r.goal === "software") {
    if (r.kind === "platform" || r.accounts === "public_signup") {
      return { classId: "business_platform", reasons: ["anyone_can_sign_up", "roles_and_permissions"], closeCall: false };
    }
    if (r.kind === "portal" || r.accounts === "customers") {
      reasons.push("customers_sign_in", "private_customer_data");
      /* A portal that also has to reach into an internal system, or serve
         several locations, or meet a conformance standard, is not one
         application with a login on it — it is an operations platform. */
      const platform = r.integrations === "internal" || r.multiLocation || r.compliance;
      if (platform) reasons.push("integration_and_operations");
      return { classId: platform ? "business_platform" : "web_application", reasons, closeCall: !platform };
    }
    return { classId: "web_application", reasons: ["internal_team_tool", "data_the_business_owns"], closeCall: false };
  }

  if (r.goal === "store") {
    if (r.commerce === "beyond_platform" || (r.customWorkflow && r.commerce === "large_catalogue")) {
      return { classId: "business_platform", reasons: ["commerce_beyond_platform"], closeCall: false };
    }

    /* HEADLESS IS THE EXCEPTION, NOT THE UPGRADE. Splitting the storefront
       from the commerce engine buys real things — a custom frontend, a
       content model, proper multilingual routing — and costs a permanent
       second system to maintain. It is worth it when search-led content at
       scale is the growth plan, and almost never otherwise. */
    const headless =
      r.customWorkflow ||
      (r.seo === "strategic" && (r.contentScale === "large" || r.languages === "two_plus")) ||
      (r.commerce === "large_catalogue" && r.seo === "strategic" && r.integrations === "internal");

    if (headless) {
      reasons.push("commerce_plus_content_strategy");
      if (r.customWorkflow) reasons.push("storefront_behaviour_platform_lacks");
      return { classId: "headless_commerce", reasons, closeCall: true };
    }

    reasons.push("standard_commerce_requirements");
    if (r.commerce === "large_catalogue") reasons.push("large_catalogue_still_a_catalogue");
    return { classId: "platform_commerce", reasons, closeCall: false };
  }

  /* ── websites ─────────────────────────────────────────────────────────── */

  if (needsApplication(r)) {
    if (r.accounts !== "none") reasons.push("customers_sign_in");
    if (r.persistentData) reasons.push("data_the_business_owns");
    const platform = r.integrations === "internal" && (r.customWorkflow || r.multiLocation);
    if (platform) reasons.push("integration_and_operations");
    return { classId: platform ? "business_platform" : "web_application", reasons, closeCall: true };
  }

  if (needsCustomFrontend(r)) {
    if (r.seo === "strategic") reasons.push("search_led_growth");
    if (r.contentScale === "large") reasons.push("content_at_scale");
    if (r.multiLocation) reasons.push("pages_per_location");
    if (r.languages === "two_plus") reasons.push("two_languages_properly");
    if (r.integrations === "internal") reasons.push("internal_system_involved");
    if (r.customWorkflow || r.bookings === "build" || r.ordering === "build") reasons.push("behaviour_beyond_a_builder");
    return {
      classId: "custom_content",
      reasons,
      // A single trigger is a judgement call; several of them are not.
      closeCall: reasons.length < 2,
    };
  }

  if (needsManagedContent(r)) {
    reasons.push("content_you_will_change");
    if (r.languages === "two_plus") reasons.push("two_languages_properly");
    if (r.contentScale === "standard") reasons.push("normal_business_site");
    return { classId: "cms_marketing", reasons, closeCall: false };
  }

  reasons.push("few_pages_rarely_change");
  return { classId: "static_marketing", reasons, closeCall: false };
}

/* ── components ───────────────────────────────────────────────────────────── */

const yes = (layer: Component["layer"], choice: string, why: string): Component => ({
  layer,
  status: "recommended",
  choice,
  why,
});
const maybe = (layer: Component["layer"], choice: string, why: string): Component => ({
  layer,
  status: "optional",
  choice,
  why,
});
/**
 * The most valuable function in this file.
 *
 * A `not_needed` line is not an omission rendered politely — it is the
 * deliverable. "Database: not needed, because nothing here stores information
 * beyond your pages and the enquiries that get emailed to you" is the sentence
 * that keeps a $4,000 project from becoming a $30,000 one.
 */
const no = (layer: Component["layer"], why: string): Component => ({
  layer,
  status: "not_needed",
  choice: null,
  why,
});

/** Which builder, when a builder is the right answer at all. */
function marketingFrontend(r: ProjectRequirements): { choice: string; why: string } {
  /* Collection-driven content — many pages, or a page per location, or two
     languages that both have to be real pages — is where Framer runs out and
     Webflow's CMS and localisation earn the extra setup. */
  if (r.contentScale === "large" || r.multiLocation || r.languages === "two_plus") {
    return { choice: "webflow", why: "builder_with_collections" };
  }
  return { choice: "framer", why: "builder_fastest_to_own" };
}

function componentsFor(r: ProjectRequirements, classId: ArchitectureClassId): Component[] {
  const c: Component[] = [];

  /* ── the two lines that do the most work ────────────────────────────────
     Auth and database, decided once, from the requirements rather than from
     the class — so that a marketing site cannot pick one up by accident. */
  const hasAuth = r.accounts !== "none";
  const hasDb = r.persistentData;

  switch (classId) {
    case "none": {
      c.push(no("frontend", "brand_not_software"));
      c.push(no("cms", "brand_not_software"));
      c.push(no("hosting", "brand_not_software"));
      break;
    }

    case "existing_stack": {
      c.push(yes("frontend", "existing", "search_works_on_what_exists"));
      c.push(yes("cms", "existing", "search_works_on_what_exists"));
      c.push(yes("hosting", "existing", "search_works_on_what_exists"));
      break;
    }

    case "static_marketing": {
      const f = marketingFrontend(r);
      c.push(yes("frontend", f.choice, f.why));
      /* Not "no CMS" — the pages are editable in the builder itself. What is
         not needed is a SEPARATE content system, and saying that precisely is
         the difference between accurate and glib. */
      c.push(maybe("cms", "platform_native", "pages_edit_in_place"));
      c.push(yes("hosting", "platform_managed", "hosting_included_in_platform"));
      break;
    }

    case "cms_marketing": {
      const f = marketingFrontend(r);
      c.push(yes("frontend", f.choice, f.why));
      c.push(yes("cms", "platform_native", "edit_without_calling_anyone"));
      c.push(yes("hosting", "platform_managed", "hosting_included_in_platform"));
      break;
    }

    case "custom_content": {
      c.push(yes("frontend", "nextjs", "custom_frontend_justified"));
      c.push(yes("cms", "headless_sanity", "structured_content_model"));
      c.push(yes("hosting", "vercel", "hosting_for_a_custom_frontend"));
      break;
    }

    case "platform_commerce": {
      c.push(yes("frontend", "shopify_theme", "storefront_on_the_platform"));
      c.push(yes("cms", "shopify_admin", "catalogue_is_the_content"));
      c.push(yes("hosting", "shopify_managed", "platform_hosts_the_store"));
      break;
    }

    case "headless_commerce": {
      c.push(yes("frontend", "shopify_headless_nextjs", "custom_storefront_justified"));
      c.push(yes("cms", "headless_sanity", "content_alongside_the_catalogue"));
      c.push(yes("hosting", "vercel", "hosting_for_a_custom_frontend"));
      break;
    }

    case "automation_layer": {
      /* The signature of an honest automation recommendation: no new website.
         Most automation projects get sold one anyway. */
      c.push(no("frontend", "automation_has_no_frontend"));
      c.push(no("cms", "automation_has_no_content"));
      c.push(yes("hosting", "vercel", "somewhere_for_the_job_to_run"));
      break;
    }

    case "web_application": {
      c.push(yes("frontend", "nextjs", "application_interface"));
      c.push(no("cms", "application_screens_not_pages"));
      c.push(yes("hosting", "vercel", "hosting_for_a_custom_frontend"));
      break;
    }

    case "business_platform": {
      c.push(yes("frontend", "nextjs", "application_interface"));
      c.push(maybe("cms", "headless_sanity", "only_if_marketing_pages_too"));
      c.push(yes("hosting", "vercel", "hosting_for_a_custom_frontend"));
      break;
    }
  }

  /* ── database ─────────────────────────────────────────────────────────── */
  if (classId === "platform_commerce" || classId === "headless_commerce") {
    c.push(yes("database", "platform_managed", "platform_owns_the_commerce_data"));
  } else if (classId === "automation_layer") {
    c.push(
      r.customWorkflow
        ? yes("database", "postgres_supabase", "somewhere_to_record_what_ran")
        : no("database", "automation_moves_data_not_stores_it"),
    );
  } else if (hasDb) {
    c.push(yes("database", "postgres_supabase", "data_the_business_owns"));
  } else if (classId === "none" || classId === "existing_stack") {
    c.push(no("database", classId === "none" ? "brand_not_software" : "nothing_new_to_store"));
  } else {
    c.push(no("database", "no_data_beyond_pages_and_enquiries"));
  }

  /* ── authentication ───────────────────────────────────────────────────── */
  if (!hasAuth) {
    c.push(no("auth", classId === "none" ? "brand_not_software" : "nobody_signs_in"));
  } else if (classId === "platform_commerce" || classId === "headless_commerce") {
    c.push(yes("auth", "shopify_accounts", "platform_already_has_accounts"));
  } else {
    c.push(yes("auth", "supabase_auth", r.accounts === "public_signup" ? "anyone_can_sign_up" : "customers_sign_in"));
  }

  /* ── commerce ─────────────────────────────────────────────────────────── */
  if (r.commerce === "catalogue" || r.commerce === "large_catalogue") {
    c.push(yes("commerce", "shopify", "proven_commerce_platform"));
  } else if (r.commerce === "beyond_platform") {
    c.push(yes("commerce", "custom_commerce", "commerce_beyond_platform"));
  } else if (r.commerce === "few_products") {
    /* A handful of products is NOT a shop. Embedding a hosted checkout keeps
       tax, fraud and PCI on someone else's balance sheet and keeps a second
       admin out of the client's life. */
    c.push(yes("commerce", "shopify_lite", "few_products_dont_need_a_shop"));
  } else {
    c.push(no("commerce", "nothing_is_being_sold"));
  }

  /* ── payments ─────────────────────────────────────────────────────────── */
  if (r.commerce === "catalogue" || r.commerce === "large_catalogue") {
    c.push(yes("payments", "shopify_payments", "payments_come_with_the_platform"));
  } else if (r.commerce === "few_products") {
    c.push(yes("payments", "hosted_checkout", "hosted_checkout_keeps_card_data_out"));
  } else if (r.payments || r.commerce === "beyond_platform" || r.accounts === "public_signup") {
    c.push(yes("payments", "stripe", r.accounts === "public_signup" ? "subscriptions_need_billing" : "taking_payments_directly"));
  } else {
    c.push(no("payments", "no_money_changes_hands_here"));
  }

  /* ── email ────────────────────────────────────────────────────────────── */
  if (classId === "none") {
    c.push(no("email", "brand_not_software"));
  } else if (hasAuth || classId === "web_application" || classId === "business_platform" || classId === "automation_layer") {
    c.push(yes("email", "transactional_provider", "system_has_to_send_mail"));
  } else if (classId === "platform_commerce" || classId === "headless_commerce") {
    c.push(yes("email", "platform_email", "store_sends_its_own_receipts"));
  } else {
    /* A contact form does not need a mail service, an API key or a domain
       reputation to look after. The builder posts it and someone gets it. */
    c.push(yes("email", "form_delivery", "a_form_just_needs_delivering"));
  }

  /* ── automation ───────────────────────────────────────────────────────── */
  if (classId === "automation_layer") {
    c.push(yes("automation", r.kind === "connect" ? "connector_service" : "custom_jobs", "this_is_the_project"));
  } else if (r.integrations === "internal") {
    c.push(yes("automation", "custom_jobs", "internal_system_needs_syncing"));
  } else if (r.integrations === "documented") {
    c.push(yes("automation", "connector_service", "documented_tools_connect_cheaply"));
  } else {
    c.push(no("automation", "nothing_to_automate_yet"));
  }

  /* ── analytics ────────────────────────────────────────────────────────── */
  if (classId === "none") {
    c.push(no("analytics", "brand_not_software"));
  } else if (r.seo === "strategic" || classId === "existing_stack") {
    c.push(yes("analytics", "ga4_gsc_behaviour", "search_work_needs_measurement"));
  } else {
    c.push(yes("analytics", "ga4_gsc", "baseline_measurement_always"));
  }

  return c;
}

/* ── alternatives ─────────────────────────────────────────────────────────── */

/**
 * The options that were genuinely in play, and the signal that ruled each out.
 *
 * Only real contenders appear. Listing "we considered a custom platform" under
 * a five-page site would be theatre, and the point of this section is that it
 * is checkable.
 */
function alternativesFor(r: ProjectRequirements, classId: ArchitectureClassId): Alternative[] {
  const alts: Alternative[] = [];

  switch (classId) {
    case "static_marketing":
      alts.push({ classId: "cms_marketing", why: "cms_unused_if_nothing_changes" });
      break;

    case "cms_marketing":
      alts.push({ classId: "custom_content", why: "custom_frontend_not_earned" });
      if (r.contentScale === "minimal") alts.push({ classId: "static_marketing", why: "you_said_it_will_change" });
      break;

    case "custom_content":
      alts.push({ classId: "cms_marketing", why: "builder_hits_a_ceiling_here" });
      if (!needsApplication(r)) alts.push({ classId: "web_application", why: "nobody_signs_in_so_no_app" });
      break;

    case "platform_commerce":
      alts.push({ classId: "headless_commerce", why: "headless_costs_a_second_system" });
      break;

    case "headless_commerce":
      alts.push({ classId: "platform_commerce", why: "platform_storefront_hits_a_ceiling" });
      break;

    case "web_application":
      alts.push({ classId: "cms_marketing", why: "a_login_is_not_a_website_feature" });
      if (r.accounts !== "public_signup") alts.push({ classId: "business_platform", why: "one_role_is_not_a_platform" });
      break;

    case "business_platform":
      alts.push({ classId: "web_application", why: "roles_and_integrations_need_more" });
      break;

    case "automation_layer":
      alts.push({ classId: "web_application", why: "no_interface_was_asked_for" });
      break;

    case "existing_stack":
      alts.push({ classId: "custom_content", why: "rebuild_is_a_separate_decision" });
      break;

    case "none":
      break;
  }

  return alts;
}

/* ── the rest ─────────────────────────────────────────────────────────────── */

const COMPLEXITY: Record<ArchitectureClassId, Complexity> = {
  none: "low",
  existing_stack: "low",
  static_marketing: "low",
  cms_marketing: "low_moderate",
  platform_commerce: "low_moderate",
  automation_layer: "moderate",
  custom_content: "moderate",
  headless_commerce: "substantial",
  web_application: "substantial",
  business_platform: "high",
};

/** What the client can change without calling anyone — the usability half of the brief. */
const CLIENT_MANAGES: Record<ArchitectureClassId, string[]> = {
  none: [],
  existing_stack: ["publish_as_you_do_now"],
  static_marketing: ["edit_text_and_images"],
  cms_marketing: ["edit_text_and_images", "add_pages_and_posts"],
  custom_content: ["edit_text_and_images", "add_pages_and_posts", "structured_entries"],
  platform_commerce: ["products_and_prices", "orders_and_inventory", "discounts_and_pages"],
  headless_commerce: ["products_and_prices", "orders_and_inventory", "add_pages_and_posts"],
  automation_layer: ["watch_it_run"],
  web_application: ["your_own_records", "user_access"],
  business_platform: ["your_own_records", "user_access", "roles_and_teams"],
};

const STUDIO_HANDLES: Record<ArchitectureClassId, string[]> = {
  none: [],
  existing_stack: ["research_and_recommendations", "measurement"],
  static_marketing: ["design_and_build", "domain_and_launch", "measurement"],
  cms_marketing: ["design_and_build", "content_model", "domain_and_launch", "measurement"],
  custom_content: ["design_and_build", "content_model", "deployment_pipeline", "measurement"],
  platform_commerce: ["storefront_build", "catalogue_setup", "payments_and_shipping_config", "measurement"],
  headless_commerce: ["storefront_build", "catalogue_setup", "deployment_pipeline", "measurement"],
  automation_layer: ["integration_build", "error_handling", "monitoring"],
  web_application: ["application_build", "database_and_backups", "security_rules", "deployment_pipeline"],
  business_platform: ["application_build", "database_and_backups", "security_rules", "integrations", "deployment_pipeline"],
};

/**
 * Contextual reading — at most three, chosen by the answer.
 *
 * Four identical calls to action under every result is the pattern this
 * deliberately avoids: someone told to use Shopify has no use for the custom
 * software guide, and showing it to them anyway trains people to ignore the
 * whole block.
 */
function linksFor(r: ProjectRequirements, classId: ArchitectureClassId): EducationalLinkId[] {
  const out: EducationalLinkId[] = [];
  const add = (id: EducationalLinkId) => {
    if (!out.includes(id) && out.length < 3) out.push(id);
  };

  switch (classId) {
    case "none":
      add("branding");
      add("setup_guide");
      break;

    case "existing_stack":
      add(r.seo === "local" ? "local_seo" : "answer_engine_optimization");
      add("seo_cost");
      break;

    case "static_marketing":
      /* The open question this result carries is "will you actually edit it?",
         so the CMS section of the setup guide is the thing that answers it. */
      add("setup_guide_cms");
      add("setup_guide_types");
      add("website_cost");
      break;

    case "cms_marketing":
      add("setup_guide_types");
      add(r.commerce === "few_products" ? "setup_guide_ecommerce" : "framer_development");
      add("website_cost");
      break;

    case "custom_content":
      add("setup_guide_types");
      add(r.seo === "strategic" ? "answer_engine_optimization" : "web_design");
      add("website_ownership");
      break;

    case "platform_commerce":
    case "headless_commerce":
      add("shopify_development");
      add("setup_guide_ecommerce");
      add(classId === "headless_commerce" ? "website_ownership" : "website_cost");
      break;

    case "automation_layer":
      add("ai_automation");
      add("custom_software_guide");
      add("software_cost");
      break;

    case "web_application":
    case "business_platform":
      /* The two questions someone at this end of the ladder should be asking
         before they spend anything: was custom warranted, and what does owning
         it cost after launch. */
      add("custom_software_guide");
      add("custom_software_tco");
      add(r.accounts !== "none" ? "setup_guide_portal" : "software_cost");
      break;
  }

  return out;
}

/**
 * What is genuinely undecided.
 *
 * These exist so `confidence` has something to point at. A recommendation that
 * says "open" without saying what is open is just hedging.
 */
function openQuestionsFor(r: ProjectRequirements, classId: ArchitectureClassId): string[] {
  const q: string[] = [];
  if (r.openScope) q.push("scope_still_open");
  /* The one place an unticked checkbox genuinely decided something. If they
     WILL be editing it, this recommendation is wrong — so it asks rather than
     letting silence stand as a decision. */
  if (r.editing === "unstated" && classId === "static_marketing") q.push("how_often_content_changes");
  /* Said out loud because the architecture layer asks about a second language
     and the price does not move for it. Using an answer we do not charge for,
     without mentioning that, would be the dishonest version of this. */
  if (r.languages === "two_plus") q.push("second_language_scope");
  if (r.integrations === "internal") q.push("internal_system_unknown");
  if (r.customWorkflow) q.push("custom_behaviour_undefined");
  return q;
}

function confidenceFor(r: ProjectRequirements, closeCall: boolean, openQuestions: string[]): Confidence {
  if (r.openScope || openQuestions.includes("custom_behaviour_undefined")) return "open";
  if (closeCall || openQuestions.length > 0) return "reasonable";
  return "clear";
}

/**
 * THE ENTRY POINT.
 *
 * Pure: same requirements in, same recommendation out, forever. That is what
 * makes it testable, and being testable is what makes it trustworthy enough to
 * show a prospect.
 */
export function recommend(r: ProjectRequirements): Recommendation {
  const { classId, reasons, closeCall } = classify(r);
  const openQuestions = openQuestionsFor(r, classId);

  return {
    version: ARCHITECTURE_VERSION,
    classId,
    complexity: COMPLEXITY[classId],
    confidence: confidenceFor(r, closeCall, openQuestions),
    reasons,
    components: componentsFor(r, classId),
    alternatives: alternativesFor(r, classId),
    clientManages: CLIENT_MANAGES[classId],
    studioHandles: STUDIO_HANDLES[classId],
    openQuestions,
    links: linksFor(r, classId),
  };
}
