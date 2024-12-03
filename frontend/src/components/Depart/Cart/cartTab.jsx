import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../../../stores/cart";
import CartItem from "./cartItem";

export default function cartTab() {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };
  return (
    <>
      <div
        className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}
      >
        <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
        <div className="flex flex-col gap-2 ">
          <div className="">
            <div>
              <div className="text-white">
                <label>SDT</label>
                <input className="text-black" type="text" placeholder="SDT" />
                <button>Check</button>
              </div>
              <div>
                <label className="text-white">NV</label>
                <select className="bg-slate-400 rounded-md text-[20px]">
                  <option value="1">Hoi</option>
                  <option value="1">Hai</option>
                  <option value="1">Huong</option>
                  <option value="1">Mai</option>
                </select>
              </div>

              <div>
                <label className="text-white">Số bàn</label>
                <select className="bg-slate-400 rounded-md text-[20px] ">
                  <option value="1">1</option>
                  <option value="1">2</option>
                  <option value="1">3</option>
                  <option value="1">4</option>
                  <option value="1">4</option>
                  <option value="1">4</option>
                  <option value="1">4</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-5 overflow-auto max-h-[400px] mt-20  ">
            {carts.map((item, key) => (
              <CartItem key={key} data={item} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <button className="bg-black text-white" onClick={handleCloseTabCart}>
            CLOSE
          </button>
          <button className="bg-amber-600 text-white">CHECKOUT</button>
        </div>
      </div>
    </>
  );
}
