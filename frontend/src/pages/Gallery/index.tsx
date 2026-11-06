import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  X,
  Box,
  Heart,
  Sparkles,
  Layers,
  Sliders,
} from "../../components/icons";
import { productsAPI, categoriesAPI } from "../../services/api";

interface GalleryDoc {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

interface CategoryDoc {
  _id: string;
  name: string;
  slug: string;
}

export const Gallery: React.FC = () => {
  const { openQuote } = (useOutletContext<{ openQuote?: () => void }>() || {});
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeModalItem, setActiveModalItem] = useState<GalleryDoc | null>(null);

  const [items, setItems] = useState<GalleryDoc[]>([]);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
        const productsList = Array.isArray(prodRes.data) ? prodRes.data : [];
        const catsList = Array.isArray(catRes.data) ? catRes.data : [];

        setCategories(catsList);

        const mapped: GalleryDoc[] = [];
        productsList.forEach((p: any) => {
          const catName = typeof p.category === "object" && p.category !== null ? p.category.name : "3D Creation";
          const imgs = Array.isArray(p.images) && p.images.length > 0 ? p.images : ["https://via.placeholder.com/600x400?text=3D+Unity"];
          imgs.forEach((img: string, idx: number) => {
            mapped.push({
              id: `${p._id}-${idx}`,
              title: p.name + (imgs.length > 1 ? ` (Angle ${idx + 1})` : ""),
              category: catName,
              image: img,
              description: p.shortDescription || p.description,
            });
          });
        });
        setItems(mapped);
      } catch (err) {
        console.error("Failed to load gallery items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("decor")) return <Box size={16} />;
    if (lower.includes("toy") || lower.includes("figure")) return <Sparkles size={16} />;
    if (lower.includes("arch")) return <Layers size={16} />;
    if (lower.includes("engineer")) return <Sliders size={16} />;
    if (lower.includes("gift")) return <Heart size={16} />;
    return <Box size={16} />;
  };

  const filteredItems = selectedFilter === "all"
    ? items
    : items.filter((item) => item.category.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div style={{ paddingBottom: "70px", paddingTop: "20px" }}>
      {/* Header */}
      <div className="unity-container" style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="hero-badge">OUR CREATIVE REPERTOIRE</span>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#071328", marginBottom: "12px" }}>
          Our <span className="text-gradient">Gallery</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto" }}>
          Explore our collection of 3D printed creations directly from our live catalog.
        </p>

        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "32px",
        }}>
          <button
            onClick={() => setSelectedFilter("all")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "9999px",
              border: selectedFilter === "all" ? "none" : "1.5px solid #cbd5e1",
              background: selectedFilter === "all" ? "var(--brand-gradient)" : "#ffffff",
              color: selectedFilter === "all" ? "#ffffff" : "#334155",
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            <Box size={16} /> All Creations
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setSelectedFilter(c.name)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "9999px",
                border: selectedFilter.toLowerCase() === c.name.toLowerCase() ? "none" : "1.5px solid #cbd5e1",
                background: selectedFilter.toLowerCase() === c.name.toLowerCase() ? "var(--brand-gradient)" : "#ffffff",
                color: selectedFilter.toLowerCase() === c.name.toLowerCase() ? "#ffffff" : "#334155",
                fontWeight: 600,
                fontSize: "0.88rem",
                cursor: "pointer",
              }}
            >
              {getCategoryIcon(c.name)} {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Photo Grid */}
      <div className="unity-container">
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
            Loading dynamic creations from database...
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#ffffff", borderRadius: "20px", border: "1px solid #edf2f7" }}>
            <h4 style={{ color: "#071328", fontWeight: 700 }}>No gallery items in this category yet</h4>
            <p style={{ color: "#64748b" }}>Add products to this category in the Admin Console to feature them here.</p>
          </div>
        ) : (
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="col">
                <div
                  onClick={() => setActiveModalItem(item)}
                  style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "var(--card-shadow)",
                    border: "1px solid #edf2f7",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  className="gallery-item-card"
                >
                  <div style={{ width: "100%", height: "240px", position: "relative", background: "#f1f5f9" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(0, 0, 0, 0.5)",
                      backdropFilter: "blur(4px)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Eye size={18} />
                    </div>
                  </div>

                  <div style={{ padding: "16px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0084ff", textTransform: "uppercase" }}>
                      {item.category}
                    </span>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#071328", marginTop: "4px", marginBottom: 0 }}>
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Idea Banner */}
      <div className="unity-container" style={{ marginTop: "60px" }}>
        <div className="custom-cta-banner">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px" }}>
                Have a Custom Idea?
              </h3>
              <p style={{ color: "#e0f2fe", fontSize: "1rem", margin: "0 0 16px" }}>
                Let's turn it into a stunning 3D printed reality. Share your sketch, photo or file.
              </p>
              <button
                onClick={openQuote}
                className="btn-secondary-outline"
                style={{ background: "#ffffff", color: "#0284c7", fontWeight: 700, border: "none" }}
              >
                Get a Custom Quote <ArrowRight size={16} />
              </button>
            </div>
            <div className="col-lg-4 d-none d-lg-block text-end">
              <div style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Box size={70} color="#ffffff" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Item Detail Modal */}
      {activeModalItem && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(6px)",
          zIndex: 3000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "24px",
            maxWidth: "680px",
            width: "100%",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            position: "relative",
          }}>
            <button
              onClick={() => setActiveModalItem(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              <X size={20} />
            </button>

            <img
              src={activeModalItem.image}
              alt={activeModalItem.title}
              style={{ width: "100%", height: "360px", objectFit: "cover" }}
            />

            <div style={{ padding: "24px 30px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0084ff", textTransform: "uppercase" }}>
                {activeModalItem.category}
              </span>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#071328", marginTop: "4px", marginBottom: "8px" }}>
                {activeModalItem.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "20px" }}>
                {activeModalItem.description || "Precision engineered and finished at the 3D Unity studio in Surat, Gujarat."}
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    if (openQuote) openQuote();
                  }}
                  className="btn-primary-gradient"
                >
                  Order Similar Creation <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="btn-secondary-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
