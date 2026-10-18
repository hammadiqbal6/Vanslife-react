import React from "react";
import { getHostVan } from "../../utils";
import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

export async function loader(params) {
  const response = await getHostVan(params.id);
  return response.data;
}

const typeStyles = {
  simple: "bg-orange-500 text-white",
  rugged: "bg-emerald-800 text-white",
  luxury: "bg-stone-900 text-white",
};

function HostVanDetail() {
  const currentVan = useLoaderData();

  return (
    <section className="wrapper mx-auto max-w-4xl">
      <Link
        to=".."
        relative="path"
        className="inline-flex items-center gap-x-2 text-stone-700 hover:text-stone-900"
      >
        <MdKeyboardBackspace /> Back to all vans
      </Link>

      <div className="mt-4 flex flex-col gap-y-4 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <img
            src={currentVan.image}
            alt={currentVan.name}
            className="h-48 w-48 rounded-lg object-cover sm:h-56 sm:w-56"
          />
          <div className="flex flex-col gap-y-3 text-center sm:text-left">
            <span
              className={`mx-auto w-fit rounded-md px-4 py-1.5 text-sm capitalize sm:mx-0 ${
                typeStyles[currentVan.type] || "bg-amber-200"
              }`}
            >
              {currentVan.type}
            </span>
            <h1 className="text-xl font-bold text-stone-900 md:text-2xl">
              {currentVan.name}
            </h1>
            <p className="text-stone-700">
              ${currentVan.price}
              <span className="text-stone-500">/day</span>
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-6 border-b border-stone-100 pb-3">
          <NavLink
            to="."
            end
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
}

export default HostVanDetail;
