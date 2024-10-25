import { useState, useEffect } from "react";
import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useTable } from "react-table";
import axios from "axios";
import { useLoginState } from "../../../Recoil/User/useLoginState";
import { useNavigate } from "react-router-dom";
import { useToastState } from "../../../Recoil/Error/useToastState";
import { useLoadingState } from "../../../Recoil/Loading/useLoadingState";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";

function AdminShop() {
  const [data, setData] = useState([]);
  const defaultValues = {};
  const [formData, setFormData] = useState(defaultValues);
  const { isLoggedIn, setIsLoggedIn } = useLoginState();
  const navigate = useNavigate();
  const { toastMsg, setToastMsg } = useToastState();
  const { isLoading, setIsLoading } = useLoadingState();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addItem(formData);
    await getItems();
  }

  const Logout = () => {
    if (isLoggedIn === true) {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
      setToastMsg({ isError: false, message: "You have successfully logged out." });
    }
  };

  const getItems = async () => {
    setIsLoading(true);
    await axios
      .get("https://dummyjson.com/products") // Fetch products from DummyJSON
      .then((resp) => {
        setData(resp.data.products); // Assuming the data comes under 'products'
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          Logout();
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getItems();
  }, []);

  const deleteItem = async (product_id) => {
    setIsLoading(true);
    await axios
      .delete(`https://dummyjson.com/products/${product_id}`) // Simulate product deletion
      .then((resp) => {
        setToastMsg({ isError: false, message: "Product deleted successfully" });
        getItems(); // Refresh product list after deletion
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const addItem = async (formData) => {
    setIsLoading(true);
    await axios
      .post("https://dummyjson.com/products/add", formData) // Simulate product creation
      .then((resp) => {
        setToastMsg({ isError: false, message: "Product added successfully" });
        setFormData(defaultValues);
      })
      .catch((err) => {
        setToastMsg({ isError: true, message: err.response.data.message });
      })
      .finally(() => setIsLoading(false));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        Cell: ({ row }) => (
            <img
                src={row.original.thumbnail} 
                alt={row.original.title} 
                className="h-20 w-20 object-cover rounded-full"
            />
        ),
      },
      {
        Header: "Name",
        accessor: "title", 
      },
      {
        Header: "Price",
        Cell: ({ row }) => (
            <span className="text-white">{row.original.price}$</span>
        ),
      },
      {
        Header: "Delete",
        Cell: ({ row }) => (
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold"
            onClick={() => deleteItem(row.original.id)} 
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <MainLayout>
      <Link
        to="/admin"
        className="fixed top-28 left-12 lg:left-28 hidden md:flex"
      >
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="text-4xl text-white hover:text-[#cda154]"
        />
      </Link>
      <div className="py-4 md:py-8 flex flex-col md:flex-row gap-8 justify-center items-center">
        <table
          {...getTableProps()}
          className="border-[1.6px] border-white text-center"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="bg-black py-2 text-white font-bold"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="p-3 border-[1.6px] text-white"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="w-80 border-[1.6px] py-4 px-8 rounded-xl">
          <h1 className="text-white text-lg text-center">Add Product</h1>
          <form
            className="py-4 flex flex-col gap-3"
            autoComplete="off"
            noValidate
          >
            <InputField
              name="title" 
              label="Name"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <InputField
              name="price"
              label="Price"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
              type="file"
              name="productImage"
              className="text-white text-sm"
              onChange={(e) => handleChange(e.target.name, e.target.files[0])}
            />
            <Button
              name="Add"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminShop;
