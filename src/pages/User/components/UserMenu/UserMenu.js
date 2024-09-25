import { Link } from "react-router-dom";
import { useUserState } from "../../../../Recoil/User/userState";

function UserMenu() {
  const { user, setUser } = useUserState();
  
  return (
    <div className="w-full flex flex-col gap-8 text-white justify-center items-center text-center">
      {user.role === "admin" && (
        <Link to="/admin" className="py-2.5 md:py-2 hover:bg-[#cda154] w-full">
          Admin Panel
        </Link>
      )}
      <Link
        to="/user/profile"
        className="py-2.5 md:py-2 hover:bg-[#cda154] w-full"
      >
        Profile
      </Link>
      <Link
        to="/user/orders"
        className="py-2.5 md:py-2 hover:bg-[#cda154] w-full"
      >
        My Orders
      </Link>
      <Link
        to="/user/edit"
        className="py-2.5 md:py-2 hover:bg-[#cda154] w-full"
      >
        Edit Information
      </Link>
    </div>
  );
}

export default UserMenu;
