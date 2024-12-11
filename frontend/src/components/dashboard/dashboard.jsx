import React, { useState } from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaProjectDiagram } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { setUser } from "../../redux/slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/operations/auth";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  // console.log("Before Log OUt USER....",user)


  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-md transition-all duration-300 ${isOpen ? "w-64" : "w-16"
        }`}
    >


      {/* Toggle Button */}
      <button
        className="absolute top-4 right-[-10px] bg-gray-200 p-2 rounded-full shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<" : ">"}
      </button>


      <div className="mt-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <FaHome size={20} />
          {isOpen && <span className="text-lg">Home</span>}
        </Link>

        <Link
          to="/dashboard/herosection"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <FaUser size={20} />
          {isOpen && <span className="text-lg">Profile</span>}
        </Link>

        <Link
          to="/dashboard/project"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <FaProjectDiagram size={20} />
          {isOpen && <span className="text-lg">Create Project</span>}
        </Link>

        <Link
          to="/dashboard/editprojects"
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <FaEdit size={20} />
          {isOpen && <span className="text-lg">Edit Projects</span>}
        </Link>

        <div
          className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => dispatch(logout(navigate))}
        >
          <MdLogout size={20} />
          {isOpen && <span className="text-lg">Logout</span>}
        </div>



      </div>
    </div>
  );
};

export default Dashboard;
