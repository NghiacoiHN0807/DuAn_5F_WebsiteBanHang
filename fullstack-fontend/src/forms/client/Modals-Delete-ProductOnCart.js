import { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { deleteProductOnCart } from '../../service/client/Detail-Cart';

// @mui

const ModalDeleteProductClient = (props) => {
  // Sle
  // Get Props
  ModalDeleteProductClient.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    getDetail: PropTypes.func.isRequired,
    itemToDelete: PropTypes.object.isRequired,
  };
  const { show, handleClose, itemToDelete, getDetail } = props;
  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  const handleDelete = async () => {
    try {
      await deleteProductOnCart(itemToDelete.idGhct);
      setAlertContent({
        type: 'success',
        message: 'Đã Xóa Sản Phẩm',
      });
      getDetail();
      handleClose();
    } catch (error) {
      setAlertContent({
        type: 'error',
        message: 'Xóa Sản Phẩm Không Thành Công',
      });
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Dialog open={show} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Xóa Sản Phẩm
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 5 }}>
              Bạn Có Muốn Xóa Sản Phẩm {itemToDelete.idCtsp.idSp.tenSp} Ra Khỏi Giỏ Hàng Không???
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleDelete}>Xóa Sản Phẩm</Button>
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
      </Container>
    </>
  );
};

export default ModalDeleteProductClient;
