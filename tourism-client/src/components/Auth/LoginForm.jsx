import { useState, useContext } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  TextField,
  Link,
  Alert,
  Snackbar,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import toast, { Toaster } from 'react-hot-toast';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6),
});

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: submitLogin,
  });

  async function submitLogin(values) {
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:8000/auth/login', values);

      if (res.status === 201) {
        const { token, userId } = res.data;
        login(userId, token);

        navigate('/museums');
      }
    } catch (err) {
      toast.custom(<Alert severity="error">{err.response.data.message}</Alert>);

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* <Toaster position='top-center' /> */}
      <Toaster
        containerStyle={{ top: 150 }}
        // toastOptions={{ position: 'top-center' }}
      ></Toaster>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  'url(https://www.privatetoursinegypt.com/uploads/4-Days-Luxor-Aswan-Abu-Simbel-Break.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light'
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form
                  noValidate
                  onSubmit={loginForm.handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    value={loginForm.values.email}
                    onChange={loginForm.handleChange}
                    error={!!loginForm.errors.email}
                    helperText={loginForm.errors.email}
                  />
                  <TextField
                    type="password"
                    name="password"
                    margin="normal"
                    label="Password"
                    required
                    fullWidth
                    variant="outlined"
                    value={loginForm.values.password}
                    onChange={loginForm.handleChange}
                    error={!!loginForm.errors.password}
                    helperText={loginForm.errors.password}
                  />
                  {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={isLoading}
                  >
                    Sign In
                  </LoadingButton>

                  <Grid container>
                    {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                    <Grid item>
                      <Link
                        component={RouterLink}
                        to={'/register'}
                        variant="body2"
                      >
                        {"Don't have an account? Register Now"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;
