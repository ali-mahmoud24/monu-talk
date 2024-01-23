import { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  TextField,
  Link,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { useFormik } from 'formik';

import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import * as Yup from 'yup';

import axios from 'axios';

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6),
});

const RegisterForm = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();

  const registerForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: submitRegister,
  });

  async function submitRegister(values) {
    try {
      setIsLoading(true);
      const res = await axios.post(
        'http://localhost:8000/auth/register',
        values
      );

      if (res.status === 201) {
        const { token, userId } = res.data;
        login(userId, token);

        navigate('/museums');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
                Create an account
              </Typography>
              <form
                noValidate
                onSubmit={registerForm.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  type="text"
                  margin="normal"
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  autoFocus
                  variant="outlined"
                  value={registerForm.values.firstName}
                  onChange={registerForm.handleChange}
                  error={!!registerForm.errors.firstName}
                  helperText={registerForm.errors.firstName}
                />
                <TextField
                  type="text"
                  margin="normal"
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={registerForm.values.lastName}
                  onChange={registerForm.handleChange}
                  error={!!registerForm.errors.lastName}
                  helperText={registerForm.errors.lastName}
                />
                <TextField
                  type="email"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  value={registerForm.values.email}
                  onChange={registerForm.handleChange}
                  error={!!registerForm.errors.email}
                  helperText={registerForm.errors.email}
                />
                <TextField
                  type="password"
                  name="password"
                  margin="normal"
                  label="Password"
                  required
                  fullWidth
                  variant="outlined"
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  error={!!registerForm.errors.password}
                  helperText={registerForm.errors.password}
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
                  Create Account
                </LoadingButton>

                <Grid container>
                  {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link component={RouterLink} to={'/login'} variant="body2">
                      {'Already a member? Login'}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterForm;
