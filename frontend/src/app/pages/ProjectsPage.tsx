import { useState } from "react";
import { PageHero } from "../components/shared/PageHero";
import { DevelopmentProjectCard } from "../components/DevelopmentProjectCard";
import { DEVELOPMENT_PROJECTS } from "../services/developmentProjects";

const PROJECT_FILTERS = ["All", "Ongoing", "Completed", "Proposed"] as const;

export default function ProjectsPage() {
  const [filter, setFilter] = useState<typeof PROJECT_FILTERS[number]>("All");
  const projects = DEVELOPMENT_PROJECTS.filter((project) => filter === "All" || project.status === filter);

  return (
    <>
      <PageHero eyebrow="Projects & Portfolio" title="Our Development" titleItalic="Projects" subtitle="Explore our ongoing and completed work, alongside proposed developments." image="/images/projects/after-047.webp" imageAlt="Completed BAF Ops office interior" />
      <section className="bg-[#F7F7F5] py-20 md:py-28" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 xl:px-20">
          <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#0B5E3C]">Our Portfolio</p>
              <h2 className="text-4xl text-[#1B1B1B]" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>Featured <span className="italic">Projects</span></h2>
            </div>
            <div role="group" aria-label="Filter projects by status" className="flex flex-wrap gap-2">
              {PROJECT_FILTERS.map((status) => <button key={status} type="button" aria-pressed={filter === status} onClick={() => setFilter(status)} className={`min-h-11 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${filter === status ? "border-[#0B5E3C] bg-[#0B5E3C] text-white" : "border-black/10 bg-white text-[#555555] hover:border-[#0B5E3C]/30 hover:text-[#0B5E3C]"}`}>{status}</button>)}
            </div>
          </div>
          <div key={filter} className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => <DevelopmentProjectCard key={project.slug} project={project} index={index} />)}
          </div>
        </div>
      </section>
    </>
  );
}
