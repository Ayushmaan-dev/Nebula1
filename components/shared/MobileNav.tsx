"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="lg:hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-4 px-6 shadow-lg border-b border-gray-800 flex items-center justify-between">
      <Link href="/" className="sidebar-logo">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="sheet-content bg-black text-white px-4 py-6 h-full shadow-lg rounded-l-lg"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Main Navigation</SheetTitle>
                <Link href="/" className="sidebar-logo mb-6 block">
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={152}
                    height={23}
                  />
                </Link>
              </SheetHeader>

              {/* <button
                type="button"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 opacity-80 transition-all duration-200 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Close"
              >
                <span className="text-white">X</span>
              </button> */}

              <ul className="header-nav_elements flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className={`sidebar-link flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-gray-700 to-black text-white font-semibold shadow-md"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={24}
                          height={24}
                          className={`transition-all duration-200 ${
                            isActive
                              ? "brightness-200"
                              : "brightness-100 group-hover:brightness-125"
                          }`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button
            asChild
            className="button"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
