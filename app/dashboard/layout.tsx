import React from "react";
import Header from "@/components/Header";

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
