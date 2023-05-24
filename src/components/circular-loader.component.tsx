import React from "react";

interface CircularLoaderProps {
  size?: number;
}

const CircularLoader = (props: CircularLoaderProps) => {
  const { size = 8 } = props;
  return (
    <div
      className={`relative animate-spin rounded-full h-${size} w-${size} border-b-4 border-l-4 border-black`}
    />
  );
};

export const FullPageLoader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <CircularLoader size={24} />
    </div>
  );
};

export default CircularLoader;
