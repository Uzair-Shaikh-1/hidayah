import "./admin.css";
import {
  LayoutDashboard,
  BookOpen,
  PlayCircle,
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Books from "../../books/books/Books";
import { useState } from "react";
import Lectures from "../../lecture/lectures/Lectures";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  const [activesection, setactivesection] = useState("book");
  const [addsection, setaddsection] = useState("book");

  return (
    <div>
      {/* navbar */}

      <div className="nav">
        <div className="title">
          <LayoutDashboard className="logo" />
          <h1>Hidayah Admin</h1>
        </div>
        <div className="logout">
          <LogOut />
          <button onClick={logout} className="logoutbtn">
            Logout
          </button>
        </div>
      </div>
      {/* end of navbar */}

      {/* dashboard side */}
      <div className="dash">
        <h2>Dashboard</h2>
        <p>Manage the library and lectures.</p>

        <div className="buttons">
          <button className="btn1" onClick={() => setactivesection("book")}>
            Books
          </button>
          <button className="btn2" onClick={() => setactivesection("lecture")}>
            Lectures
          </button>
        </div>
      </div>

      {/* main section */}
      {activesection === "book" && <Books />}
      {activesection === "lecture" && <Lectures />}
    </div>
  );
};

export default AdminDashboard;
