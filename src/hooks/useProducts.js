import { create } from "zustand";

const createSlug = (title) => {
  return title
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
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  addProduct: async (productData) => {
    set({ isLoading: true });
    try {
      // Simulasi delay untuk melihat loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      const slug = createSlug(productData.title);
      const isSlugExist = get().products.some((p) => p.slug === slug);
      if (isSlugExist) {
        throw new Error("Produk dengan nama yang sama sudah ada");
      }
      set((state) => ({
        products: [...state.products, { ...productData, slug }],
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  updateProduct: async (slug, updatedData) => {
    set({ isLoading: true });
    try {
      // Simulasi delay untuk melihat loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (updatedData.title) {
        const newSlug = createSlug(updatedData.title);
        const isSlugExists = get().products.some(
          (prod) => prod.slug === newSlug && prod.slug !== slug
        );

        if (isSlugExists) {
          throw new Error(
            `Produk dengan nama "${updatedData.title}" sudah ada`
          );
        }
      }

      set((state) => ({
        products: state.products.map((p) => {
          if (p.slug !== slug) return p;

          let finalData = { ...p, ...updatedData };

          if (updatedData.title) {
            const newSlug = createSlug(updatedData.title);
            finalData.slug = newSlug;
          }

          return finalData;
        }),
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  deleteProduct: async (slug) => {
    set({ isLoading: true });
    try {
      // Simulasi delay untuk melihat loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => ({
        products: state.products.filter((p) => p.slug !== slug),
      }));
    } finally {
      set({ isLoading: false });
    }
  },
}));
