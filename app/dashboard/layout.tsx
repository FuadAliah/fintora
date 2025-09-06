import Header from "@/components/core/header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <Header />
      </div>
      <main className="w-full">{children}</main>
    </>
  );
}

export default layout;
