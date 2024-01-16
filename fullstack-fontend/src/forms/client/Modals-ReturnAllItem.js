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
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { returnAllItem } from '../../service/client/ReturnItem';

// @mui

const ModalAllItemReturn = (props) => {
  // Sle
  // Get Props
  ModalAllItemReturn.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCloseModalReturnOne: PropTypes.func.isRequired,

    selectDataCart: PropTypes.func.isRequired,
    getListData: PropTypes.func.isRequired,
  };
  const { show, handleClose, selectDataCart, getListData, handleCloseModalReturnOne } = props;

  const [alertContent, setAlertContent] = useState(null);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  const [reasonReturn, setReasonReturn] = useState('');

  const param = useParams();
  const idHdParam = param.id;
  const handleReturnAll = async () => {
    if (reasonReturn.trim() === '') {
      setAlertContent({
        type: 'warning',
        message: 'Không Được Để Trống Lý Do',
      });
    } else {
      const changtoHDCT = await returnAllItem(idHdParam, reasonReturn, 6);

      if (changtoHDCT.status === 400) {
        setAlertContent({
          type: 'warning',
          message: changtoHDCT.data.error,
        });
      } else {
        setAlertContent({
          type: 'success',
          message: 'Trả Hàng Thành Công!!!',
        });
        selectDataCart();
        getListData();
        handleClose();
        handleCloseModalReturnOne();
      }
    }
  };

  return (
    <>
      <Container>
        <Dialog open={show} onClose={handleClose} maxWidth="xl">
          <DialogTitle>
            <Typography variant="h5" sx={{ mb: 5 }}>
              Lý Do Muốn Trả Sản Phẩm
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginTop: 2 }}
              onChange={(e) => setReasonReturn(e.target.value)}
              id="outlined-multiline-static"
              label="Lý Do Hủy"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleReturnAll}>Hoàn Trả Tất Cả</Button>
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

export default ModalAllItemReturn;
