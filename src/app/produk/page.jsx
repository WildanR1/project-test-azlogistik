"use client";
import TableProduct from "@/components/sections/TableProduct";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaSort, FaPlus } from "react-icons/fa";
import ProductFormModal from "@/components/sections/ProductFormModal";
import { Toaster } from "sonner";

function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("harga-terendah");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { products } = useProducts();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const displayProduct = useMemo(() => {
    let filteredProduct = [...products];
    if (debouncedSearch) {
      filteredProduct = filteredProduct.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    if (sort === "harga-tertinggi") {
      filteredProduct = filteredProduct.sort((a, b) => b.harga - a.harga);
    } else if (sort === "harga-terendah") {
      filteredProduct = filteredProduct.sort((a, b) => a.harga - b.harga);
    }
    return filteredProduct || [];
  }, [products, debouncedSearch, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors />
      <header className="mb-3">
        <h1 className="text-3xl font-bold mb-2">Produk</h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam odit
          ratione ipsa consequatur itaque hic, aperiam praesentium autem.
          Perspiciatis, ratione!
        </p>
      </header>
      <section className="">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 mb-4">
          <div>
            <Input
              type={"text"}
              name="search"
              placeholder="Cari nama produk"
              className={"min-w-sm"}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-sm sm:w-fit flex items-center gap-2 justify-center"
                >
                  <FaSort />
                  Urutkan
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="harga-terendah">
                    Harga Terendah
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="harga-tertinggi">
                    Harga Tertinggi
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-2"
            >
              <FaPlus />
              <span className="hidden sm:inline">Tambah Produk</span>
            </Button>
          </div>
        </div>
        <TableProduct products={displayProduct} />
      </section>

      {/* Add Product Modal */}
      <ProductFormModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
}

export default page;
