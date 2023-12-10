import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { CardGroup } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import {
  Card,
  Stack,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  CardActionArea,
  CardMedia,
  Box,
  IconButton,
  FormLabel,
  Backdrop,
  Chip,
  InputAdornment,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../../components/iconify';
import { putUpdateSanPham, detailSP } from '../../service/SanPhamService';
import { findCtspById, addColorAndSize, updateNumber, detailCTSP } from '../../service/ChiTietSPService';
import { deleteAnh, fetchAnh } from '../../service/AnhService';
import { postAddCloud, deleteCloud } from '../../service/CloudinaryService';

import { fetchXX, detailXX, postAddXuatXu, putUpdateXuatXu } from '../../service/XuatXuService';
import { fetchCL, detailCL, postAddChatLieu, putUpdateChatLieu } from '../../service/ChatLieuService';
import { fetchCoAo, detailCoAo, postAddLoaiCoAo, putUpdateLoaiCoAo } from '../../service/LoaiCoAoService';
import { fetchLSP, detailLSP, postAddLoaiSP, putUpdateLoaiSP } from '../../service/LoaiSPService';
import { fetchTayAo, detailTayAo, postAddOngTayAo, putUpdateOngTayAo } from '../../service/OngTayAoService';
import { fetchMS, detailMS, postAddMauSac, putUpdateMauSac } from '../../service/MauSacService';
import { fetchSize, detailSize, postAddSize, putUpdateSize } from '../../service/SizeService';
import '../../scss/UpdateSp.scss';
import ModalQuickAtt from './ModalQuickAtt';

function renderTrangThai(trangThai) {
  let badgeVariant;
  let statusText;

  switch (trangThai) {
    case 0:
      badgeVariant = 'success';
      statusText = 'Còn bán';
      break;
    case 1:
      badgeVariant = 'warning';
      statusText = 'Đang cập nhật';
      break;
    case 10:
      badgeVariant = 'error';
      statusText = 'Ngừng kinh doanh';
      break;
    default:
      badgeVariant = 'default';
      statusText = 'Unknown status';
      break;
  }

  return <Chip label={statusText} color={badgeVariant} />;
}

function formatCurrency(price) {
  if (!price) return '0';

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  return formatter.format(price);
}

export default function UpdateSanPham() {
  const [maSp, setMaSp] = useState('');
  const [tenSp, setTenSp] = useState('');
  const [moTa, setMoTa] = useState('');
  const [trangThai, setTrangThai] = useState('0');

  const [chatLieu, setChatLieu] = useState('');
  const [loaiSP, setLoaiSP] = useState('');
  const [xuatXu, setXuatXu] = useState('');
  const [tayAo, setTayAo] = useState('');
  const [coAo, setCoAo] = useState('');

  const [mauSac, setMauSac] = useState('');
  const [size, setSize] = useState('');

  const [idCtsp, setIdCtsp] = useState('');
  const [giaNhap, setGiaNhap] = useState('');
  const [giaBan, setGiaBan] = useState('');
  const [soLuongTon, setSoLuongTon] = useState('');
  const [statusAtt, setStatusAtt] = useState('');

  const [listCL, setListCL] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);
  const [listCTSP, setListCTSP] = useState([]);
  const [listImg, setListImg] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listSize, setListSize] = useState([]);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    const resCL = await fetchCL();
    setListCL(resCL);

    const resLSP = await fetchLSP();
    setListLSP(resLSP);

    const resXX = await fetchXX();
    setListXX(resXX);

    const resTayAo = await fetchTayAo();
    setListTayAo(resTayAo);

    const resCoAo = await fetchCoAo();
    setListCoAo(resCoAo);

    const resMS = await fetchMS();
    setListMS(resMS);

    const resSize = await fetchSize();
    setListSize(resSize);
  };

  // Detail sp
  const param = useParams();
  const idSpHttp = param.id;

  const getListData = useCallback(async () => {
    try {
      const res = await detailSP(idSpHttp);
      setMaSp(res.maSp);
      setTenSp(res.tenSp);
      setMoTa(res.moTa);
      setTrangThai(res.trangThai);
      setChatLieu(res.idCl.idCl);
      setLoaiSP(res.idLsp.idLoaisp);
      setXuatXu(res.idXx.idXx);
      setTayAo(res.idTayAo.idTayAo);
      setCoAo(res.idCoAo.idCoAo);

      const resCTSP = await findCtspById(idSpHttp);
      setListCTSP(resCTSP);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [idSpHttp]);
  useEffect(() => {
    getListData();
  }, [getListData]);

  // dong mo confirm
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleClickUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const [openColorAndSize, setOpenColorAndSize] = useState(false);

  const handleClickColorAndSize = () => {
    setOpenColorAndSize(true);
  };

  const handleCloseColorAndSize = () => {
    setOpenColorAndSize(false);
  };

  // edit attributes
  const [openEditAtt, setOpenEditAtt] = useState(false);

  const getCtspNumber = async (id) => {
    try {
      const res = await detailCTSP(id);
      setIdCtsp(res.idCtsp);
      if (res.giaNhap == null || res.giaBan == null || res.soLuongTon == null) {
        setGiaNhap('');
        setGiaBan('');
        setSoLuongTon('');
      } else {
        setGiaNhap(res.giaNhap);
        setGiaBan(res.giaBan);
        setSoLuongTon(res.soLuongTon);
      }

      setStatusAtt(res.trangThai);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleClickEditAtt = (id) => {
    // setIdCtsp(id);
    getCtspNumber(id);
    setOpenEditAtt(true);
    setOpenColorAndSize(false);
    setOpenDulicateUpdate(false);
  };

  const handleClostEditAtt = () => {
    getListData();
    setOpenEditAtt(false);
  };

  // alert

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleAlertClick = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpenAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    // get object all\
    const getObjChatLieu = await detailCL(chatLieu);
    const getObjLoaiSP = await detailLSP(loaiSP);
    const getObjXuatXu = await detailXX(xuatXu);
    const getObjTayAo = await detailTayAo(tayAo);
    const getObjCoAo = await detailCoAo(coAo);

    if (
      setMaSp('') &&
      setTenSp('') &&
      setChatLieu('') &&
      setLoaiSP('') &&
      setXuatXu('') &&
      setTayAo('') &&
      setCoAo('') &&
      setMoTa('') &&
      setTrangThai('')
    ) {
      handleAlertClick('Cập nhật thất bại!', 'danger');
    } else {
      const trangThaiValue = listImg.length === 0 || listCTSP.length === 0 ? 9 : trangThai;
      const res = await putUpdateSanPham(
        idSpHttp,
        maSp,
        tenSp,
        getObjChatLieu,
        getObjLoaiSP,
        getObjXuatXu,
        getObjCoAo,
        getObjTayAo,
        moTa,
        trangThaiValue
      );

      console.log('Check res: ', res);
      if (res && res.idSp) {
        handleAlertClick('Cập nhật thành công!', 'success');
        handleCloseUpdate();
        navigate(`/dashboard/products`);
      } else {
        handleAlertClick('Cập nhật thất bại!', 'danger');
        handleCloseUpdate();
      }
    }
  };

  // image
  const getAnhData = useCallback(async () => {
    try {
      const res = await fetchAnh(idSpHttp);
      setListImg(res);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [idSpHttp]);
  useEffect(() => {
    getAnhData();
  }, [getAnhData]);

  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImage = useCallback(async () => {
    if (selectedImages.length !== 0) {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append('images', image);
        formData.append('idSp', idSpHttp);
      });
      const res = await postAddCloud(formData);
      getAnhData();
      console.log('Check res: ', res);
      setSelectedImages([]);
      const input = document.querySelector('input[type="file"]');
      if (input) {
        input.value = '';
      }
    }
  }, [selectedImages, getAnhData, idSpHttp]);

  useEffect(() => {
    if (selectedImages.length > 0) {
      uploadImage();
    }
  }, [selectedImages, uploadImage]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0 && rejectedFiles.length === 0) {
      const imageFiles = acceptedFiles.filter((file) => file.type.startsWith('image/'));
      setSelectedImages(imageFiles);
      handleOpenBD();
    }
    if (acceptedFiles.length === 0 && rejectedFiles.length > 0) {
      handleAlertClick(`Có ${rejectedFiles.length} file vượt quá dung lượng tối đa (1 MB).`, 'warning');
    }
    if (acceptedFiles.length > 0 && rejectedFiles.length > 0) {
      const imageFiles = acceptedFiles.filter((file) => file.type.startsWith('image/'));
      setSelectedImages(imageFiles);
      handleAlertClick(`Có ${rejectedFiles.length} file vượt quá dung lượng tối đa (1 MB).`, 'warning');
      handleOpenBD();
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
    maxSize: 1024 * 1024,
  });

  const handlDeleteImg = async (idImg, url) => {
    const parts = url.split('/');
    const publicId = parts[parts.length - 2].concat('/', parts[parts.length - 1].split('.')[0]);

    await deleteCloud(publicId);
    await deleteAnh(idImg);
    getAnhData();
  };

  // add color and size
  const hanldeAddColorAndSize = async () => {
    const res = await addColorAndSize(idSpHttp, mauSac, size);
    console.log('Check res: ', res);
    if (res && res.idCtsp) {
      if (res.trangThai === 1) {
        handleAlertClick('Thêm thành công!', 'success');
        handleClickEditAtt(res.idCtsp);
        handleCloseColorAndSize();
      } else {
        handleOpenDulicateUpdate();
        setIdCtsp(res.idCtsp);
      }
    } else {
      handleAlertClick('Thêm thất bại!', 'danger');
      handleCloseColorAndSize();
    }
  };

  // update number

  const handlUpdateNumber = async () => {
    const res = await updateNumber(idCtsp, giaNhap, giaBan, soLuongTon, statusAtt);
    console.log('Check res: ', res);
    if (res && res.idCtsp) {
      handleAlertClick('Cập nhật thành công!', 'success');
      handleClostEditAtt();
    } else {
      handleAlertClick('Cập nhật thất bại!', 'danger');
      handleClostEditAtt();
    }
  };

  // comfirm update
  const [openDulicateUpdate, setOpenDulicateUpdate] = useState(false);

  const handleOpenDulicateUpdate = () => {
    setOpenDulicateUpdate(true);
  };

  const handleCloseDulicateUpdate = () => {
    setOpenDulicateUpdate(false);
  };

  // backdrop
  const [openBD, setOpenBD] = useState(false);
  const handleCloseBD = () => {
    setOpenBD(false);
  };
  const handleOpenBD = () => {
    setOpenBD(true);
  };

  useEffect(() => {
    handleCloseBD();
  }, [listImg]);

  // set size
  const [isSizeSelected, setIsSizeSelected] = useState(false);

  const handleShowSize = (item) => {
    if (isSizeSelected && size === item) {
      setSize('');
      setIsSizeSelected(false);
    } else {
      setSize(item);
      setIsSizeSelected(true);
    }
  };

  // open quick att
  const [openQuickAtt, setOpenQuickAtt] = useState(false);
  const [phanTu, setPhanTu] = useState({
    att: null,
    id: null,
    ma: null,
    ten: null,
  });
  const [listAtt, setListAtt] = useState([]);
  const emptyFunc = () => {};

  const getAddFunc = (att) => {
    switch (att) {
      case 'Chất liệu':
        return postAddChatLieu;
      case 'Xuất xứ':
        return postAddXuatXu;
      case 'Loại sản phẩm':
        return postAddLoaiSP;
      case 'Loại cổ áo':
        return postAddLoaiCoAo;
      case 'Ống tay áo':
        return postAddOngTayAo;
      case 'Màu sắc':
        return postAddMauSac;
      case 'Size':
        return postAddSize;
      default:
        return emptyFunc;
    }
  };

  const getUpdateFunc = (att) => {
    switch (att) {
      case 'Chất liệu':
        return putUpdateChatLieu;
      case 'Xuất xứ':
        return putUpdateXuatXu;
      case 'Loại sản phẩm':
        return putUpdateLoaiSP;
      case 'Loại cổ áo':
        return putUpdateLoaiCoAo;
      case 'Ống tay áo':
        return putUpdateOngTayAo;
      case 'Màu sắc':
        return putUpdateMauSac;
      case 'Size':
        return putUpdateSize;
      default:
        return emptyFunc;
    }
  };

  const getDetailFunc = (att) => {
    switch (att) {
      case 'Chất liệu':
        return detailCL;
      case 'Xuất xứ':
        return detailXX;
      case 'Loại sản phẩm':
        return detailLSP;
      case 'Loại cổ áo':
        return detailCoAo;
      case 'Ống tay áo':
        return detailTayAo;
      case 'Màu sắc':
        return detailMS;
      case 'Size':
        return detailSize;
      default:
        return emptyFunc;
    }
  };

  const handleOpenQuickAtt = (att, id, ma, ten) => {
    setOpenQuickAtt(true);
    setPhanTu({ att, id, ma, ten });
  };

  const handleCloseQuickAtt = () => {
    setOpenQuickAtt(false);
  };

  useEffect(() => {
    if (phanTu.att === 'Chất liệu') {
      setListAtt(listCL);
    }
    if (phanTu.att === 'Loại sản phẩm') {
      setListAtt(listLSP);
    }
    if (phanTu.att === 'Xuất xứ') {
      setListAtt(listXX);
    }
    if (phanTu.att === 'Loại cổ áo') {
      setListAtt(listCoAo);
    }
    if (phanTu.att === 'Ống tay áo') {
      setListAtt(listTayAo);
    }
    if (phanTu.att === 'Màu sắc') {
      setListAtt(listMS);
    }
    if (phanTu.att === 'Size') {
      setListAtt(listSize);
    }
  }, [listCL, listLSP, listXX, listTayAo, listCoAo, listMS, listSize, phanTu]);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Cập nhật sản phẩm
          </Typography>
        </Stack>

        <Card sx={{ padding: '25px' }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <TextField id="fullWidth" label="Mã sản phẩm" fullWidth disabled value={maSp} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="fullWidth"
                label="Tên sản phẩm"
                fullWidth
                onChange={(event) => setTenSp(event.target.value)}
                value={tenSp}
              />
            </Grid>
            <Grid item xs={5}>
              {listCL.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Chất liệu</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Chất liệu"
                    value={chatLieu}
                    onChange={(event) => setChatLieu(event.target.value)}
                  >
                    {listCL
                      .filter((item) => item.trangThai === 0)
                      .map((item, index) => (
                        <MenuItem value={item.idCl} key={index}>
                          {item.tenCl}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleOpenQuickAtt('Chất liệu', 'idCl', 'maCl', 'tenCl')}
              >
                <MoreHorizIcon />
              </Button>
            </Grid>

            <Grid item xs={5}>
              {listLSP.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Loại sản phẩm"
                    value={loaiSP}
                    onChange={(event) => setLoaiSP(event.target.value)}
                  >
                    {listLSP
                      .filter((item) => item.trangThai === 0)
                      .map((item, index) => (
                        <MenuItem key={index} value={item.idLoaisp}>
                          {item.tenLsp}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleOpenQuickAtt('Loại sản phẩm', 'idLoaisp', 'maLsp', 'tenLsp')}
              >
                <MoreHorizIcon />
              </Button>
            </Grid>

            <Grid item xs={5}>
              {listXX.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Xuất xứ</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Xuất xứ"
                    value={xuatXu}
                    onChange={(event) => setXuatXu(event.target.value)}
                  >
                    {listXX
                      .filter((item) => item.trangThai === 0)
                      .map((item, index) => (
                        <MenuItem value={item.idXx} key={index}>
                          {item.tenNuoc}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleOpenQuickAtt('Xuất xứ', 'idXx', 'maXx', 'tenNuoc')}
              >
                <MoreHorizIcon />
              </Button>
            </Grid>

            <Grid item xs={5}>
              {listCoAo.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Loại cổ áo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Loại cổ áo"
                    value={coAo}
                    onChange={(event) => setCoAo(event.target.value)}
                  >
                    {listCoAo
                      .filter((item) => item.trangThai === 0)
                      .map((item, index) => (
                        <MenuItem value={item.idCoAo} key={index}>
                          {item.loaiCoAo}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleOpenQuickAtt('Loại cổ áo', 'idCoAo', 'maCoAo', 'loaiCoAo')}
              >
                <MoreHorizIcon />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={10}>
                  {listTayAo.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Ống tay áo</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Ống tay áo"
                        value={tayAo}
                        onChange={(event) => setTayAo(event.target.value)}
                      >
                        {listTayAo
                          .filter((item) => item.trangThai === 0)
                          .map((option, index) => (
                            <MenuItem key={index} value={option.idTayAo}>
                              {option.loaiTayAo}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', marginTop: '4px' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => handleOpenQuickAtt('Ống tay áo', 'idTayAo', 'maTayAo', 'loaiTayAo')}
                  >
                    <MoreHorizIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{ marginTop: '15px' }}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Còn bán"
                      checked={Number(trangThai) === 0}
                      onChange={(event) => setTrangThai(event.target.value)}
                    />
                    <FormControlLabel
                      value="10"
                      control={<Radio />}
                      label="Ngừng kinh doanh"
                      checked={Number(trangThai) === 10}
                      onChange={(event) => setTrangThai(event.target.value)}
                    />
                    <FormControlLabel
                      value="9"
                      control={<Radio />}
                      label="Đang cập nhật"
                      checked={Number(trangThai) === 9}
                      onChange={(event) => setTrangThai(event.target.value)}
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Mô tả"
                multiline
                rows={4}
                fullWidth
                onChange={(event) => setMoTa(event.target.value)}
                value={moTa}
              />
            </Grid>
          </Grid>
          <div>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ marginTop: '25px' }}
              onClick={() => handleClickUpdate()}
            >
              Cập nhật
            </Button>
          </div>
        </Card>

        <Card sx={{ padding: '25px', marginTop: '15px' }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Cập nhật thuộc tính
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search User..."
              />
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => handleClickColorAndSize()}
              >
                Thêm thuộc tính
              </Button>
            </Grid>
            <Grid item xs={12}>
              {listCTSP.length > 0 && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Màu sắc</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Giá nhập</TableCell>
                        <TableCell>Giá bán</TableCell>
                        <TableCell>Số lượng tồn</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listCTSP.map((row) => (
                        <TableRow key={row.idCtsp} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {row.idMs.tenMs}
                          </TableCell>
                          <TableCell>{row.idSize.tenSize}</TableCell>
                          <TableCell>{formatCurrency(row.giaNhap)}</TableCell>
                          <TableCell>{formatCurrency(row.giaBan)}</TableCell>
                          <TableCell>{row.soLuongTon}</TableCell>
                          <TableCell>{renderTrangThai(row.trangThai)}</TableCell>
                          <TableCell>
                            <IconButton aria-label="add an alarm" onClick={() => handleClickEditAtt(row.idCtsp)}>
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ padding: '25px', marginTop: '15px' }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: '20px' }}>
            Cập nhật hình ảnh
          </Typography>

          <div className="image-container">
            <CardGroup>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {listImg &&
                  listImg.length > 0 &&
                  listImg.map((item, index) => (
                    <Grid item xs={2.3} key={index}>
                      <Card key={index} sx={{ width: 200, marginRight: 5, marginBottom: 5 }}>
                        <CardActionArea>
                          <Box position="relative">
                            <CardMedia component="img" height="200" image={item.url} alt="green iguana" />
                          </Box>
                        </CardActionArea>
                        <IconButton
                          sx={{ position: 'absolute', top: 0, right: 0 }}
                          size="small"
                          color="primary"
                          onClick={() => handlDeleteImg(item.idImage, item.url)}
                        >
                          <DeleteIcon sx={{ color: pink[500], fontSize: 40 }} />
                        </IconButton>
                      </Card>
                    </Grid>
                  ))}

                {listImg.length < 10 && (
                  <Grid item xs={2.3}>
                    <Card sx={{ width: 200, marginRight: 5, marginBottom: 5, padding: 2 }}>
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>
                          <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
                          {'Kéo hoặc thả ảnh vô đây, hoặc click để chọn ảnh! (Lưu ý dung lượng ảnh phải <= 1 MB)'}
                        </p>
                      </div>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </CardGroup>
          </div>
        </Card>
      </Container>
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xác nhận sửa?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn sửa sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseUpdate()}>Canel</Button>
          <Button onClick={() => handleSave()} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openColorAndSize}
        onClose={handleCloseColorAndSize}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Thêm thuộc tính'}</DialogTitle>
        <DialogContent>
          <div className="listMauSac">
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={10}>
                {listMS.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Màu sắc"
                      value={mauSac}
                      onChange={(event) => setMauSac(event.target.value)}
                    >
                      {listMS.map((item, index) => (
                        <MenuItem value={item.idMs} key={index}>
                          {item.tenMs}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>

              <Grid item xs={1} sx={{ display: 'flex', marginTop: '4px' }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleOpenQuickAtt('Màu sắc', 'idMs', 'maMs', 'tenMs')}
                >
                  <MoreHorizIcon />
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className="listSize">
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, marginTop: '50px' }}>
              {listLSP.length > 0 && (
                <div>
                  Size:{' '}
                  {listSize.map((item, itemIndex) => (
                    <Button
                      style={{
                        marginRight: '4px',
                        marginBottom: '4px',
                      }}
                      key={`size-button-${itemIndex}`}
                      onClick={() => handleShowSize(item.idSize)}
                      variant={size === item.idSize ? 'contained' : 'outlined'}
                      value={size}
                      size="small"
                    >
                      {item.tenSize}
                    </Button>
                  ))}
                  <Button
                    style={{
                      marginRight: '4px',
                      marginBottom: '4px',
                    }}
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpenQuickAtt('Size', 'idSize', 'maSize', 'tenSize')}
                  >
                    +
                  </Button>
                </div>
              )}
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseColorAndSize()}>Canel</Button>
          <Button onClick={() => hanldeAddColorAndSize()} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditAtt}
        onClose={handleClostEditAtt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Cập nhật số lượng và trạng thái'}</DialogTitle>
        <DialogContent>
          <div className="editAtt">
            <TextField
              id="outlined-number"
              label="Giá nhập"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={giaNhap}
              onChange={(event) => setGiaNhap(event.target.value)}
            />
          </div>
          <div className="editAtt">
            <TextField
              id="outlined-number"
              label="Giá bán"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={giaBan}
              onChange={(event) => setGiaBan(event.target.value)}
            />
          </div>
          <div className="editAtt">
            <TextField
              id="outlined-number"
              label="Số lượng tồn"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={soLuongTon}
              onChange={(event) => setSoLuongTon(event.target.value)}
            />
          </div>
          <div className="editAtt">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Trạng thái</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={statusAtt}
                onChange={(event) => setStatusAtt(event.target.value)}
              >
                <FormControlLabel value="0" control={<Radio />} label="Còn bán" />
                <FormControlLabel value="10" control={<Radio />} label="Ngừng kinh doanh" />
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClostEditAtt()}>Canel</Button>
          <Button onClick={() => handlUpdateNumber()} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDulicateUpdate}
        onClose={handleCloseDulicateUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Thuộc tính đã tồn tại!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn chuyển đến trang cập nhật thuộc tính?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDulicateUpdate()}>Canel</Button>
          <Button onClick={() => handleClickEditAtt(idCtsp)} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBD}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <ModalQuickAtt
        openQuickAtt={openQuickAtt}
        handleCloseQuickAtt={handleCloseQuickAtt}
        listAtt={listAtt}
        phanTu={phanTu}
        addFunc={getAddFunc(phanTu.att)}
        updateFunc={getUpdateFunc(phanTu.att)}
        detailFunc={getDetailFunc(phanTu.att)}
        getAllList={getAllList}
      />
    </>
  );
}
