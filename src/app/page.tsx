"use client";

import { Button } from "antd";
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/login");
  }, []);

  return <div className="test"></div>;
};

// Export with dynamic
export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
