"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import Api from "../_utils/Api";
import { toast } from "sonner";
import { CartContext } from "../context/CartContext";

function ProductDetail({ product, onClose }) {
  const [productTotalPrice] = useState(
    product.sellingPrice ?? product.realPrice
  );
  const [quantity, setQuantity] = useState(1);

  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();
  const { updateCart, setUpdateCart } = useContext(CartContext);

  const addToCart = () => {
    if (!jwt) {
      router.push("/sign-in");
      return;
    }

    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };

    console.log("Sending data:", data);

    Api.addtoCart(data, jwt).then(
      (resp) => {
        console.log(resp);
        toast.success("Product added to cart successfully.");
        onClose();
        setUpdateCart(!updateCart);
        // router.push("/cart");
      },
      (e) => {
        console.error("Error adding to cart:", e);
        toast("Error while adding product to cart.");
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch gap-6 pt-3">
      {/* Image container */}
      <div className="relative w-full h-64 md:h-full">
        <Image
          src={`http://localhost:1337${product?.image?.[0]?.url}`}
          fill
          alt={product.name}
          className="object-cover rounded"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-4 p-3 items-center text-center md:items-start md:text-left">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>

        <div className="flex gap-3">
          <h2 className="font-bold text-xl">{product.sellingPrice} $</h2>
          <del className="text-red-600 text-xl">{product.realPrice} $</del>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex gap-3 border p-2 items-center">
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
              className="text-2xl cursor-pointer"
            >
              -
            </button>
            <span className="font-bold text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-2xl cursor-pointer"
            >
              +
            </button>
          </div>

          <h2 className="text-2xl font-bold">
            {(productTotalPrice * quantity).toFixed(2)}$
          </h2>

          <Button
            onClick={() => addToCart()}
            className="flex gap-2 items-center"
          >
            <ShoppingBasket /> Add To Cart
          </Button>
        </div>

        <p className="mt-4">
          <span className="font-bold text-[#ffcc00]">Category:&nbsp;</span>
          {product.categories[0]?.name}
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
