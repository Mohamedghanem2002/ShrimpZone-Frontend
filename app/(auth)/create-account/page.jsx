"use client";
import { useState, useEffect } from "react";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Api from "@/app/_utils/Api";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = () => {
    Api.registerUser(username, email, password).then(
      (resp) => {
        console.log(resp.data.user);
        console.log(resp.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Account created successfully.");
        router.push("/");
      },
      (e) => {
        toast("Error while creating account.");
      }
    );
  };

  return (
    <div className="items-baseline flex justify-center m-20">
      <div className="flex flex-col items-center bg-gray-100 w-100 p-5">
        <Image
          className="rounded-full"
          src={"/logo2.webp"}
          alt="icon"
          width={100}
          height={100}
        />
        <h2 className="m-5 text-gray-500">Create New Account</h2>
        <div className="flex flex-col w-full gap-5">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            className={"bg-white"}
            type={"text"}
            placeholder="username"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            className={"bg-white"}
            type={"email"}
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            className={"bg-white"}
            type={"password"}
            placeholder="password"
          />
          <Button
            disabled={!(username && email && password)}
            onClick={() => onCreateAccount()}
          >
            Create New Account
          </Button>
          <p>
            Already have an Account{" "}
            <Link className="text-blue-500" href={"/sign-in"}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
