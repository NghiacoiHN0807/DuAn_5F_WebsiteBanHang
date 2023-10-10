import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {useEffect} from "react";
import {deleteTaiKhoanKH, fetchAllTKKH} from "../../services/taiKhoanKhachHangSevice";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {useNavigate} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import {toast} from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

const TableTKKhachHang = () => {
    const [listData, setListData] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();
    const getListData = async (page, query) => {
        try {
            let res = await fetchAllTKKH(page, query);
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
        getListData(0);
    }, []);





    const columns = [
        {field: "index", headerName: "#####", width: 50 },
        {field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 120},
        {field: "tenKh", headerName: "Tên Khách Hàng", width: 120},
        {field: "sdtKh", headerName: "Số Điện Thoại", width: 120,},
        {field: "email", headerName: "Email", width: 150,},
        {
            field: "trangThai",
            headerName: "Trạng Thái",
            width: 200,
            renderCell: (params) => {
                const {value: trangThai} = params;
                let badgeVariant, statusText;
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
        // {field: "diaChi" , headerName: "Địa Chỉ",width: 100}
        {
            field: "actions",
            headerName: "Hành Động",
            width: 300,
            renderCell: (params) => {
                const {row} = params;
                return (
                    <div>
                        <Button
                            size={"small"}
                            variant="contained"
                            color="primary"
                            onClick={() => handlClickRow(row)}
                            startIcon={<EditIcon/>}
                        >
                            Chi Tiết
                        </Button>
                        <Button
                            size={"small"}
                            variant="contained"
                            color="secondary"
                            startIcon={<AddLocationAltIcon/>}
                            onClick={() => handAddDiaChi(row)}
                        >
                            Địa Chỉ
                        </Button>
                        <Button
                            size={"small"}
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon/>}
                            onClick={() => handleClickOpenDelete(row)}
                        >
                            Xóa
                        </Button>
                    </div>
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
            tenKh: item.ho +' '+ item.ten ,
            sdtKh: item.sdt,
            email: item.email,
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
    const handAddDiaChi = (item) =>{
        navigate(`/dia-chi/${item.maTaiKhoan}`);
    };

    const handlClickRow = (item) => {
        // console.log("Check click: ", item);
        navigate(`/tai-khoan-KH/detail/${item.idTaiKhoan}`);
    };


    const handleDelete = async (item) => {
        let res = await deleteTaiKhoanKH(item.id);
        console.log("Check res: ", res);
        if (res) {
            toast.success("Xóa thành công!");
            handleClose();
            handlePageClick(0);
        } else {
            toast.error("Xóa thất bại!");
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
                                <Button variant="outline-success"  startIcon={< SearchIcon />} className="search-button">

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
                        <Button variant="contained" color="success" startIcon={<PersonAddAlt1Icon/>}  onClick={() => handAdd()} >
                            Tạo Tài Khoản Mới
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
                        // onRowClick={(params) => handlClickRow(params.row)}
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
            </div>
        </>
    );
};

export default TableTKKhachHang;
