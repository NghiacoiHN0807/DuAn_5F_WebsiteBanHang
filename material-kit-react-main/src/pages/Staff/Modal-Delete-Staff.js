import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, useEffect, forwardRef } from 'react';
import { deleteTaiKhoan } from '../../service/taiKhoanNhanVienService'

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteDiscount(props) {
  const { open, handleClose, information } = props;
  const [idTaiKhoan, setidTaiKhoan] = useState('');
  const [maTaiKhoan, setMaTaiKhoan] = useState('');
  const [alertContent, setAlertContent] = useState(null);

  useEffect(() => {
    if (information != null) {
      console.log(information);
      setidTaiKhoan(information.idTaiKhoan);
      setMaTaiKhoan(information.maTaiKhoan);
    } else {
      setidTaiKhoan('');
    }
  }, [information]);

  const handleDelete = async () => {
    // Kiểm tra trạng thái trước khi xóa
    if (information.trangThai === 1) {
      // Thay đổi trạng thái thành 10
      information.trangThai = 10;

      // Gửi yêu cầu xóa
      await deleteTaiKhoan(information.idTaiKhoan);

      // Cập nhật giao diện ngay lập tức
      setAlertContent({
        type: 'success',
        message: 'Xóa thành công!',
      });
    } else if (information.trangThai === 10) {
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
        <DialogTitle>{'Xóa Nhân Viên'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Xóa Mã Nhân Viên: {maTaiKhoan}</DialogContentText>
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
