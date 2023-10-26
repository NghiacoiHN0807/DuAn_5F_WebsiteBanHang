import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { remove } from '../../service/giamGiaService';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteDiscount(props) {
  const { open, handleClose, information } = props;
  const [idGgct, setIdGgct] = useState('');
  const [alertContent, setAlertContent] = useState(null);


  useEffect(() => {
    if (information != null) {
      setIdGgct(information.idGgct);
    } else {
      setIdGgct('');
    }
  }, [information]);

  const handleDelete = async () => {
    if (information.trangThai === 0) {
      console.log(information.idGgct);
      await remove(information.idGgct);
      setAlertContent({
        type: 'success',
        message: 'Xóa thành công!',
      });
    } else if (information.trangThai === 1) {
      setAlertContent({
        type: 'warning',
        message: 'Không thể xóa!!!',
      });
    } else {
      setAlertContent({
        type: 'error',
        message: 'Lỗi của chúng tôi!',
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
        <DialogTitle>{'Xóa Giảm Giá'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Xóa Giảm Giá Có Mã Là: {idGgct}</DialogContentText>
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
