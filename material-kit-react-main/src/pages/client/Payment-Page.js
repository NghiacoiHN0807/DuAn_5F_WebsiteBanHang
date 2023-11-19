import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

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

const Image = styled('span')(({ theme }) => ({
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

  return (
    <>
      <Container>
        <Typography variant="h5" sx={{ marginTop: 3, mb: 3 }}>
          Hi, Bạn Có Muốn Thanh Toán Hóa Đơn Của Bạn?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Button variant="outlined" disabled>
              Giao Hàng
            </Button>
            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Hãy Nhập Thông Tin Của Bạn
            </Typography>
            <TextField
              id="standard-multiline-flexible"
              label="Họ"
              multiline
              maxRows={4}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ marginTop: 2 }}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Tên"
              multiline
              maxRows={4}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ marginTop: 2 }}
            />
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
            <TextField
              id="standard-multiline-flexible"
              label="Số Điện Thoại"
              multiline
              maxRows={4}
              sx={{ marginTop: 2 }}
              variant="outlined"
              size="small"
              fullWidth
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
            />
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
                  <Image>
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
                  </Image>
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
            <Typography variant="h6" sx={{ marginTop: 8 }}>
              Sản Phẩm Trong Đơn Hàng
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="button" display="block" gutterBottom>
                Tổng Tiền{' '}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                {tienShip}{' '}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="button" display="block" gutterBottom>
                Tiền Ship{' '}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                {tienShip}{' '}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography variant="button" display="block" gutterBottom>
                Thành Tiền{' '}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                {tienShip}{' '}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
