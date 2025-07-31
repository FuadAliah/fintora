import { Routes } from "@/utils/routes";
import Image from "next/image";
import React from "react";
import Nav from "./Nav";
import { AuthButton } from "@/app/components/NavMenu";

const Header = () => {
  return (
    <header className="w-full p-4 bg-[var(--secondary-dark-color)]">
      <nav className="w-full flex justify-between items-center max-w-[1248px] mx-auto">
        <div className="flex w-56 items-center">
          <a href={Routes.HOME} className="flex flex-1 items-center">
            <Image
              alt=""
              src="/logo.svg"
              className="h-8 min-w-10 w-auto"
              width={40}
              height={40}
            />
          </a>
        </div>
        <Nav />
        <AuthButton />
      </nav>
    </header>
  );
};

export default Header;
