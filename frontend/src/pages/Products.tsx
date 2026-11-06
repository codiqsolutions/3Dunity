import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Heart,
  Star,
  ArrowRight,
  Grid,
  List,
  Sliders,
  Search,
} from "../components/icons";
import { productsAPI, categoriesAPI } from "../services/api";

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
  badge?: "Bestseller" | "Customised" | "Popular" | "New" | string;
  shortDescription?: string;
  description?: string;
  images?: string[];
  materials?: string[];
  sizes?: string[];
  colours?: string[];
  customizationAvailable?: boolean;
  featured?: boolean;
}

interface CategoryDoc {
  _id: string;
  name: string;
  slug: string;
}

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";

  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [customizableOnly, setCustomizableOnly] = useState<boolean>(false);
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParam);

  const materialsList = ["PLA", "Resin", "PETG", "ABS", "Marble PLA"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
        setProducts(Array.isArray(prodRes.data) ? prodRes.data : []);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
      } catch (err) {
        console.error("Failed to load products/categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  const toggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedMaterials([]);
    setCustomizableOnly(false);
    setPriceMax(5000);
    setSearchTerm("");
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const catSlug = typeof p.category === "object" && p.category !== null ? p.category.slug : "";
      if (selectedCategory !== "all" && catSlug !== selectedCategory) {
        return false;
      }
      if (selectedMaterials.length > 0 && p.materials && !p.materials.some((m) => selectedMaterials.includes(m))) {
        return false;
      }
      if (customizableOnly && !p.customizationAvailable) {
        return false;
      }
      if (p.price && p.price > priceMax) {
        return false;
      }
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesDesc = (p.description || "").toLowerCase().includes(term);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
      return 0;
    });
  }, [products, selectedCategory, selectedMaterials, customizableOnly, priceMax, searchTerm, sortBy]);

  return (
    <div style={{ paddingBottom: "70px", paddingTop: "20px" }}>
      {/* Page Header */}
      <div className="unity-container" style={{ marginBottom: "30px" }}>
        <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "8px" }}>
          <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link> &gt; <span style={{ color: "#0f172a", fontWeight: 600 }}>Products</span>
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#071328", marginBottom: "8px" }}>
          Our Products
        </h1>
        <p style={{ color: "#64748b", fontSize: "1rem", margin: 0, maxWidth: "680px" }}>
          Explore our wide range of 3D printed products or create your own custom design with precision 3D printing.
        </p>
      </div>

      <div className="unity-container">
        {/* Mobile Filter Toggle Button */}
        <div className="d-lg-none mb-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="btn-secondary-outline w-100"
            style={{ justifyContent: "center" }}
          >
            <Sliders size={18} /> {mobileFilterOpen ? "Hide Filters" : "Filter Products"}
          </button>
        </div>

        <div className="row g-4">
          {/* LEFT SIDEBAR FILTERS */}
          <div className={`col-lg-3 ${mobileFilterOpen ? "d-block" : "d-none d-lg-block"}`}>
            <div style={{
              background: "#ffffff",
              border: "1px solid #edf2f7",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "var(--card-shadow)",
              position: "sticky",
              top: "96px",
            }}>
              {/* Search input in sidebar */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search catalogue..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 36px",
                      borderRadius: "10px",
                      border: "1.5px solid #e2e8f0",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                  />
                  <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "12px" }} />
                </div>
              </div>

              {/* Categories */}
              <div style={{ marginBottom: "24px" }}>
                <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#071328", marginBottom: "14px" }}>
                  Categories
                </h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.88rem",
                      color: selectedCategory === "all" ? "#0084ff" : "#475569",
                      fontWeight: selectedCategory === "all" ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "all"}
                        onChange={() => handleCategoryChange("all")}
                        style={{ accentColor: "#0084ff" }}
                      />
                      All Products
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>({products.length})</span>
                  </label>

                  {categories.map((cat) => (
                    <label
                      key={cat._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.88rem",
                        color: selectedCategory === cat.slug ? "#0084ff" : "#475569",
                        fontWeight: selectedCategory === cat.slug ? 700 : 500,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.slug}
                          onChange={() => handleCategoryChange(cat.slug)}
                          style={{ accentColor: "#0084ff" }}
                        />
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div style={{ marginBottom: "24px", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#071328", marginBottom: "14px" }}>
                  Material
                </h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {materialsList.map((mat) => (
                    <label key={mat} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "#475569", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        style={{ accentColor: "#0084ff" }}
                      />
                      {mat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div style={{ marginBottom: "24px", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#071328", margin: 0 }}>Price Range</h5>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0084ff" }}>Up to ₹{priceMax}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#0084ff" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94a3b8", marginTop: "4px" }}>
                  <span>₹200</span>
                  <span>₹5,000</span>
                </div>
              </div>

              {/* Customization Toggle */}
              <div style={{ marginBottom: "24px", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                <h5 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#071328", marginBottom: "14px" }}>
                  Customization
                </h5>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "#475569", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={customizableOnly}
                    onChange={(e) => setCustomizableOnly(e.target.checked)}
                    style={{ accentColor: "#0084ff" }}
                  />
                  Customizable Items Only
                </label>
              </div>

              {/* Reset Filters Button */}
              <button
                type="button"
                onClick={resetFilters}
                className="btn-secondary-outline w-100"
                style={{ fontSize: "0.85rem", padding: "8px" }}
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* RIGHT PRODUCT GRID */}
          <div className="col-lg-9">
            {/* Top Toolbar */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "24px",
              background: "#ffffff",
              padding: "12px 20px",
              borderRadius: "16px",
              border: "1px solid #edf2f7",
            }}>
              <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                Showing <strong style={{ color: "#0f172a" }}>{filteredProducts.length}</strong> products
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Sort By Dropdown */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.85rem",
                      background: "#ffffff",
                      color: "#0f172a",
                      outline: "none",
                    }}
                  >
                    <option value="featured">Latest / Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => setViewMode("grid")}
                    style={{
                      background: viewMode === "grid" ? "#0084ff" : "#f1f5f9",
                      color: viewMode === "grid" ? "#ffffff" : "#64748b",
                      border: "none",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    title="Grid View"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    style={{
                      background: viewMode === "list" ? "#0084ff" : "#f1f5f9",
                      color: viewMode === "list" ? "#ffffff" : "#64748b",
                      border: "none",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Rendering */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
                Loading live catalog from database...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #edf2f7",
              }}>
                <h4 style={{ color: "#071328", fontWeight: 700, marginBottom: "8px" }}>No products match your filters</h4>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>Try broadening your search term or resetting the filter options.</p>
                <button onClick={resetFilters} className="btn-primary-gradient">Reset Filters</button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
                {filteredProducts.map((p) => {
                  const img = p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/600x400?text=3D+Unity";
                  return (
                    <div key={p._id} className="col">
                      <div className="product-card">
                        {p.badge && (
                          <span className="badge-overlay badge-customised">
                            {p.badge}
                          </span>
                        )}
                        <button className="product-wishlist-btn" title="Add to wishlist">
                          <Heart size={16} />
                        </button>

                        <Link to={`/products/${p.slug}`} className="product-image-wrap">
                          <img src={img} alt={p.name} loading="lazy" />
                        </Link>

                        <div className="product-info">
                          <Link to={`/products/${p.slug}`} className="product-title">
                            {p.name}
                          </Link>
                          <div className="product-rating">
                            <Star size={14} />
                            <span style={{ fontWeight: 600, color: "#0f172a" }}>{p.rating || 4.8}</span>
                            <span>({p.reviewsCount || 12})</span>
                          </div>

                          <div className="product-bottom-row">
                            <div>
                              <span className="product-price">₹{(p.price || 0).toLocaleString("en-IN")}</span>
                              {p.originalPrice && (
                                <span style={{ fontSize: "0.8rem", color: "#94a3b8", textDecoration: "line-through", marginLeft: "6px" }}>
                                  ₹{p.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                            <Link to={`/products/${p.slug}`} className="product-action-btn" title="View details">
                              <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {filteredProducts.map((p) => {
                  const img = p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/600x400?text=3D+Unity";
                  const catName = typeof p.category === "object" && p.category !== null ? p.category.name : "3D Printed";
                  return (
                    <div key={p._id} style={{
                      background: "#ffffff",
                      borderRadius: "18px",
                      border: "1px solid #edf2f7",
                      padding: "16px",
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                      boxShadow: "var(--card-shadow)",
                    }}>
                      <div style={{ width: "140px", height: "130px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, background: "#f1f5f9" }}>
                        <img src={img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.8rem", color: "#0084ff", fontWeight: 600, textTransform: "uppercase" }}>{catName}</div>
                        <Link to={`/products/${p.slug}`} style={{ fontSize: "1.15rem", fontWeight: 700, color: "#071328", textDecoration: "none" }}>
                          {p.name}
                        </Link>
                        <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "6px 0 10px", lineHeight: 1.5 }}>
                          {p.shortDescription || p.description}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <span className="product-price">₹{(p.price || 0).toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                      <div>
                        <Link to={`/products/${p.slug}`} className="btn-primary-gradient" style={{ padding: "10px 20px" }}>
                          View Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
