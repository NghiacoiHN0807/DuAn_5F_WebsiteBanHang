import { useEffect, useState } from "react";
import { postAddTaiKhoan } from "../services/taiKhoanService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { chucVu } from "../services/chucVuService";

const AddTKNV = () => {
  const [maTaiKhoan, setMaTaiKhoan] = useState(null);
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");
  const [chucVuId, setChucVuId] = useState(""); // Store the selected ChucVu id
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState(null);
  const [soCanCuoc, setSoCanCuoc] = useState("");
  const [trangThai, setTrangThai] = useState("0");

  // Navigate to another page
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!chucVuId || !ho || !ten || !email || !sdt || !soCanCuoc) {
      toast.warning("Có trường dữ liệu còn trống!");
    } else {
      console.log(soCanCuoc);
      let res = await postAddTaiKhoan(
        maTaiKhoan,
        chucVuId,
        ho,
        ten,
        sdt,
        email,
        soCanCuoc,
        trangThai
      );
      console.log("Kiểm tra res: ", res);
      if (res && res.idTaiKhoan) {
        toast.success("Thêm thành công");
        navigate("/table-taiKhoan");
      } else {
        toast.error("Thêm thất bại!");
      }
    }
  };

  const [myChucVu, setMyChucVu] = useState([]);

  const getAllChucVu = async () => {
    let rs = await chucVu(0);
    setMyChucVu(rs.content);
  };

  useEffect(() => {
    getAllChucVu();
  }, []);

  return (
    <div className="row row-order-management">
      <div className="title" style={{ textAlign: "center", margin: "20px 0" }}>
        <h4>THÊM Tài Khoản Nhân Viên</h4>
      </div>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth margin="dense">
          <InputLabel>Chức Vụ</InputLabel>
          <Select
            value={chucVuId}
            onChange={(event) => setChucVuId(event.target.value)}
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
          margin="dense"
          label="Họ"
          onChange={(event) => setHo(event.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Tên"
          onChange={(event) => setTen(event.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Số Điện Thoại"
          onChange={(event) => setSdt(event.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Số Căn Cước"
          onChange={(event) => setSoCanCuoc(event.target.value)}
        />
        <Button
          size="large"
          variant="contained"
          color="success"
          onClick={handleSave}
          style={{ marginTop: "20px" }}
        >
          Thêm Tài Khoản Nhân Viên Mới
        </Button>
      </Box>
    </div>
  );
};

export default AddTKNV;
