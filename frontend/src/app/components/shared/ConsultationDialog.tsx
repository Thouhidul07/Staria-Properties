import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { Link } from "react-router";
import { api } from "../../services/api";

export function ConsultationDialog({ open, onOpenChange, property, initialService, project }: { open: boolean; onOpenChange: (open: boolean) => void; initialService?: string; project?: { title: string; slug: string }; property?: { title: string; referenceCode: string; slug: string } }) {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    if (form.get("consent") !== "on") return;
    setPending(true);
    setError("");
    try {
      await api.submitContact({
        fullName: String(form.get("fullName")).trim(),
        email: String(form.get("email")).trim(),
        phone: String(form.get("phone")).trim(),
        subject: project ? `Project enquiry: ${project.title}`.slice(0, 180) : property ? `Viewing request: ${property.referenceCode}` : `Consultation request: ${form.get("service")}`,
        message: project ? `Project: ${project.title}\nProject page: ${window.location.origin}/projects/${encodeURIComponent(project.slug)}\n\n${String(form.get("message")).trim()}` : property ? `Property: ${property.title} (${property.referenceCode})\nListing: ${window.location.origin}/properties/${encodeURIComponent(property.slug)}\nPreferred viewing time: ${form.get("viewingTime")}\n\n${String(form.get("message")).trim()}` : String(form.get("message")).trim(),
        source: project ? "project-enquiry" : property ? "property-viewing" : "consultation",
        consentAccepted: true,
      });
      setSent(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Your request could not be sent. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const fieldClass = "mt-1.5 w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-[#222] focus:outline-2 focus:outline-[#0B5E3C]";

  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-[201] max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-[#FAFAF6] p-6 sm:p-8 shadow-2xl" onEscapeKeyDown={(event) => { if (pending) event.preventDefault(); }} onPointerDownOutside={(event) => event.preventDefault()}>
        <Dialog.Title className="pr-8 text-3xl text-[#082D1C]" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>{project ? "Discuss this project" : property ? "Request a viewing" : "Get Consultation"}</Dialog.Title>
        <Dialog.Description className="mt-3 mb-6 text-sm leading-6 text-[#666]">Tell us what you need. Our team will review your request and contact you.</Dialog.Description>
        <Dialog.Close disabled={pending} aria-label="Close consultation form" className="absolute right-4 top-4 rounded-full p-2 hover:bg-black/5 disabled:opacity-40"><X size={20} /></Dialog.Close>
        {sent ? <div role="status" className="py-6 text-center">
          <CheckCircle2 size={42} className="mx-auto mb-4 text-[#0B5E3C]" />
          <h2 className="text-xl font-semibold text-[#082D1C]">Request submitted</h2>
          <p className="mt-3 text-sm leading-6 text-[#666]">Thank you. Our team has received your request and will get in touch.</p>
          <Dialog.Close className="mt-6 rounded-full bg-[#D9A11A] px-6 py-3 font-semibold">Done</Dialog.Close>
        </div> : <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-medium">Full name <span aria-hidden="true">*</span><input name="fullName" autoComplete="name" required minLength={2} maxLength={140} pattern=".*\S.*" className={fieldClass} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={160} className={fieldClass} /></label>
            <label className="block text-sm font-medium">Phone <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} pattern=".*\S.*" className={fieldClass} /></label>
          </div>
          {project ? <p className="rounded-xl bg-emerald-50 p-3 text-sm text-[#0B5E3C]">Project: {project.title}</p> : property ? <div><p className="mb-3 rounded-xl bg-emerald-50 p-3 text-sm text-[#0B5E3C]">{property.title} ? {property.referenceCode}</p><label className="block text-sm font-medium">Preferred viewing time<input name="viewingTime" required maxLength={120} placeholder="e.g. Saturday afternoon, Dhaka time" className={fieldClass} /></label></div> : <label className="block text-sm font-medium">Interested in <span aria-hidden="true">*</span><select name="service" required defaultValue={initialService ?? ""} className={fieldClass}>
            <option value="" disabled>Select a service</option>
            {initialService && <option value={initialService}>{initialService}</option>}
            {["Buying a property", "Selling a property", "Property development", "Interior design", "Property management", "Investment advice", "Other"].map((service) => <option key={service}>{service}</option>)}
          </select></label>}
          <label className="block text-sm font-medium">How can we help? <span aria-hidden="true">*</span><textarea name="message" required minLength={5} maxLength={property || project ? 3500 : 5000} rows={4} className={fieldClass} placeholder="Share your requirements and preferred time to contact you." /></label>
          <label className="flex items-start gap-3 text-sm leading-6 text-[#555]"><input name="consent" type="checkbox" required className="mt-1.5 accent-[#0B5E3C]" /><span>I agree to the <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-[#0B5E3C]">privacy policy</Link> and consent to being contacted about my request.</span></label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D9A11A] px-5 py-3 font-semibold text-[#1B1B1B] hover:bg-[#C08912] disabled:opacity-60" type="submit">{pending && <Loader2 size={17} className="animate-spin" />}{pending ? "Submitting…" : project ? "Send project enquiry" : property ? "Submit viewing request" : "Submit consultation request"}</button>
        </form>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
