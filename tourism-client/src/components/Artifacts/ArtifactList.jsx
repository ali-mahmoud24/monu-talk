import { useContext, useEffect, useState } from 'react';

import { Grid, Typography, Box, Button, CircularProgress } from '@mui/material';
import ArtifactItem from './ArtifactItem';

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import NewArtifact from './NewArtifact';

import axios from 'axios';

const ArtifactList = () => {
  const [loadedArtifacts, setLoadedArtifacts] = useState([]);
  const [isLoading, setIsloading] = useState();

  const [open, setOpen] = useState(false);

  const { token } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { museumId } = useParams();

  //   const { token } = useContext(AuthContext);

  // const artifactDeletedHandler = (deletedArtifactId) => {
  //   setLoadedArtifacts((prevArtifacts) =>
  //     prevArtifacts.filter((artifact) => artifact.id !== deletedArtifactId)
  //   );
  // };

  const addArtifact = (newArtifact) => {
    setLoadedArtifacts((prevArtifacts) => [...prevArtifacts, newArtifact]);
  };

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        setIsloading(true);
        const res = await axios.get(
          `http://localhost:8000/artifacts/museums/${museumId}`
        );
        if (res.status === 200) {
          setLoadedArtifacts(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    };

    fetchArtifacts();
  }, [museumId]);

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

  const artifactsList = loadedArtifacts.map((artifact) => (
    <ArtifactItem
      key={artifact.id}
      id={artifact.id}
      name={artifact.name}
      description={artifact.description}
      imageUrls={artifact.imageUrlList}
      // imageUrl={artifact.imageUrl}
      museumId={artifact.museumId}
      // onDelete={artifactDeletedHandler}
    />
  ));

  if (artifactsList.length === 0) {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography align="center" variant="h3" sx={{ marginBottom: '1rem' }}>
          No Artifacts Found!
        </Typography>

        {token && (
          <>
            <Button
              size="small"
              variant="outlined"
              endIcon={<AddCircleOutlinedIcon />}
              onClick={handleClickOpen}
            >
              Add Artifact
            </Button>
            <NewArtifact
              setOpen={setOpen}
              open={open}
              onAddArtifact={addArtifact}
            />
          </>
        )}
      </Box>
    );
  }

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'1rem'}
        sx={{ marginBottom: '1rem' }}
      >
        <Typography align="center" variant="h4">
          Explore Artifacts
        </Typography>

        {token && (
          <>
            <Button
              size="small"
              variant="outlined"
              endIcon={<AddCircleOutlinedIcon />}
              onClick={handleClickOpen}
            >
              Add Artifact
            </Button>
            <NewArtifact
              setOpen={setOpen}
              open={open}
              onAddArtifact={addArtifact}
            />
          </>
        )}
      </Box>
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
          {artifactsList}
        </Grid>
      </div>
    </>
  );
};

export default ArtifactList;
