import React, { useState, useEffect } from "react";
import { Plus, Trash, Check } from "../../components/icons";
import { categoriesAPI } from "../../services/api";

interface CategoryDoc {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export const AdminCategories: React.FC = () => {
  const [categoriesList, setCategoriesList] = useState<CategoryDoc[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoriesAPI.getAll();
      setCategoriesList(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setError("");
    setSuccess("");
    try {
      const res = await categoriesAPI.create({
        name: newCatName.trim(),
        description: newCatDesc.trim(),
      });
      setCategoriesList((prev) => [...prev, res.data]);
      setNewCatName("");
      setNewCatDesc("");
      setSuccess("Category added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create category");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setError("");
      try {
        await categoriesAPI.delete(id);
        setCategoriesList((prev) => prev.filter((c) => c._id !== id));
        setSuccess("Category deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to delete category");
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginBottom: "4px" }}>
          Category Management
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
          Organize 3D models into navigable collections for clients.
        </p>
      </div>

      {success && (
        <div style={{ background: "#dcfce7", color: "#16a34a", padding: "12px 18px", borderRadius: "12px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
          <Check size={18} /> {success}
        </div>
      )}

      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px 18px", borderRadius: "12px", marginBottom: "24px", fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div className="row g-4">
        {/* Left: Add Category Form */}
        <div className="col-lg-4">
          <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #edf2f7",
            padding: "24px",
            boxShadow: "var(--card-shadow)",
          }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#071328", marginBottom: "16px" }}>
              Add New Category
            </h3>
            <form onSubmit={handleAddCategory}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Medical & Dental"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of models in this category..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
                />
              </div>

              <button type="submit" className="btn-primary-gradient w-100" style={{ justifyContent: "center" }}>
                <Plus size={16} /> Create Category
              </button>
            </form>
          </div>
        </div>

        {/* Right: Existing Categories List */}
        <div className="col-lg-8">
          <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #edf2f7",
            boxShadow: "var(--card-shadow)",
            overflow: "hidden",
          }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                Loading categories...
              </div>
            ) : categoriesList.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                No categories found. Add your first category using the form on the left.
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1.5px solid #edf2f7", color: "#64748b", textAlign: "left" }}>
                    <th style={{ padding: "14px 20px" }}>Category Name</th>
                    <th style={{ padding: "14px 16px" }}>URL Slug</th>
                    <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesList.map((c) => (
                    <tr key={c._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 700, color: "#0f172a" }}>{c.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{c.description || "—"}</div>
                      </td>
                      <td style={{ padding: "16px 16px", color: "#0084ff", fontSize: "0.85rem" }}>
                        /{c.slug}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          onClick={() => handleDelete(c._id)}
                          style={{ padding: "6px 8px", borderRadius: "6px", background: "#fee2e2", color: "#dc2626", border: "none", cursor: "pointer" }}
                          title="Delete category"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
