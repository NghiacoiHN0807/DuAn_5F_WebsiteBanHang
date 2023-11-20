import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from "./SignUp";

const Login = () => {
    const defaultTheme = createTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            remember: data.get('remember'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        marginBottom: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng Nhập
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Tài Khoản Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật Khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 2,
                            }}
                        >
                            <FormControlLabel
                                control={<Checkbox name="remember" value="true" color="primary" />}
                                label="Ghi Nhớ Đăng Nhập"
                            />
                            <Link href="#" sx={{ marginTop: 1, color: 'grey', textDecoration: 'none' }}>
                                {"Quên Mật Khẩu!"}
                            </Link>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 2,
                            }}
                        >
                            <Button
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                    },
                                }}
                            >
                                Đăng Nhập
                            </Button>
                            <Button
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                    },
                                }}
                            >
                                Đăng Nhập Bằng Google
                            </Button>
                        </Box>
                        <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
                            <Link href="/signUp" sx={{ color: 'grey', textDecoration: 'none' }}>
                                {"Tạo Tài Khoản Mới!"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
