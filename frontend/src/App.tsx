<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Services from "./pages/Services";
import Process from "./pages/Process";
import Gallery from "./pages/Gallery/index";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Admin Suite
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddEditProduct from "./pages/admin/AdminAddEditProduct";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminSettings from "./pages/admin/AdminSettings";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Console Workspace — ProtectedRoute now renders AdminLayout internally */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AdminAddEditProduct />} />
            <Route path="products/edit/:id" element={<AdminAddEditProduct />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
=======
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Header } from './components/layout/Header';
import { CartDrawer } from './components/layout/CartDrawer';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServicesPage } from './pages/ServicesPage';

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <WishlistProvider>
        <CartProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Section 01: Top Utility Bar & Navigation Header */}
            <Header
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Main Content Area */}
            <div style={{ flex: 1 }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      isSearchOpen={isSearchOpen}
                      onCloseSearch={() => setIsSearchOpen(false)}
                    />
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProductsPage
                      isSearchOpen={isSearchOpen}
                      onCloseSearch={() => setIsSearchOpen(false)}
                    />
                  }
                />
                <Route
                  path="/products/:slug"
                  element={
                    <ProductDetailsPage
                      isSearchOpen={isSearchOpen}
                      onCloseSearch={() => setIsSearchOpen(false)}
                    />
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <GalleryPage
                      isSearchOpen={isSearchOpen}
                      onCloseSearch={() => setIsSearchOpen(false)}
                    />
                  }
                />
                <Route
                  path="/services"
                  element={
                    <ServicesPage
                      isSearchOpen={isSearchOpen}
                      onCloseSearch={() => setIsSearchOpen(false)}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            {/* Global Slide-Over Cart Drawer */}
            <CartDrawer />

            {/* Full Page Footer */}
            <Footer />
          </div>
        </CartProvider>
      </WishlistProvider>
>>>>>>> 735266e7bba39ee6bdb811daf2b5e51cf3598620
    </Router>
  );
};

export default App;
