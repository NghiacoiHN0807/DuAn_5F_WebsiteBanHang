import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [params, setParams] = useState({
    email: '',
    password: '',
  });

  const getParam = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  // Handle login
  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const handleClick = () => {
    console.log(params);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic Og==');

    const raw = JSON.stringify({
      username: params.email,
      password: params.password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/api/login', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        console.log('result: ', result);
        localStorage.setItem('accessToken', result.accessToken);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ', localStorage.getItem('accessToken'));
        axios
          .get('http://localhost:8080/api/detail-user', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem('userFormToken', response.data);
              console.log(response.data);
            } else {
              throw Error(response.status);
            }
          })
          .catch((error) => console.log('error', error));
        setAlertContent({
          type: 'success',
          message: 'Login Success',
        });
        navigate('/dashboard');
      })
      .catch(
        (error) => console.log('error', error),
        setAlertContent({
          type: 'error',
          message: 'Login Failed',
        })
      );
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={params.email} onChange={(e) => getParam(e)} />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => getParam(e)}
          value={params.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
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
}
