import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postAddBill, selectAllBill } from "../services/BillSevice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton, Pagination } from "@mui/material";
import "../scss/DirectSaleADM.scss";
import { Badge, Form, Nav, Stack } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { pink } from "@mui/material/colors";
import ModalDeleteDirectSale from "../forms/Modal-Delete-DirectSale";

const DireactSale = (props) => {
  const [listBill, setListBill] = useState([]);
  // Show Data On Tables
  const [numberPages, setNumberPages] = useState(0);
  const getListData = async (page) => {
    try {
      let res = await selectAllBill(page);
      console.log("Check res: ", res.content);
      setListBill(res.content);

      setNumberPages(Math.ceil(res.totalPages));
    } catch (error) {
      console.error("Error in list bill: ", error);
    }
  };
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getListData(currentPage);
  }, [currentPage]);

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "maHd", headerName: "Mã Hóa Đơn", width: 150 },
    { field: "thanhTien", headerName: "Thành Tiền", width: 150 },
    { field: "tenKh", headerName: "Tên Khách Hàng", width: 150 },
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
      field: "trangThai",
      headerName: "Trạng Thái",
      width: 200,
      renderCell: (params) => {
        const { value: trangThai } = params;
        let badgeVariant, statusText;
        switch (trangThai) {
          case 8:
            badgeVariant = "danger";
            statusText = "Hóa Đơn Treo";

            break;
          case 9:
            badgeVariant = "success";
            statusText = "Đã thanh toán";
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
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              onClick={() => handleEdit(params)}
            >
              <EditOutlinedIcon color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDelete(params)}
            >
              <DeleteSweepOutlinedIcon sx={{ color: pink[500] }} />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [searchKeyword, setSearchKeyword] = useState("");
  const rows = listBill
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
    setCurrentPage(page);
  };

  //Create a new Detail Direct
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

  const navigate = useNavigate();
  let getIdHttp;

  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const handleAdd = async () => {
    const newCode = generateNewCode();
    let res = await postAddBill(newCode, formattedDate, 1, 8);
    toast.success("Tạo thành công hóa đơn");
    getIdHttp = res.idHd;
    navigate(`/create-bill/${getIdHttp}`);
  };

  //Delete
  const [open, setOpen] = useState(false);
  const [information, setInformation] = useState();

  const handleDelete = (params) => {
    setOpen(true);
    setInformation(params.row);
  };

  const handleClose = () => {
    setOpen(false);
    getListData(currentPage);
  };
  //Edit
  const handleEdit = (params) => {
    navigate(`/create-bill/${params.row.idHd}`);
  };

  return (
    <>
      <div className="row row-order-management">
        <div className="my-3 add-new">
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
      {/* Dialog xác nhận xóa */}
      <ModalDeleteDirectSale
        open={open}
        handleClose={handleClose}
        information={information}
      />
    </>
  );
};
export default DireactSale;
