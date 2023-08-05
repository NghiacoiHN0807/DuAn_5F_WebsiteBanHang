import { useEffect, useState } from "react";
import ModelConfirmGiamGia from "./ModelConfirmGiamGia";
import Stack from "@mui/material/Stack";
import { getAll, getAllByTrangThai } from "../services/giamGiaService";
import { Badge, Form, Nav } from "react-bootstrap";
import "../scss/TableGiamGiaScss.scss";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const TableGiamGia = (props) => {
  //Set value for table
  const [listGiamGia, setListGiamGia] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

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
    let res = await getAll(page, size);
    if (res && res.content) {
      console.log(res)
      setListGiamGia(res.content);
      setNumberPages(Math.ceil(res.totalPages));
    }
  };

  const hi = async (e) => {
    const value = e.target.value;
    if (value === "1") {
      let res = await getAll(0, 5);
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

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handAdd = () => {
    // Xử lý các tác vụ liên quan đến việc thêm dữ liệu
    // Ví dụ: lưu dữ liệu vào cơ sở dữ liệu

    // Chuyển hướng đến đường dẫn /add/giam-gia
    navigate(`/add/giam-gia`);
  };
  console.log(listGiamGia)
  const rows = listGiamGia
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
    .map((item, index) => ({
      idHd: item.idGiamGia,
      id: index + 1,
      index: index + 1,
      tenChuongTrinh: item.idGiamGia.tenChuongTrinh,
      tenSp: item.idCtsp.idSp.tenSp,
      mucGiam: item.idGiamGia.mucGiamTienMat === null
        ? item.idGiamGia.mucGiamPhanTram + "%"
        : formatCurrency(item.idGiamGia.mucGiamTienMat),
      thoiGian: formatDate(item.idGiamGia.ngayBatDau) +
        " - " +
        formatDate(item.idGiamGia.ngayKetThuc),
      donGia: formatCurrency(item.donGia),
      sauGiam: formatCurrency(item.soTienConLai),
      trangThai: item.trangThai
    }));

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "tenChuongTrinh", headerName: "Tên chương trình", width: 150 },
    { field: "tenSp", headerName: "Tên sản phẩm", width: 150  },
    { field: "mucGiam", headerName: "Mức giảm", width: 100 },
    {
      field: "thoiGian",
      headerName: "Thời giảm",
      width: 200,
    },
    {
      field: "donGia",
      headerName: "Đơn giá",
      width: 100,
    },
    {
      field: "sauGiam",
      headerName: "Số tiền còn lại",
      width: 150
    },
    {
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 200,
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
export default TableGiamGia;
