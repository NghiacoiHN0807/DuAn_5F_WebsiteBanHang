import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import Link from "@mui/material/Link";
import {postSignUp} from "../../../service/taiKhoanKhachHangSevice";
import {useAlert} from "../../../layouts/dashboard/AlertContext";


// ----------------------------------------------------------------------

export default function SignUpForm() {

    const {showAlert} = useAlert();
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
            res = await postSignUp(
                maTaiKhoan,
                ho,
                ten,
                sdt,
                email,
                matKhau,
                trangThai
            );
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

        if (res && res.idTaiKhoan) {
            showAlert('success', 'Đăng Ký Tài Khoản Thành Công');
            navigate("/client/home");
        } else {
            showAlert('error', 'Thêm Thất Bại');
        }

    };


    return (

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
                <Typography component="h1" variant="h5">
                    Đăng Ký Tài Khoản Mới
                </Typography>
                <Box component="form" sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"

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

                                fullWidth
                                error={!!validationErrors.sdt}
                                helperText={validationErrors.sdt}
                                margin={"dense"}
                                inputProps={{maxLength: 10}}
                                onChange={(event) => setSdt(event.target.value)}
                                label="Số Điện Thoại"
                                type="text"
                                id="phone"
                                autoComplete="new-phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

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

    );
}

