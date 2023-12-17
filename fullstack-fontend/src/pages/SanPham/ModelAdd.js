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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { postAddSanPham, fetchSpForAdmin } from '../../service/SanPhamService';
import { fetchXX, detailXX, postAddXuatXu, putUpdateXuatXu } from '../../service/XuatXuService';
import { fetchCL, detailCL, postAddChatLieu, putUpdateChatLieu } from '../../service/ChatLieuService';
import { fetchCoAo, detailCoAo, postAddLoaiCoAo, putUpdateLoaiCoAo } from '../../service/LoaiCoAoService';
import { fetchLSP, detailLSP, postAddLoaiSP, putUpdateLoaiSP } from '../../service/LoaiSPService';
import { fetchTayAo, detailTayAo, postAddOngTayAo, putUpdateOngTayAo } from '../../service/OngTayAoService';

import ModalQuickAtt from './ModalQuickAtt';

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
    if (tenSp.trim() === '') {
      setEmptyTen(true);
    }
    if (listSP.some((item) => item.tenSp === tenSp)) {
      setDuplicateAdd(true);
    }
    if (chatLieu === '' || loaiSP === '' || xuatXu === '' || coAo === '' || tayAo === '') {
      checkEmptyCBB();
      handleAlertClick('Không được để trống trường', 'warning');
    }
    if (
      tenSp.trim() === '' ||
      listSP.some((item) => item.tenSp === tenSp) ||
      chatLieu === '' ||
      loaiSP === '' ||
      xuatXu === '' ||
      coAo === '' ||
      tayAo === ''
    ) {
      handleClose();
    } else {
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
        9
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
    }
  };

  const [listSP, setListSP] = useState([]);
  const getListFiter = async () => {
    try {
      const res = await fetchSpForAdmin();
      console.log('Check res: ', res);
      setListSP(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  };
  useEffect(() => {
    getListFiter();
  }, []);

  // open add att
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
  }, [listCL, listLSP, listXX, listTayAo, listCoAo, phanTu]);

  // validate
  const [emptyTen, setEmptyTen] = useState(false);
  const [duplicateAdd, setDuplicateAdd] = useState(false);

  const handleTenChange = (event) => {
    const { value } = event.target;
    setTenSp(value);
    setEmptyTen(value.trim() === '');
    const isDuplicate = listSP.some((item) => item.tenSp === value);
    setDuplicateAdd(isDuplicate);
  };

  const handleAttChange = (value, setFunc, setEmpty) => {
    setFunc(value);
    setEmpty(false);
  };

  // alert
  const [emptyCL, setEmptyCL] = useState(false);
  const [emptyLSP, setEmptyLSP] = useState(false);
  const [emptyXX, setEmptyXX] = useState(false);
  const [emptyCoAo, setEmptyCoAo] = useState(false);
  const [emptyTayAo, setEmptyTayAo] = useState(false);

  const checkEmptyCBB = () => {
    if (chatLieu === '') {
      setEmptyCL(true);
    }
    if (loaiSP === '') {
      setEmptyLSP(true);
    }
    if (xuatXu === '') {
      setEmptyXX(true);
    }
    if (coAo === '') {
      setEmptyCoAo(true);
    }
    if (tayAo === '') {
      setEmptyTayAo(true);
    }
  };

  return (
    <>
      <Helmet>
        <title> Sản Phẩm | 5F Store </title>
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
                value={tenSp}
                onChange={handleTenChange}
                error={emptyTen || duplicateAdd}
                helperText={emptyTen ? 'Tên không được để trống' : duplicateAdd ? 'Tên đã tồn tại' : ''}
              />
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chất liệu</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Chất liệu"
                  value={chatLieu}
                  onChange={(event) => handleAttChange(event.target.value, setChatLieu, setEmptyCL)}
                  error={emptyCL}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Loại sản phẩm"
                  value={loaiSP}
                  onChange={(event) => handleAttChange(event.target.value, setLoaiSP, setEmptyLSP)}
                  error={emptyLSP}
                >
                  {listLSP
                    .filter((item) => item.trangThai === 0)
                    .map((option, index) => (
                      <MenuItem key={index} value={option.idLoaisp}>
                        {option.tenLsp}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Xuất xứ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Xuất xứ"
                  value={xuatXu}
                  onChange={(event) => handleAttChange(event.target.value, setXuatXu, setEmptyXX)}
                  error={emptyXX}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Loại cổ áo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Loại cổ áo"
                  value={coAo}
                  onChange={(event) => handleAttChange(event.target.value, setCoAo, setEmptyCoAo)}
                  error={emptyCoAo}
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

            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ống tay áo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Ống tay áo"
                  value={tayAo}
                  onChange={(event) => handleAttChange(event.target.value, setTayAo, setEmptyTayAo)}
                  error={emptyTayAo}
                >
                  {listTayAo
                    .filter((item) => item.trangThai === 0)
                    .map((item, index) => (
                      <MenuItem key={index} value={item.idTayAo}>
                        {item.loaiTayAo}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1} sx={{ display: 'flex', marginTop: '4px' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleOpenQuickAtt('Ống tay áo', 'idTayAo', 'maTayAo', 'loaiTayAo')}
              >
                <MoreHorizIcon />
              </Button>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Mô tả (Tùy chọn)"
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
