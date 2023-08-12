import { useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/Car-Bill-ADM.scss";
// import { selectAllImgProduct } from "../services/BillSevice";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Col, Image, Table } from "react-bootstrap";
import { fetchAllCTSPBySize, findById } from "../services/BillSevice";
import ModalDetailProduct from "./Modal-Detail-SanPham";

const ModalAddProduct = (props) => {
  const { show, handleClose, selectDataCart, DataCart } = props;
  //Show Data on Table
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState([]);

  useEffect(() => {
    getAllData(0);
  }, []);
  const getAllData = async (page) => {
    try {
      let getData = await fetchAllCTSPBySize(page);

      if (getData && getData.content) {
        setListData(getData.content);
        console.log("Check listData: ", listData);
        setNumberPages(getData.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //Next Page

  //Insert product
  //Get Name Of Size
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSp, setSelectedSp] = useState("");
  const [dataDetail, setDataDetail] = useState([]);

  const handleShowSize = (size, tenSp) => {
    setSelectedSize(size);
    setSelectedSp(tenSp);
    console.log("Selected size for product:", size, tenSp);
  };
  //Get number
  const param = useParams();
  const idHdParam = param.id;
  const handleChoose = async (idSp) => {
    let getOneSP = await findById(idSp);
    setDataDetail(getOneSP);
    setShowModalDetail(true);
  };
  // Model Detail Product
  const [showModalDetail, setShowModalDetail] = useState(false);
  const handleCloseDetai = () => {
    setShowModalDetail(false);
  };

  return (
    <>
      <div>
        <Dialog open={show} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>DANH SÁCH SẢN PHẨM</DialogTitle>
          <DialogContent>
            <Table className="table-Cart" striped hover borderless>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Mã Sản Phẩm</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Giá Sản Phẩm</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {listData &&
                  listData.length &&
                  listData.map((item, index) => {
                    const imagesArray = item[0].split(","); // Tách chuỗi thành mảng
                    const firstImage = imagesArray[0];
                    return (
                      <tr key={`images-${index}`}>
                        <td>
                          <Col xs={6} md={4}>
                            <Image
                              rounded
                              style={{ width: "150px", height: "auto" }}
                              src={firstImage}
                            />
                          </Col>
                        </td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>

                        <td>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleChoose(item[1])}
                          >
                            Chọn
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleClose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
      <ModalDetailProduct
        show={showModalDetail}
        handleCloseDetai={handleCloseDetai}
        dataDetail={dataDetail}
        selectDataCart={selectDataCart}
        DataCart={DataCart}
      />
    </>
  );
};
export default ModalAddProduct;
