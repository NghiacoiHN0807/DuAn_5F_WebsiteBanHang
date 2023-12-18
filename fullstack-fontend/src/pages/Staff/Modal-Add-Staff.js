import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, FormHelperText, FormGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { chucVu } from '../../service/chucVuService';
import { postAddTaiKhoan } from '../../service/taiKhoanNhanVienService';


const AddTKNV = () => {
  const [maTaiKhoan] = useState(null);
  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [chucVuId, setChucVuId] = useState(8);
  const [sdt, setSdt] = useState('');
  const [email, setEmail] = useState('');
  const [soCanCuoc, setSoCanCuoc] = useState('');
  const [matKhau] = useState(null);
  const [trangThai] = useState(0);
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



  const cccdRegex = /^\d{9,12}$/;
  const validateFields = () => {
    let isValid = true;
    const newValidation = {};

    if (!ho) {
      newValidation.ho = 'Họ không được để trống';
      isValid = false;
    }

    if (!ten) {
      newValidation.ten = 'Tên không được để trống';
      isValid = false;
    }

    if (!sdt) {
      newValidation.sdt = 'Số điện thoại không được để trống';
      isValid = false;
    }
    if (!email) {
      newValidation.email = 'Email không được để trống';
      isValid = false;
    }

    if (!soCanCuoc) {
      newValidation.soCanCuoc = 'Không được để trống số căn cước';
      isValid = false;
    } else
      if (!cccdRegex.test(soCanCuoc)) {
        newValidation.soCanCuoc = 'Số Căn Cước phải có từ 9 đến 12 chữ số';
        isValid = false;
      }

    setValidation(newValidation);

    return isValid;
  };

  useEffect(() => {
    setValidation((prevErrors) => ({ ...prevErrors, ho: '' }));
  }, [ho]);
  useEffect(() => {
    setValidation((prevErrors) => ({ ...prevErrors, ten: '' }));
  }, [ten]);
  useEffect(() => {
    setValidation((prevErrors) => ({ ...prevErrors, sdt: '' }));
  }, [sdt]);
  useEffect(() => {
    setValidation((prevErrors) => ({ ...prevErrors, email: '' }));
  }, [email]);
  useEffect(() => {
    setValidation((prevErrors) => ({ ...prevErrors, soCanCuoc: '' }));
  }, [soCanCuoc]);
  useEffect(() => {
    setValidation((prevErrors) => ({ ...prevErrors, matKhau: '' }));
  }, [matKhau]);


  const handleSave = async () => {
    handleClose();
    if (!validateFields()) {
      // Validation failed, do not proceed with the API call
      return;
    }
    let res;
    try {
      const filteredChucVu = myChucVu.find(item => item.idCv === chucVuId);
      res = await postAddTaiKhoan(
        maTaiKhoan,
        filteredChucVu,
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
    console.log(rs);
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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        style={{ textAlign: "center", margin: "20px 0", color: "black" }}
      >
        <h4 style={{fontSize: "34px"}}>Thêm Tài Khoản</h4>
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
          <Select defaultValue={chucVuId}
            onChange={(e) => {
              setChucVuId(e.target.value);
            }}>
            <MenuItem value={8}>
              Nhân Viên
            </MenuItem>
            <MenuItem value={1}>
              Quản Lý
            </MenuItem>
          </Select>
        </FormControl>

        <TextField error={!!validation.ho} helperText={validation.ho} fullWidth margin="dense" label="Họ" onChange={(event) => setHo(event.target.value)} />
        <TextField error={!!validation.ten} helperText={validation.ten} fullWidth margin="dense" label="Tên" onChange={(event) => setTen(event.target.value)} />
        <TextField error={!!validation.email} helperText={validation.email} fullWidth margin="dense" label="Email" onChange={(event) => setEmail(event.target.value)} />
        <TextField error={!!validation.sdt} helperText={validation.sdt} fullWidth margin="dense" type='number' label="Số Điện Thoại" onChange={(event) => setSdt(event.target.value)} />
        <TextField error={!!validation.soCanCuoc} helperText={validation.soCanCuoc} fullWidth type='number' margin="dense" label="Số Căn Cước" onChange={(event) => setSoCanCuoc(event.target.value)} />

        <Button size="large" variant="contained" color="success" onClick={() => handleClickOpen()} style={{ marginTop: '20px' }}>
          Thêm Tài Khoản Nhân Viên
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận thêm?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn thêm nhân viên mới!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleSave()} autoFocus>
            Xác nhận thêm
          </Button>
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
  );
};

export default AddTKNV;