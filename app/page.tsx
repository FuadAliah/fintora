"use client";
import { Routes } from "@/utils/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthButton } from "./components/NavMenu";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  console.log("session", session);

  return (
    <div>
      <nav className="w-full flex justify-between items-center max-w-[1248px] mx-auto">
        <div className="flex w-56 items-center py-3">
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
        <AuthButton />
      </nav>
      <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Understand user flow and
              <strong className="text-indigo-600"> increase </strong>
              conversions
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
              nisi. Natus, provident accusamus impedit minima harum corporis
              iusto.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <button
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                onClick={() => router.push(Routes.OVERVIEW.url)}
              >
                Get Started
              </button>

              <a
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
