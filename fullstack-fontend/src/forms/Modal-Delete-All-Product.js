import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { deleteProductOnCart } from '../service/DirectSaleSevice';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteAllProductOnCart(props) {
  // Get Props
  ModalDeleteAllProductOnCart.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectDataCart: PropTypes.func.isRequired,
    DataCart: PropTypes.array.isRequired,
  };
  const { open, handleClose, selectDataCart, DataCart } = props;

  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  // Handle Delete
  const handleDelete = async () => {
    const deletePromises = DataCart.map(async (item) => {
      try {
        await deleteProductOnCart(item[1]);
        setAlertContent({
          type: 'success',
          message: 'Đã Xóa Tất Cả Sản Phẩm Ra Khỏi Giỏ Hàng',
        });
      } catch (error) {
        setAlertContent({
          type: 'warning',
          message: 'Lỗi Xóa Tất Cả Sản Phẩm Ra Khỏi Giỏ Hàng',
        });
        console.error(error);
      }
    });

    // Wait for all deletePromises to complete
    await Promise.all(deletePromises);

    selectDataCart(0);
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
          <DialogTitle>{'Xóa Tất Cả Sản Phẩm'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Bạn Có Chắc Muốn Xóa Tất Cả Không?
            </DialogContentText>
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
