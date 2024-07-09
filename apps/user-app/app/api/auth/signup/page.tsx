"use client";
import {
  CircleUser,
  Lock,
  LockOpen,
  Mails,
  PencilLine,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Signup } from "../../../lib/actions/SignUp";

export default function () {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // console.log(email);
    // console.log(name);
    // console.log(password);
    const res = await Signup(email, name, password);
    console.log(res);
    if (res.message) {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (response?.error) {
        console.error(response.error);
      } else {
        window.location.href = "/";
        console.log("Signed up successfully");
      }
    } else {
      console.log("Error signing up");
    }
  };

  return (
    <div className="bg-gradient-to-br grid grid-cols-1 md:grid-cols-3 h-screen from-black via-gray-950 to-red-900/20">
      <div className="shadow-lg  shadow-red-500 p-5 flex flex-col justify-start">
        <div className="flex justify-center m-5">
          <CircleUser className="w-40 h-40 text-white" />
        </div>
        <div className="flex justify-center text-lg">
          Already have an account?
          <Link
            href="/api/auth/signin"
            className="pl-1 underline hover:text-red-400"
          >
            SignIn
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center my-4 w-full max-w-md">
            <Mails className="bg-red-500 h-10 w-10 p-2 text-white rounded-l-md" />
            <input
              type="text"
              placeholder="Email"
              className="w-full h-10 text-black px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center my-4 w-full max-w-md">
            <PencilLine className="bg-red-500 h-10 w-10 p-2 text-white rounded-l-md" />
            <input
              type="text"
              placeholder="Name"
              className="w-full h-10 text-black px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center my-4 w-full max-w-md">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="bg-red-500 h-10 w-10 p-2 text-white rounded-l-md flex items-center justify-center hover:bg-red-600"
            >
              {showPassword ? (
                <LockOpen className="w-6 h-6" />
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-10 text-black px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex my-4 items-center justify-center w-full max-w-md">
          <button
            onClick={handleSignUp}
            className="px-5 text-lg rounded bg-red-500 h-10 hover:bg-red-600"
          >
            Sign Up
          </button>
        </div>
        <div className="relative flex items-center justify-center w-full my-8">
          <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-black">
            OR
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex my-4 items-center justify-center w-full max-w-md">
            <img src="/google_logo.png" className="w-12 h-10 rounded"></img>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="px-5 text-lg rounded bg-red-500 h-10 hover:bg-red-600"
            >
              Continue with Google
            </button>
          </div>
          <div className="flex my-4 items-center justify-center w-full max-w-md">
            <img src="/apple_logo.png" className="w-12 h-10 rounded"></img>
            <button
              onClick={() => signIn("apple", { callbackUrl: "/" })}
              className="px-5 text-lg rounded bg-red-500 h-10 hover:bg-red-600"
            >
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
      <div
        className="hidden md:block md:col-span-2 bg-cover bg-center"
        style={{ backgroundImage: "url(path/to/your/image.jpg)" }}
      ></div>
    </div>
  );
}
