import React from "react";
import { getHostVan } from "../../utils";
import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

export async function loader(params) {
  const response = await getHostVan(params.id);
  return response.data;
}

function HostVanDetail() {
  const { data: currentVan } = useLoaderData();

  return (
    <section className="wrapper">
      <Link
        to=".."
        relative="path"
        className="flex items-center gap-x-2 text-lg"
      >
        <MdKeyboardBackspace /> Back to all vans
      </Link>

      <div className="mt-4 flex flex-col gap-y-4 rounded-lg bg-white p-5">
        <div className="flex items-center gap-4">
          <img src={currentVan.image} alt="" className="h-60 w-60 rounded-lg" />
          <div className="flex flex-col gap-y-3">
            <i className="w-fit rounded-lg bg-amber-300 px-5 py-2">
              {currentVan.type}
            </i>
            <h3 className="text-lg font-bold">{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="flex gap-10">
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
