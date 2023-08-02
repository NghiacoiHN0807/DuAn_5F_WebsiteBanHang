import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../scss/OderManagement.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrderManagement } from "../services/OderManagementSevice";
import Badge from "react-bootstrap/Badge";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const OrderManagement = () => {
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [originalListData, setOriginalListData] = useState([]);

  const getListData = async (page, query) => {
    try {
      let res = await getAllOrderManagement(page, query);
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
    { field: "index", headerName: "#", width: 70 },
    { field: "maHd", headerName: "Code Bill", width: 200 },
    { field: "thanhTien", headerName: "Subtotal", width: 150 },
    { field: "tenKh", headerName: "Customer name", width: 200 },
    {
      field: "sdtKh",
      headerName: "Customer number",
      width: 200,
    },
    {
      field: "ngayTao",
      headerName: "Date created",
      width: 200,
    },
    {
      field: "trangThai",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 1:
            badgeVariant = "warning";
            statusText = "Waiting for confirm";
            break;
          case 2:
            badgeVariant = "primary";
            statusText = "Confirm information payment";
            break;
          case 3:
            badgeVariant = "info";
            statusText = "Delivered to the carrier";
            break;
          case 4:
            badgeVariant = "primary";
            statusText = "Confirm payment";
            break;
          case 5:
            badgeVariant = "success";
            statusText = "Item received";
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
      trangThai: item.trangThai,
    }));
  //Next Page
  const handlePageClick = (page) => {
    getListData(page);
  };
  //filter status
  useEffect(() => {
    const filteredData =
      selectedStatus === "All"
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter(
            (item) => item.trangThai === parseInt(selectedStatus)
          );
    setListData(filteredData);
  }, [selectedStatus, originalListData]);

  //Click on the table
  const navigate = useNavigate();
  const handlClickRow = (item) => {
    console.log("Check click: ", item);
    navigate(`/order-management-timeline/${item.idHd}`);
  };
  return (
    <>
      <div className="row row-order-management">
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
        <div className="col-4">
          <Form>
            <Row>
              <Col>
                <Form.Control size="sm" type="date" placeholder="First name" />
              </Col>
              <Col>
                <Form.Control size="sm" type="date" placeholder="Last name" />
              </Col>
            </Row>
          </Form>
        </div>{" "}
        <div className="col-6">
          <label htmlFor="status-select">Trạng Thái: </label>
          <select
            id="status-select"
            className="select-green"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="1">Waiting for confirm</option>
            <option value="2">Confirm payment</option>
            <option value="3">Delivered to the carrier</option>
            <option value="4">Item received</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="bill-type-select">Kiểu Hóa Đơn: </label>
          <select id="bill-type-select" className="select-green">
            <option value="apple">All</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
            <option value="grape">Grape</option>
          </select>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={(params) => handlClickRow(params.row)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
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

export default OrderManagement;
