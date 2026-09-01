import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import "./login.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://hidayah-c6un.vercel.app/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      setmessage(response.data.message);

      setemail("");
      setpassword("");
      if (response.data.user.role === "admin") {
        return navigate("/adminDashboard", { replace: true });
      }
      navigate("/user");
    } catch (err) {
      setmessage(err.response?.data.message);
      console.log(err.response?.data.message);
      setstatus(err.response?.data.status);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <p>Sign In to Your Hidayah Account</p>

        <div className="email">
          <CiMail className="icon" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="password">
          <IoLockClosedOutline className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <span style={{ padding: "10px", color: "black" }}>{message} </span>

        <button className="Sign">Sign Up</button>

        <p className="last">
          New Here?{" "}
          <Link style={{ textDecoration: "none" }} to="/register">
            <span>Create An Account</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
