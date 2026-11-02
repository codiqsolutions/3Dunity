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
    </Router>
  );
};

export default App;
