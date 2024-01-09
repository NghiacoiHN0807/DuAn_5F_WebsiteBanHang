import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { returnItem } from '../../service/client/ReturnItem';
import { detailCTSP } from '../../service/ChiTietSPService';

// @mui
const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const ModalDetailItemReturn = (props) => {
  // Sle
  // Get Props
  ModalDetailItemReturn.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    itemReturnOne: PropTypes.array.isRequired,
    selectDataCart: PropTypes.array.isRequired,
    getListData: PropTypes.func.isRequired,
  };
  const { show, handleClose, itemReturnOne, selectDataCart, getListData } = props;

  const [quantity, setQuantity] = useState(1);
  const [alertContent, setAlertContent] = useState(null);
  const [reasonReturn, setReasonReturn] = useState();

  const handleDecreaseQuantity = (quantity) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = (quantity) => {
    if (itemReturnOne[8] <= quantity) {
      setAlertContent({
        type: 'error',
        message: 'Không Được Vượt Quá Số Lượng Gốc',
      });
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const handleReturn = async () => {
    if (itemReturnOne[8] < quantity) {
      setAlertContent({
        type: 'error',
        message: 'Không Được Vượt Quá Số Lượng Gốc',
      });
    } else if (reasonReturn.trim() === '') {
      setAlertContent({
        type: 'error',
        message: 'Không Được Để Trống Lý Do',
      });
    } else {
      const detailCTSP1 = await detailCTSP(itemReturnOne[10]);
      // const detailBill1 = await detailBill(itemReturnOne[0]);

      const updateHDCT = {
        idHdct: itemReturnOne[1],
        idHd: itemReturnOne[0],
        idCtsp: detailCTSP1,
        soLuong: quantity,
        donGia: itemReturnOne[9],
        lyDoHuy: reasonReturn,
        trangThai: 6,
      };
      await returnItem(updateHDCT, 1);

      setAlertContent({
        type: 'success',
        message: 'Trả Hàng Thành Công!!!',
      });
      selectDataCart();
      getListData();

      handleClose();
    }
  };

  return (
    <>
      <Container>
        <Dialog open={show} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Sản Phẩm Muốn Trả
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid
                container
                item
                xs={12}
                md={6}
                lg={6}
                sx={{ marginTop: 1, backgroundColor: 'white', alignItems: 'center' }}
              >
                <StyledProductImg
                  sx={{
                    position: 'relative',
                    width: '140px',
                    height: '180px',
                    marginLeft: '14px',
                  }}
                  alt={itemReturnOne[2] && itemReturnOne[2].split(',')[0]}
                  src={itemReturnOne[2] && itemReturnOne[2].split(',')[0]}
                />
                <div style={{ marginLeft: '16px' }}>
                  <Typography variant="body1" gutterBottom>
                    Tên Sản Phẩm: {itemReturnOne[5]}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Size: {itemReturnOne[6]}
                    <br />
                    Màu: {itemReturnOne[11]}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Số Lượng: {itemReturnOne[8]}
                  </Typography>
                </div>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={6}
                lg={6}
                sx={{ marginTop: 1, backgroundColor: 'white', alignItems: 'center' }}
              >
                <div className="soluong-number-btn d-flex justify-content-center align-items-center">
                  <Button className="soluong-btn" onClick={() => handleDecreaseQuantity(quantity)}>
                    -
                  </Button>
                  <input
                    value={quantity}
                    type="text"
                    className="soluong-number"
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)}
                  />
                  <Button className="soluong-btn" onClick={() => handleIncreaseQuantity(quantity)}>
                    +
                  </Button>
                </div>
                <TextField
                  onChange={(e) => setReasonReturn(e.target.value)}
                  id="outlined-multiline-static"
                  label="Lý Do Hủy"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleReturn}>Hoàn Trả</Button>
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

export default ModalDetailItemReturn;
