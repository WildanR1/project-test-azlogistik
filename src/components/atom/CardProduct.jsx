import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function CardProduct({ title }) {
  const harga = 100000;
  return (
    <Card className={"group cursor-pointer"}>
      <CardHeader>
        <Image
          src={"/product/microwave.png"}
          width={200}
          height={200}
          alt={`Gambar ${title}`}
          className="mx-auto group-hover:scale-110"
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-semibold line-clamp-1 group-hover:opacity-90 duration-700 transition ease-in">
          {title}
        </h2>
      </CardContent>
      <CardFooter>
        <p className="text-red-500">Rp. {harga.toLocaleString("id-ID")}</p>
      </CardFooter>
    </Card>
  );
}

export default CardProduct;
