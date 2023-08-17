import Nav from "react-bootstrap/Nav";

import Form from "react-bootstrap/Form";

import { useState } from "react";
import { useEffect } from "react";
import { deleteTaiKhoan, taiKhoan } from "../services/taiKhoanService";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { DeleteSweepOutlined, EditOutlined } from "@material-ui/icons";
import { pink } from "@mui/material/colors";
import ModelConfirm from "./ModelConfirmGiamGia";
import ModelConfirmTKNV from "../forms/ModelConfirmTKNV";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

import QrReader from "react-qr-scanner";

const TableTKNhanVien = () => {
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [originalListData, setOriginalListData] = useState([]);
  const navigate = useNavigate();

  const getListData = async (page) => {
    try {
      let res = await taiKhoan(page);
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

  //Delete
  const handleDelete = async (idTK) => {
    let res = await deleteTaiKhoan(idTK);
    console.log("Check res: ", res);
    if (res && res.idTaiKhoan) {
      toast.success("Xóa thành công!");
      getListData(0);
      handleClose();
    } else {
      toast.error("Xóa thất bại!");
      handleClose();
    }
  };

  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const handleClickOpenDelete = (idTK) => {
    setOpen(true);
    setIdDelete(idTK);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 120 },
    { field: "idChucVu", headerName: "Chức Vụ", width: 100 },
    { field: "ten", headerName: "Tên Nhân Viên", width: 120 },
    { field: "sdt", headerName: "Số Điện Thoại", width: 120 },
    { field: "email", headerName: "Email", width: 190 },
    { field: "soCanCuoc", headerName: "Số Căn Cước", width: 120 },
    {
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 150,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 0:
            badgeVariant = "primary";
            statusText = "Đang Hoạt Động";
            break;
          case 10:
            badgeVariant = "warning";
            statusText = "Dừng Hoạt Động";
            break;
          default:
            badgeVariant = "light";
            statusText = "Unknown status";
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
      field: "thaoTac",
      headerName: "Thao Tác",
      width: 150,
      renderCell: (params) => {
        const { row } = params;
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              onClick={() => handlClickRow(row)} // Thay thế handleEdit bằng hàm xử lý chỉnh sửa thích hợp của bạn
            >
              <EditOutlined color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleClickOpenDelete(row.thaoTac)}
            >
              <DeleteSweepOutlinedIcon sx={{ color: pink[500] }} />
            </IconButton>
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
      idChucVu: item.idChucVu.tenCv,
      ten: item.ho + " " + item.ten,
      sdt: item.sdt,
      email: item.email,
      soCanCuoc: item.soCanCuoc,
      trangThai: item.trangThai,
      thaoTac: item.idTaiKhoan,
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
            (item) => item.trangThai === parseInt(selectedStatus)
          );
    setListData(filteredData);
  }, [selectedStatus, originalListData]);

  //Click on the table

  const handAdd = () => {
    navigate("/tai-khoan/them-tai-khoan");
  };
  const handAddDiaChi = (item) => {
    navigate(`/dia-chi/${item.maTaiKhoan}`);
  };

  const handlClickRow = (item) => {
    // console.log("Check click: ", item);
    navigate(`/tai-khoan/detail/${item.idTaiKhoan}`);
  };

  

  return (
    <>
      <div className="row row-order-management">
        <h2 className="text-center">Tài Khoản Nhân Viên</h2>
        <div className="row">
          <div className="col-5">
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
                <Button
                  variant="outline-success"
                  startIcon={<SearchIcon />}
                  className="search-button"
                ></Button>
              </Form>
            </Nav>
          </div>

          

          {/* <div className="col-5">
            <div id="reader"></div>
             {scanResult && (
               <div>
                    canned Result:
                    <a 
                    href={scanResult}  
                    target="_blank"
                    rel="noopener noreferrer">
                      {scanResult}
                    </a>
                </div>
              )};
          </div> */}
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
              <option value="0">Đang Hoạt Động</option>
              <option value="10">Dừng Hoạt Động</option>
            </select>
          </div>
          <div className="col-5">
            <Button
              variant="contained"
              color="success"
              startIcon={<PersonAddAlt1Icon />}
              onClick={() => handAdd()}
            >
              Tạo Tài Khoản Mới
            </Button>
          </div>
        </div>

        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
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
            <Button onClick={handleClose}>Canel</Button>
            <Button onClick={() => handleDelete(idDelete)} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default TableTKNhanVien;
