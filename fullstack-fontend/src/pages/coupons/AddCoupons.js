import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {toast} from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Alert, Box, Button, Container, InputAdornment, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { vi } from 'date-fns/locale'; // Import locale cho tiếng Việt
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { add } from "../../service/CouponsService";
import Iconify from "../../components/iconify";

const AddCoupons = () => {
    const todayAtNoon = dayjs();
    const todayAt9AM = dayjs();
    const [ngayKetThuc, setNgayKetThuc] = useState(dayjs().set('hour', 12).startOf('hour'));
    const [ngayBatDau, setNgayBatDau] = useState(dayjs().set('hour', 12).startOf('hour'));
    const [tenChuongTrinh, setTenChuongTrinh] = useState('');
    const [tenChuongTrinhErr, setTenChuongTrinhErr] = useState('');
    const [soLuong, setSoLuong] = useState('');
    const [soLuongErr, setSoLuongErr] = useState('');
    const [phanTram, setPhanTram] = useState('');
    const [phanTramErr, setPhanTramErr] = useState('');
    const [tienToiThieu, setTienToiThieu] = useState('');
    const [tienToiThieuErr, setTienToiThieuErr] = useState('');
    const [alertContent, setAlertContent] = useState(null);

    const hanldeCheckGiaSL = (value, setFunc, errFunc, thongBao) => {
        if (value.trim() === '') {
            errFunc(`${thongBao} không được để trống.`);
        }
        // Kiểm tra nếu giá trị không phải là số hoặc là số âm
        else if (!/^\d+$/.test(value) || parseInt(value, 10) <= 0) {
            errFunc(`${thongBao} phải là số nguyên dương.`);
        } else {
            errFunc('');
        }
        setFunc(value);
    };

    const hanldeCheckTenChuongTrinh = (value, setFunc, errFunc) => {
        if (value.trim() === '') {
            errFunc('Tên chương trình không được để trống.');
        } else if (/\d/.test(value)) {
            errFunc('Tên chương trình không được chứa số.');
        } else if (value.length < 3) {
            errFunc('Tên chương trình phải có ít nhất 3 ký tự.');
        } else {
            errFunc('');
        }
        setFunc(value);
    };



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

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertContent(null);
    };


    const handleSave = async () => {

        const selectedDatekt = dayjs(ngayKetThuc);
        const ngaykt = selectedDatekt.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });
        const selectedDateBd = dayjs(ngayBatDau);
        const ngayBd = selectedDateBd.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });

        const { moTa } = coupon;

        const couponAdd = {
            tenChuongTrinh,
            code: coupon.code,
            moTa,
            thoiGianKetThuc: ngaykt,
            thoiGianTao: ngayBd,
            soLuong,
            phanTram,
            tienToiThieu
        };

        console.log("couponAdd: ", couponAdd);

        if (!!tenChuongTrinhErr || !!soLuongErr || !!phanTramErr || !!tienToiThieuErr) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập đúng và đủ thông tin!',
            });
        } else {
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
                        onChange={(event) => hanldeCheckTenChuongTrinh(event.target.value, setTenChuongTrinh, setTenChuongTrinhErr)}
                        error={!!tenChuongTrinhErr}
                        helperText={tenChuongTrinhErr}
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
                        onChange={(event) => hanldeCheckGiaSL(event.target.value, setSoLuong, setSoLuongErr, 'Số lượng')}
                        error={!!soLuongErr}
                        helperText={soLuongErr}
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
                        onChange={(event) => hanldeCheckGiaSL(event.target.value, setPhanTram, setPhanTramErr, 'Phần trăm giảm')}
                        error={!!phanTramErr}
                        helperText={phanTramErr}
                    />

                    <TextField
                        fullWidth
                        margin={"dense"}
                        label="Số tiền tối thiểu"
                        name="tienToiThieu"
                        type="number"
                        onChange={(event) => hanldeCheckGiaSL(event.target.value, setTienToiThieu, setTienToiThieuErr, 'Số tiền tối thiểu')}
                        error={!!tienToiThieuErr}
                        helperText={tienToiThieuErr}
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
                        onClick={() => handleSave()}
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

        </>
    );
};
export default AddCoupons;