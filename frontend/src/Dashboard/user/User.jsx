import React, { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  PlayCircle,
  Download,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Mail,
  Lock,
  LayoutDashboard,
  Plus,
  Pencil,
  Trash2,
  Hamburger,
  HamburgerIcon,
  HamIcon,
} from "lucide-react";
import "./user.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
const navLinks = [
  { href: "#quran-search", label: "Quran Search" },
  { href: "#library", label: "Library" },
  { href: "#lectures", label: "Lectures" },
];

const User = () => {
  const [isopen, setisopen] = useState(false);
  const [book, setbook] = useState([]);
  const [select, setselect] = useState("all");
  const [lecture, setlecture] = useState([]);
  const [selectlec, setselectlec] = useState("all");
  const filteredBook =
    select === "all" ? book : book.filter((item) => item.category === select);

  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      console.log(response.data.message);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const getbook = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/books/get",
        {},
        {
          withCredentials: true,
        },
      );
      setbook(response.data.books);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getlecture = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/lectures/get",
        {},
        {
          withCredentials: true,
        },
      );
      console.log(response.data.lectures);
      setlecture(response.data.lectures);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const filteredlecture =
    selectlec === "all"
      ? lecture
      : lecture.filter((lec) => lec.category === selectlec);
  console.log(filteredlecture);
  useEffect(() => {
    getbook();
    getlecture();
  }, []);

  const toggle = async () => {
    setisopen((prev) => !prev);
  };
  return (
    <div>
      <div className="nav2">
        <div className="left">
          <BookOpen className="book" />
          <h1>Hidayah</h1>
        </div>
        <div className={isopen ? "active" : "middle"}>
          {navLinks.map((a, idx) => {
            return (
              <a href={a.href} key={idx} className="a">
                {" "}
                {a.label}{" "}
              </a>
            );
          })}
        </div>
        <div className="right">
          <div className="hamburger" onClick={toggle}>
            {isopen ? <X /> : <Menu />}
          </div>
          <button onClick={logout} className="logout">
            <LogOut />
            Logout
          </button>
        </div>
      </div>

      {/* hero section */}
      <Hero />

      {/* digital library */}
      <div className="category" id="library">
        <span className="categorysp">Digital library</span>
        <h1 className="categoryh1">Free books, always downloadable</h1>
        <div className="button4">
          <button className="btn6" onClick={() => setselect("all")}>
            All
          </button>
          <button className="btn7" onClick={() => setselect("seerah")}>
            Seerah
          </button>
          <button className="btn8" onClick={() => setselect("history")}>
            History
          </button>
          <button className="btn9" onClick={() => setselect("fiqh")}>
            Fiqh
          </button>
          <button className="btn10" onClick={() => setselect("politics")}>
            Politics
          </button>
        </div>
      </div>
      <div className="grid">
        {filteredBook.map((bk) => {
          return (
            <div className="box" key={bk.id}>
              <div className="icon6">
                <BookOpen />
              </div>
              <span> {bk.category} </span>
              <p> {bk.speaker} </p>
              <h3> {bk.title} </h3>
              <h5>{bk.description}</h5>
              <div className="button8">
                <p> {bk.page} </p>

                <button className="url">
                  <a href={bk.read}>
                    {" "}
                    <Download /> Read More
                  </a>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* lecures */}
      <div className="category" id="lectures">
        <span className="categorysp">Lectures</span>
        <h1 className="categoryh1">Watch and learn, at your own pace</h1>
        <div className="button4">
          <button className="btn6" onClick={() => setselectlec("all")}>
            All
          </button>
          <button className="btn7" onClick={() => setselectlec("seerah")}>
            Seerah
          </button>
          <button className="btn8" onClick={() => setselectlec("youth")}>
            youth
          </button>
          <button className="btn9" onClick={() => setselectlec("history")}>
            history
          </button>
          <button className="btn10" onClick={() => setselectlec("politics")}>
            Politics
          </button>
        </div>
      </div>

      <div className="grid2">
        {filteredlecture.map((lec) => {
          const embedUrl = lec.link.replace("watch?v=", "embed/");
          return (
            <div className="lecture" key={lec.id}>
              <div className="box2">
                <iframe
                  className="iframe"
                  src={embedUrl}
                  title={lec.title}
                  allowFullScreen
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
              <div className="titles">
                <span> {lec.category} </span>
                <h3> {lec.title} </h3>
                <p> {lec.speaker} </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}

      <div className="footer">
        <div className="left">
          <BookOpen className="book" />
          <h1>Hidayah</h1>
        </div>
        <p className="footerp">
          A place to search, read, and learn about deen <br /> the Quran, free
          books, and lectures, always free.
        </p>
        <div className="middle2">
          <span>Explore</span>
          <a href="#library">
            <p>Digital Libraray</p>
          </a>
          <a href="#lectures">
            <p>Lectures</p>
          </a>
        </div>
        <div className="right2">
          <span>About</span>
          <p>
            Built as a free, ad-free resource for learning. No payments, no
            enrollment just open the page and start reading.
          </p>
        </div>

        <div className="bottom">
          © 2026 Hidayah. Built for the sake of Allah.
        </div>
      </div>
    </div>
  );
};

export default User;
