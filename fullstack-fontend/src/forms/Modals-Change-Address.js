import '../scss/Car-Bill-ADM.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  Paper,
  TableRow,
  TableBody,
  Stack,
  TableCell,
  Typography,
  TableContainer,
  Card,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// components
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHeadNoCheckBox, UserListToolbar } from '../sections/@dashboard/user';
import { updateClientPayment2 } from '../service/client/Payment';
import ModalsAddAddressByAdmin from "./ModalsAddAddressByAdmin";

// APIs

const TABLE_HEAD = [
  { id: 'loaiDiaChi', label: 'Loại Địa Chỉ', alignRight: false },
  { id: 'diaChiCuThe', label: 'Địa Chỉ Cụ Thể', alignCenter: true },
  { id: 'diaChi', label: 'Địa Chỉ', alignCenter: true },
  { id: 'tenNguoiNhan', label: 'Tên Người Nhận', alignCenter: true },
  { id: 'sdt', label: 'Số Điện Thoại', alignCenter: true },
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

const ModalChangeAddress = (props) => {
  ModalChangeAddress.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    listData: PropTypes.array.isRequired,
    loadData: PropTypes.func.isRequired,
    idTaiKhoan : PropTypes.string,
  };
  const { open, handleClose, listData, loadData, idTaiKhoan } = props;

  // Edit table
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('maHd');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tong = listData.length;
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

  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const param = useParams();
  const idHdParam = param.id;
  // Get number
  const handleChoose = async (item) => {
    try {
      console.log('item: ', item);
      console.log('item.tienShip: ', item.phiShip);
      const diaChi = `${item.diaChiCuThe}, ${item.phuongXa}, ${item.quanHuyen}, ${item.tinhThanh}`;
      await updateClientPayment2(idHdParam, item.tenNguoiNhan, item.sdt, item.taiKhoan.email, diaChi, item.phiShip);

      setAlertContent({
        type: 'success',
        message: 'Cập Nhập Địa Chỉ Thành Công',
      });
      handleClose();
      loadData();
    } catch (error) {
      setAlertContent({
        type: 'warning',
        message: 'Không Thể Cập Nhập Địa Chỉ!!!',
      });
      console.error(error);
    }
  };
  const [showModalsAddress, setShowModalKH] = useState(false);
  const handleAddAddress = () => {
    setShowModalKH(true);
  };
  const handleCloseAddress = () => {
    setShowModalKH(false);
  };
  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>DANH SÁCH ĐỊA CHỈ CỦA TÀI KHOẢN</DialogTitle>
          <DialogContent>
            <Card>
              <Button
                onClick={() => handleAddAddress()}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  float: 'right',
                  marginRight: '10px',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
                disabled={tong === 5}
              >
                {tong >= 5 ? 'Khóa Thêm Địa Chỉ' : 'Thêm Địa Chỉ Mới'}
              </Button>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHeadNoCheckBox
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={listData.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        const { loaiDiaChi, diaChiCuThe, phuongXa, quanHuyen, tinhThanh, tenNguoiNhan, sdt } = row;
                        const selectedUser = selected.indexOf(loaiDiaChi) !== -1;

                        return (
                          <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell component="th" scope="row" align="center">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {loaiDiaChi === 1 ? 'Nhà Riêng' : 'Văn Phòng'}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="center">{diaChiCuThe}</TableCell>
                            <TableCell align="center">
                              {tinhThanh}, {phuongXa}, {quanHuyen}
                            </TableCell>
                            <TableCell align="center">{tenNguoiNhan}</TableCell>
                            <TableCell align="center">{sdt}</TableCell>
                            <TableCell align="center">
                              <Button variant="outlined" size="small" onClick={() => handleChoose(row)}>
                                Chọn
                              </Button>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleClose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
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
      </div>
      <ModalsAddAddressByAdmin
        open={showModalsAddress}
        handleClose={handleCloseAddress}
        getAllData={loadData}
        idTaiKhoan={idTaiKhoan}
      />
    </>
  );
};
export default ModalChangeAddress;
