import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SiTailwindcss, SiPostgresql } from "react-icons/si";

function Layout(props) {
  const router = useRouter();

  return (
    <>
      <div className="bg-absolute bg-gradient-to-b from-gray-900 to-gray-700 pb-10">
        <header className="mx-auto max-w-screen p-6 flex items-center justify-between border-b border-b-gray-700 bg-transparent">
          <div className="flex items-center">
            <SiPostgresql size={32} className="text-cyan-700 mr-6"/>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg uppercase text-cyan-500">
                Proof of Concept
              </h1>
              <h2 className="text-sm uppercase tracking-widest text-white/75">
                PostgreSQL
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium pr-4">
            <Link
              href="/"
              className={` hover:text-white/75 ${
                router.pathname == "/"
                  ? "text-cyan-500 hover:text-cyan-500"
                  : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/players"
              className={` hover:text-white/75 ${
                router.pathname == "/players"
                  ? "text-cyan-500 hover:text-cyan-500"
                  : "text-white"
              }`}
            >
              Players
            </Link>
            <Link
              href="/teams"
              className={` hover:text-white/75 ${
                router.pathname == "/teams"
                  ? "text-cyan-500 hover:text-cyan-500"
                  : "text-white"
              }`}
            >
              Teams
            </Link>
          </div>
        </header>
        <div className="flex-wrapper">{props.children}</div>
      </div>
    </>
  );
}

export default Layout;
