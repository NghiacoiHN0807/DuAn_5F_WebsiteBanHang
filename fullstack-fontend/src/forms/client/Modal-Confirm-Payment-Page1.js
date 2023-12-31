import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import {
  deleteProductOnCartPayment,
  paymentOnlineClient,
  updateClientPayment,
  updateClientPayment1,
} from '../../service/client/Payment';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalConfirmPayment1(props) {
  // Get Props
  ModalConfirmPayment1.propTypes = {
    open: PropTypes.bool.isRequired,
    isDeliveryChecked: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    tenKH: PropTypes.string.isRequired,
    sdtKH: PropTypes.string.isRequired,
    emailKH: PropTypes.string.isRequired,
    diaChi: PropTypes.string.isRequired,
    thanhTien: PropTypes.string.isRequired,
  };
  const { open, handleClose, isDeliveryChecked, thanhTien, diaChi, tenKH, sdtKH, emailKH } = props;

  // Set maHd using useState

  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  const param = useParams();
  const idHdParam = param.id;
  const navigate = useNavigate();

  // Handle Delete
  const handleConfirm = async () => {
    if (isDeliveryChecked && isDeliveryChecked === true) {
      await updateClientPayment1(idHdParam, tenKH, sdtKH, emailKH, diaChi);
      setAlertContent({
        type: 'success',
        message: 'Hãy Thanh Toán Trước. Cảm Ơn!!!',
      });
      const paymentOn = await paymentOnlineClient(thanhTien, idHdParam);
      window.location.href = paymentOn;
    } else {
      setAlertContent({
        type: 'success',
        message: 'Đã Đặt Hàng Thành Công. Xin Cảm Ơn!!!',
      });
      await deleteProductOnCartPayment(idHdParam);
      await updateClientPayment(idHdParam, tenKH, sdtKH, emailKH, diaChi);
      navigate(`/client/client-timeline/${idHdParam}`);
    }
    // console.log('DataCart: ', DataCart);
    // if (DataCart.length <= 1) {
    //   setAlertContent({
    //     type: 'warning',
    //     message: 'Sản Phẩm Trong Hóa Đơn Không Thể Trống',
    //   });
    // } else {
    //   await deleteProductOnCart(itemDelete[1]);
    //   selectDataCart();
    //   setAlertContent({
    //     type: 'success',
    //     message: 'Xóa Sản Phẩm Thành Công',
    //   });
    //   handleClose();
    // }
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
          <DialogTitle>{'Xác Nhận Đặt Hàng'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {isDeliveryChecked && isDeliveryChecked === true
                ? 'Bạn Có Muốn Thanh Toán Online?'
                : 'Bạn Có Muốn Thanh Toán Khi Nhận Hàng?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleConfirm}>Đồng Ý</Button>
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
    </>
  );
}
