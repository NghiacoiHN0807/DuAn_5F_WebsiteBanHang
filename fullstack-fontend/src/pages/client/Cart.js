// React
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import '../../scss/Cart-shopping.scss';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Service
import { Helmet } from 'react-helmet-async';
import { listImg } from '../../service/client/Detail-Product';
import {
  listProductOnCart,
  upadteProductOnCart,
  postAddBillAddBill,
  postAddDirectClient,
} from '../../service/client/Detail-Cart';
import ModalUpdateProductOnCartClient from '../../forms/client/Modals-Update-Product-Cart-Client';
import { findById } from '../../service/BillSevice';
import ModalDeleteProductClient from '../../forms/client/Modals-Delete-ProductOnCart';
import { deleteOverTime } from '../../service/client/Payment';

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

  // Get KH
  const getLocalStore = localStorage.getItem('userFormToken');
  const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';

  const getDetail = useCallback(async () => {
    try {
      let getOneSP = {};

      if (getLocalStore) {
        getOneSP = await listProductOnCart(authorities.idTaiKhoan);
      } else {
        const currentCart = JSON.parse(localStorage.getItem('cartProduct')) || {}; // Nếu chưa có giá trị, tạo một đối tượng rỗng
        getOneSP = Object.values(currentCart);
      }
      setProductOnCart(getOneSP);
      const productId = getOneSP.map((item) => item.idCtsp.idSp.idSp);
      const imgDataArray = await Promise.all(productId.map((productId) => listImg(productId)));

      setImages(imgDataArray);
    } catch (e) {
      console.error(e);
    }
  }, [authorities.idTaiKhoan, getLocalStore]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  const [quantity, setQuantity] = useState(1);
  const [currentItemId, setCurrentItemId] = useState(null);

  const handleDecreaseQuantity = (item) => {
    if (item.soLuong > 1) {
      setQuantity(item.soLuong - 1);
      setCurrentItemId(item.idCtsp.idCtsp);
    }
  };

  const handleIncreaseQuantity = (item) => {
    if (item.soLuong >= 20) {
      setAlertContent({
        type: 'warning',
        message: 'Nếu bạn Muốn Mua Sỉ. Hãy Liên hệ Với Chúng Tôi',
      });
    } else if (item.soLuong >= item.idCtsp.soLuongTon) {
      setAlertContent({
        type: 'warning',
        message: 'Số Lượng Tồn Không Đủ',
      });
    } else {
      setCurrentItemId(item.idCtsp.idCtsp);
      setQuantity(item.soLuong + 1);
    }
  };

  useEffect(() => {
    const updateProductOnCart = async () => {
      if (currentItemId !== null) {
        try {
          await upadteProductOnCart(currentItemId, productOnCart[0].idGh.idGioHang, quantity);
          setCurrentItemId(null);
          getDetail();
        } catch (error) {
          console.error(error);
        }
      }
    };
    updateProductOnCart();
    setSelectAll(null);
    setTotalPayment(0);
  }, [quantity, currentItemId, getDetail, productOnCart]);

  const [alertContent, setAlertContent] = useState(null);

  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState([]);

  const handleDeleteProduct = async (item) => {
    setOpenDialogDelete(true);
    setItemToDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
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
        type: 'warning',
        message: 'Vui Lòng Chọn Sản Phẩm',
      });
    } else if (totalPayment >= 10000000) {
      setAlertContent({
        type: 'warning',
        message: 'Hóa Đơn Của Bạn Đã Vượt Quá 10TR. Hãy Liên Hệ Với Chúng Tôi Để Mua Sỉ',
      });
    } else {
      const res = await postAddBillAddBill(authorities, totalPayment, 2, 11);
      // // for (let i = 0; i < selectedItems.length; i += 1) {
      // //   (async () => {
      const changtoHDCT = await postAddDirectClient(res.idHd, selectedItems);
      //   })();
      // }
      if (changtoHDCT.status === 400) {
        setAlertContent({
          type: 'warning',
          message: changtoHDCT.data.error,
        });
        await deleteOverTime(res.idHd);
      } else {
        console.log('selectedItems', selectedItems);
        setAlertContent({
          type: 'success',
          message: 'Tạo thành công hóa đơn',
        });
        setTimeout(() => {
          navigate(`/client/payment/${res.idHd}`);
        }, 200);
      }
    }
  };

  // Update classify on the cart
  const [showModalsUpdate, setShowModalsUpdate] = useState(false);
  const [itemUpdateClassify, setItemUpdateClassify] = useState({});
  const [itemUpdate, setItemUpdate] = useState({});

  const handleUpdateClassify = async (item) => {
    setShowModalsUpdate(true);
    try {
      const getOneSP = await findById(item.idCtsp.idSp.idSp);
      setItemUpdateClassify(getOneSP);
      setItemUpdate(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseUpdateClassify = () => {
    setShowModalsUpdate(false);
  };
  return (
    <>
      <Helmet>
        <title> 5FStore || Giỏ Hàng  </title>
      </Helmet>
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
                                    onClick={() => handleUpdateClassify(item)}
                                    key={`size-button-${item.idCtsp.idMs.idMs}`}
                                    // onClick={() => handleShowMS(item.idCtsp.idMs)}
                                    // variant={selectedMauSac === item.idCtsp.idMs ? 'contained' : 'outlined'}
                                    size="small"
                                    className="ms-size"
                                  >
                                    {item.idCtsp.idMs.tenMs},{item.idCtsp.idSize.tenSize}
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
                <div className="container container-buy-block box-shadow">
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
      {itemUpdate && Object.keys(itemUpdate).length > 0 && (
        <ModalUpdateProductOnCartClient
          show={showModalsUpdate}
          handleClose={handleCloseUpdateClassify}
          itemUpdateClassify={itemUpdateClassify}
          selectDataCart={getDetail}
          itemUpdate={itemUpdate}
        />
      )}
      {itemToDelete && openDialogDelete === true && (
        <ModalDeleteProductClient
          getDetail={getDetail}
          show={openDialogDelete}
          handleClose={handleCloseDelete}
          itemToDelete={itemToDelete}
        />
      )}
    </>
  );
}
