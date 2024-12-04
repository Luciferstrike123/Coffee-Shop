import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../../../stores/cart";
import { clearCart } from "../../../stores/cart";
import CartItem from "./cartItem";

const employee2 = [
  { id: 35, name: "Melanie" },
  { id: 36, name: "Christen" },
  { id: 37, name: "Evelyn" },
  { id: 38, name: "Byron" },
];

const table = [...Array(31).keys()];

export default function cartTab() {
  const [phone, setPhone] = useState();
  const [employeeId, setEmployeeId] = useState(35);
  const [tableId, setTableId] = useState();
  const [quantityTotal, setQuantity] = useState();
  const [priceTotal, setPrice] = useState();
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };
  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    carts.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price * (1 - item.discount);
    });
    setQuantity(totalQuantity);
    setPrice(totalPrice.toFixed(2));
  }, [carts]);

  const CheckPhone = (e) => {
    e.preventDefault();

    alert(phone);
  };

  function handleCheckout() {
    console.log({
      phone: phone,
      employeeId: employeeId,
      tableId: tableId,
      quantityTotal: quantityTotal,
      priceTotal: priceTotal,
    });

    const cart = JSON.parse(localStorage.getItem("carts"));
    console.log(cart);
    dispatch(clearCart());
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}
      >
        <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
        <div className="flex flex-col gap-2 mt-2 ">
          <div className="ml-3 flex flex-col gap-2 ">
            <div>
              <form
                onSubmit={CheckPhone}
                className="flex items-center gap-2   "
              >
                <label htmlFor="phone" className="text-white text-xl">
                  SĐT:
                </label>
                <input
                  required
                  type="number"
                  value={phone}
                  id="phone"
                  name="phone"
                  className="  border border-gray-300 rounded  "
                  placeholder="0795759610 ......."
                  onChange={(e) => setPhone(e.target.value)}
                />

                <button
                  type="submit"
                  className=" bg-blue-500 text-white rounded p-1 "
                >
                  Check
                </button>
              </form>
            </div>
            <div className="flex gap-2 mt-2">
              <label htmlFor="employee" className="text-xl  text-white">
                Nhân Viên:
              </label>
              <select
                name="employe"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {employee2.map((item) => {
                  return (
                    <>
                      <option value={item.id} className="bg-gray-300">
                        {item.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="table" className="text-xl  text-white">
                Bàn: {tableId}
              </label>

              <div className="grid grid-cols-12 gap-1 px-1  mx-auto ">
                {table.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setTableId(item)}
                    className="p-1 border rounded-md bg-gray-300 hover:bg-gray-400"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 overflow-auto max-h-[300px]  ">
            {carts.map((item, key) => (
              <CartItem key={key} data={item} />
            ))}
          </div>
          {quantityTotal && (
            <>
              <div className="flex justify-center gap-16 text-white text-2xl  mt-2">
                <span>Total: {priceTotal}$</span>

                <span>Quantity: {quantityTotal}</span>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2">
          <button className="bg-black text-white" onClick={handleCloseTabCart}>
            CLOSE
          </button>
          <button onClick={handleCheckout} className="bg-amber-600 text-white">
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
