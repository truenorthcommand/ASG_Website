import { Phone, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";
import IntakeForm from "../components/IntakeForm";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, var(--asg-navy) 0%, oklch(22% 0.06 152) 100%)" }}
        aria-labelledby="contact-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 id="contact-hero-heading" className="text-4xl lg:text-5xl font-black text-white mb-4">
              Contact Us
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you need a quote for planned works, want to discuss a maintenance contract, or have a general enquiry — we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency banner */}
      <div
        className="py-4"
        style={{ backgroundColor: "var(--asg-red)" }}
        role="alert"
        aria-live="polite"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-white shrink-0" aria-hidden="true" />
            <span className="text-white font-bold text-sm">
              Property Emergency? Don't use this form — call us immediately.
            </span>
          </div>
          <a
            href="tel:01233564666"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-white font-black text-sm transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
            style={{ color: "var(--asg-red)", minHeight: "40px" }}
            aria-label="Call ASG emergency line: 01233 564666"
          >
            <Phone size={16} aria-hidden="true" />
            01233 564666
          </a>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Contact information and form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact details */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-xl font-black mb-6" style={{ color: "var(--asg-navy)" }}>
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <a
                    href="tel:01233564666"
                    className="flex items-start gap-3 group"
                    aria-label="Call ASG on 01233 564666"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                      aria-hidden="true"
                    >
                      <Phone size={18} style={{ color: "var(--asg-green)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Phone</div>
                      <div className="font-bold group-hover:underline" style={{ color: "var(--asg-navy)" }}>
                        01233 564666
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@adaptservicesgroup.co.uk"
                    className="flex items-start gap-3 group"
                    aria-label="Email ASG at info@adaptservicesgroup.co.uk"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                      aria-hidden="true"
                    >
                      <Mail size={18} style={{ color: "var(--asg-green)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Email</div>
                      <div className="font-bold group-hover:underline break-all" style={{ color: "var(--asg-navy)" }}>
                        info@adaptservicesgroup.co.uk
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                      aria-hidden="true"
                    >
                      <MapPin size={18} style={{ color: "var(--asg-green)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Address</div>
                      <address className="not-italic font-medium text-gray-700 text-sm leading-relaxed">
                        Unit 2 Meadow View Industrial Estate<br />
                        Ruckinge, Ashford<br />
                        Kent, TN26 2NR
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: "oklch(90% 0.06 152)" }}
                      aria-hidden="true"
                    >
                      <Clock size={18} style={{ color: "var(--asg-green)" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Office Hours</div>
                      <div className="text-sm text-gray-700">
                        <div>Mon–Fri: 8:00am – 6:00pm</div>
                        <div>Emergency line: 24/7</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company info */}
              <div className="rounded-xl p-5 border border-gray-100" style={{ backgroundColor: "var(--asg-grey)" }}>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: "var(--asg-green)" }}>
                  Company Information
                </h3>
                <dl className="text-sm space-y-1">
                  <div className="flex gap-2">
                    <dt className="text-gray-500 shrink-0">Registered name:</dt>
                    <dd className="text-gray-700 font-medium">Adapt Services Group Ltd</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 shrink-0">Companies House:</dt>
                    <dd className="text-gray-700 font-medium">17042975</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-black mb-6" style={{ color: "var(--asg-navy)" }}>
                Send Us a Message
              </h2>
              <IntakeForm context="contact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
