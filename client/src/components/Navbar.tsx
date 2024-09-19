import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "../api/user";
import toast from "react-hot-toast";

export const Navbar = () => {
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };
  return (
    <nav className="flex justify-between items-center pb-4 border-b border-gray-600">
      <div className="flex items-center gap-4">
        <Bookmark className="h-10 w-10 text-primary" />
        <h2 className="font-bold text-white text-3xl">My bookmarks</h2>
      </div>
      <div className="space-x-5">
        <button className="btn btn-primary"><Link to={"/new"}>Add Resource</Link></button>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};
