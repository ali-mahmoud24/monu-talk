import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useContext, useState } from 'react';

import { TextField, Button, Box, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { CloudUploadOutlined } from '@mui/icons-material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import DatePickerInput from './DatePicker';

import { AuthContext } from '../../shared/context/auth-context';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const newTicketSchema = Yup.object().shape({
  //   phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  nationality: Yup.string().required('Nationality is required'),
  //   ticketDate: Yup.date().required('Ticket Date is required'),
});

export default function NewTicket({ open, setOpen, museumId, openingHours }) {
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
  };

  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  const handleChange = (newValue) => {
    setPhone(newValue);
  };

  const isValid = (newValue) => {
    return matchIsValidTel(newValue);
  };

  const [imgSrc, setImgSrc] = useState(null);
  const [image, setImage] = useState(null);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addTicketForm = useFormik({
    initialValues: {
      //   phoneNumber: '',
      nationality: '',
      //   ticketDate: '',
    },
    validationSchema: newTicketSchema,
    onSubmit: submitNewTicket,
  });

  async function submitNewTicket(values) {
    const formData = new FormData();
    Object.keys(values).forEach((fieldName) => {
      formData.append(fieldName, values[fieldName]);
    });

    const ticketDate = new Date(date['$d']).toISOString();

    formData.append('ticketDate', ticketDate);
    formData.append('phoneNumber', phone);
    formData.append('userId', userId);
    formData.append('museumId', museumId);
    formData.append('image', image);

    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:8000/tickets', formData);

      if (res.status === 201) {
        toast.custom(
          <Alert severity="success">Ticket booked succesfully.</Alert>
        );

        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* <Toaster position='top-center' /> */}
      <Toaster
        containerStyle={{ top: 300 }}
        // toastOptions={{ position: 'top-center' }}
      ></Toaster>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book your ticket now!</DialogTitle>
        <DialogTitle>Opening Hours: {openingHours}</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: '1rem' }}>
            <form onSubmit={addTicketForm.handleSubmit}>
              <MuiTelInput
                defaultCountry="EG"
                forceCallingCode
                variant="outlined"
                color="secondary"
                label="Phone Number"
                fullWidth
                required
                sx={{ mb: 3 }}
                name="phoneNumber"
                value={phone}
                onChange={handleChange}
                error={!isValid}
                helperText={addTicketForm.errors.phoneNumber}
              />

              {/* <CountrySelect /> */}

              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Nationality"
                fullWidth
                required
                sx={{ mb: 3 }}
                name="nationality"
                value={addTicketForm.values.nationality}
                onChange={addTicketForm.handleChange}
                error={!!addTicketForm.errors.nationality}
                helperText={addTicketForm.errors.nationality}
              />

              <DatePickerInput
                disablePast
                variant="outlined"
                color="secondary"
                label="Ticket Date"
                fullWidth
                required
                sx={{ mb: 3 }}
                name="ticketDate"
                // value={addTicketForm.values.ticketDate}
                // onChange={(newValue) => setValue(newValue)}
                value={date}
                onChange={(newValue) => setDate(newValue)}
                // error={!!addTicketForm.errors.ticketDate}
                // helperText={addTicketForm.errors.ticketDate}
              />

              <Button
                component="label"
                variant="outlined"
                color="secondary"
                startIcon={<CloudUploadOutlined />}
                sx={{ marginBottom: '1rem', marginTop: '1rem' }}
              >
                Upload ID
                <input
                  name="image"
                  onChange={onChangePicture}
                  type="file"
                  accept="image/*"
                  style={{
                    clip: 'rect(0 0 0 0)',
                    clipPath: 'inset(50%)',
                    height: 1,
                    overflow: 'hidden',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    whiteSpace: 'nowrap',
                    width: 1,
                  }}
                />
              </Button>
              <Box width={'100%'}>
                <div>
                  {/* {!imgSrc && <p>Please Upload An image</p>} */}
                  {imgSrc && (
                    <img width={'50%'} height={200} src={imgSrc} alt="" />
                  )}
                </div>
              </Box>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            disabled={!addTicketForm.isValid || !image}
            loading={isLoading}
            onClick={addTicketForm.handleSubmit}
          >
            Submit
          </LoadingButton>
          {/* <Button onClick={addTicketForm.handleSubmit}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
