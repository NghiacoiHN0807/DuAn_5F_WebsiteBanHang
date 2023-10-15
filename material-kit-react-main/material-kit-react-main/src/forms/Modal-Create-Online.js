import { Alert, Snackbar, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { format } from 'date-fns';
import { forwardRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updatePaymentShip } from '../service/OrderManagementTimeLine';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalCreateBillOnline(props) {
  // Get Props
  ModalCreateBillOnline.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    tenKhShip: PropTypes.string.isRequired,
    sdtKHShip: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    thanhTien: PropTypes.number.isRequired,
  };
  const { open, handleClose, tenKhShip, sdtKHShip, result, thanhTien } = props;

  const param = useParams();
  const idHdParam = param.id;
  const navigate = useNavigate();

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  // Alert
  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const handleDelete = async () => {
    await updatePaymentShip(idHdParam, tenKhShip, sdtKHShip, formattedDate, result, thanhTien, 2, 0);
    navigate(`/order-management-timeline/${idHdParam}`);
    setAlertContent({
      type: 'success',
      message: 'Đặt Hàng Online Thành Công!!!',
    });
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="xl"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Xác Nhận Đơn Hàng Online'}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <TextField
            id="standard-multiline-flexible"
            label="Tên Người Nhận Hàng"
            multiline
            maxRows={4}
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={tenKhShip}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Số Điện Thoại Người Nhận Hàng"
            multiline
            maxRows={4}
            variant="outlined"
            size="small"
            defaultValue={sdtKHShip}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Địa Chỉ"
            multiline
            maxRows={4}
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
            defaultValue={result}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDelete}>Đồng Ý</Button>
        </DialogActions>
      </Dialog>
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
}
