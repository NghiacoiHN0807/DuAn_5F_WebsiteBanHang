import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Chip,
  TextField,
  DialogTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Iconify from '../../components/iconify';

ModalQuickAtt.propTypes = {
  openQuickAtt: PropTypes.bool,
  handleCloseQuickAtt: PropTypes.func,
  listAtt: PropTypes.array,
  phanTu: PropTypes.object,
  addFunc: PropTypes.func,
  updateFunc: PropTypes.func,
  detailFunc: PropTypes.func,
  getAllList: PropTypes.func,
};

function renderTrangThai(trangThai) {
  let badgeVariant;
  let statusText;

  switch (trangThai) {
    case 0:
      badgeVariant = 'success';
      statusText = 'Còn bán';
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

export default function ModalQuickAtt({
  openQuickAtt,
  handleCloseQuickAtt,
  listAtt,
  phanTu,
  addFunc,
  updateFunc,
  detailFunc,
  getAllList,
}) {
  const [idAtt, setIdAtt] = useState('');
  const [maAtt, setMaAtt] = useState('');
  const [tenAdd, setTenAdd] = useState('');
  const [tenUpdate, setTenUpdate] = useState('');
  const [trangThaiAtt, setTrangAtt] = useState('');

  // add
  const handleAdd = async () => {
    if (tenAdd.trim() === '' || listAtt.some((item) => item[phanTu.ten] === tenAdd)) {
      setEmptyAdd(true);
      setDuplicateAdd(true);
    } else {
      const res = await addFunc(null, tenAdd, 0);
      getAllList();
      if (res && res[phanTu.ma]) {
        handleAlertClick('Thêm thành công!', 'success');
        setTenAdd('');
        handlCloseAdd();
      } else {
        handleAlertClick('Thêm thất bại!', 'danger');
        handlCloseAdd();
      }
    }
  };

  const hanldeUpdate = async () => {
    if (tenUpdate.trim() === '') {
      setEmptyAdd(true);
    } else {
      const res = await updateFunc(idAtt, maAtt, tenUpdate, trangThaiAtt);
      getAllList();
      if (res && res[phanTu.id]) {
        handleAlertClick('Cập nhật thành công!', 'success');
        handlCloseUpdate();
      } else {
        handleAlertClick('Thêm thất bại!', 'danger');
        handlCloseUpdate();
      }
    }
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

  // dong mo dialog
  const [openAdd, setOpenAdd] = useState(false);

  const handlOpenAdd = () => {
    setOpenAdd(true);
  };

  const handlCloseAdd = () => {
    setOpenAdd(false);
  };

  const [openUpdate, setOpenUpdate] = useState(false);

  const handlOpenUpdate = (id) => {
    getDetailAtt(id);
    setOpenUpdate(true);
    setEmptyUpdate(false);
  };

  const handlCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // detail
  const getDetailAtt = async (id) => {
    try {
      const res = await detailFunc(id);
      setIdAtt(res[phanTu.id]);
      setMaAtt(res[phanTu.ma]);
      setTenUpdate(res[phanTu.ten]);
      setTrangAtt(res.trangThai);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // validate
  const [emptyAdd, setEmptyAdd] = useState(false);
  const [duplicateAdd, setDuplicateAdd] = useState(false);

  const [emptyUpdate, setEmptyUpdate] = useState(false);

  const handleTenAddChange = (event) => {
    const { value } = event.target;
    setTenAdd(value);
    setEmptyAdd(value.trim() === '');
    const isDuplicate = listAtt.some((item) => item[phanTu.ten] === value);
    setDuplicateAdd(isDuplicate);
  };

  const handleTenUpdateChange = (event) => {
    const { value } = event.target;
    setTenUpdate(value);
    setEmptyUpdate(value.trim() === '');
  };

  return (
    <>
      <Dialog
        open={openQuickAtt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ maxHeight: 700 }}
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                {phanTu && phanTu.att}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handlOpenAdd()}>
                Thêm
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã</TableCell>
                      <TableCell>Tên</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listAtt.map((row, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {phanTu && phanTu.ma && row[phanTu.ma]}
                        </TableCell>
                        <TableCell>{phanTu && phanTu.ten && row[phanTu.ten]}</TableCell>
                        <TableCell>{renderTrangThai(row.trangThai)}</TableCell>
                        <TableCell>
                          <IconButton aria-label="add an alarm" onClick={() => handlOpenUpdate(row[phanTu.id])}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseQuickAtt()}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAdd}
        onClose={handlCloseAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thêm {phanTu.att !== null ? phanTu.att.toLowerCase() : ''}</DialogTitle>
        <DialogContent>
          <div className="editAtt">
            <TextField
              id="outlined-number"
              label="Nhập tên"
              fullWidth
              value={tenAdd}
              onChange={handleTenAddChange}
              error={emptyAdd || duplicateAdd}
              helperText={emptyAdd ? 'Tên không được để trống' : duplicateAdd ? 'Tên đã tồn tại' : ''}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlCloseAdd()}>Canel</Button>
          <Button onClick={() => handleAdd()} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUpdate}
        onClose={handlCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Cập nhật {phanTu.att !== null ? phanTu.att.toLowerCase() : ''}
        </DialogTitle>
        <DialogContent>
          <div className="editAtt">
            <TextField id="outlined-number" label="Mã" fullWidth disabled value={maAtt} />
          </div>
          <div className="editAtt">
            <TextField
              id="outlined-number"
              label="Tên"
              fullWidth
              value={tenUpdate}
              onChange={handleTenUpdateChange}
              error={emptyUpdate}
              helperText={emptyUpdate ? 'Tên không được để trống' : ''}
            />
          </div>

          <div className="editAtt">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Trạng thái</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={trangThaiAtt}
                onChange={(event) => setTrangAtt(event.target.value)}
              >
                <FormControlLabel value="0" control={<Radio />} label="Còn bán" />
                <FormControlLabel value="10" control={<Radio />} label="Ngừng kinh doanh" />
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlCloseUpdate()}>Canel</Button>
          <Button onClick={() => hanldeUpdate()} autoFocus>
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
