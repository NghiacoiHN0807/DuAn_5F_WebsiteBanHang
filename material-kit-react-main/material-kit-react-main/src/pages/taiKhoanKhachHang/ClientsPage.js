import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useNavigate} from "react-router-dom";
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import Badge from "react-bootstrap/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {deleteTaiKhoanKH, fetchAllTKKH} from "../../service/taiKhoanKhachHangSevice";
import Iconify from "../../components/iconify";


const ClientPage = () => {
    const [listData, setListData] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();
    const getListData = async (page, query) => {
        try {
            const res = await fetchAllTKKH(page, query);
            setListData(res.content);
            setNumberPages(Math.ceil(res.totalPages));
            setOriginalListData(res.content);
            setListData(res.content);
            setNumberPages(Math.ceil(res.totalPages));

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListData(0);
    }, []);


    const columns = [
        {field: "index", headerName: "Index", width: 50},
        {field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 120},
        {field: "tenKh", headerName: "Tên Khách Hàng", width: 180},
        {field: "sdtKh", headerName: "Số Điện Thoại", width: 120,},
        {field: "email", headerName: "Email", width: 200,},
        {
            field: "trangThai",
            headerName: "Trạng Thái",
            width: 200,
            renderCell: (params) => {
                const {value: trangThai} = params;
                let badgeVariant;
                let statusText;

                switch (trangThai) {
                    case 1:
                        badgeVariant = "primary";
                        statusText = "Đã kích hoạt";
                        break;
                    case 4:
                        badgeVariant = "info";
                        statusText = "Đã Ngưng hoạt động";
                        break;
                    default:
                        badgeVariant = "light";
                        statusText = "Chưa Kích Hoạt";
                        break;
                }

                return (
                    <Badge bg={badgeVariant} text="dark">
                        {statusText}
                    </Badge>
                );
            },

        },

        {
            field: "actions",
            headerName: "Hành Động",
            width: 100,
            renderCell: (params) => {
                const {row} = params;
                return [
                        <GridActionsCellItem
                            color="info"
                            onClick={() => handlClickRow(row)}
                            icon={<EditIcon/>}
                        />,
                        <GridActionsCellItem
                            color="inherit"
                            icon={<AddLocationAltIcon/>}
                            onClick={() => handAddDiaChi(row)}
                        />,
                        <GridActionsCellItem
                            color="error"
                            icon={<DeleteIcon/>}
                            onClick={() => handleClickOpenDelete(row)}
                        />
                ];
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
        toast.success('Chuyển Trang Thêm thành công!');
        navigate("/dashboard/clients/add");
    };
    const handAddDiaChi = (item) => {
        toast.success('Chuyển Trang Địa Chỉ thành công!');

        navigate(`/dashboard/address/${item.maTaiKhoan}`);
    };

    const handlClickRow = (item) => {
        console.log("Check click: ", item);
        toast.success('Chi tiết  thành công!');

        navigate(`/dashboard/clients/detail/${item.idTaiKhoan}`);

    };


    const handleDelete = async (item) => {
        const res = await deleteTaiKhoanKH(item.id);
        console.log("Check res: ", res);
        if (res) {
            toast.success('Xóa thành công!');
            handleClose();
            handlePageClick(0);
        } else {
            toast.error('Xóa thất bại!');
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
                <GridToolbarFilterButton/>
                <GridToolbarColumnsButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport
                    csvOptions={{
                        fileName: 'Client',
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
                        <MenuItem value={2}>Ngưng Hoạt Động</MenuItem>
                    </Select>
                </FormControl>

            </GridToolbarContainer>
        );
    }


    return (
        <>
            <Helmet>
                <title> Client || 5F Store </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tài Khoản Khách Hàng
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>} onClick={() => handAdd()}>
                        Tài Khoản Mới
                    </Button>
                </Stack>
                <Card sx={{display: 'flex', alignItems: 'center'}}>
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 400,
                        }}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Tìm Kiếm"
                            inputProps={{'aria-label': 'Tìm Kiếm'}}
                        />
                        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </Card>

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
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Pagination
                        onChange={(event, page) => handlePageClick(page - 1)} // Subtract 1 from page value
                        count={numberPages}
                        variant="outlined"
                    />
                </Stack>
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
