import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import BoardListPage from "./BoardListPage";
import BoardDetailPage from "./BoardDetailPage";
import BoardWritePage from "./BoardWritePage";
import BoardEditPage from "./BoardEditPage";

const BoardMainPage = () => {
  return (
    <div>
      <Link to={`/board`}>
        <h1>자유게시판</h1>
      </Link>
      <Routes>
        <Route path="/" element={<BoardListPage />} />
        <Route path="/detail/:id" element={<BoardDetailPage />} />
        <Route path="/write" element={<BoardWritePage />} />
        <Route path="/edit/:id" element={<BoardEditPage />} />
      </Routes>
    </div>
  );
};

export default BoardMainPage;