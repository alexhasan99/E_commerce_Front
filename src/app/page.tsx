"use client";

import ProductCard from "@/components/ProductCard";
import "./globals.css";
import ProductGrid from "@/components/ProductGrid";
export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Alla Produkter</h1>
        <ProductGrid />
      </div>
    </div>
  );
}
