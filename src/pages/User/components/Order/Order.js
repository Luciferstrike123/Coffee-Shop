import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLoadingState } from "../../../../Recoil/Loading/useLoadingState";

function Order() {
  const [orders, setOrders] = useState([]);
  const { setIsLoading } = useLoadingState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const userId = localStorage.getItem("user-id");
      if (!userId) return;
      await axios
        .get(`https://dummyjson.com/carts/user/${userId}`)
        .then((resp) => {
          const formattedOrders = resp.data.carts.map((cart) => {
            return {
              _id: cart.id, // Updated to cart.id instead of cart._id
              date: cart.date, // You can replace this with a proper date if necessary
              products: cart.products.map((product) => ({
                productImage: product.thumbnail, // Using DummyJSON's thumbnail as the image
              })),
              total: cart.total, // Total amount for the cart
            };
          });
          setOrders(formattedOrders.reverse()); // Reverse to show the most recent orders first
        })
        .catch((err) => {
          console.log(err); // Error handling
        })
        .finally(() => setIsLoading(false));
    })();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center px-4 py-16 text-white relative">
      <Link to="/user" className="absolute top-4 left-6">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="text-3xl hover:text-[#cda154]"
        />
      </Link>
      <div className="flex flex-col gap-3 w-full md:w-4/5 overflow-auto">
        {orders.length === 0 && (
          <h1 className="text-center">You don't have any orders yet.</h1>
        )}
        {orders.map((order) => (
          <Link to={`/user/orders/${order._id}`} key={order._id}>
            <div className="flex justify-between items-center px-4 py-3 rounded-xl border-[1.6px] hover:border-[#cda154]">
              <img
                src={order.products[0].productImage} // Updated to match new productImage structure
                alt=""
                className="w-10 md:w-12"
              />
              <div className="flex flex-col flex-1 text-white justify-center items-center">
                <span className="text-sm font-normal">
                  {new Date(Date.parse(order.date)).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-semibold">
                  {order.total.toFixed(2)} $
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Order;
