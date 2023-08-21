import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BoardDetailPage = () => {
  const { id } = useParams();
  const [userInfo] = useState({ id: 1 }); // 현재 읽고 있는 유저의 id, 임시로 1 할당

  const [boardDetail, setBoardDetail] = useState({});
  const [heartInfo, setHeartInfo] = useState({ heartCount: 0, hearted: false });

  const [replyList, setReplyList] = useState([]);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [newReplyParentId, setNewReplyParentId] = useState(null);

  useEffect(() => {
    // 글 상세정보를 가져오는 요청
    axios.get(`/board/detail/${id}`).then((response) => {
      setBoardDetail(response.data);
    });

    // 좋아요 정보를 가져오는 요청
    axios.post(`/board/heart`, { boardId: id, userId: userInfo.id }).then((response) => {
      setHeartInfo(response.data);
    });

    axios.get(`/reply/list/${id}`).then((response) => {
        setReplyList(response.data.replies);
      });

  }, [id, userInfo.id]);

  const handleDelete = () => {
    // 글 삭제 요청 처리
    axios.delete(`/board/${id}`).then(() => {
      // 삭제 완료 후 목록으로 이동
      window.location.href = "/board";
    });
  };

  const handleLike = () => {
    const requestData = { boardId: id, userId: userInfo.id };
  
    if (heartInfo.hearted) {
      // 좋아요 취소 요청 코드
      axios.delete(`/board/heart/delete`, { data: requestData }).then(() => {
        // 좋아요 취소 요청이 완료되면 좋아요 정보 다시 가져오기
        axios.post(`/board/heart`, requestData).then((response) => {
          setHeartInfo(response.data);
        });
      });
    } else {
      // 좋아요 추가 요청 코드
      axios.post(`/board/heart/save`, requestData).then(() => {
        // 좋아요 추가 요청이 완료되면 좋아요 정보 다시 가져오기
        axios.post(`/board/heart`, requestData).then((response) => {
          setHeartInfo(response.data);
        });
      });
    }
  };

  const handleReplySubmit = () => {
    const requestData = {
      boardId: id,
      userId: userInfo.id,
      writer: userInfo.id, // 임시로 userId 할당
      content: newReplyContent,
      parentId: newReplyParentId,
    };

    axios.post("/reply/save", requestData).then(() => {
      // 댓글 작성 완료 후 댓글 목록을 다시 불러옴
      axios.get(`/reply/list/${id}`).then((response) => {
        setReplyList(response.data.replies);
      });

      // 댓글 작성 내용 초기화
      setNewReplyContent("");
      setNewReplyParentId(null);
    });
  };


  return (
    <div>
      <h1>글 상세 페이지</h1>
      <h2>작성자: {boardDetail.writer}</h2>
      <h2>글 제목: {boardDetail.title}</h2>
      <p>글 내용: {boardDetail.content}</p>
      <p>작성일: {boardDetail.writeDate}</p>
      <p>작성시간: {boardDetail.updateDate}</p>
      <img src={boardDetail.img1} alt="이미지" />

      <p>좋아요 수: {heartInfo.heartCount}</p>
      <button onClick={handleLike}>
        {heartInfo.hearted ? "좋아요 취소" : "좋아요"}
      </button>

      {userInfo.id === boardDetail.userId && (
        <div>
          <Link to={`/board/edit/${id}`}>
            <button>글 수정</button>
          </Link>
          <button onClick={handleDelete}>글 삭제</button>
        </div>
      )}

      <Link to="/board">
        <button>목록으로 돌아가기</button>
      </Link>

      <h2>댓글 목록</h2>
      {replyList.map((reply) => (
        <div key={reply.id}>
          <p>
            작성자: {reply.writer}, 댓글 내용: {reply.content},
            작성일: {reply.writeDate}
            {reply.status === 1
              ? " (삭제된 댓글입니다)"
              : reply.status === 2
              ? " (관리자에 의해 삭제된 댓글입니다)"
              : ""}
          </p>
          {userInfo.id === reply.userId && (
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          )}
          {userInfo.id !== reply.userId && <button>신고</button>}
          <button onClick={() => setNewReplyParentId(reply.id)}>답글달기</button>
          {reply.children &&
            reply.children.map((child) => (
              <div key={child.id}>
                <p>
                  작성자: {child.writer}, 댓글 내용: {child.content},
                  작성일: {child.replyWriteDate}
                </p>
              </div>
            ))}
        </div>
      ))}
      <h2>댓글 작성</h2>
      <form>
        <textarea
          value={newReplyContent}
          onChange={(e) => setNewReplyContent(e.target.value)}
        ></textarea>
        <button type="button" onClick={handleReplySubmit}>
          댓글 작성
        </button>
      </form>



    </div>
  );
};

export default BoardDetailPage;
