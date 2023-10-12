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
import QrReader from "react-qr-scanner";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

const AddTKNV = () => {
  const [maTaiKhoan, setMaTaiKhoan] = useState(null);
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState("");
  const [chucVuId, setChucVuId] = useState(""); // Store the selected ChucVu id
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
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

  // QR code
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No result");
  const [scanning, setScanning] = useState(false);
  // const [scannedData, setScannedData] = useState([]);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      // Log the received data before parsing
      console.log("Received Data:", data);

      // Process the scanned data
      try {
        const qrData = data.text; // Assuming the QR code contains plain text data
        console.log("Scanned QR Code Data:", qrData);

        const dataParts = qrData.split("|"); // Split the data by '|'
        const cleanedData = dataParts.map((part) => part.replace(/\|/g, "")); // Remove '|' from each part

        if (cleanedData.length >= 2) {
          const hoTenParts = cleanedData[2].split(" ");
          const ho = hoTenParts[0] || "";
          const ten = hoTenParts.slice(1).join(" ") || "";
          setHo(ho);
          setTen(ten);
          setSoCanCuoc(cleanedData[0]);
        }

        // Store the scanned data in the array
        // setScannedData((prevData) => [...prevData, qrData]);
      } catch (error) {
        console.error("Error processing QR Code data:", error);
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

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="row row-order-management">
      <div className="title" style={{ textAlign: "center", margin: "20px 0" }}>
        <h4>THÊM Tài Khoản Nhân Viên</h4>
      </div>

      <div className="">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {scanning ? (
            <>
              <QrReader
                delay={delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
              />
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={handleStopScan}
                style={{ marginTop: "10px" }}
              >
                Stop Scanning
              </Button>
              <p>Scanned Tên: {ten}</p>
              <p>Scanned Số Căn Cước: {soCanCuoc}</p>
            </>
          ) : (
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleStartScan}
              style={{ marginTop: "10px" }}
            >
              <QrCodeScannerIcon />
            </Button>
          )}
        </div>
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
          value={ho}
          onChange={(event) => setHo(event.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Tên"
          value={ten}
          onChange={(event) => setTen(event.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          value={email}
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
          value={soCanCuoc}
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
