import React from "react";
import iconCart from "../../assets/iconCart.png";
import iconSale from "../../assets/sale.png";
import { Link } from "react-router-dom";

export default function Card_Product(props) {
  const {
    product_discount,
    product_id,
    product_name,
    product_type,
    product_category,
    product_unit_price,
    product_rating,
    product_state,
    product_image,
  } = props.data;

  const handleAddToCart = () => {
    alert("Handle Add To Cart!!!");
  };
  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-sm relative ">
        {product_discount != 0 ? (
          <>
            {/* Sale Icon */}
            <div className="w-20 h-20 absolute -right-2 -top-1 z-10">
              <img src={iconSale} alt="Sale Icon" />
            </div>

            {/* Discount Badge */}
            <p className="text-2xl  font-semibold text-white bg-red-500 px-4 py-1 rounded-full absolute left-1 top-40 z-10">
              {product_discount}% Off
            </p>
          </>
        ) : (
          <></>
        )}

        <Link to={product_id}>
          <div className="flex flex-row">
            <img
              src={`data:image/jpeg;base64,${product_image}`}
              alt=""
              className="w-full h-40 object-cover object-top drop-shadow-[0_80px_30px_#0007]"
            />
          </div>
        </Link>
        <h3 className="text-2xl pt-3 text-center font-medium line-clamp-1 hover:line-clamp-none">
          {product_name}
        </h3>
        <div className="flex justify-between items-center pt-1">
          <p>
            <span className="text-2xl font-medium">{product_unit_price} $</span>
          </p>
          <button
            className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
            onClick={handleAddToCart}
          >
            <img src={iconCart} alt="" className="w-5" />
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="products-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mx-2">
{products.length === 0 ? (
  <p className="text-center text-gray-500">No products found</p>
) : (
  products.map((product) => (
    <div
      key={product.product_id}
      className="product-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        {product.product_name}
      </h3>
      <p className="text-gray-600 mt-2">{product.product_description}</p>
      <p className="mt-2 text-sm text-gray-500">
        Category: {product.product_category}
      </p>
      <p className="text-sm text-gray-500">
        Type: {product.product_type}
      </p>
      <p className="text-lg font-semibold text-gray-900 mt-3">
        Price: ${product.product_unit_price}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Rating: {product.product_rating}
      </p>
      <p className="mt-1 text-sm text-gray-600">
        Discount: {product.product_discount}%
      </p>
      <p className="mt-1 text-sm text-gray-600">
        Status: {product.product_state}
      </p>

      {product.product_image && (
        <img
          src={`data:image/jpeg;base64,${product.product_image}`}
          alt={product.product_name}
          className="mt-4 w-full h-48 object-cover rounded-lg"
        />
      )}
    </div>
  ))
)}
</div> */
}
