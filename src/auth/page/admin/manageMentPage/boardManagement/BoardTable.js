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
import BoardTableHead from './BoardTableHead';
import BoardTableToolbar from "./BoardTableToolbar";
import {AiOutlineClose} from 'react-icons/ai'

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

export default function BoardTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [boardList, setBoardList] = useState([]);


  useEffect(() => {
    getBoardList();
  },[]);
  
  const getBoardList = () => {
    fetch("/admin/getReportBoard", {method: "GET"})
      .then(res => res.json())
      .then(data => {
        setBoardList(data);
      });
  }

  const approvalReport = () => {
    fetch("/admin/approvalBoardReport",{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        boardList: selected
      })
    }).then(() => {
      getBoardList();
    });
  };
  
  const notApprovalReport = () => {
    fetch("/admin/notApprovalBoardReport",{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        boardList: selected
      })
    }).then(() => {
      getBoardList();
    });
  };


  function formatDate(datetime) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const formattedDate = new Date(datetime).toLocaleString('ko-KR', options);

    return formattedDate;
  }

  const onClickOpenDetail = useCallback((id) => {
    document.getElementById(`detail${id}`).style.display = "contents";
  },[]);
  
  const onClickCloseDetail = useCallback(id => {
    document.getElementById(`detail${id}`).style.display = "none";
  },[]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = boardList.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - boardList.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(boardList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, boardList],
  );

  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <BoardTableToolbar 
          numSelected={selected.length}
          getBoardList={getBoardList}
          approvalReport={approvalReport}
          notApprovalReport={notApprovalReport}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <BoardTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={boardList.length}
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
                    <TableCell align="right" sx={{maxWidth: "150px"}}><b className={commonStyle.title} onClick={() => onClickOpenDetail(row.id)}>{row.title}</b></TableCell>
                    <TableCell align="right">{row.writer}</TableCell>
                    <TableCell align="right">{formatDate(row.writeDate)}</TableCell>
                    <TableCell align="right">{row.reportUser}</TableCell>
                    <TableCell align="right">{formatDate(row.reportDate)}</TableCell>
                  </TableRow>
                  <TableRow className={commonStyle.dropDownTr} sx={{display: "none"}}id={`detail${row.id}`} onClick={() => onClickCloseDetail(row.id)}>
                    <TableCell colSpan={10} className={commonStyle.dropDownTd}>
                      <AiOutlineClose className={commonStyle.closeBtn}/>
                      <p className={commonStyle.dropDownText}>신고사유</p>
                      <textarea className={commonStyle.reason}>{row.reason}</textarea>
                      <p className={commonStyle.dropDownText}>본문</p>
                      <div className={commonStyle.postDetailContainer}>
                          {row.img1 && 
                          <div>
                            <img src={row.img1} alt="" className={commonStyle.postImage} />
                          </div>
                          }
                          {row.img2 && 
                          <div>
                            <img src={row.img2} alt="" className={commonStyle.postImage} />
                          </div>
                          }
                          {row.img3 && 
                          <div>
                            <img src={row.img3} alt="" className={commonStyle.postImage} />
                          </div>
                          }
                          {row.img4 && 
                          <div>
                            <img src={row.img4} alt="" className={commonStyle.postImage} />
                          </div>
                          }
                          {row.img5 && 
                          <div>
                            <img src={row.img5} alt="" className={commonStyle.postImage} />
                          </div>
                          }
                          <div className={commonStyle.content}>{row.content}</div>
                        </div>
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
          count={boardList.length}
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

BoardTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

BoardTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
