"use client";

import { useProducts } from "@/hooks/useProducts";
import React from "react";
import CardProduct from "../atom/CardProduct";

function ProductGrid() {
  const { products } = useProducts();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
      {products.map((product, idx) => {
        return <CardProduct key={idx} title={product.title} />;
      })}
    </section>
  );
}

export default ProductGrid;
