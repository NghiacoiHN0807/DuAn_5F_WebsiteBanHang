import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// icon
import Chip from '@mui/material/Chip';

// import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Paper,
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
  Grid,
  TextField,

} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { makeStyles } from '@material-ui/core';
import { filter } from 'lodash';
import { CSVLink } from 'react-csv';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListHeadNoCheckBox, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import { taiKhoan } from '../../service/taiKhoanNhanVienService';
import ModalDeleteDiscount from './Modal-Delete-Staff';
import ModalResetTK from './Modal-Reset-Staff';
// import { Navigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'maTaiKhoan', label: 'Mã Tài Khoản', alignRight: false },
  { id: 'ten', label: 'Tên', alignRight: false },
  { id: 'chucVu', label: 'Chức Vụ', alignRight: false },
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

export default function UserStaff() {
  // Select list of users

  const [listData, setListData] = useState([]);


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

  const [statusFilter, setStatusFilter] = useState('');

  const [positionFilter, setPositionFilter] = useState('');

  const [selectedExports, setSelectedExports] = useState([]);


  function applySortFilter(array, comparator, query) {
    let filteredArray = array;

    if (query) {
      return filterData(array, query);
    }

    if (statusFilter !== '') {
      filteredArray = filteredArray.filter((_user) => _user.trangThai.toString() === statusFilter);
    }

    if (positionFilter !== '') {
      filteredArray = filteredArray.filter((_user) => _user.idChucVu.idCv.toString() === positionFilter);
    }

    const stabilizedThis = filteredArray.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
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

  const filteredUsers =
    listData && listData ? applySortFilter(listData, getComparator(order, orderBy), filterName) : [];

  // Create a new Detail Direct
  const [alertContent, setAlertContent] = useState(null);
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
  const [openReset, setOpenReset] = useState(false);

  const handleDelete = () => {
    setInformation(object);
    setOpenDelete(true);
    setOpen(null);
  };


  const handleClose = () => {
    setOpenDelete(false);
    getListData();
    setOpenReset(false);

  };

  const handleReset = () => {
    setInformation(object);
    setOpenReset(true);
    setOpen(null);
  }

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
    setPage(0);
    setFilterName(event.target.value);
  };


  const useStyles = makeStyles((theme) => ({
    filterContainer: {
      display: 'grid',
      gap: theme.spacing(2),
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 200px))',
      margin: theme.spacing(2),
    },
    // downloadButton: {
    //   height: "55px",
    //   backgroundColor: theme.palette.primary.main,
    //   color: theme.palette.primary.contrastText,
    //   '&:hover': {
    //     backgroundColor: theme.palette.primary.dark,
    //   },
    // },
  }));



  const handleExportData = () => {
    const res = [];
    if (listData && listData.length > 0) {
      res.push([
        'STT',
        'Mã tài Khoản',
        'Tên',
        'Chức vụ',
        'Số căn cước',
        'email',
        'Sdt',
        'Trạng Thái',
      ]);
      listData.map((item, index) => {
        const array = [];
        array[0] = index;
        array[1] = item.maTaiKhoan;
        array[2] = item.ho + item.ten;
        array[3] = item.idChucVu.tenCv;
        array[4] = item.soCanCuoc;
        array[5] = item.email;
        array[6] = item.sdt;
        array[7] = `${item.trangThai === 0 ? 'Hoạt động' : 'Dừng hoạt động'}`;
        return res.push(array);
      });
      setSelectedExports(res);
      // done();
    }
  };


  const classes = useStyles();

  return (
    <>

      <Box component={Paper} elevation={3} p={3} borderRadius={2}>
        <Helmet>
          <title> Nhân Viên | 5F store </title>
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Tài Khoản Nhân Viên
            </Typography>
            <Link to="/dashboard/addNewTKNV">
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Thêm Nhân Viên
              </Button>
            </Link>

          </Stack>

          <Card>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
              </Grid>
              <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container justifyContent="right" alignItems="center" className={classes.filterContainer}>
                  <TextField
                    select
                    label="Trạng Thái"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <MenuItem value="">Tất Cả</MenuItem>
                    <MenuItem value="0">Hoạt Động</MenuItem>
                    <MenuItem value="10">Dừng Hoạt Động</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="Chức Vụ"
                    value={positionFilter}
                    onChange={(event) => setPositionFilter(event.target.value)}
                  >
                    <MenuItem value="">Tất Cả</MenuItem>
                    <MenuItem value="1">Quản Lý</MenuItem>
                    <MenuItem value="8">Nhân Viên</MenuItem>
                  </TextField>
                  <CSVLink data={selectedExports} filename={'DSNV.csv'} onClick={handleExportData}>
                    <Button
                      aria-label="download"
                      Button
                      variant="outlined"
                      startIcon={<GetAppIcon />}
                      size="large"
                      color="success"
                    >
                      Xuất Excel
                    </Button>
                  </CSVLink>
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
                    rowCount={listData.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow key={row.idTaiKhoan}>
                        <TableCell align="left">{row.maTaiKhoan}</TableCell>
                        <TableCell align="left">
                          {row.ho} {row.ten}
                        </TableCell>
                        <TableCell align="left">{row.idChucVu.tenCv}</TableCell>
                        <TableCell align="left">{row.soCanCuoc}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.sdt}</TableCell>
                        <TableCell align="left">
                          {row.trangThai === 0 ? (
                            <Chip
                              label="Hoạt động"
                              color="primary"
                              variant="outlined"
                              style={{ color: 'white', backgroundColor: 'green', border: 'none' }}
                            />

                          ) : (
                            <Chip
                              label="Dừng hoạt động"
                              color="secondary"
                              variant="outlined"
                              style={{ color: 'white', backgroundColor: 'red', border: 'none' }}
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

          {object.trangThai === 10 && (
            <MenuItem onClick={() => handleReset()} sx={{ color: 'error.main' }}>
              <Iconify icon={'bi:arrow-repeat'} sx={{ mr: 2 }} />
              Reset
            </MenuItem>
          )}

          {object.trangThai === 0 && (
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          )}
        </Popover>
        {/* Dialog xác nhận xóa */}
        <ModalDeleteDiscount open={openDelete} handleClose={handleClose} information={information} />
        <ModalResetTK open={openReset} handleClose={handleClose} information={information} />

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
      </Box>
    </>
  );
}
