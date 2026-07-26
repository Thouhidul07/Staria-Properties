import { useEffect, useMemo, useState } from "react";
import { Archive, Check, ChevronLeft, ChevronRight, Edit3, Loader2, Plus, RefreshCw, Search, Send, X } from "lucide-react";
import { useParams } from "react-router";
import { api, type CmsRecord } from "../services/api";
import { useAdminAuth } from "./AdminAuth";

type FieldDefinition = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select" | "json";
  options?: string[];
  required?: boolean;
};
type ResourceDefinition = {
  label: string;
  permission: string;
  fields: FieldDefinition[];
  create?: boolean;
  createDefaults?: Record<string, unknown>;
};

const resources: Record<string, ResourceDefinition> = {
  properties: {
    label: "Properties",
    permission: "properties",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "shortDescription", label: "Short description", type: "textarea" },
      { key: "description", label: "Full description", type: "textarea" },
      { key: "priceLabel", label: "Display price" },
      { key: "price", label: "Numeric price", type: "number" },
      { key: "bedrooms", label: "Bedrooms", type: "number" },
      { key: "bathrooms", label: "Bathrooms", type: "number" },
      { key: "areaSqft", label: "Area (sqft)", type: "number" },
      { key: "availability", label: "Availability", type: "select", options: ["AVAILABLE", "RESERVED", "SOLD", "RENTED", "UPCOMING"] },
      { key: "isFeatured", label: "Featured property", type: "checkbox" }
    ]
  },
  projects: {
    label: "Projects",
    permission: "projects",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "developmentStatus", label: "Development status", type: "select", options: ["UPCOMING", "ONGOING", "COMPLETED", "ON_HOLD"] },
      { key: "completionPercent", label: "Completion percent", type: "number" },
      { key: "isFeatured", label: "Featured project", type: "checkbox" }
    ]
  },
  services: {
    label: "Services",
    permission: "services",
    create: true,
    createDefaults: { status: "DRAFT", isFeatured: false },
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "summary", label: "Summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "icon", label: "Icon name" },
      { key: "isFeatured", label: "Featured service", type: "checkbox" }
    ]
  },
  news: {
    label: "News",
    permission: "blog",
    create: true,
    createDefaults: { status: "DRAFT", isFeatured: false },
    fields: [
      { key: "title", label: "Headline", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "body", label: "Article body", type: "textarea", required: true },
      { key: "isFeatured", label: "Featured article", type: "checkbox" }
    ]
  },
  faqs: {
    label: "FAQs",
    permission: "content",
    create: true,
    createDefaults: { status: "DRAFT", isFeatured: false },
    fields: [
      { key: "question", label: "Question", required: true },
      { key: "answer", label: "Answer", type: "textarea", required: true },
      { key: "group", label: "Group" },
      { key: "isFeatured", label: "Featured FAQ", type: "checkbox" }
    ]
  },
  testimonials: {
    label: "Testimonials",
    permission: "testimonials",
    fields: [
      { key: "quote", label: "Quote", type: "textarea", required: true },
      { key: "rating", label: "Rating", type: "number" },
      { key: "isFeatured", label: "Featured testimonial", type: "checkbox" }
    ]
  },
  "website-settings": {
    label: "Website settings",
    permission: "settings",
    create: true,
    createDefaults: { status: "PUBLISHED" },
    fields: [
      { key: "group", label: "Group", required: true },
      { key: "key", label: "Setting key", required: true },
      { key: "value", label: "Value", type: "json" }
    ]
  }
};

function recordName(record: CmsRecord) {
  return record.title ?? record.name ?? record.question ?? record.label ?? record.email ?? record.id;
}

export default function AdminResourcePage() {
  const { resource = "properties" } = useParams();
  const definition = resources[resource] ?? resources.properties;
  const { can } = useAdminAuth();
  const [items, setItems] = useState<CmsRecord[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<CmsRecord | "new" | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.listCms(resource, { page, limit: 12, search });
      setItems(response.items);
      setTotalPages(Math.max(1, response.meta.totalPages));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Records could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [resource, page]);

  const openEditor = (record: CmsRecord | "new") => {
    setEditing(record);
    setError(null);
    const source = record === "new" ? definition.createDefaults ?? {} : record;
    const selected = Object.fromEntries(definition.fields.map((field) => [field.key, source[field.key] ?? (field.type === "checkbox" ? false : "")]));
    setForm({ ...definition.createDefaults, ...selected });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = Object.fromEntries(
        definition.fields.map((field) => {
          const value = form[field.key];
          if (field.type === "number") return [field.key, value === "" ? null : Number(value)];
          if (field.type === "json" && typeof value === "string") {
            try {
              return [field.key, JSON.parse(value)];
            } catch {
              return [field.key, value];
            }
          }
          return [field.key, value === "" ? null : value];
        })
      );
      if (editing === "new") await api.createCms(resource, { ...definition.createDefaults, ...payload });
      else if (editing) await api.updateCms(resource, editing.id, payload);
      setEditing(null);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The record could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const transition = async (record: CmsRecord, action: "publish" | "draft") => {
    setError(null);
    try {
      await api.transitionCms(resource, record.id, action);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Could not ${action} record.`);
    }
  };

  const remove = async (record: CmsRecord) => {
    if (!window.confirm(`Archive “${recordName(record)}”?`)) return;
    try {
      await api.deleteCms(resource, record.id);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not archive record.");
    }
  };

  const canCreate = definition.create && can(`${definition.permission}:create`);
  const canUpdate = can(`${definition.permission}:update`);
  const canDelete = can(`${definition.permission}:delete`);
  const header = useMemo(() => `${definition.label} management`, [definition.label]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
        <div><p className="text-xs uppercase tracking-[.24em] font-semibold text-[#0B5E3C] mb-2">Content</p><h1 className="text-4xl text-[#1B1B1B]" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>{header}</h1></div>
        <div className="flex gap-2">
          <button onClick={load} className="px-4 py-2.5 rounded-xl border border-black/10 bg-white inline-flex items-center gap-2 text-sm font-semibold"><RefreshCw size={15} /> Refresh</button>
          {canCreate && <button onClick={() => openEditor("new")} className="px-4 py-2.5 rounded-xl bg-[#0B5E3C] text-white inline-flex items-center gap-2 text-sm font-semibold"><Plus size={16} /> Add new</button>}
        </div>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); setPage(1); load(); }} className="bg-white rounded-2xl border border-black/6 p-3 flex gap-3 mb-5">
        <span className="relative flex-1"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl bg-[#F5F6F3] pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0B5E3C]/20" placeholder={`Search ${definition.label.toLowerCase()}…`} /></span>
        <button className="px-5 rounded-xl bg-[#1B1B1B] text-white text-sm font-semibold">Search</button>
      </form>

      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4 mb-5">{error}</div>}
      <div className="bg-white rounded-2xl border border-black/6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-[#F7F7F5] text-left"><tr><th className="px-5 py-4 text-xs uppercase tracking-wider text-[#777]">Record</th><th className="px-5 py-4 text-xs uppercase tracking-wider text-[#777]">Status</th><th className="px-5 py-4 text-xs uppercase tracking-wider text-[#777]">Data type</th><th className="px-5 py-4 text-xs uppercase tracking-wider text-[#777] text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-black/6">
              {loading ? <tr><td colSpan={4} className="py-16 text-center text-[#666]"><Loader2 className="animate-spin inline mr-2" size={18} /> Loading records…</td></tr> :
                items.length === 0 ? <tr><td colSpan={4} className="py-16 text-center text-[#777]">No records found.</td></tr> :
                items.map((record) => (
                  <tr key={record.id} className="hover:bg-[#FAFAF8]">
                    <td className="px-5 py-4"><p className="font-semibold text-[#222]">{recordName(record)}</p><p className="text-xs text-[#888] mt-1">{record.id}</p></td>
                    <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${record.status === "PUBLISHED" || record.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{record.status ?? "—"}</span></td>
                    <td className="px-5 py-4"><span className={`text-xs font-semibold ${record.isDemo ? "text-[#7A5600]" : "text-[#0B5E3C]"}`}>{record.isDemo ? "Demo" : "Real"}</span></td>
                    <td className="px-5 py-4"><div className="flex justify-end gap-1">
                      {canUpdate && <button title="Edit" onClick={() => openEditor(record)} className="p-2 rounded-lg hover:bg-black/5 text-[#444]"><Edit3 size={16} /></button>}
                      {canUpdate && record.status !== "PUBLISHED" && <button title="Publish" onClick={() => transition(record, "publish")} className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-700"><Send size={16} /></button>}
                      {canUpdate && record.status === "PUBLISHED" && <button title="Move to draft" onClick={() => transition(record, "draft")} className="p-2 rounded-lg hover:bg-amber-50 text-amber-700"><Archive size={16} /></button>}
                      {canDelete && <button title="Archive record" onClick={() => remove(record)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><X size={17} /></button>}
                    </div></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-black/6 px-5 py-4 flex items-center justify-between text-sm text-[#666]">
          <span>Page {page} of {totalPages}</span><div className="flex gap-2"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="p-2 border border-black/10 rounded-lg disabled:opacity-35"><ChevronLeft size={16} /></button><button disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)} className="p-2 border border-black/10 rounded-lg disabled:opacity-35"><ChevronRight size={16} /></button></div>
        </div>
      </div>

      {editing && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><button aria-label="Close editor" onClick={() => setEditing(null)} className="absolute inset-0 bg-black/55 backdrop-blur-sm" /><div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-black/7 px-6 py-5 flex items-center justify-between z-10"><div><p className="text-xs uppercase tracking-[.2em] text-[#0B5E3C] font-semibold">{editing === "new" ? "Create" : "Edit"}</p><h2 className="text-2xl mt-1" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>{definition.label}</h2></div><button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-black/5"><X size={20} /></button></div>
        <form onSubmit={submit} className="p-6 space-y-5">
          {definition.fields.map((field) => field.type === "checkbox" ? (
            <label key={field.key} className="flex items-center gap-3 rounded-xl bg-[#F7F7F5] px-4 py-3"><input type="checkbox" checked={Boolean(form[field.key])} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.checked }))} className="w-4 h-4 accent-[#0B5E3C]" /><span className="font-semibold text-sm">{field.label}</span></label>
          ) : (
            <label key={field.key} className="block"><span className="block text-sm font-semibold text-[#333] mb-2">{field.label}{field.required && " *"}</span>
              {field.type === "textarea" ? <textarea required={field.required} rows={field.key === "body" || field.key === "description" ? 7 : 4} value={String(form[field.key] ?? "")} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#0B5E3C]" /> :
                field.type === "select" ? <select value={String(form[field.key] ?? "")} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} className="w-full rounded-xl border border-black/10 px-4 py-3 bg-white outline-none focus:border-[#0B5E3C]">{field.options?.map((option) => <option key={option}>{option}</option>)}</select> :
                  <input required={field.required} type={field.type === "number" ? "number" : "text"} step={field.type === "number" ? "any" : undefined} value={field.type === "json" && typeof form[field.key] === "object" ? JSON.stringify(form[field.key]) : String(form[field.key] ?? "")} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#0B5E3C]" />}
            </label>
          ))}
          <div className="pt-3 flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="px-5 py-3 rounded-xl border border-black/10 font-semibold text-sm">Cancel</button><button disabled={saving} className="px-6 py-3 rounded-xl bg-[#0B5E3C] text-white font-semibold text-sm inline-flex items-center gap-2 disabled:opacity-60">{saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save changes</button></div>
        </form>
      </div></div>}
    </div>
  );
}
