import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';

import { TextField, Button, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { CloudUploadOutlined } from '@mui/icons-material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const newArtifactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  //   image: Yup.mixed().required('Image is required'),
});

export default function NewArtifact({ open, setOpen, onAddArtifact }) {
  const { museumId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
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

  const addArtifactForm = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: newArtifactSchema,
    onSubmit: submitNewArtifact,
  });

  async function submitNewArtifact(values) {
    const formData = new FormData();
    Object.keys(values).forEach((fieldName) => {
      formData.append(fieldName, values[fieldName]);
    });

    formData.append('museumId', museumId);
    formData.append('image', image);

    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:8000/artifacts', formData);

      if (res.status == 201) {
        onAddArtifact(res.data);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Artifact</DialogTitle>
        <DialogContent>
          <Box sx={{ padding: '1rem' }}>
            <form onSubmit={addArtifactForm.handleSubmit}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Name"
                fullWidth
                required
                sx={{ mb: 3 }}
                name="name"
                value={addArtifactForm.values.name}
                onChange={addArtifactForm.handleChange}
                error={!!addArtifactForm.errors.name}
                helperText={addArtifactForm.errors.name}
              />

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
                value={addArtifactForm.values.description}
                onChange={addArtifactForm.handleChange}
                error={!!addArtifactForm.errors.description}
                helperText={addArtifactForm.errors.description}
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
                  {imgSrc && <img width={'100%'} height={300} src={imgSrc} />}
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
            type="submit"
            disabled={!addArtifactForm.isValid || !image}
            loading={isLoading}
            onClick={addArtifactForm.handleSubmit}
          >
            Submit
          </LoadingButton>
          {/* <Button onClick={addArtifactForm.handleSubmit}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
