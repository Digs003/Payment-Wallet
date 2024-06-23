"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";
import NavLink from "./ui/NavLink";

export function Header({ session }: { session: any }) {
  const { user } = session || { user: null };
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
  const links = [
    {
      title: "Home",
      path: "#home",
    },
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Features",
      path: "#features",
    },
    {
      title: "Team",
      path: "#team",
    },
    {
      title: "Reviews",
      path: "#reviews",
    },
    {
      title: "Contact",
      path: "#contact",
    },
  ];
  const handleSignOut = () => {
    // Redirect to "/sign-in" after signing out
    router.push('/sign-in');
  };
  const router = useRouter();
  return (
    <>
      <header className="border-b-[0.5px] border-gray-100/20 fixed w-full top-0 z-[99] bg-transparent backdrop-blur-md">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-16">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link href="/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  NextPay
                </span>
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li className="space-x-10">
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        className="transition text-gray-200 hover:text-gray-200/75"
                        href={link.path}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </li>
                </ul>
              </nav>
            </div>
            <SignedIn>
              <button onClick={() => router.push("/dashboard")}>Dashboard</button>
            </SignedIn>
            <SignedIn><SignOutButton signOutOptions={{ redirectUrl : "/sign-in"}}/></SignedIn>
            <SignedOut><SignInButton/></SignedOut>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div
          className="md:hidden sm:block fixed bg-gradient-to-b from-neutral-950 to-slate-950 z-50 w-full h-fit flex flex-col items-center justify-start text-center gap-7 pt-5 pb-5 border-b-[0.5px] border-opacity-20 border-gray-500 top-[4rem]"
          style={{ boxShadow: "inset 0 -10px 10px -10px #7b7575b3" }}
        >
          {links.map((link: any, index: any) => (

            <NavLink item={link} key={index} handleMenuOpen={handleMenuOpen} />
          ))}
        </div>
      )}
    </>
  );
}
