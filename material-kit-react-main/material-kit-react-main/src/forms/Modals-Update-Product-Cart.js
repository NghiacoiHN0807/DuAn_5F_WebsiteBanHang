import { useState } from "react";
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
import { updateCart } from "../services/DirectSaleSevice";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";

const ModalUpdateProductOnCart = (props) => {
  const {
    show,
    handleClose,
    itemUpdateClassify,
    selectDataCart,
    itemUpdate,
    currentPage,
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
  const handleChoose = async () => {
    let selectedSp = itemUpdateClassify[0].idSp.tenSp;

    if (selectedSize === null || selectedSp === "") {
      toast.warn("Xin mời chọn size của sản phẩm");
    } else if (quantity < 1 || isNaN(quantity) || quantity === "") {
      toast.warn("Vui lòng chọn số lượng lớn hơn 0");
    } else {
      let getIdHdCt = itemUpdate[1];

      let getOneCTSP = await findByProductNameAndSize(selectedSp, selectedSize);

      let donGia = itemUpdateClassify[0].idSp.giaBan * quantity;
      //Insert to the cart

      await updateCart(getIdHdCt, getOneCTSP, quantity, donGia);
      //Close the modal
      setSelectedSize(null);
      handleClose();
      setQuantity(1);
      //Load new data on cart
      selectDataCart(currentPage);
      toast.success("Cập nhập sản phẩm thành công");
    }
  };

  return (
    <>
      <div>
        <Dialog open={show} onClose={handleClose} maxWidth="xl">
          <DialogTitle>CẬP NHẬP SẢN PHẨM</DialogTitle>
          {itemUpdateClassify.length > 0 && (
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
                      image={itemUpdate[2]}
                      alt={itemUpdate[2]}
                    />
                  </Carousel.Item>
                  {/* );
                  })} */}
                </Carousel>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      <h5>Tên Sản Phẩm: {itemUpdateClassify[0].idSp.tenSp}</h5>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      <p>Xuất Xứ: {itemUpdateClassify[0].idSp.idXx.tenNuoc}</p>
                      <p>Chất Liệu: {itemUpdateClassify[0].idSp.idCl.tenCl}</p>
                      <h6>Giá: {itemUpdateClassify[0].idSp.giaBan}</h6>
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <div>
                      Size:{" "}
                      {itemUpdateClassify.map((size, sizeIndex) => (
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
          {/* {itemUpdateClassify.length > 0 && (
            <DialogContent>
              <Card sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ maxWidth: 250, height: 300 }}
                  image={itemUpdateClassify}
                  alt={itemUpdateClassify}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      <h5>Tên Sản Phẩm: {itemUpdateClassify[0].idSp.tenSp}</h5>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      <p>Xuất Xứ: {itemUpdateClassify[0].idSp.idXx.tenNuoc}</p>
                      <p>Chất Liệu: {itemUpdateClassify[0].idSp.idCl.tenCl}</p>
                      <h6>Giá: {itemUpdateClassify[0].idSp.giaBan}</h6>
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <div>
                      Size:{" "}
                      {itemUpdateClassify.map((size, sizeIndex) => (
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
          )} */}
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleChoose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ModalUpdateProductOnCart;
