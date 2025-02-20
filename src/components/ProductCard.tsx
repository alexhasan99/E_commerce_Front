"use client";

import { Product } from "@/utils/interfaces/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <img
        alt={product.title}
        src={product.image}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
      />
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-sm text-gray-500">{product.descr}</p>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price} SEK</p>
    </div>
  );
}
