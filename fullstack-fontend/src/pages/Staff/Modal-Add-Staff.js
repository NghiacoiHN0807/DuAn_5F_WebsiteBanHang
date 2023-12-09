import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { chucVu } from '../../service/chucVuService';
import { postAddTaiKhoan } from '../../service/taiKhoanNhanVienService';


const AddTKNV = () => {
  const [maTaiKhoan, setMaTaiKhoan] = useState(null);
  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [chucVuId, setChucVuId] = useState('');
  const [sdt, setSdt] = useState('');
  const [email, setEmail] = useState('');
  const [soCanCuoc, setSoCanCuoc] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [alertContent, setAlertContent] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('No result');
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  let res;



  const handleSave = async () => {
    try {
      res = await postAddTaiKhoan(
        maTaiKhoan,
        chucVuId,
        ho,
        ten,
        sdt,
        email,
        soCanCuoc,
        matKhau,
        trangThai);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setValidation(error.response.data);
      }
    }

    if (res && res.idTaiKhoan) {
      const successMessage = {
        type: 'success',
        message: 'Thêm Nhân Viên Thành Công!',
      };
      localStorage.setItem('successMessage', JSON.stringify(successMessage));
      navigate('/dashboard/staff');
    } else {
      setAlertContent({
        type: 'error',
        message: 'Thêm tài khoản thất bại!',
      });
    }
  };

  const [myChucVu, setMyChucVu] = useState([]);

  const getAllChucVu = async () => {
    const rs = await chucVu(0);
    setMyChucVu(rs);
  };

  useEffect(() => {
    getAllChucVu();
  }, []);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      try {
        const qrData = data.text;
        const dataParts = qrData.split('|');
        const cleanedData = dataParts.map((part) => part.replace(/\|/g, ''));
        if (cleanedData.length >= 2) {
          const hoTenParts = cleanedData[2].split(' ');
          const ho = hoTenParts[0] || '';
          const ten = hoTenParts.slice(1).join(' ') || '';
          setHo(ho);
          setTen(ten);
          setSoCanCuoc(cleanedData[0]);
        }
      } catch (error) {
        console.error('Error processing QR Code data:', error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleStartScan = () => {
    setScanning(true);
  };

  const handleStopScan = () => {
    setScanning(false);
  };

  const goback = () => {
    window.history.back();
  }

  return (
    <div className="row row-order-management">
      <div style={{ textAlign: "left", margin: "20px 0" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={goback}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </div>
      <div
        className="title"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <h4>Thêm Tài Khoản</h4>
      </div>

      <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {scanning ? (
            <>
              <QrReader delay={100} style={{ height: 240, width: 320 }} onError={handleError} onScan={handleScan} />
              <Button size="medium" variant="contained" color="primary" onClick={handleStopScan} style={{ marginTop: '10px' }}>
                Stop Scanning
              </Button>
              <p>Scanned Tên: {ten}</p>
              <p>Scanned Số Căn Cước: {soCanCuoc}</p>
            </>
          ) : (
            <Button size="medium" variant="contained" color="primary" onClick={handleStartScan} style={{ marginTop: '10px' }}>
              <QrCodeScannerIcon />
            </Button>
          )}
        </div>
      </div>

      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth margin="dense">
          <InputLabel>Chức Vụ</InputLabel>
          <Select value={chucVuId} onChange={(event) => setChucVuId(event.target.value)}>
            {myChucVu
              .filter((item) => item.idCv === 1 || item.idCv === 8)
              .map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item.tenCv}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField error={!!validation.ho} helperText={validation.ho} fullWidth margin="dense" label="Họ" value={ho} onChange={(event) => setHo(event.target.value)} />
        <TextField error={!!validation.ten} helperText={validation.ten} fullWidth margin="dense" label="Tên" value={ten} onChange={(event) => setTen(event.target.value)} />
        <TextField error={!!validation.matKhau} helperText={validation.matKhau} fullWidth margin="dense" label="Mật Khẩu" value={matKhau} onChange={(event) => setMatKhau(event.target.value)} />
        <TextField error={!!validation.email} helperText={validation.email} fullWidth margin="dense" label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <TextField error={!!validation.sdt} helperText={validation.sdt} fullWidth margin="dense" label="Số Điện Thoại" value={sdt} onChange={(event) => setSdt(event.target.value)} />
        <TextField error={!!validation.soCanCuoc} helperText={validation.soCanCuoc} fullWidth margin="dense" label="Số Căn Cước" value={soCanCuoc} onChange={(event) => setSoCanCuoc(event.target.value)} />
        <Button size="large" variant="contained" color="success" onClick={handleSave} style={{ marginTop: '20px' }}>
          Thêm Tài Khoản Nhân Viên
        </Button>
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
    </div>
  );
};

export default AddTKNV;
