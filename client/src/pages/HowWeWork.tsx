import { Link } from "wouter";
import { PhoneCall, ClipboardList, Wrench, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Contact Us",
    desc: "Call us on 01233 564666, submit a form online, or send an email. For emergencies, our 24/7 line is always answered. We'll take the details and confirm we can help.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Assessment & Quote",
    desc: "For planned works, we'll arrange a site visit to assess the job and provide a detailed, transparent quote. For emergencies, we'll mobilise immediately and agree costs on arrival.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Works Carried Out",
    desc: "Our directly employed operatives arrive on time, in uniform, and with the right tools and materials. We work efficiently and cleanly, keeping you updated throughout.",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Sign-Off & Reporting",
    desc: "On completion, we provide a detailed job report with photos, any relevant compliance certificates, and a clear invoice. No surprises, no hidden costs.",
  },
];

export default function HowWeWork() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, var(--asg-navy) 0%, oklch(22% 0.06 152) 100%)" }}
        aria-labelledby="how-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="how-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              How We Work
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              A simple, transparent process from first contact to final sign-off. No confusion, no hidden costs, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="process-heading" className="text-3xl font-black text-center mb-12" style={{ color: "var(--asg-navy)" }}>
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 z-0"
                    style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "var(--asg-green)" }}
                      aria-hidden="true"
                    >
                      <step.icon size={28} className="text-white" />
                    </div>
                    <span className="text-3xl font-black" style={{ color: "oklch(88% 0.06 152)" }}>
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "var(--asg-navy)" }}>{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our commitments */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--asg-grey)" }} aria-labelledby="commitments-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="commitments-heading" className="text-3xl font-black mb-6" style={{ color: "var(--asg-navy)" }}>
                Our Commitments to You
              </h2>
              <ul className="space-y-4" role="list">
                {[
                  "We answer the phone — day, night, and weekends.",
                  "We arrive when we say we will.",
                  "We use only directly employed, qualified operatives.",
                  "We provide transparent pricing with no hidden costs.",
                  "We deliver detailed job reports and compliance certificates.",
                  "We follow up to ensure you're satisfied with the work.",
                  "We never subcontract without your explicit knowledge.",
                  "We treat every property as if it were our own.",
                ].map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: "var(--asg-green)" }} aria-hidden="true" />
                    <span className="text-gray-700">{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl p-8"
              style={{ backgroundColor: "var(--asg-navy)" }}
            >
              <h3 className="text-white font-bold text-xl mb-4">Emergency Response</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                For genuine emergencies — burst pipes, electrical failures, security breaches — we operate a 24/7 response service. Our on-call team will be mobilised within the hour.
              </p>
              <Link
                href="/emergency"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold text-white text-sm transition-all duration-200"
                style={{ backgroundColor: "var(--asg-red)", minHeight: "44px" }}
              >
                Report an Emergency <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#22303b" }} aria-labelledby="how-cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="how-cta-heading" className="text-2xl lg:text-3xl font-black mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-6">
            Contact us today to discuss your maintenance requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-white text-base transition-all duration-200"
            style={{ backgroundColor: "var(--asg-green)", minHeight: "52px" }}
          >
            Contact Us <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
