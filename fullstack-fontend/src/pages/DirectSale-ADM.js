import { Helmet } from 'react-helmet-async';
// import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
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
  Chip,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
// import { useEffect } from 'react';selectAllBill,
import { postAddBill, selectAllInvoiceWaiting } from '../service/BillSevice';
import ModalDeleteDirectSale from '../forms/Modal-Delete-DirectSale';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'maHd', label: 'Mã Hóa Đơn', alignRight: false },
  { id: 'ten', label: 'Tên Khách Hàng', alignRight: false },
  { id: 'sdtKh', label: 'Số Điện Thoại', alignRight: false },
  { id: 'ngayTao', label: 'Ngày Tạo', alignRight: false },
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

function filterData(array, query) {
  return array.filter((_user) =>
    Object.values(_user).some((field) => {
      if (typeof field === 'string') {
        return field.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    })
  );
}
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filterData(array, query);
    // return filter(array, (_user) => _user.maHd.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('maHd');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listBill, setListBill] = useState([]);
  // Show Data On Tables
  const getListData = async () => {
    try {
      const res = await selectAllInvoiceWaiting();
      console.log('Check res: ', res);
      setListBill(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  // Set status of trangThai
  // function mapTrangThaiToStatus(trangThai) {
  //   return trangThai === 8 ? 'Hóa Đơn Treo' : trangThai === 9 ? 'Đã thanh toán' : 'Unknown status';
  // }
  // Set status of trangThai

  function renderKieuHoaDon(trangThai) {
    let badgeVariant;
    let statusText;

    switch (trangThai) {
      case 8:
        badgeVariant = 'info';
        statusText = 'Hóa Đơn Treo';
        break;
      default:
        badgeVariant = 'light';
        statusText = 'Đang Đặt';
        break;
    }

    return <Chip label={statusText} color={badgeVariant} />;
  }
  // Open and Close menu
  const [object, getObject] = useState([]);

  const handleOpenMenu = (event, row) => {
    getObject(row);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listBill.map((n) => n.idHd);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Click checkbox on table

  const handleClick = (event, idHd) => {
    const selectedIndex = selected.indexOf(idHd);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idHd);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  // Next Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listBill.length) : 0;

  const filteredUsers = applySortFilter(listBill, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();

  // Create a new Detail Direct
  const [alertContent, setAlertContent] = useState(null);
  let getIdHttp;

  const handleAdd = async () => {
    const res = await postAddBill(1, 8);
    setAlertContent({
      type: 'success',
      message: 'Tạo thành công hóa đơn',
    });
    getIdHttp = res.idHd;
    navigate(`/dashboard/sales/card-bill/${getIdHttp}`);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  // Handle delete
  const [openDelete, setOpenDelete] = useState(false);
  const [information, setInformation] = useState();
  const handleDelete = () => {
    setInformation(object);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
    getListData();
  };

  // Handle edit
  const handleEdit = () => {
    console.log('object.idHd:', object.idHd);
    navigate(`/dashboard/sales/card-bill/${object.idHd}`);
  };

  // Format Date Time
  function formatDateTime(dateTimeString) {
    // Tạo một đối tượng Date từ chuỗi thời gian
    const dateTime = new Date(dateTimeString);

    // Kiểm tra xem đối tượng Date đã được tạo thành công chưa
    if (Number.isNaN(dateTime)) {
      return 'Thời gian không hợp lệ';
    }

    // Chuyển đổi thành định dạng ngày giờ
    const formattedDateTime = dateTime.toLocaleString();

    return formattedDateTime;
  }

  return (
    <>
      <Helmet>
        <title> Sales | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Hóa Đơn
          </Typography>
          <Button onClick={() => handleAdd()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm Hóa Đơn
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listBill.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { idHd, maHd, ngayTao, trangThai } = row;
                    const selectedUser = selected.indexOf(idHd) !== -1;

                    return (
                      <TableRow hover key={idHd} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, idHd)} />
                        </TableCell>
                        <TableCell align="left">{maHd}</TableCell>
                        {/* <TableCell align="left">{thanhTien}</TableCell> */}
                        <TableCell align="left">
                          {row.idKH ? `${row.idKH.ho} ${row.idKH.ten}` : <Chip label="Khách Lẻ" color="primary" />}
                        </TableCell>
                        <TableCell align="left">{row.idKH && row.idKH.sdt}</TableCell>
                        <TableCell align="left">{formatDateTime(ngayTao)}</TableCell>
                        <TableCell align="left">{renderKieuHoaDon(trangThai)}</TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listBill && listBill.length ? listBill.length : 0}
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
        <MenuItem onClick={() => handleEdit()}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Sửa
        </MenuItem>

        <MenuItem onClick={() => handleDelete()} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
      {/* Dialog xác nhận xóa */}
      <ModalDeleteDirectSale open={openDelete} handleClose={handleClose} information={information} />
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
