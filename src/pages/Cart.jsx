import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../features/CartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => (totalPrice += cartItem.price));
    setTotal(totalPrice);
  }, [cartItems]);

  const cartItem = (item, index) => {
    return (
      <div className="flex justify-between border-b p-4" key={index}>
        <div className="flex items-center gap-x-4">
          <img src={item.image} alt="" className="h-40 w-40 rounded-lg" />
          <div>
            <p>{item.name}</p>
            <p>${item.price}/day</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <div>days 1</div>
          <button
            className="w-full rounded-lg bg-rose-400 p-4 md:px-5 md:py-3"
            onClick={(e) => dispatch(removeItem(item))}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="wrapper">
      <h1 className="mb-4 text-2xl font-bold">Your shopping cart</h1>
      <div>
        {cartItems && (
          <>
            <div className="mb-4 flex flex-col rounded-lg bg-white shadow-sm">
              {cartItems.map((item, index) => cartItem(item, index))}
            </div>
            <div>Total: ${total}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
