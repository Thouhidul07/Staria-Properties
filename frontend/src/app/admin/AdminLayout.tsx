import { useState } from "react";
import { BarChart3, Building2, ChevronRight, FileQuestion, FolderKanban, Home, LogOut, Mail, Menu, Newspaper, Settings, Star, Users, X } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { StariaLogo } from "../components/shared/StariaLogo";
import { useAdminAuth } from "./AdminAuth";

const navigation = [
  { label: "Dashboard", path: "/admin", icon: BarChart3, permission: "dashboard:read", end: true },
  { label: "Properties", path: "/admin/content/properties", icon: Building2, permission: "properties:read" },
  { label: "Projects", path: "/admin/content/projects", icon: FolderKanban, permission: "projects:read" },
  { label: "Services", path: "/admin/content/services", icon: Star, permission: "services:read" },
  { label: "News", path: "/admin/content/news", icon: Newspaper, permission: "blog:read" },
  { label: "FAQs", path: "/admin/content/faqs", icon: FileQuestion, permission: "content:read" },
  { label: "Testimonials", path: "/admin/content/testimonials", icon: Users, permission: "testimonials:read" },
  { label: "Enquiries", path: "/admin/enquiries", icon: Mail, permission: "inquiries:read" },
  { label: "Website settings", path: "/admin/content/website-settings", icon: Settings, permission: "settings:read" }
] as const;

export default function AdminLayout() {
  const { user, signOut, can } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const sidebar = (
    <>
      <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
        <StariaLogo light />
        <button className="lg:hidden text-white/70" onClick={() => setOpen(false)}><X size={20} /></button>
      </div>
      <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
        {navigation.filter((item) => can(item.permission)).map(({ label, path, icon: Icon, end }) => (
          <NavLink key={path} to={path} end={end} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${isActive ? "bg-[#D9A11A] text-[#1B1B1B] font-semibold" : "text-white/60 hover:bg-white/7 hover:text-white"}`}>
            <Icon size={17} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-white/55 hover:text-white text-sm"><Home size={17} /> View public website <ChevronRight size={14} className="ml-auto" /></Link>
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl text-sm"><LogOut size={17} /> Sign out</button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F5F6F3]">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-72 bg-[#082D1C] flex-col z-40">{sidebar}</aside>
      {open && <div className="lg:hidden fixed inset-0 z-50"><button aria-label="Close menu" className="absolute inset-0 bg-black/55" onClick={() => setOpen(false)} /><aside className="relative w-72 h-full bg-[#082D1C] flex flex-col">{sidebar}</aside></div>}
      <div className="lg:pl-72">
        <header className="h-20 bg-white border-b border-black/7 px-5 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <button className="lg:hidden p-2 text-[#333]" onClick={() => setOpen(true)}><Menu size={22} /></button>
          <div className="hidden lg:block"><p className="text-xs uppercase tracking-[.22em] text-[#777]">Staria administration</p></div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0B5E3C] text-white flex items-center justify-center font-semibold">{user?.name.charAt(0).toUpperCase()}</div>
            <div className="hidden sm:block"><p className="text-sm font-semibold text-[#222]">{user?.name}</p><p className="text-xs text-[#777]">{user?.roles.map((role) => role.name).join(", ")}</p></div>
          </div>
        </header>
        <main className="p-5 md:p-8 xl:p-10"><Outlet /></main>
      </div>
    </div>
  );
}
