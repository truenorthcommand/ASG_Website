import { Link } from "wouter";
import { Building2, Home, Hotel, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";

const sectors = [
  {
    icon: Building2,
    title: "Letting Agents",
    subtitle: "Rapid response. Compliance-ready. Tenant-focused.",
    desc: "We understand the pressures letting agents face — tenant calls at all hours, compliance deadlines, and the constant need to protect landlord assets. ASG is built to be your maintenance partner, not just a contractor.",
    benefits: [
      "24/7 emergency response for tenant issues",
      "Compliance certificates delivered automatically",
      "Dedicated account manager for your portfolio",
      "Detailed job reports with photos",
      "Competitive pricing for volume work",
      "Works across all property types",
    ],
    color: "var(--asg-green)",
  },
  {
    icon: Home,
    title: "Block Managers",
    subtitle: "Planned maintenance. Reactive works. Full estate coverage.",
    desc: "Managing residential blocks requires a maintenance partner who understands the complexity of communal areas, leaseholder obligations, and service charge budgets. ASG delivers planned and reactive maintenance that keeps your blocks compliant and residents satisfied.",
    benefits: [
      "Planned maintenance programmes",
      "Communal area maintenance",
      "Section 20 compliance support",
      "Emergency response for common parts",
      "Detailed works schedules",
      "Budget-conscious pricing",
    ],
    color: "var(--asg-navy)",
  },
  {
    icon: Hotel,
    title: "Hospitality",
    subtitle: "Minimal disruption. Out-of-hours. Fast turnaround.",
    desc: "Hotels, restaurants, and venues cannot afford downtime. ASG works around your operational schedule — nights, early mornings, and weekends — to ensure maintenance never impacts your guests or revenue.",
    benefits: [
      "Out-of-hours scheduling",
      "Minimal guest disruption",
      "Fast turnaround on urgent works",
      "All trades under one contract",
      "Discreet, uniformed operatives",
      "Compliance and safety certification",
    ],
    color: "var(--asg-green)",
  },
  {
    icon: ShoppingBag,
    title: "Commercial Property",
    subtitle: "Office fit-outs. Retail maintenance. Multi-site contracts.",
    desc: "From single commercial units to multi-site portfolios, ASG provides the maintenance infrastructure that keeps commercial properties operational, compliant, and presentable.",
    benefits: [
      "Multi-site contract management",
      "Office and retail fit-outs",
      "Planned preventative maintenance",
      "Reactive repairs with SLA guarantees",
      "Compliance management",
      "Dedicated project management",
    ],
    color: "var(--asg-navy)",
  },
];

export default function Sectors() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, var(--asg-navy) 0%, oklch(22% 0.06 152) 100%)" }}
        aria-labelledby="sectors-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="sectors-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              Sectors We Serve
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Specialist knowledge and dedicated service for every property type and management structure. We understand your sector because we've built our team around it.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Sector details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {sectors.map((sector, index) => (
            <div
              key={sector.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: sector.color }}
                  aria-hidden="true"
                >
                  <sector.icon size={28} className="text-white" />
                </div>
                <h2 className="text-3xl font-black mb-2" style={{ color: "var(--asg-navy)" }}>
                  {sector.title}
                </h2>
                <p className="font-semibold mb-4" style={{ color: "var(--asg-green)" }}>
                  {sector.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">{sector.desc}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold text-white text-sm transition-all duration-200"
                  style={{ backgroundColor: "var(--asg-green)", minHeight: "44px" }}
                >
                  Discuss Your Requirements <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <div className={`rounded-xl p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                style={{ backgroundColor: "var(--asg-grey)" }}>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: "var(--asg-green)" }}>
                  What We Deliver
                </h3>
                <ul className="space-y-3" role="list">
                  {sector.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "var(--asg-green)" }} aria-hidden="true" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{ backgroundColor: "#22303b" }}
        aria-labelledby="sectors-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="sectors-cta-heading" className="text-2xl lg:text-3xl font-black text-white mb-4">
            Don't See Your Sector Listed?
          </h2>
          <p className="text-gray-300 mb-6">
            We work with a wide range of property owners and managers. Get in touch to discuss your specific requirements.
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
