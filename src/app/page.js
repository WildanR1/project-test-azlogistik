import MainNav from "@/components/atom/MainNav";
import ProductGrid from "@/components/sections/ProductGrid";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Produk</h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam odit
          ratione ipsa consequatur itaque hic, aperiam praesentium autem.
          Perspiciatis, ratione!
        </p>
        <ProductGrid />
      </main>
    </>
  );
}
