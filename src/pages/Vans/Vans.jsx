import React, { Suspense } from "react";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { getVans } from "../../utils";
import Loader from "../../components/Loader";

export async function loader() {
  return defer({ vans: getVans() });
}

const typeStyles = {
  simple: "bg-orange-500 text-white",
  rugged: "bg-emerald-800 text-white",
  luxury: "bg-stone-900 text-white",
};

function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterList = ["simple", "rugged", "luxury"];
  const typeFilter = searchParams.get("type");
  const { vans } = useLoaderData();

  const handleFilterChange = (key, value) => {
    setSearchParams((prevState) => {
      const next = new URLSearchParams(prevState);
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    });
  };

  const renderVans = (response) => {
    const list = response?.data || [];
    const filteredVans = typeFilter
      ? list.filter((van) => van.type.toLowerCase() === typeFilter)
      : list;

    if (!filteredVans.length) {
      return (
        <div className="mt-10 rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-stone-900">No vans found</p>
          <p className="mt-2 text-stone-600">
            Try clearing filters or check back later.
          </p>
          {typeFilter && (
            <button
              type="button"
              className="mt-4 text-amber-550 underline"
              onClick={() => handleFilterChange("type", null)}
            >
              Clear filters
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="mt-6 grid grid-cols-fluid gap-8">
        {filteredVans.map((van) => (
          <Link
            key={van.id}
            to={van.id.toString()}
            relative="path"
            state={{
              search: `?${searchParams.toString()}`,
              type: typeFilter,
            }}
            className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <img
              src={van.image}
              alt={van.name}
              loading="lazy"
              className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-64"
            />
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-stone-900">{van.name}</h3>
                <p className="shrink-0 text-right font-semibold text-stone-900">
                  ${van.price}
                  <span className="block text-xs font-normal text-stone-500">
                    /day
                  </span>
                </p>
              </div>
              <span
                className={`inline-block rounded-md px-3 py-1 text-sm capitalize ${
                  typeStyles[van.type] || "bg-amber-200"
                }`}
              >
                {van.type}
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="wrapper mx-auto max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-stone-900 md:text-3xl">
        Explore our van options
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {filterList.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handleFilterChange("type", type)}
            className={`rounded-lg px-4 py-2 capitalize transition ${
              typeFilter === type
                ? typeStyles[type]
                : "bg-amber-100 text-stone-800 hover:bg-amber-200"
            }`}
          >
            {type}
          </button>
        ))}
        {typeFilter && (
          <button
            type="button"
            onClick={() => handleFilterChange("type", null)}
            className="text-stone-600 underline hover:text-stone-900"
          >
            Clear filters
          </button>
        )}
      </div>
      <Suspense fallback={<Loader />}>
        <Await
          resolve={vans}
          errorElement={
            <div className="mt-8 rounded-xl bg-white p-6 text-rose-700 shadow-sm">
              Could not load vans. Please refresh and try again.
            </div>
          }
        >
          {renderVans}
        </Await>
      </Suspense>
    </div>
  );
}

export default Vans;
