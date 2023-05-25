"use client";
import { Dialog, IconButton } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/helpers/utils";
import { IconSearch } from "@tabler/icons-react";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog(props: SearchDialogProps) {
  const { open, onClose } = props;
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onClose();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("query", search.value);
    } else {
      newParams.delete("query");
    }

    router.push(createUrl("/products", newParams));
  }

  return (
    <Dialog open={open} handler={onClose} className="p-2">
      <form
        onSubmit={onSubmit}
        className="relative m-0 flex w-full items-center border border-gray-200 bg-transparent dark:border-gray-500 rounded-sm"
      >
        <input
          type="text"
          name="search"
          placeholder="Search for products..."
          autoComplete="off"
          defaultValue={searchParams?.get("query") || ""}
          className="w-full px-4 py-2 text-black dark:bg-black dark:text-gray-100 outline-none"
        />
        <IconButton type="submit" variant="text">
          <IconSearch className="h-5 w-5" />
        </IconButton>
      </form>
    </Dialog>
  );
}
