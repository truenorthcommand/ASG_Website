import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, ArrowRight, FileText, Phone } from "lucide-react";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What areas does Adapt Services Group cover?",
        a: "We are based in Ashford, Kent and cover Kent and the wider South East. Our primary coverage includes Ashford, Canterbury, Folkestone, Dover, Maidstone, Tonbridge, Tunbridge Wells, and surrounding areas. For emergency response, we aim to be on site within 60 minutes across our core coverage area.",
      },
      {
        q: "Do you use subcontractors?",
        a: "No. Every operative on the ASG team is directly employed by us. We do not use agency workers or subcontractors. This means consistent quality, full accountability, and a team that genuinely represents our standards on every job.",
      },
      {
        q: "Are your operatives qualified and insured?",
        a: "Yes. All ASG operatives hold the relevant trade qualifications for their discipline (e.g., Gas Safe registration for plumbers, NICEIC approval for electricians). All team members are DBS checked, and we carry full public liability and employers' liability insurance.",
      },
      {
        q: "What types of property do you work on?",
        a: "We work across all property types: residential (single lets, HMOs, blocks of flats), commercial (offices, retail, industrial), and hospitality (hotels, restaurants, venues). We serve letting agents, block managers, property owners, and commercial operators.",
      },
    ],
  },
  {
    category: "Emergency Response",
    questions: [
      {
        q: "What counts as a property emergency?",
        a: "A property emergency is any situation that poses an immediate risk to the property, its occupants, or its security. Common examples include burst pipes and flooding, total electrical failure, boiler failure in cold weather, structural damage, fire damage, and security breaches such as forced entry.",
      },
      {
        q: "How quickly can you respond to an emergency?",
        a: "For genuine emergencies within our core coverage area, we aim to have an operative on site within 60 minutes of your call. Our 24/7 line is answered by a real person — no voicemail, no automated system.",
      },
      {
        q: "What is your emergency call-out number?",
        a: "Call 01233 564666. This line is answered 24 hours a day, 7 days a week, 365 days a year.",
      },
    ],
  },
  {
    category: "Pricing & Contracts",
    questions: [
      {
        q: "How do you price your work?",
        a: "For planned works, we provide a detailed, transparent quote following a site visit. For emergency call-outs, we agree costs on arrival before commencing work. We do not charge hidden extras — the price we quote is the price you pay.",
      },
      {
        q: "Do you offer maintenance contracts?",
        a: "Yes. We offer planned preventative maintenance (PPM) contracts for letting agents, block managers, and commercial operators. These provide regular scheduled maintenance, priority response for reactive works, and a dedicated account manager. Contact us to discuss your requirements.",
      },
      {
        q: "Can you work within a service charge budget?",
        a: "Yes. We work regularly with block managers and understand the constraints of service charge budgets. We can provide detailed works schedules and phased programmes to align with your budget cycle.",
      },
    ],
  },
  {
    category: "Compliance & Certification",
    questions: [
      {
        q: "Can you provide compliance certificates?",
        a: "Yes. We provide all relevant compliance certificates on completion of qualifying works, including Gas Safety certificates, Electrical Installation Condition Reports (EICRs), and fire door inspection reports. These are delivered digitally as part of our standard job report.",
      },
      {
        q: "Do you carry out EICR testing?",
        a: "Yes. Our NICEIC approved electricians carry out Electrical Installation Condition Reports (EICRs) for both residential and commercial properties. We can also carry out any remedial works identified in the report.",
      },
      {
        q: "Are you Gas Safe registered?",
        a: "Yes. Our plumbing and heating engineers are Gas Safe registered. You can verify our registration on the Gas Safe Register website using our registration number.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm"
        style={{ color: "var(--asg-navy)" }}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="font-semibold text-sm lg:text-base">{q}</span>
        {open ? (
          <ChevronUp size={18} className="shrink-0 text-gray-400" aria-hidden="true" />
        ) : (
          <ChevronDown size={18} className="shrink-0 text-gray-400" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div id={id} className="pb-4 text-gray-600 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Resources() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, var(--asg-navy) 0%, oklch(22% 0.06 152) 100%)" }}
        aria-labelledby="resources-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="resources-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              Resources & FAQ
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Answers to the most common questions about our services, processes, and coverage. Can't find what you're looking for? Call us on 01233 564666.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="sr-only">Frequently Asked Questions</h2>
          <div className="space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h3
                  className="text-lg font-black uppercase tracking-wider mb-4 pb-2 border-b-2"
                  style={{ color: "var(--asg-green)", borderColor: "var(--asg-green)" }}
                >
                  {section.category}
                </h3>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6">
                  {section.questions.map((item) => (
                    <FaqItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources cards */}
      <section className="py-16" style={{ backgroundColor: "var(--asg-grey)" }} aria-labelledby="resources-cards-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="resources-cards-heading" className="text-2xl font-black mb-8 text-center" style={{ color: "var(--asg-navy)" }}>
            Useful Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                aria-hidden="true"
              >
                <FileText size={24} style={{ color: "var(--asg-green)" }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--asg-navy)" }}>Compliance Certificates</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We provide all relevant compliance certificates on completion of qualifying works. Gas Safety, EICR, and fire door inspection reports are delivered digitally as part of our standard job report.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                aria-hidden="true"
              >
                <Phone size={24} style={{ color: "var(--asg-green)" }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--asg-navy)" }}>Contact & Emergency</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                For planned works, use our contact form or call during business hours. For emergencies, call 01233 564666 — answered 24/7 by a real person.
              </p>
              <a
                href="tel:01233564666"
                className="inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: "var(--asg-red)" }}
                aria-label="Call ASG emergency line: 01233 564666"
              >
                <Phone size={14} aria-hidden="true" />
                01233 564666
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white" aria-labelledby="resources-cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="resources-cta-heading" className="text-2xl font-black mb-4" style={{ color: "var(--asg-navy)" }}>
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is happy to discuss your requirements in detail.
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
