import { useContext, useState } from 'react';
import {
  Box,
  Chip,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Alert,
} from '@mui/material';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import NewTicket from '../Tickets/NewTicket';
import { AuthContext } from '../../shared/context/auth-context';
import toast, { Toaster } from 'react-hot-toast';

const MuseumItem = ({
  id,
  name,
  location,
  category,
  description,
  imageUrl,
  openingHours,
}) => {
  const [open, setOpen] = useState(false);

  const { userId } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleClickOpen = () => {
    if (!userId) {
      toast.custom(
        <Alert severity="error">Please login first to book ticket.</Alert>
      );

      navigate('/login');
    }
    setOpen(true);
  };

  return (
    <>
      {/* <Toaster position='top-center' /> */}
      <Toaster
        containerStyle={{ top: 150 }}
        // toastOptions={{ position: 'top-center' }}
      ></Toaster>
      <Card sx={{ maxWidth: 370, width: 370, height: 425 }}>
        <CardMedia sx={{ height: 180 }} image={imageUrl} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Box display={'flex'} gap={'1rem'}>
            <Chip
              sx={{ marginBottom: '0.5rem' }}
              icon={<LocationOnOutlinedIcon />}
              label={location}
              // variant="outlined"
            />
            <Chip
              sx={{ marginBottom: '0.5rem' }}
              icon={<MuseumOutlinedIcon />}
              label={category}
              // variant="outlined"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" height={85}>
            {description.length > 150
              ? `${description.substr(0, 150)}.......`
              : description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Button
            component={RouterLink}
            to={`/artifacts/${id}`}
            size="small"
            variant="contained"
          >
            Explore Artifacts
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={handleClickOpen}
          >
            Book a ticket
          </Button>

          <NewTicket
            setOpen={setOpen}
            open={open}
            museumId={id}
            openingHours={openingHours}
          />
        </CardActions>
      </Card>
    </>
  );
};

export default MuseumItem;
