import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, setDays } from "../features/CartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkoutNote, setCheckoutNote] = useState("");

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.days || 1),
        0
      ),
    [cartItems]
  );

  if (!cartItems.length) {
    return (
      <div className="wrapper flex flex-col items-center justify-center text-center">
        {checkoutNote && (
          <div
            className="mb-6 max-w-md rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900"
            role="status"
          >
            {checkoutNote}
          </div>
        )}
        <h1 className="text-2xl font-bold text-stone-900">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-md text-stone-600">
          Browse the fleet and rent a van for your next trip.
        </p>
        <Link
          to="/vans"
          className="mt-6 rounded-lg bg-amber-550 px-5 py-3 font-medium text-white hover:bg-amber-600"
        >
          Explore vans
        </Link>
      </div>
    );
  }

  return (
    <div className="wrapper mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">
          Your shopping cart
        </h1>
        <button
          type="button"
          className="text-sm text-stone-600 underline hover:text-stone-900"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {cartItems.map((item) => (
          <div
            className="flex flex-col gap-4 border-b border-stone-100 p-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
            key={item.id}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-28 w-28 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-stone-900">{item.name}</p>
                <p className="text-stone-600">${item.price}/day</p>
                <p className="mt-1 text-sm capitalize text-stone-500">
                  {item.type}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
              <label className="flex items-center gap-2 text-sm text-stone-700">
                Days
                <input
                  type="number"
                  min="1"
                  value={item.days || 1}
                  onChange={(e) =>
                    dispatch(setDays({ id: item.id, days: e.target.value }))
                  }
                  className="w-16 rounded-md border border-stone-200 px-2 py-1"
                />
              </label>
              <p className="font-semibold text-stone-900">
                ${Number(item.price) * Number(item.days || 1)}
              </p>
              <button
                type="button"
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
                onClick={() => dispatch(removeItem(item))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-stretch justify-between gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-stone-500">Estimated total</p>
          <p className="text-2xl font-bold text-stone-900">${total}</p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-amber-550 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
          onClick={() => {
            dispatch(clearCart());
            setCheckoutNote(
              "Thanks! This is a demo checkout — no payment was taken."
            );
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
