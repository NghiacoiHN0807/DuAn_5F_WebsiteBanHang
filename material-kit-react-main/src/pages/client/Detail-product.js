import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../scss/detail-client.scss';
import { Carousel } from 'react-bootstrap';
import CardMedia from '@mui/material/CardMedia';
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
// utils
// Service
import { listImg } from '../../service/client/Detail-Product';
import { findById } from '../../service/BillSevice';
import { addProductOnCart } from '../../service/client/Detail-Cart';

const DetailProduct = () => {
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

  // Select detail product
  const param = useParams();
  const idHdParam = param.id;

  const getDetail = useCallback(async () => {
    try {
      const getOneSP = await findById(idHdParam);
      const getOneSP1 = await listImg(idHdParam);
      console.log('getOneSP: ', getOneSP);
      console.log('getOneSP1: ', getOneSP1);
      setDetailProduct(getOneSP);
      setDetailImg(getOneSP1);
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

  // Set select one MS and Size
  const uniqueSizes = [...new Set(detailProduct.map((size) => size.idSize.tenSize))];
  const uniqueMS = [...new Set(detailProduct.map((ms) => ms.idMs.tenMs))];

  const handleShowSize = (size) => {
    const checkSize = detailProduct.filter((item) => item.idSize.tenSize === size);
    console.log('checkSize: ', checkSize);
    const checkSoLuong = detailProduct.filter(
      (item) => item.idSize.tenSize === size && item.idMs.tenMs === selectedMauSac
    );
    console.log('checkSoLuong:', checkSoLuong);

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

  // Add product on cart
  // const [product, setProduct] = useState({
  //   idCtsp: detailProduct.idCtsp,
  //   soLuong: quantity,
  // });
  const [alertContent, setAlertContent] = useState(null);

  const handleAddProduct = async () => {
    // Get Author
    const getLocalStore = localStorage.getItem('userFormToken');
    const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
    try {
      await addProductOnCart(authorities.idTaiKhoan, selectSoLuongTon[0], quantity);
      setAlertContent({
        type: 'success',
        message: 'Đã Thêm Sản Phẩm Vào Giỏ Hàng',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  function formatCurrency(price) {
    if (!price) return "0";

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  return (
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
            {/* <div className="info-sp">
                        <div className="danhgia">
                            <p className="danhgia-number underline">49</p>
                            Đánh giá
                        </div>
                        <div className="daban">
                            <p className="daban-number">1,1k</p>
                            Đã bán
                        </div>
                    </div> */}

            <div className="price-product">
              <Typography variant="subtitle1">
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
                &nbsp;
                {detailProduct.length > 0 && formatCurrency(detailProduct[0].giaBan)}
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
                          className=''
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
              <div className="buy">Mua ngay</div>
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
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD &amp; 8GB RAM
                    </a>
                  </h6>
                  <a href="#" className="text-muted" data-abc="true">
                    Laptops &amp; Notebooks
                  </a>
                </div>
                <h3 className="mb-0 font-weight-semibold">$250.99</h3>
                <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart">
                  <i className="fa fa-cart-plus mr-2" />
                  <div className="buy">Mua ngay</div>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD &amp; 8GB RAM
                    </a>
                  </h6>
                  <a href="#" className="text-muted" data-abc="true">
                    Laptops &amp; Notebooks
                  </a>
                </div>
                <h3 className="mb-0 font-weight-semibold">$250.99</h3>
                <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart">
                  <i className="fa fa-cart-plus mr-2" />
                  <div className="buy">Mua ngay</div>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD &amp; 8GB RAM
                    </a>
                  </h6>
                  <a href="#" className="text-muted" data-abc="true">
                    Laptops &amp; Notebooks
                  </a>
                </div>
                <h3 className="mb-0 font-weight-semibold">$250.99</h3>
                <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart">
                  <i className="fa fa-cart-plus mr-2" />
                  <div className="buy">Mua ngay</div>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD &amp; 8GB RAM
                    </a>
                  </h6>
                  <a href="#" className="text-muted" data-abc="true">
                    Laptops &amp; Notebooks
                  </a>
                </div>
                <h3 className="mb-0 font-weight-semibold">$250.99</h3>
                <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart">
                  <i className="fa fa-cart-plus mr-2" />
                  <div className="buy">Mua ngay</div>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD &amp; 8GB RAM
                    </a>
                  </h6>
                  <a href="#" className="text-muted" data-abc="true">
                    Laptops &amp; Notebooks
                  </a>
                </div>
                <h3 className="mb-0 font-weight-semibold">$250.99</h3>
                <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart">
                  <i className="fa fa-cart-plus mr-2" />
                  <div className="buy">Mua ngay</div>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1562074043/234.png"
                    className="card-img img-fluid"
                    width={96}
                    height={350}
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default mb-2" data-abc="true">
                      Toshiba Notebook with 500GB HDD &amp; 8GB RAM
                    </a>
                  </h6>
                  <a href="#" className="text-muted" data-abc="true">
                    Laptops &amp; Notebooks
                  </a>
                </div>
                <h3 className="mb-0 font-weight-semibold">$250.99</h3>
                <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart">
                  <i className="fa fa-cart-plus mr-2" />
                  <div className="buy">Mua ngay</div>
                </button>
              </div>
            </div>
          </div>
        </div>
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
  );
};

export default DetailProduct;
