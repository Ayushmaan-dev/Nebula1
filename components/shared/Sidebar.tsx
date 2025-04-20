"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[250px] min-h-screen bg-white border-r p-4 flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <Link href="/" className="mb-6">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
        </Link>

        <nav className="flex flex-1 flex-col justify-between overflow-y-auto pr-2">
          <SignedIn>
            <ul className="flex flex-col gap-2">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li
                    key={link.route}
                    className={`px-4 py-2 rounded-lg transition-colors group ${
                      isActive ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Link className="flex items-center gap-3" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive ? 'brightness-200' : 'brightness-100 group-hover:brightness-125'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <ul className="flex flex-col gap-2 mt-4">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li
                    key={link.route}
                    className={`px-4 py-2 rounded-lg transition-colors group ${
                      isActive ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Link className="flex items-center gap-3" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive ? 'brightness-200' : 'brightness-100 group-hover:brightness-125'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}

              <li className="flex items-center justify-center gap-2 p-4">
                <UserButton afterSignOutUrl='/' showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
