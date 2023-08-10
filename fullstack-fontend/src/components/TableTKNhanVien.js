import { useEffect, useState } from "react";
import { taiKhoan, taiKhoan2 } from "../services/taiKhoanService";
import ModelAddNewTKNV from "../forms/ModelAddNewTKNV";
import ModelConfirmTKNV from "../forms/ModelConfirmTKNV";
import ModalUpdate from "../forms/ModelUpdateTKNV";
import { Badge, Button, Form, Nav } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import { DeleteSweepOutlined, EditOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
//QRcode
// import React, { } from 'react';
// import QrReader from "react-qr-reader";

const TabletaiKhoanNV = (props) => {
  //Set value for table
  const [listTaiKhoanNV, setlistTaiKhoanNV] = useState([]);
  const [chucVu, setChucVu] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [numberPages, setNumberPages] = useState(0);

  //   const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const navigate = useNavigate();

  // const handlClickRow = (item) => {
  //   navigate(`/order-management-timeline/${item.idTaiKhoan}`);
  // };

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    gettaiKhoanNV(0);
  }, []);

  const gettaiKhoanNV = async (page) => {
    let res = await taiKhoan(page);
    // console.log("Data", res);
    if (res && res.content) {
      setlistTaiKhoanNV(res.content);
      // setChucVu(res.content.idChucVu);
      // console.log("Data", res);
      setNumberPages(Math.ceil(res.totalPages));
    }
  };

  //QRcode
  // const [result, setResult] = useState("No QR code detected");

  // const handleScan = (data) => {
  //   if (data) {
  //     setResult(data);
  //   }
  // };

  // const handleError = (error) => {
  //   console.error(error);
  // };

  //Next Page
  const handlePageClick = (page) => {
    gettaiKhoanNV(page);
  };

  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDatataiKhoanNV, setDatataiKhoanNV] = useState({});
  const handleDelete = (param) => {
    console.log("Check param: ", param);
    setIsShowModalDelete(true);
    setDatataiKhoanNV(param);
  };

  // console.log(listTaiKhoanNV.idChucVu);

  //update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);

  const handleUpdateTable = (taiKhoanNV) => {
    setlistTaiKhoanNV([taiKhoanNV, ...listTaiKhoanNV]);
    gettaiKhoanNV(0);
  };

  const handleUpdate = (taiKhoanNV) => {
    setDatataiKhoanNV(taiKhoanNV);
    setIsShowModalUpdate(true);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  const [total, setTrangThai] = useState(0);

  const status = async (e) => {
    const value = e.target.value;
    setTrangThai(value);
    if (value === "1") {
      let res = await taiKhoan(0);
      setlistTaiKhoanNV(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "2") {
      let res = await taiKhoan2(0, 0);
      setlistTaiKhoanNV(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "3") {
      let res = await taiKhoan2(0, 1);
      setlistTaiKhoanNV(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 100 },
    { field: "idChucVu", headerName: "Chức Vụ", width: 90 },
    { field: "ho", headerName: "Họ Và Tên", width: 120 },
    // { field: "ten", headerName: "Tên", width: 150 },
    {
      field: "sdt",
      headerName: "Số Điện Thoại",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "soCanCuoc",
      headerName: "Số Căn Cước",
      width: 130,
    },
    {
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 140,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 0:
            badgeVariant = "primary";
            statusText = "Đang Hoạt Động";
            break;
          case 1:
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
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              // onClick={() => handleEdit(params.row.idHd)} // Thay thế handleEdit bằng hàm xử lý chỉnh sửa thích hợp của bạn
            >
              <EditOutlined color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDelete(params.row.idTaiKhoan)}
            >
              <DeleteSweepOutlined sx={{ color: pink[500] }} value="delete" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = listTaiKhoanNV
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
    .map((item, index) => ({
      idTaiKhoan: item.idTaiKhoan,
      id: index + 1,
      index: index + 1,
      maTaiKhoan: item.maTaiKhoan,
      chucVu: item.idChucVu,
      ho: item.ho + " " + item.ten,
      //   ten: item.ten,
      sdt: item.sdt,
      email: item.email,
      soCanCuoc: item.soCanCuoc,
      trangThai: item.trangThai,
    }));

  const handlClickRow = (item) => {
    console.log("Check click: ", item);
    navigate(`/table-taiKhoan/${item.idTaiKhoan}`);
  };
  // console.log(listTaiKhoanNV);
  return (
    <>
      {/* <div>
        <h2>QR Code Scanner</h2>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p>Result: {result}</p>
      </div> */}
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
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
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
              //   value={selectedStatus}
              onChange={(e) => status(e)}
            >
              <option value="1">Tất cả</option>
              <option value="2">Hoạt động</option>
              <option value="3">Ngưng hoạt động</option>
            </select>
          </div>
          <div className="col-5"></div>
          <div className="col-2">
            <Button
              variant="contained"
              color="success"
              className="btn btn-success"
              onClick={() => setIsShowModalAddNew(true)}
            >
              Thêm TK NV
              {/* <FontAwesomeIcon icon={faCartPlus} size="lg" />{" "} */}
            </Button>
          </div>
        </div>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
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

      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        //Class form
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      /> */}
      {/* Add Model */}
      <ModelAddNewTKNV show={isShowModalAddNew} handleClose={handleClose} />
      <ModelConfirmTKNV
        show={isShowModalDelete}
        handleClose={handleClose}
        isDatataiKhoanNV={isDatataiKhoanNV}
        gettaiKhoanNV={gettaiKhoanNV}
      />
      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDatataiKhoanNV={isDatataiKhoanNV}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TabletaiKhoanNV;
