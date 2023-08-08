import Nav from "react-bootstrap/Nav";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faMagnifyingGlass,} from "@fortawesome/free-solid-svg-icons";
// import "../scss/OderManagement.scss";
import {useEffect, useState} from "react";
import {fetchDiaChiByTK} from "../../services/diaChiSevice";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {useNavigate, useParams} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {Button} from "@mui/material";

const TableAllDiaChi = () => {
    const param = useParams();
    const idTK = param.id;
    const [listData, setListData] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();
    const getListData = async (idTK,page) => {
        try {
            let res = await fetchDiaChiByTK(idTK,page);
            console.log("Check res: ", res);
            setListData(res.content);
            setNumberPages(Math.ceil(res.totalPages));
            // Lưu trữ danh sách dữ liệu gốc
            setOriginalListData(res.content);

            // Đồng thời cập nhật danh sách dữ liệu hiện tại
            setListData(res.content);
            setNumberPages(Math.ceil(res.totalPages));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListData(idTK,0);
    }, [idTK]);

    const columns = [
        {field: "index", headerName: "##", width: 30},
        {field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 130},
        {field: "tenNguoiNhan", headerName: "Tên Người Nhận", width: 120},
        {field: "sdtKh", headerName: "Số Điện Thoại", width: 120,},
        {field: "diaChi", headerName: "Địa Chỉ", width: 210,},
        {field: "diaChiCuThe", headerName: "Địa Chỉ Cụ Thể", width: 210,},
        {
            field: "loaiDiaChi",
            headerName: "Loại Địa Chỉ",
            width: 100,
            renderCell: (params) => {
                const {value: loaiDiaChi} = params;
                let badgeVariant, statusText;
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
            width: 100,
            renderCell: (params) => {
                const {value: trangThai} = params;
                let badgeVariant, statusText;
                switch (trangThai) {
                    case 1:
                        badgeVariant = "primary";
                        statusText = "Đang Hoạt Động";
                        break;
                    case 4:
                        badgeVariant = "info";
                        statusText = "Đã Ngưng hoạt động";
                        break;
                    default:
                        badgeVariant = "light";
                        statusText = "Mặc Định";
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
        .filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(searchKeyword.toLowerCase())
            )
        )
        .map((item, index) => ({
            idTaiKhoan: item.taiKhoan.idTaiKhoan,
            id:  item.taiKhoan.idTaiKhoan,
            index: index + 1,
            maTaiKhoan: item.taiKhoan.maTaiKhoan,
            tenNguoiNhan: item.tenNguoiNhan ,
            sdtKh: item.sdt,
            diaChi:  item.tinhThanh+", "+item.quanHuyen+", "+item.phuongXa,
            diaChiCuThe: item.diaChiCuThe,
            loaiDiaChi: item.loaiDiaChi,
            // tinhThanh: item.tinhThanh,
            // quanHuyen: item.quanHuyen,
            // phuongXa: item.phuongXa,
            trangThai: item.trangThai,
        }));
    //Next Page
    const handlePageClick = (page) => {
        getListData(page);
    };
    //filter status
    useEffect(() => {
        const filteredData =
            selectedStatus === "Tất cả"
                ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
                : originalListData.filter(
                    (item) =>
                        item.trangThai === parseInt(selectedStatus)
                );
        setListData(filteredData);
    }, [selectedStatus, originalListData]);

    //Click on the table

    const handAdd = () => {
        navigate("/tai-khoan-KH/them-tai-khoan");
    };
    const handlClickRow = (item) => {
        // console.log("Check click: ", item);
        navigate(`/tai-khoan-KH/detail/${item.idTaiKhoan}`);
    };
    return (
        <>
            <div className="row row-order-management">
                <div className="row">
                    <div className="col-4">
                        <Nav>
                            <Form className="d-flex search-form">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2 search-input"
                                    aria-label="Search"
                                    size="sm"
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <Button variant="outline-success" className="search-button">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xs"/>
                                </Button>
                            </Form>
                        </Nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-5">
                        <label htmlFor="status-select">Trạng Thái: </label>
                        <select
                            id="status-select"
                            className="select-green"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="Tất cả">Tất cả</option>
                            <option value="0">Chưa kích hoạt</option>
                            <option value="1">Đã kích hoạt</option>
                            <option value="2">Đã Ngưng Hoạt động</option>
                        </select>
                    </div>
                    <div className="col-5">
                        <Button variant="contained" color="success"  onClick={() => handAdd()} >
                            Tạo Địa Chỉ Mới
                            <FontAwesomeIcon icon={faCartPlus} size="lg"/>{" "}
                        </Button>
                    </div>
                </div>

                <div style={{height: 500, width: "100%"}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 10},
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                        onRowClick={(params) => handlClickRow(params.row)}
                    />
                </div>
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
            </div>
        </>
    );
};

export default TableAllDiaChi;
