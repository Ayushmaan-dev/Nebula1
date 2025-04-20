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
    <header className="header lg:hidden">
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
              className="sheet-content bg-white px-4 py-6 h-full"
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

              <button
                type="button"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary opacity-70 transition-all duration-200 hover:opacity-100 focus:outline-none focus:ring-0 focus:shadow-glow active:shadow-glow disabled:pointer-events-none"
                aria-label="Close"
              >
                <span className="text-white">X</span>
              </button>

              <ul className="header-nav_elements flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className={`sidebar-link flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                          isActive
                            ? "gradient-text font-semibold"
                            : "text-dark-700"
                        }`}
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={24}
                          height={24}
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
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
