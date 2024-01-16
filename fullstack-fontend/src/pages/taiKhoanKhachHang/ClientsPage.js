import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";


import Card from "@mui/material/Card";
import {deleteTaiKhoanKH, fetchAllTKKH} from "../../service/taiKhoanKhachHangSevice";
import Iconify from "../../components/iconify";
import {useAlert} from "../../layouts/dashboard/AlertContext";


const ClientPage = () => {
    const [listData, setListData] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();

    const { showAlert } = useAlert();

    const getListData = async (page, query) => {
        try {
            const res = await fetchAllTKKH(page, query);
            setListData(res);
            setOriginalListData(res);
            setListData(res);

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListData(0);
    }, []);


    const columns = [
        { field: "index", headerName: "###", width: 80},
        { field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 120 },
        { field: "tenKh", headerName: "Tên Khách Hàng", width: 240 },
        { field: "sdtKh", headerName: "Số Điện Thoại", width: 140, },
        { field: "email", headerName: "Email", width: 260, },
        {
            field: "trangThai",
            headerName: "Trạng Thái",
            width: 180,
            renderCell: (params) => {
                const { value: trangThai } = params;
                let chipColor;
                let statusText;

                switch (trangThai) {
                    case 0:
                        chipColor = "success";
                        statusText = "Đã kích hoạt";
                        break;
                    case 10:
                        chipColor = "error";
                        statusText = "Đã Ngưng hoạt động";
                        break;
                    default:
                        chipColor = "default";
                        statusText = "Chưa Kích Hoạt";
                        break;
                }

                return (
                    <Chip label={statusText} color={chipColor} />
                );
            },
        },

        {
            field: "actions",
            headerName: "Hành Động",
            width: 100,
            renderCell: (params) => {
                const { row } = params;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [anchorEl, setAnchorEl] = useState(null);

                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };

                return (
                    <>
                        <IconButton size="large" color="inherit" onClick={handleClick}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                        <Menu
                            id={`menu-${row.id}`}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem  onClick={() => handlClickRow(row)} sx={{color : 'green'}} >
                                <EditIcon sx={{ marginRight: 1 }}/> Cập nhật
                            </MenuItem>
                            <MenuItem onClick={() => handAddDiaChi(row)} sx={{color : 'brown'}}>
                                <AddLocationAltIcon sx={{ marginRight: 1 }}/>Địa Chỉ
                            </MenuItem>
                            <MenuItem onClick={() => handleClickOpenDelete(row)} sx={{color : 'red'}}>
                                <DeleteIcon sx={{ marginRight: 1 }}/>Xóa
                            </MenuItem>
                        </Menu>
                    </>
                );
            },
        },

    ];
    // Xử lý dữ liệu của bảng vào mảng rows
    const rows = listData
        .filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(searchKeyword.toLowerCase())
            )
        )
        .map((item, index) => ({
            idTaiKhoan: item.idTaiKhoan,
            id: item.idTaiKhoan,
            index: index + 1,
            maTaiKhoan: item.maTaiKhoan,
            tenKh: `${item.ho} ${item.ten}`,
            sdtKh: item.sdt,
            email: item.email,
            trangThai: item.trangThai,
        }));


    const handlePageClick = (page) => {
        getListData(page);
    };

    useEffect(() => {
        const filteredData =
            selectedStatus === "Tất cả"
                ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
                : originalListData.filter(
                    (item) =>
                        item.trangThai === parseInt(selectedStatus, 10)
                );
        setListData(filteredData);
    }, [selectedStatus, originalListData]);


    const handAdd = () => {
        navigate("/dashboard/clients/add");

    };
    const handAddDiaChi = (item) => {
        navigate(`/dashboard/address/${item.maTaiKhoan}`);
    };

    const handlClickRow = (item) => {

        navigate(`/dashboard/clients/detail/${item.idTaiKhoan}`);

    };


    const handleDelete = async (item) => {
        const res = await deleteTaiKhoanKH(item.id);
        console.log("Check res: ", res);
        if (res) {
            showAlert('success', 'Xóa Thành Công');
            handleClose();
            handlePageClick(0);
        } else {
            showAlert('warning', 'Xóa Thất Bại');
            handleClose();
        }
    };

    const [open, setOpen] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    const handleClickOpenDelete = (id) => {
        setOpen(true);
        setIdDelete(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <TextField
                    sx={{m: 1, minWidth: 180}}
                    select
                    id="status-select"
                    value={selectedStatus}
                    label="Trạng Thái"
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <MenuItem value={"Tất cả"}>Tất Cả</MenuItem>
                    <MenuItem value={0}>Đang Hoạt Động</MenuItem>
                    <MenuItem value={10}>Đã Bị Xóa</MenuItem>
                </TextField>
                <GridToolbarExport
                    csvOptions={{
                        fileName: 'Client',
                        utf8WithBom: true,
                    }}
                />
            </GridToolbarContainer>
        );
    }


    return (
        <>
            <Helmet>
                <title> Khách Hàng | 5F Store </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tài Khoản Khách Hàng
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handAdd()}>
                        Tài Khoản Mới
                    </Button>
                </Stack>
                <Card variant="outlined">
                    <TextField
                        sx={{ ml: 1, flex: 1 }}
                        margin="dense"
                        placeholder="Tìm Kiếm"
                        InputProps={{
                            startAdornment: (
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />


                    <DataGrid
                        margin="dense"
                        sx={{
                            border: 'none'
                        }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        slots={{ toolbar: CustomToolbar }}
                        getRowSpacing={(params) => ({
                            top: params.isFirstVisible ? 0 : 5,
                            bottom: params.isLastVisible ? 0 : 5,
                        })}
                        pageSizeOptions={[5, 10, 15]}
                    />
                </Card>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Xác nhận xóa?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa Tài Khoản này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={() => handleDelete(idDelete)} autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default ClientPage;
