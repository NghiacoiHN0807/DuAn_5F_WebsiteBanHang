import Nav from "react-bootstrap/Nav";

import Form from "react-bootstrap/Form";

import { useState } from "react";
import { useEffect } from "react";
import { taiKhoan } from "../services/taiKhoanService";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { DeleteSweepOutlined, EditOutlined } from "@material-ui/icons";
import { pink } from "@mui/material/colors";
import ModelConfirm from "./ModelConfirmGiamGia";
import ModelConfirmTKNV from "../forms/ModelConfirmTKNV";

const TableTKNhanVien = () => {
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [originalListData, setOriginalListData] = useState([]);
  const navigate = useNavigate();
  const getListData = async (page, query) => {
    try {
      let res = await taiKhoan(page, query);
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

  // Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDatataiKhoanNV, setDatataiKhoanNV] = useState({});
  const handleDelete = (param) => {
    console.log("Check param: ", param);
    setIsShowModalDelete(true);
    setDatataiKhoanNV(param);
  };

  //update
  // const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);

  // const handleUpdateTable = (taiKhoanNV) => {
  //   setlistTaiKhoanNV([taiKhoanNV, ...listTaiKhoanNV]);
  //   gettaiKhoanNV(0);
  // };

  // const handleUpdate = (taiKhoanNV) => {
  //   setDatataiKhoanNV(taiKhoanNV);
  //   setIsShowModalUpdate(true);
  // };

  //Edit show modals
  // const [showModalsAdd, setShowModalAdd] = useState(false);
  const handleClose = () => {
    setIsShowModalDelete(false);
  };

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 120 },
    { field: "idChucVu", headerName: "Chức Vụ", width: 100 },
    { field: "ten", headerName: "Tên Khách Hàng", width: 120 },
    { field: "sdt", headerName: "Số Điện Thoại", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "soCanCuoc", headerName: "Số Căn Cước", width: 100 },
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
        const {row} = params;
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
              onClick={() => handleDelete(params.row.idTaiKhoan)}
            >
              <DeleteSweepOutlined sx={{ color: pink[500] }} value="delete" />
              <ModelConfirmTKNV
                show={isShowModalDelete}
                getTaiKhoanNV={getListData}
                handleClose={handleClose}
                listData={listData}
              />
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
                <Button
                  variant="outline-success"
                  startIcon={<SearchIcon />}
                  className="search-button"
                ></Button>
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
      </div>
    </>
  );
};

export default TableTKNhanVien;
// import { useEffect, useState } from "react";
// import { taiKhoan, taiKhoan2 } from "../services/taiKhoanService";
// import ModelAddNewTKNV from "../forms/ModelAddNewTKNV";
// import ModelConfirmTKNV from "../forms/ModelConfirmTKNV";
// import ModalUpdate from "../forms/ModelUpdateTKNV";
// import { Badge, Button, Form, Nav } from "react-bootstrap";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import { DataGrid } from "@mui/x-data-grid";
// import { Navigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { IconButton } from "@mui/material";
// import { pink } from "@mui/material/colors";
// import { DeleteSweepOutlined, EditOutlined } from "@material-ui/icons";
// import { useNavigate } from "react-router-dom";
// //QRcode
// // import React, { } from 'react';
// // import QrReader from "react-qr-reader";

// const TabletaiKhoanNV = (props) => {
//   //Set value for table
//   const [listTaiKhoanNV, setlistTaiKhoanNV] = useState([]);
//   const [chucVu, setChucVu] = useState("");
//   const [totalPages, setTotalPages] = useState(0);
//   const [numberPages, setNumberPages] = useState(0);

//   //   const [selectedStatus, setSelectedStatus] = useState("Tất cả");
//   const navigate = useNavigate();

//   // const handlClickRow = (item) => {
//   //   navigate(`/order-management-timeline/${item.idTaiKhoan}`);
//   // };

//   //Set value for Model Add New is defalut
//   const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
//   const handleClose = () => {
//     setIsShowModalAddNew(false);
//     setIsShowModalDelete(false);
//     setIsShowModalUpdate(false);
//   };
//   // Show Data On Tables
//   useEffect(() => {
//     gettaiKhoanNV(0);
//   }, []);

//   const gettaiKhoanNV = async (page) => {
//     let res = await taiKhoan(page);
//     // console.log("Data", res);
//     if (res && res.content) {
//       setlistTaiKhoanNV(res.content);
//       // setChucVu(res.content.idChucVu);
//       // console.log("Data", res);
//       setNumberPages(Math.ceil(res.totalPages));
//     }
//   };

//   //QRcode
//   // const [result, setResult] = useState("No QR code detected");

//   // const handleScan = (data) => {
//   //   if (data) {
//   //     setResult(data);
//   //   }
//   // };

//   // const handleError = (error) => {
//   //   console.error(error);
//   // };

//   //Next Page
//   const handlePageClick = (page) => {
//     gettaiKhoanNV(page);
//   };

//   //Delete
//   const [isShowModalDelete, setIsShowModalDelete] = useState(false);
//   const [isDatataiKhoanNV, setDatataiKhoanNV] = useState({});
//   const handleDelete = (param) => {
//     console.log("Check param: ", param);
//     setIsShowModalDelete(true);
//     setDatataiKhoanNV(param);
//   };

//   // console.log(listTaiKhoanNV.idChucVu);

//   //update
//   const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);

//   const handleUpdateTable = (taiKhoanNV) => {
//     setlistTaiKhoanNV([taiKhoanNV, ...listTaiKhoanNV]);
//     gettaiKhoanNV(0);
//   };

//   const handleUpdate = (taiKhoanNV) => {
//     setDatataiKhoanNV(taiKhoanNV);
//     setIsShowModalUpdate(true);
//   };

//   const [searchKeyword, setSearchKeyword] = useState("");

//   const [total, setTrangThai] = useState(0);

//   const status = async (e) => {
//     const value = e.target.value;
//     setTrangThai(value);
//     if (value === "1") {
//       let res = await taiKhoan(0);
//       setlistTaiKhoanNV(res.content);
//       setTotalPages(res.totalPages);
//     } else if (value === "2") {
//       let res = await taiKhoan2(0, 0);
//       setlistTaiKhoanNV(res.content);
//       setTotalPages(res.totalPages);
//     } else if (value === "3") {
//       let res = await taiKhoan2(0, 1);
//       setlistTaiKhoanNV(res.content);
//       setTotalPages(res.totalPages);
//     }
//   };

//   const columns = [
//     { field: "index", headerName: "#", width: 50 },
//     { field: "maTaiKhoan", headerName: "Mã Tài Khoản", width: 100 },
//     { field: "idChucVu", headerName: "Chức Vụ", width: 90 },
//     { field: "ho", headerName: "Họ Và Tên", width: 120 },
//     // { field: "ten", headerName: "Tên", width: 150 },
//     {
//       field: "sdt",
//       headerName: "Số Điện Thoại",
//       width: 120,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       width: 200,
//     },
//     {
//       field: "soCanCuoc",
//       headerName: "Số Căn Cước",
//       width: 130,
//     },
//     {
//       field: "trangThai",
//       headerName: "Trạng Thái",
//       width: 140,
//       renderCell: (params) => {
//         const { value: trangThai } = params;
//         let badgeVariant, statusText;
//         switch (trangThai) {
//           case 0:
//             badgeVariant = "primary";
//             statusText = "Đang Hoạt Động";
//             break;
//           case 1:
//             badgeVariant = "warning";
//             statusText = "Dừng Hoạt Động";
//             break;
//           default:
//             badgeVariant = "light";
//             statusText = "Unknown status";
//             break;
//         }

//         return (
//           <Badge bg={badgeVariant} text="dark">
//             {statusText}
//           </Badge>
//         );
//       },
//     },
//     {
//       field: "thaoTac",
//       headerName: "Thao Tác",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             <IconButton
//               aria-label="edit"
//               size="large"
//               // onClick={() => handleEdit(params.row.idHd)} // Thay thế handleEdit bằng hàm xử lý chỉnh sửa thích hợp của bạn
//             >
//               <EditOutlined color="primary" />
//             </IconButton>
//             <IconButton
//               aria-label="delete"
//               size="large"
//               onClick={() => handleDelete(params.row.idTaiKhoan)}
//             >
//               <DeleteSweepOutlined sx={{ color: pink[500] }} value="delete" />
//             </IconButton>
//           </>
//         );
//       },
//     },
//   ];

//   const rows = listTaiKhoanNV
//     .filter((item) =>
//       Object.values(item).some((value) =>
//         String(value).toLowerCase().includes(searchKeyword.toLowerCase())
//       )
//     )
//     .map((item, index) => ({
//       idTaiKhoan: item.idTaiKhoan,
//       id: index + 1,
//       index: index + 1,
//       maTaiKhoan: item.maTaiKhoan,
//       idChucVu: item.idChucVu.tenCv,
//       ho: item.ho + " " + item.ten,
//       //   ten: item.ten,
//       sdt: item.sdt,
//       email: item.email,
//       soCanCuoc: item.soCanCuoc,
//       trangThai: item.trangThai,
//     }));

//   const handlClickRow = (item) => {
//     console.log("Check click: ", item);
//     navigate(`/table-taiKhoan/${item.idTaiKhoan}`);
//   };
//   // console.log(listTaiKhoanNV);
//   return (
//     <>
//       {/* <div>
//         <h2>QR Code Scanner</h2>
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: "100%" }}
//         />
//         <p>Result: {result}</p>
//       </div> */}
//       <div className="row row-order-management">
//         <div className="row">
//           <div className="col-4">
//             <Nav>
//               <Form className="d-flex search-form">
//                 <Form.Control
//                   type="search"
//                   placeholder="Search"
//                   className="me-2 search-input"
//                   aria-label="Search"
//                   size="sm"
//                   onChange={(e) => setSearchKeyword(e.target.value)}
//                 />
//                 <Button variant="outline-success" className="search-button">
//                   <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
//                 </Button>
//               </Form>
//             </Nav>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-5">
//             <label htmlFor="status-select">Trạng Thái: </label>
//             <select
//               id="status-select"
//               className="select-green"
//               //   value={selectedStatus}
//               onChange={(e) => status(e)}
//             >
//               <option value="1">Tất cả</option>
//               <option value="2">Hoạt động</option>
//               <option value="3">Ngưng hoạt động</option>
//             </select>
//           </div>
//           <div className="col-5"></div>
//           <div className="col-2">
//             <Button
//               variant="contained"
//               color="success"
//               className="btn btn-success"
//               onClick={() => setIsShowModalAddNew(true)}
//             >
//               Thêm TK NV
//               {/* <FontAwesomeIcon icon={faCartPlus} size="lg" />{" "} */}
//             </Button>
//           </div>
//         </div>

//         <div style={{ height: 400, width: "100%" }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 10 },
//               },
//             }}
//             pageSizeOptions={[5, 10, 15]}
//             onRowClick={(params) => handlClickRow(params.row)}
//           />
//         </div>
//         <Stack
//           direction="row"
//           spacing={2}
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Pagination
//             onChange={(event, page) => handlePageClick(page - 1)} // Subtract 1 from page value
//             count={numberPages}
//             variant="outlined"
//           />
//         </Stack>
//       </div>

//       {/* <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={totalPages}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//         //Class form
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//       /> */}
//       {/* Add Model */}
//       <ModelAddNewTKNV show={isShowModalAddNew} handleClose={handleClose} />
//       <ModelConfirmTKNV
//         show={isShowModalDelete}
//         handleClose={handleClose}
//         isDatataiKhoanNV={isDatataiKhoanNV}
//         gettaiKhoanNV={gettaiKhoanNV}
//       />
//       <ModalUpdate
//         show={isShowModalUpdate}
//         handleClose={handleClose}
//         isDatataiKhoanNV={isDatataiKhoanNV}
//         handleUpdateTable={handleUpdateTable}
//       />
//     </>
//   );
// };
// export default TabletaiKhoanNV;
