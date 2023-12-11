import { useState } from 'react';

import { Button, Box, Typography, Card, CardContent } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { CloudUploadOutlined } from '@mui/icons-material';

import Questions from './Questions';

import axios from 'axios';

const ImageModel = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [imgSrc, setImgSrc] = useState(null);
  const [image, setImage] = useState(null);

  const [data, setData] = useState(null);

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

  async function submitImage(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    const remoteServerUrl = 'https://aa44-34-85-247-129.ngrok-free.app';

    try {
      setIsLoading(true);
      const res = await axios.post(`${remoteServerUrl}/upload`, formData);

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Box sx={{ width: '50%', margin: '0 auto' }}>
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
          Upload Image to predict Monument:
        </Typography>

        <form onSubmit={submitImage}>
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
              {imgSrc && (
                <img width={'100%'} height={300} src={imgSrc} alt="" />
              )}
            </div>
          </Box>

          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={!image}
            loading={isLoading}
            sx={{ marginTop: '1rem' }}
          >
            Submit
          </LoadingButton>
        </form>
      </Box>

      {data && (
        <Box sx={{ minWidth: 275, marginTop: '2rem' }}>
          <Card variant="outlined">
            <>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Prediction
                </Typography>
                <Typography variant="h5" component="div">
                  {data.name}
                </Typography>

                <Typography variant="body2" sx={{ marginTop: '1rem' }}>
                  {data.info}
                </Typography>

                <Typography sx={{ marginTop: '1rem' }} variant="h5">
                  Learn More:
                </Typography>
              </CardContent>

              <Questions questionsList={data.questions} />
            </>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ImageModel;
