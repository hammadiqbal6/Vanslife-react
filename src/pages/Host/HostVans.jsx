import React, { Suspense } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { deleteVan, getHost } from "../../utils";
import Loader from "../../components/Loader";
import { useAuth } from "../../contexts/AuthContext";

export async function loader() {
  const user = JSON.parse(localStorage.getItem("user"));
  return defer({ host: getHost(user.id) });
}

function HostVans() {
  const dataPromise = useLoaderData();
  const { user } = useAuth();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await deleteVan(id);
      document.getElementById(`van-${id}`).remove();
    } catch (error) {
      console.log("error deleting van", error?.response?.data?.error);
    }
  };

  const vanElements = (vans) => {
    return vans.map((van) => (
      <div
        id={`van-${van.id}`}
        className="flex justify-between rounded-lg bg-white p-4 shadow-sm"
        key={van.id}
      >
        <Link
          to={van.id.toString()}
          className="flex w-full flex-col items-center gap-6 md:flex-row"
        >
          <img src={van.image} alt="" className="h-32 w-32" />
          <div className="flex flex-col">
            <h2 className="font-bold">{van.name}</h2>
            <h2>${van.price}/day</h2>
          </div>
        </Link>
        <div className="flex flex-col justify-center  gap-y-4 text-center">
          <Link
            className="w-full rounded-lg bg-blue-400 p-4 md:px-5 md:py-3"
            to={`edit-van/${van.id}`}
          >
            Edit
          </Link>
          <button
            className="w-full rounded-lg bg-rose-400 p-4 md:px-5 md:py-3"
            onClick={(e) => handleDelete(e, van.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Host info</h1>
      <div className="mt-4 flex flex-col items-center gap-y-4 rounded-lg bg-white p-4 shadow-sm">
        <img
          src={user?.picture_url}
          alt=""
          className="h-40 w-40 rounded-full border border-black object-contain"
        />
        <div className="flex flex-col">
          <p>
            {" "}
            <strong>Name</strong> {user?.first_name} {user?.last_name}
          </p>
          <p>
            {" "}
            <strong>Email</strong> {user?.email}
          </p>
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bold">Your listed vans</h2>
      <div className="mt-4">
        <Link to="add-van" className="rounded-lg bg-amber-550 px-5 py-3">
          Add new
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <Await
          resolve={dataPromise.host}
          children={({ data: host }) => (
            <div className="mt-4 flex flex-col gap-y-4">
              {vanElements(host.vans)}
            </div>
          )}
        ></Await>
      </Suspense>
    </div>
  );
}

export default HostVans;
