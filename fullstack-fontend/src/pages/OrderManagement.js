import '../scss/OderManagement.scss';
import { Helmet } from 'react-helmet-async';
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
  // Checkbox,
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
  TextField,
  Grid,
} from '@mui/material';
<<<<<<< HEAD
=======
import { CSVLink } from 'react-csv';
// import { filter } from 'lodash';
import { makeStyles } from '@material-ui/core';
>>>>>>> origin/longth

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHeadNoCheckBox, UserListToolbar } from '../sections/@dashboard/user';
import ModalDeleteDirectSale from '../forms/Modal-Delete-DirectSale';
import { getAllOrderManagement } from '../service/OderManagementSevice';
import { postAddBill } from '../service/BillSevice';

const TABLE_HEAD = [
  { id: 'stt', label: 'STT', alignRight: false },
  { id: 'maHd', label: 'Mã Hóa Đơn', alignRight: false },
  { id: 'tenKh', label: 'Tên Khách Hàng', alignRight: false },
  { id: 'sdtKh', label: 'Số Điện Thoại', alignRight: false },
  { id: 'thanhTien', label: 'Thành Tiền', alignRight: false },
  { id: 'ngayTao', label: 'Ngày Tạo', alignRight: false },
  { id: 'kieuHoaDon', label: 'Kiểu Hóa Đơn', alignRight: false },
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

const OrderManagement = () => {
  const [listData, setListData] = useState([]);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('maHd');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedExports, setSelectedExports] = useState([]);

  // Filter
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  function applySortFilter(array, comparator, query) {
    let filteredArray = array;

    if (query) {
      return filterData(array, query);
    }

    if (statusFilter !== '') {
      filteredArray = filteredArray.filter((_user) => _user.trangThai.toString() === statusFilter);
    }

    const startDate = startDateFilter ? new Date(startDateFilter) : null;
    const endDate = endDateFilter ? new Date(endDateFilter) : null;

    filteredArray = filteredArray.filter((_user) => {
      const userDate = new Date(_user.ngayTao);
      if (startDate && endDate) {
        return userDate >= startDate && userDate <= endDate;
      }
      if (startDate) {
        return userDate >= startDate;
      }
      if (endDate) {
        return userDate <= endDate;
      }
      return true;
    });

    const stabilizedThis = filteredArray.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  const useStyles = makeStyles((theme) => ({
    filterContainer: {
      display: 'grid',
      gap: theme.spacing(2),
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 200px))',
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  // Get Data
  const getListData = async () => {
    try {
      const res = await getAllOrderManagement();
      console.log('Check hihi: ', res);
      setListData(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  // / Open and Close menu
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
      const newSelecteds = listData.map((n) => n.idHd);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listData.length) : 0;

  const filteredUsers = applySortFilter(listData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  // Set status of trangThai

  function renderKieuHoaDon(trangThai) {
    let badgeVariant;
    let statusText;

    switch (trangThai) {
      case 1:
        badgeVariant = 'warning';
        statusText = 'Bán Tại Quầy';
        break;
      case 2:
        badgeVariant = 'secondary';
        statusText = 'Giao Hàng';
        break;
      default:
        badgeVariant = 'light';
        statusText = 'Đang Đặt';
        break;
    }

    return <Chip label={statusText} color={badgeVariant} />;
  }

  function renderTrangThai(trangThai) {
    let badgeVariant;
    let statusText;

    switch (trangThai) {
      case 0:
        badgeVariant = 'info';
        statusText = 'Đang Chờ Xác Nhận Đơn Hàng';
        break;
      case 1:
        badgeVariant = 'primary';
        statusText = 'Đã Xác Nhận Đơn';
        break;
      case 2:
        badgeVariant = 'secondary';
        statusText = 'Đã Xác Nhận Người Mua';
        break;
      case 3:
        badgeVariant = 'warning';
        statusText = 'Đã Chuyển Cho Đơn Vị';
        break;
      case 4:
        badgeVariant = 'success';
        statusText = 'Đã Xác Nhận Thanh Toán';
        break;
      case 5:
        badgeVariant = 'success';
        statusText = 'Đã Giao Thành Công';
        break;
      case 8:
        badgeVariant = 'secondary';
        statusText = 'Đơn Hàng Bán Tại Quầy';
        break;
      case 9:
        badgeVariant = 'success';
        statusText = 'Đã Thanh Toán Tại Quầy';
        break;
      case 10:
        badgeVariant = 'error';
        statusText = 'Đơn hàng đã hủy';
        break;
      default:
        badgeVariant = 'default';
        statusText = 'Unknown status';
        break;
    }

    return <Chip label={statusText} color={badgeVariant} />;
  }

  // Click on the table
  const navigate = useNavigate();
  const handlClickRow = () => {
    console.log('Check click: ', object);
    navigate(`/dashboard/bills/time-line/${object.idHd}`);
  };
  // Add new bill

  let getIdHttp;

  const handleAdd = async () => {
    const res = await postAddBill(1, 8);
    setAlertContent({
      type: 'success',
      message: 'Tạo thành công hóa đơn',
    });
    getIdHttp = res.idHd;
    // await getDataCart(getIdHttp);
    navigate(`/dashboard/sales/card-bill/${getIdHttp}`);
  };
  // Create a new Detail Direct
  const [alertContent, setAlertContent] = useState(null);
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
  // Format thanhTien
  const formatCurrency = (amount) => amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const handleExportData = () => {
    const res = [];
    if (listData && listData.length > 0) {
      res.push([
        'STT',
        'Mã Hóa Đơn',
        'Tên Khách Hàng',
        'Số Điện Thoại',
        'Thành Tiền',
        'Ngày Tạo',
        'Kiểu Hóa Đơn',
        'Trạng Thái',
      ]);
      listData.map((item, index) => {
        const array = [];
        array[0] = index + 1;
        array[1] = item.maHd;
        // Kiểm tra và thiết lập giá trị cho array[2]
        if (item.idKH && item.idKH.ho && item.idKH.ten) {
          array[2] = item.idKH.ho + item.idKH.ten;
        } else {
          array[2] = 'Khách Lẻ';
        }
        array[3] = item.idKH?.sdt || '';
        array[4] = formatCurrency(item.thanhTien);
        array[5] = formatDateTime(item.ngayTao);
        array[6] = renderKieuHoaDon(item.kieuHoaDon).props.label;
        array[7] = renderTrangThai(item.trangThai).props.label;
        return res.push(array);
      });
      setSelectedExports(res);
      // done();
    }
  };

  return (
    <>
      <Helmet>
        <title> Bills | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Hóa Đơn
          </Typography>
          <CSVLink data={selectedExports} onClick={handleExportData}>
            Download me
          </CSVLink>
          <Button onClick={() => handleAdd()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm Hóa Đơn
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Grid container className={classes.filterContainer}>
                <TextField
                  label="Ngày Bắt Đầu"
                  type="date"
                  value={startDateFilter}
                  onChange={(event) => setStartDateFilter(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Ngày Kết Thúc"
                  type="date"
                  value={endDateFilter}
                  onChange={(event) => setEndDateFilter(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  select
                  label="Trạng Thái"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <MenuItem value="">Tất Cả</MenuItem>
                  <MenuItem value="0">Đang Chờ Xác Nhận Đơn Hàng</MenuItem>
                  <MenuItem value="1">Đã Xác Nhận Đơn</MenuItem>
                  <MenuItem value="2">Đã Xác Nhận Người Mua</MenuItem>
                  <MenuItem value="3">Đã Chuyển Cho Đơn Vị</MenuItem>
                  <MenuItem value="4">Đã Xác Nhận Thanh Toán</MenuItem>
                  <MenuItem value="5">Đã Giao Thành Công</MenuItem>
                  <MenuItem value="8">Đơn Hàng Bán Tại Quầy</MenuItem>
                  <MenuItem value="9">Đã Thanh Toán Tại Quầy</MenuItem>
                  <MenuItem value="10">Đã Bị Hủy</MenuItem>
                </TextField>
              </Grid>
              <Table>
                <UserListHeadNoCheckBox
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  onStatusFilterChange={(event) => setStatusFilter(event.target.value)}
                  onStartDateFilterChange={(event) => setStartDateFilter(event.target.value)}
                  onEndDateFilterChange={(event) => setEndDateFilter(event.target.value)}
                />

                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { idHd, maHd, thanhTien, ngayTao, kieuHoaDon, trangThai } = row;
                    const selectedUser = selected.indexOf(idHd) !== -1;

                    return (
                      <TableRow hover key={idHd} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, idHd)} />
                        </TableCell> */}
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{maHd}</TableCell>
                        <TableCell align="left">
                          {row.idKH ? `${row.idKH.ho} ${row.idKH.ten}` : <Chip label="Khách Lẻ" color="primary" />}
                        </TableCell>
                        <TableCell align="left">{row.idKH && row.idKH.sdt}</TableCell>
                        <TableCell align="left">{formatCurrency(thanhTien)}</TableCell>
                        <TableCell align="left">{formatDateTime(ngayTao)}</TableCell>
                        <TableCell align="left">{renderKieuHoaDon(kieuHoaDon)}</TableCell>
                        <TableCell align="left">{renderTrangThai(trangThai)}</TableCell>
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
        <MenuItem onClick={() => handlClickRow()}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDelete()} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
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
};

export default OrderManagement;
