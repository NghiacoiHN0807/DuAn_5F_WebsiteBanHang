import '../scss/Car-Bill-ADM.scss';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
// sections
import { updateClientPayment2 } from '../service/client/Payment';
// APIs

const ModalChangeAddressNoAcc = (props) => {
  ModalChangeAddressNoAcc.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    getDetailHD: PropTypes.func.isRequired,
  };
  const { open, handleClose, getDetailHD } = props;

  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const [tenKhShip, getTenKHShip] = useState('');
  const [sdtKHShip, getSdtKHShip] = useState('');
  const [emailKHShip, getEmailKHShip] = useState('');
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

  const param = useParams();
  const idHdParam = param.id;
  // Get number
  // Check Validated numberphone
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    return phoneRegex.test(phoneNumber);
  }
  const containsNumber = (text) => /\d/.test(text);
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleChoose = async () => {
    try {
      if (!tenKhShip.trim() || containsNumber(tenKhShip)) {
        setAlertContent({
          type: 'warning',
          message: 'Tên Không Đúng!!!Vui Lòng Nhập Lại ',
        });
      } else if (!tenKhShip.trim() || !sdtKHShip.trim()) {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Nhập Thông Tin Người Nhận Hàng!!!',
        });
      } else if (!isValidEmail(emailKHShip)) {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Nhập Đúng Email Cá Nhân!!!',
        });
      } else if (!isValidPhoneNumber(sdtKHShip)) {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Nhập Đúng Định Dạng Số Của Việt Nam!!!',
        });
      } else if (!result.trim() || result === '' || diachiCuThe === '' || !diachiCuThe.trim()) {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Nhập Đầy Đủ Địa Chỉ Nhận Hàng!!!',
        });
      } else if (selectedWard === '' || selectedDistrict === '' || selectedProvince === '') {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Nhập Địa Chỉ Nhận Hàng!!!',
        });
      } else {
        await updateClientPayment2(idHdParam, tenKhShip, sdtKHShip, emailKHShip, result, tienShip);

        setAlertContent({
          type: 'success',
          message: 'Cập Nhập Địa Chỉ Thành Công',
        });
        handleCloseAll();
        getDetailHD();
      }
    } catch (error) {
      setAlertContent({
        type: 'warning',
        message: 'Không Thể Cập Nhập Địa Chỉ!!!',
      });
      console.error(error);
    }
  };

  const handleCloseAll = () => {
    getTenKHShip('');
    getSdtKHShip('');
    getEmailKHShip('');
    setSelectedWard('');
    setDiachiCuThe('');
    setSelectedProvince('');
    setSelectedDistrict('');
    setResult('');
    getTienShip(0);
    handleClose();
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleCloseAll} maxWidth="xl" fullWidth>
          <DialogTitle>Hãy Nhập Địa Chỉ Muốn Thay Đổi</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAll}>Hủy</Button>
            <Button onClick={handleChoose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
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
export default ModalChangeAddressNoAcc;
