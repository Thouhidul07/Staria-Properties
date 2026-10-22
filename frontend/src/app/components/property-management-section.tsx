import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ConsultationDialog } from "./shared/ConsultationDialog";
import { BD_PHONE_TEL } from "../services/contactDetails";
import {
  Users, CreditCard, Wrench, FileText, Eye, Globe,
  ArrowRight, CheckCheck, Shield, Star, Phone, Leaf,
} from "lucide-react";

// ── Alternating detailed service rows (client advantages) ────────────────────
const PRIMARY_SERVICES = [
  {
    num: "01",
    category: "International Perspective",
    title: "Global Practices, Local Understanding",
    subtitle: "Backed by Reliance Tech Inc. (USA)",
    desc: "As a subsidiary of Reliance Tech Inc. (USA), STARIA draws on international business practices while remaining closely connected to Bangladesh's property market. Clients benefit from professional guidance grounded in their local context.",
    features: [
      "International business perspective",
      "Professional principles and accountability",
      "Local market understanding",
      "Guidance aligned with client goals"
    ],
    icon: Globe,
    image: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=900&h=650&fit=crop&auto=format&q=92",
    alt: "Illustrative stock photograph of a professional planning meeting",
    reversed: false
  },
  {
    num: "02",
    category: "Technology-Driven Operations",
    title: "Clear Information, Informed Decisions",
    subtitle: "Digital Tools & Transparent Processes",
    desc: "STARIA uses modern digital tools and smart systems to improve transparency, efficiency and reporting. This approach helps clients understand their projects and make decisions with clearer information.",
    features: [
      "Technology-enabled coordination",
      "Transparent communication",
      "Digital tools supporting reporting",
      "Information to support client decisions"
    ],
    icon: Eye,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=650&fit=crop&auto=format&q=92",
    alt: "Illustrative stock photograph of professionals reviewing project documents",
    reversed: true
  }
] as const;

// ── Compact service cards (3 client benefits) ──────────────────────────
const COMPACT_SERVICES = [
  {
    icon: FileText,
    title: "Local Market Knowledge",
    desc: "Professional guidance informed by an understanding of Bangladesh's real estate market helps clients assess their requirements and development options.",
    features: [
      "Local market context",
      "Professional guidance",
      "Informed project discussions",
      "Understanding client priorities"
    ]
  },
  {
    icon: Users,
    title: "Client-Focused Solutions",
    desc: "We place clients at the centre of each engagement and tailor solutions to their goals, rather than applying a single approach to every project.",
    features: [
      "Individual requirements",
      "Tailored solutions",
      "Open communication",
      "Client-centred decisions"
    ]
  },
  {
    icon: Leaf,
    title: "Sustainable Long-Term Value",
    desc: "Our approach considers the lasting environmental, social and economic value of development, supporting responsible decisions throughout the property lifecycle.",
    features: [
      "Responsible development",
      "Resource awareness",
      "Long-term asset value",
      "Community and environmental considerations"
    ]
  }
] as const;

// ── Reusable alternating row ──────────────────────────────────────────────────
function PrimaryServiceRow({
  num, category, title, subtitle, desc, features, icon: Icon, image, alt, reversed,
}: typeof PRIMARY_SERVICES[number]) {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-36, 36]);
  const [hovered, setHovered] = useState(false);

  const imgBlock = (
    <div
      ref={imgRef}
      className="relative overflow-hidden rounded-3xl bg-[#D0D0D0] h-[440px] lg:h-[520px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        <motion.div style={{ y: imgY }} className="w-full h-full">
          <img src={image} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
      <span
        className="absolute top-6 left-6 bg-[#0B5E3C] text-white text-[0.8125rem] tracking-[0.35em] uppercase px-4 py-2 rounded-full"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {category}
      </span>
      <span
        className="absolute bottom-4 right-6 text-white/[0.12] leading-none select-none pointer-events-none"
        style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "7rem" }}
      >
        {num}
      </span>
    </div>
  );

  const contentBlock = (
    <div className="flex flex-col justify-center py-6 lg:py-0">
      <div className="w-14 h-14 rounded-2xl bg-[#0B5E3C]/[0.08] flex items-center justify-center mb-6">
        <Icon size={26} className="text-[#0B5E3C]" />
      </div>
      <p
        className="text-[#0B5E3C] text-[0.8125rem] tracking-[0.45em] uppercase font-semibold mb-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {subtitle}
      </p>
      <h3
        className="text-[#1B1B1B] mb-5 leading-tight"
        style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 400 }}
      >
        {title}
      </h3>
      <p
        className="text-[#555555] leading-[1.9] mb-7"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}
      >
        {desc}
      </p>
      <ul className="space-y-3 mb-9">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <CheckCheck size={15} className="text-[#0B5E3C] mt-0.5 shrink-0" />
            <span className="text-[#444444] text-[0.85rem] leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
      <motion.div
        className={reversed ? "lg:order-2" : "lg:order-1"}
        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {imgBlock}
      </motion.div>
      <motion.div
        className={reversed ? "lg:order-1" : "lg:order-2"}
        initial={{ opacity: 0, x: reversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {contentBlock}
      </motion.div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
// Set to true to restore the original portfolio consultation CTA.
const SHOW_PORTFOLIO_CTA = false;

export function PropertyManagementSection() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  return (
    <div id="property-management">

      {/* ── Section Header ── */}
      <section className="bg-white pt-28 pb-20">
        <div className="max-w-[1440px] mx-auto px-12 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-28 items-center">

            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-7 h-px bg-[#D9A11A]" />
                <span
                  className="text-[#0B5E3C] text-[0.8125rem] tracking-[0.32em] uppercase font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  The STARIA Advantage
                </span>
              </div>
              <h2
                className="font-normal leading-[1.07] text-[#1B1B1B] mb-6"
                style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "clamp(34px, 3.5vw, 46px)" }}
              >
                A Client-Focused Approach,
                <br />
                <span className="italic text-[#0B5E3C]">Built Around Your Goals</span>
              </h2>
              <p
                className="text-[#555555] leading-[1.9] max-w-[460px]"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.97rem" }}
              >
                International business practices, local knowledge and technology-driven
                operations support tailored solutions and long-term asset value.
                Images in this section are illustrative stock photographs.
              </p>


            </motion.div>

            {/* Right: stats + trust signals */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { val: null, label: "Global Perspective", icon: Shield, color: "#0B5E3C" },
                { val: null, label: "Transparent Operations", icon: CreditCard, color: "#D9A11A" },
                { val: null, label: "Client Focus", icon: Star, color: "#0B5E3C" },
                { val: null, label: "Sustainable Value", icon: Wrench, color: "#D9A11A" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-6 rounded-2xl border border-black/[0.06] bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: s.color + "14" }}
                    >
                      <Icon size={18} style={{ color: s.color }} />
                    </div>
                    <p
                      className="leading-none mb-1.5"
                      style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "1.9rem", color: s.color }}
                    >
                      {s.val ?? "—"}
                    </p>
                    <p
                      className="text-[#666666] uppercase tracking-[0.2em]"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}
                    >
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Alternating client advantage rows ── */}
      {PRIMARY_SERVICES.map((svc, i) => (
        <section
          key={svc.num}
          className={i % 2 === 0 ? "bg-[#F7F7F5] py-24" : "bg-white py-24"}
        >
          <div className="max-w-[1440px] mx-auto px-12 xl:px-20">
            <PrimaryServiceRow {...svc} />
          </div>
        </section>
      ))}

      {/* ── 3 Compact service cards (dark bg) ── */}
      <section className="bg-[#1B1B1B] py-36">
        <div className="max-w-[1440px] mx-auto px-12 xl:px-20">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="block w-7 h-px bg-[#D9A11A]" />
              <span
                className="text-[#D9A11A] text-[0.8125rem] tracking-[0.32em] uppercase font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Client Advantages
              </span>
              <span className="block w-7 h-px bg-[#D9A11A]" />
            </div>
            <h2
              className="font-normal leading-[1.1] text-white"
              style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "clamp(28px, 2.8vw, 38px)" }}
            >
              Professional Guidance,
              <br />
              <span className="italic">Lasting Value</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {COMPACT_SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group p-8 rounded-2xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#D9A11A]/30 transition-all duration-500 cursor-default"
                >
                  {/* Icon */}
                  <div className="w-13 h-13 rounded-2xl bg-[#D9A11A]/10 flex items-center justify-center mb-6 w-[52px] h-[52px] transition-colors duration-400 group-hover:bg-[#D9A11A]/20">
                    <Icon size={24} className="text-[#D9A11A]" />
                  </div>

                  {/* Gold dash */}
                  <span className="block w-5 h-px bg-[#D9A11A]/40 mb-5 group-hover:bg-[#D9A11A] transition-colors duration-400" />

                  {/* Title */}
                  <h3
                    className="text-white mb-4 leading-tight"
                    style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}
                  >
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-white/50 leading-relaxed mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}
                  >
                    {svc.desc}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2.5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#D9A11A] shrink-0" />
                        <span
                          className="text-white/45 text-[0.8rem] leading-snug group-hover:text-white/60 transition-colors duration-300"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {SHOW_PORTFOLIO_CTA && <section className="bg-white py-36">
        <div className="max-w-[1440px] mx-auto px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-[#0B5E3C]"
          >
            {/* BG texture */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?w=1600&h=600&fit=crop&auto=format&q=50)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Corner brackets */}
            <span className="absolute top-6 left-6 w-9 h-9 border-t-[2px] border-l-[2px] border-white/20 rounded-tl" />
            <span className="absolute top-6 right-6 w-9 h-9 border-t-[2px] border-r-[2px] border-white/20 rounded-tr" />
            <span className="absolute bottom-6 left-6 w-9 h-9 border-b-[2px] border-l-[2px] border-white/20 rounded-bl" />
            <span className="absolute bottom-6 right-6 w-9 h-9 border-b-[2px] border-r-[2px] border-white/20 rounded-br" />
            <div className="absolute right-0 top-0 w-[400px] h-full bg-gradient-to-l from-white/[0.04] to-transparent pointer-events-none" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-12 items-center px-12 xl:px-20 py-20">
              <div>
                <p
                  className="text-[#D9A11A] text-[0.8125rem] tracking-[0.32em] uppercase font-semibold mb-5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Partner with STARIA
                </p>
                <h2
                  className="font-normal leading-[1.1] text-white mb-5"
                  style={{ fontFamily: "'Gilda Display', Georgia, serif", fontSize: "clamp(28px, 2.8vw, 38px)" }}
                >
                  Let Us Manage Your
                  <br />
                  <span className="italic">Property Portfolio</span>
                </h2>
                <p
                  className="text-white/55 leading-[1.85] max-w-[480px]"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.97rem" }}
                >
                  Join property owners who trust STARIA to protect and
                  grow their real estate investments. Speak with our management
                  team today.
                </p>
              </div>

              <div className="flex flex-col gap-4 shrink-0">
                <motion.button
                  type="button"
                  onClick={() => setConsultationOpen(true)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="inline-flex items-center gap-3 px-9 py-4 bg-[#7A5600] hover:bg-[#7A5600] text-white font-semibold rounded-full transition-colors duration-300 shadow-xl shadow-black/20 whitespace-nowrap"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Book Free Consultation
                  <ArrowRight size={16} />
                </motion.button>
                <motion.a
                  href={`tel:${BD_PHONE_TEL}`}
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center justify-center gap-2.5 px-9 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Phone size={15} />
                  Call Our Team
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>}
      <ConsultationDialog key={String(consultationOpen)} open={consultationOpen} onOpenChange={setConsultationOpen} initialService="Property management" />

    </div>
  );
}
