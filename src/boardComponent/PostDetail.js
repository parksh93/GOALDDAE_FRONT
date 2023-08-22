import React from "react";

const PostDetail = ({ boardDetail, userInfo }) => {



  return (
    <div>
      <h1>글 상세 페이지</h1>
      <h2>작성자: {boardDetail.writer}</h2>
      <h2>글 제목: {boardDetail.title}</h2>
      <p>글 내용: {boardDetail.content}</p>
      <p>작성일: {boardDetail.writeDate}</p>
      <p>작성시간: {boardDetail.updateDate}</p>
      <img src={boardDetail.img1} alt="이미지" />

    </div>
  );
};

export default PostDetail;
