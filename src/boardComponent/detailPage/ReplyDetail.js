import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { formatDate } from '../dateUtils';
import styles from "./detailPage.module.css";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { grey } from "@mui/material/colors";
import { IconButton, TextField, Tooltip } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';

const ReplyDetail = ({ boardDetail, userInfo }) => {

    const [newReplyContent, setNewReplyContent] = useState("");
    const [newReplyParentId, setNewReplyParentId] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");
    const [reportReason] = React.useState("");

    useEffect(() => {   
        axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
        })
        .catch(() => {
        });

         
        }, [boardDetail, userInfo]);

    const handleReplySubmit = () => {
        const requestData = {
          boardId: boardDetail.id,
          userId: userInfo.id,
          writer: userInfo.nickname, 
          content: newReplyContent,
          parentId: newReplyParentId,
        };
    
        axios.post("/reply/save", requestData).then(() => {
          // 댓글 작성 완료 후 댓글 목록을 다시 불러옴
          axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
          });
    
          // 댓글 작성 내용 초기화
          setNewReplyContent("");
          setNewReplyParentId(0);
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
        if(editingCommentId == commentId){
          setEditingCommentId(null);
          setEditedCommentContent("");
        } else {
          setEditingCommentId(commentId);
          setEditedCommentContent(content);
        }
      };

      const handleReport = (replyId, userId) => {
        const reason = window.prompt("신고 사유를 입력하세요:", reportReason);
        if (reason !== null) {
          const requestData = {
            replyId: replyId,
            reporterUserId: userInfo.id,
            reportedUserId: userId,
            reason: reason
          };
          // 댓글 신고 요청 처리
          axios.post(`/board/report`, requestData).then(() => {
            // 처리 후 작업 수행
          });
        }
      };
    



      return (
        <div>
          <br/>
          <h3>댓글 목록</h3>                 
          {replyList.map((reply) => (
            <div key={reply.id}>              
              {reply.status === 1
                  ? <span>(삭제된 댓글입니다)</span>
                  : reply.status === 2
                  ? <span>(관리자에 의해 삭제된 댓글입니다)</span>
                  : (
                    <>
                    <table className={styles.replyTable}>
                    <tr>
                    <td className={styles.author}
                    onClick={() => newReplyParentId !== reply.id ? setNewReplyParentId(reply.id) : setNewReplyParentId(0)}>
                      {reply.writer}
                    </td>
                    <td className={styles.info}>{formatDate(reply.writeDate)}</td>                
                    <td className={styles.replyButtons}>                  
                      {userInfo.id === reply.userId && (
                    <>
                      {/* 수정 버튼 */}
                      <button onClick={() => handleEditClick(reply.id, reply.content)}>
                        수정
                      </button>
                      {/* 삭제 버튼 */}
                      <button onClick={() => handleDelete(reply.id)}>삭제</button>
                    </>
                  )}
                  {userInfo.id !== reply.userId &&
                    <button onClick={handleReport(reply.id, reply.userId)} className={styles.detailButton}>
                      신고
                    </button>
                   }
                    </td>
                  </tr>
                  <tr>
                    <td onClick={() => newReplyParentId !== reply.id ? setNewReplyParentId(reply.id) : setNewReplyParentId(0)}
                     colSpan="3" className={styles.replyContent}>{reply.content}</td>
                  </tr>
                  </table>
                  </>
                  )}
              {/* 수정 폼 */}
              {editingCommentId === reply.id && (
                <div>
                  <tr>
                    <td className={styles.textArea}>
                      <TextField
                    color="success"
                    multiline
                    rows={2}
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    fullWidth label="수정" id="fullWidth" />
                    </td>
                    <td>
                      <Tooltip title="수정하기">
                        <SendIcon  className={styles.sendIcon}
                          onClick={() => handleEditSubmit(reply.id, editedCommentContent)}
                          fontSize="large"
                          color="success"/>                 
                      </Tooltip>                      
                    </td>
                  </tr>                                    
                </div>
              )}
              {reply.children &&
                reply.children.map((child) => (
                  <div key={child.id}>
                    <table className={styles.rrTable}>
                    <tr>
                    <td rowSpan={2} className={styles.arrowIcon}>
                      <SubdirectoryArrowRightIcon sx={{color : grey[850]}} />
                    </td>
                    <td className={styles.author}>{child.writer}</td>
                    <td className={styles.info}>{formatDate(child.replyWriteDate)}</td>                
                    <td className={styles.replyButtons}>
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
                    {userInfo.id !== child.userId &&
                      <button onClick={handleReport(child.id, child.userId)} className={styles.detailButton}>
                        신고
                      </button>
                     }
                    </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className={styles.replyContent}>{child.content}</td>
                    </tr>        
                    </table>
                    {editingCommentId === child.id && (
                        <div>
                          <tr>
                            <td className={styles.textArea}>
                              <TextField
                            color="success"
                            multiline
                            rows={2}
                            value={editedCommentContent}
                            onChange={(e) => setEditedCommentContent(e.target.value)}
                            fullWidth label="수정" id="fullWidth" />
                            </td>
                            <td>
                              <Tooltip title="수정하기">
                                <SendIcon  className={styles.sendIcon}
                                  onClick={() => handleEditSubmit(child.id, editedCommentContent)}
                                  fontSize="large"
                                  color="success"/>                 
                              </Tooltip>                      
                            </td>
                          </tr>                                    
                        </div>                  
                    )}
                  </div>
                ))}
              {/* 답글 폼 */}
              {newReplyParentId === reply.id && (
                  <div>
                    <tr>
                      <td className={styles.textArea}>
                        <TextField
                      color="success"
                      multiline
                      rows={2}
                      value={newReplyContent}
                      onChange={(e) => setNewReplyContent(e.target.value)}
                      fullWidth label="답글 작성" id="fullWidth" />
                      </td>
                      <td>
                        <Tooltip title="답글쓰기">
                          <SendIcon  className={styles.sendIcon}
                            onClick={() => handleReplySubmit()}
                            fontSize="large"
                            color="success"/>                 
                        </Tooltip>                      
                      </td>
                    </tr>                                    
                  </div>   
              )}            
            </div>            
          ))}
          {/* 댓글 작성 폼 */}
          <br/>
          <hr className={styles.separator} />
          {newReplyParentId === 0 && (
                <div>
                <tr>
                  <td className={styles.textArea}>
                    <TextField
                  color="success"
                  multiline
                  rows={2}
                  value={newReplyContent}
                  onChange={(e) => setNewReplyContent(e.target.value)}
                  fullWidth label="댓글 작성" id="fullWidth" />
                  </td>
                  <td>
                    <Tooltip title="댓글쓰기">
                      <SendIcon  className={styles.sendIcon}
                        onClick={() => handleReplySubmit()}
                        fontSize="large"
                        color="success"/>                 
                    </Tooltip>                      
                  </td>
                </tr>                                    
              </div>   
              )}            
        </div>
      );
    };

export default ReplyDetail;
