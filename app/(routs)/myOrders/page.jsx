"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Api from "@/app/_utils/Api";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderList from "./MyOrderList";

function MyOrders() {
  const [userId, setUserId] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [orderLists, setOrderLists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedJwt = sessionStorage.getItem("jwt");

    if (!storedJwt) {
      router.push("/sign-in");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUserId(parsedUser?.id);
    setJwt(storedJwt);
  }, []);

  useEffect(() => {
    if (userId && jwt) {
      getMyOrder();
    }
  }, [userId, jwt]);

  const getMyOrder = async () => {
    try {
      const orderList = await Api.myOrders(userId, jwt);
      console.log(orderList);
      setOrderLists(orderList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <h2 className="p-3 bg-[#FF0000] text-white text-xl font-bold text-center">
        My Orders
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="p-3 text-3xl font-bold text-primary">Order History</h2>
        <div>
          {orderLists.map((order, index) => (
            <Collapsible key={order.id || index}>
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex flex-evenly gap-20">
                  <h2>
                    <span className="font-bold mt-3">Order Date: </span>
                    {moment(order?.createdAt).format("DD-MM-YYYY")}
                  </h2>
                  <h2>
                    <span className="font-bold mt-3">Total Amount: </span>
                    {order?.totalOrderAmount}
                  </h2>
                  <h2>
                    <span className="font-bold mt-3">Status: </span>
                    PENDING
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {order.orderItemList.map((item, idx) => (
                  <MyOrderList key={idx} orderItem={item} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
