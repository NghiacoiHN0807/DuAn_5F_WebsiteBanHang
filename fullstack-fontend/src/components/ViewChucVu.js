import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { chucVu, chucVu2 } from "../services/chucVuService";
import ModalsAddChucVu from "./ModalsAddChucVu";
import { Badge, Button, Form, Nav } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DataGrid } from "@mui/x-data-grid";
// import ModelConfirm from "./ModelConfirm";

const TableChucVu = (props) => {
  //Set value for table
  const [listChucVu, setListChucVu] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [numberPages, setNumberPages] = useState(0);


  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getChucVu(0);
  }, []);

 

  const getChucVu = async (page) => {
    let res = await chucVu(page);
    console.log("Data", res);
    if (res && res.content) {
      setListChucVu(res.content);
      // console.log("Data", res);
      setNumberPages(Math.ceil(res.totalPages));

    }
  };
  //Next Page
  const handlePageClick = (event) => {
    getChucVu(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDataChucVu, setDataChucVu] = useState({});
  const handleDelete = (maCv) => {
    console.log("Check delete: ", maCv);
    setIsShowModalDelete(true);
    setDataChucVu(maCv);
  };
  const [total, setTrangThai] = useState(0);

  const status = async (e) => {
    const value = e.target.value; 
    setTrangThai(value);
    if (value === "1") {
      let res = await chucVu(0);
      setListChucVu(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "2") {
      let res = await chucVu2(0, 0);
      setListChucVu(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "3") {
      let res = await chucVu2(0, 1);
      setListChucVu(res.content);
      setTotalPages(res.totalPages);
    }
  };

  console.log(listChucVu);

  const columns = [
    { field: "index", headerName: "#", width: 70 },
    { field: "maCv", headerName: "Mã Chức Vụ", width: 150 },
    { field: "tenCv", headerName: "Tên Chức Vụ", width: 150 },
    {
      field: "ngayTao",
      headerName: "Ngày Tạo",
      width: 160,
    },
    {
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 160,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 0:
            badgeVariant = "primary";
            statusText = "Còn";
            break;
          case 1:
            badgeVariant = "warning";
            statusText = "Hết";
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
      headerName: "Action",
      width: 70,
    },
  ];
  const rows = listChucVu
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
    .map((item, index) => ({
      idCv: item.idCv,
      id: index + 1,
      index: index + 1,
      maCv: item.maCv,
      tenCv: item.tenCv,
      ngayTao: item.ngayTao,
      trangThai: item.trangThai,
    }));

  const handlClickRow = (item) => {
    console.log("Check click: ", item);
    Navigate(`/order-management-timeline/${item.idCv}`);
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
              //   value={selectedStatus}
              onChange={(e) => status(e)}
            >
              <option value="1">Tất cả</option>
              <option value="2">Còn</option>
              <option value="3">Hết</option>
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
              Thêm Chức Vụ
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
      <ModalsAddChucVu show={isShowModalAddNew} handleClose={handleClose} />
      {/* <ModelConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataChucVu={isDataChucVu}
        getXanXuat={getChucVu}
      /> */}
    </>
  );
};
export default TableChucVu;
