import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {toast} from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Alert, Box, Button, Container, InputAdornment, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { vi } from 'date-fns/locale'; // Import locale cho tiếng Việt
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { add } from "../../service/CouponsService";
import Iconify from "../../components/iconify";
import ModalComfirm from "../../forms/Modal-Comfirm";

const AddCoupons = () => {
    const todayAtNoon = dayjs().set('hour', 12).startOf('hour');
    const todayAt9AM = dayjs().set('hour', 9).startOf('hour');
    const [ngayBatDau, setNgayBatDau] = useState(dayjs().set('hour', 12).startOf('hour'));
    const [ngayKetThuc, setNgayKetThuc] = useState(dayjs().set('hour', 12).startOf('hour'));
    const [alertContent, setAlertContent] = useState(null);
    const [open, setOpen] = useState(null);


    // chuyen trang
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState({
        tenChuongTrinh: '',
        code: '',
        moTa: '',
        thoiGianKetThuc: '',
        thoiGianTao: '',
        soLuong: '',
        phanTram: '',
        tienToiThieu: ''
    });

    // const {name, code, moTa, thoiGianKetThuc, soLuong, hoaDon, phanTram, tienToiThieu, soLuongHienTai} = coupon;

    const onInputChange = (e) => {
        setCoupon({ ...coupon, [e.target.name]: e.target.value });
    };

    const openModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);

    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertContent(null);
    };

    const { tenChuongTrinh, code, soLuong, phanTram, tienToiThieu } = coupon;


    const selectedDatekt = dayjs(ngayKetThuc);
    const ngaykt = selectedDatekt.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });
    const selectedDateBd = dayjs(ngayBatDau);
    const ngayBd = selectedDateBd.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });

    console.log("couponAdd: ", coupon);

    const handleSave = async () => {
        if (!tenChuongTrinh.trim()) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập tên chương trình!',
            });
            return;
        }

        if (/\d/.test(tenChuongTrinh)) {
            setAlertContent({
                type: 'warning',
                message: 'Tên chương trình không được chứa số!',
            });
            return;
        }

        if (!code.trim()) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập code!',
            });
            return;
        }

        if (!soLuong.trim()) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập số lượng!',
            });
            return;
        }

        if (soLuong.trim() < 1) {
            setAlertContent({
                type: 'warning',
                message: 'Số lượng phải là số nguyên lớn hơn 0!',
            });
            return;
        }


        if (!phanTram.trim()) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập phần trăm giảm giá!',
            });
            return;
        }

        if (phanTram.trim() < 1) {
            setAlertContent({
                type: 'warning',
                message: 'Phần trăm giảm giá phải là số nguyên lớn hơn 0!',
            });
            return;
        }

        if (!tienToiThieu.trim()) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập số tiền tối thiểu!',
            });
            return;
        }

        if (tienToiThieu.trim() < 1) {
            setAlertContent({
                type: 'warning',
                message: 'Số tiền tối thiểu phải là số nguyên lớn hơn 0!',
            });
            return;
        }
        const checkDateValidity = () => dayjs(ngayKetThuc).isAfter(dayjs(ngayBatDau));

        if (!checkDateValidity()) {
            setAlertContent({
                type: 'warning',
                message: 'Ngày kết thúc phải sau ngày bắt đầu!',
            });
            return;
        }

        try {
            const couponAdd = {
                tenChuongTrinh: coupon.tenChuongTrinh,
                code: coupon.code,
                moTa: coupon.moTa,
                thoiGianKetThuc: ngaykt,
                thoiGianTao: ngayBd,
                soLuong: coupon.soLuong,
                phanTram: coupon.phanTram,
                tienToiThieu: coupon.tienToiThieu
            };
            console.log("Check couponAdd: ", couponAdd);
            const res = await add(couponAdd);
            console.log("Check res: ", res);

            if (res && res.idCoupon) {
                setAlertContent({
                    type: 'success',
                    message: 'Thêm Thành Công!',
                });
                navigate("/dashboard/coupons");
            } else {
                setAlertContent({
                    type: 'warning',
                    message: 'Thêm Thất Bại!',
                });
            }
        } catch (error) {
            setAlertContent({
                type: 'error',
                message: 'Đã xảy ra lỗi khi thêm giảm giá!',
            });
        }

    };

    function generateRandomCode() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const codeLength = 8;
        let code = '';

        for (let i = 0; i < codeLength; i += 1) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        coupon.code = code;
        return code;
    }

    const [randomCode, setRandomCode] = useState("");
    useEffect(() => {
        setRandomCode(generateRandomCode());
    }, []);

    const refreshInput = () => {
        setRandomCode(generateRandomCode());
    }

    console.log("ngayKetThuc: ", ngayKetThuc);

    console.log("coupon: ", coupon);


    return (
        <>

            <Helmet>
                <title> Coupons | 5F Store </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Coupons
                    </Typography>
                </Stack>

                <Box
                    component="form"
                    sx={{
                        display: "flex",         // Center horizontally
                        justifyContent: "center", // Center horizontally
                        flexDirection: "column", // Align items vertically
                        alignItems: "center",    // Align items horizontally
                    }}
                    noValidate
                    autoComplete="off"

                >
                    <TextField
                        fullWidth
                        margin={"dense"}
                        label="Tên Chương Trình"
                        name="tenChuongTrinh"
                        onChange={(e) => onInputChange(e)}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Code"
                        name="code"
                        value={randomCode}
                        disabled
                        onChange={(e) => onInputChange(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button size="small" onClick={() => refreshInput()}>
                                        <RefreshIcon data-testid="RefreshIcon" />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        margin={"dense"}
                        label="Số Lượng"
                        name="soLuong"
                        type="number"
                        onChange={(e) => onInputChange(e)}
                    />

                    <div className="mb-3 text-center mt-3">
                        <p className="form-label">Ngày bắt đầu</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem>
                                    <DateTimePicker
                                        defaultValue={todayAtNoon}
                                        minDateTime={todayAt9AM}
                                        name='thoiGianTao'
                                        onChange={(newDate) => setNgayBatDau(newDate)}
                                        renderInput={(props) => (
                                            <TextField
                                                fullWidth
                                                margin="dense"
                                                label="Thời Gian bắt đầu"
                                                {...props}
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div className="mb-3 text-center mt-3">
                        <p className="form-label">Ngày kết thúc</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem>
                                    <DateTimePicker
                                        defaultValue={todayAtNoon}
                                        minDateTime={todayAt9AM}
                                        name='thoiGianKetThuc'
                                        onChange={(newDate) => setNgayKetThuc(newDate)}
                                        renderInput={(props) => (
                                            <TextField
                                                fullWidth
                                                margin="dense"
                                                label="Thời Gian Kết Thúc"
                                                {...props}
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <TextField
                        fullWidth
                        margin={"dense"}
                        label="Phần Trăm Giảm"
                        name="phanTram"
                        type="number"
                        onChange={(e) => onInputChange(e)}
                    />

                    <TextField
                        fullWidth
                        margin={"dense"}
                        label="Số tiền tối thiểu"
                        name="tienToiThieu"
                        type="number"
                        onChange={(e) => onInputChange(e)}
                    />
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        margin={"dense"}
                        label="Mô Tả (Tùy Chọn)"
                        name="moTa"
                        onChange={(e) => onInputChange(e)}
                    />

                    <Button
                        size={"large"}
                        variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => openModal()}
                        style={{ marginTop: "20px" }} // Make button wider
                    >
                        Thêm Coupon Mới
                    </Button>
                </Box>

            </Container>

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
            <ModalComfirm open={open} handleClose={handleClose} information={handleSave} title={"Xác nhận thêm"} discription={"Xác nhận thêm coupon"} />
        </>
    );
};
export default AddCoupons;