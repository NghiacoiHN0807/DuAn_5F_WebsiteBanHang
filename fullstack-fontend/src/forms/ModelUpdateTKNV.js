import { useCallback, useEffect, useState } from "react";
import {
  detailTaiKhoan,
  postUpdateTaiKhoan,
} from "../services/taiKhoanService";
import { chucVu3 } from "../services/chucVuService";
import { toast } from "react-toastify";

import {
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
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

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

  const getAllChucVu = async () => {
    let rs = await chucVu3(0);
    setMyChucVu(rs);
  };

  useEffect(() => {
    getAllChucVu();
  }, []);
  // chuyen trang
  const navigate = useNavigate();
  const getListData = useCallback(async () => {
    try {
      let res = await detailTaiKhoan(idNV);
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
      toast.warning("Một Số Trường Đang Trống!");
    } else {
      let res = await postUpdateTaiKhoan(
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
        toast.success("Cập Nhập Tài Khoản Thành Công!");
        navigate("/table-taiKhoan");
      } else {
        toast.error("Cập Nhập Tài Khoản Thất Bại");
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
              .filter((item) => item.idCv === 1 || item.idCv === 2) // Lọc theo idCv
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
                value="0"
                control={<Radio />}
                label="Đang Hoạt Động"
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Không Hoạt Động"
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
      </div>
    </>
  );
};
export default UpdateTkNV;
