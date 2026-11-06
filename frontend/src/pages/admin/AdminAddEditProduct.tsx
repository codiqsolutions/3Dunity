import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowRight, Check } from "../../components/icons";
import { productsAPI, categoriesAPI, uploadAPI } from "../../services/api";

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

export const AdminAddEditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    price: 999,
    shortDescription: "",
    description: "",
    images: [] as string[],
    materials: "PLA, PETG",
    sizes: "Standard",
    colours: "White, Black",
    customizationAvailable: true,
    featured: false,
    status: "active",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoriesAPI.getAll();
        const data = Array.isArray(res.data) ? res.data : [];
        setCategories(data);
        if (data.length > 0 && !formData.category) {
          setFormData((prev) => ({ ...prev, category: data[0]._id }));
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (isEditMode && id) {
      const loadProduct = async () => {
        setFetching(true);
        try {
          const res = await productsAPI.getById(id);
          const p = res.data;
          setFormData({
            name: p.name || "",
            slug: p.slug || "",
            category: typeof p.category === "object" && p.category !== null ? p.category._id : p.category || "",
            price: p.price ?? 999,
            shortDescription: p.shortDescription || "",
            description: p.description || "",
            images: Array.isArray(p.images) ? p.images : [],
            materials: Array.isArray(p.materials) ? p.materials.join(", ") : (p.material || "PLA, PETG"),
            sizes: Array.isArray(p.sizes) ? p.sizes.join(", ") : "Standard",
            colours: Array.isArray(p.colours) ? p.colours.join(", ") : "White, Black",
            customizationAvailable: p.customizationAvailable ?? true,
            featured: p.featured ?? false,
            status: p.status || "active",
          });
        } catch (err: any) {
          setError(err.response?.data?.message || "Failed to load product data");
        } finally {
          setFetching(false);
        }
      };
      loadProduct();
    }
  }, [id, isEditMode]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setFormData((prev) => ({ ...prev, name, slug: isEditMode ? prev.slug : slug }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    try {
      const res = await uploadAPI.upload(file, "3dunity/products");
      const url = res.data?.data?.url || res.data?.url;
      if (url) {
        setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
      }
    } catch (err: any) {
      setUploadError(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      setError("Please select or create a category first");
      return;
    }
    setLoading(true);
    setError("");

    const payload = {
      ...formData,
      sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colours: formData.colours.split(",").map((c) => c.trim()).filter(Boolean),
      material: formData.materials,
    };

    try {
      if (isEditMode && id) {
        await productsAPI.update(id, payload);
      } else {
        await productsAPI.create(payload);
      }
      setSaved(true);
      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
        Loading product details...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "840px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link to="/admin/products" style={{ color: "#64748b", fontSize: "0.88rem", textDecoration: "none" }}>
          &larr; Back to Products
        </Link>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginTop: "8px" }}>
          {isEditMode ? "Edit Product" : "Add New 3D Product"}
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
          Manage catalog entry with cloud images, pricing, materials and dynamic specs.
        </p>
      </div>

      {saved && (
        <div style={{ background: "#dcfce7", color: "#16a34a", padding: "14px 20px", borderRadius: "12px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px", fontWeight: 700 }}>
          <Check size={20} /> Product {isEditMode ? "updated" : "created"} successfully! Redirecting...
        </div>
      )}

      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "14px 20px", borderRadius: "12px", marginBottom: "24px", fontWeight: 600 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #edf2f7",
        padding: "32px",
        boxShadow: "var(--card-shadow)",
      }}>
        {/* Name & Slug */}
        <div className="row g-3" style={{ marginBottom: "20px" }}>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g., Voronoi Geometric Vase"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="voronoi-geometric-vase"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Category & Status */}
        <div className="row g-3" style={{ marginBottom: "20px" }}>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem", background: "#ffffff" }}
            >
              <option value="">Select a Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem", background: "#ffffff" }}
            >
              <option value="active">Active (Visible)</option>
              <option value="inactive">Inactive (Hidden)</option>
            </select>
          </div>
        </div>

        {/* Price & Featured */}
        <div className="row g-3" style={{ marginBottom: "20px" }}>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Sale Price (INR ₹) *
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Customization & Highlighting
            </label>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.customizationAvailable}
                  onChange={(e) => setFormData({ ...formData, customizationAvailable: e.target.checked })}
                />
                Customizable
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                Featured on Home
              </label>
            </div>
          </div>
        </div>

        {/* Short & Full Description */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
            Short Summary
          </label>
          <input
            type="text"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="One-line summary for cards and search snippets"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
            Full Technical Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed features, layer specs, design aesthetics, dimensions..."
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
          />
        </div>

        {/* Materials, Sizes, Colours */}
        <div className="row g-3" style={{ marginBottom: "20px" }}>
          <div className="col-md-4">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Materials (comma separated)
            </label>
            <input
              type="text"
              value={formData.materials}
              onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
              placeholder="PLA, PETG, Resin"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <div className="col-md-4">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Sizes (comma separated)
            </label>
            <input
              type="text"
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              placeholder="Small, Medium, Large"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <div className="col-md-4">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Colors (comma separated)
            </label>
            <input
              type="text"
              value={formData.colours}
              onChange={(e) => setFormData({ ...formData, colours: e.target.value })}
              placeholder="White, Black, Gold"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Cloudinary / Direct Image Upload */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
            Product Images
          </label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
            {formData.images.map((imgUrl, idx) => (
              <div key={idx} style={{ position: "relative", width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <img src={imgUrl} alt="Product preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    background: "rgba(220, 38, 38, 0.8)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ fontSize: "0.85rem" }}
            />
            {uploading && <span style={{ fontSize: "0.85rem", color: "#0084ff" }}>Uploading to Cloudinary...</span>}
          </div>
          {uploadError && <div style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "4px" }}>{uploadError}</div>}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "14px" }}>
          <button type="submit" disabled={loading} className="btn-primary-gradient" style={{ padding: "12px 28px" }}>
            {loading ? "Saving..." : isEditMode ? "Update Product" : "Save Product to Catalog"} <ArrowRight size={16} />
          </button>
          <Link to="/admin/products" className="btn-secondary-outline" style={{ padding: "12px 24px" }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminAddEditProduct;
