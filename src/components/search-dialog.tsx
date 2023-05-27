"use client";
import { Suspense, useState } from "react";
import { Dialog, IconButton } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/helpers/utils";
import { IconSearch } from "@tabler/icons-react";
import useDebounce from "@/helpers/hooks/useDebounce.hook";
import CircularLoader from "./circular-loader.component";
import SearchResults from "./search-results";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog(props: SearchDialogProps) {
  const { open, onClose } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams?.get("query") || "");

  const deboucedValue = useDebounce(value, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  function onCancel() {
    onClose();
    setValue("");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onCancel();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (newParams.has("cursor")) newParams.delete("cursor");
    if (newParams.has("direction")) newParams.delete("direction");

    if (search.value) {
      newParams.set("query", search.value);
    } else {
      newParams.delete("query");
    }

    router.push(createUrl("/products", newParams));
  }

  return (
    <Dialog open={open} handler={onCancel} className="p-4 w-[min(500px,80vw)]">
      <form
        onSubmit={onSubmit}
        className="relative m-0 flex items-center border border-gray-200 bg-transparent dark:border-gray-500 rounded-sm"
      >
        <input
          type="text"
          name="search"
          value={value}
          autoComplete="off"
          onChange={onChange}
          placeholder="Search for products..."
          className="w-full px-4 py-2 text-black dark:bg-black dark:text-gray-100 outline-none"
        />
        <IconButton type="submit" variant="text">
          <IconSearch className="h-5 w-5" />
        </IconButton>
      </form>
      {deboucedValue !== "" && (
        <Suspense
          fallback={
            <div className="h-[100px] w-full flex items-center justify-center">
              <CircularLoader />
            </div>
          }
        >
          <SearchResults onCancel={onCancel} searchQuery={deboucedValue} />
        </Suspense>
      )}
    </Dialog>
  );
}
