import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import BoardListPage from "./listPage/BoardListPage";
import BoardWritePage from "./writePage/BoardWritePage";
import BoardEditPage from "./writePage/BoardEditPage";
import BoardDetailPage from "./detailPage/BoardDetailPage";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NaviBar from "../auth/page/main/naviBar/NaviBar";
import Footer from "../auth/footer/Footer";
import { useLocation } from 'react-router-dom'; 
import Loading from "../loading/Loading";
const BoardMainPage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 1000); 
}, [location]);

  return (
    <div>
      <NaviBar />
      {isLoading ? (
      <div style={{ marginTop:'100px', marginLeft:'29%', left: "0px", width: "40%", height:"30%", zIndex:"9999"}}>
        <Loading />
      </div>
      ) : (
      <>
      <Link to={`/board`}>
        <h2 style={{marginLeft : '20%',marginTop:"40px", color : '#333333'}}><ChevronRightIcon /> 자유게시판</h2>
      </Link>
      <Routes>
        <Route path="/" element={<BoardListPage />} />
        <Route path="/detail/:id" element={<BoardDetailPage />} />
        <Route path="/write" element={<BoardWritePage />} />
        <Route path="/edit/:id" element={<BoardEditPage />} />
      </Routes>
      <Footer />
      </>)}
    </div>
  );
};

export default BoardMainPage;