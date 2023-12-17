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
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  TextField,
  Grid,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
// components
import { CSVLink } from 'react-csv';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// sections
import { UserListHeadNoCheckBox, UserListToolbar } from '../../sections/@dashboard/user';
import { fetchSpForAdmin, deleteSanPham } from '../../service/SanPhamService';
import { ProductfilterSB } from '../../sections/@dashboard/products';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'stt', label: 'STT', alignRight: false },
  { id: 'anh', label: 'Ảnh', alignRight: false },
  { id: 'maSp', label: 'Mã', alignRight: false },
  { id: 'tenSp', label: 'Tên', alignRight: false },
  { id: 'giaThucTe', label: 'Giá bán', alignRight: false },
  { id: 'moTa', label: 'Mô tả', alignRight: false },
  { id: 'trangThai', label: 'Trạng thái', alignRight: false },
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
    ['maSp', 'tenSp', 'moTa'].some((field) => {
      const fieldValue = _user[field];
      if (typeof fieldValue === 'string') {
        return fieldValue.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    })
  );
}

function renderTrangThai(trangThai) {
  let badgeVariant;
  let statusText;

  switch (trangThai) {
    case 0:
      badgeVariant = 'success';
      statusText = 'Còn bán';
      break;
    case 1:
      badgeVariant = 'warning';
      statusText = 'Đang giảm giá';
      break;
    case 9:
      badgeVariant = 'default';
      statusText = 'Đang cập nhật';
      break;
    case 10:
      badgeVariant = 'error';
      statusText = 'Ngừng kinh doanh';
      break;
    default:
      badgeVariant = 'default';
      statusText = 'Unknown status';
      break;
  }

  return <Chip label={statusText} color={badgeVariant} />;
}

function getGia(giaMin, giaMax) {
  return giaMin === giaMax
    ? formatCurrency(giaMin)
    : String(formatCurrency(giaMin)) + String(' - ') + String(formatCurrency(giaMax));
}

function formatCurrency(price) {
  if (!price) return '0';

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  return formatter.format(price);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('maHd');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [statusFilter, setStatusFilter] = useState('');
  const [selectedExports, setSelectedExports] = useState([]);

  const [listSP, setListSP] = useState([]);

  // filter

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getListFiter = async () => {
    try {
      const res = await fetchSpForAdmin();
      console.log('Check res: ', res);
      setListSP(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  };
  useEffect(() => {
    getListFiter();
  }, []);

  // filter

  const [listLoc, setListLoc] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (filteredProducts) => {
    setListLoc(filteredProducts);
    setIsFiltered(true);
  };

  const displayProducts = isFiltered ? listLoc : listSP;

  function applySortFilter(array, comparator, query) {
    let filteredArray = array;

    if (statusFilter !== '') {
      filteredArray = filteredArray.filter((_user) => _user.trangThai.toString() === statusFilter);
    }

    if (query) {
      return filterData(array, query);
    }

    const stabilizedThis = filteredArray.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }
  // Show Data On Tables
  // const [numberPages, setNumberPages] = useState(0);
  const getListData = async () => {
    try {
      const res = await fetchSpForAdmin();
      console.log('Check res: ', res);
      setListSP(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  const [selectedId, setSelectedId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleOpenMenu = (event, idSp, trangThai) => {
    setSelectedId(idSp);
    setSelectedStatus(trangThai);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - displayProducts.length) : 0;

  const filteredUsers =
    displayProducts && displayProducts
      ? applySortFilter(displayProducts, getComparator(order, orderBy), filterName)
      : [];
  const isNotFound = !filteredUsers.length && !!filterName;

  // Delete
  const handleDelete = async (idSp, trangThai) => {
    if (trangThai === 1) {
      handleAlertClick('Sản phẩm đang giảm giá không thể xóa', 'warning');
      handleClose();
    } else {
      const res = await deleteSanPham(idSp);
      console.log('Check res: ', res);
      if (res && res.idSp) {
        handleAlertClick('Xóa thành công!', 'success');
        getListData();
        handleClose();
      } else {
        handleAlertClick('Xóa thất bại!', 'error');
        getListData();
        handleClose();
      }
    }
  };

  // Update
  const navigate = useNavigate();
  const handleUpdate = (idSp, trangThai) => {
    if (trangThai === 1) {
      handleAlertClick('Sản phẩm đang giảm giá không thể sửa!!!', 'warning');
    } else {
      navigate(`/dashboard/products/update/${idSp}`);
    }
  };

  const handleAdd = () => {
    navigate(`/dashboard/products/add`);
  };

  // Xac nhan xoa
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  // alert

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleAlertClick = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpenAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  // export
  const handleExportData = () => {
    const res = [];
    if (listSP && listSP.length > 0) {
      res.push(['STT', 'Mã', 'Tên', 'Giá bán', 'Mô tả', 'Trạng thái']);
      listSP
        .filter((item) => item.trangThai === 0 || item.trangThai === 1 || item.trangThai === 10)
        .map((item, index) => {
          const array = [];
          array[0] = index;
          array[1] = item.maSp;
          array[2] = item.tenSp;
          array[3] = formatCurrency(item.giaThucTe);
          array[4] = item.moTa;
          array[5] = `${
            item.trangThai === 0
              ? 'Còn bán'
              : item.trangThai === 10
              ? 'Dừng hoạt động'
              : item.trangThai === 1
              ? 'Đang giảm giá'
              : 'Unknow status'
          }`;
          return res.push(array);
        });
      setSelectedExports(res);
      // done();
    }
  };

  return (
    <>
      <Helmet>
        <title> Sản Phẩm | 5F Store </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách sản phẩm
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleAdd()}>
            Thêm sản phẩm
          </Button>
        </Stack>

        <Card>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} sx={{ width: '500px' }} />
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid container justifyContent="right" alignItems="center">
                <CSVLink data={selectedExports} filename={'DSSP.csv'} onClick={handleExportData}>
                  <Button
                    aria-label="download"
                    variant="outlined"
                    startIcon={<GetAppIcon />}
                    size="large"
                    color="success"
                  >
                    Xuất Excel
                  </Button>
                </CSVLink>
                <TextField
                  select
                  label="Trạng Thái"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  sx={{ width: '200px', margin: '0 20px' }}
                >
                  <MenuItem value="">Tất Cả</MenuItem>
                  <MenuItem value="0">Còn bán</MenuItem>
                  <MenuItem value="1">Đang giảm giá</MenuItem>
                  <MenuItem value="9">Đang cập nhật</MenuItem>
                  <MenuItem value="10">Ngừng kinh doanh</MenuItem>
                </TextField>

                <ProductfilterSB
                  openFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  listSP={listSP}
                  onFilter={handleFilter}
                />
              </Grid>
            </Grid>
          </Grid>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHeadNoCheckBox
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listSP.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { idSp, url, maSp, tenSp, giaMin, giaMax, giaThucTe, moTa, trangThai } = row;

                    return (
                      <TableRow hover key={idSp} tabIndex={-1}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell align="left">
                          <img src={url} alt="Mô tả hình ảnh" width="100" height="100" />
                        </TableCell>
                        <TableCell align="left">{maSp}</TableCell>
                        <TableCell align="left">{tenSp}</TableCell>
                        <TableCell align="left">
                          {trangThai === 1 ? (
                            <Typography variant="subtitle2">
                              <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                  color: 'text.disabled',
                                  textDecoration: 'line-through',
                                }}
                              >
                                {formatCurrency(giaMin)}
                              </Typography>
                              <Typography component="span" variant="subtitle1">
                                {' '}
                                {formatCurrency(giaThucTe)}
                              </Typography>
                            </Typography>
                          ) : (
                            <Typography variant="subtitle2">{getGia(giaMin, giaMax)}</Typography>
                          )}
                        </TableCell>
                        <TableCell align="left">{moTa}</TableCell>
                        <TableCell align="left">{renderTrangThai(trangThai)}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(event) => handleOpenMenu(event, idSp, trangThai)}
                          >
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
            count={listSP && listSP.length ? listSP.length : 0}
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
        <MenuItem onClick={() => handleUpdate(selectedId, selectedStatus)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleClickOpenDelete()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xác nhận xóa?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Canel</Button>

          <Button onClick={() => handleDelete(selectedId, selectedStatus)} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
