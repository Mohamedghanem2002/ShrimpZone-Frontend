import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CartItemList({ cartItemList, onCloseSheet, onRemoveItem }) {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach(
      (item) => {
        total = total + item.amount;
      },
      [cartItemList]
    );
    setSubTotal(total);
  });
  return (
    <div className="relative h-full pb-[120px]">
      <div className="max-h-[75vh] overflow-y-auto pr-2">
        {cartItemList.map((cart, index) => (
          <div key={index} className="flex justify-between items-center  ">
            <div className="flex items-center gap-4 mt-5 ">
              <Image
                src={`http://localhost:1337${cart?.image}`}
                width={70}
                height={70}
                alt={"icon"}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold"> {cart?.name} </h2>
                <h2 className="font-bold">Quantity: {cart?.quantity} </h2>
                <h2 className="font-bold">Amount {cart?.amount} </h2>
              </div>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => onRemoveItem(cart.id)}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 absolute w-[90%] bottom-0 flex flex-col">
        <h2 className="flex justify-between font-bold">
          SuubTotal <span>$ {subTotal.toFixed(2)}</span>{" "}
        </h2>
        <Link href="/checkout">
          <Button className={"mt-5"} onClick={onCloseSheet}>
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CartItemList;

CartItemList.jsx;
