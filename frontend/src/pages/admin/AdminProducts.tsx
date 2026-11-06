import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash, Eye, Search } from "../../components/icons";
import { productsAPI, categoriesAPI } from "../../services/api";

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  category?: { _id: string; name: string; slug: string } | string;
  price?: number;
  materials?: string[];
  customizationAvailable?: boolean;
  images?: string[];
  status?: string;
}

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
}

export const AdminProducts: React.FC = () => {
  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [prodRes, catRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setProductsList(Array.isArray(prodRes.data) ? prodRes.data : []);
      setCategories(Array.isArray(catRes.data) ? catRes.data : []);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this product from the catalog?")) {
      try {
        await productsAPI.delete(id);
        setProductsList((prev) => prev.filter((p) => p._id !== id));
      } catch (err: any) {
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  const filtered = productsList.filter((p) => {
    const catSlug = typeof p.category === "object" && p.category !== null ? p.category.slug : "";
    const matchesCat = selectedCat === "all" || catSlug === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginBottom: "4px" }}>
            Product Catalog
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
            Manage 3D printed items, pricing, specs, and materials.
          </p>
        </div>

        <Link to="/admin/products/add" className="btn-primary-gradient" style={{ padding: "10px 22px" }}>
          <Plus size={16} /> Add New Product
        </Link>
      </div>

      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Filter toolbar */}
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #edf2f7",
        padding: "16px 20px",
        marginBottom: "24px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 36px",
              borderRadius: "10px",
              border: "1.5px solid #cbd5e1",
              fontSize: "0.88rem",
              outline: "none",
            }}
          />
          <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "12px" }} />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1.5px solid #cbd5e1",
            fontSize: "0.88rem",
            background: "#ffffff",
            outline: "none",
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #edf2f7",
        boxShadow: "var(--card-shadow)",
        overflow: "hidden",
      }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Loading products from database...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            No products found. Click "Add New Product" to add your first item.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #edf2f7", color: "#64748b", textAlign: "left" }}>
                  <th style={{ padding: "14px 20px" }}>Product</th>
                  <th style={{ padding: "14px 16px" }}>Category</th>
                  <th style={{ padding: "14px 16px" }}>Price</th>
                  <th style={{ padding: "14px 16px" }}>Customizable</th>
                  <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const catName = typeof p.category === "object" && p.category !== null ? p.category.name : "Uncategorized";
                  const primaryImg = p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/80x80?text=No+Image";
                  return (
                    <tr key={p._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <img
                            src={primaryImg}
                            alt={p.name}
                            style={{ width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover" }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: "#0f172a" }}>{p.name}</div>
                            <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Slug: /{p.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 16px", color: "#334155" }}>
                        {catName}
                      </td>
                      <td style={{ padding: "16px 16px", fontWeight: 700, color: "#0084ff" }}>
                        ₹{p.price ? p.price.toLocaleString("en-IN") : "0"}
                      </td>
                      <td style={{ padding: "16px 16px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: p.customizationAvailable ? "#dcfce7" : "#f1f5f9",
                          color: p.customizationAvailable ? "#16a34a" : "#64748b",
                        }}>
                          {p.customizationAvailable ? "Yes" : "Standard"}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px" }}>
                          <Link
                            to={`/products/${p.slug}`}
                            target="_blank"
                            style={{ padding: "6px 8px", borderRadius: "6px", background: "#f1f5f9", color: "#334155", display: "inline-flex" }}
                            title="View live"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/admin/products/edit/${p._id}`}
                            style={{ padding: "6px 8px", borderRadius: "6px", background: "#e0f2fe", color: "#0284c7", display: "inline-flex" }}
                            title="Edit product"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            style={{ padding: "6px 8px", borderRadius: "6px", background: "#fee2e2", color: "#dc2626", border: "none", cursor: "pointer", display: "inline-flex" }}
                            title="Delete product"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
