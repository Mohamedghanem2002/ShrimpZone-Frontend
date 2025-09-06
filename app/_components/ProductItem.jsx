"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductDetail from "./ProductDetail";

function ProductItem({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center p-2 md:p-6
        border rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition-all"
    >
      <div className="w-60 h-40 lg:h-64 mb-3 overflow-hidden rounded-md">
        <Image
          src={`http://localhost:1337${product?.image?.[0]?.url}`}
          alt="icon"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-[#FF0000] font-bold text-2xl">{product.name}</h2>

      <div className="flex gap-2 mb-5 mt-3">
        <h2 className="font-bold text-xl">{product.sellingPrice} $</h2>
        <del className="text-red-600 font-bold text-xl">
          {product.realPrice} $
        </del>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add To Cart</Button>
        </DialogTrigger>
        <DialogContent>
          <ProductDetail product={product} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
