import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

const ArtifactItem = ({ id, name, description, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 360, width: 360, height: 500 }}>
      <CardActionArea>
        <CardMedia sx={{ height: 300 }} image={imageUrl} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" height={100}>
            {description.length > 220
              ? `${description.substr(0, 220)}.......`
              : description}{' '}
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
      </CardActionArea>
    </Card>
  );
};

export default ArtifactItem;
