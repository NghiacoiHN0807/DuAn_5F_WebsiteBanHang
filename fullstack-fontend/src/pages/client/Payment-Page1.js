import {
  Alert,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Snackbar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
// Service
import { detailBill, finByProductOnCart } from '../../service/BillSevice';
import { updateTienShip, viewAllHTTT } from '../../service/OrderManagementTimeLine';
import ModalAddAddress from '../../forms/Modals-Add-Address';
import { paymentOnlineClient, selectDiaChiByTK, updateClientPayment } from '../../service/client/Payment';
import ModalPaymentPage from './Moda-Payment-Page1';
import ModalDeleteCoupon from '../../forms/Modal-Delete-Coupon';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image1 = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));
const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function PaymentPage1() {
  // Payment
  // Show  payment information
  const [isDeliveryChecked, setIsDeliveryChecked] = useState(false);
  const [openCoupon, setOpenCoupon] = useState(false);
  const [openDelCoupon, setOpenDelCoupon] = useState(false);
  const [information, setInformation] = useState();

  const handleDeliveryChange = (event) => {
    setIsDeliveryChecked(event.target.checked);
  };

  // Select Product On Cart

  const param = useParams();
  const idHdParam = param.id;

  const [DataCart, setDataCart] = useState([]);
  const [listHTTT, setListHTTT] = useState([]);

  const selectDataCart = useCallback(async () => {
    try {
      const res = await finByProductOnCart(idHdParam);
      const res1 = await viewAllHTTT(idHdParam);
      console.log('res', res);

      if (res || res1) {
        setDataCart(res);
        setListHTTT(res1);
        setInformation(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, [idHdParam]);
  useEffect(() => {
    selectDataCart();
  }, [selectDataCart]);

  const handleClose = () => {
    setOpenCoupon(false);
    setOpenDelCoupon(false);
    selectDataCart();
  };

  // Detail Hd
  const [listHD, setlistHD] = useState([]);

  const getDetailHD = useCallback(async () => {
    try {
      const getData = await detailBill(idHdParam);
      setlistHD(getData);
    } catch (error) {
      console.error('Error: ', error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getDetailHD();
  }, [getDetailHD]);

  // Select address
  const [listData, setListData] = useState([]);
  const [tienShip, setTienShip] = useState(0);
  const [diaChi, setDiaChi] = useState('');
  const [tenKH, setTenKH] = useState('');
  const [sdtKH, setSDTKH] = useState('');

  const getAllData = useCallback(async () => {
    try {
      // Get KH
      const getLocalStore = localStorage.getItem('userFormToken');
      const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
      const getData = await selectDiaChiByTK(authorities.maTaiKhoan);

      if (getData) {
        setListData(getData);
        setTenKH(getData[0].tenNguoiNhan);
        setSDTKH(getData[0].sdt);
        setTienShip(getData[0].phiShip);
        setDiaChi(
          `${getData[0].diaChiCuThe}, ${getData[0].phuongXa}, ${getData[0].quanHuyen}, ${getData[0].tinhThanh}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  // Show thanhTien
  // const [thanhTien, setThanhTien] = useState();

  useEffect(() => {
    const calculateTotalPrice = async () => {
      const updated = await updateTienShip(idHdParam, tienShip);
      if (updated) {
        getDetailHD();
      }
    };

    calculateTotalPrice();
  }, [getDetailHD, idHdParam, tienShip]);

  // Select modal address
  const [showModalsAddress, setShowModalKH] = useState(false);
  const handleAddAddress = () => {
    setShowModalKH(true);
  };
  const handleCloseAddress = () => {
    getDetailHD();
    setShowModalKH(false);
  };

  // Handle successfully
  const navigate = useNavigate();
  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const handleDatHang = async () => {
    if (isDeliveryChecked === false) {
      console.log('Thanh Toán Khi Nhận Hàng');
      await updateClientPayment(idHdParam, tenKH, sdtKH, diaChi);
      navigate(`/client/client-timeline/${idHdParam}`);
    }
    if (isDeliveryChecked === true) {
      if (listHTTT.length > 0) {
        await updateClientPayment(idHdParam, tenKH, sdtKH, diaChi);

        navigate(`/client/client-timeline/${idHdParam}`);
      } else {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Thanh Toán Trước. Cảm Ơn!!!',
        });
        console.log('Thanh Toán Online');
      }
      // const paymentOn = await paymentOnline(thanhTien, listHD.idHd);
      // window.location.href = paymentOn;
    }
  };

  // handle payment online
  const handlePaymentOnline = async () => {
    const paymentOn = await paymentOnlineClient(listHD.thanhTien, idHdParam);
    console.log('Check paymentOn: ', paymentOn);
    window.location.href = paymentOn;

    console.log('Đi tới thanh toán');
  };

  const handleCoupon = () => {
    setOpenCoupon(true);
  };

  const handleDelCoupon = () => {
    setOpenDelCoupon(true);
  };

  // Format thanhTien
  function formatCurrency(price) {
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  console.log("listHD ", listHD)
  return (
    <>
      <Container sx={{ marginBottom: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12} sx={{ marginTop: 5, backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              Thông Tin Nhận Hàng{' '}
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ marginTop: 3 }}>
              <Typography sx={{ fontSize: 16, display: 'inline' }} variant="button" gutterBottom>
                {listHD.idKH && tenKH}
              </Typography>{' '}
              <Typography sx={{ fontSize: 16, display: 'inline', paddingLeft: 2 }} variant="button" gutterBottom>
                {listHD.idKH && sdtKH}
              </Typography>{' '}
              <Typography sx={{ fontSize: 16, display: 'inline', paddingLeft: 4 }} variant="body2" gutterBottom>
                {diaChi && diaChi}
              </Typography>{' '}
              <Button
                sx={{ fontSize: 12, display: 'inline', paddingLeft: 2 }}
                onClick={() => handleAddAddress()}
                color="secondary"
              >
                Thay Đổi Địa Chỉ
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={12} sx={{ marginTop: 3, backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ marginTop: 3, mb: 3 }}>
              Hi, Bạn Có Muốn Thanh Toán Hóa Đơn Của Bạn?
            </Typography>
            <Button variant="outlined" disabled>
              Giao Hàng
            </Button>
            <TableContainer sx={{ marginTop: 2, marginBottom: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Mã Sản Phẩm</TableCell>
                    <TableCell align="right">Sản Phẩm</TableCell>
                    <TableCell align="right">Thuộc tính</TableCell>
                    <TableCell align="right">Giá</TableCell>
                    <TableCell align="right">Số Lượng</TableCell>
                    <TableCell align="right">Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DataCart && DataCart.length > 0 ? (
                    DataCart.map((item, index) => {
                      const imagesArray = item[2].split(',');
                      const firstImage = imagesArray[0];
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Image rounded style={{ width: '150px', height: 'auto' }} src={firstImage} />
                          </TableCell>
                          <TableCell>{item[4]}</TableCell>
                          <TableCell align="right">{item[5]}</TableCell>
                          <TableCell align="right">
                            Size: {item[6]}
                            <br />
                            Màu: {item[11]}
                          </TableCell>
                          <TableCell align="right">{formatCurrency(item[7])}</TableCell>
                          <TableCell align="right">{item[8]}</TableCell>
                          <TableCell align="right">{formatCurrency(item[9])}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell align="right" colSpan={8}>
                        KHÔNG CÓ DỮ LIỆU
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell rowSpan={3} />
                  </TableRow>
                </TableBody>
              </Table>{' '}
            </TableContainer>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={12}
            sx={{ marginTop: 5, backgroundColor: 'white' }}
            className="d-flex justify-content-between"
          >
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6" sx={{ marginTop: 1 }} gutterBottom>
                Phương Thức Thanh Toán{' '}
                <FormControlLabel control={<Switch />} onChange={handleDeliveryChange} label="Thanh Toán Bằng Thẻ" />
              </Typography>
              {isDeliveryChecked === true ? (
                <>
                  <ImageButton
                    onClick={() => handlePaymentOnline()}
                    sx={{ marginBottom: 3 }}
                    focusRipple
                    style={{
                      width: '50%',
                    }}
                  >
                    <ImageSrc
                      style={{
                        backgroundImage: `url('https://assets.topdev.vn/images/2020/08/25/VNPAY-Logo-yGapP.png')`,
                        backgroundSize: '50%',
                        width: 380,
                      }}
                    />

                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image1>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                          position: 'relative',
                          p: 4,
                          pt: 2,
                          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                      >
                        VNPAY
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </Image1>
                  </ImageButton>
                </>
              ) : (
                <>
                  <Typography variant="button" sx={{ marginBottom: 3, marginTop: 2 }} display="block" gutterBottom>
                    Thanh Toán Khi Nhập Hàng. Bên Vận Chuyển Sẽ Giao Hàng Tới Cho Bạn{' '}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="button" display="block" gutterBottom>
                  Tổng Tiền{' '}
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                  {listHD && formatCurrency(listHD.tongTien)}{' '}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="button" display="block" gutterBottom>
                  Tiền Ship{' '}
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                  {listHD && formatCurrency(listHD.tienShip)}{' '}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="button" display="block" gutterBottom>
                  Số Tiền Giảm{' '}
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                  {listHD && formatCurrency(listHD.soTienGiamGia)}{' '}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="button" display="block" gutterBottom>
                  Thành Tiền{' '}
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                  {listHD && formatCurrency(listHD.thanhTien)}{' '}
                </Typography>
              </Stack>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button onClick={() => handleDatHang()} variant="contained" color="success">
                  Đặt Hàng
                </Button>
                {listHD.maGiamGia ? (
                  <Button onClick={() => handleDelCoupon()}>Xóa mã giảm giá.</Button>
                ) : (
                  <Button onClick={() => handleCoupon()}>Thêm mã giảm giá tại đây.</Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {listData && (
        <>
          <ModalAddAddress
            open={showModalsAddress}
            listData={listData}
            handleClose={handleCloseAddress}
            setTenKH={setTenKH}
            setSDTKH={setSDTKH}
            setDiaChi={setDiaChi}
            setTienShip={setTienShip}
            getDetailHD={getDetailHD}
          />
        </>
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
      <ModalPaymentPage
        open={openCoupon}
        handleClose={handleClose}
        information={information}
        getDetailHD={getDetailHD}
      />
      <ModalDeleteCoupon
        open={openDelCoupon}
        handleClose={handleClose}
        listHD={listHD}
        getDetailHD={getDetailHD}
      />
    </>
  );
}
