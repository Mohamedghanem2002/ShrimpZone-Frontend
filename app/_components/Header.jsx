"use client";
import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Api from "../_utils/Api";
import { CartContext } from "../context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";
const Header = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [jwt, setJwt] = useState(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { updateCart } = useContext(CartContext);

  const [cartItemList, setCartItemList] = useState([]);

  useEffect(() => {
    // Ensure client-side only access
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("jwt");
      const user = sessionStorage.getItem("user");

      if (token && user) {
        setIsLogin(true);
        setJwt(token);
        setUserId(JSON.parse(user));
      }
    }
  }, []);

  useEffect(() => {
    getCategoryList();

    if (isLogin && userId?.id && jwt) {
      getCartItems();
    }
  }, [updateCart, isLogin, userId, jwt]);

  const getCategoryList = async () => {
    const resp = await Api.getCategory();
    setCategory(resp.data.data);
  };

  const getCartItems = async () => {
    const cartItems = await Api.getCartItems(userId?.id, jwt);
    setTotalCartItem(cartItems?.length || 0);
    setCartItemList(cartItems);
  };

  const onSignOut = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      router.push("/sign-in");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await Api.removeCartItem(id, jwt);
      setCartItemList((prev) => prev.filter((item) => item.id !== id));
      setTotalCartItem((prev) => prev - 1);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="shadow-md flex justify-between h-25 p-10 px-20">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            alt="Logo"
            className="rounded-full cursor-pointer"
            width={70}
            height={70}
            src={"/logo3.jpg"}
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className="cursor-pointer flex gap-2 items-center border rounded-full p-2 bg-slate-200">
              <LayoutGrid className="h-5 w-5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((cat) => (
              <DropdownMenuItem key={cat.id}>
                <Image
                  src={`http://localhost:1337${cat?.icon?.[0]?.url}`}
                  width={23}
                  height={23}
                  unoptimized
                  alt=""
                  className="rounded-full"
                />
                <Link href={`products-category/${cat.name}`}>
                  <p className="cursor-pointer text-lg">{cat.name}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex gap-3 items-center border rounded-full p-2">
          <Search />
          <input className="outline-none" type="text" placeholder="search" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            {" "}
            <h2 className="flex gap-2 items-center">
              <ShoppingBag className="cursor-pointer" />
              <span>{totalCartItem}</span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle
                className={"bg-[#FF0000] font-bold text-white p-2 mt-10"}
              >
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onCloseSheet={() => setIsSheetOpen(false)}
                  onRemoveItem={handleRemoveItem}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserIcon className="h-7 w-7 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/myOrders"}>Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
