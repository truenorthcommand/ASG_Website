import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface IntakeFormProps {
  /** "contact" for general enquiry, "emergency" for urgent job */
  context?: "contact" | "emergency";
}

const urgencyOptions = [
  { value: "normal", label: "Planned / Non-urgent" },
  { value: "high", label: "Urgent — needed within 24 hours" },
];

const emergencyTypeOptions = [
  { value: "", label: "Select emergency type (optional)" },
  { value: "burst_pipe", label: "Burst pipe / flooding" },
  { value: "electrical_failure", label: "Electrical failure" },
  { value: "boiler_failure", label: "Boiler / heating failure" },
  { value: "security_breach", label: "Security breach / forced entry" },
  { value: "structural_damage", label: "Structural damage" },
  { value: "fire_damage", label: "Fire damage" },
  { value: "other", label: "Other emergency" },
];

export default function IntakeForm({ context = "contact" }: IntakeFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    postcode: "",
    description: "",
    urgency: context === "emergency" ? "high" : "normal",
    emergency_type: "",
    gdprConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [jobRef, setJobRef] = useState<string | null>(null);

  const submitMutation = trpc.intake.submit.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setJobRef(data.jobNo ?? null);
    },
  });

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Full name is required.";
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address.";
    }
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Phone number is required.";
    if (!formData.address.trim()) newErrors.address = "Property address is required.";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required.";
    if (!formData.description.trim()) newErrors.description = "Please describe the work required.";
    if (!formData.gdprConsent) newErrors.gdprConsent = "You must agree to our privacy policy to submit this form.";
    return newErrors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first error field
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      el?.focus();
      return;
    }
    submitMutation.mutate({
      customerName: formData.customerName.trim(),
      contactEmail: formData.contactEmail.trim(),
      contactPhone: formData.contactPhone.trim(),
      address: formData.address.trim(),
      postcode: formData.postcode.trim().toUpperCase(),
      description: formData.description.trim(),
      urgency: formData.urgency as "high" | "normal",
      emergency_type: formData.emergency_type || undefined,
    });
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ backgroundColor: "oklch(95% 0.04 152)" }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: "var(--asg-green)" }} aria-hidden="true" />
        <h3 className="text-xl font-black mb-2" style={{ color: "var(--asg-navy)" }}>
          Enquiry Received
        </h3>
        {jobRef && (
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--asg-green)" }}>
            Reference: {jobRef}
          </p>
        )}
        <p className="text-gray-600 text-sm leading-relaxed">
          Thank you for getting in touch. A member of the ASG team will contact you shortly. If this is urgent, please call us directly on{" "}
          <a href="tel:01233564666" className="font-bold underline" style={{ color: "var(--asg-green)" }}>
            01233 564666
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldClass = (name: string) =>
    `w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 transition-colors ${
      errors[name]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-200 focus:ring-green-300 focus:border-green-400"
    }`;

  const labelClass = "block text-sm font-semibold mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Property enquiry form"
      className="space-y-5"
    >
      {submitMutation.isError && (
        <div
          className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-200"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-700 text-sm">
            There was a problem submitting your enquiry. Please try again or call us on{" "}
            <a href="tel:01233564666" className="font-bold underline">01233 564666</a>.
          </p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="field-customerName" className={labelClass} style={{ color: "var(--asg-navy)" }}>
          Full Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="field-customerName"
          name="customerName"
          type="text"
          autoComplete="name"
          value={formData.customerName}
          onChange={handleChange}
          className={fieldClass("customerName")}
          aria-required="true"
          aria-describedby={errors.customerName ? "err-customerName" : undefined}
          aria-invalid={!!errors.customerName}
          placeholder="Jane Smith"
        />
        {errors.customerName && (
          <p id="err-customerName" className="text-red-600 text-xs mt-1" role="alert">{errors.customerName}</p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="field-contactEmail" className={labelClass} style={{ color: "var(--asg-navy)" }}>
            Email Address <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="field-contactEmail"
            name="contactEmail"
            type="email"
            autoComplete="email"
            value={formData.contactEmail}
            onChange={handleChange}
            className={fieldClass("contactEmail")}
            aria-required="true"
            aria-describedby={errors.contactEmail ? "err-contactEmail" : undefined}
            aria-invalid={!!errors.contactEmail}
            placeholder="jane@example.co.uk"
          />
          {errors.contactEmail && (
            <p id="err-contactEmail" className="text-red-600 text-xs mt-1" role="alert">{errors.contactEmail}</p>
          )}
        </div>
        <div>
          <label htmlFor="field-contactPhone" className={labelClass} style={{ color: "var(--asg-navy)" }}>
            Phone Number <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="field-contactPhone"
            name="contactPhone"
            type="tel"
            autoComplete="tel"
            value={formData.contactPhone}
            onChange={handleChange}
            className={fieldClass("contactPhone")}
            aria-required="true"
            aria-describedby={errors.contactPhone ? "err-contactPhone" : undefined}
            aria-invalid={!!errors.contactPhone}
            placeholder="07700 900000"
          />
          {errors.contactPhone && (
            <p id="err-contactPhone" className="text-red-600 text-xs mt-1" role="alert">{errors.contactPhone}</p>
          )}
        </div>
      </div>

      {/* Address + Postcode */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="field-address" className={labelClass} style={{ color: "var(--asg-navy)" }}>
            Property Address <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="field-address"
            name="address"
            type="text"
            autoComplete="street-address"
            value={formData.address}
            onChange={handleChange}
            className={fieldClass("address")}
            aria-required="true"
            aria-describedby={errors.address ? "err-address" : undefined}
            aria-invalid={!!errors.address}
            placeholder="12 High Street, Ashford"
          />
          {errors.address && (
            <p id="err-address" className="text-red-600 text-xs mt-1" role="alert">{errors.address}</p>
          )}
        </div>
        <div>
          <label htmlFor="field-postcode" className={labelClass} style={{ color: "var(--asg-navy)" }}>
            Postcode <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="field-postcode"
            name="postcode"
            type="text"
            autoComplete="postal-code"
            value={formData.postcode}
            onChange={handleChange}
            className={fieldClass("postcode")}
            aria-required="true"
            aria-describedby={errors.postcode ? "err-postcode" : undefined}
            aria-invalid={!!errors.postcode}
            placeholder="TN24 0AB"
          />
          {errors.postcode && (
            <p id="err-postcode" className="text-red-600 text-xs mt-1" role="alert">{errors.postcode}</p>
          )}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label htmlFor="field-urgency" className={labelClass} style={{ color: "var(--asg-navy)" }}>
          Urgency
        </label>
        <select
          id="field-urgency"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          className={fieldClass("urgency") + " bg-white"}
        >
          {urgencyOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Emergency type (only shown when urgency is high) */}
      {formData.urgency === "high" && (
        <div>
          <label htmlFor="field-emergency_type" className={labelClass} style={{ color: "var(--asg-navy)" }}>
            Emergency Type
          </label>
          <select
            id="field-emergency_type"
            name="emergency_type"
            value={formData.emergency_type}
            onChange={handleChange}
            className={fieldClass("emergency_type") + " bg-white"}
          >
            {emergencyTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Description */}
      <div>
        <label htmlFor="field-description" className={labelClass} style={{ color: "var(--asg-navy)" }}>
          Description of Works Required <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="field-description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={fieldClass("description") + " resize-none"}
          aria-required="true"
          aria-describedby={errors.description ? "err-description" : "desc-description"}
          aria-invalid={!!errors.description}
          placeholder="Please describe the issue or works required in as much detail as possible."
        />
        <p id="desc-description" className="text-gray-400 text-xs mt-1">
          The more detail you provide, the faster we can respond.
        </p>
        {errors.description && (
          <p id="err-description" className="text-red-600 text-xs mt-1" role="alert">{errors.description}</p>
        )}
      </div>

      {/* GDPR consent */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="field-gdprConsent"
            name="gdprConsent"
            type="checkbox"
            checked={formData.gdprConsent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-green-400"
            style={{ accentColor: "var(--asg-green)" }}
            aria-required="true"
            aria-describedby={errors.gdprConsent ? "err-gdprConsent" : "desc-gdprConsent"}
            aria-invalid={!!errors.gdprConsent}
          />
          <label htmlFor="field-gdprConsent" className="text-sm text-gray-600 leading-relaxed">
            I agree to Adapt Services Group processing my personal data in accordance with the{" "}
            <a href="/privacy" className="underline font-medium" style={{ color: "var(--asg-green)" }}>
              Privacy Policy
            </a>
            . My data will be used to respond to this enquiry and, where relevant, to manage the associated works.
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
          </label>
        </div>
        <p id="desc-gdprConsent" className="sr-only">
          You must agree to our privacy policy to submit this form.
        </p>
        {errors.gdprConsent && (
          <p id="err-gdprConsent" className="text-red-600 text-xs mt-1 ml-7" role="alert">{errors.gdprConsent}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-md font-bold text-white text-base transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-green-300"
        style={{ backgroundColor: "var(--asg-green)", minHeight: "52px" }}
        aria-busy={submitMutation.isPending}
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          "Submit Enquiry"
        )}
      </button>

      <p className="text-gray-400 text-xs text-center">
        Fields marked <span className="text-red-500" aria-hidden="true">*</span> are required.
        For emergencies, call <a href="tel:01233564666" className="underline" style={{ color: "var(--asg-green)" }}>01233 564666</a>.
      </p>
    </form>
  );
}
