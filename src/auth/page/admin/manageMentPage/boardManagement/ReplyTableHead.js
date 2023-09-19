import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';

function ReplyTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'replyContent',
            numeric: true,
            disablePadding: false,
            label: '댓글 내용',
        },
        {
            id: 'writer',
            numeric: true,
            disablePadding: false,
            label: '작성자',
        },
        {
          id: 'replyWriteDate',
          numeric: true,
          disablePadding: false,
          label: '작성일',
        },
        {
            id: 'reportUser',
            numeric: true,
            disablePadding: false,
            label: '신고자',
        },
        {
            id: 'reportDate',
            numeric: true,
            disablePadding: false,
            label: '신고일',
        },
    ];

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  export default ReplyTableHead;