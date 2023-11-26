import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';

// Service
import { detailBill, finByProductOnCart } from '../../service/BillSevice';
import { updateTongTien } from '../../service/OrderManagementTimeLine';
import ModalAddAddress from '../../forms/Modals-Add-Address';

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

export default function PaymentPage() {
  // Find all addresses
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');
  const [diachiCuThe, setDiachiCuThe] = useState('');

  // Selet API GHN

  const [result, setResult] = useState('');

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
      const totalShip = response.data?.data?.total || 0;
      console.log('getSevice: ', response);
      getTienShip(totalShip);
    } catch (error) {
      console.error('Error get service:', error);
    }
  }, [selectedDistrict]);

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

  // Payment
  // Show  payment information
  const [isDeliveryChecked, setIsDeliveryChecked] = useState(false);

  const handleDeliveryChange = (event) => {
    setIsDeliveryChecked(event.target.checked);
  };

  // Select Product On Cart

  const param = useParams();
  const idHdParam = param.id;

  const [DataCart, setDataCart] = useState([]);

  const selectDataCart = useCallback(async () => {
    try {
      const res = await finByProductOnCart(idHdParam);

      if (res) {
        console.log('Check DataCart: ', res);
        setDataCart(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, [idHdParam]);
  useEffect(() => {
    selectDataCart();
  }, [selectDataCart]);

  // Detail Hd
  const [listHD, setlistHD] = useState([]);

  const getDetailHD = useCallback(async () => {
    try {
      const getData = await detailBill(idHdParam);
      console.log('getData: ', getData);
      setlistHD(getData);
    } catch (error) {
      console.error('Error: ', error);
    }
  }, [idHdParam]);
  useEffect(() => {
    getDetailHD();
  }, [getDetailHD]);

  // Show thanhTien
  const [thanhTien, setThanhTien] = useState();
  // const [tienShipNe, setTienShip] = useState();
  // const [tongTien, setTongTien] = useState();

  useEffect(() => {
    const calculateTotalPrice = async () => {
      const total = DataCart.reduce((accumulator, item) => accumulator + item[9], 0);
      // Set Tong Tien
      // setTongTien(total);
      // Set Tien Ship
      // const totalShip = tienShip === 0 && listHD && listHD.tienShip ? listHD.tienShip : tienShip;
      // setTienShip(totalShip);
      // Set Thanh Tien
      const thanhTien = total + tienShip;
      setThanhTien(thanhTien);

      await updateTongTien(idHdParam, total, tienShip, thanhTien);
      // setlistHD();
    };

    calculateTotalPrice();
  }, [DataCart, idHdParam, tienShip, listHD]);

  // Select modal address
  const [showModalsAddress, setShowModalKH] = useState(false);
  const handleAddAddress = () => {
    setShowModalKH(true);
  };
  const handleCloseAddress = () => {
    setShowModalKH(false);
  };

  return (
    <>
      <Container>
        <Typography variant="h5" sx={{ marginTop: 3, mb: 3 }}>
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
                      <TableCell align="right">{item[7]}</TableCell>
                      <TableCell align="right">{item[8]}</TableCell>
                      <TableCell align="right">{item[9]}</TableCell>
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Hãy Nhập Thông Tin Của Bạn{' '}
              <Button onClick={() => handleAddAddress()} color="secondary">
                Thay Đổi Địa Chỉ
              </Button>
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Họ"
                id="outlined-required"
                multiline
                required
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ marginTop: 2 }}
                defaultValue={listHD.idKH && listHD.idKH.ho}
              />
              <TextField
                label="Tên"
                id="standard-multiline-flexible"
                multiline
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ marginTop: 2 }}
                defaultValue={listHD.idKH && listHD.idKH.ten}
              />
            </Box>

            <div className="address">
              <FormControl size="small" sx={{ m: 0, minWidth: 165, marginRight: 3, marginTop: 2 }}>
                <InputLabel id="province-label">Tỉnh/Thành Phố</InputLabel>
                <Select
                  labelId="province-label"
                  id="province-select"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
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
                  onChange={(e) => setSelectedDistrict(e.target.value)}
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
                  onChange={(e) => setSelectedWard(e.target.value)}
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
              <div id="result">{result}</div>
            </div>
            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Làm Sao Để Chúng Tôi Liên Hệ Với Bạn
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Số Điện Thoại"
                id="standard-multiline-flexible"
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ marginTop: 2 }}
                defaultValue={listHD.idKH && listHD.idKH.sdt}
              />
              <TextField
                label="Email"
                id="standard-multiline-flexible"
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ marginTop: 2 }}
                defaultValue={listHD.idKH && listHD.idKH.email}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ marginTop: 3 }} gutterBottom>
              Phương Thức Thanh Toán{' '}
              <FormControlLabel control={<Switch />} onChange={handleDeliveryChange} label="Thanh Toán Bằng Thẻ" />
            </Typography>
            {isDeliveryChecked === true ? (
              <>
                <ImageButton
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="button" display="block" gutterBottom>
                Tổng Tiền{' '}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                {listHD && listHD.tongTien}{' '}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="button" display="block" gutterBottom>
                Tiền Ship{' '}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                {listHD && tienShip}{' '}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="button" display="block" gutterBottom>
                Thành Tiền{' '}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                {listHD && thanhTien}{' '}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <ModalAddAddress open={showModalsAddress} handleClose={handleCloseAddress} />
    </>
  );
}
