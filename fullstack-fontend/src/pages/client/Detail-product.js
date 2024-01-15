import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../scss/detail-client.scss';
import { Carousel, Row } from 'react-bootstrap';
import CardMedia from '@mui/material/CardMedia';

import { Alert, Box, Button, Container, Grid, Snackbar, Typography } from '@mui/material';
// utils
// Service

import { Helmet } from 'react-helmet-async';
import { listImg } from '../../service/client/Detail-Product';
import { findById } from '../../service/BillSevice';
import { addProductOnCart, listProductOnCart } from '../../service/client/Detail-Cart';
import { getRelatedSp } from '../../service/SanPhamService';
import { ProductListAll } from '../../sections/@dashboard/products';
import ShopProductCard from '../../sections/@dashboard/products/ProductCardAll';

const DetailProduct = () => {
  // DetailProduct.propTypes = {
  //   refetch: PropTypes.func.isRequired,
  // };
  const [quantity, setQuantity] = useState(1);
  // const [selectedSizes, setSelectedSizes] = useState([]);
  const [detailProduct, setDetailProduct] = useState([]);
  const [detailImg, setDetailImg] = useState([]);

  //   Get Name Of Size And Number
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMauSac, setSelectedMauSac] = useState(null);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [isMSSelected, setIsMSSelected] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectSoLuongTon, setSelectSoLuongTon] = useState([]);
  const [uniqueSizesHi, setUniqueSizes] = useState([]);
  const [price, setPrice] = useState('');
  // get id of loai sp lien quan
  const [listLSP, setListLSP] = useState([]);

  // Select detail product
  const param = useParams();
  const idHdParam = param.id;

  const getDetail = useCallback(async () => {
    try {
      const getOneSP = await findById(idHdParam);
      const getOneSP1 = await listImg(idHdParam);

      const giaThucTe = Array.isArray(getOneSP) ? [...new Set(getOneSP.map((item) => item.giaThucTe))] : [];

      // Find max and min of price
      const minPrice = Math.min(...giaThucTe);
      const maxPrice = Math.max(...giaThucTe);

      const priceRange =
        minPrice === maxPrice ? formatCurrency(minPrice) : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
      setPrice(priceRange);
      setDetailProduct(getOneSP);
      setDetailImg(getOneSP1);
      const getListLQ = await getRelatedSp(getOneSP[0].idSp.idLsp.idLoaisp, getOneSP[0].idSp.idSp);
      setListLSP(getListLQ);
    } catch (e) {
      console.error(e);
    }
  }, [idHdParam, setDetailProduct]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  useEffect(() => {
    // Extract unique sizes from the API response
    const sizes = detailProduct.map((size) => size.idSize.tenSize);
    setUniqueSizes([...new Set(sizes)]);
  }, [detailProduct]);

  console.log('detailProduct', detailProduct);
  // Set select one MS and Size
  const uniqueSizes = [...new Set(detailProduct.map((size) => size.idSize.tenSize))];
  const uniqueMS = [...new Set(detailProduct.map((ms) => ms.idMs.tenMs))];

  const handleShowSize = (size) => {
    const checkSize = detailProduct.filter((item) => item.idSize.tenSize === size);
    console.log('checkSize: ', checkSize);
    const checkSoLuong = detailProduct.filter(
      (item) => item.idSize.tenSize === size && item.idMs.tenMs === selectedMauSac
    );

    if (isSizeSelected && selectedSize === size) {
      setSelectedSize(null);
      setIsSizeSelected(false);
      setAvailableColors([]);
      setSelectedMauSac(null);
      setIsMSSelected(false);
      setSelectSoLuongTon([]);
    } else {
      setSelectedSize(size);
      setSelectSoLuongTon(checkSoLuong);

      setIsSizeSelected(true);
      setAvailableColors(checkSize.map((item) => item.idMs.tenMs));
    }
  };

  const handleShowMS = (mauSac) => {
    const checkSoLuong = detailProduct.filter(
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
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    // Implement maximum quantity logic if needed
    setQuantity(quantity + 1);
  };

  const [alertContent, setAlertContent] = useState(null);

  const handleAddProduct = async () => {
    const getLocalStore = localStorage.getItem('userFormToken');
    const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';

    const selectedMauSacIsNull = selectedMauSac === null || selectedSize === null;

    let existsProduct = [];
    if (getLocalStore && selectSoLuongTon.length > 0) {
      const getProduct = await listProductOnCart(authorities.idTaiKhoan);

      existsProduct = getProduct.filter((product) => product.idCtsp.idCtsp === selectSoLuongTon[0].idCtsp);
    } else if (!getLocalStore && selectSoLuongTon.length > 0) {
      const currentCart = JSON.parse(localStorage.getItem('cartProduct'));
      if (currentCart && Object.keys(currentCart).length > 0) {
        const cartArray = Object.values(currentCart);
        existsProduct = cartArray.filter((product) => product.idCtsp.idCtsp === selectSoLuongTon[0].idCtsp);
      }
    }

    if (selectedMauSacIsNull || selectSoLuongTon.length === 0) {
      setAlertContent({
        type: 'warning',
        message: 'Thuộc Tính Sản Phẩm Trống',
      });
    } else if (quantity > 20 || (existsProduct.length > 0 && quantity + existsProduct[0].soLuong > 20)) {
      setAlertContent({
        type: 'warning',
        message: 'Nếu bạn Muốn Mua Sỉ. Hãy Liên hệ Với Chúng Tôi',
      });
    } else if (quantity > selectSoLuongTon[0].soLuongTon) {
      setAlertContent({
        type: 'warning',
        message: 'Số Lượng Tồn Không Đủ!!!',
      });
    } else if (existsProduct.length > 0 && quantity + existsProduct[0].soLuong > selectSoLuongTon[0].soLuongTon) {
      setAlertContent({
        type: 'warning',
        message: 'Sản Phẩm Đã Có Trong Giỏ Hàng. Số Lượng Tồn Không Đủ!!!',
      });
    } else if (quantity * selectSoLuongTon[0].giaThucTe > 10000000) {
      setAlertContent({
        type: 'warning',
        message: 'Giá Tiền Đã Vượt Quá 10TR. Hãy Liên Hệ Với Nhân Viên Để Đặt Thêm Hàng!!!',
      });
    } else {
      // const authorities = JSON.parse(getLocalStore).taiKhoan;
      // console.log(authorities);
      const productId = selectSoLuongTon[0].idCtsp;
      if (getLocalStore) {
        try {
          if (!selectedMauSacIsNull) {
            await addProductOnCart(authorities.idTaiKhoan, selectSoLuongTon[0], quantity);
            setAlertContent({
              type: 'success',
              message: 'Đã Thêm Sản Phẩm Vào Giỏ Hàng',
            });
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        const currentCart = JSON.parse(localStorage.getItem('cartProduct')) || {};
        const selectedItem = currentCart[productId];

        if (selectedItem) {
          selectedItem.soLuong += quantity;
          selectedItem.donGia = selectSoLuongTon[0].giaThucTe * selectedItem.soLuong;
        } else {
          currentCart[productId] = {
            idCtsp: selectSoLuongTon[0],
            soLuong: quantity,
            donGia: selectSoLuongTon[0].giaThucTe * quantity,
          };
        }
        localStorage.setItem('cartProduct', JSON.stringify(currentCart));
        setAlertContent({
          type: 'success',
          message: 'Đã Thêm Sản Phẩm Vào Giỏ Hàng',
        });
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  function formatCurrency(price) {
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  // code lon xao
  const itemsPerSlide = 4; // Number of cards per slide

  const numSlides = Math.ceil(listLSP.length / itemsPerSlide);

  const slides = [];
  for (let i = 0; i < numSlides; i += 1) {
    const start = i * itemsPerSlide;
    const end = (i + 1) * itemsPerSlide;

    const slideProducts = listLSP.slice(start, end);
    const slide = (
      <Carousel.Item key={i}>
        <Container>
          <Row>
            <Grid container spacing={3}>
              {slideProducts.map((product, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <ShopProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Row>
        </Container>
      </Carousel.Item>
    );

    slides.push(slide);
  }

  return (
    <>
      <Helmet>
        <title> 5FStore || Thông Tin Sản Phẩm  </title>
      </Helmet>

    <div id="main">
      <div id="header">{/* ... (header content) ... */}</div>

      <div className="slide-block">{/* ... (slide block content) ... */}</div>

      <h3 className="info-product-title">Thông tin sản phẩm</h3>
      <div className="info-product-block">
        <div className="info-product">
          <div className="info-product-left">
            <div className="img-primary">
              <Carousel interval={null} style={{ maxWidth: 500, margin: '0 auto' }}>
                {detailImg.length > 0 &&
                  detailImg.map((item, index) => (
                    <Carousel.Item key={index}>
                      <CardMedia
                        component="img"
                        sx={{ maxWidth: '100%', height: '100%' }}
                        image={item.url}
                        alt={item.url}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </div>
          <div className="info-product-right">
            <Typography
              component="div"
              variant="h5"
              sx={{
                marginLeft: '50px',
              }}
            >
              {detailProduct.length > 0 && detailProduct[0].idSp.tenSp}
            </Typography>
            <div className="price-product">
              <Typography variant="subtitle1">
                {selectSoLuongTon.length > 0 && selectSoLuongTon[0].idSp.trangThai === 1 && (
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      color: 'text.disabled',
                      textDecoration: 'line-through',
                      fontSize: '14px',
                      marginRight: '15px',
                    }}
                  >
                    {detailProduct.length > 0 && detailProduct[0].giaBan && formatCurrency(detailProduct[0].giaBan)}
                  </Typography>
                )}
                &nbsp;
                {selectSoLuongTon.length > 0 ? formatCurrency(selectSoLuongTon[0].giaThucTe) : price}
              </Typography>
            </div>
            <div className="vanchuyen d-block">
              <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
                <div className="vanchuyen-text h-100">Kích Cỡ:</div>
                <div>
                  {uniqueSizes.map((size, sizeIndex) => (
                    <Button
                      style={{
                        marginRight: '4px',
                        marginBottom: '4px',
                        marginLeft: '10px',
                        height: '25px',
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
                <div className="vanchuyen-text h-100">Màu Sắc:</div>
                <div>
                  {availableColors.length > 0
                    ? // Hiển thị danh sách màu sắc từ availableColors
                      availableColors.map((mauSac, msIndex) => (
                        <Button
                          style={{
                            marginRight: '4px',
                            marginBottom: '4px',
                            marginLeft: '10px',
                            height: '25px',
                          }}
                          key={`size-button-${msIndex}`}
                          onClick={() => handleShowMS(mauSac)}
                          variant={selectedMauSac === mauSac ? 'contained' : 'outlined'}
                          size="small"
                          className=""
                        >
                          {mauSac}
                        </Button>
                      ))
                    : // Hiển thị dữ liệu từ dataDetail
                      uniqueMS.map((item, index) => (
                        <Button
                          style={{
                            marginLeft: '10px',
                            height: '25px',
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
            </div>
            <div className="vanchuyen d-flex align-items-center">
              <div className="vanchuyen-text d-contents h-100">Số Lượng</div>
              <div className="soluong-block">
                <div className="soluong-number-btn">
                  <Button className="soluong-btn" onClick={handleDecreaseQuantity}>
                    -
                  </Button>
                  <input
                    type="text"
                    className="soluong-number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)}
                  />
                  <Button className="soluong-btn" onClick={handleIncreaseQuantity}>
                    +
                  </Button>
                  {selectSoLuongTon.length > 0 && <span>Số lượng tồn: {selectSoLuongTon[0].soLuongTon}</span>}
                </div>
              </div>
            </div>

            <div className="vanchuyen pt-30">
              <Button className="add-cart" onClick={handleAddProduct}>
                Thêm Vào Giỏ Hàng
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div id="cription">
        <h2>THÔNG SỐ ÁO:</h2>
        <p>- Size áo: {uniqueSizesHi.join('/')}</p>

        <h2>✅ HƯỚNG DẪN CHỌN SIZE:</h2>
        <p>Size 1 (40-55kg)</p>
        <p>Size 2 (55-75kg)</p>

        <h2>CHÍNH SÁCH - QUYỀN LỢI CỦA KHÁCH:</h2>
        <p>- Nếu nhận hàng sai, bị lỗi sản xuất thì sao ???</p>
        <p>
          {' '}
          = Bạn yên tâm nhé, nếu có bất cứ vấn đề gì bạn vui lòng nhắn tin trực tiếp đến shop sẽ đổi hàng mới cho bạn.
        </p>

        <p>- Nếu khách hàng muốn trả sản phẩm, nhận lại tiền ???</p>
        <p>
          {' '}
          = Shop sẵn sàng đổi trả, hoàn tiền cho khách hàng theo đúng quy định Shopee Mall (Trong thời hạn 7 ngày kể từ
          ngày quý khách nhận hàng, sản phẩm phải chưa sử dụng, chưa giặt, còn nhãn mác nguyên vẹn).
        </p>

        <p>- Trường hợp chấp nhận đổi trả miễn phí : thiếu hàng, sp không đúng mô tả, sp lỗi</p>
        <p>
          - Trường hợp chấp nhận đổi trả khách chịu phí: không thích, không hợp, không vừa (bảng size chuẩn, khách tham
          khảo kĩ cân nặng chiều cao )
        </p>

        <p>
          ⛔️ Lưu ý khi mua hàng trên Shopee: Do quy định Shopee ""KHÔNG ĐỒNG KIỂM, KHÔNG XEM HÀNG KHI NHẬN"" vì vậy quý
          khách cứ yên tâm nhận hàng trước, sau khi nhận nếu hàng có vấn đề gì bạn hãy nhắn tin và shop sẽ giải quyết
          cho quý khách cứ yên tâm ạ !
        </p>

        <p>
          ⛔️ Khi khách yêu gặp bất kì vấn đề gì về sản phẩm, đừng vội đánh giá shop mà hãy NHẮN TIN trước cho shop để
          shop hỗ trợ bạn nhé ( trường hợp đôi lúc shop có lỡ gửi nhầm hàng hoặc sản phẩm bị lỗi ) mong bạn thông cảm,
          hãy nhắn cho shop liền nha 3 shop rất biết ơn nếu bạn làm điều đó ạ 3
        </p>
      </div>
      <div id="cription">
        <Typography variant="h4" gutterBottom sx={{ marginBottom: '20px' }}>
          Sản phẩm liên quan
        </Typography>
        {listLSP.length <= 4 ? (
          <ProductListAll products={listLSP} />
        ) : (
          <Carousel data-bs-theme="dark" interval={5000}>
            {slides}
          </Carousel>
        )}
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
    </div>
    </>
  );
};

export default DetailProduct;
