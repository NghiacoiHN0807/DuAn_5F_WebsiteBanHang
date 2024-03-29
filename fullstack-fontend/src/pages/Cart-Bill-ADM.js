import '../scss/Car-Bill-ADM.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { pink } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { Image } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GetAppIcon from '@mui/icons-material/GetApp';
import JsPdf from 'jspdf';

import ModalDeleteDirectSale from '../forms/Modal-Delete-DirectSale';
import ModalCreateBillOnline from '../forms/Modal-Create-Online';
import { updateTienShip } from '../service/OrderManagementTimeLine';
import ModalAddKhachHang from '../forms/Modals-AddKhachHang';
import { detailBill, finByProductOnCart, findById, postAddBill, selectAllInvoiceWaiting } from '../service/BillSevice';
import ModalAddProduct from '../forms/Modals-AddProduct';
import ModalUpdateProductOnCart from '../forms/Modals-Update-Product-Cart';
import ModalDeleteProductOnCart from '../forms/Modal-Delete-Product';
import ModalDeleteAllProductOnCart from '../forms/Modal-Delete-All-Product';
import ModalPaymentComfirm from '../forms/Modal-Payment-Confirm';
import Iconify from '../components/iconify';
import ModalAddAddress from '../forms/Modals-Add-Address';
import { selectDiaChiByTK } from '../service/client/Payment';

// Dislay invoice waiting
const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const CartBillADM = () => {
  // Get IdHd on http
  const param = useParams();
  const idHdParam = param.id;

  // Detail Hd
  const [listHD, setlistHD] = useState([]);

  const getDetailHD = useCallback(async () => {
    try {
      const getData = await detailBill(idHdParam);
      if (getData.trangThai === 8) {
        setlistHD(getData);
      }
      // console.log('getData: ', getData);
      // setlistHD(getData);
    } catch (error) {
      console.error('Error: ', error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getDetailHD();
  }, [getDetailHD]);
  // Select invoice waiting.
  const [tabs, setTabs] = useState([]);
  const [value, setValue] = useState(0);

  const getListData = useCallback(async () => {
    try {
      const res = await selectAllInvoiceWaiting();
      setTabs(res);
      const idHdParamNumber = parseInt(idHdParam, 10);
      const checkIndexTab = res.findIndex((item) => item.idHd === idHdParamNumber);
      console.log('checkIndexTab: ', checkIndexTab);

      setValue(checkIndexTab);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  }, [idHdParam]);

  useEffect(() => {
    getListData();
  }, [getListData]);

  const handleChange = (event, newValue) => {
    console.log('newValue', newValue);
    setValue(newValue);
  };

  const handleChange1 = (tabLabel) => {
    navigate(`/dashboard/sales/card-bill/${tabLabel.idHd}`);
  };

  // Create a new Detail Direct
  const [alertContent, setAlertContent] = useState(null);

  const handleAddTab = async () => {
    if (tabs.length >= 5) {
      setAlertContent({
        type: 'warning',
        message: 'Đã Tồn Tại 5 Hóa Đơn Chờ. Vui Lòng Thanh Toán!!!',
      });
    } else {
      const res = await postAddBill(1, 8);
      getListData();
      setAlertContent({
        type: 'success',
        message: 'Tạo thành công hóa đơn',
      });

      // Update the tabs state to include the new tab
      const nextTabNumber = tabs.length + 1;
      const newTab = { maHd: `Tab ${nextTabNumber}` };
      console.log('Check newTab: ', newTab);
      const newTabs = [...tabs, newTab];
      console.log('Check newTabs: ', newTabs);
      setTabs(newTabs);

      // Set the value state to the index of the newly added tab
      setValue(newTabs.length - 1);

      const getIdHttp = res.idHd;
      navigate(`/dashboard/sales/card-bill/${getIdHttp}`);
    }
  };

  const [open, setOpen] = useState(false);
  const [information, setInformation] = useState();
  const handleCloseTab = (index) => {
    setOpen(true);
    setInformation(index);
  };
  const handleCloseDeleteInvoice = () => {
    setOpen(false);
    getListData();
    setValue(0);
    const newTab = { maHd: `Tab ${1}` };
    const newTabs = [...tabs, newTab];
    setTabs(newTabs);
    navigate(`/dashboard/sales/card-bill/${newTabs[0].idHd}`);
  };

  // Select Product On Cart
  const [DataCart, setDataCart] = useState([]);
  // const [numberPages, setNumberPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);

  const selectDataCart = useCallback(async () => {
    try {
      const res = await finByProductOnCart(idHdParam);
      if (res) {
        setDataCart(res);
        console.log('Sản Phẩm Trong Giỏ Hàng: ', res);
      }
    } catch (error) {
      console.error(error);
    }
  }, [idHdParam]);
  useEffect(() => {
    selectDataCart();
  }, [selectDataCart]);

  // const handlePageClick = (page) => {
  //   selectDataCart(page);
  //   setCurrentPage(page);
  // };
  // Add Product
  const [showModalsAdd, setShowModalAdd] = useState(false);
  const handleAddProduct = () => {
    setShowModalAdd(true);
  };
  const handleClose = () => {
    setShowModalAdd(false);
  };

  // Delete product on cart
  const [showModalsDelete, setShowModalDelete] = useState(false);
  const [itemDelete, setIntemDelete] = useState();
  const handleDelete = (item) => {
    console.log('Check item', item);
    setShowModalDelete(true);
    setIntemDelete(item);
  };
  const handleCloseModalDelelte = () => {
    setShowModalDelete(false);
  };
  // Delete all products
  const [showModalsDeleteAll, setShowModalDeleteAll] = useState(false);
  const handDeleteAll = () => {
    setShowModalDeleteAll(true);
  };
  const handCloseDeleteAll = () => {
    setShowModalDeleteAll(false);
  };
  // Update classify on the cart
  const [showModalsUpdate, setShowModalsUpdate] = useState(false);
  const [itemUpdateClassify, setItemUpdateClassify] = useState({});
  const [itemUpdate, setItemUpdate] = useState({});

  const handleUpdateClassify = async (item) => {
    setShowModalsUpdate(true);
    try {
      const getOneSP = await findById(item[3]);
      setItemUpdateClassify(getOneSP);
      setItemUpdate(item);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseUpdateClassify = () => {
    setShowModalsUpdate(false);
  };
  // Show  payment information
  const [isDeliveryChecked, setIsDeliveryChecked] = useState(false);

  const handleDeliveryChange = (event) => {
    getTienShip(0);
    // if (isDeliveryChecked === true) {
    setSelectedProvince('');
    setSelectedWard('');
    setSelectedDistrict('');
    setResult('');
    setResult1('');
    getTenKHShip('');
    getEmailKHShip('');
    getSdtKHShip('');
    // }

    setIsDeliveryChecked(event.target.checked);
  };

  const resetInformation = () => {
    getTienShip(0);

    setIsDeliveryChecked(false);
    setSelectedProvince('');
    setSelectedWard('');
    setSelectedDistrict('');
    setResult('');
    setResult1('');
    getTenKHShip('');
    getEmailKHShip('');
    getSdtKHShip('');
  };

  // Fetch list of provinces on component mount
  const [diachiCuThe, setDiachiCuThe] = useState('');
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Get API Provinces

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');

  const [result, setResult] = useState('');
  const [result1, setResult1] = useState('');

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        headers: {
          token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
        },
      });
      console.log('response: ', response.data.data);
      setProvinces(response.data.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };
  useEffect(() => {
    fetchProvinces();
  }, []);

  const callApiDistrict = useCallback(async () => {
    try {
      const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
        params: { province_id: selectedProvince },
        headers: {
          token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
        },
      });
      console.log('Quận/Huyện: ', response.data);
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedProvince) {
      console.log('selectedProvince: ', selectedProvince);
      callApiDistrict();
    }
    setResult('');
  }, [selectedProvince, callApiDistrict]);

  const callApiWard = useCallback(async () => {
    try {
      const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
        params: { district_id: selectedDistrict },
        headers: {
          token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
        },
      });
      setWards(response.data.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  }, [selectedDistrict]);

  // API gets service pack information
  const [tienShip, getTienShip] = useState(0);

  const getSevice = useCallback(async () => {
    try {
      const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
        params: {
          service_type_id: 2,
          insurance_value: 500000,
          coupon: null,
          from_district_id: 1542,
          to_district_id: selectedDistrict,
          height: 15,
          length: 15,
          weight: 1000,
          width: 15,
        },
        headers: {
          token: '5937fcfb-839a-11ee-96dc-de6f804954c9',
          shop_id: 4699724,
        },
      });
      if (provinces == null) {
        getTienShip(0);
      } else {
        const totalShip = response.data?.data?.total || 0;
        getTienShip(totalShip);
      }
    } catch (error) {
      console.error('Error get service:', error);
    }
  }, [provinces, selectedDistrict]);

  useEffect(() => {
    if (selectedDistrict) {
      console.log('selectedProvince: ', selectedDistrict);
      callApiWard();
      getSevice();
    }
  }, [getSevice, selectedDistrict, callApiWard]);

  useEffect(() => {
    if (selectedDistrict && selectedProvince && selectedWard) {
      const selectedProvinceName =
        provinces.find((province) => province.ProvinceID === selectedProvince)?.ProvinceName || '';

      const selectedDistrictName =
        districts.find((district) => district.DistrictID === selectedDistrict)?.DistrictName || '';

      const selectedWardName = wards.find((ward) => ward.WardCode === selectedWard)?.WardName || '';

      setResult(`${selectedProvinceName}, ${selectedDistrictName}, ${selectedWardName}, ${diachiCuThe}`);
    }
  }, [selectedDistrict, selectedProvince, selectedWard, districts, provinces, wards, diachiCuThe]);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      if (listHD.trangThai === 8) {
        const updated = await updateTienShip(idHdParam, tienShip);
        if (updated) {
          getDetailHD();
        }
      }
    };

    calculateTotalPrice();
  }, [getDetailHD, idHdParam, listHD.trangThai, tienShip]);

  // Modal add KH
  const [showModalsKH, setShowModalKH] = useState(false);
  const handleAddKH = () => {
    setShowModalKH(true);
  };
  const handleCloseAddKH = () => {
    setShowModalKH(false);
  };

  // Handle Save
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tenKhTT, getTenKHTT] = useState('');
  const [sdtKHTT, getSdtKHTT] = useState('');
  const [tenKhShip, getTenKHShip] = useState('');
  const [sdtKHShip, getSdtKHShip] = useState('');
  const [emailKHShip, getEmailKHShip] = useState('');

  const [openPayment, setOpenPayment] = useState(false);
  const [openCreateOnline, setCreateOnline] = useState(false);

  // Check Validated numberphone
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex =
      /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    return phoneRegex.test(phoneNumber);
  }
  const containsNumber = (text) => /\d/.test(text);
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleClick = async () => {
    console.log(emailKHShip);
    if (isDeliveryChecked === false && containsNumber(tenKhTT) && tenKhTT.trim()) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Đúng Tên Khách Hàng Để Thanh Toán Tại Quầy ',
      });
    } else if (isDeliveryChecked === false && !isValidPhoneNumber(sdtKHTT) && sdtKHTT.trim()) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Đúng SDT Khách Hàng Để Thanh Toán Tại Quầy ',
      });
    } else if (isDeliveryChecked === true && !isValidEmail(emailKHShip)) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Đúng Email Để Đặt Hàng Online',
      });
    } else if ((isDeliveryChecked === true && !tenKhShip.trim()) || (isDeliveryChecked === true && !sdtKHShip.trim())) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Thông Tin Người Nhận Hàng!!!',
      });
    } else if (
      (isDeliveryChecked === true && !tenKhShip.trim()) ||
      (isDeliveryChecked === true && containsNumber(tenKhShip))
    ) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Đúng Tên Khách Hàng Để Giao Hàng!!!',
      });
    } else if (isDeliveryChecked === true && !isValidPhoneNumber(sdtKHShip)) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Đúng SDT Khách Hàng Để Giao Hàng!!!',
      });
    } else if (isDeliveryChecked === true && !result1.trim() && !result.trim()) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Địa Chỉ Nhận Hàng!!!',
      });
    } else if (
      isDeliveryChecked === true &&
      !result1.trim() &&
      (selectedWard === '' || selectedDistrict === '' || selectedProvince === '')
    ) {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Nhập Địa Chỉ Nhận Hàng!!!',
      });
    } else if (isDeliveryChecked === false) {
      setOpenPayment(true);
    } else {
      setCreateOnline(true);
    }
  };
  const handlePaymentClose = () => {
    setOpenPayment(false);
  };
  const handleCloseCreateOnline = () => {
    setCreateOnline(false);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
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
  // Select modal address
  const [showModalsAddress, setShowModalAddress] = useState(false);
  const [listData, setListData] = useState([]);

  const handleAddAddress = async () => {
    if (listHD.idKH.maTaiKhoan) {
      const getData = await selectDiaChiByTK(listHD.idKH.maTaiKhoan);
      console.log(getData);
      setListData(getData);
      setShowModalAddress(true);
    } else {
      setAlertContent({
        type: 'warning',
        message: 'Hãy Chọn Tài Khoản Khách Hàng!!!',
      });
    }
  };
  const handleCloseAddress = () => {
    getDetailHD();
    setShowModalAddress(false);
  };

  const generatePDF = async () => {
    const pdfDoc = new JsPdf();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 595;
    canvas.height = 842;

    ctx.font = '16px Arial';
    const lineHeight = 25;

    const x = 20;
    const y = 50;

    ctx.textBaseline = 'middle';

    ctx.fillText(`Mã Hóa Đơn: ${listHD.maHd}`, x, y);
    ctx.fillText(`Tên Khách Hàng: ${listHD.tenKh}`, x, y + lineHeight);
    ctx.fillText(`SDT: ${listHD.sdtKh}`, x, y + 2 * lineHeight);

    const tableColumn = ['STT', 'Tên SP', 'Thuộc Tính', 'Giá', 'Số Lượng', 'Thành Tiền'];
    const dataCartRows = DataCart.map((item, index) => [
      index + 1,
      item[5],
      item[6] + item[11],
      item[7],
      item[8],
      item[9],
    ]);

    const cellWidth = 30;
    const cellHeight = 10;

    const tableWidth = cellWidth * tableColumn.length;
    const tableHeight = (dataCartRows.length + 1) * cellHeight;

    // Căn giữa bảng trên canvas
    const tableStartX = (canvas.width - tableWidth) / 2;
    const tableStartY = (canvas.height - tableHeight) / 2;

    ctx.lineWidth = 1;
    ctx.strokeRect(tableStartX, tableStartY, tableWidth, tableHeight);

    ctx.font = 'bold 16px Arial';

    ctx.font = '16px Arial';

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#000';

    const imgData = canvas.toDataURL('image/png');

    pdfDoc.addImage(imgData, 'PNG', 10, 10);

    pdfDoc.save('invoice.pdf');
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {listHD.trangThai === 8 ? (
          <Box sx={{ bgcolor: '#fff' }}>
            <Box sx={{ p: 3 }}>
              <Button variant="contained" onClick={handleAddTab}>
                Thêm Hóa Đơn Chờ
              </Button>
              <Button
                aria-label="download"
                onClick={generatePDF}
                variant="contained"
                startIcon={<GetAppIcon />}
                color="success"
              >
                Xuất Hóa Đơn
              </Button>
            </Box>
            <AntTabs value={value} onChange={handleChange} aria-label="ant example">
              {tabs.map((tabLabel, index) => (
                <AntTab
                  key={index}
                  onClick={() => handleChange1(tabLabel)}
                  label={
                    <span>
                      {tabLabel.maHd}
                      <CloseIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseTab(tabLabel);
                        }}
                      />
                    </span>
                  }
                />
              ))}
            </AntTabs>

            <Box sx={{ p: 3 }}>
              {/* <p>Content: {tabContent[value]}</p> */}
              <div>
                <p>Bill Code: {listHD.maHd}</p>
                <div className="class-add-product">
                  <Button onClick={() => handleAddProduct()} variant="outlined">
                    <FontAwesomeIcon icon={faCartPlus} size="lg" />
                    Thêm Sản Phẩm
                  </Button>{' '}
                </div>
              </div>

              <div className="row cart-information">
                <div className="row">
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h5" gutterBottom>
                      Giỏ Hàng{' '}
                    </Typography>
                  </Stack>
                </div>
                <TableContainer sx={{ marginTop: 2, marginBottom: 2 }} component={Paper}>
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
                        <TableCell align="right">Thao Tác</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {DataCart && DataCart.length > 0 ? (
                        DataCart.map((item, index) => {
                          const imagesArray = item[2].split(','); // Tách chuỗi thành mảng
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
                                <Button onClick={() => handleUpdateClassify(item)} size="small" variant="outlined">
                                  Size: {item[6]}
                                  <br />
                                  Màu: {item[11]}
                                </Button>
                              </TableCell>
                              <TableCell align="right">{formatCurrency(item[7])}</TableCell>
                              <TableCell align="right">{item[8]}</TableCell>
                              <TableCell align="right">{formatCurrency(item[9])}</TableCell>
                              <TableCell align="right">
                                <IconButton aria-label="delete" size="large" onClick={() => handleDelete(item)}>
                                  <DeleteSweepOutlinedIcon sx={{ color: pink[500] }} />
                                </IconButton>
                              </TableCell>
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
                    </TableBody>
                  </Table>
                </TableContainer>

                <div className="col-2">
                  <Button
                    sx={{ marginBottom: 3 }}
                    onClick={handDeleteAll}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="row customer-information">
                <div className="row">
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h5" gutterBottom>
                      Thông Tin Khách Hàng{' '}
                    </Typography>
                    <Button
                      onClick={() => handleAddKH()}
                      variant="outlined"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                      Khách Hàng{' '}
                    </Button>
                  </Stack>
                </div>

                <div className="text-information">
                  {listHD.idKH ? (
                    <>
                      <Typography variant="subtitle1" gutterBottom>
                        Mã Tài Khoản: {listHD.idKH.maTaiKhoan}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Tên Khách Hàng: {`${listHD.idKH.ho} ${listHD.idKH.ten}`}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Số Điện Thoại: {listHD.idKH.sdt}
                      </Typography>
                      {/* <TextField
                      id="standard-multiline-flexible"
                      label="Mã Tài Khoản "
                      multiline
                      maxRows={4}
                      variant="outlined"
                      size="small"
                      defaultValue={listHD.idKH.maTaiKhoan}
                      // value={listHD.idKH.maTaiKhoan}
                      fullWidth
                      sx={{ marginTop: 2 }}
                    />
                    <TextField
                      id="standard-multiline-flexible"
                      label="Tên Khách Hàng"
                      multiline
                      maxRows={4}
                      variant="outlined"
                      size="small"
                      defaultValue={`${listHD.idKH.ho} ${listHD.idKH.ten}`}
                      // value={selectedCustomerName}
                      fullWidth
                      sx={{ marginTop: 2 }}
                    />
                    <h1>{listHD.idKH.maTaiKhoan}</h1>
                    <TextField
                      id="standard-multiline-flexible"
                      label="Số Điện Thoại"
                      multiline
                      maxRows={4}
                      variant="outlined"
                      size="small"
                      defaultValue={listHD.idKH.sdt}
                      fullWidth
                      // value={selectedCustomerEmail}
                      sx={{ marginTop: 2 }}
                    /> */}
                    </>
                  ) : (
                    <Chip label="Khách Lẻ" color="primary" />
                  )}
                </div>
              </div>
              <div className="row information-payment">
                <div className="row header-information">
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h5" gutterBottom>
                      Thông Tin Thanh Toán{' '}
                    </Typography>
                    {listHD.idKH && isDeliveryChecked && (
                      <Button
                        onClick={() => handleAddAddress()}
                        variant="outlined"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                      >
                        Địa Chỉ Khách hàng{' '}
                      </Button>
                    )}
                  </Stack>
                  {/* <div className="col-6">

                  <h6>Thông Tin Thanh Toán</h6>
                </div>
                <div className="col-6 button-list">
                  <Button size="small" variant="outlined">
                    Primary
                  </Button>
                </div> */}
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={7}>
                    {isDeliveryChecked && !result1 ? (
                      <div className="text-information">
                        <div>
                          <h5>
                            {' '}
                            <AccountBoxIcon />
                            Thông Tin Người Nhận
                          </h5>
                        </div>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Tên Người Nhận"
                          multiline
                          maxRows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          onChange={(e) => getTenKHShip(e.target.value)}
                          sx={{ marginTop: 2 }}
                        />
                        <TextField
                          id="standard-multiline-flexible"
                          label="Số Điện Thoại"
                          multiline
                          maxRows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onChange={(e) => getSdtKHShip(e.target.value)}
                        />
                        <TextField
                          id="standard-multiline-flexible"
                          label="Email"
                          multiline
                          maxRows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onChange={(e) => getEmailKHShip(e.target.value)}
                        />
                        <div className="address">
                          <FormControl size="small" sx={{ m: 0, minWidth: 165, marginRight: 3, marginTop: 2 }}>
                            <InputLabel id="province-label">Tỉnh/Thành Phố</InputLabel>
                            <Select
                              labelId="province-label"
                              id="province-select"
                              value={selectedProvince}
                              onChange={(e) => {
                                setSelectedProvince(e.target.value);
                                setSelectedWard('');
                                setSelectedDistrict('');
                                setResult('');
                              }}
                              label="Tỉnh/Thành Phố"
                            >
                              <MenuItem value="">
                                <em>Chọn Tỉnh/Thành Phố</em>
                              </MenuItem>
                              {provinces.map((province) => (
                                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                  {province.ProvinceName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl size="small" sx={{ m: 0, minWidth: 165, marginRight: 3, marginTop: 2 }}>
                            <InputLabel id="district-label">Quận/Huyện</InputLabel>
                            <Select
                              labelId="district-label"
                              id="district-select"
                              value={selectedDistrict}
                              onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                setSelectedWard('');
                                setResult('');
                              }}
                              label="Quận/Huyện"
                            >
                              <MenuItem value="">
                                <em>Chọn Quận/Huyện</em>
                              </MenuItem>
                              {districts.map((district) => (
                                <MenuItem key={district.DistrictID} value={district.DistrictID}>
                                  {district.DistrictName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl size="small" sx={{ m: 0, minWidth: 170, marginTop: 2 }}>
                            <InputLabel id="ward-label">Phường/Xã</InputLabel>
                            <Select
                              labelId="ward-label"
                              id="ward-select"
                              value={selectedWard}
                              onChange={(e) => {
                                setSelectedWard(e.target.value);
                                setResult('');
                              }}
                              label="Phường/Xã"
                            >
                              <MenuItem value="">
                                <em>Chọn Phường/Xã</em>
                              </MenuItem>
                              {wards.map((ward) => (
                                <MenuItem key={ward.WardCode} value={ward.WardCode}>
                                  {ward.WardName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <div id="result">{result}</div>
                        </div>
                        <div>
                          <TextField
                            id="standard-multiline-flexible"
                            label="Địa Chỉ Cụ Thể"
                            multiline
                            maxRows={4}
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            value={diachiCuThe}
                            onChange={(e) => setDiachiCuThe(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : result1 && isDeliveryChecked ? (
                      <div>
                        <h5>
                          <AccountBoxIcon />
                          Thông Tin Người Nhận
                        </h5>{' '}
                        <Typography variant="subtitle1" gutterBottom>
                          Tên Người Nhận Hàng: {listHD.idKH && tenKhShip}
                        </Typography>{' '}
                        <Typography variant="subtitle1" gutterBottom>
                          SĐT Người Nhận Hàng: {listHD.idKH && sdtKHShip}
                        </Typography>{' '}
                        <Typography variant="subtitle1" gutterBottom>
                          Địa Chỉ Nhận Hàng: {result1 && result1}
                        </Typography>
                      </div>
                    ) : (
                      <div className="text-information">
                        <div>
                          <h5>
                            <AccountBoxIcon />
                            Thông Tin Khách Hàng
                          </h5>
                        </div>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Người Thanh Toán"
                          multiline
                          maxRows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onChange={(e) => getTenKHTT(e.target.value)}
                        />
                        <TextField
                          id="standard-multiline-flexible"
                          label="Số Điện Thoại"
                          multiline
                          maxRows={4}
                          variant="outlined"
                          size="small"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          onChange={(e) => getSdtKHTT(e.target.value)}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <h5>
                      <AccountBalanceWalletIcon />
                      THÔNG TIN THANH TOÁN
                    </h5>
                    <FormControlLabel control={<Switch />} onChange={handleDeliveryChange} label="Giao Hàng" />
                    <br />
                    <div className="row">
                      <Stack
                        sx={{ marginTop: 5 }}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={3}
                      >
                        <Typography variant="h6" gutterBottom>
                          Tiền Hàng{' '}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {formatCurrency(listHD.tongTien)}{' '}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h6" gutterBottom>
                          Tiền Ship{' '}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {formatCurrency(listHD.tienShip)}{' '}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h6" gutterBottom>
                          Thành Tiền{' '}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {formatCurrency(listHD.thanhTien)}{' '}
                        </Typography>
                      </Stack>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div className="class-checkout">
                <LoadingButton
                  size="small"
                  color="secondary"
                  onClick={handleClick}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  <span>Đặt Hàng</span>
                </LoadingButton>
              </div>

              {/* Add Modals */}
              <ModalAddProduct
                show={showModalsAdd}
                selectDataCart={selectDataCart}
                handleClose={handleClose}
                DataCart={DataCart}
                getDetailHD={getDetailHD}
              />
              {/* Modal Update Product */}
              <ModalUpdateProductOnCart
                show={showModalsUpdate}
                handleClose={handleCloseUpdateClassify}
                itemUpdateClassify={itemUpdateClassify}
                selectDataCart={selectDataCart}
                itemUpdate={itemUpdate}
                getDetailHD={getDetailHD}
              />

              {/* Modal Delete Product  */}
              <ModalDeleteAllProductOnCart
                open={showModalsDeleteAll}
                handleClose={handCloseDeleteAll}
                selectDataCart={selectDataCart}
                DataCart={DataCart}
                getDetailHD={getDetailHD}
              />
              {/* Modal Add Customer */}
              <ModalAddKhachHang
                open={showModalsKH}
                handleClose={handleCloseAddKH}
                getDetailHD={getDetailHD}
                resetInformation={resetInformation}
              // setSelectedCustomerName={setSelectedCustomerName}
              // setSelectedMaTk={setSelectedMaTk}
              // setSelectedCustomerEmail={setSelectedCustomerEmail}
              />
              {/* ModalDeleteDirectSale */}
              <ModalDeleteDirectSale open={open} handleClose={handleCloseDeleteInvoice} information={information} />
              {DataCart.length > 0 && (
                <>
                  {/* Modal Delete Product  */}
                  {itemDelete !== undefined && (
                    <ModalDeleteProductOnCart
                      open={showModalsDelete}
                      handleClose={handleCloseModalDelelte}
                      itemDelete={itemDelete}
                      selectDataCart={selectDataCart}
                      DataCart={DataCart}
                      getDetailHD={getDetailHD}
                    />
                  )}
                  <ModalPaymentComfirm
                    show={openPayment}
                    handleClose={handlePaymentClose}
                    thanhTien={listHD.thanhTien}
                    listHD={listHD}
                    tenKhTT={tenKhTT}
                    sdtKHTT={sdtKHTT}
                  />

                  <ModalCreateBillOnline
                    open={openCreateOnline}
                    handleClose={handleCloseCreateOnline}
                    thanhTien={listHD.thanhTien}
                    listHD={listHD}
                    tenKhShip={tenKhShip}
                    sdtKHShip={sdtKHShip}
                    emailKHShip={emailKHShip}
                    result={result || result1}
                  />
                </>
              )}
              {listHD.idKH && (
                <>
                  <ModalAddAddress
                    open={showModalsAddress}
                    listData={listData}
                    handleClose={handleCloseAddress}
                    setTenKH={getTenKHShip}
                    setSDTKH={getSdtKHShip}
                    setEmailKH={getEmailKHShip}
                    setDiaChi={setResult1}
                    setTienShip={getTienShip}
                    getDetailHD={getDetailHD}
                  />
                </>
              )}
            </Box>
          </Box>
        ) : (
          <Grid item xs={12} md={6} lg={12} sx={{ marginTop: 3, backgroundColor: 'white' }}>
            <Paper
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" paragraph>
                Dữ Liệu Trống
              </Typography>

              <Typography variant="body2">
                Bạn Không Có Hóa Đơn Nào Ở Trạng Thái Này &nbsp;
                <br /> Xin Vui Lòng Đặt Hàng.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Box>
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
export default CartBillADM;
