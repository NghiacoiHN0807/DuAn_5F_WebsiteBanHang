import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {toast} from "react-toastify";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {postAddTaiKhoanKhachHang} from "../../service/taiKhoanKhachHangSevice";


const SignUp = () => {

    const defaultTheme = createTheme();

    const [maTaiKhoan] = useState(null);
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau] = useState(null);
    const [trangThai] = useState("0");

    // chuyen trang
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState("");
    const handleSave = async () => {

        let res;
        try {
            res = await postAddTaiKhoanKhachHang(
                maTaiKhoan,
                ho,
                ten,
                sdt,
                email,
                matKhau,
                trangThai
            );
            console.log("Check res: ", res);
        }catch (error){
            if (error.response && error.response.data) {
                console.log(error.response.data);
                setValidationErrors(error.response.data);
            } else {
                console.error("Error:", error);
            }
            return;
        }

        if (res && res.idTaiKhoan) {
            toast.success("Thêm Thành Công");
            navigate("/client/home");
        } else {
            toast.error("Thêm Thất Bại!");
        }

    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form"  sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    require
                                    error={!!validationErrors.ho}
                                    helperText={validationErrors.ho}
                                    fullWidth
                                    margin={"dense"}
                                    onChange={(event) => setHo(event.target.value)}
                                    label="Họ"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastName"
                                    error={!!validationErrors.ten}
                                    helperText={validationErrors.ten}
                                    fullWidth
                                    margin={"dense"}
                                    label="Tên"
                                    onChange={(event) => setTen(event.target.value)}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!!validationErrors.sdt}
                                    helperText={validationErrors.sdt}
                                    margin={"dense"}
                                    inputProps={{ maxLength: 10 }}
                                    onChange={(event) => setSdt(event.target.value)}
                                    label="Số Điện Thoại"
                                    type="text"
                                    id="phone"
                                    autoComplete="new-phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Địa Chỉ Email"
                                    error={!!validationErrors.email}
                                    helperText={validationErrors.email}
                                    margin={"dense"}
                                    onChange={(event) => setEmail(event.target.value)}
                                    autoComplete="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="Tôi muốn nhận thông tin mới về sản phẩm mới và các khuyến mãi qua Email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={() => handleSave()}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Đăng Ký
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Đã có tài khoản? Đăng Nhập
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

}
export default SignUp;

