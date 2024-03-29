import { useParams } from 'react-router-dom';
import '../scss/Car-Bill-ADM.scss';
import { Alert, Backdrop, Dialog, Snackbar, TextField } from '@mui/material';
import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import { updateStatusBill } from '../service/OrderManagementTimeLine';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalUpdateStatus = (props) => {
  // Get Props
  ModalUpdateStatus.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    getListData: PropTypes.func.isRequired,
    listHTTT: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
  };
  const { show, handleClose, getListData, activeIndex, listHTTT } = props;
  const [alertContent, setAlertContent] = useState(null);

  //   Insert product
  const param = useParams();
  const idHdParam = param.id;
  const [moTa, setMoTa] = useState('');

  const handleUpdate = async () => {
    try {
      if (moTa.trim() === '') {
        setAlertContent({
          type: 'warning',
          message: 'Hãy Nhập Thêm Mô Tả',
        });
      } else {
        handleOpenBD();

        if (listHTTT.length > 0) {
          const newActiveIndex = activeIndex === 3 ? 5 : activeIndex + 1;
          const changtoHDCT = await updateStatusBill(idHdParam, moTa, newActiveIndex);
          if (changtoHDCT.status === 400) {
            setAlertContent({
              type: 'warning',
              message: changtoHDCT.data.error,
            });
          } else {
            setAlertContent({
              type: 'success',
              message: 'Đã Cập Nhập Trạng Thái Hóa Đơn!!!',
            });
          }
          handleCloseBD();
        } else {
          const changtoHDCT = await updateStatusBill(idHdParam, moTa, activeIndex + 1);
          if (changtoHDCT.status === 400) {
            setAlertContent({
              type: 'warning',
              message: changtoHDCT.data.error,
            });
          } else {
            setAlertContent({
              type: 'success',
              message: 'Đã Cập Nhập Trạng Thái Hóa Đơn!!!',
            });
          }
          handleCloseBD();
        }
        getListData();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  const [openBD, setOpenBD] = useState(false);
  const handleCloseBD = () => {
    setOpenBD(false);
  };
  const handleOpenBD = () => {
    setOpenBD(true);
  };

  return (
    <>
      <div>
        <Dialog
          open={show}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth="xl"
          sx={{ zIndex: 1200 }}
          // fullWidth
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Cập Nhập Lịch Sử Hóa Đơn Thành Công'}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-slide-description"> */}
            <div>
              <TextField
                onChange={(e) => setMoTa(e.target.value)}
                id="outlined-multiline-static"
                label="Mô Tả"
                sx={{ m: 1, marginTop: 2, marginLeft: 0 }}
                fullWidth
                maxRows={4}
                variant="outlined"
                size="small"
                multiline
              />
            </div>
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleUpdate}>Đồng Ý</Button>
          </DialogActions>
        </Dialog>{' '}
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

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBD}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default ModalUpdateStatus;
