const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<{ field: string; message: string }>;
};

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const json: ApiResponse<T> = await response.json();

  if (!response.ok || !json.success) {
    const errorMsg = json.errors?.[0]?.message || json.message || "API request failed";
    throw new Error(errorMsg);
  }

  return json.data;
}

export const api = {
  // Public Content APIs
  getProperties: (query = "") => request<any>(`/content/properties${query}`),
  getPropertyById: (id: string) => request<any>(`/content/properties/${id}`),
  getProjects: (query = "") => request<any>(`/content/projects${query}`),
  getProjectById: (id: string) => request<any>(`/content/projects/${id}`),
  getNews: (query = "") => request<any>(`/content/news${query}`),
  getNewsById: (id: string) => request<any>(`/content/news/${id}`),
  getFaqs: () => request<any>("/content/faqs"),
  getGallery: () => request<any>("/content/gallery"),
  getHeroSlides: () => request<any>("/content/hero-slides"),
  getCompanyStats: () => request<any>("/content/stats"),
  getSiteInfo: () => request<any>("/site"),

  // Form Submissions
  submitContact: (data: { fullName: string; email: string; phone?: string; subject?: string; message: string }) =>
    request<any>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  subscribeNewsletter: (email: string) =>
    request<any>("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  submitQuotation: (data: Record<string, unknown>) =>
    request<any>("/quotations", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
