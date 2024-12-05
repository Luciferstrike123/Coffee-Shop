import React, { useEffect, useState } from "react";
import CardGift from "./cardGift";
import axios from "axios";

export default function gift() {
  const [gifts, setGift] = useState([]);
  const [phone, setPhone] = useState("");
  const [point, setPoint] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/gifts")
      .then((res) => {
        console.log(res.data);
        setGift(res.data);
        setLoading(false); // Stop loading
      })
      .catch((e) => {
        console.log(e);
        setLoading(false); // Stop loading
      });
  }, []);

  if (loading) {
    return (
      <div className="absolute left-1/2 top-1/3 ">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

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
