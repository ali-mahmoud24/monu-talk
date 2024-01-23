import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import ImageCarousel from './Carousel';

const ArtifactItem = ({ id, name, description, imageUrls }) => {
  return (
    <Card sx={{ maxWidth: 360, width: 360, height: 500 }}>
      {/* <CardActionArea> */}
        <CardMedia
          sx={{ height: 300 }}
          children={<ImageCarousel images={imageUrls} />}
        />
        {/* <CardMedia sx={{ height: 300 }} image={imageUrl} title={name} /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" height={120}>
            {description.length > 250
              ? `${description.substr(0, 250)}.......`
              : description}
          </Typography>
        </CardContent>

        {/* <CardActions>
        <Button
          component={RouterLink}
          to={`/artifacts/museums/${id}`}
          size="small"
          variant="contained"
        >
          Explore Artifacts
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      {/* </CardActionArea> */}
    </Card>
  );
};

export default ArtifactItem;
