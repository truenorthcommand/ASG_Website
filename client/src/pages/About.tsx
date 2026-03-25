import { Link } from "wouter";
import { ArrowRight, Target, Eye, Heart, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, var(--asg-navy) 0%, oklch(22% 0.06 152) 100%)" }}
        aria-labelledby="about-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="about-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              About Adapt Services Group
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              We are a property maintenance and emergency response company built on a simple principle: do the job right, communicate clearly, and never let a client down.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 id="story-heading" className="text-3xl font-black mb-6" style={{ color: "var(--asg-navy)" }}>
                The New Industry Standard
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Adapt Services Group was founded to address a persistent problem in the property maintenance industry: unreliable contractors, poor communication, and a lack of accountability. We set out to build something different.
                </p>
                <p>
                  Based in Ashford, Kent, we serve letting agents, block managers, hospitality operators, and commercial property owners across Kent and the South East. Every operative on our team is directly employed — no subcontractors, no agency workers.
                </p>
                <p>
                  This means you get consistent quality, full accountability, and a team that genuinely cares about the outcome of every job. When we say we'll be there, we will be.
                </p>
              </div>
            </div>
            <div className="rounded-xl p-8" style={{ backgroundColor: "var(--asg-grey)" }}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "100%", label: "In-House Team" },
                  { value: "24/7", label: "Emergency Cover" },
                  { value: "10+", label: "Trades Covered" },
                  { value: "Kent", label: "& South East" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-white rounded-lg">
                    <div className="text-3xl font-black mb-1" style={{ color: "var(--asg-green)" }}>{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--asg-grey)" }} aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="values-heading" className="text-3xl font-black text-center mb-12" style={{ color: "var(--asg-navy)" }}>
            Our Mission, Vision & Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Mission",
                desc: "To deliver property maintenance services that set a new standard for reliability, quality, and communication in the industry.",
              },
              {
                icon: Eye,
                title: "Vision",
                desc: "To become the most trusted property maintenance partner in the South East — the first call every property manager makes.",
              },
              {
                icon: Heart,
                title: "Values",
                desc: "Accountability, transparency, quality, and speed. We do what we say, say what we mean, and never cut corners.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 text-center shadow-sm">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                  aria-hidden="true"
                >
                  <item.icon size={28} style={{ color: "var(--asg-green)" }} />
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: "var(--asg-navy)" }}>{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "oklch(90% 0.06 152)" }}
            aria-hidden="true"
          >
            <Users size={32} style={{ color: "var(--asg-green)" }} />
          </div>
          <h2 id="team-heading" className="text-3xl font-black mb-4" style={{ color: "var(--asg-navy)" }}>
            Our Team
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Every member of the ASG team is directly employed, fully qualified, and DBS checked. We invest in our people because they are the product. When you work with ASG, you work with the same faces every time.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-white text-base transition-all duration-200"
            style={{ backgroundColor: "var(--asg-green)", minHeight: "52px" }}
          >
            Work With Us <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Company details */}
      <section className="py-12" style={{ backgroundColor: "var(--asg-grey)" }} aria-labelledby="company-details-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 id="company-details-heading" className="text-xl font-bold mb-4" style={{ color: "var(--asg-navy)" }}>
              Company Information
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {[
                { label: "Registered Name", value: "Adapt Services Group Ltd" },
                { label: "Companies House", value: "17042975" },
                { label: "Registered Address", value: "Unit 2 Meadow View Industrial Estate, Ruckinge, Ashford, Kent, TN26 2NR" },
                { label: "Contact", value: "info@adaptservicesgroup.co.uk" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-1">{item.label}</dt>
                  <dd className="text-gray-700">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
