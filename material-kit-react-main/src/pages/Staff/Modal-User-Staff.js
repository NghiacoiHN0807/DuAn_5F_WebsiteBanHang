import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// icon
import Chip from '@mui/material/Chip';

// import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
// components
import { filter } from 'lodash';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import { taiKhoan } from '../../service/taiKhoanNhanVienService';
import ModalDeleteDiscount from './Modal-Delete-Staff';
// import { Navigate } from 'react-router-dom';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'maTaiKhoan', label: 'Mã Tài Khoản', alignRight: false },
  { id: 'ten', label: 'Tên', alignRight: false },
  { id: 'soCanCuoc', label: 'Số Căn Cước', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'sdt', label: 'SĐT', alignRight: false },
  { id: 'trangThai', label: 'Trạng Thái', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.maTaiKhoan.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserStaff() {
  // Select list of users

  const [listData, setListData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const getListData = async (page, query) => {
    try {
      const res = await taiKhoan(page, query);
      console.log('Check res: ', res);
      // Cập nhật giá trị của listData sau khi tìm kiếm
      setListData(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await taiKhoan(0);
      setListData(res);
      setFilteredList(res); // Cập nhật danh sách đã lọc

      const storedMessage = localStorage.getItem('successMessage');
      if (storedMessage) {
        setAlertContent(JSON.parse(storedMessage));
        localStorage.removeItem('successMessage');
      }
    };

    fetchData();
    getListData(0);
    const storedMessage = localStorage.getItem('successMessage');
    if (storedMessage) {
      setAlertContent(JSON.parse(storedMessage));
      localStorage.removeItem('successMessage');
    }
  }, []);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Create a new Detail Direct
  const [alertContent, setAlertContent] = useState(null);
  const [lastGeneratedNumber, setLastGeneratedNumber] = useState(0);
  const [object, setOject] = useState([]);

  const handleOpenMenu = (event, row) => {
    setOpen(event.currentTarget);
    setOject(row);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  // handDelete
  const [openDelete, setOpenDelete] = useState(false);
  const [information, setInformation] = useState();
  const handleDelete = () => {
    console.log(object);
    setInformation(object);
    setOpenDelete(true);
  };

  // handleUpdate
  const handlClickRow = (item) => {
    // console.log("Check click: ", item);
    Navigate(`/tai-khoan/detail/${item.idTaiKhoan}`);
  };

  const handleClose = () => {
    setOpenDelete(false);
    getListData();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listData.map((n) => n.idTaiKhoan);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    // setPage(0);
    // setFilterName(event.target.value);

    const query = event.target.value.toLowerCase();

    // Lọc danh sách dựa trên tên
    const filteredUsers = listData.filter((user) =>
      (user.maTaiKhoan && user.maTaiKhoan.toLowerCase().includes(query)) ||
      (user.ten && user.ten.toLowerCase().includes(query)) ||
      (user.soCanCuoc && user.soCanCuoc.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query)) ||
      (user.sdt && user.sdt.toLowerCase().includes(query)) ||
      (user.trangThai && typeof user.trangThai === 'string' && user.trangThai.toLowerCase().includes(query))
    );

    setFilteredList(filteredUsers); // Cập nhật danh sách đã lọc

    setPage(0); // Đặt lại trang khi tìm kiếm

    setFilterName(query); // Cập nhật trường tìm kiếm
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listData.length) : 0;

  const filteredUsers = applySortFilter(listData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tài Khoản Nhân Viên
          </Typography>
          <Link to="/dashboard/addNewTKNV">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New User
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName} // Truyền hàm xử lý tìm kiếm
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {/* <h1>{listData.data.content.length}</h1> */}
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.idTaiKhoan}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.indexOf(row.idTaiKhoan) !== -1}
                          onChange={(event) => handleClick(event, row.idTaiKhoan)}
                        />
                      </TableCell>

                      <TableCell align="left">{row.maTaiKhoan}</TableCell>
                      <TableCell align="left">
                        {row.ho} {row.ten}
                      </TableCell>
                      <TableCell align="left">{row.soCanCuoc}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.sdt}</TableCell>
                      <TableCell align="left">
                        {row.trangThai === 1 ? (
                          <Chip
                            label="Hoạt động"
                            color="primary"
                            variant="outlined"
                            style={{ color: 'white', backgroundColor: 'green',border: 'none' }}
                          />

                        ) : (
                          <Chip
                            label="Dừng hoạt động"
                            color="secondary"
                            variant="outlined"
                            style={{ color: 'white', backgroundColor: 'red' ,border: 'none' }}
                          />

                        )}
                      </TableCell>



                      <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listData && listData.length ? listData.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Link to={`/dashboard/detail/${object.idTaiKhoan}`} style={{ textDecoration: 'none' }}>
          <MenuItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon={'eva:edit-fill'} sx={{ fontSize: 20, marginRight: 2, color: 'primary.main' }} />
            <span>Edit</span>
          </MenuItem>
        </Link>

        <MenuItem onClick={() => handleDelete()} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      {/* Dialog xác nhận xóa */}
      <ModalDeleteDiscount open={openDelete} handleClose={handleClose} information={information} />
      {alertContent && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={alertContent.type} sx={{ width: '100%' }}>
            {alertContent.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
