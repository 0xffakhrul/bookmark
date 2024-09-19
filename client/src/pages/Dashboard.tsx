import { FC } from "react";
import { User } from "../types/api";
import { Navbar } from "../components/Navbar";
import { useGetBookmarks } from "../api/bookmark";
import { Link } from "react-router-dom";

interface DashboardProps {
  currentUser: User;
}

const Dashboard: FC<DashboardProps> = ({ currentUser }) => {
  if (currentUser) {
    console.log(currentUser);
  }

  const { data: bookmarks, isLoading, isError } = useGetBookmarks();

  console.log(bookmarks);

  return (
    <div className="py-6 px-8">
      <Navbar />
      <div className="grid grid-cols-2 py-4 gap-4">
        {bookmarks?.map((bookmark) => (
          <div className="space-y-2 hover:bg-gray-800 px-4 py-5">
            <h3 className="text-white text-2xl font-semibold cursor-pointer">
              <Link to={bookmark.url}>{bookmark.name}</Link>
            </h3>
            <p className="text-sm ">{bookmark.url}</p>
            <div className="flex gap-3 pt-2">
              {bookmark.tags.map((tag) => (
                <div className="bg-gray-700 px-2 py-1">
                  <p className="text-sm">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
