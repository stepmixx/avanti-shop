import { IconError404 } from "@tabler/icons-react";
import { Typography } from "@/components/material-tailwind";

export const metadata = {
  title: "Page not found | AVANTI",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <IconError404 className="w-24 h-24 text-black" />
      <Typography variant="h1" className="text-4xl font-bold text-black">
        Error
      </Typography>
      <Typography variant="h2" className="text-2xl font-medium text-black">
        Page not found
      </Typography>
      <Typography varriant="h3" className="text-base text-black">
        The page you are looking for does not exist.
      </Typography>
    </div>
  );
};

export default NotFound;
