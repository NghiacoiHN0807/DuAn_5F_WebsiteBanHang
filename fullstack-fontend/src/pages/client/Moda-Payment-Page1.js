import { Alert, Card, CardActionArea, CardContent, CardMedia, Radio, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, useEffect, forwardRef } from 'react';
import logo5F from '../../assets/logo_5F.png';
import { getAll, insertHd } from '../../service/CouponsService';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalPaymentPage(props) {
  const { open, handleClose, information, getDetailHD } = props;
  const [idHD, setIdhd] = useState('');
  const [code, setCode] = useState('');
  const [hoaDon, setHoaDon] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [alertContent, setAlertContent] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCardClick = (value) => {
    setSelectedValue(value);
    setCode(value);
    console.log(value);
  };

  const getAllCoupons = async () => {
    const res = await getAll();
    setCoupons(res);
    console.log('getAllCoupons: ', res);
  };

  useEffect(() => {
    getAllCoupons();
    if (information && information[0]) {
      setHoaDon(information[0]);
    }
  }, [information]);
  console.log('hoaDon', hoaDon);

  const handleSave = async () => {
    console.log('hoaDonSave: ', hoaDon[0]);
    console.log('CodeSave: ', code);
    try {
      const save = await insertHd(hoaDon[0], code);
      if (save) {
        setAlertContent({
          type: 'success',
          message: 'Thêm Thành Công!',
        });
      } else {
        setAlertContent({
          type: 'error',
          message: 'Đã xảy ra lỗi!',
        });
      }
    } catch (error) {
      console.log('error', error);
      setAlertContent({
        type: 'warning',
        message: error.response.data,
      });
    }
    handleClose();
    getDetailHD();
  };

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  function formatCurrency(price) {
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Chọn Mã Giảm Giá'}</DialogTitle>
        <DialogContent dividers>
          {coupons.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Hiện Tại Không Có Chương Trình Voucher Nào
            </Typography>
          ) : (
            coupons
              .filter((coupon) => coupon.trangThai === 0)
              .map((coupon, index) => (
                <Card
                  key={coupon.code}
                  onClick={() => handleCardClick(coupon.code)}
                  sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: 2 }}
                >
                  <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* You can customize the CardMedia based on your coupon data */}
                    <CardMedia component="img" height="140" image={logo5F} alt={coupon.label} />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', marginRight: 2 }}>
                        Giảm {`${coupon.phanTram} %`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', marginRight: 2 }}>
                        Đơn Tối Thiểu {formatCurrency(coupon.tienToiThieu)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', marginRight: 2 }}>
                        Số lượng: {coupon.soLuong}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', marginRight: 2 }}>
                        Đã được dùng: {coupon.soLuong - coupon.soLuongHienTai}
                      </Typography>
                      {/* Add more Typography components as needed */}
                    </CardContent>
                    <Radio checked={selectedValue === coupon.code} />
                  </CardActionArea>
                </Card>
              ))
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave}>Đồng Ý</Button>
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
