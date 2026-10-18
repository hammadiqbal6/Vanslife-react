import React, { Suspense } from "react";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useRevalidator,
} from "react-router-dom";
import { deleteVan, getHost } from "../../utils";
import Loader from "../../components/Loader";
import { useAuth } from "../../contexts/AuthContext";

export async function loader() {
  return defer({ host: getHost() });
}

function HostVans() {
  const dataPromise = useLoaderData();
  const { user } = useAuth();
  const revalidator = useRevalidator();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Delete this van listing?")) return;
    try {
      await deleteVan(id);
      revalidator.revalidate();
    } catch (error) {
      alert(error?.response?.data?.error || "Could not delete van.");
    }
  };

  const vanElements = (vans) => {
    if (!vans?.length) {
      return (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-stone-900">
            You have no vans listed yet
          </p>
          <p className="mt-2 text-stone-600">
            Add your first van to start hosting.
          </p>
          <Link
            to="add-van"
            className="mt-4 inline-block rounded-lg bg-amber-550 px-5 py-2.5 font-medium text-white hover:bg-amber-600"
          >
            Add a van
          </Link>
        </div>
      );
    }

    return vans.map((van) => (
      <div
        className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        key={van.id}
      >
        <Link
          to={van.id.toString()}
          className="flex w-full flex-col items-center gap-4 sm:flex-row"
        >
          <img
            src={van.image}
            alt={van.name}
            className="h-28 w-28 rounded-lg object-cover"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-bold text-stone-900">{van.name}</h2>
            <p className="text-stone-600">${van.price}/day</p>
            <p className="mt-1 text-sm capitalize text-stone-500">{van.type}</p>
          </div>
        </Link>
        <div className="flex justify-center gap-3 sm:flex-col">
          <Link
            className="rounded-lg bg-sky-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-sky-700"
            to={`edit-van/${van.id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
            onClick={(e) => handleDelete(e, van.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="wrapper mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">
        Host dashboard
      </h1>
      <div className="mt-4 flex flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-sm sm:flex-row sm:items-start">
        <img
          src={user?.picture_url}
          alt={`${user?.first_name || "Host"} profile`}
          className="h-28 w-28 rounded-full border border-stone-200 object-cover"
        />
        <div className="text-center sm:text-left">
          <p>
            <strong>Name</strong> {user?.first_name} {user?.last_name}
          </p>
          <p className="mt-1">
            <strong>Email</strong> {user?.email}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-stone-900 md:text-2xl">
          Your listed vans
        </h2>
        <Link
          to="add-van"
          className="rounded-lg bg-amber-550 px-5 py-2.5 font-medium text-white hover:bg-amber-600"
        >
          Add new
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <Await
          resolve={dataPromise.host}
          errorElement={
            <div className="mt-4 rounded-xl bg-white p-6 text-rose-700 shadow-sm">
              Could not load your vans.
            </div>
          }
        >
          {(response) => (
            <div className="mt-4 flex flex-col gap-4">
              {vanElements(response.data.vans)}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default HostVans;
