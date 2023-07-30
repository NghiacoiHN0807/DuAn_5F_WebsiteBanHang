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
    console.log("Check click: ", item.idHd);
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
          <label htmlFor="status-select">Status: </label>
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
          <label htmlFor="bill-type-select">Bill type: </label>
          <select id="bill-type-select" className="select-green">
            <option value="apple">All</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
            <option value="grape">Grape</option>
          </select>
        </div>
      </div>
      <div className="row row-order-management">
        <TableContainer component={Paper} className="tableContainer">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Code Bill</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right">Customer name</TableCell>
                <TableCell align="right">Customer number</TableCell>
                <TableCell align="right">Date created</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData &&
                listData.length > 0 &&
                listData
                  .filter((item) =>
                    Object.values(item).some((value) =>
                      String(value)
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                    )
                  )
                  .map((item, index) => {
                    return (
                      <TableRow
                        onClick={() => handlClickRow(item)}
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="right">{item.maHd}</TableCell>

                        <TableCell align="right">{item.thanhTien}</TableCell>
                        <TableCell align="right">{item.tenKh}</TableCell>
                        <TableCell align="right">{item.sdtKh}</TableCell>
                        <TableCell align="right">{item.ngayTao}</TableCell>
                        <TableCell align="right">
                          {item.trangThai === 1 ? (
                            <Badge bg="warning" text="dark">
                              Waiting for confirm
                            </Badge>
                          ) : item.trangThai === 2 ? (
                            <Badge bg="primary" text="dark">
                              Confirm information payment
                            </Badge>
                          ) : item.trangThai === 3 ? (
                            <Badge bg="info" text="dark">
                              Delivered to the carrier
                            </Badge>
                          ) : item.trangThai === 4 ? (
                            <Badge bg="primary" text="dark">
                              Confirm payment
                            </Badge>
                          ) : item.trangThai === 5 ? (
                            <Badge bg="success" text="dark">
                              Item received
                            </Badge>
                          ) : (
                            <Badge variant="light" text="dark">
                              Unknown status
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Pagination
            onChange={(event, page) => handlePageClick(page - 1)} // Subtract 1 from page value
            count={numberPages}
            color="secondary"
          />
        </Stack>
      </div>
    </>
  );
};

export default OrderManagement;
