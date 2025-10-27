"use client";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/ability");
      setData(res.data);
    };
    fetchData();
  }, [data]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Fetch List</h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam odit
          ratione ipsa consequatur itaque hic, aperiam praesentium autem.
          Perspiciatis, ratione!
        </p>
      </header>
      <section>
        {data?.results?.length > 0 ? (
          <>
            <Table>
              <TableCaption>A list of ability</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-5">No</TableHead>
                  <TableHead>Nama</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.results?.map((ability, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>{ability.name}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        ) : null}
      </section>
    </div>
  );
}

export default page;
