import { useCallback, useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { detailTaiKhoan, postUpdateTaiKhoan, } from "../../service/taiKhoanNhanVienService";
import { chucVu3, detailTen } from "../../service/chucVuService";



const UpdateTkNV = (props) => {
  const param = useParams();
  const idNV = param.id;
  const [Data, setData] = useState([]);
  const [chucVu, setChucVu] = useState("");
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [soCanCuoc, setSoCanCuoc] = useState("");
  const [trangThai, setTrangThai] = useState("0");
  const [myChucVu, setMyChucVu] = useState([]);
  const [alertContent, setAlertContent] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const getAllChucVu = async () => {
    const rs = await chucVu3(0);
    setMyChucVu(rs);
  };



  useEffect(() => {
    getAllChucVu();
  }, []);

  // chuyen trang
  const navigate = useNavigate();
  const getListData = useCallback(async () => {
    try {
      const res = await detailTaiKhoan(idNV);
      setData(res);
      setChucVu(res.idChucVu.tenCv);
      setHo(res.ho);
      setTen(res.ten);
      setEmail(res.email);
      setSdt(res.sdt);
      setMatKhau(res.matKhau);
      setSoCanCuoc(res.soCanCuoc);
      setTrangThai(res.trangThai);
      console.log("check res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [idNV]);
  useEffect(() => {
    getListData();
  }, [getListData]);


  const cccdRegex = /^\d{9,12}$/;
  const validateFields = () => {
    let isValid = true;
    const newValidation = {};

    // Validate 'ho' field
    if (!ho) {
      newValidation.ho = 'Họ không được để trống';
      isValid = false;
    }

    // Validate 'ten' field
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
    if (!matKhau) {
      newValidation.matKhau = 'Mật khẩu không được để trống';
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

    // Validate other fields similarly

    // Update the validation state
    setValidationErrors(newValidation);

    return isValid;
  };
  useEffect(() => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, ho: '' }));
  }, [ho]);
  useEffect(() => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, ten: '' }));
  }, [ten]);
  useEffect(() => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, sdt: '' }));
  }, [sdt]);
  useEffect(() => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, email: '' }));
  }, [email]);
  useEffect(() => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, soCanCuoc: '' }));
  }, [soCanCuoc]);
  useEffect(() => {
    setValidationErrors((prevErrors) => ({ ...prevErrors, matKhau: '' }));
  }, [matKhau]);

  const handleSave = async () => {
    handleClose();
    let res;
    let tenCvObject;
    if (!validateFields()) {
      // Validation failed, do not proceed with the API call
      return;
    }
    try {

      tenCvObject = await detailTen(chucVu);
      console.log("chuc vu", tenCvObject);

      res = await postUpdateTaiKhoan(
        Data.idTaiKhoan,
        Data.maTaiKhoan,
        tenCvObject,
        ho,
        ten,
        sdt,
        email,
        matKhau,
        soCanCuoc,
        trangThai
      );
      console.log("Check res: ", res);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setValidationErrors(error.response.data);
      } else {
        console.error("Error:", error);
      }
      return;
    }

    console.log("Check res: ", res);
    if (res && res.idTaiKhoan) {
      const successMessage = {
        type: 'success',
        message: 'Cập nhập Nhân Viên Thành Công!',
      };
      localStorage.setItem('successMessage', JSON.stringify(successMessage));
      navigate('/dashboard/staff');
    } else {
      setAlertContent({
        type: 'error',
        message: 'Cập Nhập tài khoản thất bại!',
      });

    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const goback = () => {
    window.history.back();
  }

  return (
    <>

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
          style={{ textAlign: "center", margin: "20px 0", color: "black"}}
        >
          <h4 style={{fontSize: "34px"}}>Cập Nhập Tài Khoản</h4>
          <h5>Mã tài khoản: {Data.maTaiKhoan}</h5>
        </div>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "120" },
          }}
          noValidate
          autoComplete="off"
          alignItems={"center"}
        >
          <FormControl fullWidth margin="dense">
            <InputLabel>Chức Vụ</InputLabel>
            <Select
              value={chucVu}
              onChange={(event) => setChucVu(event.target.value)}
            >
              {myChucVu
                .filter((item) => item.idCv === 1 || item.idCv === 8)
                .map((item, index) => (
                  <MenuItem key={index} value={item.tenCv}>
                    {item.tenCv}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>


          <TextField
            error={!!validationErrors.ho}
            helperText={validationErrors.ho}
            fullWidth
            label="Họ"
            id="ho"
            value={ho}
            onChange={(event) => setHo(event.target.value)}
          />
          <TextField
            error={!!validationErrors.ten}
            helperText={validationErrors.ten}
            fullWidth
            label="Tên"
            id="ten"
            value={ten}
            onChange={(event) => setTen(event.target.value)}
          />
          <TextField
            disabled
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            fullWidth
            label="Email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            error={!!validationErrors.sdt}
            helperText={validationErrors.sdt}
            fullWidth
            label="Số Điện Thoại"
            id="sdt"
            value={sdt}
            onChange={(event) => setSdt(event.target.value)}
          />
          {/* <TextField
            error={!!validationErrors.matKhau}
            helperText={validationErrors.matKhau}
            fullWidth
            type={showPassword ? "text" : "password"}
            id="matKhau"
            label="Mật Khẩu"
            value={matKhau}
            onChange={(event) => setMatKhau(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)} // Khi nhấn vào nút, đảo ngược trạng thái
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> */}
          <TextField
            error={!!validationErrors.soCanCuoc}
            helperText={validationErrors.soCanCuoc}
            fullWidth
            id="soCanCuoc"
            label="Số Căn Cước"
            value={soCanCuoc}
            onChange={(event) => setSoCanCuoc(event.target.value)}
          />
          <FormControl style={{ marginLeft: "10px" }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Trạng thái
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={trangThai}
              onChange={(event) => setTrangThai(event.target.value)}
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Đang Hoạt Động"
              />
              <FormControlLabel
                value="10"
                control={<Radio />}
                label="Dừng Hoạt Động"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleClickOpen()}
          >
            Cập Nhập Tài Khoản Nhân Viên
          </Button>
        </div>
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
      </div>

    </>
  );
};
export default UpdateTkNV;
