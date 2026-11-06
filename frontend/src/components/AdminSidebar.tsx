// src/components/AdminSidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", to: "/admin/dashboard", icon: "📊" },
  { name: "Products", to: "/admin/products", icon: "🛍️" },
  { name: "Categories", to: "/admin/categories", icon: "📁" },
  { name: "Inquiries", to: "/admin/inquiries", icon: "✉️" },
  { name: "Settings", to: "/admin/settings", icon: "⚙️" },
];

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-primary text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">3D Unity</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-accent transition-colors ${isActive ? "bg-accent" : ""}`
                }
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

