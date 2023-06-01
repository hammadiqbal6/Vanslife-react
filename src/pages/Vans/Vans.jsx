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
          "rounded-xl bg-amber-200 px-6 py-2"
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
            className="h-80 w-80 rounded-md object-contain"
          />
          <div className="my-4">
            <h3 className="text-xl font-bold">{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className="rounded-lg bg-amber-300 px-5 py-2">{van.type}</i>
        </Link>
      </div>
    );
  };

  const vanElements = ({ data: vans }) => {
    const filteredVans = typeFilter
      ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
      : vans;
    return filteredVans.map((van) => vanElement(van));
  };

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Explore our vans Options</h1>
      <div className="items mt-3 flex gap-x-10">
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
