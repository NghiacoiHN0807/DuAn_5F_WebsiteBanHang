// import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { postAddSanPham } from "../../services/SanPhamService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { fetchXX, detailXX } from "../../services/XuatXuService";
import { fetchCL, detailCL } from "../../services/ChatLieuService";
import { fetchCoAo, detailCoAo } from "../../services/LoaiCoAoService";
import { fetchLSP, detailLSP } from "../../services/LoaiSPService";
import { fetchMS, detailMS } from "../../services/MauSacService";
import { fetchTayAo, detailTayAo } from "../../services/OngTayAoService";
import { useNavigate } from "react-router-dom";

const ModelAddNew = (props) => {
  const [maSp, setMaSp] = useState("");
  const [tenSp, setTenSp] = useState("");
  const [moTa, setMoTa] = useState("");
  const [giaBan, setGiaBan] = useState("");
  const [trangThai, setTrangThai] = useState("0");

  const [chatLieu, setChatLieu] = useState("");
  const [mauSac, setMauSac] = useState("");
  const [loaiSP, setLoaiSP] = useState("");
  const [xuatXu, setXuatXu] = useState("");
  const [tayAo, setTayAo] = useState("");
  const [coAo, setCoAo] = useState("");

  const [listCL, setListCL] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);

  useEffect(() => {
    getAllList();

    return () => {
      // Cleanup
    };
  }, []);

  const getAllList = async () => {
    let resCL = await fetchCL();
    setListCL(resCL);

    let resMS = await fetchMS();
    setListMS(resMS);

    let resLSP = await fetchLSP();
    setListLSP(resLSP);

    let resXX = await fetchXX();
    setListXX(resXX);

    let resTayAo = await fetchTayAo();
    setListTayAo(resTayAo);

    let resCoAo = await fetchCoAo();
    setListCoAo(resCoAo);
  };

  // chuyen trang
  const navigate = useNavigate();

  // dong mo confirm
  const [open, setOpen] = useState(false);

  const handleClickOpenAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // get object all\
    const getObjChatLieu = await detailCL(chatLieu);
    const getObjMauSac = await detailMS(mauSac);
    const getObjLoaiSP = await detailLSP(loaiSP);
    const getObjXuatXu = await detailXX(xuatXu);
    const getObjTayAo = await detailTayAo(tayAo);
    const getObjCoAo = await detailCoAo(coAo);

    if (
      setMaSp("") &&
      setTenSp("") &&
      setChatLieu("") &&
      setMauSac("") &&
      setLoaiSP("") &&
      setXuatXu("") &&
      setTayAo("") &&
      setCoAo("") &&
      setMoTa("") &&
      setGiaBan("") &&
      setTrangThai("")
    ) {
      toast.warning("Some field is empty!");
    } else {
      let res = await postAddSanPham(
        maSp,
        tenSp,
        getObjChatLieu,
        getObjMauSac,
        getObjLoaiSP,
        getObjXuatXu,
        getObjCoAo,
        getObjTayAo,
        moTa,
        giaBan,
        trangThai
      );

      console.log("Check res: ", res);
      if (res && res.idSp) {
        toast.success("Add ctsp successfully!");
        navigate("/quan-ly-san-pham/san-pham/sua-san-pham/" + res.idSp);
      } else {
        toast.error("Add ctsp failed!");
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
          <h4>THÊM SẢN PHẨM</h4>
        </div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "151ch" },
          }}
          noValidate
          autoComplete="off"
          alignItems={"center"}
        >
          <TextField
            fullWidth
            label="Mã sản phẩm"
            id="fullWidth"
            onChange={(event) => setMaSp(event.target.value)}
          />
          <TextField
            fullWidth
            label="Tên sản phẩm"
            id="fullWidth"
            onChange={(event) => setTenSp(event.target.value)}
          />
          <TextField
            fullWidth
            label="Mô tả"
            multiline
            rows={2}
            id="fullWidth"
            onChange={(event) => setMoTa(event.target.value)}
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "49ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Chất liệu"
            onChange={(event) => setChatLieu(event.target.value)}
          >
            {listCL.map((option, index) => (
              <MenuItem key={index} value={option.idCl}>
                {option.tenCl}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Màu sắc"
            onChange={(event) => setMauSac(event.target.value)}
          >
            {listMS.map((option, index) => (
              <MenuItem key={index} value={option.idMs}>
                {option.tenMs}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Loại sản phẩm"
            onChange={(event) => setLoaiSP(event.target.value)}
          >
            {listLSP.map((option, index) => (
              <MenuItem key={index} value={option.idLoaisp}>
                {option.tenLsp}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Xuất xứ"
            onChange={(event) => setXuatXu(event.target.value)}
          >
            {listXX.map((option, index) => (
              <MenuItem key={index} value={option.idXx}>
                {option.tenNuoc}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Loại cổ áo"
            onChange={(event) => setCoAo(event.target.value)}
          >
            {listCoAo.map((option, index) => (
              <MenuItem key={index} value={option.idCoAo}>
                {option.loaiCoAo}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Ống tay áo"
            onChange={(event) => setTayAo(event.target.value)}
          >
            {listTayAo.map((option, index) => (
              <MenuItem key={index} value={option.idTayAo}>
                {option.loaiTayAo}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
          textAlign={"center"}
        >
          <TextField
            id="outlined-basic"
            label="Giá bán"
            variant="outlined"
            onChange={(event) => setGiaBan(event.target.value)}
          />
        </Box>
        <div style={{ textAlign: "right", margin: "20px 0" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleClickOpenAdd()}
          >
            Thêm
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
              Bạn có chắc chắn muốn thêm sản phẩm này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Canel</Button>
            <Button onClick={() => handleSave()} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ModelAddNew;
