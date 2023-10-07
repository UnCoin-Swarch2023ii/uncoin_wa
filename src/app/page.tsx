import { Button } from "antd";
import React from "react";
import dynamic from "next/dynamic";

const Home = () => {
  return (
    <div className="test">
      Home
      <Button type="primary">Button</Button>
    </div>
  );
};

// Exort with dynamic
export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
