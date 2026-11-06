import React, { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import {
  Star,
  Check,
  Heart,
  Truck,
  Box,
  Sliders,
  WhatsAppIcon,
  ArrowRight,
  Shield,
} from "../components/icons";
import { productsAPI } from "../services/api";

interface ProductDoc {
  _id: string;
  name: string;
  slug: string;
  category?: { _id: string; name: string; slug: string } | string;
  price?: number;
  originalPrice?: number;
  discount?: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  shortDescription?: string;
  description?: string;
  images?: string[];
  materials?: string[];
  material?: string;
  sizes?: string[];
  colours?: string[];
  customizationAvailable?: boolean;
}

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openQuote } = (useOutletContext<{ openQuote?: () => void }>() || {});

  const [product, setProduct] = useState<ProductDoc | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "custom" | "shipping">("desc");

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await productsAPI.getBySlug(slug);
        const p = res.data;
        setProduct(p);

        const imgs = Array.isArray(p.images) && p.images.length > 0 ? p.images : ["https://via.placeholder.com/600x400?text=3D+Unity"];
        setSelectedImage(imgs[0]);

        const cols = Array.isArray(p.colours) && p.colours.length > 0 ? p.colours : ["Default"];
        setSelectedColor(cols[0]);

        const szs = Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes : ["Standard"];
        setSelectedSize(szs[0]);

        // Load related
        const allRes = await productsAPI.getAll();
        if (Array.isArray(allRes.data)) {
          setRelatedProducts(allRes.data.filter((item: ProductDoc) => item.slug !== slug).slice(0, 5));
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleWhatsAppInquiry = () => {
    if (!product) return;
    const phone = "918866961005";
    const text = encodeURIComponent(
      `Hello 3D Unity! I would like to inquire/order:\n• Product: ${product.name}\n• Price: ₹${product.price}\n• Selected Color: ${selectedColor}\n• Selected Size: ${selectedSize}\n• Quantity: ${quantity}\n• URL: ${window.location.href}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", color: "#64748b" }}>
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Product Not Found</h2>
        <p style={{ color: "#64748b" }}>The 3D model you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="btn-primary-gradient" style={{ marginTop: "16px", display: "inline-block" }}>
          Browse Catalog
        </Link>
      </div>
    );
  }

  const catName = typeof product.category === "object" && product.category !== null ? product.category.name : "Products";
  const catSlug = typeof product.category === "object" && product.category !== null ? product.category.slug : "all";
  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : ["https://via.placeholder.com/600x400?text=3D+Unity"];
  const sizes = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ["Standard"];
  const colours = Array.isArray(product.colours) && product.colours.length > 0 ? product.colours : ["Default"];

  return (
    <div style={{ paddingBottom: "70px", paddingTop: "20px" }}>
      {/* Breadcrumb Navigation */}
      <div className="unity-container" style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
          <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link> &gt;{" "}
          <Link to="/products" style={{ color: "#64748b", textDecoration: "none" }}>Products</Link> &gt;{" "}
          <Link to={`/products?category=${catSlug}`} style={{ color: "#64748b", textDecoration: "none" }}>{catName}</Link> &gt;{" "}
          <span style={{ color: "#0f172a", fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div className="unity-container">
        <div className="row g-5">
          {/* LEFT: Image Gallery */}
          <div className="col-lg-6">
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", background: "#f1f5f9", height: "460px", marginBottom: "16px", boxShadow: "var(--card-shadow)" }}>
              {product.badge && (
                <span className="badge-overlay badge-bestseller" style={{ top: "16px", left: "16px" }}>
                  {product.badge}
                </span>
              )}
              <button className="product-wishlist-btn" style={{ top: "16px", right: "16px", width: "40px", height: "40px" }} title="Save to favorites">
                <Heart size={20} />
              </button>
              <img
                src={selectedImage}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Thumbnail selector */}
            <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: selectedImage === img ? "2.5px solid #0084ff" : "1.5px solid #e2e8f0",
                    background: "#f8fafc",
                    padding: 0,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info & Actions */}
          <div className="col-lg-6">
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#071328", marginBottom: "10px" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ display: "flex", color: "#f59e0b" }}>
                <Star size={18} />
              </div>
              <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>{product.rating || 4.8}</span>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>({product.reviewsCount || 15} Customer Reviews)</span>
            </div>

            {/* Price Row */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
              <span style={{ fontSize: "2.1rem", fontWeight: 800, color: "#0084ff" }}>
                ₹{(product.price || 0).toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: "1.2rem", color: "#94a3b8", textDecoration: "line-through" }}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.discount && (
                <span style={{ background: "#dcfce7", color: "#16a34a", fontWeight: 700, fontSize: "0.82rem", padding: "4px 10px", borderRadius: "9999px" }}>
                  {product.discount}
                </span>
              )}
            </div>

            <p style={{ color: "#475569", fontSize: "0.96rem", lineHeight: 1.6, marginBottom: "24px" }}>
              {product.shortDescription || product.description}
            </p>

            {/* 3 Features Pills */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "28px" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #edf2f7", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
                <Check size={18} color="#0084ff" />
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>High Precision</div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Printing</div>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #edf2f7", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
                <Shield size={18} color="#0084ff" />
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>Premium Material</div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{product.material || "Eco PLA"}</div>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #edf2f7", borderRadius: "12px", padding: "10px", textAlign: "center" }}>
                <Sliders size={18} color="#0084ff" />
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0f172a", marginTop: "4px" }}>Customizable</div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Available</div>
              </div>
            </div>

            {/* Colors */}
            {colours.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                  Available Colors: <span style={{ color: "#0084ff" }}>{selectedColor}</span>
                </label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {colours.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        border: selectedColor === c ? "2px solid #0084ff" : "1px solid #cbd5e1",
                        background: selectedColor === c ? "#f0f7ff" : "#ffffff",
                        color: selectedColor === c ? "#0084ff" : "#334155",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                  Select Size:
                </label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "10px",
                        border: selectedSize === s ? "2px solid #0084ff" : "1.5px solid #cbd5e1",
                        background: selectedSize === s ? "#f0f7ff" : "#ffffff",
                        color: selectedSize === s ? "#0084ff" : "#334155",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #cbd5e1", borderRadius: "10px", background: "#ffffff" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: "38px", height: "42px", background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#334155" }}
                >
                  -
                </button>
                <span style={{ width: "32px", textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: "38px", height: "42px", background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#334155" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleWhatsAppInquiry}
                className="btn-primary-gradient"
                style={{ flex: 1, padding: "12px 20px", background: "#25d366" }}
              >
                <WhatsAppIcon size={20} /> Order / Inquire on WhatsApp
              </button>
            </div>

            <button
              onClick={openQuote}
              className="btn-secondary-outline w-100"
              style={{ justifyContent: "center", padding: "12px" }}
            >
              Request Custom Version <ArrowRight size={16} />
            </button>

            {/* Production & Delivery notes */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e8f0", fontSize: "0.82rem", color: "#64748b" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Box size={16} color="#0084ff" /> Made to Order (3-5 days production)
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Truck size={16} color="#0084ff" /> All India Shipping (₹60)
              </span>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div style={{ marginTop: "60px", background: "#ffffff", borderRadius: "20px", border: "1px solid #edf2f7", padding: "30px", boxShadow: "var(--card-shadow)" }}>
          <div style={{ display: "flex", gap: "10px", borderBottom: "1.5px solid #e2e8f0", paddingBottom: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveTab("desc")}
              style={{
                background: "none",
                border: "none",
                fontWeight: activeTab === "desc" ? 700 : 500,
                color: activeTab === "desc" ? "#0084ff" : "#64748b",
                borderBottom: activeTab === "desc" ? "2.5px solid #0084ff" : "none",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              style={{
                background: "none",
                border: "none",
                fontWeight: activeTab === "specs" ? 700 : 500,
                color: activeTab === "specs" ? "#0084ff" : "#64748b",
                borderBottom: activeTab === "specs" ? "2.5px solid #0084ff" : "none",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              style={{
                background: "none",
                border: "none",
                fontWeight: activeTab === "custom" ? 700 : 500,
                color: activeTab === "custom" ? "#0084ff" : "#64748b",
                borderBottom: activeTab === "custom" ? "2.5px solid #0084ff" : "none",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              Customization Options
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              style={{
                background: "none",
                border: "none",
                fontWeight: activeTab === "shipping" ? 700 : 500,
                color: activeTab === "shipping" ? "#0084ff" : "#64748b",
                borderBottom: activeTab === "shipping" ? "2.5px solid #0084ff" : "none",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              Shipping & Returns
            </button>
          </div>

          {activeTab === "desc" && (
            <div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "12px" }}>About this Creation</h4>
              <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "0.95rem" }}>
                {product.description || product.shortDescription || "Precision manufactured at our workshop in Surat."}
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div style={{ maxWidth: "680px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 0", color: "#64748b", width: "40%" }}>Material</td>
                    <td style={{ padding: "10px 0", color: "#0f172a", fontWeight: 600 }}>{product.material || "High-Grade PLA"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 0", color: "#64748b" }}>Technology</td>
                    <td style={{ padding: "10px 0", color: "#0f172a", fontWeight: 600 }}>FDM / SLA Precision 3D Printing</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 0", color: "#64748b" }}>Customization</td>
                    <td style={{ padding: "10px 0", color: "#0f172a", fontWeight: 600 }}>{product.customizationAvailable ? "Available on Request" : "Standard Model"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "custom" && (
            <div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>Personalization & Bespoke Sizing</h4>
              <p style={{ color: "#475569", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Need a specific size, personalized embossed text, or custom color scheme? We can adapt this 3D model for your exact requirements.
              </p>
              <button onClick={openQuote} className="btn-primary-gradient" style={{ marginTop: "10px" }}>
                Discuss Customization with Designer
              </button>
            </div>
          )}

          {activeTab === "shipping" && (
            <div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>Packaging & Delivery</h4>
              <p style={{ color: "#475569", lineHeight: 1.6, fontSize: "0.95rem" }}>
                Orders are dispatched from our Surat workshop via tracked couriers (Delhivery, BlueDart, DTDC). Standard delivery takes 3-5 business days across India.
              </p>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <div className="section-header">
              <div>
                <h2 className="section-title">You May Also Like</h2>
                <p className="section-subtitle">Explore more amazing 3D printed creations.</p>
              </div>
              <Link to="/products" className="view-all-link">
                View All Products <ArrowRight size={16} />
              </Link>
            </div>

            <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
              {relatedProducts.map((p) => {
                const img = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/600x400?text=3D+Unity";
                return (
                  <div key={p._id} className="col">
                    <div className="product-card">
                      <Link to={`/products/${p.slug}`} className="product-image-wrap">
                        <img src={img} alt={p.name} loading="lazy" />
                      </Link>
                      <div className="product-info">
                        <Link to={`/products/${p.slug}`} className="product-title">{p.name}</Link>
                        <div className="product-bottom-row">
                          <span className="product-price">₹{(p.price || 0).toLocaleString("en-IN")}</span>
                          <Link to={`/products/${p.slug}`} className="product-action-btn"><ArrowRight size={16} /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
