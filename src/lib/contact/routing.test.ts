import { describe, expect, it } from "vitest";
import {
  CONTACT_SERVICES,
  NON_PROJECT_SERVICES,
  SERVICE_LABELS_FR,
  isProjectService,
  validateContactSubmission,
} from "./schema";
import { clientConfirmation, operatorNotification, followUpEmail } from "./emails";

const base = {
  name: "Dana Reyes",
  email: "dana@example.com",
  message: "We need a new storefront before the holidays.",
  projectReference: "",
  formStartedAt: Date.now(),
};

describe("service ordering", () => {
  it("puts conversation reasons before services", () => {
    expect(CONTACT_SERVICES[0]).toBe("General inquiry");
    expect(CONTACT_SERVICES[1]).toBe("Support");
  });

  it("classifies conversations apart from projects", () => {
    for (const s of NON_PROJECT_SERVICES) expect(isProjectService(s)).toBe(false);
    for (const s of ["Website", "SEO", "Branding", "AI automation", "Software/App", "Shopify"]) {
      expect(isProjectService(s)).toBe(true);
    }
    // An unknown value must never be treated as a project.
    expect(isProjectService("Nonsense")).toBe(false);
  });

  it("has a French label for every service", () => {
    for (const s of CONTACT_SERVICES) {
      expect(SERVICE_LABELS_FR[s]).toBeTruthy();
    }
  });
});

describe("locale handling", () => {
  it("accepts fr and defaults everything else to en", () => {
    const fr = validateContactSubmission({ ...base, service: "Support", locale: "fr" });
    expect(fr.success && fr.data.locale).toBe("fr");
    const missing = validateContactSubmission({ ...base, service: "Support" });
    expect(missing.success && missing.data.locale).toBe("en");
    const junk = validateContactSubmission({ ...base, service: "Support", locale: "de" });
    expect(junk.success && junk.data.locale).toBe("en");
  });

  it("still rejects unknown fields", () => {
    const r = validateContactSubmission({ ...base, service: "Support", surprise: 1 });
    expect(r.success).toBe(false);
  });

  it("keeps the honeypot fatal", () => {
    // projectReference is a spam trap, never a data field.
    const r = validateContactSubmission({ ...base, service: "Support", projectReference: "bot" });
    expect(r.success).toBe(true); // validation passes; the handler rejects it
    expect(r.success && r.data.projectReference).toBe("bot");
  });
});

describe("client confirmation", () => {
  it("reassures general enquiries without funnelling them", () => {
    const mail = clientConfirmation(
      { ...base, service: "General inquiry", locale: "en" },
      "en"
    );
    expect(mail.text).toMatch(/as soon as possible/i);
    expect(mail.html).not.toMatch(/stillawake\.studio/);
  });

  it("sends support the same reassurance", () => {
    const mail = clientConfirmation({ ...base, service: "Support", locale: "en" }, "en");
    expect(mail.html).not.toMatch(/stillawake\.studio/);
  });

  it("hands a real service the onboarding CTA", () => {
    const mail = clientConfirmation({ ...base, service: "Shopify", locale: "en" }, "en");
    expect(mail.html).toMatch(/stillawake\.studio\/start/);
    expect(mail.html).toMatch(/Describe my project/);
    expect(mail.text).toMatch(/Shopify/);
  });

  it("uses the French form for French visitors", () => {
    const mail = clientConfirmation({ ...base, service: "Website", locale: "fr" }, "fr");
    expect(mail.html).toMatch(/\/fr\/demarrer/);
    expect(mail.subject).toMatch(/projet/i);
  });
});

describe("operator notification", () => {
  it("stays plain for a general enquiry", () => {
    const mail = operatorNotification({ ...base, service: "General inquiry", locale: "en" });
    expect(mail.subject).toMatch(/^General inquiry/);
    expect(mail.text).not.toMatch(/onboarding form/i);
  });

  it("flags a project enquiry as prompted and links the pipeline", () => {
    const mail = operatorNotification(
      { ...base, service: "Website", locale: "en" },
      { contactId: "abc-123" }
    );
    expect(mail.subject).toMatch(/PROJECT ENQUIRY/);
    expect(mail.text).toMatch(/onboarding form/i);
    expect(mail.text).toMatch(/follow-up sends automatically in 3 days/i);
    expect(mail.html).toMatch(/admin\/clients\?focus=abc-123/);
  });

  it("carries the visitor's message through", () => {
    const mail = operatorNotification({ ...base, service: "SEO", locale: "en" });
    expect(mail.text).toMatch(/holidays/);
  });

  it("escapes HTML in visitor-supplied content", () => {
    const mail = operatorNotification({
      ...base,
      name: "<script>alert(1)</script>",
      service: "SEO",
      locale: "en",
    });
    expect(mail.html).not.toMatch(/<script>alert/);
    expect(mail.html).toMatch(/&lt;script&gt;/);
  });
});

describe("follow-up", () => {
  it("repeats the link and offers an exit", () => {
    const mail = followUpEmail("Dana Reyes", "Website", "en");
    expect(mail.html).toMatch(/stillawake\.studio\/start/);
    expect(mail.text).toMatch(/just reply to this email/i);
    expect(mail.subject).toMatch(/Still thinking/i);
  });

  it("speaks French when the enquiry was French", () => {
    const mail = followUpEmail("Dana Reyes", "Site web", "fr");
    expect(mail.html).toMatch(/\/fr\/demarrer/);
    expect(mail.text).toMatch(/répondez/i);
  });
});
