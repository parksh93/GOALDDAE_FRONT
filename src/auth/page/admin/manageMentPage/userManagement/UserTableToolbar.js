import Toolbar from '@mui/material/Toolbar';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton'
import BlockIcon from '@mui/icons-material/Block';
import AdminDeleteModal from "./UserDeleteModal";

function UserTableToolbar(props) {
    const { numSelected } = props;
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
          </Typography>
        )
        }
  
        {numSelected > 0 ? (
            <Tooltip title="삭제">
            <IconButton>
              <BlockIcon onClick={() => setOpenDeleteModal(true)}/>
            </IconButton>
          </Tooltip>
        ) :"" 
        }
      </Toolbar>
      <AdminDeleteModal modalOpen={openDeleteModal} setModalOpen={setOpenDeleteModal}/>
      </>
    );
  }

export default UserTableToolbar;