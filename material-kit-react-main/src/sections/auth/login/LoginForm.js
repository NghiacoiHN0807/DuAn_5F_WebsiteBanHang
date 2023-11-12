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
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/detail-user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        localStorage.setItem('userFormToken', JSON.stringify(response.data));
        console.log('response:', response.data);
        console.log('response: ', response);
        const authorities = response.data.authorities[0].authority;
        navigate(authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? '/dashboard/app' : '/client/home');
      } else {
        throw Error(response.status);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClick = async () => {
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

    try {
      const response = await fetch('http://localhost:8080/api/login', requestOptions);

      if (response.ok) {
        setAlertContent({
          type: 'success',
          message: 'Login Success',
        });
        const result = await response.json();
        console.log('result: ', result);
        localStorage.setItem('accessToken', result.accessToken);
        await fetchUserData();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log('error', error);
      setAlertContent({
        type: 'error',
        message: 'Login Failed',
      });
    }
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
