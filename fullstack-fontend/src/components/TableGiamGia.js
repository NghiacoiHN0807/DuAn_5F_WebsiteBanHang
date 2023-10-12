import { useEffect, useState } from "react";
<<<<<<< HEAD
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModelAddNewGiamGia from "./ModalsAddNewGiamGia";
import ModelConfirmGiamGia from "./ModelConfirmGiamGia";
import { getAll, getAllByTrangThai } from '../services/giamGiaService'
import { Form } from "react-bootstrap";
import TableGiamGiaScss from "../scss/TableGiamGiaScss.scss";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const TableGiamGia = (props) => {

  const navigate = useNavigate();

  //Set value for table
  const [listGiamGia, setListGiamGia] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalUpdate(false);
=======
import Stack from "@mui/material/Stack";
import { getAllByTrangThai, getSanPhamDetails } from "../services/giamGiaService";
import { Badge, Form, Image, Nav } from "react-bootstrap";
import "../scss/TableGiamGiaScss.scss";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton, TableCell } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { pink } from "@mui/material/colors";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ModelConfirm from "./ModelConfirmGiamGia";

const TableGiamGia = (props) => {
  //Set value for table
  const [listGiamGia, setListGiamGia] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/giam-gia/${id.idGgct}`);
  };

  //Set value for Model Add New is defalut
  const handleClose = () => {
>>>>>>> main
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
<<<<<<< HEAD
    getGiamGia(0,5);
  }, []);

  //Next Page
  const handlePageClick = (event) => {
    getGiamGia(+event.selected, 5);
=======
    getGiamGia(0, 5);
  }, []);

  //Next Page
  const handlePageClick = (page) => {
    getGiamGia(page);
>>>>>>> main
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDataGiamGia, setDataGiamGia] = useState({});
  const handleDelete = (id) => {
    setIsShowModalDelete(true);
    setDataGiamGia(id);
  };

  const getGiamGia = async (page, size) => {
<<<<<<< HEAD
    let res = await getAll(page, size);
    if (res && res.content) {
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const [total, setTrangThai] = useState(0);


  const hi = async (e) => {
    const value = e.target.value;
    setTrangThai(value);
    if (value === "1") {
      let res = await getAll(0, 5);
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "2") {
      let res = await getAllByTrangThai(0, 5, 0);
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "3") {
      let res = await getAllByTrangThai(0, 5, 10);
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    }
  };

    return (
      <>
        <div className="my-3 add-new">
          <samp>List Giam Gia</samp>
        </div>
        <div>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchKeyword(e.target.value)}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <div className="d-flex justify-content-between">

          <div className="d-flex">
            <div className="d-flex align-items-center">
            <label>Trạng thái</label>
            <Form.Select aria-label="Default select example" onChange={(e) => hi(e)} className="m-3">
=======
    let res = await getSanPhamDetails(page, size);
    if (res && res.content) {
      console.log(res.content)
      setListGiamGia(res.content);
      setNumberPages(Math.ceil(res.totalPages));
    }
  };

  const hi = async (e) => {
    const value = e.target.value;
    if (value === "1") {
      let res = await getSanPhamDetails(0, 5);
      setListGiamGia(res.content);
    } else if (value === "2") {
      let res = await getAllByTrangThai(0, 5, 0);
      setListGiamGia(res.content);
    } else if (value === "3") {
      let res = await getAllByTrangThai(0, 5, 10);
      setListGiamGia(res.content);
    }
  };

  function formatCurrency(price) {
    if (!price) return "0";

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
  
    const dateTime = new Date(dateString);
    const hours = dateTime.getUTCHours().toString().padStart(2, '0');
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, '0');
    const [year, month, day] = dateTime.toISOString().split('T')[0].split('-');
  
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const handAdd = () => {
    navigate(`/add/giam-gia`);
  };

  const rows = listGiamGia
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
    .map((item, index) => ({
      idHd: item,
      id: index + 1,
      index: index + 1,
      tenChuongTrinh: item.tenChuongTrinh,
      url_img: item.url_image,
      tenSp: item.tenSp,
      mucGiam: item.mucGiamTienMat === null
        ? item.mucGiamPhanTram + "%"
        : formatCurrency(item.mucGiamTienMat),
      thoiGian: formatDate(item.ngayBatDau) +
        " - " + formatDate(item.ngayKetThuc),
      donGia: formatCurrency(item.donGia),
      sauGiam: formatCurrency(item.soTienConLai),
      trangThai: item.trangThai
    }));

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    {
      field: "url_img",
      headerName: "Ảnh",
      width: 200,
      renderCell: function (params) {
        const { value: url_img } = params;
        console.log(params.row.idHd)
        return (
          <TableCell style={{ height: 240 }} className="d-flex align-items-center position-relative">
            <div className="image-container">
              <Image
                rounded
                className="mr-2"
                style={{ width: "150px", height: "auto" }}
                src={url_img}
                alt={`Ảnh sản phẩm ${url_img}`}
              />
              {params.row.idHd.mucGiamPhanTram === null ? <div className="sale-tag">Sale</div> : <div className="sale-tag">Sale {params.row.idHd.mucGiamPhanTram}%</div>}
            </div>
          </TableCell>
        );
      }
    },
    { field: "tenChuongTrinh", headerName: "Tên chương trình", width: 150 },
    { field: "tenSp", headerName: "Tên sản phẩm", width: 150 },
    { field: "mucGiam", headerName: "Mức giảm", width: 100 },
    {
      field: "thoiGian",
      headerName: "Thời gian",
      width: 300,
    },
    {
      field: "donGia",
      headerName: "Đơn giá",
      width: 100,
    },
    {
      field: "sauGiam",
      headerName: "Số tiền còn lại",
      width: 100
    },
    {
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 150,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 10:
            badgeVariant = "warning";
            statusText = "Ngưng hoạt động";
            break;
          case 0:
            badgeVariant = "success";
            statusText = "Hoạt động";
            break;
          default:
            badgeVariant = "light";
            statusText = "Không xác định";
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
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              onClick={() => handleUpdate(params.row.idHd)} // Thay thế handleEdit bằng hàm xử lý chỉnh sửa thích hợp của bạn
            >
              <EditOutlinedIcon color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDelete(params.row.idHd)}
            >
              <DeleteSweepOutlinedIcon sx={{ color: pink[500] }} />
            </IconButton>
          </>
        );
      },
    },
  ];

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
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
                </Button>
              </Form>
            </Nav>
          </div>
        </div>

        <div className="d-flex">
          <div className="d-flex align-items-center">
            <label>Trạng thái</label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => hi(e)}
              className="m-3"
            >
>>>>>>> main
              <option value="1">Tất cả</option>
              <option value="2">Hoạt động</option>
              <option value="3">Ngưng hoạt động</option>
            </Form.Select>
<<<<<<< HEAD
            </div>
            <div className="d-flex align-items-center">
              <label>Ngày bắt đầu</label>
              <input type="date" id="inputPassword6" className="form-control m-3" aria-describedby="passwordHelpInline" />
            </div>
            <div className="d-flex align-items-center">
              <label>Ngày kết thúc</label>
              <input type="date" id="inputPassword6" className="form-control m-3" aria-describedby="passwordHelpInline" />
            </div>
          </div>
          <button
            className="btn btn-success m-25"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Them
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">#</th>
              {/* <th scope="col">Mã chương trình</th> */}
              <th scope="col">Tên chương trình</th>
              <th scope="col">Loại sản phẩm áp dụng</th>
              <th scope="col">Kiểu giảm giá</th>
              <th scope="col">Mức giảm giá</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Đơn giá</th>
              <th scope="col">Giá sau giảm</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listGiamGia &&
              listGiamGia.length > 0 &&
              listGiamGia.filter((item) =>
              Object.values(item).some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase())
              )
            ).map((item, index) => {
                return (
                  <tr key={item.idGiamGia}>
                    <th scope="row">{index + 1}</th>
                    {/* <td>{item.maGiamGia}</td> */}
                    <td>{item.idGiamGia.tenChuongTrinh}</td>
                    <td>{item.idCtsp.isLsp.tenLsp}</td>
                    <td>{item.idGiamGia.mucGiamPhanTram === null ? "Tiền mặt" : "Phần trăm"}</td>
                    <td>{item.idGiamGia.mucGiamTienMat === null ? item.idGiamGia.mucGiamPhanTram + "%" : item.idGiamGia.mucGiamTienMat}</td>
                    <td>{item.idGiamGia.ngayBatDau + " - " + item.idGiamGia.ngayKetThuc}</td>
                    <td>{item.donGia}</td>
                    <td>{item.soTienConLai}</td>
                    <td>{item.trangThai === 0 ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
                    <td>
                      <button className='btn btn-outline-primary mx-2' onClick={() => setIsShowModalUpdate(true)}>Update</button>
                      <button onClick={() => handleDelete(item)} className='btn btn-outline-danger mx-2'>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <ReactPaginate
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
        />
        {/* Add Model */}
        <ModelAddNewGiamGia show={isShowModalAddNew} handleClose={handleClose} />
        <ModelConfirmGiamGia
          show={isShowModalDelete}
          handleClose={handleClose}
          isDataGiamGia={isDataGiamGia}
          getGiamGia={getGiamGia}
        />
      </>
    );
  };
  export default TableGiamGia;
=======
          </div>
          <div className="d-flex align-items-center">
            <label>Ngày bắt đầu</label>
            <input
              type="date"
              id="inputPassword6"
              className="form-control m-3"
              aria-describedby="passwordHelpInline"
            />
          </div>
          <div className="d-flex align-items-center">
            <label>Ngày kết thúc</label>
            <input
              type="date"
              id="inputPassword6"
              className="form-control m-3"
              aria-describedby="passwordHelpInline"
            />
          </div>
          <Button
            variant="contained"
            onClick={() => handAdd()}
            className="m-25"
            color="success"
          >
            Thêm
          </Button>
        </div>

        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowHeight={(params) => 240}
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
      <ModelConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataGiamGia={isDataGiamGia}
        getGiamGia={getGiamGia}
      />
      {/* <ModelAddNewGiamGia dataSanPham={listGiamGia} /> */}
    </>
  );
};
export default TableGiamGia;
>>>>>>> main
