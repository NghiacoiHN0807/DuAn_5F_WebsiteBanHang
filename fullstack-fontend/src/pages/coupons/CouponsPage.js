import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
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
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
// import { useEffect } from 'react';
import { getAll } from '../../service/CouponsService';
import ModalDeleteCoupon from './Modal-Delete-Coupon';
import ModalResetCoupon from './Modal-Reset-Coupon';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'stt', label: 'STT', alignRight: false },
    { id: 'tenChuongTrinh', label: 'Chương Trình', alignRight: false },
    { id: 'code', label: 'Code', alignRight: false },
    { id: 'moTa', label: 'Mô Tả', alignRight: false },
    { id: 'thoigian', label: 'Thời Gian', alignRight: false },
    { id: 'soLuongHienTai', label: 'Số Lượng', alignRight: false },
    { id: 'phanTram', label: 'Mức Giảm', alignRight: false },
    { id: 'tienToiThieu', label: 'Số Tiền Tối Thiểu', alignRight: false },
    { id: 'trangthai', label: 'Trạng Thái', alignRight: false },
    { id: 'thaotac', label: 'Thao Tác', alignRight: false }
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
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function CouponsPage() {
    // Select list of users

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('tenChuongTrinh');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [listData, setListData] = useState([]);

    const [startDate, setStartDate] = useState('');

    const [endDate, setEndDate] = useState('');

    const [statusFilter, setStatusFilter] = useState('');


    // Show Data On Tables
    // const [numberPages, setNumberPages] = useState(0);
    const getListData = async () => {
        try {
            const res = await getAll();
            console.log('Check res: ', res);
            setListData(res);

            // setNumberPages(Math.ceil(res.totalPages));
        } catch (error) {
            console.error('Error in list bill: ', error);
        }
    };
    // const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        getListData();
    }, []);

    // Open and Close menu
    const [object, getObject] = useState([]);
    const handleOpenMenu = (event, row) => {
        console.log('Check event: ', event);
        console.log('Check row: ', row);
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
            const newSelecteds = listData.map((n) => n.idCoupon);
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

    const filteredUsers =
        listData && listData ? applySortFilter(listData, getComparator(order, orderBy), filterName) : [];
    const isNotFound = !filteredUsers.length && !!filterName;

    // Set status of trangThai
    function mapTrangThaiToStatus(trangThai) {
        return trangThai === 0 ? <Chip
            label="Hoạt động"
            color="primary"
            variant="outlined"
            style={{ color: 'white', backgroundColor: 'green', border: 'none' }}
        /> : trangThai === 10 ? <Chip
            label="Dừng hoạt động"
            color="secondary"
            variant="outlined"
            style={{ color: 'white', backgroundColor: 'red', border: 'none' }}
        /> : <Chip
            label="Không xác định"
            color="warning"
            variant="outlined"
            style={{ color: 'white', backgroundColor: 'red', border: 'none' }}
        />;
    }
    const navigate = useNavigate();

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
    const [openReset, setOpenReset] = useState(false);
    const [information, setInformation] = useState();
    const handleDelete = () => {
        setInformation(object);
        setOpenDelete(true);
        setOpen(null);
    };
    const handleClose = () => {
        setOpenDelete(false);
        setOpenReset(false);
        getListData();
    };

    // Handle edit
    const handleEdit = () => {
        navigate(`/dashboard/coupons/update/${object.idCoupon}`);
    };

    function formatCurrency(price) {
        if (!price) return "0";

        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });

        return formatter.format(price);
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const dateTime = new Date(dateString);
        const formattedEndDate = format(dateTime, 'HH:mm dd/MM/yyyy');

        return formattedEndDate;
    };

    const handleReset = () => {
        setInformation(object);
        setOpenReset(true);
        setOpen(null);
    }


    return (
        <>
            <Helmet>
                <title> Coupons | 5F Store </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Coupons
                    </Typography>
                    <Link to={'/dashboard/coupons/add'}>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                            Thêm Coupon
                        </Button>
                    </Link>
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
                                    rowCount={listData.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const { idCoupon, tenChuongTrinh, trangThai, code, moTa, thoiGianKetThuc, thoiGianTao, soLuongHienTai, phanTram, tienToiThieu } = row;
                                        const selectedUser = selected.indexOf(idCoupon) !== -1;

                                        return (
                                            <TableRow hover key={idCoupon} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, idCoupon)} />
                                                </TableCell>
                                                {/* {id: 'stt', label: 'STT', alignRight: false },
                                                {id: 'name', label: 'Chương Trình', alignRight: false },
                                                {id: 'code', label: 'Code', alignRight: false },
                                                {id: 'moTa', label: 'Mô Tả', alignRight: false },
                                                {id: 'thoigian', label: 'Thời Gian', alignRight: false },
                                                {id: 'soLuong', label: 'Số Lượng', alignRight: false },
                                                {id: 'phanTram', label: 'Mức Giảm', alignRight: false },
                                                {id: 'tienToiThieu', label: 'Số Tiền Tối Thiểu', alignRight: false },
                                                {id: 'trangthai', label: 'Trạng Thái', alignRight: false },
                                                {id: 'thaotac', label: 'Thao Tác', alignRight: false } */}
                                                <TableCell align="left">{index + 1}</TableCell>
                                                <TableCell align="left">{tenChuongTrinh}</TableCell>
                                                <TableCell align="left">{code}</TableCell>
                                                <TableCell align="left">{moTa}</TableCell>
                                                <TableCell align="left">{`${formatDate(thoiGianTao)} - ${formatDate(thoiGianKetThuc)}`}</TableCell>
                                                <TableCell align="left">{soLuongHienTai}</TableCell>
                                                <TableCell align="left">{`${phanTram} %`}</TableCell>
                                                <TableCell align="left">{`${formatCurrency(tienToiThieu)}`}</TableCell>
                                                <TableCell align="left">{mapTrangThaiToStatus(trangThai)}</TableCell>
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
                <MenuItem onClick={() => handleEdit()}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                {object.trangThai === 10 && (
                    <MenuItem onClick={() => handleReset()} sx={{ color: 'primary.main' }}>
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
            <ModalDeleteCoupon open={openDelete} handleClose={handleClose} information={information} />
            <ModalResetCoupon open={openReset} handleClose={handleClose} information={information} />
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
