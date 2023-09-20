import React, {useEffect, useState, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import commonStyle from "../ManageMentPage.module.css"
import {AiOutlineClose} from 'react-icons/ai'
import ReplyTableToolbar from './ReplyTableToolbar';
import ReplyTableHead from './ReplyTableHead';
import {Link} from 'react-router-dom'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function ReplyTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [replyList, setReplyList] = useState([]);


  useEffect(() => {
    getReplyList();
  },[]);
  
  const getReplyList = () => {
    fetch("/admin/getReportReply", {method: "GET"})
      .then(res => res.json())
      .then(data => {
        setReplyList(data);
      });
  }

  const approvalReplyReport = () => {
    fetch("/admin/approvalReplyReport",{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        replyList: selected
      })
    }).then(() => {
      getReplyList();
    });
  };
  
  const notApprovalReplyReport = () => {
    fetch("/admin/notApprovalReplyReport",{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        replyList: selected
      })
    }).then(() => {
      getReplyList();
    });
  };


  function formatDate(datetime) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const formattedDate = new Date(datetime).toLocaleString('ko-KR', options);

    return formattedDate;
  }

  const onClickOpenDetail = useCallback((id) => {
    document.getElementById(`replyDetail${id}`).style.display = "contents";
  },[]);
  
  const onClickCloseDetail = useCallback(id => {
    document.getElementById(`replyDetail${id}`).style.display = "none";
  },[]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = replyList.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - replyList.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(replyList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, replyList],
  );

  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ReplyTableToolbar 
          numSelected={selected.length}
          approvalReplyReport={approvalReplyReport}
          notApprovalReplyReport={notApprovalReplyReport}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <ReplyTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={replyList.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <>
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                      value={row.id}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right" sx={{maxWidth: "150px"}}><b className={commonStyle.title} onClick={() => onClickOpenDetail(row.id)}>{row.content}</b></TableCell>
                    <TableCell align="right">{row.writer}</TableCell>
                    <TableCell align="right">{formatDate(row.replyWriteDate)}</TableCell>
                    <TableCell align="right">{row.reporter}</TableCell>
                    <TableCell align="right">{formatDate(row.reportDate)}</TableCell>
                  </TableRow>
                  <TableRow className={commonStyle.dropDownTr} sx={{display: "none"}} id={`replyDetail${row.id}`} onClick={() => onClickCloseDetail(row.id)}>
                    <TableCell colSpan={10} className={commonStyle.dropDownTd}>
                      <AiOutlineClose className={commonStyle.closeBtn}/>
                      <p className={commonStyle.dropDownText}>신고사유</p>
                      <textarea className={commonStyle.reason}>{row.reason}</textarea>
                      <p className={commonStyle.dropDownText}>게시글 제목</p>
                      <div className={commonStyle.content}><Link to={`/board/detail/${row.boardId}`}>{row.title}</Link></div>
                    </TableCell>
                  </TableRow>
                  </>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (50) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="페이지 목록 수"
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={replyList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={commonStyle.tableFooter}
        />
      </Paper>
    </Box>
  );
}

ReplyTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

ReplyTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
