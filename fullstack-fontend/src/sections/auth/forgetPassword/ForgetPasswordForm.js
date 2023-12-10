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
import {postForgetPassword} from "../../../service/taiKhoanKhachHangSevice";
import {useAlert} from "../../../layouts/dashboard/AlertContext";


// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {

    const {showAlert} = useAlert();

    const [email, setEmail] = useState("");
    // chuyen trang
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState("");
    const handleSave = async () => {

        let res;
        try {
            res = await postForgetPassword(
                email,
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

        if (res.ok) {
            showAlert('success', 'Mật khẩu mới đã được gửi');
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
                   Quên Mật Khẩu
                </Typography>
                <Box component="form" sx={{mt: 3}}>
                    <Grid container spacing={2}>
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
                        Quên mật khẩu
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Link href="/signUp" variant="body2">
                                Đăng ký tài khoản mới
                            </Link>
                        </Grid>

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

