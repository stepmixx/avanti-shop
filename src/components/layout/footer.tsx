import { Typography } from "@/components/material-tailwind";

function Footer() {
  return (
    <footer className="bg-black text-white w-full p-6 flex justify-center items-center">
      <Typography variant="small" className="text-center">
        © 2023, AVANTI. This is a mock for a take home task.
      </Typography>
    </footer>
  );
}

export default Footer;
