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
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

const ReplyDetail = ({ boardDetail, userInfo }) => {

    const [newReplyContent, setNewReplyContent] = useState("");
    const [newReplyParentId, setNewReplyParentId] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [replyCount, setReplyCount] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");
    const [reportReason] = React.useState("");

    useEffect(() => {   
        axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
            setReplyCount(response.data.count);
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
            setReplyCount(response.data.count);
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
            setReplyCount(response.data.count);
          });
          setEditingCommentId(null);
          setEditedCommentContent("");
        });
      };
    
      const handleDelete = (id) => {
        const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
        if (confirmDelete) {
          // 댓글 삭제 요청
          axios.delete(`/reply/user/${id}`).then(() => {
          // 댓글 삭제 후 댓글 목록을 다시 불러옴
          axios.get(`/reply/list/${boardDetail.id}`).then((response) => {
            setReplyList(response.data.replies);
            setReplyCount(response.data.count);
          });
        });
        }
      };

      const handleEditClick = (commentId, content) => {
        if(editingCommentId === commentId){
          setEditingCommentId(null);
          setEditedCommentContent("");
        } else {
          setEditingCommentId(commentId);
          setEditedCommentContent(content);
        }
      };

      const handleReport = (replyId, userId) => {

        if(userId === 0){
          return;
        }

        const reason = window.prompt("신고 사유를 입력하세요:", reportReason);
        if (reason !== null) {
          const requestData = {
            replyId: replyId,
            reporterUserId: userInfo.id,
            reportedUserId: userId,
            reason: reason
          };
          // 댓글 신고 요청 처리
          axios.post(`/reply/report`, requestData).then(() => {
            // 처리 후 작업 수행
          });
        }
      };
    



      return (
        <div>
          <br/>
          <h3><TextsmsOutlinedIcon sx={{color : grey[800], marginBottom : "-4px", marginRight : "8px"}} />댓글 {replyCount}개</h3>                 
          {replyList.map((reply) => (
            <div key={reply.id}>              
              {reply.status === 1
                  ? <div className={styles.deletedReply}>(삭제된 댓글입니다)</div>
                  : reply.status === 2
                  ? <div className={styles.deletedReply}>(관리자에 의해 삭제된 댓글입니다)</div>
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
                      <Tooltip title="수정">
                          <IconButton size="large">
                            <EditIcon sx={{color : "#75956b"}} onClick={() => handleEditClick(reply.id, reply.content)} className={styles.replyButtons}/>             
                          </IconButton>                    
                      </Tooltip>
                      {/* 삭제 버튼 */}                      
                      <Tooltip title="삭제">
                          <IconButton size="large">
                            <DeleteIcon sx={{color : "#75956b"}} onClick={() => handleDelete(reply.id)} className={styles.replyButtons}/>             
                          </IconButton>                    
                      </Tooltip>
                    </>
                  )}
                  {userInfo.id !== reply.userId &&
                    <Tooltip title="신고">
                      <IconButton size="large" onClick={() => handleReport(reply.id, reply.userId)}>
                        <ReportIcon sx={{color : "#75956b"}} className={styles.replyButtons}/>             
                      </IconButton>                    
                    </Tooltip>
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
                          sx={{color : "#75956b"}}/>                 
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
                      <SubdirectoryArrowRightIcon sx={{color : grey[500]}} />
                    </td>
                    <td className={styles.author}>{child.writer}</td>
                    <td className={styles.info}>{formatDate(child.replyWriteDate)}</td>                
                    <td className={styles.replyButtons}>
                    {/* 답글 수정 버튼 */}
                    {userInfo.id === child.userId && (
                      <div>
                      {/* 수정 버튼 */}
                      <Tooltip title="수정">
                          <IconButton size="large">
                            <EditIcon sx={{color : "#75956b"}} onClick={() => handleEditClick(child.id, child.content)} className={styles.replyButtons}/>             
                          </IconButton>                    
                      </Tooltip>
                      {/* 삭제 버튼 */}                      
                      <Tooltip title="삭제">
                          <IconButton size="large">
                            <DeleteIcon sx={{color : "#75956b"}} onClick={() => handleDelete(child.id)} className={styles.replyButtons}/>             
                          </IconButton>                    
                      </Tooltip>
                      </div>
                    )}
                    {userInfo.id !== child.userId &&
                      <Tooltip title="신고">
                        <IconButton size="large" onClick={() => handleReport(child.id, child.userId)}>
                          <ReportIcon sx={{color : "#75956b"}} className={styles.replyButtons}/>             
                        </IconButton>                    
                      </Tooltip>
                     }
                    </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className={styles.replyContent}>{child.content}</td>
                    </tr>        
                    </table>
                    {/* 답글 수정 폼 */}
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
                                  sx={{color : "#75956b"}}/>                 
                              </Tooltip>                      
                            </td>
                          </tr>                                    
                        </div>                  
                    )}
                  </div>
                ))}
              {/* 답글 폼 */}
              {userInfo.id !== 0 && newReplyParentId === reply.id && (
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
                            sx={{color : "#75956b"}}/>                 
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
          {userInfo.id !== 0 && newReplyParentId === 0 && (
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
                        sx={{color : "#75956b"}}/>                 
                    </Tooltip>                      
                  </td>
                </tr>                                    
              </div>   
              )}            
        </div>
      );
    };

export default ReplyDetail;
