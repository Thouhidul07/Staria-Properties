import { motion } from "motion/react";
import { ExternalLink, Globe, Mail, Phone } from "lucide-react";

type TeamMember = {
  name: string;
  initials: string;
  designation: string;
  phones: readonly string[];
  email: string;
  website: string;
  websiteLabel: string;
  contactCardUrl: string;
  photo?: string;
};

const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    name: "Samsunnahar Begum",
    initials: "SB",
    designation: "Chairperson",
    phones: ["+1 (631) 640-9277", "+1 (888) 6139218"],
    email: "samsunnahar.begum@stariaventures.com",
    website: "https://www.stariadevelopment.com",
    websiteLabel: "www.stariadevelopment.com",
    contactCardUrl: "https://scan.page/p/6N8vdG",
  },
  {
    name: "S M Riad Hossain Sumon",
    initials: "SR",
    designation: "Managing Director",
    phones: ["01709993661", "01709993666", "+1 (888) 6139218"],
    email: "riyad.hossain@stariaventures.com",
    website: "https://stariadevelopment.com",
    websiteLabel: "stariadevelopment.com",
    contactCardUrl: "https://scan.page/p/nNUwZ1",
  },
  {
    name: "Tanjim Ahmed",
    initials: "TA",
    designation: "Director",
    phones: ["+1 (347) 632-7151", "+1 (888) 6139218"],
    email: "tanjim.ahmed@stariaventures.com",
    website: "https://www.stariadevelopment.com",
    websiteLabel: "www.stariadevelopment.com",
    contactCardUrl: "https://scan.page/p/5vNEhU",
  },
  {
    name: "Ahmed Robaiat Rezwan Shatadru",
    initials: "AR",
    designation: "Director",
    phones: ["01709993663", "01709993666", "+1 (888) 6139218"],
    email: "shatadru.ahmed@stariaventures.com",
    website: "https://stariadevelopment.com",
    websiteLabel: "stariadevelopment.com",
    contactCardUrl: "https://scan.page/p/RW6m4l",
  },
  {
    name: "Maj S M Muzahid Monir, SUP, psc, PEng, Phd (Retd)",
    initials: "MM",
    designation: "Executive Director",
    phones: ["01709993662", "01709993666", "+1 (888) 6139218"],
    email: "muzahidmonir@stariadevelopment.com",
    website: "https://stariadevelopment.com",
    websiteLabel: "stariadevelopment.com",
    contactCardUrl: "https://scan.page/p/VK66tx",
  },
];

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_10px_35px_rgba(11,94,60,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#0B5E3C]/20 hover:shadow-[0_16px_44px_rgba(11,94,60,0.12)] ${index === 4 ? "lg:col-start-2" : ""}`}
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#0B5E3C]">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          <div aria-hidden="true" className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-3xl text-white" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>
            {member.initials}
          </div>
        )}
        <span aria-hidden="true" className="absolute bottom-0 left-8 right-8 h-1 rounded-t-full bg-[#D9A11A]" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#0B5E3C]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{member.designation}</p>
        <h3 className="min-h-[3.6rem] text-[1.45rem] leading-[1.2] text-[#1B1B1B]" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>{member.name}</h3>

        <div className="mt-5 space-y-3 border-t border-black/[0.07] pt-5 text-[0.8125rem] text-[#555555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <a href={phoneHref(member.phones[0])} className="flex items-center gap-2.5 break-all transition-colors hover:text-[#0B5E3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A11A]">
            <Phone size={14} aria-hidden="true" className="shrink-0 text-[#D9A11A]" />
            {member.phones[0]}
          </a>
          {member.phones.slice(1).map((phone) => (
            <a key={phone} href={phoneHref(phone)} className="flex items-center gap-2.5 break-all transition-colors hover:text-[#0B5E3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A11A]">
              <Phone size={14} aria-hidden="true" className="shrink-0 text-[#D9A11A]" />
              {phone}
            </a>
          ))}
          <a href={`mailto:${member.email}`} className="flex items-start gap-2.5 break-all transition-colors hover:text-[#0B5E3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A11A]">
            <Mail size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[#D9A11A]" />
            {member.email}
          </a>
          <a href={member.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 break-all transition-colors hover:text-[#0B5E3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A11A]">
            <Globe size={14} aria-hidden="true" className="shrink-0 text-[#D9A11A]" />
            {member.websiteLabel}
          </a>
        </div>

        <a href={member.contactCardUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[#0B5E3C]/25 px-4 py-2.5 text-[0.8125rem] font-semibold text-[#0B5E3C] transition-colors hover:bg-[#0B5E3C] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A11A]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          View Contact <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export function OurTeamSection() {
  return (
    <section className="bg-[#F7F7F5] py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 xl:px-20">
        <div className="mb-14 max-w-[620px]">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-7 bg-[#D9A11A]" />
            <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.3em] text-[#0B5E3C]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Leadership</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="mb-5 font-normal leading-[1.1] text-[#1B1B1B]" style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "clamp(34px, 3.5vw, 46px)" }}>
            Meet Our <span className="italic">Team</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }} className="text-[0.95rem] leading-[1.8] text-[#555555]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Meet the leadership team guiding STARIA&apos;s development and property services.
          </motion.p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, index) => <TeamMemberCard key={member.email} member={member} index={index} />)}
        </div>
      </div>
    </section>
  );
}
