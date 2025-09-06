"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import Api from "@/app/_utils/Api";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

function Checkout() {
  const [userId, setUserId] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const allAmount = () => {
    const calculateTotal = subTotal + 15 + subTotal * 0.09;
    return calculateTotal.toFixed(2);
  };

  const handlePayment = () => {
    if (!username || !email || !phone || !zip || !address) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (!jwt) {
      toast.error("Authentication token missing.");
      return;
    }

    const data = {
      data: {
        username,
        email,
        phone,
        zip,
        address,
        totalOrderAmount: Math.round(allAmount()),

        orderItemList: cartItemList.map((item) => ({
          quantity: item.quantity,
          amount: Math.round(item.amount),
          productId: item.productId,
        })),
      },
    };

    Api.createOrder(data, jwt)
      .then((resp) => {
        console.log(resp);
        toast.success("Order created successfully.");
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create order.");
      });
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const jwtToken = sessionStorage.getItem("jwt");
    if (user && jwtToken) {
      setUserId(user.id);
      setJwt(jwtToken);
    }
  }, []);

  useEffect(() => {
    if (userId && jwt) {
      getCartItems();
    }
  }, [userId, jwt]);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount;
    });
    setSubTotal(total);
    setTotalCartItem(cartItemList.length);
  }, [cartItemList]);

  const getCartItems = async () => {
    const cartItems = await Api.getCartItems(userId, jwt);
    setCartItemList(cartItems || []);
  };

  return (
    <div className="block">
      <h2 className="p-3 bg-[#FF0000] text-white text-xl font-bold text-center">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <Input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip"
            />
          </div>

          <div className="mt-3">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
        </div>

        <div className="mx-10 border mt-10">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>

          <div className="p-2 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subTotal.toFixed(2)}</span>
            </h2>

            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>${(subTotal * 0.09).toFixed(2)}</span>
            </h2>

            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${allAmount()}</span>
            </h2>

            {/* ربطنا زر الدفع بالدالة الجديدة */}
            <Button onClick={handlePayment}>
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
