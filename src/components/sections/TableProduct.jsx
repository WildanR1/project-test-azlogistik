"use client";
import React from "react";
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

function TableProduct({ products }) {
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
          {products.map((product, idx) => (
            <TableRow key={product.title + idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>Rp.{product.harga.toLocaleString("id-ID")}</TableCell>
              <TableCell className="w-20">{product.stok}</TableCell>
              <TableCell className="w-40">
                <div className="flex justify-end items-center gap-3">
                  <Button size={"icon"}>
                    <FaEdit />
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-700" size={"icon"}>
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableProduct;
