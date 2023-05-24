"use client";
import React from "react";
import Sidenav from "./sidenav";
import Image from "next/image";
import { Button, IconButton } from "../material-tailwind";
import { IconMenu2, IconSearch, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";

function Navbar() {
  const [sidenavOpen, setSidenavOpen] = React.useState(false);

  const toggleSidenav = () => setSidenavOpen((prev) => !prev);

  const closeSidenav = () => setSidenavOpen(false);

  const ROUTES = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Collections",
      path: "/collections",
    },
    {
      title: "Products",
      path: "/products",
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 z-[100] grid grid-cols-3 items-center px-4 sm:px-6 lg:px-8 bg-black text-white w-full h-16 shadow-md">
        <IconButton
          variant="text"
          color="gray"
          className="lg:hidden"
          onClick={toggleSidenav}
        >
          <IconMenu2 className="h-6 w-6 text-white" />
        </IconButton>
        <div className="hidden lg:block">
          <ul className="flex gap-1">
            {ROUTES.map(({ title }) => (
              <li key={title}>
                <Button variant="text" color="white" className="p-2">
                  <p className="capitalize text-lg font-thin">{title}</p>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="mx-auto">
          <Image src="/AVANTI.svg" alt="Avanti logo" height={48} width={96} />
        </Link>
        <div className="flex gap-2 sm:gap-4 items-center ml-auto">
          <IconButton variant="text" color="gray" onClick={toggleSidenav}>
            <IconSearch className="h-6 w-6 text-white" />
          </IconButton>
          <IconButton variant="text" color="gray" onClick={toggleSidenav}>
            <IconUserCircle className="h-6 w-6 text-white" />
          </IconButton>
        </div>
      </nav>
      <Sidenav routes={ROUTES} open={sidenavOpen} onClose={closeSidenav} />
    </>
  );
}

export default Navbar;
