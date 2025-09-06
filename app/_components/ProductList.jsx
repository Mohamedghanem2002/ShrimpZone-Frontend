import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  return (
    <div className=" mb-10 px-16 text-center mt-30 ">
      <h2 className="font-bold  text-2xl lg:text-4xl text-[#FF0000]  mb-10 lg:mb-20">
        Popular Products
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            justify-items-center items-center mt-5 mb-20 gap-7"
      >
        {productList.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
