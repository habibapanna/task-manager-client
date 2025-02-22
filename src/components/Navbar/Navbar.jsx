import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider"; // Import Auth Context

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user & logout function

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-task"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          Add Task
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-task"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700"
          }
        >
          Manage Task
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar sticky top-0 z-50 bg-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-serif flex items-center">
            <img
              className="w-8 h-8"
              src="https://i.postimg.cc/vBXxfGqF/task-management.png"
              alt=""
            />
            taskco
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt="H"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-800">{user.displayName}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
