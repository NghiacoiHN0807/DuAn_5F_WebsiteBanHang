import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Badge from "react-bootstrap/Badge";
import Stack from "@mui/material/Stack";
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
// import {toast, ToastContainer} from "react-toastify";
import {deleteDiaChi, fetchDiaChiByTK} from "../../service/diaChiSevice";
import {getPhuongXa, getQuanHuyen, getTinhThanhPho} from "../../service/apiDiaChi";
import Iconify from "../../components/iconify";
import {useAlert} from "../../layouts/dashboard/AlertContext";


const AddressByClient = () => {
    const param = useParams();
    const idTK = param.id;
    const [listData, setListData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [selectedLoaiDiaChi, setSelectedLoaiDiaChi] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();



    const {showAlert} = useAlert();

    const getListData = async (idTK, page) => {
        try {
            const res = await fetchDiaChiByTK(idTK, page);
            setListData(res);
            setOriginalListData(res);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListData(idTK, 0);
    }, [idTK]);

    const fetchUpdatedData = (page) => {
        getListData(idTK, page);
    };


    const columns = [
        {field: "index", headerName: "##", width: 30},
        // {field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 130},
        {field: "tenNguoiNhan", headerName: "Tên Người Nhận", width: 120},
        {field: "sdtKh", headerName: "Số Điện Thoại", width: 120,},
        {field: "diaChi", headerName: "Địa Chỉ", width: 200,},
        {field: "diaChiCuThe", headerName: "Địa Chỉ Cụ Thể", width: 210,},
        {
            field: "loaiDiaChi", headerName: "Loại Địa Chỉ", width: 100, renderCell: (params) => {
                const {value: loaiDiaChi} = params;
                let badgeVariant;
                let statusText;
                switch (loaiDiaChi) {
                    case 1:
                        badgeVariant = "primary";
                        statusText = "Nơi Làm Việc";
                        break;
                    default:
                        badgeVariant = "light";
                        statusText = "Nhà Riêng";
                        break;
                }

                return (<Badge bg={badgeVariant} text="dark">
                    {statusText}
                </Badge>);
            },
        }, {
            field: "trangThai", headerName: "Trạng Thái", width: 160, renderCell: (params) => {
                const {value: trangThai} = params;
                let badgeVariant;
                let statusText;
                switch (trangThai) {
                    case 1:
                        badgeVariant = "primary";
                        statusText = "Đã Xác Nhận";
                        break;
                    case 4:
                        badgeVariant = "info";
                        statusText = "Đã Ngưng hoạt động";
                        break;
                    default:
                        badgeVariant = "light";
                        statusText = "Chưa Xác Nhận";
                        break;
                }

                return (<Badge bg={badgeVariant} text="dark">
                    {statusText}
                </Badge>);
            },
        }, {
            field: "actions", headerName: "Hành Động", width: 100, renderCell: (params) => {
                const {row} = params;
                return [
                    <GridActionsCellItem
                        color="primary"
                        onClick={() => handlClickRow(row)}
                        icon={<EditIcon/>}
                    />,
                    <GridActionsCellItem
                        color="error"
                        icon={<DeleteIcon/>}
                        onClick={() => handleClickOpenDelete(row)}
                    />,

                ];
            },
        },];


    // Xử lý dữ liệu của bảng vào mảng rows
    const rows = listData
        .filter((item) => {
            const valuesToSearch = [item.taiKhoan.maTaiKhoan, // Search maTaiKhoan directly
                item.tenNguoiNhan, item.sdt, item.tinhThanh, item.quanHuyen, item.phuongXa, item.diaChiCuThe, // Convert trangThai to string for search
            ];
            return valuesToSearch.some((value) => String(value).toLowerCase().includes(searchKeyword.toLowerCase()));
        })
        .map((item, index) => ({
            idTaiKhoan: item.taiKhoan.idTaiKhoan,
            id: item.id,
            index: index + 1,
            maTaiKhoan: item.taiKhoan.maTaiKhoan,
            tenNguoiNhan: item.tenNguoiNhan,
            sdtKh: item.sdt,
            diaChi: `${item.tinhThanh}, ${item.quanHuyen}, ${item.phuongXa}`,
            diaChiCuThe: item.diaChiCuThe,
            loaiDiaChi: item.loaiDiaChi,
            trangThai: item.trangThai,
        }));



    useEffect(() => {
        const filteredData = selectedStatus === "Tất cả" ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
            : originalListData.filter((item) => item.trangThai === parseInt(selectedStatus, 10));

        const filteredLoai = selectedLoaiDiaChi === "Tất cả" ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
            : originalListData.filter((item) => item.loaiDiaChi === parseInt(selectedLoaiDiaChi, 10));
        const combinedFilteredData = filteredData.filter(item => filteredLoai.includes(item));

        setListData(combinedFilteredData);
    }, [selectedStatus, selectedLoaiDiaChi, originalListData]);

    const handlClickRow = (item) => {
        navigate(`/dashboard/address/detail/${item.id}`);
    };
    const handAdd = () => {
        navigate(`/dashboard/address/add/${idTK}`);
    };


    const handleDelete = async (item) => {
        const res = await deleteDiaChi(item.id);
        console.log("Check res: ", res);
        if (res) {
            showAlert('success', 'Chuyển trang thêm Thành Công');
            handleClose();
            fetchUpdatedData(0);
        } else {
            showAlert('warning', 'Thêm Địa Chỉ Thất Bại !');
            handleClose();
        }
    };

    // dong mo confirm
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
                <GridToolbarFilterButton/>
                <GridToolbarColumnsButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport
                    csvOptions={{
                        fileName: 'address',
                        utf8WithBom: true,
                    }}
                />

                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="status-select">Trạng Thái:</InputLabel>
                    <Select
                        labelId="status-select"
                        id="status-select"
                        value={selectedStatus}
                        label="Trạng Thái"
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <MenuItem value={"Tất cả"}>Tất Cả</MenuItem>
                        <MenuItem value={0}>Chưa Kích Hoạt</MenuItem>
                        <MenuItem value={1}>Đã Kích Hoạt</MenuItem>
                        <MenuItem value={4}>Ngưng Hoạt Động</MenuItem>
                        <MenuItem value={10}>Đã Bị Xóa</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="status-select">Loại Địa Chỉ:</InputLabel>
                    <Select
                        labelId="status-select"
                        id="status-select"
                        value={selectedStatus}
                        label="Trạng Thái"
                        onChange={(e) => setSelectedLoaiDiaChi(e.target.value)}
                    >
                        <MenuItem value={"Tất cả"}>Tất Cả</MenuItem>
                        <MenuItem value={0}>Nhà Riêng</MenuItem>
                        <MenuItem value={1}>Nơi Làm Việc</MenuItem>
                    </Select>
                </FormControl>
            </GridToolbarContainer>
        );
    }


    return (<>

        <Helmet>
            <title> Address || 5F Store </title>
        </Helmet>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Thông Tin Địa Chỉ Của Tài Khoản: {idTK}
                </Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>} onClick={() => handAdd()}>
                    Tạo Địa Chỉ Mới
                </Button>
            </Stack>
            <TextField
                variant="outlined"
                sx={{ml: 1, flex: 1}}
                placeholder="Tìm Kiếm"
                InputProps={{
                    startAdornment: (
                        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    ),
                }}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                slots={{toolbar: CustomToolbar}}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                pageSizeOptions={[5, 10, 15]}
            />


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
                    Bạn có chắc chắn muốn xóa địa chỉ này không?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={() => handleDelete(idDelete)} autoFocus>
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>


    </>);
};

export default AddressByClient;
