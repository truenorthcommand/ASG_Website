import { Phone, AlertTriangle, Clock, Shield, Zap, Droplets, Flame, Lock } from "lucide-react";

const emergencyTypes = [
  { icon: Droplets, label: "Burst Pipe / Flooding" },
  { icon: Zap, label: "Electrical Failure" },
  { icon: Flame, label: "Boiler / Heating Failure" },
  { icon: Lock, label: "Security Breach / Forced Entry" },
  { icon: AlertTriangle, label: "Structural Damage" },
  { icon: Shield, label: "Fire Damage" },
];

export default function Emergency() {
  return (
    <div className="min-h-screen">
      {/* Hero — red background for urgency */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "var(--asg-red)" }}
        aria-labelledby="emergency-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={32} className="text-white" aria-hidden="true" />
              <span className="text-white font-bold uppercase tracking-wider text-sm">24/7 Emergency Response</span>
            </div>
            <h1 id="emergency-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              Property Emergency?
            </h1>
            <p className="text-red-100 text-lg leading-relaxed mb-8">
              Our emergency response team is available 24 hours a day, 7 days a week, 365 days a year. Call now for immediate assistance.
            </p>
            <a
              href="tel:01233564666"
              className="inline-flex items-center gap-3 px-8 py-5 rounded-md font-black text-xl bg-white transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
              style={{ color: "var(--asg-red)", minHeight: "64px" }}
              aria-label="Call ASG emergency line: 01233 564666"
            >
              <Phone size={28} aria-hidden="true" />
              01233 564666
            </a>
            <p className="text-red-200 text-sm mt-3">Lines answered 24/7 — no voicemail, no automated system.</p>
          </div>
        </div>
      </section>

      {/* Emergency types */}
      <section className="py-16 bg-white" aria-labelledby="emergency-types-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="emergency-types-heading" className="text-2xl font-black mb-8" style={{ color: "var(--asg-navy)" }}>
            We Respond to All Property Emergencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {emergencyTypes.map((type) => (
              <div
                key={type.label}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-100"
                style={{ backgroundColor: "var(--asg-grey)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--asg-red)" }}
                  aria-hidden="true"
                >
                  <type.icon size={20} className="text-white" />
                </div>
                <span className="font-semibold text-sm" style={{ color: "var(--asg-navy)" }}>{type.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response promise */}
      <section className="py-16" style={{ backgroundColor: "var(--asg-grey)" }} aria-labelledby="response-promise-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="response-promise-heading" className="text-2xl font-black mb-8 text-center" style={{ color: "var(--asg-navy)" }}>
            Our Emergency Response Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: "Answered Immediately",
                desc: "Your call is answered by a real person, 24 hours a day. No voicemail, no automated system, no waiting.",
              },
              {
                icon: Clock,
                title: "On Site Within the Hour",
                desc: "For genuine emergencies, our on-call team will be mobilised and on site within 60 minutes across our coverage area.",
              },
              {
                icon: Shield,
                title: "Damage Contained",
                desc: "Our priority is to contain the damage and make the property safe. Full reinstatement follows as quickly as possible.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                  aria-hidden="true"
                >
                  <item.icon size={28} style={{ color: "var(--asg-green)" }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--asg-navy)" }}>{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage area */}
      <section className="py-16 bg-white" aria-labelledby="coverage-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="coverage-heading" className="text-2xl font-black mb-4" style={{ color: "var(--asg-navy)" }}>
                Coverage Area
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our emergency response service covers Kent and the wider South East. Based in Ashford, we can reach most of our service area within 60 minutes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you are outside our primary coverage area, call us anyway — we will do our best to assist or direct you to a trusted local partner.
              </p>
            </div>
            <div
              className="rounded-xl p-8"
              style={{ backgroundColor: "var(--asg-navy)" }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Primary Coverage</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-300 text-sm" role="list">
                {[
                  "Ashford", "Canterbury", "Folkestone", "Dover",
                  "Maidstone", "Tonbridge", "Tunbridge Wells", "Sevenoaks",
                  "Hythe", "New Romney", "Tenterden", "Faversham",
                ].map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-12"
        style={{ backgroundColor: "var(--asg-red)" }}
        aria-labelledby="emergency-bottom-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="emergency-bottom-cta-heading" className="text-2xl font-black text-white mb-4">
            Don't Wait — Call Now
          </h2>
          <a
            href="tel:01233564666"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-md font-black text-lg bg-white transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
            style={{ color: "var(--asg-red)", minHeight: "56px" }}
            aria-label="Call ASG emergency line: 01233 564666"
          >
            <Phone size={24} aria-hidden="true" />
            01233 564666
          </a>
        </div>
      </section>
    </div>
  );
}
