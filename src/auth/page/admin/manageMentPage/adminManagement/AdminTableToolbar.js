import AdminAddModal from "./AdminAddModal";
import Toolbar from '@mui/material/Toolbar';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AdminDeleteModal from "./AdminDeleteModal";

function AdminTableToolbar(props) {
    const { numSelected,onClickDeleteAdmin, getAdminList } = props;
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
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
              {/* <b>목록</b> */}
          </Typography>
        )
        }
  
        {numSelected > 0 ? (
            <Tooltip title="삭제">
            <IconButton>
              <DeleteIcon onClick={() => setOpenDeleteModal(true)}/>
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="추가" sx={{float: "right"}}>
          <IconButton>
              <PersonAddAltIcon onClick={() => setOpenAddModal(true)}/>
          </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <AdminAddModal modalOpen={openAddModal} setModalOpen={setOpenAddModal} getAdminList={getAdminList}/>
      <AdminDeleteModal modalOpen={openDeleteModal} setModalOpen={setOpenDeleteModal} onClickDeleteAdmin={onClickDeleteAdmin}/>
      </>
    );
  }

export default AdminTableToolbar;