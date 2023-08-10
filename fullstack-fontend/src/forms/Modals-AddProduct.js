import { useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/Car-Bill-ADM.scss";
// import { selectAllImgProduct } from "../services/BillSevice";
import { useEffect } from "react";
import { postAddDirect } from "../services/DirectSaleSevice";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Col, Image, Table } from "react-bootstrap";
import {
  fetchAllCTSPBySize,
  findByProductNameAndSize,
} from "../services/BillSevice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ModalAddProduct = (props) => {
  const { show, handleClose, selectDataCart } = props;
  //Show Data on Table
  const [listData, setListData] = useState([]);
  const [numberPages, setNumberPages] = useState([]);

  useEffect(() => {
    getAllData(0);
  }, []);
  const getAllData = async (page) => {
    try {
      let getData = await fetchAllCTSPBySize(page);
      console.log("Check getDataProduct: ", getData);

      if (getData && getData.content) {
        setListData(getData.content);
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

  const handleShowSize = (size, tenSp) => {
    setSelectedSize(size);
    setSelectedSp(tenSp);
    console.log("Selected size for product:", size, tenSp);
  };
  //Get number
  const param = useParams();
  const idHdParam = param.id;
  const handleChoose = async (idCtsp) => {
    if (selectedSp === null || selectedSize === null) {
      console.log("Please select");
    } else {
      let getOneSP = await findByProductNameAndSize(selectedSp, selectedSize);
      console.log("Check getOneSP: ", getOneSP);
      // await postAddDirect(idCtsp, 1, idCtsp.giaBan, idHdParam, 0);
      // selectDataCart();
    }
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
                  <th>Size</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {listData &&
                  listData.length &&
                  listData.map((item, index) => {
                    const sizes = item[3].split(",");
                    return (
                      <tr key={`images-${index}`}>
                        <td>
                          <Col xs={6} md={4}>
                            <Image src={`../assets/${item.tenSp}`} rounded />
                          </Col>
                        </td>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>
                          {sizes.map((size, sizeIndex) => (
                            <Button
                              style={{
                                marginRight: "4px",
                                marginBottom: "4px",
                              }}
                              key={`size-button-${index}-${sizeIndex}`}
                              onClick={() => handleShowSize(size, item[1])}
                              variant={
                                selectedSize === size ? "contained" : "outlined"
                              }
                              size="small"
                            >
                              {size}
                            </Button>
                          ))}
                        </td>

                        <td>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleChoose(item.idCtsp)}
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
    </>
  );
};
export default ModalAddProduct;
