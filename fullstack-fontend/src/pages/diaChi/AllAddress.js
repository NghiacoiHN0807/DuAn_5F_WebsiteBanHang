import {Helmet} from "react-helmet-async";
import React, {useEffect, useRef, useState} from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {
    Card,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {fetchAllDiaChi} from "../../service/diaChiSevice";
import AlertSnackbar from "../../layouts/dashboard/AlertSnackbar";


const AllAddress = () => {
    const [listData, setListData] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [selectedLoaiDiaChi, setSelectedLoaiDiaChi] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();
    const isMounted = useRef(true);

    const getListData = async (page, query) => {
        try {
            const res = await fetchAllDiaChi(page, query);
            if (isMounted.current) {
                setListData(res);

                setOriginalListData(res);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        getListData(0);
        // getListTP();
        return () => {
            isMounted.current = false;
        };
    }, []);



    const columns = [
        {field: "index", headerName: "##", width: 30},
        {field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 130},
        {field: "tenNguoiNhan", headerName: "Tên Người Nhận", width: 120},
        {field: "sdtKh", headerName: "Số Điện Thoại", width: 120,},
        {field: "diaChi", headerName: "Địa Chỉ", width: 300,},
        {field: "diaChiCuThe", headerName: "Địa Chỉ Cụ Thể", width: 210,},
        {
            field: "loaiDiaChi",
            headerName: "Loại Địa Chỉ",
            width: 100,
            renderCell: (params) => {
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

                return (
                    <Badge bg={badgeVariant} text="dark">
                        {statusText}
                    </Badge>
                );
            },
        },
        {
            field: "trangThai",
            headerName: "Trạng Thái",
            width: 120,
            renderCell: (params) => {
                const {value: trangThai} = params;
                let badgeVariant
                let statusText;
                switch (trangThai) {
                    case 0:
                        badgeVariant = "primary";
                        statusText = "Đang Hoạt Động";
                        break;
                    case 10:
                        badgeVariant = "danger";
                        statusText = "Đã Bị Xóa";
                        break;
                    default:
                        badgeVariant = "light";
                        statusText = "Đang Bị Null";
                        break;
                }

                return (
                    <Badge bg={badgeVariant} text="dark">
                        {statusText}
                    </Badge>
                );
            },
        },
    ];

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


    const handlePageClick = (page) => {
        getListData(page + 1);
    };


    useEffect(() => {
        const filteredData =
            selectedStatus === "Tất cả"
                ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
                : originalListData.filter(
                    (item) =>
                        item.trangThai === parseInt(selectedStatus, 10)
                );

        const filteredLoai =
            selectedLoaiDiaChi === "Tất cả"
                ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
                : originalListData.filter(
                    (item) =>
                        item.loaiDiaChi === parseInt(selectedLoaiDiaChi, 10)
                );
        const combinedFilteredData = filteredData.filter(item =>
            filteredLoai.includes(item)
        );

        setListData(combinedFilteredData);
    }, [selectedStatus, selectedLoaiDiaChi, originalListData]);


    const handlClickRow = (item) => {
        // console.log("Check click: ", item);
        navigate(`/dashboard/address/detail/${item.id}`);
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>

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
                        <MenuItem value={0}>Đang Hoạt Động</MenuItem>
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
                <GridToolbarExport
                    csvOptions={{
                        fileName: 'address',
                        utf8WithBom: true,
                    }}
                />

            </GridToolbarContainer>
        );
    }


    return (
        <> <Helmet>
            <title> Address || 5F Store </title>
        </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Thông Tin Tất Cả Địa Chỉ
                    </Typography>
                </Stack>
                <Card>
                <TextField
                    variant="outlined"
                    margin="dense"
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
                    sx={{
                        border: 'none'
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    slots={{toolbar: CustomToolbar}}
                    pageSizeOptions={[5, 10, 15]}
                    onRowClick={(params) => handlClickRow(params.row)}
                />
                </Card>
            </Container>
            <AlertSnackbar />
        </>
    );
};

export default AllAddress;
