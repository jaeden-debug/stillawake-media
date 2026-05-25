import Link from "next/link";import {Button,Section,ServiceGrid,PortfolioGrid,BlogCards,InternalLinks} from "@/components/site";import LiveWorkShowcase from "@/components/LiveWorkShowcase";import {services} from "@/lib/data";
export default function Home(){return <main><section className="relative min-h-screen overflow-hidden px-6"><video className="heroVideo absolute inset-0 h-screen min-h-screen w-full object-cover opacity-65" src="/stillawakemedia-hero-optimized.mp4" poster="/stillawakemedia-hero-poster.jpg" preload="metadata" autoPlay muted loop playsInline/><div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#050505]/50 to-[#050505]"/><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(215,25,32,.25),transparent_35%)]"/><div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-start pt-32"><div className="flex w-full items-center">
<div className="flex min-h-[82vh] w-full flex-col justify-between">
<div>
<h1 className="geist font-mono text-[14vw] font-normal leading-[1.2] tracking-[0.36em] text-white md:text-[120px]">
STILL<br/><span className="text-[#D71920]">AWAKE</span>
</h1>

<div className="mt-5 flex items-center gap-3">
<Button href="/contact">Get a Free Audit</Button>
<Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/75 px-4 py-2.5 text-[13px] font-medium tracking-[-0.02em] text-[#C7B9B9] shadow-2xl backdrop-blur-2xl transition hover:bg-black/90 hover:text-white">
Our Work <span className="grid size-7 place-items-center rounded-full bg-white/[0.08] text-[12px] text-white">→</span>
</Link>
</div>
</div>

<div className="glass mb-4 max-w-2xl rounded-[2rem] border border-white/10 bg-black/30 p-5 md:p-7">
<p className="geist text-2xl font-black tracking-[-0.06em] md:text-[2rem]">
Ambition Never Sleeps.
</p>

<p className="mt-4 max-w-xl text-[15px] leading-7 text-[#C7B9B9] md:text-base md:leading-8">
We build <span className="text-[#D71920]">bold brands</span>, high-performance websites, SEO systems, AI tools, and digital assets <span className="text-[#D71920]">designed to scale</span> modern businesses.
</p>
</div>
</div>
</div></div></section>
<Section eyebrow="What we do" title="Digital infrastructure for ambitious operators."><ServiceGrid/></Section>

<section className="px-6 py-10 md:py-16">
  <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl">
    
    <video
      className="h-[420px] w-full object-cover md:h-[620px]"
      src="/tv-static-stillawake-media-intro-optimized.mp4"
      poster="/tv-static-stillawake-media-intro-poster.jpg"
      preload="none"
      autoPlay
      muted
      loop
      playsInline
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />

    </div>
</section>

<LiveWorkShowcase />

<Section eyebrow="Systems" title="Websites, brands, SEO engines, AI tools, and software built as one growth machine."><div className="grid gap-5 md:grid-cols-3">{["Launch premium websites that load fast and convert.","Build SEO structures Google can crawl, understand, and reward.","Create automation systems that remove repetitive business friction."].map(x=><div className="rounded-[2rem] border border-white/10 bg-[#111] p-8 text-xl text-[#C7B9B9]" key={x}>{x}</div>)}</div></Section><Section eyebrow="The problem" title="Most websites fail because they are built like brochures, not business systems."><p className="max-w-3xl text-xl leading-9 text-[#C7B9B9]">We design crawlable, fast, conversion-focused ecosystems with service pages, articles, internal links, schema, proof, and clear next steps.</p></Section><Section eyebrow="Who we help" title="Startups, creators, ecommerce brands, service companies, and local operators."><div className="grid gap-4 md:grid-cols-4">{["Startups","Creators","Ecommerce","Local business"].map(x=><div className="glass rounded-3xl p-6 text-xl font-bold" key={x}>{x}</div>)}</div></Section><Section eyebrow="Process" title="Simple path. Strong result.">
<div className="grid gap-4 md:grid-cols-4">
{[
["01","Position","Clarify the offer."],
["02","Design","Make it premium."],
["03","Build","Launch the system."],
["04","Scale","Grow traffic and trust."]
].map(([num,title,desc])=>
<div className="glass rounded-3xl p-7" key={title}>
<p className="text-sm tracking-[0.25em] text-[#D71920]">{num}</p>
<h3 className="geist mt-4 text-3xl tracking-[-0.06em] text-white">{title}</h3>
<p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{desc}</p>
</div>
)}
</div>
</Section><Section eyebrow="Portfolio" title="Proof through live digital properties."><PortfolioGrid/><Link className="mt-8 inline-flex text-[#D71920]" href="/portfolio">View full portfolio →</Link></Section><Section eyebrow="StillAwake Times" title="Editorial strategy, web systems, SEO, AI, and premium digital infrastructure."><BlogCards/><Link className="mt-8 inline-flex text-[#D71920]" href="/stillawake-times">Read the magazine →</Link></Section><InternalLinks/><section className="px-6 py-24"><div className="mx-auto max-w-7xl rounded-[2rem] bg-[#D71920] p-10 md:p-16"><h2 className="geist text-5xl font-black tracking-[-0.06em]">Start building before your competitors wake up.</h2><Link href="/contact" className="mt-8 inline-flex rounded-full bg-black px-6 py-4 font-bold">Get a Free Audit →</Link></div></section></main>}
