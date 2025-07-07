import React, { useEffect, useState } from "react";
import "../App.css";
import Header from "../components/Header";

//const SORT_STATES = ["none", "asc", "desc"];

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [sortConfig, setSortConfig] = useState(() => {
    const saved = localStorage.getItem("sortConfig");
    return saved ? JSON.parse(saved) : { key: "", direction: "none" };
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.slice(0, 500)));
  }, []);

  useEffect(() => {
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [sortConfig]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = "asc";
      if (prev.key === key && prev.direction === "asc") direction = "desc";
      else if (prev.key === key && prev.direction === "desc")
        direction = "none";
      else if (prev.key === key && prev.direction === "none") direction = "asc";
      else direction = "asc";
      return { key: direction === "none" ? "" : key, direction };
    });
  };

  const filteredData = () => {
    return comments.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortedData = () => {
    const data = filteredData();
    if (sortConfig.direction === "none") return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const paginatedData = () => {
    const start = (currentPage - 1) * pageSize;
    return sortedData().slice(start, start + pageSize);
  };

  const totalPages = Math.ceil(filteredData().length / pageSize);

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="table-header">
          <div className="sort-list-container">
            <div className="sort" onClick={() => handleSort("postId")}>
              <span>Sort Post ID</span>
              <img src="/unfold.png" alt="arrow" />
            </div>

            <div className="sort" onClick={() => handleSort("name")}>
              <span>Sort Name</span> <img src="/unfold.png" alt="arrow" />
            </div>

            <div className="sort" onClick={() => handleSort("email")}>
              <span>Sort Email</span> <img src="/unfold.png" alt="arrow" />
            </div>
          </div>
          <div className="search-container">
            <img src="/search_icon.png" className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, comment"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData().map((comment) => (
              <tr key={comment.id}>
                <td>{comment.postId}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td>{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>
            {Math.min((currentPage - 1) * pageSize + 1, filteredData().length)}-
            {Math.min(currentPage * pageSize, filteredData().length)} of{" "}
            {filteredData().length} items
          </span>
          <div className="page-controls">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
              {"<"}
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              {">"}
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
            >
              <option value={10}>10/page</option>
              <option value={20}>20/page</option>
              <option value={50}>50/page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
