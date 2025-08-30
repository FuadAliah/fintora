"use client";
import { usePathname } from "next/navigation";
import { Routes } from "@/utils/routes";
import Link from "next/link";

export const getActiveClass = (route: string, pathname: string) => {
  return pathname === route ? "text-white/100" : "text-white/60";
};

export interface languageProps {
  language: string;
  changeLanguage: (lang: string) => void;
}

export default function Nav() {
  const pathname = usePathname();
  const routes = Object.values(Routes);


  return (
    <div className={`flex items-center`}>
      <ul className={`flex gap-10 text-sm h-full`}>
        {routes
          .filter((route) => typeof route === "object")
          .map((route) => (
            <li key={route.url}>
              <Link
                className={`flex space-x-8 text-center hover:text-white transition-colors duration-200 ${getActiveClass(
                  route.url,
                  pathname
                )}`}
                href={route.url}
              >
                {route.label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
