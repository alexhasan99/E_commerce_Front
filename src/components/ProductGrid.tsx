"use client";

import { useEffect, useState } from "react";
import { Product } from "@/utils/interfaces/Product";
import fetchProducts from "@/utils/api/ProductFetcher";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ category, searchQuery }: { category?: string; searchQuery?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts
      .getProducts()
      .then((data) => {
        // Filtrera produkter baserat på kategori eller sökfråga
        let filteredProducts = data;
        if (category) {
          filteredProducts = data.filter((product) => product.category === category);
        }
        if (searchQuery) {
          filteredProducts = data.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, searchQuery]);

  useEffect(() => {
    fetchProducts
      .getProducts()
      .then((data) => {
        console.log("Fetched products:", data); 
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);
  

  if (loading) return <div>Laddar produkter...</div>;
  if (products.length === 0) return <div>Inga produkter hittades.</div>;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
