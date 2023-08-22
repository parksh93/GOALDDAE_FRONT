import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ReplyDetail = ({ boardDetail, userInfo }) => {

    const [newReplyContent, setNewReplyContent] = useState("");
    const [newReplyParentId, setNewReplyParentId] = useState(null);
    const [replyList, setReplyList] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");

    useEffect(() => {
        
        axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
        })
        .catch(() => {
        });

         
        }, [boardDetail, userInfo]);

    const handleReplySubmit = (parentId) => {
        const requestData = {
          boardId: boardDetail.id,
          userId: userInfo.id,
          writer: userInfo.nickname, 
          content: newReplyContent,
          parentId: parentId,
        };
    
        axios.post("/reply/save", requestData).then(() => {
          // 댓글 작성 완료 후 댓글 목록을 다시 불러옴
          axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
          });
    
          // 댓글 작성 내용 초기화
          setNewReplyContent("");
          setNewReplyParentId(null);
        });
      };

      const handleEditSubmit = (id, updatedContent) => {
        // 댓글 수정 요청
        axios.put(`/reply/update`, {id : id, content: updatedContent }).then(() => {
          // 댓글 수정 후 댓글 목록을 다시 불러옴
          axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
          });
          setEditingCommentId(null);
          setEditedCommentContent("");
        });
      };
    
      const handleDelete = (id) => {
        // 댓글 삭제 요청
        axios.delete(`/reply/user/${id}`).then(() => {
          // 댓글 삭제 후 댓글 목록을 다시 불러옴
          axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
          });
        });
      };

      const handleEditClick = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditedCommentContent(content);
      };
    
      const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedCommentContent("");
      };
    



      return (
        <div>
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
                  {/* 수정 버튼 */}
                  <button onClick={() => handleEditClick(reply.id, reply.content)}>
                    수정
                  </button>
                  {/* 삭제 버튼 */}
                  <button onClick={() => handleDelete(reply.id)}>삭제</button>
                </div>
              )}
              {userInfo.id !== reply.userId && <button>신고</button>}
              <button onClick={() => setNewReplyParentId(reply.id)}>답글달기</button>
              {/* 수정 폼 */}
              {editingCommentId === reply.id && (
                <div>
                  <textarea
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(reply.id, editedCommentContent)}>확인</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              )}
              {reply.children &&
                reply.children.map((child) => (
                  <div key={child.id}>
                    <p>
                      작성자: {child.writer}, 댓글 내용: {child.content},
                      작성일: {child.replyWriteDate}
                    </p>
                    {/* 답글 수정 버튼 */}
                    {userInfo.id === child.userId && (
                      <div>
                        <button onClick={() => handleEditClick(child.id, child.content)}>
                          수정
                        </button>
                        {/* 답글 삭제 버튼 */}
                        <button onClick={() => handleDelete(child.id)}>삭제</button>
                      </div>
                    )}
                    {userInfo.id !== child.userId && <button>신고</button>}
                    {editingCommentId === child.id && (
                        <div>
                        <textarea
                            value={editedCommentContent}
                            onChange={(e) => setEditedCommentContent(e.target.value)}
                        />
                        <button onClick={() => handleEditSubmit(child.id, editedCommentContent)}>확인</button>
                        <button onClick={handleCancelEdit}>취소</button>
                        </div>
                    )}
                  </div>
                ))}
              {/* 답글 폼 */}
              {newReplyParentId === reply.id && (
                <div>
                  <textarea
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                  />
                  <button onClick={() => handleReplySubmit(reply.id)}>댓글 작성</button>
                </div>
              )}
            </div>
          ))}
          {/* 댓글 작성 폼 */}
          <h2>댓글 작성</h2>
          <form>
            <textarea
              value={newReplyContent}
              onChange={(e) => setNewReplyContent(e.target.value)}
            />
            <button type="button" onClick={() => handleReplySubmit(0)}>
              댓글 작성
            </button>
          </form>
        </div>
      );
    };

export default ReplyDetail;
