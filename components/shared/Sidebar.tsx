"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar h-screen sticky top-0 flex flex-col bg-black/90 border-r border-white/10">
      <div className="flex flex-1 flex-col overflow-hidden">
        <Link href="/" className="sidebar-logo mb-8">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="sidebar-nav flex flex-col flex-1 justify-between">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {/* Top links 0-6 */}
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li key={link.route}>
                    <Link
                      href={link.route}
                      className={`sidebar-link ${
                        isActive ? "sidebar-link--active" : ""
                      }`}
                    >
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className="sidebar-link_icon"
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Bottom links 7+ */}
            <div className="mt-auto">
              <ul className="sidebar-nav_elements">
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className={`sidebar-link ${
                          isActive ? "sidebar-link--active" : ""
                        }`}
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={24}
                          height={24}
                          className="sidebar-link_icon"
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="flex-center cursor-pointer gap-2 p-4">
                  <UserButton afterSignOutUrl="/" showName />
                </li>
              </ul>
            </div>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
