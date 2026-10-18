import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-stone-900 px-4 py-5 text-center text-sm text-stone-300">
        &#169; {new Date().getFullYear()} #VANLIFE
      </footer>
    </div>
  );
}

export default Layout;
