import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  TextField,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { CloudUploadOutlined } from '@mui/icons-material';

import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const newMuseumSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  categoryId: Yup.string().required('Catrgory is required'),
  //   image: Yup.mixed().required('Image is required'),
});

const NewMuseum = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

  const [loadedCategories, setLoadedCategories] = useState([]);

  const [
    {
      data: categoriesData,
      loading: categoriesLoading,
      error: categoriesError,
    },
  ] = useAxios({
    url: 'http://localhost:8000/categories',
    method: 'GET',
  });

  useEffect(() => {
    if (categoriesData) {
      setLoadedCategories(categoriesData);
    }
  }, [categoriesData]);

  const addMuseumForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      location: '',
      categoryId: '',
      //   image: '',
    },
    validationSchema: newMuseumSchema,
    onSubmit: submitNewMuseum,
  });

  async function submitNewMuseum(values) {
    const formData = new FormData();
    Object.keys(values).forEach((fieldName) => {
      console.log(fieldName, values[fieldName]);

      formData.append(fieldName, values[fieldName]);
    });

    formData.append('image', image);

    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/museums', formData);

      if (res.status === 201) {
        navigate('/museums');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box sx={{ width: '50%', margin: '0 auto' }}>
      <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
        Add Museum
      </Typography>
      <form onSubmit={addMuseumForm.handleSubmit}>
        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Name"
          fullWidth
          required
          sx={{ mb: 3 }}
          name="name"
          value={addMuseumForm.values.name}
          onChange={addMuseumForm.handleChange}
          error={!!addMuseumForm.errors.name}
          helperText={addMuseumForm.errors.name}
        />
        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Location"
          fullWidth
          required
          sx={{ mb: 3 }}
          name="location"
          value={addMuseumForm.values.location}
          onChange={addMuseumForm.handleChange}
          error={!!addMuseumForm.errors.location}
          helperText={addMuseumForm.errors.location}
        />

        <InputLabel id="museum-category">Category</InputLabel>
        <Select
          type="text"
          variant="outlined"
          color="secondary"
          label="Location"
          fullWidth
          required
          sx={{ mb: 3 }}
          labelId="museum-category"
          id="museum-category"
          name="categoryId"
          value={addMuseumForm.values.categoryId}
          onChange={addMuseumForm.handleChange}
          error={!!addMuseumForm.errors.categoryId}
          // helperText={addMuseumForm.errors.categoryId}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {loadedCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          multiline
          type="text"
          variant="outlined"
          color="secondary"
          label="Description"
          rows={3}
          // maxRows={4}
          required
          fullWidth
          sx={{ mb: 3 }}
          name="description"
          value={addMuseumForm.values.description}
          onChange={addMuseumForm.handleChange}
          error={!!addMuseumForm.errors.description}
          helperText={addMuseumForm.errors.description}
        />

        <Button
          component="label"
          variant="outlined"
          color="secondary"
          startIcon={<CloudUploadOutlined />}
          sx={{ marginBottom: '1rem' }}
        >
          Upload Image
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
            {imgSrc && <img width={'100%'} height={300} src={imgSrc} alt='' />}
          </div>
        </Box>

        <LoadingButton
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={!addMuseumForm.isValid || !image}
          loading={isLoading}
          sx={{ marginTop: '1rem' }}
        >
          Submit
        </LoadingButton>
      </form>
    </Box>
  );
};

export default NewMuseum;
