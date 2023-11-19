// React
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import '../../scss/Cart-shopping.scss';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Service
import { listImg } from '../../service/client/Detail-Product';
import {
  deleteProductOnCart,
  listProductOnCart,
  upadteProductOnCart,
  postAddBillAddBill,
  postAddDirectClient,
} from '../../service/client/Detail-Cart';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function Cart() {
  // Select detail product
  const [images, setImages] = useState({});
  const [productOnCart, setProductOnCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();

  const getDetail = useCallback(async () => {
    try {
      const getLocalStore = localStorage.getItem('userFormToken');
      const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
      const getOneSP = await listProductOnCart(authorities.idTaiKhoan);
      setProductOnCart(getOneSP);
      console.log('getOneSP: ', getOneSP);
      const productId = getOneSP.map((item) => item.idCtsp.idSp.idSp);
      const imgDataArray = await Promise.all(productId.map((productId) => listImg(productId)));

      setImages(imgDataArray);
      console.log('imgData: ', imgDataArray);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  const [quantity, setQuantity] = useState(1);
  const [currentItemId, setCurrentItemId] = useState(null);

  const handleDecreaseQuantity = (item) => {
    console.log('item: ', item);
    if (item.soLuong > 1) {
      setQuantity(item.soLuong - 1);
      setCurrentItemId(item.idCtsp.idCtsp);
    }
  };

  const handleIncreaseQuantity = (item) => {
    console.log('item: ', item);
    setCurrentItemId(item.idCtsp.idCtsp);
    setQuantity(item.soLuong + 1);
  };

  useEffect(() => {
    const updateProductOnCart = async () => {
      if (currentItemId !== null) {
        try {
          await upadteProductOnCart(currentItemId, quantity);
          setCurrentItemId(null);
          getDetail();
        } catch (error) {
          console.error(error);
        }
      }
    };
    updateProductOnCart();
  }, [quantity, currentItemId, getDetail]);

  const [alertContent, setAlertContent] = useState(null);

  const handleDeleteProduct = async (item) => {
    try {
      console.log('item: ', item.idGhct);
      await deleteProductOnCart(item.idGhct);
      setAlertContent({
        type: 'success',
        message: 'Đã Xóa Sản Phẩm',
      });
      getDetail();
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
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const handleCheckboxChange = (item) => {
    const isSelected = selectedItems.includes(item);
    let newSelectedItems;

    if (isSelected) {
      // Item is already selected, remove it
      newSelectedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
    } else {
      // Item is not selected, add it
      newSelectedItems = [...selectedItems, item];
    }
    setSelectedItems(newSelectedItems);
    updateTotalPayment(newSelectedItems);

    // Check if all items are selected
    const allItemsSelected = newSelectedItems.length === productOnCart.length;
    setSelectAll(allItemsSelected);
  };

  const updateTotalPayment = (selectedItems) => {
    const newTotalPayment = productOnCart.reduce((total, item) => {
      if (selectedItems.includes(item)) {
        total += item.donGia;
      }
      return total;
    }, 0);

    setTotalPayment(newTotalPayment);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    let newSelectedItems;

    if (newSelectAll) {
      // If selecting all, set allItemIds as selected items
      newSelectedItems = productOnCart.map((item) => item);
    } else {
      // If deselecting all, clear the selected items
      newSelectedItems = [];
    }

    setSelectedItems(newSelectedItems);
    updateTotalPayment(newSelectedItems);
  };

  const handleBuy = async () => {
    // Create a new bill
    if (totalPayment <= 0) {
      setAlertContent({
        type: 'error',
        message: 'Vui Lòng Chọn Sản Phẩm',
      });
    } else {
      const res = await postAddBillAddBill(2, 0);
      for (let i = 0; i < selectedItems.length; i += 1) {
        (async () => {
          await postAddDirectClient(res.idHd, selectedItems[i]);
        })();
      }
      console.log('selectedItems: ', selectedItems);

      setAlertContent({
        type: 'success',
        message: 'Tạo thành công hóa đơn',
      });
      navigate(`/client/payment/${res.idHd}`);
    }
  };

  return (
    <>
      <div>
        {/* cart + summary */}
        <section className="bg-light my-5">
          <div className="container">
            {/* cart */}
            <div className="m-4">
              <h4 className="card-title mb-4">Giỏ hàng của bạn</h4>
              <div id="container w-100">
                <div className="mpvt">
                  <i className="fa-solid fa-truck-fast truck-icon" />
                  Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
                </div>
                <div className="container-title box-shadow">
                  <div className="container-title-left">
                    <input
                      type="checkbox"
                      className="container-title-checkbox checkboxAll"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <span className="container-title-checkbox-text">Chọn Tất Cả</span>
                  </div>
                  <div className="container-title-right">
                    <span className="container-title-right-title">Đơn Giá</span>
                    <span className="container-title-right-title">Số Lượng</span>
                    <span className="container-title-right-title">Số Tiền</span>
                    <span className="container-title-right-title">Thao Tác</span>
                  </div>
                </div>
                <div className="container-product-carts" id="add-cart-js">
                  <div className="container-product-cart box-shadow">
                    <div className="container-title">
                      <div className="container-title-left">
                        {/* <input type="checkbox" className="container-title-checkbox" />
                              <a href="#" className="hanghiem-link">
                                Phụ kiện hàng hiếm
                                <i className="fa-thin fa-comment-lines" />
                              </a> */}
                      </div>
                    </div>
                    {productOnCart.length > 0 &&
                      productOnCart.map((item, index) => (
                        <>
                          <div key={index} className="container-title margin-product-cart">
                            <input
                              type="checkbox"
                              className="container-product-checkbox container-title-checkbox"
                              checked={selectedItems.includes(item)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            <div className="container-product-info  container-title-left w-45">
                              <a href="#">
                                {images[index] && ( // Checking if images[index] exists before rendering
                                  <Box sx={{ position: 'relative' }}>
                                    <StyledProductImg
                                      sx={{ position: 'relative', width: '140px', height: '180px', marginLeft: '14px' }}
                                      key={index}
                                      alt={images[index][0].url}
                                      src={images[index][0].url}
                                    />
                                  </Box>
                                )}
                              </a>
                              <a href="#" className="container-product-link">
                                {item.idCtsp.idSp.tenSp}
                              </a>
                              <div className="container-product-phanloai">
                                <span className="container-product-phanloai-title">Phân Loại Hàng:</span>
                                <br />
                                <span className="container-product-phanloai-discription">
                                  <Button
                                    style={{
                                      fontSize: '12px',
                                    }}
                                    key={`size-button-${item.idCtsp.idMs.idMs}`}
                                    // onClick={() => handleShowMS(item.idCtsp.idMs)}
                                    // variant={selectedMauSac === item.idCtsp.idMs ? 'contained' : 'outlined'}
                                    size="small"
                                    className="ms-size"
                                  >
                                    {item.idCtsp.idMs.tenMs}
                                  </Button>
                                  ,
                                  <Button
                                    style={{
                                      fontSize: '12px',
                                    }}
                                    key={`size-button-${index}`}
                                    // onClick={() => handleShowMS(item.idCtsp.idSize)}
                                    // variant={selectedMauSac === item.idCtsp.idSize ? 'contained' : 'outlined'}
                                    size="small"
                                    className="ms-size"
                                  >
                                    {item.idCtsp.idSize.tenSize}
                                  </Button>
                                </span>
                              </div>
                            </div>
                            <div className="container-title-right">
                              <span className="container-product-price">{formatCurrency(item.idCtsp.giaThucTe)}</span>
                              <div className="soluong-block">
                                <div className="soluong-number-btn d-flex justify-content-center align-items-center">
                                  <Button className="soluong-btn" onClick={() => handleDecreaseQuantity(item)}>
                                    -
                                  </Button>
                                  <input
                                    type="text"
                                    className="soluong-number"
                                    value={item.soLuong}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)}
                                  />
                                  <Button className="soluong-btn" onClick={() => handleIncreaseQuantity(item)}>
                                    +
                                  </Button>
                                </div>
                              </div>
                              <span className="container-product-sotien mr-45">{formatCurrency(item.donGia)}</span>
                              <Button
                                onClick={() => handleDeleteProduct(item)}
                                className="delete-product-btn"
                                id="delete-product"
                              >
                                Xóa
                              </Button>
                            </div>
                          </div>
                          <hr className="product-divider" />
                        </>
                      ))}
                  </div>
                </div>
                <div className="container-buy-block box-shadow">
                  <div className="container-voucher-block">
                    <div className="container-voucher">
                      <i className="fa-solid fa-clipboard-list voucher-icon" />
                      Shopee Voucher
                    </div>
                    <span className="container-voucher-text">Áp Dụng Mã Giảm Giá Ngay!</span>
                  </div>
                  <div className="container-buy-blockok">
                    <div className="container-buy-block-left">Lưu vào mục Đã thích</div>
                    <div className="container-buy-block-right">
                      <span className="tongthanhtoan">Tổng thanh toán:</span>
                      <span className="tongtien">{formatCurrency(totalPayment)}</span>
                      <Button onClick={() => handleBuy()} className="delete-product-btn width-90 ml-15">
                        Mua hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-top pt-4 mx-4 mb-4">
              <p>
                <i className="fas fa-truck text-muted fa-lg" /> Free Delivery within 1-2 weeks
              </p>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </p>
            </div>
          </div>
        </section>
        {/* cart + summary */}
        <section>
          <div className="container my-5">
            <header className="mb-4">
              <h3>Recommended items</h3>
            </header>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                  <div className="mask px-2" style={{ height: '50px' }}>
                    <div className="d-flex justify-content-between">
                      <h6>
                        <span className="badge bg-danger pt-1 mt-3 ms-2">New</span>
                      </h6>
                      <a href="#">
                        <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                      </a>
                    </div>
                  </div>
                  <a href="#" className>
                    <img
                      alt=""
                      src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                      className="card-img-top rounded-2"
                    />
                  </a>
                  <div className="card-body d-flex flex-column pt-3 border-top">
                    <a href="#" className="nav-link">
                      Gaming Headset with Mic
                    </a>
                    <div className="price-wrap mb-2">
                      <strong className>$18.95</strong>
                      <del className>$24.99</del>
                    </div>
                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                      <a href="#" className="btn btn-outline-primary w-100">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                  <div className="mask px-2" style={{ height: '50px' }}>
                    <a href="#">
                      <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                    </a>
                  </div>
                  <a href="#" className>
                    <img
                      alt=""
                      src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                      className="card-img-top rounded-2"
                    />
                  </a>
                  <div className="card-body d-flex flex-column pt-3 border-top">
                    <a href="#" className="nav-link">
                      Apple Watch Series 1 Sport{' '}
                    </a>
                    <div className="price-wrap mb-2">
                      <strong className>$120.00</strong>
                    </div>
                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                      <a href="#" className="btn btn-outline-primary w-100">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card px-4 border shadow-0">
                  <div className="mask px-2" style={{ height: '50px' }}>
                    <a href="#">
                      <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                    </a>
                  </div>
                  <a href="#" className>
                    <img
                      alt=""
                      src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                      className="card-img-top rounded-2"
                    />
                  </a>
                  <div className="card-body d-flex flex-column pt-3 border-top">
                    <a href="#" className="nav-link">
                      Men's Denim Jeans Shorts
                    </a>
                    <div className="price-wrap mb-2">
                      <strong className>$80.50</strong>
                    </div>
                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                      <a href="#" className="btn btn-outline-primary w-100">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card px-4 border shadow-0">
                  <div className="mask px-2" style={{ height: '50px' }}>
                    <a href="#">
                      <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                    </a>
                  </div>
                  <a href="#" className>
                    <img
                      alt=""
                      src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                      className="card-img-top rounded-2"
                    />
                  </a>
                  <div className="card-body d-flex flex-column pt-3 border-top">
                    <a href="#" className="nav-link">
                      Mens T-shirt Cotton Base Layer Slim fit{' '}
                    </a>
                    <div className="price-wrap mb-2">
                      <strong className>$13.90</strong>
                    </div>
                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                      <a href="#" className="btn btn-outline-primary w-100">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Recommended */}
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
}
