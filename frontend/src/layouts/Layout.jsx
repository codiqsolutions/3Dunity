// src/layouts/Layout.jsx
import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="container mx-auto py-6">{children}</main>
      <Footer />
      <WhatsAppButton message="Hello! I would like to inquire about your 3D printing services." />
    </>
  );
};

export default Layout;

