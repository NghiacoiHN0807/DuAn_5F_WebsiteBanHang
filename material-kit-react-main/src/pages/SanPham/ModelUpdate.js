import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
} from '@mui/material';
import Iconify from '../../components/iconify';
import { putUpdateSanPham, detailSP } from '../../service/SanPhamService';
import { findCtspById } from '../../service/ChiTietSPService';
import { deleteAnh, fetchAnh } from '../../service/AnhService';
import { postAddCloud, deleteCloud } from '../../service/CloudinaryService';

import { fetchXX, detailXX } from '../../service/XuatXuService';
import { fetchCL, detailCL } from '../../service/ChatLieuService';
import { fetchCoAo, detailCoAo } from '../../service/LoaiCoAoService';
import { fetchLSP, detailLSP } from '../../service/LoaiSPService';
import { fetchTayAo, detailTayAo } from '../../service/OngTayAoService';

function mapTrangThai(trangThai) {
  return trangThai === 0 ? 'Còn bán' : trangThai === 10 ? 'Ngừng kinh doanh' : 'Unknown status';
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

  const [listCL, setListCL] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listXX, setListXX] = useState([]);
  const [listTayAo, setListTayAo] = useState([]);
  const [listCoAo, setListCoAo] = useState([]);
  const [listCTSP, setListCTSP] = useState([]);
  const [listImg, setListImg] = useState([]);

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
  const [open, setOpen] = useState(false);

  const handleClickOpenAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        trangThai
      );

      console.log('Check res: ', res);
      if (res && res.idSp) {
        handleAlertClick('Cập nhật thành công!', 'success');
        handleClose();
        navigate(`/dashboard/products`);
      } else {
        handleAlertClick('Cập nhật thất bại!', 'danger');
        handleClose();
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

  const uploadImage = async () => {
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
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      uploadImage();
    }
  }, [selectedImages]);

  const onDrop = useCallback((acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) => file.type.startsWith('image/'));
    setSelectedImages(imageFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handlDeleteImg = async (idImg, url) => {
    const parts = url.split('/');
    const publicId = parts[parts.length - 2].concat('/', parts[parts.length - 1].split('.')[0]);

    const ces = await deleteCloud(publicId);
    const res = await deleteAnh(idImg);
    getAnhData();
    console.log('Check ces: ', ces);
    console.log('Check res: ', res);
  };

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
            <Grid item xs={6}>
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
                    {listCL.map((item, index) => (
                      <MenuItem value={item.idCl} key={index}>
                        {item.tenCl}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>

            <Grid item xs={6}>
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
                    {listLSP.map((option, index) => (
                      <MenuItem key={index} value={option.idLoaisp}>
                        {option.tenLsp}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={6}>
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
                    {listXX.map((item, index) => (
                      <MenuItem value={item.idXx} key={index}>
                        {item.tenNuoc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={6}>
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
                    {listCoAo.map((item, index) => (
                      <MenuItem value={item.idCoAo} key={index}>
                        {item.loaiCoAo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={6}>
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
                    {listTayAo.map((option, index) => (
                      <MenuItem key={index} value={option.idTayAo}>
                        {option.loaiTayAo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <div>
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
                </RadioGroup>
              </div>
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
              onClick={() => handleClickOpenAdd()}
            >
              Cập nhật
            </Button>
          </div>
        </Card>

        <Card sx={{ padding: '25px', marginTop: '15px' }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Cập nhật thuộc tính
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} href="/dashboard/products/add">
                Thêm thuộc tính
              </Button>
            </Grid>
            <Grid item xs={12}>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listCTSP.map((row) => (
                      <TableRow key={row.idCtsp} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {row.idMs.tenMs}
                        </TableCell>
                        <TableCell>{row.idSize.tenSize}</TableCell>
                        <TableCell>{row.giaNhap}</TableCell>
                        <TableCell>{row.giaBan}</TableCell>
                        <TableCell>{row.soLuongTon}</TableCell>
                        <TableCell>{mapTrangThai(row.trangThai)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ padding: '25px', marginTop: '15px' }}>
          <div className="title" style={{ textAlign: 'center', margin: '20px 0' }}>
            <h4>THÊM ẢNH</h4>
          </div>

          <div className="image-container">
            <CardGroup>
              {listImg &&
                listImg.length > 0 &&
                listImg.map((item, index) => (
                  <Card key={index} sx={{ width: 200, marginRight: 5, marginBottom: 5 }}>
                    <CardActionArea>
                      <Box position="relative">
                        <CardMedia component="img" height="200" image={item.url} alt="green iguana" />
                        <IconButton
                          sx={{ position: 'absolute', top: 0, right: 0 }}
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
                <Card sx={{ width: 200, marginRight: 5, marginBottom: 5, padding: 2 }}>
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>
                      <AddPhotoAlternateIcon sx={{ fontSize: 40 }} /> Kéo hoặc thả ảnh vô đây, hoặc click để chọn ảnh
                    </p>
                    <p>(Ảnh tải lên có thể mất khoảng 10-15s để load ảnh, xin hãy đợi 1 chút)</p>
                  </div>
                </Card>
              )}
            </CardGroup>
          </div>
        </Card>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={() => handleClose()}>Canel</Button>
          <Button onClick={() => handleSave()} autoFocus>
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
    </>
  );
}