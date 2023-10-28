import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { deleteHD } from '../service/BillSevice';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteDirectSale(props) {
  // Get Props
  ModalDeleteDirectSale.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    information: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  };
  const { open, handleClose, information } = props;
  const [maHd, setMaHd] = useState('');
  const [alertContent, setAlertContent] = useState(null);

  useEffect(() => {
    if (information != null) {
      setMaHd(information.maHd);
    } else {
      setMaHd('');
    }
  }, [information]);

  const handleDelete = async () => {
    if (information.trangThai === 8 || information.trangThai === 0) {
      await deleteHD(information.idHd);
      setAlertContent({
        type: 'success',
        message: 'Đã xóa hóa đơn chờ thành công',
      });
    } else if (information.trangThai === 9) {
      setAlertContent({
        type: 'warning',
        message: 'Hóa đơn đã được thanh toán. Không thể xóa!!!',
      });
    } else {
      setAlertContent({
        type: 'error',
        message: 'Xóa không thành công',
      });
    }
    handleClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Xóa Hóa Đơn'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Xóa Hóa Đơn Có Mã Là: {maHd}</DialogContentText>
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
    </div>
  );
}
