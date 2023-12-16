import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../scss/Modal-Detail-SanPham.scss';
// import { selectAllImgProduct } from "../services/BillSevice";
import { Button, Dialog, DialogActions, DialogContent, Alert, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { Carousel } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';
// import { findByProductNameAndSize } from '../service/BillSevice';
import { getDetailOne, postAddDirect } from '../service/DirectSaleSevice';

const ModalDetailProduct = (props) => {
  ModalDetailProduct.propTypes = {
    show: PropTypes.bool.isRequired,
    handleCloseDetai: PropTypes.func.isRequired,
    dataDetail: PropTypes.array.isRequired,
    // DataCart: PropTypes.array.isRequired,
    selectDataCart: PropTypes.func.isRequired,
    getDetailHD: PropTypes.func.isRequired,
    listImages: PropTypes.string.isRequired,
  };
  const { show, handleCloseDetai, dataDetail, getDetailHD, selectDataCart, listImages } = props;

  //   Insert product
  //   Get Name Of Size And Number
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMauSac, setSelectedMauSac] = useState(null);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [isMSSelected, setIsMSSelected] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectSoLuongTon, setSelectSoLuongTon] = useState([]);

  // Set select one MS and Size
  const uniqueSizes = [...new Set(dataDetail.map((size) => size.idSize.tenSize))];
  const uniqueMS = [...new Set(dataDetail.map((ms) => ms.idMs.tenMs))];

  const handleShowSize = (size) => {
    const checkSize = dataDetail.filter((item) => item.idSize.tenSize === size);
    console.log('checkSize: ', checkSize);

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
      setAvailableColors(checkSize.map((item) => item.idMs.tenMs));
    }
  };

  const handleShowMS = (mauSac) => {
    if (isSizeSelected === false) {
      setAlertContent({
        type: 'warning',
        message: 'Vui Lòng Chọn Size',
      });
    } else {
      const checkSoLuong = dataDetail.filter(
        (item) => item.idMs.tenMs === mauSac && item.idSize.tenSize === selectedSize
      );
      console.log('checkSoLuong:', checkSoLuong);

      if (isMSSelected && selectedMauSac === mauSac) {
        setSelectedMauSac(null);
        setIsMSSelected(false);
        setSelectSoLuongTon([]);
      } else {
        setSelectSoLuongTon(checkSoLuong);
        setSelectedMauSac(mauSac);
        setIsMSSelected(true);
      }
    }
  };

  const [quantity, setQuantity] = useState(1); // Initialize with a default quantity
  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
  };

  const [alertContent, setAlertContent] = useState(null);
  //   Get number
  const param = useParams();
  const idHdParam = param.id;

  const handleChoose = async () => {
    // const selectedSp = dataDetail[0].idSp.tenSp;
    // console.log('Selected selectedSp:', selectedSp, selectedSize, selectedMauSac);

    try {
      const getAllProduct = await getDetailOne(idHdParam);

      const detailSPInCaert = getAllProduct.filter((p) => p.idCtsp.idCtsp === selectSoLuongTon[0].idCtsp);

      //   Insert to the cart
      if (selectedSize === null || selectedMauSac === null || selectSoLuongTon.length === 0) {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Chọn Thuộc Tính Của Sản Phẩm',
        });
      } else if (quantity < 1 || Number.isNaN(quantity) || quantity === '') {
        setAlertContent({
          type: 'warning',
          message: 'Vui lòng chọn số lượng lớn hơn 0',
        });
      } else if (quantity > selectSoLuongTon[0].soLuongTon) {
        setAlertContent({
          type: 'warning',
          message: 'Vượt Quá Số Lượng Tồn',
        });
      } else if (detailSPInCaert.length > 0 && quantity + detailSPInCaert[0].soLuong > selectSoLuongTon[0].soLuongTon) {
        setAlertContent({
          type: 'warning',
          message: ' Sản Phẩm Đã Có Trong Giỏ Hàng. Vượt Quá Số Lượng Tồn',
        });
      } else {
        const donGia = selectSoLuongTon[0].giaThucTe * quantity;

        await postAddDirect(selectSoLuongTon[0], quantity, donGia, idHdParam, 0);
        //   Close the modal
        setSelectedSize(null);
        handleClose();
        setQuantity(1);
        //   Load new data on cart
        selectDataCart();
        setAlertContent({
          type: 'success',
          message: 'Thêm sản phẩm thành công',
        });
      }

      // }
    } catch (error) {
      console.log('error: ', error);
    }
  };
  // Close the alert
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  // Select price
  // Select price
  const giaThucTe = dataDetail.map((item) => item.giaThucTe);

  // Find max and min of price
  const minPrice = Math.min(...giaThucTe);
  const maxPrice = Math.max(...giaThucTe);

  // Create the price range string
  const formattedMinPrice = minPrice.toLocaleString('en-US').replace(/,/g, '.');
  const formattedMaxPrice = maxPrice.toLocaleString('en-US').replace(/,/g, '.');
  const priceRange = minPrice === maxPrice ? formattedMinPrice : `${formattedMinPrice} - ${formattedMaxPrice}`;

  function formatCurrency(price) {
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const handleClose = () => {
    getDetailHD();
    setSelectSoLuongTon([]);
    setAvailableColors([]);
    setIsMSSelected(false);
    setIsSizeSelected(false);
    setSelectedMauSac(null);
    setSelectedSize(null);
    setQuantity(1);
    handleCloseDetai(); // Call the original handleClose function
  };

  return (
    <>
      <div>
        <Dialog open={show} onClose={handleClose} maxWidth="xl">
          <DialogTitle>THÔNG TIN SẢN PHẨM</DialogTitle>
          {dataDetail.length > 0 && (
            <DialogContent>
              <Card sx={{ display: 'flex' }}>
                <Carousel interval={null} style={{ maxWidth: 500, margin: '0 auto' }}>
                  <Carousel.Item>
                    <CardMedia
                      component="img"
                      sx={{ maxWidth: 250, height: '100%' }}
                      image={listImages}
                      alt={listImages}
                    />
                  </Carousel.Item>
                </Carousel>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Tên Sản Phẩm: {dataDetail[0].idSp.tenSp}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      <p>Xuất Xứ: {dataDetail[0].idSp.idXx.tenNuoc}</p>
                      <p>Chất Liệu: {dataDetail[0].idSp.idCl.tenCl}</p>
                      <p>
                        Giá: {selectSoLuongTon.length > 0 ? formatCurrency(selectSoLuongTon[0].giaThucTe) : priceRange}
                      </p>
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
                                variant={selectedMauSac === mauSac ? 'contained' : 'outlined'}
                                size="small"
                              >
                                {mauSac}
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
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleChoose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ModalDetailProduct;
