/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mail,
  X,
  Maximize2,
  Download,
  User,
  Phone,
  Building2,
  CheckCircle,
  Loader2,
  Tag,
  Layers,
  FileText,
} from "lucide-react";
import Loading from "./Loading";
import { supabase } from "../lib/supabase";

const BRAND = {
  primary: "#6b0f0f",
  hover: "#4f0b0b",
  border: "rgba(107,15,15,0.08)",
};

/** Normalize many possible YouTube URL shapes to an embed URL. */
const getYouTubeEmbedUrl = (input?: string) => {
  if (!input) return "";
  const s = input.trim();
  if (s.includes("youtube.com/embed/")) {
    const m = s.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : s;
  }
  let m = s.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
  m = s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
  m = s.match(/\/(?:v|vi|embed)\/([a-zA-Z0-9_-]{11})/);
  if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
  if (/^[a-zA-Z0-9_-]{11}$/.test(s))
    return `https://www.youtube.com/embed/${s}`;
  return "";
};

// ─── Shared types ────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Shared form logic hook ───────────────────────────────────────────────────

function useEnquiryForm(onSubmit: (form: FormData) => Promise<void>) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", company: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email";
    }
    if (!form.phone.trim()) {
      e.phone = "Phone is required";
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
      e.phone = "Enter a valid phone number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      await onSubmit(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (field: keyof FormData) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: ev.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return { form, errors, status, handleSubmit, handleChange };
}

// ─── Shared modal shell ───────────────────────────────────────────────────────

function ModalShell({
  onClose,
  eyebrow,
  title,
  meta,
  children,
}: {
  onClose: () => void;
  eyebrow: string;
  title: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Red top stripe */}
        <div className="h-[3px] w-full bg-red-600" />

        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold text-red-600 tracking-[0.2em] uppercase mb-2 font-primary">
                {eyebrow}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 leading-snug font-primary">
                {title}
              </h2>
              {meta && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5">
                  {meta}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

// ─── Shared form fields ───────────────────────────────────────────────────────

function FormFields({
  form,
  errors,
  status,
  handleSubmit,
  handleChange,
  submitLabel,
  successTitle,
  successBody,
  onClose,
}: {
  form: FormData;
  errors: FormErrors;
  status: SubmitStatus;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitLabel: string;
  successTitle: string;
  successBody: React.ReactNode;
  onClose: () => void;
}) {
  const inputClass = (error?: string) =>
    `w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-white border outline-none
     transition-colors duration-150 placeholder:text-gray-400 font-primary
     ${error ? "border-red-400 focus:border-red-600" : "border-gray-200 focus:border-gray-800"}`;

  if (status === "success") {
    return (
      <div className="px-8 py-14 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-red-50 flex items-center justify-center mb-5">
          <CheckCircle className="w-7 h-7 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-primary">{successTitle}</h3>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-primary">{successBody}</p>
        <button
          onClick={onClose}
          className="mt-8 px-8 py-3 bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors font-primary"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="px-8 py-7">
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange("name")}
              className={inputClass(errors.name)}
            />
          </div>
          {errors.name && <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange("email")}
              className={inputClass(errors.email)}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange("phone")}
              className={inputClass(errors.phone)}
            />
          </div>
          {errors.phone && <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.phone}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
            Company{" "}
            <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Your company name"
              value={form.company}
              onChange={handleChange("company")}
              className={inputClass()}
            />
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="mt-5 px-4 py-3 bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-primary">
            Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-60
                   text-white text-sm font-semibold transition-colors font-primary
                   flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting…
          </>
        ) : (
          submitLabel
        )}
      </button>

      <p className="mt-4 text-center text-xs text-gray-400 font-primary">
        Our team will reach out to you shortly.
      </p>
    </form>
  );
}

// ─── Product Enquiry Modal ────────────────────────────────────────────────────

function ProductEnquiryModal({
  productName,
  segment,
  subcategory,
  onClose,
}: {
  productName: string;
  segment: string;
  subcategory: string;
  onClose: () => void;
}) {
  const { form, errors, status, handleSubmit, handleChange } = useEnquiryForm(
    async (formData) => {
      const res = await fetch("/api/product-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product_name: productName,
          product_subcategory: subcategory,
          product_segment: segment,
        }),
      });
      if (!res.ok) throw new Error("Failed");
    }
  );

  return (
    <ModalShell
      onClose={onClose}
      eyebrow="Product Enquiry"
      title={productName}
      meta={
        <>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
            <Layers className="w-3.5 h-3.5 flex-shrink-0" />
            {segment}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
            <Tag className="w-3.5 h-3.5 flex-shrink-0" />
            {subcategory}
          </span>
        </>
      }
    >
      <FormFields
        form={form}
        errors={errors}
        status={status}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        submitLabel="Submit Enquiry"
        successTitle="Enquiry Submitted!"
        successBody={
          <>
            We've received your enquiry for{" "}
            <span className="font-medium text-gray-700">{productName}</span>.
            Our team will get back to you shortly.
          </>
        }
        onClose={onClose}
      />
    </ModalShell>
  );
}

// ─── Brochure Download Modal ──────────────────────────────────────────────────

function BrochureDownloadModal({
  productName,
  brochureUrl,
  onClose,
  onSuccess,
}: {
  productName: string;
  brochureUrl: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { form, errors, status, handleSubmit, handleChange } = useEnquiryForm(
    async (formData) => {
      const res = await fetch("/api/brochure-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product_name: productName,
        }),
      });
      if (!res.ok) throw new Error("Failed");

      // Trigger download after successful submission
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onSuccess();
    }
  );

  return (
    <ModalShell
      onClose={onClose}
      eyebrow="Download Brochure"
      title={productName}
      meta={
        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
          <FileText className="w-3.5 h-3.5 flex-shrink-0" />
          Product brochure — PDF
        </span>
      }
    >
      <FormFields
        form={form}
        errors={errors}
        status={status}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        submitLabel="Download Brochure"
        successTitle="Download Started!"
        successBody={
          <>
            Your brochure for{" "}
            <span className="font-medium text-gray-700">{productName}</span>{" "}
            should begin downloading. Check your downloads folder.
          </>
        }
        onClose={onClose}
      />
    </ModalShell>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Producttemplate(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rawProduct, setRawProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [previewIndex, setPreviewIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<"preview" | "gallery">("preview");
  const [modalIndex, setModalIndex] = useState(0);

  const [activeSection, setActiveSection] = useState<string>("description");
  const topRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const relatedScrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadAllowed, setDownloadAllowed] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data: prodData, error: prodError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (prodError || !prodData) {
          setRawProduct(null);
          setRelatedProducts([]);
          setLoading(false);
          return;
        }

        setRawProduct(prodData);

        const { data: related } = await supabase
          .from("products")
          .select("id, ProductName, Thumbnail_url, SubCategory, Segment")
          .eq("Segment", prodData.Segment)
          .eq("SubCategory", prodData.SubCategory)
          .neq("id", prodData.id);

        setRelatedProducts(related || []);
      } catch (err) {
        console.error("Fetch product error:", err);
        setRawProduct(null);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const product = useMemo(() => {
    const p = rawProduct;
    if (!p) return null;

    const thumbnailCandidates = [p.Thumbnail_url, p.ThumbnailURL, p.thumbnail_url, p.thumbnail, p.Thumbnail];
    const thumbnail = thumbnailCandidates.find(Boolean) || null;

    let samplesRaw = p.CuttingSamplesURL ?? p.Cutting_Samples_URL ?? p.cutting_samples_url ?? p.cuttingSamplesUrl ?? p.CuttingSamples ?? null;
    if (typeof samplesRaw === "string") { try { samplesRaw = JSON.parse(samplesRaw); } catch { /* keep */ } }

    let technicalRaw = p.TechnicalSpecifications ?? p.technical_specifications ?? p.technicalSpecifications ?? p.TechnicalSpecs ?? p.Technical_Specs ?? null;
    if (typeof technicalRaw === "string") { try { technicalRaw = JSON.parse(technicalRaw); } catch { /* keep */ } }

    let featuresRaw: string[] = [];
    if (Array.isArray(p.Features)) featuresRaw = p.Features;
    else if (typeof p.Features === "string") {
      const s = p.Features.trim();
      try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) featuresRaw = parsed.map(String);
        else featuresRaw = s.replace(/^\[|\]$/g, "").split(",").map((x: string) => x.trim()).filter(Boolean);
      } catch {
        featuresRaw = s.replace(/^\[|\]$/g, "").split(",").map((x: string) => x.trim()).filter(Boolean);
      }
    } else if (Array.isArray(p.features)) featuresRaw = p.features;
    else featuresRaw = [];

    const rawVideo = p.ProductVideoURL ?? p.product_video_url ?? p.youtube ?? p.youtube_url ?? p.video ?? null;

    return {
      __raw: p,
      id: p.id,
      segment: p.Segment ?? p.segment ?? "",
      subcategory: p.SubCategory ?? p.Subcategory ?? p.sub_category ?? p.SubCategory ?? "",
      name: (p.ProductName ?? p.product_name ?? p.name ?? "").toString(),
      shortDescription: (p.ShortDescription ?? p.short_description ?? p.Short_Description ?? p.shortDescription ?? "").toString(),
      descriptionRaw: p.Description ?? p.description ?? p.ProductDescription ?? p.product_description ?? null,
      features: featuresRaw,
      thumbnail,
      samplesRaw,
      technicalRaw,
      rawVideo,
      brochureUrl: p.bro_url ?? p.brochure_url ?? p.BrochureURL ?? null,
    };
  }, [rawProduct]);

  const galleryImages = useMemo(() => {
    const raw = rawProduct?.Thumbnail_url ?? rawProduct?.ThumbnailURL ?? rawProduct?.thumbnail_url ?? null;
    if (!raw) return [];
    try {
      if (typeof raw === "string") { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) return parsed.filter(Boolean); }
      if (Array.isArray(raw)) return raw.filter(Boolean);
    } catch {
      if (typeof raw === "string") return raw.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }, [rawProduct]);

  const previewImages = galleryImages.length > 0 ? galleryImages : product?.thumbnail ? [product.thumbnail] : [];

  const cuttingSamples = useMemo(() => {
    const raw = rawProduct?.CuttingSamplesURL ?? rawProduct?.Cutting_Samples_URL ?? rawProduct?.cutting_samples_url ?? rawProduct?.cuttingSamplesUrl ?? rawProduct?.CuttingSamples ?? null;
    if (!raw) return [];
    try {
      if (typeof raw === "string") { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) return parsed.filter(Boolean); }
      if (Array.isArray(raw)) return raw.filter(Boolean);
    } catch {
      if (typeof raw === "string") return raw.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }, [rawProduct]);

  const features = useMemo<string[]>(() => (Array.isArray(product?.features) ? product!.features : []), [product]);

  const technicalTable = useMemo(() => {
    const raw = product?.technicalRaw;
    if (!raw) return null;
    let parsed: any = raw;
    try { parsed = typeof raw === "string" ? JSON.parse(raw) : raw; } catch {}
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((item) => item && typeof item === "object" && !Array.isArray(item))) {
      const headers = Array.from(new Set(parsed.flatMap((o: any) => Object.keys(o))));
      const rows = parsed.map((obj: any) => headers.map((h: string) => { const v = obj[h]; if (Array.isArray(v)) return v.join(", "); if (v === null || v === undefined) return ""; return String(v); }));
      return { type: "matrix" as const, headers, rows };
    }
    if (Array.isArray(parsed)) { return { type: "kv" as const, rows: parsed.map((v: any, i: number) => [`Item ${i + 1}`, String(v)]) }; }
    if (parsed && typeof parsed === "object") { return { type: "kv" as const, rows: Object.entries(parsed).map(([k, v]) => [k.replace(/_/g, " "), Array.isArray(v) ? v.join(", ") : String(v ?? "")]) }; }
    return { type: "kv" as const, rows: [["Specification", String(parsed)]] };
  }, [product?.technicalRaw]);

  const descriptionSections: { title: string; content: string }[] = useMemo(() => {
    try {
      const raw = product?.descriptionRaw;
      if (!raw) return [];
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (!parsed || typeof parsed !== "object") return [];
      return Object.entries(parsed).filter(([_, v]) => v !== null && v !== undefined && String(v).trim() !== "").map(([key, val]) => ({ title: key, content: String(val) }));
    } catch { return []; }
  }, [product?.descriptionRaw]);

  const videoEmbed = useMemo(() => getYouTubeEmbedUrl(product?.rawVideo), [product?.rawVideo]);

  const tabs = useMemo(() => {
    const t: { id: string; label: string }[] = [];
    if (descriptionSections.length > 0) t.push({ id: "description", label: "Description" });
    if (technicalTable !== null) t.push({ id: "technical", label: "Technical Specification" });
    if (product?.rawVideo) t.push({ id: "video", label: "Video" });
    if (galleryImages.length > 0) t.push({ id: "samples", label: "Cutting Sample" });
    return t;
  }, [descriptionSections, technicalTable, product?.rawVideo, galleryImages.length]);

  const activeCount = useCallback(
    (source: "preview" | "gallery") => source === "preview" ? previewImages.length : galleryImages.length,
    [previewImages.length, galleryImages.length]
  );

  const prev = useCallback(() => {
    if (modalOpen) { const len = activeCount(modalSource); setModalIndex((s) => (len ? (s - 1 + len) % len : 0)); }
    else { const len = previewImages.length; setPreviewIndex((s) => (len ? (s - 1 + len) % len : 0)); }
  }, [modalOpen, modalSource, previewImages.length, galleryImages.length, activeCount]);

  const next = useCallback(() => {
    if (modalOpen) { const len = activeCount(modalSource); setModalIndex((s) => (len ? (s + 1) % len : 0)); }
    else { const len = previewImages.length; setPreviewIndex((s) => (len ? (s + 1) % len : 0)); }
  }, [modalOpen, modalSource, previewImages.length, galleryImages.length, activeCount]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 50) delta > 0 ? prev() : next();
  };

  const scrollRelated = (direction: "left" | "right") => {
    if (!relatedScrollRef.current) return;
    const el = relatedScrollRef.current;
    const scrollAmount = el.clientWidth * 0.7 || 240;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const el = sectionRefs.current[sectionId];
    if (el) { const offset = 140; const top = el.getBoundingClientRect().top + window.scrollY - offset; window.scrollTo({ top, behavior: "smooth" }); }
  };

  useLayoutEffect(() => {
    setPreviewIndex(0);
    setModalIndex(0);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    else if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === "Escape") setModalOpen(false);
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      } else {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, modalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      let currentSection = "description";
      Object.entries(sectionRefs.current).forEach(([sId, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) currentSection = sId;
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  if (loading) return <Loading text="product" />;

  if (product === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <X className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gray-900" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Product not found
          </h2>
          <p className="text-gray-600 mb-8 text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
            We couldn't find what you're looking for.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-md font-semibold text-gray-900"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <ArrowLeft className="w-5 h-5" /> Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Enhanced sidebar */}
      <aside className="hidden lg:block fixed left-6 top-28 z-50 max-h-[calc(100vh-7rem)]" aria-label="Related products">
        <div className="w-64 bg-white overflow-hidden text-sm text-gray-900 shadow-lg border border-gray-100 transition-shadow hover:shadow-xl" style={{ borderRadius: "2px" }}>
          <div className="h-14 flex items-center justify-between px-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <div className="text-xs font-bold tracking-wider text-whiteBgButtonBg" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {product.subcategory}
            </div>
          </div>

          <div className="px-4 py-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {relatedProducts.map((rp: any) => (
                <button
                  key={rp.id}
                  onClick={() => navigate(`/product/${rp.id}`)}
                  title={rp.ProductName}
                  className="group w-full text-left flex items-start gap-3 px-3 py-3 bg-white hover:bg-gray-50 transition-all duration-200 rounded-sm"
                >
                  <div style={{ minWidth: 8, height: 8, marginTop: 6, opacity: 0.6 }} className="group-hover:opacity-100 bg-whiteBgTextHover transition-opacity" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors" style={{ lineHeight: "1.3" }}>
                      {rp.ProductName}
                    </div>
                  </div>
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="px-4 py-4 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
            <button
              onClick={() => setShowEnquiryForm(true)}
              className="flex-1 py-3 px-4 text-[#060C2A] bg-opacity-20 bg-whiteBgButtonBg hover:bg-opacity-20 hover:bg-whiteBgButtonBg hover:text-[#060C2A] font-secondary font-semibold flex items-center justify-center gap-2 shadow-md transition-transform duration-200 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Quote
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Back to top"
              className="w-11 h-11 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-sm active:scale-95"
              style={{ borderRadius: "2px" }}
            >
              <ArrowLeft className="w-4 h-4 rotate-90 text-gray-700" />
            </button>
          </div>
        </div>
      </aside>

      <div ref={topRef} className="mx-auto px-5 sm:px-8 pt-24 sm:pt-32 pb-20 lg:ml-80 lg:pl-8 lg:pr-8 xl:pr-16" style={{ maxWidth: "1800px" }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm mb-8 text-gray-600">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-transparent hover:bg-transparent text-gray-500 hover:text-gray-900 transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium font-secondary">{product.name}</span>
        </div>

        {/* Hero section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 mb-16 items-start">
          {/* Product image gallery */}
          <div className="space-y-5 w-full max-w-full overflow-hidden">
            <div
              className="relative mx-auto border-2 bg-white flex items-center justify-center w-full max-w-[700px]"
              style={{ minHeight: "clamp(250px, 50vw, 400px)", borderColor: BRAND.border }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={() => { if (previewImages.length) { setModalSource("preview"); setModalIndex(previewIndex); setModalOpen(true); } }}
            >
              {previewImages[previewIndex] ? (
                <img
                  src={previewImages[previewIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  draggable={false}
                  style={{ background: "white", maxHeight: "clamp(250px, 50vw, 400px)", userSelect: "none" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <X className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No image available</p>
                </div>
              )}
              {previewImages.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="previous" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-sm border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg">
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="next" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-sm border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg">
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="w-full mx-auto overflow-x-auto overflow-y-hidden px-4" style={{ maxWidth: 700, scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
              <div className="flex gap-2 md:gap-3 min-w-0">
                <style >{`div::-webkit-scrollbar { display: none; }`}</style>
                {previewImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPreviewIndex(idx)}
                    style={{ borderWidth: 2, borderColor: idx === previewIndex ? "#6b0f0f" : "#e5e7eb" }}
                    className="flex-shrink-0 overflow-hidden transition-all bg-white w-20 h-16 md:w-[120px] md:h-[90px]"
                    aria-label={`Preview ${idx + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-fit" draggable={false} style={{ background: "white" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#060C2A] leading-tight mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-gray-700 text-xl leading-relaxed">{product.shortDescription}</p>
            </div>

            {features && features.length > 0 && (
              <div className="p-6 border border-gray-200 shadow-sm">
                <h3 className="text-sm uppercase text-gray-600 mb-4 font-bold tracking-wider">Key Features</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-800 group">
                      <span className="mt-1.5 w-2 h-2 bg-whiteBgButtonBg bg-opacity-50 flex-shrink-0 transition-transform group-hover:scale-125" />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {product.brochureUrl && (
                <button
                  onClick={() => {
                    if (downloadAllowed) {
                      window.open(product.brochureUrl, "_blank", "noopener,noreferrer");
                      return;
                    }
                    setShowDownloadDialog(true);
                  }}
                  className="flex-1 py-3 px-4 text-[#060C2A] bg-opacity-20 bg-whiteBgButtonBg hover:bg-opacity-20 hover:bg-whiteBgButtonBg hover:text-[#060C2A] font-secondary font-semibold flex items-center justify-center gap-2 shadow-md transition-transform duration-200 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download Brochure
                </button>
              )}

              <button
                onClick={() => setShowEnquiryForm(true)}
                className="flex-1 py-3 px-4 text-[#060C2A] bg-opacity-20 bg-whiteBgButtonBg hover:bg-opacity-20 hover:bg-whiteBgButtonBg hover:text-[#060C2A] font-secondary font-semibold flex items-center justify-center gap-2 shadow-md transition-transform duration-200 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Sticky section nav */}
        <div className="w-full bg-white/40 backdrop-blur-md border-y border-gray-200 z-30 mb-10 shadow-sm" style={{ position: "sticky", top: "80px" }}>
          <div className="flex justify-center">
            <div className="flex gap-8 overflow-x-auto py-4 px-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => scrollToSection(t.id)}
                  className={`text-sm bg-transparent hover:bg-transparent font-bold uppercase tracking-wider pb-2 transition-all whitespace-nowrap relative ${
                    activeSection === t.id ? "text-black" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t.label}
                  {activeSection === t.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full space-y-8">
          {descriptionSections.length > 0 && (
            <section ref={(el) => (sectionRefs.current["description"] = el || null)} data-section="description" id="description" className="bg-white border border-gray-200 shadow-sm">
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-4xl md:text-4xl font-medium text-gray-900 mb-2">Product Description</h2>
                <p className="text-gray-600">Comprehensive details about {product.name}</p>
              </div>
              <div className="p-8">
                <div className="space-y-8">
                  {descriptionSections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-black"></div>
                        <h3 className="text-2xl bg-gray-50 p-2 rounded-lg font-medium text-gray-900">{section.title}</h3>
                      </div>
                      <p className="text-black text-lg leading-relaxed pl-4 whitespace-pre-wrap">{section.content}</p>
                      {idx < descriptionSections.length - 1 && <div className="pt-6"><div className="w-full h-px bg-gray-100"></div></div>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {technicalTable && (
            <section ref={(el) => (sectionRefs.current["technical"] = el || null)} data-section="technical" id="technical" className="bg-white border border-gray-200 shadow-sm overflow-auto">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-4xl font-medium text-gray-900 mb-2">Technical Specifications</h2>
                <p className="text-gray-600">Detailed technical information</p>
              </div>
              <div className="p-8">
                {technicalTable.type === "matrix" ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-900 text-white">
                          <th className="py-4 px-5 text-left font-bold uppercase text-xs tracking-wider border border-gray-700">Specification</th>
                          {technicalTable.rows.map((_, idx) => (
                            <th key={idx} className="py-4 px-5 text-left font-semibold uppercase text-xs tracking-wider border border-gray-700">Option {idx + 1}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {technicalTable.headers.map((header, hIdx) => (
                          <tr key={hIdx} className={`${hIdx % 2 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}>
                            <td className="py-4 px-5 font-bold text-gray-800 uppercase text-xs tracking-wider border border-gray-200">{header.toString().replace(/_/g, " ")}</td>
                            {technicalTable.rows.map((row, rIdx) => (
                              <td key={rIdx} className="py-4 px-5 text-sm text-gray-900 whitespace-pre-wrap border border-gray-200">{row[hIdx]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : technicalTable.type === "kv" ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {technicalTable.rows.map(([k, v], i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 pr-8 align-top text-sm text-gray-700 uppercase tracking-wider font-bold" style={{ width: "40%" }}>{k}</td>
                            <td className="py-4 pl-8 text-sm font-semibold text-gray-900 whitespace-pre-wrap">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">Technical specifications are not available for this product.</p>
                )}
              </div>
            </section>
          )}

          {videoEmbed && (
            <section ref={(el) => (sectionRefs.current["video"] = el || null)} data-section="video" id="video" className="bg-white border border-gray-200 shadow-sm">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-4xl font-medium text-gray-900 mb-2">Product Video</h2>
                <p className="text-gray-600">Watch our product in action</p>
              </div>
              <div className="p-8">
                <div className="bg-black aspect-video overflow-hidden shadow-lg">
                  <iframe src={videoEmbed} title={`${product.name} Video`} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>
            </section>
          )}

          {cuttingSamples.length > 0 && (
            <section ref={(el) => (sectionRefs.current["samples"] = el || null)} data-section="samples" id="samples" className="bg-white border border-gray-200 shadow-sm">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-4xl font-medium text-gray-900 mb-2">Cutting Samples</h2>
                <p className="text-gray-600">View our sample gallery</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cuttingSamples.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => { setModalSource("samples"); setModalIndex(i); setModalOpen(true); }}
                      className="aspect-square bg-white hover:bg-white overflow-hidden border-2 border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all group relative"
                    >
                      <img src={src} alt={`${product.name} Cutting sample ${i + 1}`} className="w-full h-full object-cover transition-transform hover:bg-white duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile related products */}
      {relatedProducts && relatedProducts.length > 1 && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-sm mx-5 mb-8" style={{ borderRadius: "4px" }}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md uppercase text-gray-700 font-medium tracking-wider">Related Products</h3>
              <div className="flex gap-2">
                <button onClick={() => scrollRelated("left")} className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-sm" aria-label="scroll left" style={{ borderRadius: "4px" }}>
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={() => scrollRelated("right")} className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-sm" aria-label="scroll right" style={{ borderRadius: "4px" }}>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div ref={relatedScrollRef} className="flex gap-3 overflow-x-auto pb-2">
              {relatedProducts.filter((p: any) => p.id !== product.id).map((prod: any) => (
                <button key={prod.id} onClick={() => navigate(`/product/${prod.id}`)} className="flex-shrink-0 w-48 border border-gray-200 p-4 text-left bg-white hover:shadow-md transition-all hover:-translate-y-1" style={{ borderRadius: "4px" }}>
                  <div className="text-sm font-semibold text-gray-900 leading-snug">{prod.ProductName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image lightbox modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 border border-white/20" aria-label="close" style={{ borderRadius: "50%" }}>
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {modalSource === "samples" ? (
              <img src={cuttingSamples[modalIndex]} alt={`${product.name} cutting sample ${modalIndex + 1}`} className="w-full bg-white h-auto max-h-[85vh] object-cover shadow-2xl" />
            ) : (
              <img src={previewImages[modalIndex]} alt={`${product.name} preview ${modalIndex + 1}`} className="w-full bg-white h-auto max-h-[85vh] object-cover shadow-2xl" />
            )}
            {activeCount(modalSource) > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-black bg-white hover:bg-white/20 hover:text-white backdrop-blur-md transition-all hover:scale-110 border border-white/20" style={{ borderRadius: "50%" }}>
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white text-black hover:bg-white/20 hover:text-white backdrop-blur-md transition-all hover:scale-110 border border-white/20" style={{ borderRadius: "50%" }}>
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Brochure Download Modal */}
      {showDownloadDialog && product.brochureUrl && (
        <BrochureDownloadModal
          productName={product.name}
          brochureUrl={product.brochureUrl}
          onClose={() => setShowDownloadDialog(false)}
          onSuccess={() => {
            setShowDownloadDialog(false);
            setDownloadAllowed(true);
          }}
        />
      )}

      {/* Product Enquiry Modal */}
      {showEnquiryForm && (
        <ProductEnquiryModal
          productName={product.name}
          segment={product.segment}
          subcategory={product.subcategory}
          onClose={() => setShowEnquiryForm(false)}
        />
      )}
    </div>
  );
}

export default Producttemplate;