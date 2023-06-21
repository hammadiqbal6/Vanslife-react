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

function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterList = ["simple", "rugged", "luxury"];
  const typeFilter = searchParams.get("type");
  const { vans } = useLoaderData();

  const handleFilterChange = (key, value) => {
    setSearchParams((prevState) => {
      if (value === null) {
        prevState.delete(key);
      } else {
        prevState.set(key, value);
      }
      return prevState;
    });
  };

  const filterButtonElements = filterList.map((type, index) => {
    return (
      <button
        key={index}
        onClick={() => handleFilterChange("type", type)}
        className={
          (typeFilter === type ? "!bg-green-800 " : "") +
          "rounded-xl bg-amber-200 p-3 md:px-6 md:py-3"
        }
      >
        {type}
      </button>
    );
  });

  const vanElement = (van) => {
    return (
      <div key={van.id}>
        <Link
          to={van.id.toString()}
          relative="path"
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        >
          <img
            src={van.image}
            alt=""
            className="mx-auto h-64 w-64 rounded-md object-contain md:mx-0 md:h-80 md:w-80"
          />
          <div className="my-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold">{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
            <i className="rounded-lg bg-amber-300 px-5 py-2">{van.type}</i>
          </div>
        </Link>
      </div>
    );
  };

  const vanElements = (vans) => {
    const filteredVans = typeFilter
      ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
      : vans;
    return filteredVans.map((van) => vanElement(van));
  };

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Explore our vans Options</h1>
      <div className="mt-3 flex justify-center gap-x-4 sm:gap-x-10">
        {filterButtonElements}
        {typeFilter && (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="underline"
          >
            Clear filters
          </button>
        )}
      </div>
      <Suspense fallback={<Loader />}>
        <Await
          resolve={vans}
          errorElement={<div>Could not load reviews 😬</div>}
          children={({ data: vans }) => (
            <div className="mt-4 grid grid-cols-fluid gap-10">
              {vanElements(vans)}
            </div>
          )}
        />
      </Suspense>
    </div>
  );
}

export default Vans;
