import { useEffect, useMemo, useState } from 'react';

import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import MuseumItem from './MuseumItem';

import axios from 'axios';
import MuseumSearch from './MuseumSearch';

const MuseumList = () => {
  const [loadedMuseums, setLoadedMuseums] = useState([]);
  const [isLoading, setIsloading] = useState();

  const [museumName, setMuseumName] = useState('');
  const [museumCategoryId, setMuseumCategoryId] = useState('');
  const [museumLocation, setMuseumLocation] = useState('');

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

  const filteredMuseums = useMemo(
    () =>
      loadedMuseums.filter(
        (museum) =>
          museum.name.toLowerCase().includes(museumName.toLowerCase()) &&
          (museumCategoryId ? museum.categoryId === museumCategoryId : true) &&
          museum.location.toLowerCase().includes(museumLocation.toLowerCase())
      ),
    [loadedMuseums, museumName, museumCategoryId, museumLocation]
  );

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

  if (loadedMuseums.length === 0) {
    return (
      <Typography align="center" variant="h3" sx={{ marginBottom: '1rem' }}>
        No Museums Found!
      </Typography>
    );
  }

  function convertTo12HourFormat(time24) {
    const [hour, minute] = time24.split(':');

    // Create a Date object to easily format the time
    const date = new Date();
    date.setHours(parseInt(hour, 10));
    date.setMinutes(parseInt(minute, 10));

    // Use the toLocaleTimeString method to format in 12-hour format with AM/PM
    const time12 = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    return time12;
  }

  const museumsList = filteredMuseums.map((museum) => (
    <MuseumItem
      key={museum.id}
      id={museum.id}
      imageUrl={museum.imageUrl}
      name={museum.name}
      location={museum.location}
      category={museum.category.name}
      description={museum.description}
      openingHours={`${convertTo12HourFormat(
        museum.openingTime
      )} - ${convertTo12HourFormat(museum.closingTime)}`}
      // onDelete={museumDeletedHandler}
      // onBook={() => onBookHandler(museum.id)}
    />
  ));

  const findMuseumsHandler = ({ name, categoryId, location }) => {
    if (name !== undefined) {
      setMuseumName(name);
    }

    if (categoryId !== undefined) {
      setMuseumCategoryId(categoryId);
    }

    if (location !== undefined) {
      setMuseumLocation(location);
    }
  };

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
        <MuseumSearch
          name={museumName}
          categoryId={museumCategoryId}
          location={museumLocation}
          onSearch={findMuseumsHandler}
        />
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
          {!filteredMuseums.length > 0 && (
            <Typography width={'100%'} align="center" variant="h4">
              No museums match your search criteria.
            </Typography>
          )}
          {museumsList}
        </Grid>
      </div>
    </>
  );
};

export default MuseumList;
