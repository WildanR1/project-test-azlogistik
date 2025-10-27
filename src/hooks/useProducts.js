import { create } from "zustand";

const createSlug = (nama) => {
  return nama
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .trim();
};

const initialProducts = [
  {
    title: "Product 1",
    slug: "product-1",
    harga: 100000,
    stok: 23,
  },
  {
    title: "Product 2",
    slug: "product-2",
    harga: 30000,
    stok: 24,
  },
  {
    title: "Product 3",
    slug: "product-3",
    harga: 60000,
    stok: 10,
  },
  {
    title: "Product 4",
    slug: "product-4",
    harga: 20000,
    stok: 20,
  },
];

export const useProducts = create((set, get) => ({
  products: initialProducts,
  addProduct: (productData) => {
    const slug = createSlug(productData.title);
    const isSlugExist = get().products.some((p) => p.slug === slug);
    if (slug) {
      alert("Error data product sudah ada");
      return;
    }
    set((state) => ({
      products: [...state.products, { ...productData, slug }],
    }));
  },
  updateProduct: (slug, updatedData) => {
    set((state) => {
      products: state.products.map((p) => {
        if (p.slug === slug) return p;
        let finalData = { ...p, ...updatedData };
      });
    });
  },
}));
