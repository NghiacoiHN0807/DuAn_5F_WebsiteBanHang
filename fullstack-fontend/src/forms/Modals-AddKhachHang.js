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
  Avatar,
  Stack,
  TableCell,
  Typography,
  TableContainer,
  Card,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// components
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHeadNoCheckBox, UserListToolbar } from '../sections/@dashboard/user';
// APIs
import { getAllDataTaiKhoan } from '../service/BillSevice';
import { updateKH, updateKH1 } from '../service/OrderManagementTimeLine';

const TABLE_HEAD = [
  { id: 'maTaiKhoan', label: 'Mã Khách Hàng', alignRight: false },
  { id: 'hoTen', label: 'Tên Khách Hàng', alignRight: false },
  { id: 'sdt', label: 'Số Điện Thoại', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
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

const ModalAddKhachHang = (props) => {
  ModalAddKhachHang.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    getDetailHD: PropTypes.func.isRequired,
    setInformationKH: PropTypes.func.isRequired,
    // setSelectedCustomerEmail: PropTypes.func.isRequired,
    // setSelectedMaTk: PropTypes.func.isRequired,
  };
  const { open, handleClose, getDetailHD, setInformationKH } = props;
  //   open Data on Table
  const [listData, setListData] = useState([]);

  const getAllData = useCallback(async () => {
    try {
      const getData = await getAllDataTaiKhoan();
      console.log('getData: ', getData);
      if (getData) {
        setListData(getData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  // Edit table

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('maHd');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Open and Close menu
  // const [object, getObject] = useState([]);

  // const handleOpenMenu = (event, row) => {
  //   console.log('Check event: ', event);
  //   console.log('Check event: ', row);
  //   getObject(row);

  //   setOpen1(event.currentTarget);
  // };

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

  const handleDeleteKH = async () => {
    try {
      setAlertContent({
        type: 'success',
        message: 'Đã Chuyển Về Khách Lẻ!!!',
      });
      setInformationKH();
      await updateKH1(idHdParam);
      getDetailHD();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  // Get number
  const handleChoose = async (item) => {
    try {
      setAlertContent({
        type: 'success',
        message: 'Thêm Khách Hàng Thành Công!!!',
      });
      await updateKH(idHdParam, item.idTaiKhoan);
      setInformationKH(item);
    } catch (error) {
      console.error(error);
    }
    getDetailHD();
    handleClose();
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>DANH SÁCH TÀI KHOẢN KHÁCH HÀNG</DialogTitle>
          <DialogContent>
            <Card>
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
                        const { idTaiKhoan, maTaiKhoan, ho, ten, sdt, email } = row;
                        const selectedUser = selected.indexOf(idTaiKhoan) !== -1;

                        return (
                          <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={maTaiKhoan} src={`/assets/images/avatars/avatar_${index + 1}.jpg`} />
                                <Typography variant="subtitle2" noWrap>
                                  {maTaiKhoan}
                                </Typography>
                              </Stack>
                            </TableCell>
                            {/* <TableCell align="left">{maTaiKhoan}</TableCell> */}
                            <TableCell align="left">
                              {ho} {ten}
                            </TableCell>
                            <TableCell align="left">{sdt}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="right">
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
            <Button onClick={handleDeleteKH}>Xóa Khách Hàng</Button>
          </DialogActions>
        </Dialog>
      </div>
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
export default ModalAddKhachHang;
