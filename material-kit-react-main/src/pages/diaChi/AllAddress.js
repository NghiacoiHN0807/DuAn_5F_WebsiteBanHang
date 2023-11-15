import {Helmet} from "react-helmet-async";
import React, {useEffect, useRef, useState} from "react";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {
    Card,
    Container,
    FormControl,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select, TextField,
    Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {getPhuongXa, getQuanHuyen, getTinhThanhPho} from "../../service/apiDiaChi";
import {fetchAllDiaChi} from "../../service/diaChiSevice";


const AllAddress = () => {
    const [listData, setListData] = useState([]);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [selectedLoaiDiaChi, setSelectedLoaiDiaChi] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();
    const isMounted = useRef(true);
    const [listTP, setListTP] = useState([]);
    const [listQH, setListQH] = useState([]);
    const [listPX, setListPX] = useState([]);

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
        getListTP();
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (listData.length > 0) {
            listData.forEach((item) => {
                fetchQuanHuyenAndPhuongXa(item.tinhThanh, item.quanHuyen);
            });
        }
        // eslint-disable-next-line
    }, [listData]);
    const getListTP = async () => {
        const resTP = await getTinhThanhPho();

        setListTP(resTP?.data.results);

    };

    const getNameByIdTP = (id) => {
        const province = listTP.find((item) => item.province_id === id);
        return province ? province.province_name : null;
    };
    const getNameByIdQH = (id) => {
        const province = listQH.find((item) => item.district_id === id);
        return province ? province.district_name : null;
    };
    const getNameByIdPX = (id) => {
        const province = listPX.find((item) => item.ward_id === id);
        return province ? province.ward_name : null;
    };

    const fetchQuanHuyenAndPhuongXa = async (tinhThanhID, quanHuyenID) => {
        const existingQH = listQH.find(item => item.district_id === quanHuyenID);
        const existingPX = listPX.find(item => item.ward_id === quanHuyenID);

        if (existingQH && existingPX) {
            // Data already exists, no need to fetch again
            return;
        }

        const quanHuyenData = await getQuanHuyen(tinhThanhID);
        const phuongXaData = await getPhuongXa(quanHuyenID);

        if (quanHuyenData.status === 200 && phuongXaData.status === 200) {
            setListQH(prevListQH => [...prevListQH, ...quanHuyenData.data.results]);
            setListPX(prevListPX => [...prevListPX, ...phuongXaData.data.results]);
        }
    };


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
                    case 1:
                        badgeVariant = "primary";
                        statusText = "Đã Xác Nhận";
                        break;
                    case 4:
                        badgeVariant = "info";
                        statusText = "Đã Ngưng hoạt động";
                        break;
                    case 10:
                        badgeVariant = "danger";
                        statusText = "Đã Bị Xóa";
                        break;
                    default:
                        badgeVariant = "light";
                        statusText = "Chưa Xác Nhận";
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
            diaChi: `${getNameByIdTP(item.tinhThanh)}, ${getNameByIdQH(item.quanHuyen)}, ${getNameByIdPX(item.phuongXa)}`,
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
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    slots={{toolbar: CustomToolbar}}
                    pageSizeOptions={[5, 10, 15]}
                    onRowClick={(params) => handlClickRow(params.row)}
                />
            </Container>
        </>
    );
};

export default AllAddress;
