import { Button } from "antd";
import React from "react";
import dynamic from "next/dynamic";
import ModKycApp from "./KYC/page";

const Home = () => {
  return (
    <ModKycApp/>
  );
};

// Export with dynamic
export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
