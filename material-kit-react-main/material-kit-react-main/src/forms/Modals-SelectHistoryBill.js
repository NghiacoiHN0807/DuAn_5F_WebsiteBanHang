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
} from '@mui/material';
import {
  FaCogs,
  FaPaperPlane,
  FaRegCalendarCheck,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaMoneyBillWave,
  FaBug,
  FaQuestionCircle,
  FaBackward,
} from 'react-icons/fa';
import { useState } from 'react';
import PropTypes from 'prop-types';
// components
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHeadNoCheckBox, UserListToolbarNoFilter } from '../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'trangThai', label: 'Trạng Thái', alignRight: false },
  { id: 'thoiGianThayDoi', label: 'Thời Gian', alignRight: false },
  { id: 'moTa', label: 'Mô Tả', alignRight: false },
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

const SelectHistoryBill = (props) => {
  SelectHistoryBill.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    listData: PropTypes.array.isRequired,
  };
  const { open, handleClose, listData } = props;

  // Edit table

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('thoiGianThayDoi');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Open and Close menu

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
  // Set Trang Thai
  function getTextForTrangThai(trangThai) {
    if (trangThai === 0) return 'Tạo Đơn Hàng Ship';
    if (trangThai === 8) return 'Đã Xác Nhận Đơn Tại Quầy';
    if (trangThai === 1) return 'Đã Xác Nhận Đơn ';
    if (trangThai === 2) return 'Đã Xác Nhận Người Mua';
    if (trangThai === 3) return 'Đã Chuyển Cho Đơn Vị';
    if (trangThai === 4 || trangThai === 9) return 'Đã Xác Nhận Thanh Toán';
    if (trangThai === 5) return 'Nhận Hàng Thành Công';
    if (trangThai === 6) return 'Đổi/Trả Hàng';
    if (trangThai === 7) return 'Chỉnh Sửa Đơn Hàng';
    if (trangThai === 10) return 'Đơn Hàng Đã Bị Hủy';
    return 'Trạng Thái Trống';
  }
  function getIconForTrangThai(trangThai) {
    if (trangThai === 0 || trangThai === 8) return FaRegFileAlt;
    if (trangThai === 1) return FaRegFileAlt;
    if (trangThai === 2) return FaRegCalendarCheck;
    if (trangThai === 3) return FaPaperPlane;
    if (trangThai === 4 || trangThai === 9) return FaMoneyBillWave;
    if (trangThai === 5) return FaRegCheckCircle;
    if (trangThai === 6) return FaBackward;
    if (trangThai === 7) return FaCogs;
    if (trangThai === 10) return FaBug;
    return FaQuestionCircle;
  }
  function getColorForTrangThai(trangThai) {
    if (trangThai === 10) return '#ff0000';
    if (trangThai === 6) return '#ffff00';
    if (trangThai === 7) return '#ffA500';
    if (trangThai >= 0) return '#64a338';
    return '#E3E3E3';
  }

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
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>Chi Tiết Lịch Sử Hóa Đơn</DialogTitle>
          <DialogContent>
            <Card>
              <UserListToolbarNoFilter
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
                        const { trangThai, moTa, ngayThayDoi } = row;
                        const selectedUser = selected.indexOf(trangThai) !== -1;

                        return (
                          <TableRow hover key={index} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={getTextForTrangThai(trangThai)}>
                                  {getIconForTrangThai(trangThai)({
                                    color: getColorForTrangThai(trangThai),
                                    size: '24px',
                                  })}
                                </Avatar>
                                <Typography variant="subtitle2" noWrap>
                                  {getTextForTrangThai(trangThai)}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{formatDateTime(ngayThayDoi)}</TableCell>
                            <TableCell align="left">{moTa}</TableCell>
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
            <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default SelectHistoryBill;
