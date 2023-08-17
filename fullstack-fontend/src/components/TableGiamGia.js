import { useEffect, useState } from "react";
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
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getGiamGia(0, 5);
  }, []);

  //Next Page
  const handlePageClick = (page) => {
    getGiamGia(page);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDataGiamGia, setDataGiamGia] = useState({});
  const handleDelete = (id) => {
    setIsShowModalDelete(true);
    setDataGiamGia(id);
  };

  const getGiamGia = async (page, size) => {
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
              <option value="1">Tất cả</option>
              <option value="2">Hoạt động</option>
              <option value="3">Ngưng hoạt động</option>
            </Form.Select>
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
