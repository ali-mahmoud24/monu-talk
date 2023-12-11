import { useEffect, useState } from 'react';

import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import MuseumItem from './MuseumItem';

import axios from 'axios';

const MuseumList = () => {
  const [loadedMuseums, setLoadedMuseums] = useState([]);
  const [isLoading, setIsloading] = useState();
  // const [currentMuseumId, setCurrentMuseumId] = useState(null);

  //   const { token } = useContext(AuthContext);

  // const museumDeletedHandler = (deletedMuseumId) => {
  //   setLoadedMuseums((prevMuseums) =>
  //     prevMuseums.filter((museum) => museum.id !== deletedMuseumId)
  //   );
  // };

  // const onBookHandler = (currentDoctorId) => {
  //   setCurrentDoctorId(currentDoctorId);
  // };

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        setIsloading(true);
        const res = await axios.get('http://localhost:8000/museums');
        if (res.status === 200) {
          setLoadedMuseums(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    };

    fetchMuseums();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <CircularProgress size="6rem" />
      </Box>
    );
  }

  const museumsList = loadedMuseums.map((museum) => (
    <MuseumItem
      key={museum.id}
      id={museum.id}
      imageUrl={museum.imageUrl}
      name={museum.name}
      location={museum.location}
      category={museum.categoryId.name}
      description={museum.description}
      // onDelete={museumDeletedHandler}
      // onBook={() => onBookHandler(museum.id)}
    />
  ));

  if (museumsList.length === 0) {
    return (
      <Typography align="center" variant="h3" sx={{ marginBottom: '1rem' }}>
        No Museums Found!
      </Typography>
    );
  }

  return (
    <>
      <Typography align="center" variant="h4" sx={{ marginBottom: '1rem' }}>
        Explore Museums
      </Typography>
      <div
        style={{
          flexGrow: 1,
          margin: '0 auto',
          width: '80%',
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
        }}
      >
        <Grid
          container
          direction="row"
          //   justify="flex-start"
          //   alignItems="flex-start"
          //   spacing={2}

          gap={'1.5rem'}
          alignItems={'center'}
          justifySelf={'center'}
        >
          {museumsList}
        </Grid>
      </div>
    </>
  );
};

export default MuseumList;
