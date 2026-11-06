import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import { QuoteModal } from "./QuoteModal";

export const Layout: React.FC = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <NavBar onOpenQuote={() => setQuoteOpen(true)} />
      <main style={{ flex: 1 }}>
        <Outlet context={{ openQuote: () => setQuoteOpen(true) }} />
      </main>
      <Footer />
      <WhatsAppButton />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};

export default Layout;
