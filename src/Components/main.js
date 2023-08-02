import React, { useState } from "react";
import Card from "./card";
import axios from "axios";


const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");

  const searchBook = (required) => {
    if (required.key === "Enter" || required.type === "click") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&orderBy=" +
            sortOption +
            "&key=AIzaSyAL25xcqQwOdJXLjZZMaODvkK5nxO6RI5c" +
            "&maxResults=40"
        )
        .then((res) => {
          setData(res.data.items);
          const container = document.querySelector(".container");
          if (container) {
            container.scrollIntoView({ behavior: "smooth" });
          }
        });
    }
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>Find Your Book</h1>
        </div>
        <br></br>
        <div className="row2">
          <div className="search">
            <input
              id="inputsearch"
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(req) => setSearch(req.target.value)}
              onKeyPress={searchBook}
            />
            <button onClick={searchBook} style={{ cursor: "pointer" }}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {bookData.length > 0 && (
        <div className="sorting">
          <select value={sortOption} onChange={handleSortOptionChange}>
            <option value="relevance">Sort By</option>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      )}

      <div className="container">
        <Card book={bookData} />
      </div>

      {bookData.length > 0 && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default Main;
