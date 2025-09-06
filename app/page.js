import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import Api from "./_utils/Api";
import { Cat } from "lucide-react";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await Api.getSlider();
  const categoryList = await Api.getCategoryList();
  const productList = await Api.getProductList();
  console.log(productList);
  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
      {/* <CategoryList categoryList={categoryList} /> */}
      <ProductList productList={productList} />

      <Image
        src={"/dev.jpg"}
        width={1600}
        height={300}
        alt="icon"
        layout="responsive"
        className="mt-10 mb-10 rounded-lg "
      />

      <Footer />
    </div>
  );
}
