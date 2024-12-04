import React, { useState } from "react";
import CardGift from "./cardGift";

const dataFake = [
  {
    gift_id: 1,
    gift_name: "Keychain with store logo",
    gift_point: 10,
    gift_state: "available",
    gift_image:
      "https://firebasestorage.googleapis.com/v0/b/btl-advanceprogram.appspot.com/o/Luxury%20leather%20notebook.jpg?alt=media&token=f76349f6-6948-4686-abb3-de8aaeaa1c46",
  },
  {
    gift_id: 1,
    gift_name: "Keychain with store logo",
    gift_point: 10,
    gift_state: "available",
    gift_image:
      "https://firebasestorage.googleapis.com/v0/b/btl-advanceprogram.appspot.com/o/Luxury%20leather%20notebook.jpg?alt=media&token=f76349f6-6948-4686-abb3-de8aaeaa1c46",
  },
  {
    gift_id: 1,
    gift_name: "Keychain with store logo",
    gift_point: 10,
    gift_state: "available",
    gift_image:
      "https://firebasestorage.googleapis.com/v0/b/btl-advanceprogram.appspot.com/o/Vintage%20wooden%20photo%20frame.jpg?alt=media&token=3b15664d-edfc-48cd-ad1c-a43fc35a11dc",
  },
  {
    gift_id: 1,
    gift_name: "Keychain with store logo",
    gift_point: 10,
    gift_state: "available",
    gift_image:
      "https://firebasestorage.googleapis.com/v0/b/btl-advanceprogram.appspot.com/o/Luxury%20leather%20notebook.jpg?alt=media&token=f76349f6-6948-4686-abb3-de8aaeaa1c46",
  },
];

export default function gift() {
  const [gifts, setGift] = useState(dataFake);
  const [phone, setPhone] = useState("");
  const [point, setPoint] = useState("");

  const handlephone = () => {
    alert(phone);
  };

  function CheckPhone(e) {
    e.preventDefault();
    handlephone();
  }

  return (
    <>
      <div>
        <form onSubmit={CheckPhone} className="flex items-center gap-2">
          <label htmlFor="phone" className="text-2xl">
            Nhập phonenumber của khách:
          </label>
          <input
            required
            type="number"
            value={phone}
            id="phone"
            name="phone"
            className=" p-2 border border-gray-300 rounded "
            placeholder="0795759610 ......."
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit" className=" bg-blue-500 text-white rounded p-2">
            Check
          </button>
        </form>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 px-10 mt-4 ">
        {gifts.length === 0 ? (
          <p className="text-center text-gray-500">No gifts found</p>
        ) : (
          gifts.map((gift) => {
            return <CardGift data={gift} />;
          })
        )}
      </div>
    </>
  );
}
