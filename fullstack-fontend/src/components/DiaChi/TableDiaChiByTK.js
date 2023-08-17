import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
    fetchDiaChiByTK,
    deleteDiaChi,
} from "../../services/diaChiSevice";
import {
    getPhuong_Xa,
    getQuan_Huyen,
    getTinh_ThanhPho,
} from "../../services/apiDiaChi";

const TableDiaChiByTK = () => {
    const param = useParams();
    const idTK = param.id;
    const [listData, setListData] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [selectedLoaiDiaChi, setSelectedLoaiDiaChi] = useState("Tất cả");
    const [originalListData, setOriginalListData] = useState([]);
    const navigate = useNavigate();

    const [listTP, setListTP] = useState([]);
    const [listQH, setListQH] = useState([]);
    const [listPX, setListPX] = useState([]);

    const getListData = async (idTK, page) => {
        try {
            const res = await fetchDiaChiByTK(idTK, page);
            setListData(res.content);
            setNumberPages(Math.ceil(res.totalPages));
            setOriginalListData(res.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListData(idTK, 0);
        getListTP();
    }, [idTK]);

    useEffect(() => {
        listData.forEach((item) => {
            fetchQuanHuyenAndPhuongXa(item.tinhThanh, item.quanHuyen);
        });
        // eslint-disable-next-line
    }, [listData]);

    const fetchUpdatedData = (page) => {
        getListData(idTK, page);
    };


    const columns = [{field: "index", headerName: "##", width: 30}, {
        field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 130
    }, {field: "tenNguoiNhan", headerName: "Tên Người Nhận", width: 120}, {
        field: "sdtKh", headerName: "Số Điện Thoại", width: 120,
    }, {
        field: "diaChi", headerName: "Địa Chỉ", width: 210,
    }, // {field: "diaChiCuThe", headerName: "Địa Chỉ Cụ Thể", width: 210,},
        {
            field: "loaiDiaChi", headerName: "Loại Địa Chỉ", width: 100, renderCell: (params) => {
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

                return (<Badge bg={badgeVariant} text="dark">
                    {statusText}
                </Badge>);
            },
        }, {
            field: "trangThai", headerName: "Trạng Thái", width: 120, renderCell: (params) => {
                const {value: trangThai} = params;
                let badgeVariant, statusText;
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
            field: "actions", headerName: "Hành Động", width: 250, renderCell: (params) => {
                const {row} = params;
                return (<div>
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
                        startIcon={<DeleteIcon/>}
                        onClick={() => handleClickOpenDelete(row)}
                    >
                        Xóa
                    </Button>

                </div>);
            },
        },];
    const getListTP = async () => {
        let resTP = await getTinh_ThanhPho();
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

        const quanHuyenData = await getQuan_Huyen(tinhThanhID);
        const phuongXaData = await getPhuong_Xa(quanHuyenID);

        if (quanHuyenData.status === 200 && phuongXaData.status === 200) {
            setListQH(prevListQH => [...prevListQH, ...quanHuyenData.data.results]);
            setListPX(prevListPX => [...prevListPX, ...phuongXaData.data.results]);
        }
    };


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
            // diaChiCuThe: item.diaChiCuThe,
            loaiDiaChi: item.loaiDiaChi,
            trangThai: item.trangThai,
        }));

    //Next Page
    const handlePageClick = (page) => {
        getListData(page + 1);
    };
    //filter status
    useEffect(() => {
        const filteredData = selectedStatus === "Tất cả" ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
            : originalListData.filter((item) => item.trangThai === parseInt(selectedStatus));

        const filteredLoai = selectedLoaiDiaChi === "Tất cả" ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
            : originalListData.filter((item) => item.loaiDiaChi === parseInt(selectedLoaiDiaChi));
        const combinedFilteredData = filteredData.filter(item => filteredLoai.includes(item));

        setListData(combinedFilteredData);
    }, [selectedStatus, selectedLoaiDiaChi, originalListData]);

    const handlClickRow = (item) => {
        navigate(`/dia-chi/detail/${item.id}`);
    };
    const handAdd = () => {
        navigate(`/dia-chi/add/${idTK}`);
    };

    //Click on the table
    const handleDelete = async (item) => {
        let res = await deleteDiaChi(item.id);
        console.log("Check res: ", res);
        if (res) {
            toast.success("Xóa thành công!");
            handleClose();
            fetchUpdatedData(0);
        } else {
            toast.error("Xóa thất bại!");
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


    return (<>
        <div className="row row-order-management">
            <div className="row">
                <div className="col-8">
                   <h4>Tài Khoản: {idTK}</h4>
                </div>
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
                            <Button variant="outline-success" startIcon={< SearchIcon/>} className="search-button">

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
                        <option value="0">Chưa Xác Nhận</option>
                        <option value="1">Đã Xác Nhận</option>
                        <option value="4">Đã Ngưng Hoạt động</option>
                    </select>
                </div>
                <div className="col-5">
                    <label htmlFor="status-select1">Loại Địa Chỉ: </label>
                    <select
                        id="status-select1"
                        className="select-green"
                        value={selectedLoaiDiaChi}
                        onChange={(e) => setSelectedLoaiDiaChi(e.target.value)}
                    >
                        <option value="Tất cả">Tất cả</option>
                        <option value="0">Nhà Riêng</option>
                        <option value="1">Nơi Làm Việc</option>
                    </select>
                </div>
                <div className="col-5">
                    <Button variant="contained" color="success" startIcon={<AddLocationAltIcon/>}
                            onClick={() => handAdd()}>
                        Tạo Địa Chỉ Mới
                    </Button>
                </div>
            </div>

            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    components={{
                        Toolbar: GridToolbarContainer,
                        Export: GridToolbarExport,
                    }}

                />
            </div>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Pagination
                    onChange={(event, page) => handlePageClick(page - 1)}
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
        </div>

    </>);
};

export default TableDiaChiByTK;
