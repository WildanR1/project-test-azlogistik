"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useProducts } from "@/hooks/useProducts";
import ProductFormModal from "./ProductFormModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

function TableProduct({ products }) {
  const { deleteProduct, isLoading } = useProducts();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.slug);
      toast.success(`Produk "${selectedProduct.title}" berhasil dihapus!`);
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Spinner className="size-8" />
        <p className="text-muted-foreground">Sedang memuat...</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3">No</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead className={"text-end"}>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product, idx) => (
              <TableRow key={product.slug || product.title + idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  Rp.{product.harga.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="w-20">{product.stok}</TableCell>
                <TableCell className="w-40">
                  <div className="flex justify-end items-center gap-3">
                    <Button
                      size={"icon"}
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-700"
                      size={"icon"}
                      onClick={() => handleDeleteClick(product)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Tidak ada produk ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <ProductFormModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        editData={selectedProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        productName={selectedProduct?.title}
      />
    </div>
  );
}

export default TableProduct;
