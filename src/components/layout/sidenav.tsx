"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, Drawer, IconButton } from "@/components/material-tailwind";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface SidenavProps {
  open: boolean;
  onClose: () => void;
  routes: { title: string; path: string }[];
}

export function Sidenav(props: SidenavProps) {
  const { open, onClose, routes } = props;
  const pathname = usePathname();
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      <Drawer open={open} onClose={onClose} className="bg-black p-2">
        <div className={`relative border-b border-white/20`}>
          <Link href="/" className="flex items-center py-4">
            <Image src="/AVANTI.svg" alt="Avanti logo" height={48} width={96} />
          </Link>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <IconX className="h-5 w-5 text-white" />
          </IconButton>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-2">
            {routes.map(({ title, path }) => {
              const isActive = pathname === path;
              return (
                <li key={title}>
                  <Button
                    onClick={() => handleRedirect(path)}
                    color="white"
                    variant={isActive ? "gradient" : "text"}
                    className="flex items-center px-4"
                    fullWidth
                  >
                    <p className="normal-case text-lg font-normal">{title}</p>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </Drawer>
    </>
  );
}

export default Sidenav;
