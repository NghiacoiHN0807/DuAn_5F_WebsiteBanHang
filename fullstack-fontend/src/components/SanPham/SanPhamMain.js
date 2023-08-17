import { useEffect, useState } from "react";

import { fetchSpWithImg, deleteSanPham } from "../../services/SanPhamService";

import { Badge, Button, Form, Image } from "react-bootstrap";
import { fetchXX } from "../../services/XuatXuService";
import { fetchCL } from "../../services/ChatLieuService";
import { fetchCoAo } from "../../services/LoaiCoAoService";
import { fetchLSP } from "../../services/LoaiSPService";
import { fetchMS } from "../../services/MauSacService";
import { fetchTayAo } from "../../services/OngTayAoService";
import { fetchSize } from "../../services/SizeService";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TableCell,
} from "@mui/material";
import { toast } from "react-toastify";
import { pink } from "@mui/material/colors";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TableSanPham = (props) => {
  //Set value for table
  const [listSanPham, setListSanPham] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const [listCL, setListCL] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);

  const [chatLieu, setChatLieu] = useState("");
  const [mauSac, setMauSac] = useState("");
  const [coAo, setCoAo] = useState("");
  const [loaiSp, setLoaiSp] = useState("");
  const [tayAo, setTayAo] = useState("");
  const [xuatXu, setXuatXu] = useState("");
  const [size, setSize] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [originalListData, setOriginalListData] = useState([]);

  //Set value for Model Add New is defalut
  // Show Data On Tables
  useEffect(() => {
    getSanPham(0);
    getAllList();
  }, []);

  const getSanPham = async (page) => {
    let res = await fetchSpWithImg(page);
    console.log("Data", res);
    if (res && res.content) {
      setListSanPham(res.content);
      setNumberPages(Math.ceil(res.totalPages));
      setOriginalListData(res.content);
    }
  };

  const getAllList = async () => {
    let resCL = await fetchCL();
    setListCL(resCL);

    let resMS = await fetchMS();
    setListMS(resMS);

    let resSize = await fetchSize();
    setListSize(resSize);

    let resLSP = await fetchLSP();
    setListLSP(resLSP);

    let resXX = await fetchXX();
    setListXX(resXX);

    let resTayAo = await fetchTayAo();
    setListTayAo(resTayAo);

    let resCoAo = await fetchCoAo();
    setListCoAo(resCoAo);
  };

  //Add
  const handAdd = () => {
    navigate("/quan-ly-san-pham/san-pham/them-san-pham");
  };

  //Update
  const handUpdate = (idSp) => {
    navigate("/quan-ly-san-pham/san-pham/sua-san-pham/" + idSp);
  };

  //Delete
  const handleDelete = async (idSp) => {
    let res = await deleteSanPham(idSp);
    console.log("Check res: ", res);
    if (res && res.idSp) {
      toast.success("Xóa thành công!");
      getSanPham(0);
      handleClose();
    } else {
      toast.error("Xóa thất bại!");
      handleClose();
    }
  };

  // dong mo confirm
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const handleClickOpenDelete = (idSp) => {
    setOpen(true);
    setIdDelete(idSp);
  };

  const handleClose = () => {
    setOpen(false);
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

  // fillter
  useEffect(() => {
    const filteredData =
      chatLieu === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter((item) => item.idCl === Number(chatLieu));
    setListSanPham(filteredData);
    // setChatLieu("");
    setMauSac("");
    setCoAo("");
    setLoaiSp("");
    setTayAo("");
    setSize("");
    setXuatXu("");
    setTrangThai("");
  }, [chatLieu, originalListData]);

  useEffect(() => {
    const filteredData =
      mauSac === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter((item) => item.idMs === Number(mauSac));
    setListSanPham(filteredData);
    setChatLieu("");
    // setMauSac("");
    setCoAo("");
    setLoaiSp("");
    setTayAo("");
    setSize("");
    setXuatXu("");
    setTrangThai("");
  }, [mauSac, originalListData]);

  useEffect(() => {
    const filteredData =
      coAo === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter((item) => item.idCoAo === Number(coAo));
    setListSanPham(filteredData);
    setChatLieu("");
    setMauSac("");
    // setCoAo("");
    setLoaiSp("");
    setTayAo("");
    setSize("");
    setXuatXu("");
    setTrangThai("");
  }, [coAo, originalListData]);

  useEffect(() => {
    const filteredData =
      loaiSp === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter((item) => item.idLoaiSp === Number(loaiSp));
    setListSanPham(filteredData);
    setChatLieu("");
    setMauSac("");
    setCoAo("");
    // setLoaiSp("");
    setTayAo("");
    setSize("");
    setXuatXu("");
    setTrangThai("");
  }, [loaiSp, originalListData]);

  useEffect(() => {
    const filteredData =
      tayAo === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter((item) => item.idTayAo === Number(tayAo));
    setListSanPham(filteredData);
    setChatLieu("");
    setMauSac("");
    setCoAo("");
    setLoaiSp("");
    // setTayAo("");
    setSize("");
    setXuatXu("");
    setTrangThai("");
  }, [tayAo, originalListData]);

  useEffect(() => {
    const filteredData =
      size === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter(
            (item) => item.size && item.size.includes(size.toString())
          );
    setListSanPham(filteredData);
    setChatLieu("");
    setMauSac("");
    setCoAo("");
    setLoaiSp("");
    setTayAo("");
    // setSize("");
    setXuatXu("");
    setTrangThai("");
  }, [size, originalListData]);

  useEffect(() => {
    const filteredData =
      xuatXu === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter((item) => item.idXx === Number(xuatXu));
    setListSanPham(filteredData);
    setChatLieu("");
    setMauSac("");
    setCoAo("");
    setLoaiSp("");
    setTayAo("");
    setSize("");
    // setXuatXu("");
    setTrangThai("");
  }, [xuatXu, originalListData]);

  useEffect(() => {
    const filteredData =
      trangThai === ""
        ? originalListData // Sử dụng danh sách dữ liệu gốc khi chọn "All"
        : originalListData.filter(
            (item) => item.trangThai === Number(trangThai)
          );
    setListSanPham(filteredData);
    setChatLieu("");
    setMauSac("");
    setCoAo("");
    setLoaiSp("");
    setTayAo("");
    setSize("");
    setXuatXu("");
    // setTrangThai("");
  }, [trangThai, originalListData]);

  // table
  const columns = [
    { field: "index", headerName: "#", width: 50 },
    {
      field: "anh",
      headerName: "Ảnh",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        const { row } = params;
        const url = row.anh;
        return (
          <TableCell
            style={{ height: 240 }}
            className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center box">
              <Image
                rounded
                className="mr-2"
                style={{ width: "150px", height: "auto" }}
                src={url}
              />
            </div>
          </TableCell>
        );
      },
    },
    { field: "maSp", headerName: "Mã", width: 150 },
    { field: "tenSp", headerName: "Tên sản phẩm", width: 200 },

    {
      field: "giaBan",
      headerName: "Giá bán",
      width: 150,
    },
    {
      field: "moTa",
      headerName: "Mô tả",
      width: 150,
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
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const { row } = params;
        const idSp = row.actions;
        return (
          <div>
            <IconButton
              aria-label="edit"
              size="large"
              onClick={() => handUpdate(idSp)}
            >
              <EditOutlinedIcon color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleClickOpenDelete(idSp)}
            >
              <DeleteSweepOutlinedIcon sx={{ color: pink[500] }} />
            </IconButton>
          </div>
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
      maSp: item.maSp,
      anh: item.url,
      giaBan: formatCurrency(item.giaBan),
      moTa: item.moTa,
      trangThai: item.trangThai,
      actions: item.idSp,
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
          <div
            className="row"
            style={{
              textAlign: "center",
              marginLeft: "20px",
            }}
          >
            <div className="col-2">
              <label htmlFor="status-select">Chất liệu: </label>
              <select
                id="status-select"
                className="select-green"
                value={chatLieu}
                onChange={(e) => setChatLieu(e.target.value)}
              >
                <option value="">Tất cả</option>
                {listCL.map((item) => (
                  <option value={item.idCl}>{item.tenCl}</option>
                ))}
              </select>
            </div>
            <div className="col-2">
              <label htmlFor="status-select">Màu sắc: </label>
              <select
                id="status-select"
                className="select-green"
                value={mauSac}
                onChange={(e) => setMauSac(e.target.value)}
              >
                <option value="">Tất cả</option>
                {listMS.map((item) => (
                  <option value={item.idMs}>{item.tenMs}</option>
                ))}
              </select>
            </div>
            <div className="col-2">
              <label htmlFor="status-select">Loại cổ áo: </label>
              <select
                id="status-select"
                className="select-green"
                value={coAo}
                onChange={(e) => setCoAo(e.target.value)}
              >
                <option value="">Tất cả</option>
                {listCoAo.map((item) => (
                  <option value={item.idCoAo}>{item.loaiCoAo}</option>
                ))}
              </select>
            </div>
            <div className="col-2">
              <label htmlFor="status-select">Loại sản phẩm: </label>
              <select
                id="status-select"
                className="select-green"
                value={loaiSp}
                onChange={(e) => setLoaiSp(e.target.value)}
              >
                <option value="">Tất cả</option>
                {listLSP.map((item) => (
                  <option value={item.idLoaiSp}>{item.tenLsp}</option>
                ))}
              </select>
            </div>
            <div className="col-2">
              <label htmlFor="status-select">Ống tay áo: </label>
              <select
                id="status-select"
                className="select-green"
                value={tayAo}
                onChange={(e) => setTayAo(e.target.value)}
              >
                <option value="">Tất cả</option>
                {listTayAo.map((item) => (
                  <option value={item.idTayAo}>{item.loaiTayAo}</option>
                ))}
              </select>
            </div>
            <div className="col-2">
              <label htmlFor="status-select">Size: </label>
              <select
                id="status-select"
                className="select-green"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Tất cả</option>
                {listSize.map((item) => (
                  <option value={item.idSize}>{item.tenSize}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            className="row"
            style={{
              textAlign: "center",
              marginLeft: "300px",
            }}
          >
            <div className="col-2">
              <label htmlFor="status-select">Xuất xứ: </label>
              <select
                id="status-select"
                className="select-green"
                value={xuatXu}
                onChange={(e) => setXuatXu(e.target.value)}
              >
                <option value="">Tất cả</option>
                {listXX.map((item) => (
                  <option value={item.idXx}>{item.tenNuoc}</option>
                ))}
              </select>
            </div>
            <div className="col-3">
              <label htmlFor="status-select">Trạng thái: </label>
              <select
                id="status-select"
                className="select-green"
                value={trangThai}
                onChange={(e) => setTrangThai(e.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="0">Còn bán</option>
                <option value="10">Ngừng kinh doanh</option>
              </select>
            </div>
          </div>

          <div style={{ textAlign: "right", margin: "20px 0" }}>
            <Button variant="success" onClick={() => handAdd()}>
              <AddCircleIcon /> Thêm sản phẩm
            </Button>
          </div>
        </div>

        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowHeight={(params) => 220}
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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Xác nhận xóa?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Canel</Button>
            <Button onClick={() => handleDelete(idDelete)} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default TableSanPham;
