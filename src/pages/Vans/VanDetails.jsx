import React, { Suspense } from "react";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { getVans } from "../../utils";
import { MdKeyboardBackspace } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/CartSlice";

export function Loader({ params }) {
  return defer({ van: getVans(params.id) });
}

function VanDetails() {
  const location = useLocation();
  const search = location.state?.search || "";
  const vanPromise = useLoaderData();
  const dispatch = useDispatch();

  const vanElement = (van) => {
    return (
      <>
        <Link
          to={`..${search}`}
          relative="path"
          className="flex items-center gap-x-2 text-lg"
        >
          <MdKeyboardBackspace /> Back to {location.state?.type || "all"} vans
        </Link>
        <div className="mt-4 flex flex-col gap-y-4">
          <img
            src={van.image}
            alt=""
            className="max-h-128 w-full object-contain"
          />
          <i className="w-fit rounded-lg bg-amber-300 px-5 py-2">{van.type}</i>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">{van.name}</h2>
            <p className="van-price">
              <span>${van.price}</span>/day
            </p>
          </div>
          <p className="text-lg font-bold">Description:</p>
          <p>{van.description}</p>
          <button
            className="rounded-lg bg-amber-550 py-3 text-center"
            onClick={() => dispatch(addItem(van))}
          >
            Rent this van
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="wrapper">
      <Suspense
        fallback={
          <Oval
            height={100}
            width={100}
            strokeWidth={2}
            visible={true}
            ariaLabel="oval-loading"
            strokeWidthSecondary={2}
          />
        }
      >
        <Await resolve={vanPromise.van}>
          {(van) => {
            return vanElement(van.data);
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export default VanDetails;
