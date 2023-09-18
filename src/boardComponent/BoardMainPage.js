import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import BoardListPage from "./listPage/BoardListPage";
import BoardWritePage from "./writePage/BoardWritePage";
import BoardEditPage from "./writePage/BoardEditPage";
import BoardDetailPage from "./detailPage/BoardDetailPage";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NaviBar from "../auth/page/main/naviBar/NaviBar";

const BoardMainPage = () => {
  return (
    <div>
      <NaviBar />
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