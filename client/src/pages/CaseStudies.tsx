import { Link } from "wouter";
import { ArrowRight, Building2, Home, Hotel, Clock } from "lucide-react";

const caseStudies = [
  {
    icon: Building2,
    sector: "Letting Agent",
    title: "Emergency Plumbing Response — Ashford Residential Portfolio",
    challenge: "A letting agent managing 47 properties across Ashford experienced a burst pipe emergency at a tenanted property on a Sunday evening. The tenant reported water coming through the ceiling from the flat above.",
    solution: "ASG's 24/7 emergency team was on site within 45 minutes. We isolated the water supply, carried out temporary repairs to prevent further damage, and returned the following morning to complete a full pipe replacement and redecoration of the affected ceiling.",
    outcome: "Damage contained within 2 hours. Full reinstatement completed within 48 hours. Compliance certificate and photographic report delivered to the agent the same day.",
    tags: ["Emergency Response", "Plumbing", "Residential"],
  },
  {
    icon: Home,
    sector: "Block Manager",
    title: "Planned Maintenance Programme — 32-Unit Residential Block, Kent",
    challenge: "A block management company required a reliable maintenance partner for a 32-unit residential block. Previous contractors had been inconsistent, with poor communication and incomplete works.",
    solution: "ASG took on the full planned maintenance programme including communal area decoration, electrical testing, fire door inspections, and reactive repairs. We assigned a dedicated account manager and implemented a monthly reporting schedule.",
    outcome: "100% of planned works completed on schedule. Reactive response times reduced by 60% compared to the previous contractor. Leaseholder satisfaction scores improved significantly.",
    tags: ["Planned Maintenance", "Block Management", "Multi-Trade"],
  },
  {
    icon: Hotel,
    sector: "Hospitality",
    title: "Out-of-Hours Refurbishment — Boutique Hotel, Folkestone",
    challenge: "A boutique hotel required a full bedroom refurbishment across 12 rooms without closing to guests. All works needed to be completed between 10pm and 7am to avoid disruption.",
    solution: "ASG deployed a multi-trade team working exclusively out of hours over a 3-week period. Carpentry, plastering, painting, and electrical works were coordinated to ensure each room was ready for guests the following morning.",
    outcome: "All 12 rooms refurbished on schedule with zero guest complaints. Hotel remained fully operational throughout. Works completed within budget.",
    tags: ["Refurbishment", "Hospitality", "Out-of-Hours"],
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, var(--asg-navy) 0%, oklch(22% 0.06 152) 100%)" }}
        aria-labelledby="cs-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="cs-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              Case Studies
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Real projects. Real results. Here is how ASG has delivered for clients across Kent and the South East.
            </p>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Case study listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {caseStudies.map((cs, index) => (
            <article
              key={cs.title}
              className="rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              aria-labelledby={`cs-title-${index}`}
            >
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                    aria-hidden="true"
                  >
                    <cs.icon size={20} style={{ color: "var(--asg-green)" }} />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--asg-green)" }}>
                    {cs.sector}
                  </span>
                </div>

                <h2 id={`cs-title-${index}`} className="text-2xl font-black mb-6" style={{ color: "var(--asg-navy)" }}>
                  {cs.title}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {[
                    { label: "The Challenge", content: cs.challenge },
                    { label: "Our Solution", content: cs.solution },
                    { label: "The Outcome", content: cs.outcome },
                  ].map((section) => (
                    <div key={section.label} className="rounded-lg p-5" style={{ backgroundColor: "var(--asg-grey)" }}>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: "var(--asg-green)" }}>
                        {section.label}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-6" role="list" aria-label="Tags">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "oklch(90% 0.06 152)", color: "var(--asg-green)" }}
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--asg-green)" }}
        aria-labelledby="cs-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cs-cta-heading" className="text-2xl lg:text-3xl font-black text-white mb-4">
            Ready to Become Our Next Success Story?
          </h2>
          <p className="text-green-100 mb-6">
            Get in touch to discuss how ASG can support your property maintenance requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold bg-white text-base transition-all duration-200 hover:bg-gray-100"
            style={{ color: "var(--asg-green)", minHeight: "52px" }}
          >
            Get in Touch <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
