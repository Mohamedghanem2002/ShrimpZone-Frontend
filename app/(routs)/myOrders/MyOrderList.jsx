import React from "react";
import Image from "next/image";

function MyOrderList({ orderItem }) {
  console.log(orderItem);
  return (
    <div>
      <Image
        src={`http://localhost:1337${orderItem?.product?.image[0].url}`}
        width={70}
        height={70}
        alt="icon"
      />
      <div>
        <h2> {orderItem?.product?.name} </h2>
      </div>
    </div>
  );
}

export default MyOrderList;
