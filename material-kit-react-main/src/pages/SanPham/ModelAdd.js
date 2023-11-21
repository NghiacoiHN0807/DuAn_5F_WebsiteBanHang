import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { postAddSanPham } from '../../service/SanPhamService';
import { fetchXX, detailXX } from '../../service/XuatXuService';
import { fetchCL, detailCL } from '../../service/ChatLieuService';
import { fetchCoAo, detailCoAo } from '../../service/LoaiCoAoService';
import { fetchLSP, detailLSP } from '../../service/LoaiSPService';
import { fetchTayAo, detailTayAo } from '../../service/OngTayAoService';

export default function AddSanPham() {
  const [tenSp, setTenSp] = useState('');
  const [moTa, setMoTa] = useState('');

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

    const res = await postAddSanPham(
      null,
      tenSp,
      getObjChatLieu,
      getObjLoaiSP,
      getObjXuatXu,
      getObjCoAo,
      getObjTayAo,
      moTa,
      0
    );

    console.log('Check res: ', res);
    if (res && res.idSp) {
      handleAlertClick('Thêm thành công!', 'success');
      handleClose();
      navigate(`/dashboard/products/update/${res.idSp}`);
    } else {
      handleAlertClick('Thêm thất bại!', 'danger');
      handleClose();
    }
  };

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Thêm sản phẩm
          </Typography>
        </Stack>

        <Card sx={{ padding: '25px' }}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <TextField
                id="fullWidth"
                label="Tên sản phẩm"
                fullWidth
                onChange={(event) => setTenSp(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>

            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Mô tả"
                multiline
                rows={4}
                fullWidth
                onChange={(event) => setMoTa(event.target.value)}
              />
            </Grid>
          </Grid>
          <div>
            <Button variant="contained" fullWidth sx={{ marginTop: '25px' }} onClick={() => handleClickOpenAdd()}>
              Thêm
            </Button>
          </div>
        </Card>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xác nhận thêm?'}</DialogTitle>
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
