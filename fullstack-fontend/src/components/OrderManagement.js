import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../scss/OderManagement.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrderManagement } from "../services/OderManagementSevice";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { postAddBill } from "../services/BillSevice";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [selectedStatus1, setSelectedStatus1] = useState("Tất cả");

  const [originalListData, setOriginalListData] = useState([]);
  const [originalListData1, setOriginalListData1] = useState([]);

  const getListData = async (page, query) => {
    try {
      let res = await getAllOrderManagement(page, query);
      console.log("Check res: ", res);
      setListData(res.content);
      setNumberPages(Math.ceil(res.totalPages));
      // Lưu trữ danh sách dữ liệu gốc
      setOriginalListData(res.content);
      setOriginalListData1(res.content);

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
    { field: "index", headerName: "#", width: 50 },
    { field: "maHd", headerName: "Mã Hóa Đơn", width: 150 },
    { field: "thanhTien", headerName: "Thành Tiền", width: 150 },
    { field: "tenKh", headerName: "Tên Khách Hàng", width: 200 },
    {
      field: "sdtKh",
      headerName: "Số Điện Thoại",
      width: 150,
    },
    {
      field: "ngayTao",
      headerName: "Ngày Tạo",
      width: 150,
    },
    {
      field: "kieuHoaDon",
      headerName: "Kiểu Hóa Đơn",
      width: 150,
      renderCell: (params) => {
        const { value: kieuHoaDon } = params;
        let badgeVariant, statusText, text;
        switch (kieuHoaDon) {
          case 1:
            badgeVariant = "light";
            statusText = "Bán Tại Quầy";
            text = "black";
            break;
          case 2:
            badgeVariant = "dark";
            statusText = "Giao Hàng";
            text = "white";
            break;
          default:
            badgeVariant = "light";
            statusText = "Unknown status";
            break;
        }

        return (
          <Badge bg={badgeVariant} text={text}>
            {statusText}
          </Badge>
        );
      },
    },
    {
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 200,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 0:
            badgeVariant = "danger";
            statusText = "Đang Chờ Xác Nhận Đơn Hàng";
            break;
          case 1:
            badgeVariant = "warning";
            statusText = "Đang Chờ Xác Nhận Thông Tin";
            break;
          case 2:
            badgeVariant = "primary";
            statusText = "Đã Chuyển Cho Đơn Vị";
            break;
          case 3:
            badgeVariant = "info";
            statusText = "Xác Nhận Thanh Toán";
            break;
          case 4:
            badgeVariant = "success";
            statusText = "Đã Giao Thành Công";
            break;
          case 8:
            badgeVariant = "warning";
            statusText = "Đơn Hàng Bán Tại Quầy";
            break;
          case 9:
            badgeVariant = "success";
            statusText = "Đã Thanh Toán Tại Quầy";
            break;
          case 10:
            badgeVariant = "danger";
            statusText = "Đơn hàng đã hủy";
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
  ];

  // Xử lý dữ liệu của bảng vào mảng rows
  const rows = listData
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
    .map((item, index) => ({
      idHd: item.idHd,
      id: index + 1,
      index: index + 1,
      maHd: item.maHd,
      thanhTien: item.thanhTien,
      tenKh: item.tenKh,
      sdtKh: item.sdtKh,
      ngayTao: item.ngayTao,
      kieuHoaDon: item.kieuHoaDon,
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
              item.trangThai === parseInt(selectedStatus) ||
              item.kieuHoaDon === parseInt(selectedStatus)
          );
    setListData(filteredData);
  }, [selectedStatus, originalListData]);

  useEffect(() => {
    const filteredData1 =
      selectedStatus1 === "Tất cả"
        ? originalListData1 // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData1.filter(
            (item) => item.kieuHoaDon === parseInt(selectedStatus1)
          );
    setListData(filteredData1);
  }, [selectedStatus1, originalListData1]);
  //Click on the table
  const navigate = useNavigate();
  const handlClickRow = (item) => {
    console.log("Check click: ", item);
    navigate(`/order-management-timeline/${item.idHd}`);
  };
  //Add new bill
  const [lastGeneratedNumber, setLastGeneratedNumber] = useState(0);

  useEffect(() => {
    // Đọc số lớn nhất từ cơ sở dữ liệu (localStorage) khi ứng dụng khởi động
    const savedNumber = localStorage.getItem("lastGeneratedNumber");
    if (savedNumber) {
      setLastGeneratedNumber(Number(savedNumber));
    }
  }, []);
  const generateNewCode = () => {
    const newNumber = lastGeneratedNumber + 1;
    setLastGeneratedNumber(newNumber);

    // Lưu số mới vào cơ sở dữ liệu (localStorage)
    localStorage.setItem("lastGeneratedNumber", newNumber.toString());

    return `HD${newNumber.toString().padStart(5, "0")}`;
  };

  let getIdHttp;

  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const handleAdd = async () => {
    const newCode = generateNewCode();
    let res = await postAddBill(newCode, formattedDate, 1, 8);
    toast.success("A shopping cart is created successfully");
    getIdHttp = res.idHd;
    // await getDataCart(getIdHttp);
    navigate(`/create-bill/${getIdHttp}`);
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="1">Đang chờ xác nhận</option>
              <option value="2">Xác nhận thanh toán</option>
              <option value="3">Đã chuyển cho đơn vị</option>
              <option value="4">Đã giao thành công</option>
            </select>
          </div>
          <div className="col-5">
            <label htmlFor="bill-type-select">Kiểu Hóa Đơn: </label>
            <select
              id="bill-type-select"
              className="select-green"
              value={selectedStatus1}
              onChange={(e) => setSelectedStatus1(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              <option value="1">Bán Tại Quần</option>
              <option value="2">Giao Hàng</option>
            </select>
          </div>
          <div className="col-2">
            <Button
              aria-label="Example"
              endIcon={<FontAwesomeIcon icon={faCartPlus} size="lg" />}
              variant="contained"
              color="success"
              onClick={() => handleAdd()}
            >
              Tạo Hóa Đơn
            </Button>
          </div>
        </div>

        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 15 },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            onRowClick={(params) => handlClickRow(params.row)}
          />
        </div>
        <Stack direction="row" spacing={2} justify="center" alignitems="center">
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

export default OrderManagement;
