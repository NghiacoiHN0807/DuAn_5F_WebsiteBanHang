import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Image } from "react-bootstrap";
import ModalDetailProduct from "./Modal-Detail-SanPham";
import { fetchAllCTSPBySize, findById } from "../services/BillSevice";

const ModalAddProduct = (props) => {
  const { show, handleClose, selectDataCart, DataCart, currentPage1 } = props;
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataDetail, setDataDetail] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [showModalDetail, setShowModalDetail] = useState(false);

  const getAllData = useCallback(async (page) => {
    try {
      let getData = await fetchAllCTSPBySize(page);
      if (getData && getData.content) {
        setListData(getData.content);
        setNumberPages(getData.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllData(currentPage);
  }, [currentPage, getAllData]);

  const handlePageClick = (page) => {
    getAllData(page);
    setCurrentPage(page);
  };

  const handleChoose = async (idSp, imgs) => {
    let getOneSP = await findById(idSp);
    setListImages(imgs[0]);
    setDataDetail(getOneSP);
    setShowModalDetail(true);
  };

  const handleCloseDetail = () => {
    setShowModalDetail(false);
  };

  return (
    <>
      <div>
        <Dialog open={show} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>DANH SÁCH SẢN PHẨM</DialogTitle>
          <DialogContent>
            <TableContainer
              sx={{ marginTop: 2, marginBottom: 2 }}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Mã Sản Phẩm</TableCell>
                    <TableCell align="right">Tên Sản Phẩm</TableCell>
                    <TableCell align="right">Giá</TableCell>
                    <TableCell align="right">Thao Tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listData && listData.length > 0 ? (
                    listData.map((item, index) => {
                      const imagesArray = item[0].split(","); // Tách chuỗi thành mảng
                      const firstImage = imagesArray[0];
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Image
                              rounded
                              style={{ width: "150px", height: "auto" }}
                              src={firstImage}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item[2]}
                          </TableCell>
                          <TableCell align="right">{item[3]}</TableCell>

                          <TableCell align="right">{item[4]}</TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleChoose(item[1], imagesArray)}
                            >
                              Chọn
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell align="right" colSpan={8}>
                        KHÔNG CÓ DỮ LIỆU
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Table className="table-Cart" striped hover borderless>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Mã Sản Phẩm</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Giá Sản Phẩm</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <thead>
                {listData.map((item, index) => {
                  const imagesArray = item[0].split(","); // Tách chuỗi thành mảng
                  const firstImage = imagesArray[0];
                  return (
                    <tr key={`images-${index}`}>
                      <th>
                        <Image
                          rounded
                          style={{ width: "150px", height: "auto" }}
                          src={firstImage}
                        />
                      </th>
                      <th>{item[2]}</th>
                      <th>{item[3]}</th>
                      <th>{item[4]}</th>
                      <th>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleChoose(item[1], imagesArray)}
                        >
                          Chọn
                        </Button>
                      </th>
                    </tr>
                  );
                })}
              </thead>
            </Table> */}
            <Stack
              direction="row"
              spacing={2}
              justify="center"
              alignItems="center"
            >
              <Pagination
                onChange={(event, page) => handlePageClick(page - 1)}
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
      <ModalDetailProduct
        show={showModalDetail}
        handleCloseDetai={handleCloseDetail}
        dataDetail={dataDetail}
        selectDataCart={selectDataCart}
        DataCart={DataCart}
        listImages={listImages}
        currentPage1={currentPage1}
      />
    </>
  );
};

export default ModalAddProduct;
