import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useUserState } from "../../Recoil/User/userState";
import { useLoginState } from "../../Recoil/User/useLoginState";
import { useToastState } from "../../Recoil/Error/useToastState";
import axios from "axios";
import { useLoadingState } from "../../Recoil/Loading/useLoadingState";

function User() {
    const location = useLocation();
    const { orderId } = useParams();
    const { user, setUser } = useUserState();
    const { setIsLoggedIn } = useLoginState();
    const { setToastMsg } = useToastState();
    const { setIsLoading, isLoading } = useLoadingState();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const userId = localStorage.getItem("user-id"); // Get the user ID from localStorage
            if (!userId) return; // Ensure user is logged in

            await axios
                .get(`https://dummyjson.com/auth/me`, {
                    headers: {
                        // "x-access-token": `${localStorage.getItem("access-token")}`,
                        'Authorization': `Bearer ${localStorage.getItem("access-token")}`,
                    },
                    credentials: 'include',
                })
                .then((resp) => {
                    setUser(resp.data);
                    if (resp.data.role === "admin") {
                        localStorage.setItem("isAdmin", true);
                    } else {
                        localStorage.removeItem("isAdmin");
                    }
                })
                .catch((err) => {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    setToastMsg({
                        isError: false,
                        message: "Your logout has been completed.",
                    });
                })
                .finally(() => setIsLoading(false));
        })();
    }, [location.pathname === "/user"]);

    return (
        <MainLayout>
            <div className="flex flex-col justify-center items-center py-4 px-4">
                <h1 className="text-2xl text-white pb-4">
                    {location.pathname === "/user" && "My Account"}
                    {location.pathname === "/user/profile" && "My Profile"}
                    {location.pathname === "/user/orders" && "My Orders"}
                    {location.pathname === `/user/orders/${orderId}` && "Order"}
                    {location.pathname === "/user/edit" && "Edit"}
                    {location.pathname === "/user/edit/password" && "Edit Password"}
                    {location.pathname === "/user/edit/email" && "Edit Email"}
                    {location.pathname === "/user/edit/address" && "Edit Address"}
                </h1>
                {/* Check if user is available */}
                {isLoading ? (
                    <h1 className="text-sm text-white pb-8">Loading user info...</h1>
                ) : user ? (
                    <h1 className="text-sm text-white pb-8">
                        Welcome <span className="text-[#cda154]">{user.firstName}</span>!
                    </h1>
                ) : (
                    <h1 className="text-sm text-white pb-8">User data not available</h1>
                )}

                <div className="w-full md:w-3/4 lg:w-1/2 flex h-96 border-[1.6px] rounded-xl">
                    <Outlet />
                </div>
            </div>
        </MainLayout>
    );
}

export default User;
