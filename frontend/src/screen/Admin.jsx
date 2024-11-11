import React from "react";
import { Route, Routes } from "react-router-dom";
import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import Sidebar from "../components/Sidebar";

export default function Admin() {
  return (
      <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
        {/* Background */}
        <div className="fixed inset-0 z-0 flex">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
  )
}