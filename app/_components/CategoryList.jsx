"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Api from "../_utils/Api";
import Link from "next/link";

function CategoryList({ categoryList }) {
  return (
    <div className=" mt-20 lg:mt-30 mb-20   text-center">
      <h2 className="font-bold text-2xl  md:text-4xl text-[#FF0000] mb-20">
        Shop By Category
      </h2>

      <div
        className="grid grid-cols-2   sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5
        justify-items-center items-center mt-5 gap-9 "
      >
        {categoryList?.map((category, index) => (
          <Link
            href={"/products-category/" + category.name}
            key={index}
            className="flex flex-col items-center text-center group bg-amber-100 p-3 w-40 h-40  rounded-2xl "
          >
            <Image
              src={`http://localhost:1337${category?.icon?.[0]?.url}`}
              width={90}
              height={90}
              alt="icon"
              className="hover:scale-125 transition-all cursor-pointer rounded-full"
            />
            <p className="text-[#FF6F3C] font-bold capitalize mt-5">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
