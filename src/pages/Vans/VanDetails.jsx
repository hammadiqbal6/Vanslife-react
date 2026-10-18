import React, { Suspense, useState } from "react";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { getVans } from "../../utils";
import { MdKeyboardBackspace } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/CartSlice";
import Loader from "../../components/Loader";

export function loader({ params }) {
  return defer({ van: getVans(params.id) });
}

const typeStyles = {
  simple: "bg-orange-500 text-white",
  rugged: "bg-emerald-800 text-white",
  luxury: "bg-stone-900 text-white",
};

function VanDetails() {
  const location = useLocation();
  const search = location.state?.search || "";
  const vanPromise = useLoaderData();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const vanElement = (response) => {
    const van = response.data;
    return (
      <>
        <Link
          to={`..${search}`}
          relative="path"
          className="inline-flex items-center gap-x-2 text-stone-700 hover:text-stone-900"
        >
          <MdKeyboardBackspace /> Back to {location.state?.type || "all"} vans
        </Link>
        <div className="mt-6 grid items-start gap-8 md:grid-cols-2">
          <img
            src={van.image}
            alt={van.name}
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
          <div className="flex flex-col gap-y-4">
            <span
              className={`w-fit rounded-md px-4 py-1.5 text-sm capitalize ${
                typeStyles[van.type] || "bg-amber-200"
              }`}
            >
              {van.type}
            </span>
            <h1 className="font-display text-3xl font-bold text-stone-900">
              {van.name}
            </h1>
            <p className="text-xl font-semibold text-stone-900">
              ${van.price}
              <span className="text-base font-normal text-stone-500">/day</span>
            </p>
            <div>
              <h2 className="font-semibold text-stone-900">Description</h2>
              <p className="mt-2 leading-relaxed text-stone-700">
                {van.description}
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg bg-amber-550 py-3 text-center font-semibold text-white transition hover:bg-amber-600"
              onClick={() => {
                dispatch(addItem(van));
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
            >
              {added ? "Added to cart!" : "Rent this van"}
            </button>
            {added && (
              <Link to="/cart" className="text-center text-amber-550 underline">
                View cart
              </Link>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="wrapper mx-auto max-w-6xl">
      <Suspense fallback={<Loader />}>
        <Await
          resolve={vanPromise.van}
          errorElement={
            <div className="rounded-xl bg-white p-6 text-rose-700 shadow-sm">
              Could not load this van.
            </div>
          }
        >
          {vanElement}
        </Await>
      </Suspense>
    </div>
  );
}

export default VanDetails;
