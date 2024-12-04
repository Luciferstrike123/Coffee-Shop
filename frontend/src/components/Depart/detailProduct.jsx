import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/cart";
import { FaStar } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdSwitchAccessShortcut } from "react-icons/md";

export default function detailProduct() {
  const { id } = useParams();
  console.log(id);
  const [detail, setDetail] = useState({
    discount: 0,
    img: "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",
    name: "Dark chocolate",
    price: 5.12,
    productId: 19,
    quantity: 1,
    description:
      "Dark chocolate is a rich and sophisticated treat, known for its intense, deep cocoa flavor that sets it apart from other types of chocolate. It’s made with a higher percentage of cocoa solids and less sugar, giving it a slightly bitter yet luxurious taste that chocolate connoisseurs adore. Each bite offers a smooth, velvety texture that melts on the tongue, revealing complex notes of roasted cocoa, hints of coffee, and subtle undertones of fruit or spices. Whether enjoyed on its own or used in cooking and baking, dark chocolate is the perfect indulgence for those who appreciate the finer things in life and seek a more intense chocolate experience",
    rating: 7.5,
    state: "available",
  });
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {}, [id]);

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: detail.productId,
        name: detail.name,
        price: detail.price,
        quantity: quantity,
        discount: detail.discount,
        img: detail.img,
      })
    );
  };

  const handleChangState = () => {
    alert("Hello");
  };
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="relative">
            <img
              src={`data:image/jpeg;base64,${detail.img}`}
              alt=""
              className="w-full"
            />
            <span className="absolute right-0 top-0 text-2xl   bg-blue-300 p-4">
              {detail.state.toUpperCase()}
            </span>
          </div>
          <div className=" flex flex-col gap-5">
            <div className="flex flex-row items-center gap-16">
              <div>
                <h1 className=" text-4xl uppercase font-bold">{detail.name}</h1>
              </div>

              <div>
                <button
                  onClick={handleChangState}
                  className="flex flex-row items-center text-white bg-green-400 p-2 rounded-2xl"
                >
                  <MdSwitchAccessShortcut className="text-4xl" />
                  <span>Change State</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col ">
              <p className="font-bold text-3xl">
                $ <span className="ml-3">{detail.price}</span>
              </p>
              <div className="font-bold text-3xl flex items-center gap-2">
                <FaStar className="text-yellow-500 " />
                <p>{detail.rating}/10</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex gap-2 justify-center items-center">
                <button
                  className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                  onClick={handleMinusQuantity}
                >
                  -
                </button>
                <span className="bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                  {quantity}
                </span>
                <button
                  className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                  onClick={handlePlusQuantity}
                >
                  +
                </button>
              </div>
              <button
                className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>

            <p className="max-h-[200px] overflow-auto">{detail.description}</p>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-1">
                  <IoPersonCircleOutline className="text-4xl" />
                  <span className="text-xl">Chị Chi:</span>

                  <div className="font-bold text-2xl flex items-center gap-2">
                    <FaStar className="text-yellow-500 " />
                    <p>8/10</p>
                  </div>
                </div>
                <p className="font-light">
                  Cà phê cappuccino là một lựa chọn tuyệt vời cho những ai yêu
                  thích sự kết hợp hoàn hảo giữa cà phê đậm đà và sữa tạo bọt
                  mịn màng. Mỗi ngụm là sự cân bằng giữa vị đắng của espresso và
                  sự ngọt ngào, mềm mại của sữa, tạo nên một trải nghiệm thú vị
                  cho vị giác. Lớp bọt sữa mịn, như một lớp kem nhẹ nhàng, không
                  chỉ làm tăng thêm hương vị mà còn tạo ra một cảm giác thư giãn
                  khi thưởng thức.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <IoPersonCircleOutline className="text-4xl" />
                  <span className="text-xl">Anh Phát:</span>

                  <div className="font-bold text-2xl flex items-center gap-2">
                    <FaStar className="text-yellow-500 " />
                    <p>6/10</p>
                  </div>
                </div>
                <p className="font-light">
                  Thật tiếc khi phải nói rằng cà phê pha sẵn này không đáp ứng
                  được kỳ vọng. Mặc dù được quảng cáo là có hương vị đậm đà và
                  thơm ngon, nhưng thực tế, nó lại thiếu đi độ sâu của hương vị
                  và cảm giác tươi mới mà một tách cà phê thực sự mang lại. Vị
                  cà phê hơi nhạt và có cảm giác như bị pha loãng quá mức, làm
                  mất đi sự mạnh mẽ của hạt cà phê.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
