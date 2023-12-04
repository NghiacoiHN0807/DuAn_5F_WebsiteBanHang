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
  addFunction: PropTypes.func,
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

export default function ModalQuickAtt({ openQuickAtt, handleCloseQuickAtt, listAtt, phanTu, addFunction, getAllList }) {
  const [tenAtt, setTenAtt] = useState('');
  const [emptyErr, setEmptyErr] = useState(false);
  const [duplicateErr, setDuplicateErr] = useState(false);
  const [trangThaiAtt, setTrangAtt] = useState('');

  const handleTenChange = (event) => {
    const { value } = event.target;
    setTenAtt(value);
    setEmptyErr(value.trim() === '');
    const isDuplicate = listAtt.some((item) => item[phanTu.ten] === value);
    setDuplicateErr(isDuplicate);
  };

  const handleAdd = async () => {
    // Kiểm tra nếu giá trị là trống thì không đóng dialog
    if (tenAtt.trim() === '' || listAtt.some((item) => item[phanTu.ten] === tenAtt)) {
      setEmptyErr(true);
      setDuplicateErr(true);
    } else {
      const res = await addFunction(null, tenAtt, 0);
      getAllList();
      console.log('Check res: ', res);
      if (res && res[phanTu.ma]) {
        handleAlertClick('Thêm thành công!', 'success');
        handlCloseAdd();
      } else {
        handleAlertClick('Thêm thất bại!', 'danger');
        handlCloseAdd();
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

  const handlOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handlCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // validate

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
                          <IconButton aria-label="add an alarm" onClick={() => handlOpenUpdate()}>
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
              value={tenAtt}
              onChange={handleTenChange}
              error={emptyErr || duplicateErr}
              helperText={emptyErr ? 'Tên không được để trống' : duplicateErr ? 'Tên đã tồn tại' : ''}
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
            <TextField id="outlined-number" label="Mã" fullWidth disabled />
          </div>
          <div className="editAtt">
            <TextField id="outlined-number" label="Tên" fullWidth />
          </div>

          <div className="editAtt">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Trạng thái</FormLabel>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="0" control={<Radio />} label="Còn bán" />
                <FormControlLabel value="10" control={<Radio />} label="Ngừng kinh doanh" />
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlCloseUpdate()}>Canel</Button>
          <Button onClick={() => handlCloseUpdate()} autoFocus>
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
