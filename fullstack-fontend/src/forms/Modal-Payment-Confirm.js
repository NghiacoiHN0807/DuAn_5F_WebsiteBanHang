import { useNavigate, useParams } from 'react-router-dom';
import '../scss/Car-Bill-ADM.scss';
import { Alert, Dialog, FormControlLabel, Snackbar, Switch, TextField } from '@mui/material';
import { useState, forwardRef } from 'react';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';
import { paymentOnline } from '../service/BillSevice';
import { updatePayment } from '../service/OrderManagementTimeLine';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalPaymentComfirm = (props) => {
  // Get Props
  ModalPaymentComfirm.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    sdtKHTT: PropTypes.string.isRequired,
    tenKhTT: PropTypes.string.isRequired,
    thanhTien: PropTypes.number.isRequired,
    listHD: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
  const { show, handleClose, listHD, thanhTien, tenKhTT, sdtKHTT } = props;

  //   Insert product
  const param = useParams();
  const idHdParam = param.id;
  const [moTa, setMoTa] = useState('');
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  const navigate = useNavigate();

  //   Show  payment online
  const [isDeliveryChecked, setIsDeliveryChecked] = useState(false);

  const handleDeliveryChange = (event) => {
    setIsDeliveryChecked(event.target.checked);
    setChangeAmount(0);
  };

  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const handlePaymentOnCash = async () => {
    try {
      if (isDeliveryChecked === true) {
        const cashGivenValue = parseFloat(cashGiven);
        if (!Number.isNaN(cashGivenValue)) {
          const change = thanhTien - cashGivenValue;
          if (change < 0) {
            setAlertContent({
              type: 'warning',
              message: 'Tiền Mặt Khách Đưa Đã Dư',
            });
          } else if (change < 10000) {
            setAlertContent({
              type: 'warning',
              message: 'Tiền Chuyển Khoản Phải Trên 10000',
            });
          } else {
            console.log('Check listHD: ', listHD);
            const paymentOn = await paymentOnline(changeAmount, listHD.idHd);
            console.log('Check paymentOn: ', paymentOn);
            // Mở tab mới với đường dẫn URL
            window.location.href = paymentOn;
          }
        } else {
          setChangeAmount(0);
        }
      } else {
        const cashGivenValue = parseFloat(cashGiven);
        const change = cashGivenValue - thanhTien;

        if (change < 0) {
          setAlertContent({
            type: 'warning',
            message: 'Tiền Khách Đưa Chưa Đủ',
          });
        } else {
          await updatePayment(idHdParam, tenKhTT, sdtKHTT, formattedDate, thanhTien, cashGiven, change, 1, 9);
          setAlertContent({
            type: 'success',
            message: 'Thanh Toán Tại Quầy Thành Công!!!',
          });
          navigate(`/order-management-timeline/${idHdParam}`);
        }
      }
    } catch (e) {
      console.error('Error updating', e);
    }
  };
  //   Payment
  const [cashGiven, setCashGiven] = useState('');
  const [changeAmount, setChangeAmount] = useState(0);

  const handleCalculateChange = () => {
    const cashGivenValue = parseFloat(cashGiven);

    let change = 0;

    if (!Number.isNaN(cashGivenValue)) {
      if (isDeliveryChecked === true) {
        change = thanhTien - cashGivenValue;
      } else {
        change = cashGivenValue - thanhTien;
      }
    }

    if (change < 0) {
      setAlertContent({
        type: 'warning',
        message: isDeliveryChecked ? 'Tiền Mặt Khách Đưa Đã Dư' : 'Tiền Khách Đưa Chưa Đủ',
      });
      setChangeAmount(0);
    } else {
      setChangeAmount(change);
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={show}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth="xl"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'THANH TOÁN HÓA ĐƠN'}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-slide-description"> */}
            <div>
              <TextField
                id="standard-multiline-flexible"
                label="Mã Hóa Đơn"
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={listHD.maHd}
                fullWidth
                sx={{ marginTop: 2 }}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Thành Tiền"
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={thanhTien}
                fullWidth
                sx={{ marginTop: 2 }}
              />
              <TextField
                onChange={(e) => setMoTa(e.target.value)}
                id="outlined-multiline-static"
                label="Mô Tả"
                sx={{ m: 1, marginTop: 2, marginLeft: 0 }}
                fullWidth
                maxRows={4}
                variant="outlined"
                size="small"
                multiline
              />
              <FormControlLabel control={<Switch />} onChange={handleDeliveryChange} label="Thanh Toán Online" />
              {isDeliveryChecked ? (
                <>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Số Tiền Mặt Gửi"
                    type="number"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={0}
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    onChange={(e) => setCashGiven(e.target.value)}
                  />
                  <Button
                    sx={{ marginBottom: 2 }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleCalculateChange}
                  >
                    Tính Tiền
                  </Button>
                  <span>Số Tiền Chuyển Khoản: {changeAmount}</span>
                </>
              ) : (
                <>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Số Tiền Khách Gửi"
                    type="number"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    onChange={(e) => setCashGiven(e.target.value)}
                  />
                  <Button
                    sx={{ marginBottom: 2 }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleCalculateChange}
                  >
                    Tính Tiền
                  </Button>
                  <span>Số Tiền Thừa Của Khách: {changeAmount}</span>
                </>
              )}
            </div>
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handlePaymentOnCash}>Đồng Ý</Button>
          </DialogActions>
        </Dialog>
      </div>
      {alertContent && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={alertContent.type} sx={{ width: '100%' }}>
            {alertContent.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
export default ModalPaymentComfirm;
