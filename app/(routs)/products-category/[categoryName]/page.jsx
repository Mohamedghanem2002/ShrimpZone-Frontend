import React from "react";
import ProductList from "@/app/_components/ProductList";
import TopCategoryList from "@/app/_components/TopCategoryList";
import Api from "@/app/_utils/Api";

export default async function ProductCategory({ params: paramsPromise }) {
  // await the params object before destructuring
  const { categoryName } = await paramsPromise;

  // now safe to fetch with the real string
  const productList = await Api.getProductByCategory(categoryName);
  const categoryList = await Api.getCategoryList();

  return (
    <div>
      <h2 className="bg-[#FF0000] text-white font-bold p-4 text-center text-2xl capitalize">
        {decodeURIComponent(categoryName)}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={categoryName}
      />
      <ProductList productList={productList} />
    </div>
  );
}
