"use client";
import React from "react";
import Sidenav from "./sidenav";
import Image from "next/image";
import { Button, IconButton } from "../material-tailwind";
import {
  IconMenu2,
  IconSearch,
  IconShoppingCart,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import SearchDialog from "../search-dialog";

function Navbar() {
  const [sidenavOpen, setSidenavOpen] = React.useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);

  const toggleSidenav = () => setSidenavOpen((prev) => !prev);
  const closeSidenav = () => setSidenavOpen(false);

  const toggleSearchDialog = () => setSearchDialogOpen((prev) => !prev);
  const closeSearchDialog = () => setSearchDialogOpen(false);

  const ROUTES = [
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
      <nav className="fixed top-0 left-0 z-[100] grid grid-cols-3 items-center px-2 sm:px-6 lg:px-8 bg-black text-white w-full h-16 shadow-md">
        <IconButton
          variant="text"
          color="gray"
          className="w-8 sm:w-10 h-8 sm:h-10 lg:hidden"
          onClick={toggleSidenav}
        >
          <IconMenu2 className="w-5 sm:w-6 text-white" />
        </IconButton>
        <div className="hidden lg:block">
          <ul className="flex gap-1">
            {ROUTES.map(({ title, path }) => (
              <li key={title}>
                <Link href={path}>
                  <Button variant="text" color="white" className="p-2">
                    <p className="capitalize text-lg font-thin">{title}</p>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link id="logo" href="/" className="mx-auto">
          <Image src="/AVANTI.svg" alt="Avanti logo" height={48} width={96} />
        </Link>
        <div className="flex gap-1 sm:gap-4 items-center ml-auto">
          <IconButton
            color="gray"
            variant="text"
            onClick={toggleSearchDialog}
            className="w-8 sm:w-10 h-8 sm:h-10"
          >
            <IconSearch className="w-5 sm:w-6 text-white" />
          </IconButton>
          <IconButton
            color="gray"
            variant="text"
            onClick={() => alert("Cart")}
            className="w-8 sm:w-10 h-8 sm:h-10"
          >
            <IconShoppingCart className="w-5 sm:w-6 text-white" />
          </IconButton>
          <IconButton
            color="gray"
            variant="text"
            onClick={() => alert("User")}
            className="w-8 sm:w-10 h-8 sm:h-10"
          >
            <IconUserCircle className="w-5 sm:w-6 text-white" />
          </IconButton>
        </div>
      </nav>
      <Sidenav routes={ROUTES} open={sidenavOpen} onClose={closeSidenav} />
      <SearchDialog open={searchDialogOpen} onClose={closeSearchDialog} />
    </>
  );
}

export default Navbar;
