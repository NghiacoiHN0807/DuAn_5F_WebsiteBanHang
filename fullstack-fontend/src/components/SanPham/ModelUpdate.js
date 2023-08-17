import { useEffect, useState } from "react";
import { putUpdateSanPham } from "../../services/SanPhamService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { fetchXX, detailXX } from "../../services/XuatXuService";
import { fetchCL, detailCL } from "../../services/ChatLieuService";
import { fetchCoAo, detailCoAo } from "../../services/LoaiCoAoService";
import { fetchLSP, detailLSP } from "../../services/LoaiSPService";
import { fetchMS, detailMS } from "../../services/MauSacService";
import { detailSize, fetchSize } from "../../services/SizeService";
import { fetchTayAo, detailTayAo } from "../../services/OngTayAoService";
import { detailSP } from "../../services/SanPhamService";
import { deleteAnh, fetchAnh } from "../../services/AnhService";
import { postAddCloud, deleteCloud } from "../../services/CloudinaryService";
import {
  findSizeById,
  postAddCTSP,
  deleteCTSP,
} from "../../services/ChiTietSPService";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Badge, CardGroup } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import "../../scss/ImgSanPham.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const QuantityInput = ({ value, onChange }) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    onChange(parseInt(inputValue, 10));
  };

  return (
    <div>
      <ButtonGroup>
        <ToggleButton variant="outline-success" onClick={handleDecrease}>
          -
        </ToggleButton>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          style={{ width: "50px", textAlign: "center" }}
        />
        <ToggleButton variant="outline-success" onClick={handleIncrease}>
          +
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
};

const ModelUpdate = (props) => {
  // const [idCtsp, setIdCtsp] = useState("");
  const [maSp, setMaSp] = useState("");
  const [tenSp, setTenSp] = useState("");
  const [moTa, setMoTa] = useState("");
  const [giaBan, setGiaBan] = useState("");
  const [trangThai, setTrangThai] = useState("");

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
  const [listSize, setListSize] = useState([]);
  const [listCTSP, setListCTSP] = useState([]);
  const [listImg, setListImg] = useState([]);

  const [radioValue, setRadioValue] = useState("1");

  // get param
  const param = useParams();
  const idSpHttp = param.id;

  useEffect(() => {
    getAllList();

    return () => {
      // Cleanup
    };
  }, []);

  // get data size
  const getSizeData = useCallback(async () => {
    try {
      let res = await findSizeById(idSpHttp);
      setListCTSP(res);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [idSpHttp]);
  useEffect(() => {
    getSizeData();
  }, [getSizeData]);

  //Select data
  const getListData = useCallback(async () => {
    try {
      let res = await detailSP(idSpHttp);
      setMaSp(res.maSp);
      setTenSp(res.tenSp);
      setMoTa(res.moTa);
      setGiaBan(res.giaBan);
      setTrangThai(res.trangThai);

      setChatLieu(res.idCl.idCl);
      setMauSac(res.idMs.idMs);
      setLoaiSP(res.idLsp.idLoaisp);
      setXuatXu(res.idXx.idXx);
      setTayAo(res.idTayAo.idTayAo);
      setCoAo(res.idCoAo.idCoAo);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [idSpHttp]);
  useEffect(() => {
    getListData();
  }, [getListData]);

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

    let resSize = await fetchSize();
    setListSize(resSize);
  };

  // chuyen trang
  const navigate = useNavigate();

  const handleUpdate = async () => {
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
      let res = await putUpdateSanPham(
        idSpHttp,
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
        toast.success("Cập nhật thành công!");
        navigate("/quan-ly-san-pham/san-pham");
      } else {
        toast.error("Cập nhật thất bại!");
      }
    }
  };

  // show form add size
  const [openAddSize, setOpenAddSize] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleClickAddSize = () => {
    setOpenAddSize(true);
  };

  const handleClickUpdate = () => {
    setOpenUpdate(true);
  };

  const handleClose = () => {
    setOpenAddSize(false);
    setOpenUpdate(false);
  };

  const hanldeAgree = async () => {
    let getObjSp = await detailSP(idSpHttp);
    let getObjSize = await detailSize(radioValue);

    let res = await postAddCTSP(getObjSp, getObjSize, quantity, 0, quantity);
    console.log("Check res: ", res);
    if (res && res.idCtsp) {
      toast.success("Thêm thành công!");
    } else {
      toast.error("Thêm thất bại!");
    }
    setOpenAddSize(false);
    getSizeData();
    setQuantity(1);
    setRadioValue("");
  };

  const hanldeDelete = async (idCtsp) => {
    let res = await deleteCTSP(idCtsp);
    console.log("Check res: ", res);
    getSizeData();
  };
  // size
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const [quantity, setQuantity] = useState(1);

  // image

  const getAnhData = useCallback(async () => {
    try {
      let res = await fetchAnh(idSpHttp);
      setListImg(res);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [idSpHttp]);
  useEffect(() => {
    getAnhData();
  }, [getAnhData]);

  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImage = async () => {
    if (selectedImages.length !== 0) {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append("images", image);
        formData.append("idSp", idSpHttp);
      });
      let res = await postAddCloud(formData);
      getAnhData();
      console.log("Check res: ", res);
      setSelectedImages([]);
      const input = document.querySelector('input[type="file"]');
      if (input) {
        input.value = "";
      }
    }
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      uploadImage();
    }
  }, [selectedImages]);

  const onDrop = useCallback((acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setSelectedImages(imageFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const handlDeleteImg = async (idImg, url) => {
    const parts = url.split("/");
    const publicId =
      parts[parts.length - 2] + "/" + parts[parts.length - 1].split(".")[0];

    let ces = await deleteCloud(publicId);
    let res = await deleteAnh(idImg);
    getAnhData();
    console.log("Check ces: ", ces);
    console.log("Check res: ", res);
  };

  // icon add image

  return (
    <>
      <div className="row row-order-management">
        <div
          className="title"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          <h4>CẬP NHẬT SẢN PHẨM</h4>
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
            value={maSp}
            onChange={(event) => setMaSp(event.target.value)}
          />
          <TextField
            fullWidth
            label="Tên sản phẩm"
            id="fullWidth"
            value={tenSp}
            onChange={(event) => setTenSp(event.target.value)}
          />
          <TextField
            fullWidth
            label="Mô tả"
            multiline
            rows={2}
            id="fullWidth"
            value={moTa}
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
            value={chatLieu}
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
            value={mauSac}
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
            value={loaiSP}
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
            value={xuatXu}
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
            value={coAo}
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
            value={tayAo}
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
            "& .MuiTextField-root": { m: 1, width: "49ch" },
          }}
          noValidate
          autoComplete="off"
          marginLeft={"160px"}
        >
          <TextField
            id="outlined-basic"
            label="Giá bán"
            variant="outlined"
            value={giaBan}
            onChange={(event) => setGiaBan(event.target.value)}
          />

          <FormControl style={{ marginLeft: "10px" }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Trạng thái
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Kinh doanh"
                checked={Number(trangThai) === 0 ? "true" : ""}
                onChange={(event) => setTrangThai(event.target.value)}
              />
              <FormControlLabel
                value="10"
                control={<Radio />}
                label="Ngừng kinh doanh"
                checked={Number(trangThai) === 10 ? "true" : ""}
                onChange={(event) => setTrangThai(event.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <div style={{ textAlign: "right", margin: "20px 0" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleClickUpdate()}
          >
            Cập nhật
          </Button>
        </div>
      </div>
      <div className="row row-order-management">
        <div
          className="title"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          <h4>KÍCH THƯỚC VÀ SỐ LƯỢNG</h4>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Kích Cỡ</TableCell>
                  <TableCell>Số Lượng</TableCell>
                  <TableCell>Trạng Thái</TableCell>
                  <TableCell>Thao Tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCTSP &&
                  listCTSP.length > 0 &&
                  listCTSP.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.idSize.tenSize}
                      </TableCell>
                      <TableCell>{item.soLuongTon}</TableCell>
                      <TableCell>
                        {item.trangThai === 0 ? (
                          <Badge bg="success" text="dark">
                            Hoạt động
                          </Badge>
                        ) : item.trangThai === 10 ? (
                          <Badge bg="warning" text="dark">
                            Ngừng hoạt động
                          </Badge>
                        ) : (
                          <Badge variant="light" text="dark">
                            Unknown status
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => hanldeDelete(item.idCtsp)}
                        >
                          Đổi trạng thái
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Button variant="outlined" onClick={handleClickAddSize}>
            Thêm kích thước
          </Button>

          <Dialog
            open={openAddSize}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={"sm"}
            maxWidth={"sm"}
          >
            <DialogContent>
              <div>
                {" "}
                <p>Chọn size: </p>
                {listSize.map((radio, idx) => (
                  <span style={{ marginLeft: "15px" }}>
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={"outline-success"}
                      name="radio"
                      value={radio.idSize}
                      checked={Number(radioValue) === radio.idSize} // Sửa thành radioValue === radio.idSize
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.tenSize}
                    </ToggleButton>
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "15px" }}>
                <p>Số lượng: </p>
                <QuantityInput
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Canel</Button>
              <Button onClick={() => hanldeAgree()} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openUpdate}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Xác nhận cập nhật?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có chắc chắn muốn cập nhật sản phẩm này không?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Canel</Button>
              <Button onClick={() => handleUpdate()} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className="row row-order-management">
        <div
          className="title"
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          <h4>THÊM ẢNH</h4>
        </div>

        <div className="image-container">
          <CardGroup>
            {listImg &&
              listImg.length > 0 &&
              listImg.map((item, index) => (
                <Card sx={{ width: 200, marginRight: 5, marginBottom: 5 }}>
                  <CardActionArea>
                    <Box position="relative">
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.url}
                        alt="green iguana"
                      />
                      <IconButton
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        size="small"
                        color="primary"
                        onClick={() => handlDeleteImg(item.idImage, item.url)}
                      >
                        <DeleteIcon sx={{ color: pink[500], fontSize: 40 }} />
                      </IconButton>
                    </Box>
                  </CardActionArea>
                </Card>
              ))}
            {listImg.length < 10 && (
              <Card
                sx={{ width: 200, marginRight: 5, marginBottom: 5, padding: 2 }}
              >
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>
                    <AddPhotoAlternateIcon sx={{ fontSize: 40 }} /> Kéo hoặc thả
                    ảnh vô đây, hoặc click để chọn ảnh
                  </p>
                  <p>
                    (Ảnh tải lên có thể mất khoảng 10-15s để load ảnh, xin hãy
                    đợi 1 chút)
                  </p>
                </div>
              </Card>
            )}
          </CardGroup>
        </div>
      </div>
    </>
  );
};
export default ModelUpdate;
