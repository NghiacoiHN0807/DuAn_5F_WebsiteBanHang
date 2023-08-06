import { useEffect, useState } from "react";

import { fetchAllSP } from "../../services/SanPhamService";

import {
  Badge,
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { fetchXX } from "../../services/XuatXuService";
import { fetchCL } from "../../services/ChatLieuService";
import { fetchCoAo } from "../../services/LoaiCoAoService";
import { fetchLSP } from "../../services/LoaiSPService";
import { fetchMS } from "../../services/MauSacService";
import { fetchTayAo } from "../../services/OngTayAoService";
import { fetchSP } from "../../services/SanPhamService";
import { fetchSize } from "../../services/SizeService";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TableSanPham = (props) => {
  //Set value for table
  const [listSanPham, setListSanPham] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [isDataSanPham, setDataSanPham] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const [listCL, setListCL] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listSP, setListSP] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);

  //Set value for Model Add New is defalut
  // Show Data On Tables
  useEffect(() => {
    getSanPham(0);
    getAllList();
  }, []);

  const getSanPham = async (page) => {
    let res = await fetchAllSP(page);
    console.log("Data", res);
    if (res && res.content) {
      setListSanPham(res.content);
      setNumberPages(Math.ceil(res.totalPages));
    }
  };

  const getAllList = async () => {
    let resCL = await fetchCL();
    setListCL(resCL);

    let resMS = await fetchMS();
    setListMS(resMS);

    let resSize = await fetchSize();
    setListSize(resSize);

    let resSP = await fetchSP();
    setListSP(resSP);

    let resLSP = await fetchLSP();
    setListLSP(resLSP);

    let resXX = await fetchXX();
    setListXX(resXX);

    let resTayAo = await fetchTayAo();
    setListTayAo(resTayAo);

    let resCoAo = await fetchCoAo();
    setListCoAo(resCoAo);
  };

  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maSp) => {
    console.log("Check delete: ", maSp);
    setIsShowModalDelete(true);
    setDataSanPham(maSp);
  };

  //Add
  const handAdd = () => {
    navigate("/quan-ly-san-pham/san-pham/them-san-pham");
  };

  // định dạng tiền
  function formatCurrency(price) {
    if (!price) return "0";

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "tenSp", headerName: "Tên sản phẩm", width: 150 },
    { field: "idCl", headerName: "Chất liệu", width: 100 },
    { field: "idMs", headerName: "Màu sắc", width: 100 },

    {
      field: "idLoaisp",
      headerName: "Loại",
      width: 100,
    },
    {
      field: "idXx",
      headerName: "Xuất xứ",
      width: 100,
    },
    {
      field: "idCoAo",
      headerName: "Cổ áo",
      width: 100,
    },
    {
      field: "idTayAo",
      headerName: "Tay áo",
      width: 100,
    },

    {
      field: "soLuongTon",
      headerName: "Số lượng",
      width: 100,
    },

    {
      field: "giaBan",
      headerName: "Giá",
      width: 100,
    },

    {
      field: "moTa",
      headerName: "Mô tả",
      width: 100,
    },

    {
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 150,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 0:
            badgeVariant = "success";
            statusText = "Còn bán";
            break;
          case 10:
            badgeVariant = "warning";
            statusText = "Ngừng kinh doanh";
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
  const rows = listSanPham
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
    .map((item, index) => ({
      idSp: item.idSp,
      id: index + 1,
      index: index + 1,
      tenSp: item.tenSp,
      idCl: item.idCl.tenCl,
      idMs: item.idMs.tenMs,
      idLoaisp: item.idLsp.tenLsp,
      idXx: item.idXx.tenNuoc,
      idCoAo: item.idCoAo.loaiCoAo,
      idTayAo: item.idTayAo.loaiTayAo,
      soLuongTon: item.soLuongTon,
      giaBan: formatCurrency(item.giaBan),
      moTa: item.moTa,
      trangThai: item.trangThai,
    }));
  //Next Page
  const handlePageClick = (page) => {
    getSanPham(page);
  };

  return (
    <>
      <div className="row row-order-management">
        <div className="my-3 add-new">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </div>
        <div className="filter-and-search">
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <NavDropdown title="Chất liệu" id="navbarScrollingDropdown">
                    <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                    {listCL.map((option) => (
                      <NavDropdown.Item eventKey={option.idCl}>
                        {option.tenCl}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown title="Màu sắc" id="navbarScrollingDropdown">
                    <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                    {listMS.map((option) => (
                      <NavDropdown.Item eventKey={option.idCl}>
                        {option.tenCl}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown title="Loại cổ áo" id="navbarScrollingDropdown">
                    <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                    {listCoAo.map((option) => (
                      <NavDropdown.Item eventKey={option.idCoAo}>
                        {option.loaiCoAo}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown
                    title="Loại sản phẩm"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                    {listLSP.map((option) => (
                      <NavDropdown.Item eventKey={option.idLoaisp}>
                        {option.tenLsp}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown title="Ống tay áo" id="navbarScrollingDropdown">
                    <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                    {listTayAo.map((option) => (
                      <NavDropdown.Item eventKey={option.idTayAo}>
                        {option.loaiTayAo}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown title="Sản phẩm" id="navbarScrollingDropdown">
                    <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                    {listSP.map((option) => (
                      <NavDropdown.Item eventKey={option.idSp}>
                        {option.tenSp}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown title="Size" id="navbarScrollingDropdown">
                    <NavDropdown.Item eventKey={"All"}>All</NavDropdown.Item>
                    {listSize.map((option) => (
                      <NavDropdown.Item eventKey={option.idSize}>
                        {option.tenSize}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown
                    title="Xuất xứ"
                    id="navbarScrollingDropdown"
                    onSelect={"All"}
                  >
                    <NavDropdown.Item>All</NavDropdown.Item>
                    {listXX.map((option) => (
                      <NavDropdown.Item eventKey={option.idXx}>
                        {option.tenNuoc}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Button variant="success" onClick={() => handAdd()}>
                    Thêm sản phẩm
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
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
export default TableSanPham;
