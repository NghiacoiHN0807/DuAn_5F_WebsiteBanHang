import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import {toast} from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { vi } from 'date-fns/locale'; // Import locale cho tiếng Việt
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { detail, update } from "../../service/CouponsService";
import Iconify from "../../components/iconify";
import { useAlert } from "../../layouts/dashboard/AlertContext";

const UpdateCoupons = () => {
    const todayAtNoon = dayjs();
    const todayAt9AM = dayjs();
    const [ngayKetThuc, setNgayKetThuc] = useState(dayjs().set('hour', 12).startOf('hour'));
    const [ngayBatDau, setNgayBatDau] = useState(dayjs().set('hour', 12).startOf('hour'));
    const [randomCode, setRandomCode] = useState("");
    const { id } = useParams();

    // chuyen trang
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState("");
    const { showAlert } = useAlert();

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

    const handleSave = async () => {

        const selectedDatekt = dayjs(ngayKetThuc);
        const ngaykt = selectedDatekt.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });
        const selectedDateBd = dayjs(ngayBatDau);
        const ngayBd = selectedDateBd.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });

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

        console.log("couponAdd: ", couponAdd);

        let res;
        try {
            res = await update(id, couponAdd);
            console.log("Check res: ", res);
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
                setValidationErrors(error.response.data);
            } else {
                console.error("Error:", error);
            }
            return;
        }

        if (res && res.idCoupon) {
            showAlert('success', 'Thêm Thành Công');
            navigate("/dashboard/coupons");
        } else {
            showAlert('warning', 'Thêm Thất Bại');
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

    const getOne = async () => {
        const res = await detail(id);
        setCoupon(res);
    }
    console.log("res: ", coupon);

    useEffect(() => {
        getOne();
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
                        error={!!validationErrors.tenChuongTrinh}
                        helperText={validationErrors.tenChuongTrinh}
                        fullWidth
                        margin={"dense"}
                        label="Tên Chương Trình"
                        name="tenChuongTrinh"
                        value={coupon.tenChuongTrinh}
                        onChange={(e) => onInputChange(e)}
                    />
                    <TextField
                        error={!!validationErrors.code}
                        helperText={validationErrors.code}
                        fullWidth
                        margin="dense"
                        label="Code"
                        name="code"
                        value={coupon.code}
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
                        error={!!validationErrors.soLuong}
                        helperText={validationErrors.soLuong}
                        fullWidth
                        margin={"dense"}
                        label="Số Lượng"
                        name="soLuong"
                        value={coupon.soLuong}
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
                                        value={dayjs(coupon.thoiGianTao)}
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
                                        value={dayjs(coupon.thoiGianKetThuc)}
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
                        error={!!validationErrors.phanTram}
                        helperText={validationErrors.phanTram}
                        fullWidth
                        margin={"dense"}
                        label="Phần Trăm Giảm"
                        name="phanTram"
                        value={coupon.phanTram}
                        onChange={(e) => onInputChange(e)}
                    />

                    <TextField
                        error={!!validationErrors.tienToiThieu}
                        helperText={validationErrors.tienToiThieu}
                        fullWidth
                        margin={"dense"}
                        label="Số tiền tối thiểu"
                        name="tienToiThieu"
                        value={coupon.tienToiThieu}
                        onChange={(e) => onInputChange(e)}
                    />
                    <TextField
                        error={!!validationErrors.moTa}
                        helperText={validationErrors.moTa}
                        multiline
                        rows={4}
                        fullWidth
                        margin={"dense"}
                        label="Mô Tả"
                        name="moTa"
                        value={coupon.moTa}
                        onChange={(e) => onInputChange(e)}
                    />

                    <Button
                        size={"large"}
                        variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => handleSave()}
                        style={{ marginTop: "20px" }} // Make button wider
                    >
                        Update Coupon
                    </Button>
                </Box>

            </Container>



        </>
    );
};
export default UpdateCoupons;