import Toolbar from '@mui/material/Toolbar';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AdminDeleteModal from "./BoardModal";
import {AiOutlineCheck, AiOutlineClose} from 'react-icons/ai'
import ReplyModal from './ReplyModal';

function ReplyTableToolbar(props) {
    const { numSelected, approvalReplyReport, notApprovalReplyReport } = props;
    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
  
    return (
      <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
              bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
      }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
            {numSelected}개 선택
          </Typography>
        ) : 
        (
            <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
          </Typography>
        )
        }
  
        {numSelected === 0 ? ""
         : 
          <>
            <Tooltip title="승인">
            <IconButton>
              <AiOutlineCheck onClick={() => {
                  setModalTitle("승인");
                  setModalContent("승인시 해당 댓글이 표시되지 않습니다.");
                  setOpenModal(true)
                }
              } />
            </IconButton>
          </Tooltip>
            <Tooltip title="미승인" sx={{float: "right"}}>
          <IconButton>
              <AiOutlineClose onClick={() => {
                 setModalTitle("미승인");
                 setModalContent("신고를 거절합니다.");
                setOpenModal(true)
              }} />
          </IconButton>
          </Tooltip>
          </>
        }
      </Toolbar>
      <ReplyModal 
        modalOpen={openModal} 
        setModalOpen={setOpenModal} 
        modalTitle={modalTitle} 
        modalContent={modalContent}
        approvalReplyReport={approvalReplyReport}
        notApprovalReplyReport={notApprovalReplyReport}
      />
      </>
    );
  }

export default ReplyTableToolbar;