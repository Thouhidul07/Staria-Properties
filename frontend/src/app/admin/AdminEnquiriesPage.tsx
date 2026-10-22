import { useEffect, useState } from "react";
import { Loader2, Mail, Phone, RefreshCw } from "lucide-react";
import { api, type ContactSubmission } from "../services/api";

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [downloading, setDownloading] = useState<string | null>(null);
  const downloadCv = async (id: string) => {
    setDownloading(id);
    try { await api.downloadApplicationCv(id); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "The CV could not be downloaded."); }
    finally { setDownloading(null); }
  };

  const load = async () => {
    setLoading(true);
    try {
      const response = await api.listContactSubmissions({ limit: 100 });
      setItems(response.items);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Enquiries could not be loaded.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  return <div>
    <div className="flex items-end justify-between gap-4 mb-8"><div><p className="text-xs uppercase tracking-[.24em] font-semibold text-[#0B5E3C] mb-2">Leads</p><h1 className="text-4xl text-[#1B1B1B]" style={{ fontFamily: "'Gilda Display', Georgia, serif" }}>Customer enquiries</h1></div><button onClick={load} className="px-4 py-2.5 rounded-xl bg-white border border-black/10 inline-flex items-center gap-2 text-sm font-semibold"><RefreshCw size={15} /> Refresh</button></div>
    {error && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4 mb-5">{error}</div>}
    {loading ? <div className="py-20 text-center text-[#666]"><Loader2 size={20} className="inline animate-spin mr-2" /> Loading enquiries…</div> :
      <div className="grid xl:grid-cols-2 gap-5">{items.map((item) => <article key={item.id} className="bg-white rounded-2xl border border-black/6 p-6">
        <div className="flex justify-between gap-4 mb-4"><div><h2 className="font-semibold text-[#222]">{item.fullName}</h2><p className="text-sm text-[#777] mt-1">{item.subject || "General website enquiry"}</p></div><span className="h-fit text-xs font-semibold rounded-full bg-blue-50 text-blue-700 px-2.5 py-1">{item.status}</span></div>
        {item.source === "employment-application" && <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">Employment application</span>}
        {item.source === "property-viewing" && <span className="mb-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">Property viewing request</span>}
        {item.source === "project-enquiry" && <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Project enquiry</span>}
        {item.source === "consultation" && <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">Consultation request</span>}
        {typeof item.createdAt === "string" && <p className="mb-3 text-xs text-[#777]">Received {new Date(item.createdAt).toLocaleString()}</p>}
        <p className="text-[#555] leading-7 text-sm mb-5 whitespace-pre-wrap break-words">{item.message.replace(/\[CV:[0-9a-f-]{36}\]/g, "").trim()}</p>
        {item.source === "employment-application" && /\[CV:[0-9a-f-]{36}\]/.test(item.message) && <button type="button" disabled={downloading === item.id} onClick={() => downloadCv(item.id)} className="mb-5 rounded-full bg-[#0B5E3C] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">{downloading === item.id ? "Downloading?" : "Download CV (PDF)"}</button>}
        <div className="border-t border-black/6 pt-4 flex flex-wrap gap-4 text-sm"><a href={`mailto:${item.email}`} className="inline-flex items-center gap-2 text-[#0B5E3C]"><Mail size={14} /> {item.email}</a>{typeof item.phone === "string" && <a href={`tel:${item.phone}`} className="inline-flex items-center gap-2 text-[#555]"><Phone size={14} /> {item.phone}</a>}</div>
      </article>)}{items.length === 0 && !error && <p className="py-10 text-[#666]">No enquiries yet. Submitted consultation requests will appear here.</p>}</div>}
  </div>;
}
