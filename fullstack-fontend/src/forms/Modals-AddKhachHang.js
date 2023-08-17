import { useState } from "react";
import "../scss/Car-Bill-ADM.scss";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Stack,
} from "@mui/material";
import { Image, Table } from "react-bootstrap";
import { getAllDataTaiKhoan } from "../services/BillSevice";
import { useCallback } from "react";

const ModalAddKhachHang = (props) => {
  const {
    open,
    handleClose,
    setSelectedCustomerName,
    setSelectedCustomerEmail,
    setSelectedMaTk,
  } = props;
  //open Data on Table
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState(0);

  const getAllData = useCallback(async (page) => {
    try {
      let getData = await getAllDataTaiKhoan(page);
      if (getData && getData.content) {
        setListData(getData.content);
        setNumberPages(getData.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getAllData(currentPage);
  }, [currentPage, getAllData]);
  //Next Page
  const handlePageClick = (page) => {
    getAllData(page);
    setCurrentPage(page);
  };

  //Get number
  const handleChoose = async (item) => {
    setSelectedMaTk(`${item.maTaiKhoan}`);
    setSelectedCustomerName(`${item.ho} ${item.ten}`);
    setSelectedCustomerEmail(`${item.email}`);
    handleClose();
  };
  // Model Detail Product

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>DANH SÁCH TÀI KHOẢN KHÁCH HÀNG</DialogTitle>
          <DialogContent>
            <Table className="table-Cart" striped hover borderless>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Mã Khách Hàng</th>
                  <th>Tên Khách Hàng</th>
                  <th>Email</th>
                  <th>Số Điện Thoại</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {listData &&
                  listData.length &&
                  listData.map((item, index) => {
                    return (
                      <tr key={`images-${index}`}>
                        <td>
                          <Image
                            rounded
                            style={{ width: "150px", height: "auto" }}
                            src={item.maKh}
                          />
                        </td>
                        <td>{item.maTaiKhoan}</td>
                        <td>
                          {item.ho} {item.ten}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.sdt}</td>
                        <td>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleChoose(item)}
                          >
                            Chọn
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Stack
              direction="row"
              spacing={2}
              justify="center"
              alignitems="center"
            >
              <Pagination
                onChange={(event, page) => handlePageClick(page - 1)} // Subtract 1 from page value
                count={numberPages}
                variant="outlined"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleClose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ModalAddKhachHang;
