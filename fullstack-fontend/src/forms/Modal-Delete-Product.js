import { useState, useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import { deleteProductOnCart } from '../service/DirectSaleSevice';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteProductOnCart(props) {
  // Get Props
  ModalDeleteProductOnCart.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
<<<<<<< HEAD
    itemDelete: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
=======
    // itemDelete: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    itemDelete: PropTypes.array.isRequired,
>>>>>>> origin/nghiant0807
    selectDataCart: PropTypes.func.isRequired,
  };
  const { open, handleClose, itemDelete, selectDataCart } = props;

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
<<<<<<< HEAD
    await deleteProductOnCart(itemDelete[1]);
    selectDataCart();
    setAlertContent({
      type: 'success',
      message: 'Xóa Sản Phẩm Thành Công',
    });
    handleClose();
=======
    if (selectDataCart.length <= 1) {
      setAlertContent({
        type: 'warning',
        message: 'Sản Phẩm Trong Hóa Đơn Không Thể Trống',
      });
    } else {
      await deleteProductOnCart(itemDelete[1]);
      selectDataCart();
      setAlertContent({
        type: 'success',
        message: 'Xóa Sản Phẩm Thành Công',
      });
      handleClose();
    }
>>>>>>> origin/nghiant0807
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
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/nghiant0807
    </>
  );
}
