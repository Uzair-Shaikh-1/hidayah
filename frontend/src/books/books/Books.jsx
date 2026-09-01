import React from "react";
import "./books.css";
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
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Books = () => {
  const [addnewbook, setnewaddbook] = useState(false);
  const [books, setbooks] = useState([]);
  const [addbook, setaddbook] = useState(false);
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [read, setread] = useState("");
  const [category, setcategory] = useState("");
  const [page, setpage] = useState("");
  const [description, setdescription] = useState("");
  const [message, setmessage] = useState("");
  const [editid, seteditid] = useState(null);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books/get", {
        withCredentials: true,
      });

      setbooks(response.data.books);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  const deleteBtn = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/books/delete/${id}`,
        {
          withCredentials: true,
        },
      );

      setTimeout(() => {
        alert("Book deleted Successfully");
        setbooks(books.filter((book) => book._id !== id));
      }, 500);
    } catch (err) {
      console.log(err.response?.data?.data);
    }
  };

  const editbooks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/books/update/${editid}`,
        {
          title,
          author,
          read,
          description,
          category,
          page,
        },
        {
          withCredentials: true,
        },
      );
      const updatedBook = response.data.book;

      setbooks((prevbooks) =>
        prevbooks.map((b) => (b._id === editid ? updatedBook : b)),
      );
      setmessage("Book Edited Successfully");
      settitle("");
      setauthor("");
      setcategory("");
      setpage("");
      setread("");
      setdescription("");

      setTimeout(() => {
        setaddbook(false);
      }, 1000);
    } catch (err) {
      console.log(err.response?.data);
      setmessage(err.response?.data?.message || "Failed to add book");
    }
  };

  const addbooks = async (e) => {
    e.preventDefault();
    setmessage("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/books/add",
        {
          title,
          author,
          page,
          category,
          read,
          description,
        },
        {
          withCredentials: true,
        },
      );
      setmessage("Book added successfully!");
      settitle("");
      setauthor("");
      setcategory("");
      setpage("");
      setread("");
      setdescription("");

      console.log(response.data.book);
      const updatedbook = response.data.book;

      setbooks((prevbook) => [...prevbook, response.data.book]);

      setTimeout(() => {
        setnewaddbook(false);
        setmessage("");
      }, 1500);
    } catch (err) {
      console.log(err.response?.data);
      setmessage(err.response?.data?.message || "Failed to add book");
    }
  };
  return (
    <div>
      <div>
        <div className="add">
          <p>Books</p>
          <div className="buttons2">
            <Plus className="icon " />
            <button className="btn3" onClick={() => setnewaddbook(true)}>
              Add Book
            </button>
          </div>
        </div>

        {addnewbook && (
          <div className="form">
            <div className="title2">
              <h3>Add Book:</h3>
              <button className="close" onClick={() => setnewaddbook(false)}>
                <X />
              </button>
            </div>
            <form onSubmit={addbooks}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setauthor(e.target.value)}
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
              <input
                type="text"
                placeholder="Pages"
                value={page}
                onChange={(e) => setpage(e.target.value)}
              />
              <input
                type="text"
                placeholder="PDF URL"
                value={read}
                onChange={(e) => setread(e.target.value)}
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
              <button className="submit">Add Book</button>
            </form>
          </div>
        )}
      </div>

      {addbook && (
        <div className="form">
          <div className="title2">
            <h3>EditBook:</h3>
            <button className="close" onClick={() => setaddbook(false)}>
              <X />
            </button>
          </div>
          <form onSubmit={editbooks}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setauthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Pages"
              value={page}
              onChange={(e) => setpage(e.target.value)}
            />
            <input
              type="text"
              placeholder="PDF URL"
              value={read}
              onChange={(e) => setread(e.target.value)}
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
            <button className="submit">Edit Book</button>
          </form>
        </div>
      )}
      {books.map((book) => {
        return (
          <div className="main" key={book._id}>
            <div className="left">
              <div className="icon3">
                <BookOpen />
              </div>
              <div className="title">
                <h3> {book.title} </h3>
                <p>
                  {" "}
                  {book.category} + {book.author}{" "}
                </p>
              </div>
            </div>
            <div className="right">
              <Pencil
                className="pencil"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  seteditid(book._id);
                  setaddbook(true);
                }}
              />
              <Trash2
                className="trash"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteBtn(book._id);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Books;
