import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';

import { Link as RouterLink } from 'react-router-dom';

import { Box, Chip } from '@mui/material';

const MuseumItem = ({
  id,
  name,
  location,
  category,
  description,
  imageUrl,
}) => {
  return (
    <Card sx={{ maxWidth: 370, width: 370, height: 390 }}>
      <CardMedia sx={{ height: 140 }} image={imageUrl} title={name} />
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

        <Typography variant="body2" color="text.secondary" height={90}>
          {description.length > 150
            ? `${description.substr(0, 150)}.......`
            : description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/artifacts/${id}`}
          size="small"
          variant="contained"
        >
          Explore Artifacts
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
};

export default MuseumItem;
