import { useState, useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, Snackbar } from '@mui/material';
import { deleteProductOnCart } from '../service/DirectSaleSevice';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteProductOnCart(props) {
  // Get Props
  const { open, handleClose, itemDelete, selectDataCart, currentPage } = props;

  // Set maHd using useState

  const [maSp, setMaSp] = useState('');
  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  // Update maHd when information changes
  useEffect(() => {
    if (itemDelete != null) {
      setMaSp(itemDelete[4]);
    } else {
      setMaSp('');
    }
  }, [itemDelete]);
  // Handle Delete
  const handleDelete = async () => {
    await deleteProductOnCart(itemDelete[1]);
    selectDataCart(currentPage);
    setAlertContent({
      type: 'success',
      message: 'Xóa Sản Phẩm Thành Công',
    });
    handleClose();
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Xóa Sản Phẩm'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">Xóa Sản Phẩm Có Mã Là: {maSp}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleDelete}>Đồng Ý</Button>
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
}
