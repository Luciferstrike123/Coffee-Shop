import { useState, useEffect } from "react";
import React from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useTable } from "react-table";
import { useLoadingState } from "../../../Recoil/Loading/useLoadingState";
import { useToastState } from "../../../Recoil/Error/useToastState";
import { useLoginState } from "../../../Recoil/User/useLoginState";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
    const [data, setData] = useState([]);
    const { isLoading, setIsLoading } = useLoadingState();
    const { toastMsg, setToastMsg } = useToastState();
    const { isLoggedIn, setIsLoggedIn } = useLoginState();
    const navigate = useNavigate();

    const Logout = () => {
        if (isLoggedIn === true) {
            localStorage.clear();
            setIsLoggedIn(false);
            navigate("/");
            setToastMsg({ isError: false, message: "You have successfully logged out." });
        }
    };

    // Fetch users from DummyJSON
    const getUsers = async () => {
        setIsLoading(true);
        await axios
            .get("https://dummyjson.com/users") // DummyJSON users endpoint
            .then((resp) => {
                setData(resp.data.users); // Assuming the data comes under 'users'
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    Logout();
                }
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        getUsers();
    }, []);

    // Simulate user deletion (DummyJSON doesn't actually delete data)
    const deleteUser = async (user_id) => {
        setIsLoading(true);
        await axios
            .delete(`https://dummyjson.com/users/${user_id}`) // Simulated delete endpoint
            .then((resp) => {
                setToastMsg({ isError: false, message: "User deleted successfully" });
                getUsers(); // Refresh users after deletion
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "First name",
                accessor: "firstName", // Use firstName from DummyJSON
            },
            {
                Header: "Last name",
                accessor: "lastName", // Use lastName from DummyJSON
            },
            {
                Header: "E-mail",
                accessor: "email",
            },
            {
                Header: "Role", // You may need to define a role manually since DummyJSON doesn't have roles
                accessor: "role",
            },
            {
                Header: "Delete",
                Cell: ({ row }) => (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold"
                        onClick={() => deleteUser(row.original.id)} // Using 'id' from DummyJSON
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
            <div className="py-4 md:py-8 flex justify-center items-center">
                <table
                    {...getTableProps()}
                    className="border-[1.6px] border-white text-center"
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} >
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
            </div>
        </MainLayout>
    );
}

export default AdminUsers;
