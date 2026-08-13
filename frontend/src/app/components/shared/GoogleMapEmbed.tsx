interface GoogleMapEmbedProps {
  query: string;
  title: string;
  zoom?: number;
}

export function GoogleMapEmbed({ query, title, zoom = 15 }: GoogleMapEmbedProps) {
  const apiKey = String(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "").trim();
  const useEmbedApi = String(import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_ENABLED || "false") === "true";

  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    zoom: String(zoom),
    maptype: "roadmap"
  });
  const fallbackParams = new URLSearchParams({
    q: query,
    z: String(zoom),
    output: "embed"
  });
  const apiEmbedUrl = `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
  const publicEmbedUrl = `https://www.google.com/maps?${fallbackParams.toString()}`;

  return (
    <iframe
      title={title}
      src={apiKey && useEmbedApi ? apiEmbedUrl : publicEmbedUrl}
      className="absolute inset-0 h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
