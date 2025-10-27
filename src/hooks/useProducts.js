import { create } from "zustand";

const initialProducts = [
  {
    title: "Product 1",
    harga: 100000,
    stok: 23,
  },
  {
    title: "Product 2",
    harga: 30000,
    stok: 24,
  },
  {
    title: "Product 3",
    harga: 60000,
    stok: 10,
  },
  {
    title: "Product 3",
    harga: 20000,
    stok: 20,
  },
];

export const useProducts = create((set) => ({
  products: initialProducts,
}));
