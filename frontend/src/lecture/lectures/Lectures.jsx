import React from "react";
import "./lecture.css";
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
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Lectures = () => {
  const [lectures, setlectures] = useState([]);
  const [addlecture, setaddlecture] = useState(false);
  const [title, settitle] = useState("");
  const [speaker, setspeaker] = useState("");
  const [read, setread] = useState("");
  const [category, setcategory] = useState("");
  const [link, setlink] = useState("");
  const [description, setdescription] = useState("");
  const [message, setmessage] = useState("");
  const [editlecture, seteditlecture] = useState(false);
  const [editid, seteditid] = useState(null);
  const getlectures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/lectures/get",
        {
          withCredentials: true,
        },
      );
      setlectures(response.data.lectures);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getlectures();
  }, []);

  const lecturepostapi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/lectures/add",
        {
          title,
          speaker,
          category,
          link,
          description,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Lecture Added Sucessfully");
      setmessage(response.data.message);
      // the spreak operator is used here for example it is the old array copy and then you are pushing the new array to it to show
      setlectures((lectures) => [...lectures, response.data.lectures]);
      settitle("");
      setspeaker("");
      setcategory("");
      setlink("");
      setdescription("");
      setTimeout(() => {
        setaddlecture(false);
      }, 1000);
    } catch (err) {
      console.log(err.response.data.messsage);
      setmessage(err.response.data.messsage);
    }
  };

  const dltlecture = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/lectures/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      setTimeout(() => {
        alert("Lecture Deleted Successfully");
        setlectures(lectures.filter((lc) => lc._id !== id));
      }, 500);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const editlectures = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/lectures/update/${editid}`,
        {
          title,
          speaker,
          category,
          link,
          description,
        },
        {
          withCredentials: true,
        },
      );

      setmessage(response.data.message);

      const updatedlecture = response.data.updatelectures;
      setlectures(
        lectures.map((lc) => (lc._id === editid ? updatedlecture : lc)),
      );
      settitle("");
      setspeaker("");
      setcategory("");
      setlink("");
      setdescription("");

      setTimeout(() => {
        seteditlecture(false);
        setmessage("");
      }, 1000);
    } catch (err) {
      console.log(err.response.data.message);
      setmessage(err.response.data.message);
    }
  };
  return (
    <div>
      {/* lectures add  */}
      <div className="add">
        <p>Lectures</p>
        <div className="buttons2">
          <Plus className="icon " />
          <button className="btn3" onClick={() => setaddlecture(true)}>
            Add Lecture
          </button>
        </div>
      </div>{" "}
      {addlecture && (
        <div className="form">
          <div className="title2">
            <h3>Add lecture:</h3>
            <button className="close" onClick={() => setaddlecture(false)}>
              <X />
            </button>
          </div>
          <form onSubmit={lecturepostapi}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="speaker"
              value={speaker}
              onChange={(e) => setspeaker(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Link URL"
              value={link}
              onChange={(e) => setlink(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            {message && (
              <p style={{ padding: "10px", color: "black" }}>{message}</p>
            )}
            <button className="submit">Add Lecture</button>
          </form>
        </div>
      )}
      {editlecture && (
        <div className="form">
          <div className="title2">
            <h3>edit lecture:</h3>
            <button className="close" onClick={() => seteditlecture(false)}>
              <X />
            </button>
          </div>
          <form onSubmit={editlectures}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="speaker"
              value={speaker}
              onChange={(e) => setspeaker(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Link URL"
              value={link}
              onChange={(e) => setlink(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            {message && (
              <p style={{ padding: "10px", color: "black" }}>{message}</p>
            )}
            <button className="submit">edit Lecture</button>
          </form>
        </div>
      )}
      {lectures.map((lecture) => {
        return (
          <div className="main" key={lecture._id}>
            <div className="left">
              <div className="icon3">
                <PlayCircle />
              </div>
              <div className="title">
                <h3> {lecture.title} </h3>
                <p>
                  {" "}
                  {lecture.category} + {lecture.speaker}{" "}
                </p>
              </div>
            </div>
            <div className="right">
              <Pencil
                className="pencil"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  seteditlecture(true);
                  seteditid(lecture._id);
                }}
              />
              <Trash2
                className="trash"
                style={{ cursor: "pointer" }}
                onClick={() => dltlecture(lecture._id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lectures;
