import Link from "next/link";
import React from "react";
import { IoIosMenu } from "react-icons/io";

function MainNav() {
  return (
    <header className="bg-white sticky inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-blue-500" href="/">
              <span className="sr-only">Home</span>
              <p className="font-bold text-3xl">Project Test</p>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Katalog Produk
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/produk"
                  >
                    Data Produk
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <IoIosMenu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainNav;
