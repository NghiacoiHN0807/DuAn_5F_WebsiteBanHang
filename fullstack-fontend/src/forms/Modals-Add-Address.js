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
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
// components
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHeadNoCheckBox, UserListToolbar } from '../sections/@dashboard/user';
// APIs

const TABLE_HEAD = [
  { id: 'loaiDiaChi', label: 'Loại Địa Chỉ', alignRight: false },
  { id: 'diaChiCuThe', label: 'Địa Chỉ Cụ Thể', alignRight: false },
  { id: 'phuongXa', label: 'Phường/Xã', alignRight: false },
  { id: 'quanHuyen', label: 'Quận/Huyện', alignRight: false },
  { id: 'tinhThanh', label: 'Tỉnh/Thành', alignRight: false },
  { id: 'tenNguoiNhan', label: 'Tên Người Nhận', alignRight: false },
  { id: 'sdt', label: 'Số Điện Thoại', alignRight: false },
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

const ModalAddAddress = (props) => {
  ModalAddAddress.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    listData: PropTypes.array.isRequired,
    setTenKH: PropTypes.func.isRequired,
    setSDTKH: PropTypes.func.isRequired,
    setDiaChi: PropTypes.func.isRequired,
    setTienShip: PropTypes.func.isRequired,
  };
  const { open, handleClose, listData, setTenKH, setSDTKH, setDiaChi, setTienShip } = props;

  // Edit table
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('maHd');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // Get number
  const handleChoose = async (item) => {
    console.log('item: ', item);
    setTenKH(item.tenNguoiNhan);
    setSDTKH(item.sdt);
    setDiaChi(`${item.diaChiCuThe}, ${item.phuongXa}, ${item.quanHuyen}, ${item.tinhThanh}`);
    setTienShip(item.phiShip);
    handleClose();
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>DANH SÁCH ĐỊA CHỈ CỦA TÀI KHOẢN</DialogTitle>
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
                        const { loaiDiaChi, diaChiCuThe, phuongXa, quanHuyen, tinhThanh, tenNguoiNhan, sdt } = row;
                        const selectedUser = selected.indexOf(loaiDiaChi) !== -1;

                        return (
                          <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {loaiDiaChi}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{diaChiCuThe}</TableCell>
                            <TableCell align="left">{phuongXa}</TableCell>
                            <TableCell align="left">{quanHuyen}</TableCell>
                            <TableCell align="left">{tinhThanh}</TableCell>
                            <TableCell align="left">{tenNguoiNhan}</TableCell>
                            <TableCell align="left">{sdt}</TableCell>
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
            <Button onClick={handleClose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ModalAddAddress;