import { useCallback, useEffect, useState } from "react";



import {
    Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {  detailTaiKhoan, postUpdateTaiKhoan,} from "../../service/taiKhoanNhanVienService";
import { chucVu3 } from "../../service/chucVuService";


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

  const getAllChucVu = async () => {
    const rs = await chucVu3(0);
    setMyChucVu(rs);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
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
      setChucVu(res.idChucVu);
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

  const handleSave = async () => {
    if (
      ho === "" ||
      ten === "" ||
      email === "" ||
      sdt === "" ||
      matKhau === "" ||
      soCanCuoc === "" 
    ) {
        setAlertContent({
            type: 'warning',
            message: 'Một số trường đang trống!',
          });
    } else {
        const res = await postUpdateTaiKhoan(
        Data.idTaiKhoan,
        Data.maTaiKhoan,
        chucVu,
        ho,
        ten,
        sdt,
        email,
        matKhau,
        soCanCuoc,
        trangThai
      );
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
    }
  };
  return (
    <>
      <div className="row row-order-management">
        <div
          className="title"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          <h4>Cập Nhập Tài Khoản Nhân Viên Mã: {Data.maTaiKhoan}</h4>
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
              .filter((item) => item.idCv === 1 || item.idCv === 8) // Lọc theo idCv
              .map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item.tenCv}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Họ"
            id="fullWidth"
            value={ho}
            onChange={(event) => setHo(event.target.value)}
          />
          <TextField
            fullWidth
            label="Tên"
            id="fullWidth"
            value={ten}
            onChange={(event) => setTen(event.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            id="fullWidth"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            fullWidth
            label="Số Điện Thoại"
            id="fullWidth"
            value={sdt}
            onChange={(event) => setSdt(event.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Mật Khẩu"
            value={matKhau}
            onChange={(event) => setMatKhau(event.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
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
                value="1"
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

        <div style={{ textAlign: "right", margin: "20px 0" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSave()}
          >
            Sửa
          </Button>
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
      </div>
      
    </>
  );
};
export default UpdateTkNV;
