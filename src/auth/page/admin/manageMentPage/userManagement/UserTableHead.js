import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';

function UserTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const headCells = [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'nickname',
            numeric: true,
            disablePadding: false,
            label: '닉네임',
        },
        {
            id: 'name',
            numeric: true,
            disablePadding: false,
            label: '이름',
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: '이메일',
        },
        {
            id: 'phoneNumber',
            numeric: true,
            disablePadding: false,
            label: '전화번호',
        },
        {
            id: 'gender',
            numeric: true,
            disablePadding: false,
            label: '성별',
        },
        {
            id: 'birth',
            numeric: true,
            disablePadding: false,
            label: '생년월일',
        },
        {
            id: 'noShowCnt',
            numeric: true,
            disablePadding: false,
            label: '노쇼수',
        },
        {
            id: 'team',
            numeric: true,
            disablePadding: false,
            label: '팀가입여부',
        },
        {
          id: 'accountSuspersion',
          numeric: true,
          disablePadding: false,
          label: '정지여부',
        },
        {
          id: 'signState',
          numeric: true,
          disablePadding: false,
          label: '가입유형',
        },
        {
            id: 'signUpDate',
            numeric: true,
            disablePadding: false,
            label: '가입일자',
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
                sx={{width: "100px"}}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  export default UserTableHead;