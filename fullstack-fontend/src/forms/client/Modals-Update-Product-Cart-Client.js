import { useCallback, useEffect, useState } from 'react';
import '../../scss/Modal-Detail-SanPham.scss';
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
import { findByProductNameAndSize } from '../../service/BillSevice';
// import { updateCart } from '../../service/DirectSaleSevice';
import { listImg } from '../../service/client/Detail-Product';
import { updateCartClient } from '../../service/client/Detail-Cart';

const ModalUpdateProductOnCartClient = (props) => {
  ModalUpdateProductOnCartClient.propTypes = {
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
      setSelectSoLuongTon([]);
      setSelectedMauSac(null);
      setIsMSSelected(false);
      setSelectedSize(size);
      setIsSizeSelected(true);
      setAvailableColors(checkSize);
    }
  };

  const handleShowMS = (mauSac) => {
    if (!mauSac || !mauSac.idMs) {
      setAlertContent({
        type: 'warning',
        message: 'Xin mời chọn size của sản phẩm',
      });
    } else {
      const checkSoLuong = Array.isArray(itemUpdateClassify)
        ? [
            ...new Set(
              itemUpdateClassify.filter(
                (item) => item.idMs.tenMs === mauSac.idMs.tenMs && item.idSize.tenSize === selectedSize
              )
            ),
          ]
        : [];

      if (isMSSelected && selectedMauSac === mauSac.idMs.tenMs) {
        setSelectedMauSac(null);
        setIsMSSelected(false);
        setSelectSoLuongTon([]);
      } else {
        setSelectSoLuongTon(checkSoLuong);
        setSelectedMauSac(mauSac.idMs.tenMs);
        setIsMSSelected(true);
      }
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
    // const productExistsInItemUpdate = selectSoLuongTon.find((product) => product.idCtsp === itemUpdate.idCtsp.idCtsp);

    // const productExistsInItemUpdate = selectSoLuongTon.find((product) => product.idCtsp === itemUpdate.idCtsp.idCtsp);
    // console.log('productExistsInItemUpdate:', productExistsInItemUpdate);

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
    } else if (quantity > selectSoLuongTon[0].soLuongTon) {
      setAlertContent({
        type: 'warning',
        message: 'Sản Phẩm Vượt Quá Số Lượng Tồn',
      });
    } else if (quantity > 20) {
      setAlertContent({
        type: 'warning',
        message: 'Vui Lòng Liên Hệ Với Chúng Tôi Để Mua Sỉ',
      });
    } else {
      const getIdHdCt = itemUpdate.idGhct;

      const getOneCTSP = await findByProductNameAndSize(selectedSp, selectedSize, selectedMauSac);
      //   Insert to the cart

      const changtoHDCT = await updateCartClient(getIdHdCt, getOneCTSP, quantity);
      //   Close the modal
      if (changtoHDCT.status === 400) {
        setAlertContent({
          type: 'warning',
          message: changtoHDCT.data.error,
        });
      } else {
        setAlertContent({
          type: 'success',
          message: 'Cập Nhập Sản Phẩm Thành Công',
        });
      }
      //   Close the modal
      setSelectedSize(null);
      handleCloseDetai();
      setQuantity(1);
      //   Load new data on cart
      selectDataCart();
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

  const [images, setImages] = useState([]);

  const getDetail = useCallback(async () => {
    try {
      const imgDataArray = await listImg(itemUpdate.idCtsp.idSp.idSp);

      setImages(imgDataArray);
    } catch (e) {
      console.error(e);
    }
  }, [itemUpdate.idCtsp.idSp.idSp]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);
  const handleCloseDetai = () => {
    handleClose();
    setSelectSoLuongTon([]);
    setAvailableColors([]);
    setIsMSSelected(false);
    setIsSizeSelected(false);
    setSelectedMauSac(null);
    setSelectedSize(null);
    setQuantity(1);
    // Call the original handleClose function
  };
  return (
    <>
      <div>
        <Dialog open={show} onClose={handleCloseDetai} maxWidth="xl">
          <DialogTitle>CẬP NHẬP SẢN PHẨM</DialogTitle>
          {itemUpdateClassify.length > 0 && (
            <DialogContent>
              <Card sx={{ display: 'flex' }}>
                <Carousel interval={null} style={{ maxWidth: 500, margin: '0 auto' }}>
                  <Carousel.Item>
                    {images.length > 0 && (
                      <CardMedia
                        component="img"
                        sx={{ maxWidth: 250, height: '100%' }}
                        image={images && images[0].url}
                        alt={images && images[0].url}
                      />
                    )}
                  </Carousel.Item>
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
            <Button onClick={handleCloseDetai}>Hủy</Button>
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
export default ModalUpdateProductOnCartClient;
