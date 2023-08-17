import { useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/Modal-Detail-SanPham.scss";
// import { selectAllImgProduct } from "../services/BillSevice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { findByProductNameAndSize } from "../services/BillSevice";
import { postAddDirect, updateCart } from "../services/DirectSaleSevice";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";

const ModalDetailProduct = (props) => {
  const {
    show,
    handleCloseDetai,
    dataDetail,
    selectDataCart,
    DataCart,
    listImages,
    currentPage1,
  } = props;

  //Insert product
  //Get Name Of Size And Number
  const [selectedSize, setSelectedSize] = useState(null);
  // const [selectedSp, setSelectedSp] = useState("");
  const [isSizeSelected, setIsSizeSelected] = useState(false);

  const handleShowSize = (size) => {
    if (isSizeSelected && selectedSize === size.idSize.tenSize) {
      setSelectedSize(null);
      setIsSizeSelected(false);
    } else {
      setSelectedSize(size.idSize.tenSize);
      setIsSizeSelected(true);
    }
  };
  const [quantity, setQuantity] = useState(1); // Initialize with a default quantity
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  //Get number
  const param = useParams();
  const idHdParam = param.id;

  const handleChoose = async () => {
    let selectedSp = dataDetail[0].idSp.tenSp;
    console.log("Selected selectedSp:", selectedSp);

    let getOneCTSP = await findByProductNameAndSize(selectedSp, selectedSize);

    const existingItem = DataCart.find(
      (item) => item[10] === getOneCTSP.idCtsp
    );
    console.log("Selected existingItem:", existingItem);

    if (selectedSize === null || selectedSp === "") {
      toast.warn("Xin mời chọn size của sản phẩm");
    } else if (quantity < 1 || quantity === "" || isNaN(quantity)) {
      toast.warn("Vui lòng chọn số lượng lớn hơn 0");
    } else if (existingItem) {
      //Get IdHdct
      let getIdHdct = existingItem[1];
      //Get soLuong
      let oldQuantity = existingItem[8];
      let newQuantity = oldQuantity + quantity;
      //Get donGia
      let donGia = existingItem[7] * newQuantity;

      //Update Product On Cart
      await updateCart(getIdHdct, getOneCTSP, newQuantity, donGia);
      //Close the modal
      setSelectedSize(null);
      handleCloseDetai();
      setQuantity(1);
      //Load new data on cart
      selectDataCart(currentPage1);
      toast.warn(
        "Sản phẩm đã có trong giỏ hàng. Chúng tôi đã cộng thêm số lượng vào sản phẩm"
      );
    } else {
      console.log("quantity: " + quantity);
      //Insert to the cart
      let donGia = dataDetail[0].idSp.giaBan * quantity;
      await postAddDirect(getOneCTSP, quantity, donGia, idHdParam, 0);
      //Close the modal
      setSelectedSize(null);
      handleCloseDetai();
      setQuantity(1);
      //Load new data on cart
      selectDataCart(currentPage1);
      toast.success("Thêm sản phẩm thành công");
    }
  };

  return (
    <>
      <div>
        <Dialog open={show} onClose={handleCloseDetai} maxWidth="xl">
          <DialogTitle>THÔNG TIN SẢN PHẨM</DialogTitle>
          {dataDetail.length > 0 && (
            <DialogContent>
              <Card sx={{ display: "flex" }}>
                <Carousel
                  interval={null}
                  style={{ maxWidth: 500, margin: "0 auto" }}
                >
                  {/* {listImages.map((item, index) => {
                    return key={`carousel-item-${index}`} ( */}
                  <Carousel.Item>
                    <CardMedia
                      component="img"
                      sx={{ maxWidth: 250, height: 300 }}
                      image={listImages}
                      alt={listImages}
                    />
                  </Carousel.Item>
                  {/* );
                  })} */}
                </Carousel>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      <h5>Tên Sản Phẩm: {dataDetail[0].idSp.tenSp}</h5>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      <p>Xuất Xứ: {dataDetail[0].idSp.idXx.tenNuoc}</p>
                      <p>Chất Liệu: {dataDetail[0].idSp.idCl.tenCl}</p>
                      <h6>Giá: {dataDetail[0].idSp.giaBan}</h6>
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <div>
                      Size:{" "}
                      {dataDetail.map((size, sizeIndex) => (
                        <Button
                          style={{
                            marginRight: "4px",
                            marginBottom: "4px",
                          }}
                          key={`size-button-${sizeIndex}`}
                          onClick={() => handleShowSize(size)}
                          variant={
                            selectedSize === size.idSize.tenSize
                              ? "contained"
                              : "outlined"
                          }
                          size="small"
                        >
                          {size.idSize.tenSize}
                        </Button>
                      ))}
                    </div>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <span className="buttons_added">
                      <label>Số lượng: </label>
                      <IconButton
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        color="primary"
                        aria-label="add an alarm"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <input
                        aria-label="quantity"
                        className="input-qty"
                        max="Số tối đa"
                        min="Số tối thiểu"
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={quantity || "0"}
                        onChange={handleQuantityChange}
                      />
                      <IconButton
                        onClick={() => setQuantity(quantity + 1)}
                        color="primary"
                        aria-label="add an alarm"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Box>
                </Box>
              </Card>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleCloseDetai}>Hủy</Button>
            <Button onClick={handleChoose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ModalDetailProduct;
