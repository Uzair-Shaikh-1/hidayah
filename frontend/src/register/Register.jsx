import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiPhone, FiSmartphone } from "react-icons/fi";
import axios from "axios";
import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password, number },
      );
      setmessage(response.data.message);

      setemail("");
      setpassword("");
      setnumber("");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (err) {
      setmessage(err.response?.data.message);
      setstatus(err.response?.status);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleRegister}>
        <h1>Create your account</h1>
        <p>Join Hidayah it's free</p>

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
        <div className="password">
          <FiSmartphone className="icon" />
          <input
            type="number"
            placeholder="Number"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
          />
        </div>

        <span style={{ padding: "10px", color: "black" }}>{message} </span>
        <button className="Sign" type="submit">
          Sign Up
        </button>

        <p className="last">
          Already have an account?
          <Link to="/login">
            <span style={{ cursor: "pointer", textDecoration: "none" }}>
              {" "}
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
