import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { Link } from "react-router";
import { api } from "../../services/api";

export function EmploymentDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
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
      const cv = form.get("cv");
      if (!(cv instanceof File) || cv.size === 0) throw new Error("Please upload your CV as a PDF.");
      if (cv.size > 5 * 1024 * 1024) throw new Error("Your CV must be 5 MB or smaller.");
      if (!cv.name.toLowerCase().endsWith(".pdf") || (cv.type && cv.type !== "application/pdf")) throw new Error("Only PDF CV files are allowed.");
      const application = {
        fullName: String(form.get("fullName")).trim(),
        email: String(form.get("email")).trim(),
        phone: String(form.get("phone")).trim(),
        subject: `Employment application: ${String(form.get("position")).trim()}`,
        message: `Desired position: ${form.get("position")}\nExperience: ${form.get("experience")}\nQualifications: ${form.get("qualifications")}\n\nCover letter:\n${String(form.get("message")).trim()}`,
        source: "employment-application",
        consentAccepted: true,
      };
      const upload = new FormData();
      for (const [key, value] of Object.entries(application)) upload.append(key, String(value));
      upload.append("cv", cv);
      await api.submitEmployment(upload);
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
        <Dialog.Title className="pr-8 text-3xl text-[#082D1C]" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>Join our team</Dialog.Title>
        <Dialog.Description className="mt-3 mb-6 text-sm leading-6 text-[#666]">Apply for employment at Staria Properties. Tell us about your skills and the role you are interested in.</Dialog.Description>
        <Dialog.Close disabled={pending} aria-label="Close employment application" className="absolute right-4 top-4 rounded-full p-2 hover:bg-black/5 disabled:opacity-40"><X size={20} /></Dialog.Close>
        {sent ? <div role="status" className="py-6 text-center">
          <CheckCircle2 size={42} className="mx-auto mb-4 text-[#0B5E3C]" />
          <h2 className="text-xl font-semibold text-[#082D1C]">Application received</h2>
          <p className="mt-3 text-sm leading-6 text-[#666]">Thank you. Our team will review your application and contact you if a suitable opportunity is available.</p>
          <Dialog.Close className="mt-6 rounded-full bg-[#D9A11A] px-6 py-3 font-semibold">Done</Dialog.Close>
        </div> : <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-medium">Full name <span aria-hidden="true">*</span><input name="fullName" autoComplete="name" required minLength={2} maxLength={140} pattern=".*\S.*" className={fieldClass} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={160} className={fieldClass} /></label>
            <label className="block text-sm font-medium">Phone <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} pattern=".*\S.*" className={fieldClass} /></label>
          </div>
          <label className="block text-sm font-medium">Desired position *<input name="position" required maxLength={140} pattern=".*\S.*" placeholder="e.g. Sales Executive, Civil Engineer" className={fieldClass} /></label>
          <label className="block text-sm font-medium">Experience *<select name="experience" required defaultValue="" className={fieldClass}><option value="" disabled>Select your experience</option>{["Fresh graduate / no prior experience", "Less than 1 year", "1?3 years", "3?5 years", "More than 5 years"].map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="block text-sm font-medium">Qualifications and skills *<textarea name="qualifications" required minLength={5} maxLength={1000} rows={3} className={fieldClass} placeholder="Education, certifications and relevant skills" /></label>
          <label className="block text-sm font-medium">Upload CV (PDF) *<input name="cv" type="file" accept=".pdf,application/pdf" required className={fieldClass} /><span className="mt-1 block text-xs font-normal text-[#666]">PDF only, up to 5 MB.</span></label>
          <label className="block text-sm font-medium">Cover letter *<textarea name="message" required minLength={20} maxLength={2500} rows={4} className={fieldClass} placeholder="Tell us why you would like to join Staria Properties." /></label>
          <label className="flex items-start gap-3 text-sm leading-6 text-[#555]"><input name="consent" type="checkbox" required className="mt-1.5 accent-[#0B5E3C]" /><span>I agree to the <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="underline text-[#0B5E3C]">privacy policy</Link> and consent to my application details being used for recruitment.</span></label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D9A11A] px-5 py-3 font-semibold text-[#1B1B1B] hover:bg-[#C08912] disabled:opacity-60" type="submit">{pending && <Loader2 size={17} className="animate-spin" />}{pending ? "Submitting…" : "Submit application"}</button>
        </form>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
