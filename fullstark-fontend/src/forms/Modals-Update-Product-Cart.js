import { useState } from 'react';
import '../scss/Modal-Detail-SanPham.scss';
// import { selectAllImgProduct } from "../services/BillSevice";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { Carousel } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';
import { findByProductNameAndSize } from '../service/BillSevice';
import { updateCart } from '../service/DirectSaleSevice';

const ModalUpdateProductOnCart = (props) => {
  ModalUpdateProductOnCart.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    itemUpdateClassify: PropTypes.array.isRequired,
    selectDataCart: PropTypes.func.isRequired,
    itemUpdate: PropTypes.array.isRequired,
  };
  const { show, handleClose, itemUpdateClassify, selectDataCart, itemUpdate } = props;

  //   Insert product
  //   Get Name Of Size And Number
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMauSac, setSelectedMauSac] = useState(null);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [isMSSelected, setIsMSSelected] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectSoLuongTon, setSelectSoLuongTon] = useState([]);

  const handleShowSize = (size) => {
    // Select price
    const checkSize = Array.isArray(itemUpdateClassify)
      ? [...new Set(itemUpdateClassify.filter((item) => item.idSize.tenSize === size))]
      : [];
    // const checkSize = dataDetail.filter((item) => item.idSize.tenSize === size);

    if (isSizeSelected && selectedSize === size) {
      setSelectedSize(null);
      setIsSizeSelected(false);
      setAvailableColors([]);
      setSelectedMauSac(null);
      setIsMSSelected(false);
      setSelectSoLuongTon([]);
    } else {
      setSelectedSize(size);
      setIsSizeSelected(true);
      setAvailableColors(checkSize);
    }
  };

  const handleShowMS = (mauSac) => {
    const checkSoLuong = Array.isArray(itemUpdateClassify)
      ? [
          ...new Set(
            itemUpdateClassify.filter(
              (item) => item.idMs.tenMs === mauSac.idMs.tenMs && item.idSize.tenSize === selectedSize
            )
          ),
        ]
      : [];
    console.log('checkSoLuong:', checkSoLuong);

    if (isMSSelected && selectedMauSac === mauSac.idMs.tenMs) {
      setSelectedMauSac(null);
      setIsMSSelected(false);
      setSelectSoLuongTon([]);
    } else {
      setSelectSoLuongTon(checkSoLuong);
      setSelectedMauSac(mauSac.idMs.tenMs);
      setIsMSSelected(true);
    }
  };
  const [quantity, setQuantity] = useState(1); // Initialize with a default quantity
  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
  };

  //   Get number
  const [alertContent, setAlertContent] = useState(null);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const handleChoose = async () => {
    const selectedSp = itemUpdateClassify[0].idSp.tenSp;

    if (selectedSize === null || selectedSp === '') {
      setAlertContent({
        type: 'warning',
        message: 'Xin mời chọn size của sản phẩm',
      });
    } else if (quantity < 1 || Number.isNaN(quantity) || quantity === '') {
      setAlertContent({
        type: 'warning',
        message: 'Vui lòng chọn số lượng lớn hơn 0',
      });
    } else {
      const getIdHdCt = itemUpdate[1];

      const getOneCTSP = await findByProductNameAndSize(selectedSp, selectedSize, selectedMauSac);
      console.log('getOneCTSP: ', getOneCTSP);

      const donGia = getOneCTSP.giaThucTe * quantity;
      console.log('donGia: ', donGia);

      //   Insert to the cart

      await updateCart(getIdHdCt, getOneCTSP, quantity, donGia);
      //   Close the modal
      setSelectedSize(null);
      handleClose();
      setQuantity(1);
      //   Load new data on cart
      selectDataCart();
      setAlertContent({
        type: 'success',
        message: 'Cập nhập sản phẩm thành công',
      });
    }
  };
  // Set select one MS and Size
  const uniqueSizes = Array.isArray(itemUpdateClassify)
    ? [...new Set(itemUpdateClassify.map((item) => item.idSize.tenSize))]
    : [];
  const uniqueMS = Array.isArray(itemUpdateClassify)
    ? [...new Set(itemUpdateClassify.map((item) => item.idMs.tenMs))]
    : [];

  // Select price
  // Select price
  const giaThucTe = Array.isArray(itemUpdateClassify)
    ? [...new Set(itemUpdateClassify.map((item) => item.giaThucTe))]
    : [];

  // Find max and min of price
  const minPrice = Math.min(...giaThucTe);
  const maxPrice = Math.max(...giaThucTe);

  // Create the price range string
  const formattedMinPrice = minPrice.toLocaleString('en-US').replace(/,/g, '.');
  const formattedMaxPrice = maxPrice.toLocaleString('en-US').replace(/,/g, '.');
  const priceRange = minPrice === maxPrice ? formattedMinPrice : `${formattedMinPrice} - ${formattedMaxPrice}`;
  const getFirstImage = (item) => {
    if (item && item.trim() !== '') {
      const imagesArray = item.split(',');
      return imagesArray[0];
    }
    return null;
  };
  return (
    <>
      <div>
        <Dialog open={show} onClose={handleClose} maxWidth="xl">
          <DialogTitle>CẬP NHẬP SẢN PHẨM</DialogTitle>
          {itemUpdateClassify.length > 0 && (
            <DialogContent>
              <Card sx={{ display: 'flex' }}>
                <Carousel interval={null} style={{ maxWidth: 500, margin: '0 auto' }}>
                  {/* {listImages.map((item, index) => {
                    return key={`carousel-item-${index}`} ( */}
                  <Carousel.Item>
                    <CardMedia
                      component="img"
                      sx={{ maxWidth: 250, height: 300 }}
                      image={getFirstImage(itemUpdate[2])}
                      alt={getFirstImage(itemUpdate[2])}
                    />
                  </Carousel.Item>
                  {/* );
                  })} */}
                </Carousel>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      <h5>Tên Sản Phẩm: {itemUpdateClassify[0].idSp.tenSp}</h5>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      <p>Xuất Xứ: {itemUpdateClassify[0].idSp.idXx.tenNuoc}</p>
                      <p>Chất Liệu: {itemUpdateClassify[0].idSp.idCl.tenCl}</p>
                      <p>Giá: {selectSoLuongTon.length > 0 ? selectSoLuongTon[0].giaThucTe : priceRange}</p>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
                      <div>
                        Size:{' '}
                        {uniqueSizes.map((size, sizeIndex) => (
                          <Button
                            style={{
                              marginRight: '4px',
                              marginBottom: '4px',
                            }}
                            key={`size-button-${sizeIndex}`}
                            onClick={() => handleShowSize(size)}
                            variant={selectedSize === size ? 'contained' : 'outlined'}
                            size="small"
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <div>
                        Màu Sắc:{' '}
                        {availableColors.length > 0
                          ? // Hiển thị danh sách màu sắc từ availableColors
                            availableColors.map((mauSac, msIndex) => (
                              <Button
                                style={{
                                  marginRight: '4px',
                                  marginBottom: '4px',
                                }}
                                key={`size-button-${msIndex}`}
                                onClick={() => handleShowMS(mauSac)}
                                variant={selectedMauSac === mauSac.idMs.tenMs ? 'contained' : 'outlined'}
                                size="small"
                              >
                                {mauSac.idMs.tenMs}
                              </Button>
                            ))
                          : // Hiển thị dữ liệu từ dataDetail
                            uniqueMS.map((item, index) => (
                              <Button
                                style={{
                                  marginRight: '4px',
                                  marginBottom: '4px',
                                }}
                                key={`size-button-${index}`}
                                onClick={() => handleShowMS(item)}
                                variant={selectedMauSac === item ? 'contained' : 'outlined'}
                                size="small"
                              >
                                {item}
                              </Button>
                            ))}
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <span className="buttons_added">
                        <p>Số lượng: </p>
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
                          value={quantity || '0'}
                          onChange={handleQuantityChange}
                        />
                        <IconButton onClick={() => setQuantity(quantity + 1)} color="primary" aria-label="add an alarm">
                          <AddIcon fontSize="small" />
                        </IconButton>
                        {selectSoLuongTon.length > 0 && <span>Số lượng tồn: {selectSoLuongTon[0].soLuongTon}</span>}
                      </span>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleChoose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
      {alertContent && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={alertContent.type} sx={{ width: '100%' }}>
            {alertContent.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
export default ModalUpdateProductOnCart;
