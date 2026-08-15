import {
  CREDENTIAL_MODEL,
  OWNERSHIP_MATRIX,
  STACK_LAYERS,
  WORKFLOW,
  type Locale,
} from "@/data/website-ownership";

/**
 * Presentation for the website-ownership resource.
 *
 * Both language routes render these, so a layout fix lands in both at once
 * and the two pages cannot drift into different shapes. Everything is a
 * server component and there is no new dependency: the disclosures are
 * native `<details>`, which means the answers are in the HTML for a crawler
 * and an answer engine whether or not anyone clicks them, and they still
 * open with JavaScript disabled.
 *
 * Copy lives in `@/data/website-ownership`; only the small structural labels
 * (column headings, the "varies" chip) are here, because they belong to the
 * table rather than to the argument.
 */

const UI = {
  colAsset: { en: "Asset", fr: "Actif" },
  colOwner: { en: "Recommended owner", fr: "Propriétaire recommandé" },
  colRole: { en: "StillAwake’s role", fr: "Rôle de StillAwake" },
  colPays: { en: "Who usually pays", fr: "Qui paie habituellement" },
  varies: { en: "Varies by contract", fr: "Varie selon le contrat" },
  needed: { en: "Needed?", fr: "Nécessaire?" },
  looksLike: { en: "Sounds like", fr: "Vous entendrez" },
  yourPart: { en: "Your part", fr: "Votre rôle" },
} as const;

const label = (key: keyof typeof UI, locale: Locale) => UI[key][locale];

/* ────────────────────────────────────────────────────────────────────────
   Layer diagram
   ──────────────────────────────────────────────────────────────────────── */

export function StackDiagram({ locale }: { locale: Locale }) {
  return (
    <ol className="mt-10 space-y-3">
      {STACK_LAYERS.map((layer) => (
        <li
          key={layer.id}
          className="glass relative overflow-hidden rounded-[1.75rem] p-6 md:p-7"
        >
          {/* The red rail is the only thing carrying "these are stacked
              layers" visually, so it is drawn rather than implied. */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#D71920] to-[#D71920]/10"
          />
          <div className="grid gap-5 md:grid-cols-[7rem_1fr_14rem] md:items-start">
            <div>
              <p className="geist text-3xl font-black tracking-[-0.06em] text-[#D71920]">
                {layer.index}
              </p>
              <h3 className="geist mt-1 text-xl font-black tracking-[-0.05em]">
                {layer.name[locale]}
              </h3>
            </div>

            <p className="text-sm leading-7 text-[#C7B9B9]">{layer.plain[locale]}</p>

            <div className="space-y-3 text-xs">
              <div>
                <p className="uppercase tracking-[0.2em] text-[#6F6666]">
                  {label("looksLike", locale)}
                </p>
                <p className="mt-1 leading-5 text-white/80">{layer.examples[locale]}</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.2em] text-[#6F6666]">
                  {label("needed", locale)}
                </p>
                <p className="mt-1 leading-5 text-[#C7B9B9]">{layer.required[locale]}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Ownership matrix
   ──────────────────────────────────────────────────────────────────────── */

/**
 * One data set, two renderings. A four-column table with sentences in every
 * cell is unreadable under ~900px no matter how it is styled, so small
 * screens get the same rows as labelled cards instead of a horizontally
 * scrolling table nobody scrolls.
 */
export function OwnershipMatrix({ locale }: { locale: Locale }) {
  const groups = OWNERSHIP_MATRIX.reduce<{ name: string; rows: typeof OWNERSHIP_MATRIX }[]>(
    (acc, row) => {
      const name = row.group[locale];
      const last = acc.at(-1);
      if (last && last.name === name) last.rows.push(row);
      else acc.push({ name, rows: [row] });
      return acc;
    },
    [],
  );

  const VariesChip = () => (
    <span className="mt-2 inline-flex rounded-full border border-[#D71920]/40 bg-[#D71920]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-[#E9A0A3]">
      {label("varies", locale)}
    </span>
  );

  return (
    <>
      {/* Desktop: one table, grouped by section. */}
      <div className="mt-10 hidden overflow-hidden rounded-[2rem] border border-white/10 lg:block">
        <table className="w-full border-collapse text-left align-top text-sm">
          <thead>
            <tr className="bg-white/[0.05] text-xs uppercase tracking-[0.15em] text-[#C7B9B9]">
              <th scope="col" className="w-[22%] px-6 py-4 font-medium">{label("colAsset", locale)}</th>
              <th scope="col" className="w-[28%] px-6 py-4 font-medium">{label("colOwner", locale)}</th>
              <th scope="col" className="w-[28%] px-6 py-4 font-medium">{label("colRole", locale)}</th>
              <th scope="col" className="w-[22%] px-6 py-4 font-medium">{label("colPays", locale)}</th>
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.name}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className="border-t border-white/10 bg-black/40 px-6 py-3 text-left text-[11px] font-medium uppercase tracking-[0.3em] text-[#D71920]"
                >
                  {group.name}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.id} className="border-t border-white/10 align-top">
                  <th scope="row" className="px-6 py-5 text-left font-semibold text-white">
                    {row.asset[locale]}
                    {row.varies ? <VariesChip /> : null}
                  </th>
                  <td className="px-6 py-5 leading-6 text-[#C7B9B9]">{row.owner[locale]}</td>
                  <td className="px-6 py-5 leading-6 text-[#C7B9B9]">{row.role[locale]}</td>
                  <td className="px-6 py-5 leading-6 text-[#C7B9B9]">{row.pays[locale]}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Mobile and tablet: the same rows as cards. */}
      <div className="mt-10 space-y-8 lg:hidden">
        {groups.map((group) => (
          <div key={group.name}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{group.name}</p>
            <div className="mt-4 space-y-4">
              {group.rows.map((row) => (
                <div key={row.id} className="glass rounded-[1.5rem] p-6">
                  <h3 className="geist text-lg font-black tracking-[-0.04em]">{row.asset[locale]}</h3>
                  {row.varies ? <VariesChip /> : null}
                  <dl className="mt-4 space-y-4 text-sm">
                    {(
                      [
                        ["colOwner", row.owner[locale]],
                        ["colRole", row.role[locale]],
                        ["colPays", row.pays[locale]],
                      ] as const
                    ).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-[10px] uppercase tracking-[0.2em] text-[#6F6666]">
                          {label(key, locale)}
                        </dt>
                        <dd className="mt-1 leading-6 text-[#C7B9B9]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Workflow
   ──────────────────────────────────────────────────────────────────────── */

export function WorkflowRail({ locale }: { locale: Locale }) {
  return (
    <ol className="mt-10 space-y-0">
      {WORKFLOW.map((step, i) => {
        const phase = step.phase[locale];
        // A phase heading is printed only when the phase changes. Derived
        // from the previous item rather than from a running variable, which
        // would be a render-time mutation.
        const newPhase = phase !== WORKFLOW[i - 1]?.phase[locale];

        return (
          <li key={step.id} className="relative pl-10 md:pl-14">
            {/* The connecting line, drawn behind the markers and stopped
                short on the final step so the rail ends rather than trails. */}
            {i < WORKFLOW.length - 1 ? (
              <span aria-hidden className="absolute left-[11px] top-2 h-full w-px bg-white/12 md:left-[15px]" />
            ) : null}

            {newPhase ? (
              <p className="pb-3 pt-8 text-[11px] uppercase tracking-[0.3em] text-[#D71920] first:pt-0">
                {phase}
              </p>
            ) : null}

            <div className="pb-8">
              <span
                aria-hidden
                className="absolute left-0 grid size-6 place-items-center rounded-full border border-[#D71920]/50 bg-black text-[10px] font-bold text-[#D71920] md:size-8 md:text-[11px]"
              >
                {i + 1}
              </span>
              <h3 className="geist text-xl font-black tracking-[-0.05em]">{step.name[locale]}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#C7B9B9]">{step.detail[locale]}</p>
              <p className="mt-3 text-xs text-[#8C8080]">
                <span className="uppercase tracking-[0.2em] text-[#6F6666]">
                  {label("yourPart", locale)}
                </span>{" "}
                — {step.client[locale]}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Credential model
   ──────────────────────────────────────────────────────────────────────── */

export function CredentialSplit({ locale }: { locale: Locale }) {
  const columns = [
    { ...CREDENTIAL_MODEL.client, accent: true },
    { ...CREDENTIAL_MODEL.agency, accent: false },
  ];

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {columns.map((col) => (
        <div
          key={col.title.en}
          className={`rounded-[2rem] border p-8 ${
            col.accent ? "border-[#D71920]/50 bg-[#D71920]/[0.07]" : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">
            {col.subtitle[locale]}
          </p>
          <h3 className="geist mt-3 text-2xl font-black tracking-[-0.05em]">{col.title[locale]}</h3>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-[#C7B9B9]">
            {col.items.map((item) => (
              <li key={item.en} className="flex gap-3">
                <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#D71920]" />
                <span>{item[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Disclosure
   ──────────────────────────────────────────────────────────────────────── */

export function Disclosure({
  summary,
  hint,
  children,
}: {
  summary: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group glass rounded-[1.5rem] px-6 py-5 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-[#C7B9B9]">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="geist block text-lg font-black tracking-[-0.04em] text-white">
            {summary}
          </span>
          {hint ? <span className="mt-1 block text-xs text-[#8C8080]">{hint}</span> : null}
        </span>
        <span
          aria-hidden
          className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-white/15 text-sm text-[#C7B9B9] transition group-open:rotate-45 group-open:border-[#D71920]/60 group-open:text-[#D71920]"
        >
          +
        </span>
      </summary>
      <div className="mt-4 space-y-3 border-t border-white/10 pt-4">{children}</div>
    </details>
  );
}
