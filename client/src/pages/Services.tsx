import { Link } from "wouter";
import { Wrench, Zap, Hammer, Paintbrush, Home, Building2, Droplets, Flame, TreePine, Package, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Plumbing & Heating",
    desc: "From burst pipes and leaking taps to full central heating installations. Our Gas Safe registered engineers handle everything from emergency call-outs to planned maintenance.",
    items: ["Burst pipe repairs", "Boiler installation & servicing", "Central heating systems", "Hot water cylinders", "Bathroom installations", "Leak detection"],
  },
  {
    icon: Zap,
    title: "Electrical Works",
    desc: "NICEIC approved electricians covering all domestic and commercial electrical work. EICR testing, rewires, consumer unit upgrades, and fault finding.",
    items: ["EICR testing & certification", "Full rewires", "Consumer unit upgrades", "Lighting design & installation", "EV charger installation", "Fault finding & repair"],
  },
  {
    icon: Hammer,
    title: "Carpentry & Joinery",
    desc: "Skilled carpenters and joiners for everything from door repairs to bespoke fitted furniture. First and second fix carpentry for new builds and refurbishments.",
    items: ["Door hanging & repairs", "Skirting & architrave", "Fitted wardrobes & storage", "Staircase repairs", "Structural carpentry", "Window repairs"],
  },
  {
    icon: Paintbrush,
    title: "Painting & Decorating",
    desc: "Professional decorators for interior and exterior projects. We work around your schedule to minimise disruption to tenants and occupants.",
    items: ["Interior decoration", "Exterior painting", "Wallpapering", "Commercial repaints", "Void property preparation", "Feature walls"],
  },
  {
    icon: Home,
    title: "Roofing & Guttering",
    desc: "Roof repairs, full re-roofs, and gutter maintenance. We work with all roof types including flat, pitched, and commercial.",
    items: ["Tile & slate repairs", "Flat roof systems", "Gutter clearance & repair", "Fascias & soffits", "Lead flashing", "Emergency leak repairs"],
  },
  {
    icon: Droplets,
    title: "Damp & Waterproofing",
    desc: "Diagnosis and treatment of all damp issues including rising damp, penetrating damp, and condensation. Structural waterproofing for basements and below-ground spaces.",
    items: ["Damp surveys", "Rising damp treatment", "Cavity wall injection", "Basement waterproofing", "Condensation control", "Mould remediation"],
  },
  {
    icon: Flame,
    title: "Fire Safety",
    desc: "Fire door installation, fire stopping, and passive fire protection. Ensuring your property meets current fire safety regulations.",
    items: ["Fire door installation", "Fire stopping works", "Intumescent seals", "Fire risk assessment support", "Emergency lighting", "Signage"],
  },
  {
    icon: TreePine,
    title: "Groundworks & Landscaping",
    desc: "External works including drainage, paving, fencing, and landscaping. We handle the full external envelope of your property.",
    items: ["Drainage repairs", "Paving & patios", "Fencing & gates", "Retaining walls", "External lighting", "Landscaping"],
  },
  {
    icon: Building2,
    title: "Refurbishment & Fit-Out",
    desc: "Full property refurbishments from void preparation to complete commercial fit-outs. We manage the entire project from start to finish.",
    items: ["Void property refurbs", "Kitchen & bathroom fitting", "Commercial fit-outs", "Office refurbishments", "HMO conversions", "Project management"],
  },
  {
    icon: Package,
    title: "General Maintenance",
    desc: "Planned and reactive general maintenance for all property types. One call, one team, all trades.",
    items: ["Planned maintenance programmes", "Reactive repairs", "Property inspections", "Compliance works", "Handyman services", "Multi-trade projects"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, var(--asg-navy) 0%, oklch(22% 0.06 152) 100%)" }}
        aria-labelledby="services-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="services-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              Our Services
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Ten trades. One team. Complete property coverage across Kent and the South East. Every operative is directly employed — no subcontractors, full accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Service listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                      aria-hidden="true"
                    >
                      <service.icon size={24} style={{ color: "var(--asg-green)" }} />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl" style={{ color: "var(--asg-navy)" }}>{service.title}</h2>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                  <ul className="grid grid-cols-2 gap-1.5" role="list">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={14} style={{ color: "var(--asg-green)" }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{ backgroundColor: "#22303b" }}
        aria-labelledby="services-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="services-cta-heading" className="text-2xl lg:text-3xl font-black text-white mb-4">
            Need a Service Not Listed Here?
          </h2>
          <p className="text-gray-300 mb-6">
            If it's property-related, we can help. Get in touch and we'll find a solution.
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
