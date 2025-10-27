"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Nama produk wajib diisi")
    .min(3, "Nama produk minimal 3 karakter"),
  harga: Yup.number()
    .required("Harga wajib diisi")
    .min(1, "Harga minimal 1")
    .typeError("Harga harus berupa angka"),
  stok: Yup.number()
    .required("Stok wajib diisi")
    .min(0, "Stok minimal 0")
    .typeError("Stok harus berupa angka"),
});

function ProductFormModal({ open, onOpenChange, editData = null }) {
  const { addProduct, updateProduct } = useProducts();
  const isEdit = !!editData;

  const formik = useFormik({
    initialValues: {
      title: editData?.title || "",
      harga: editData?.harga || "",
      stok: editData?.stok || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        if (isEdit) {
          await updateProduct(editData.slug, {
            title: values.title,
            harga: parseInt(values.harga),
            stok: parseInt(values.stok),
          });
          toast.success("Produk berhasil diupdate!");
        } else {
          await addProduct({
            title: values.title,
            harga: parseInt(values.harga),
            stok: parseInt(values.stok),
          });
          toast.success("Produk berhasil ditambahkan!");
        }
        resetForm();
        onOpenChange(false);
      } catch (error) {
        toast.error(error.message || "Terjadi kesalahan!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah informasi produk di bawah ini"
              : "Isi form di bawah ini untuk menambahkan produk baru"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Nama Produk</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Masukkan nama produk"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.title && formik.errors.title
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-sm text-red-500">{formik.errors.title}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="harga">Harga</Label>
              <Input
                id="harga"
                name="harga"
                type="number"
                placeholder="Masukkan harga produk"
                value={formik.values.harga}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.harga && formik.errors.harga
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.harga && formik.errors.harga && (
                <p className="text-sm text-red-500">{formik.errors.harga}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stok">Stok</Label>
              <Input
                id="stok"
                name="stok"
                type="number"
                placeholder="Masukkan jumlah stok"
                value={formik.values.stok}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.stok && formik.errors.stok
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.stok && formik.errors.stok && (
                <p className="text-sm text-red-500">{formik.errors.stok}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductFormModal;
