import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import useAxios from 'axios-hooks';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const MuseumSearch = ({ name, categoryId, location, onSearch }) => {
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

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <TextField
        size="small"
        variant="outlined"
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(event) => onSearch({ name: event.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
          //   endAdornment: (
          //     <InputAdornment
          //       position="end"
          //       style={{ display: showClearIcon }}
          //       onClick={handleClick}
          //     >
          //       <ClearOutlinedIcon />
          //     </InputAdornment>
          //   ),
        }}
      />

      <TextField
        size="small"
        variant="outlined"
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(event) => onSearch({ location: event.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControl>
        <Select
          sx={{ minWidth: 120 }}
          size="small"
          defaultValue={'None'}
          displayEmpty
          value={categoryId}
          onChange={(event) => onSearch({ categoryId: event.target.value })}
        >
          <MenuItem value={''}>
            {/* <MuseumOutlinedIcon />  */}
            Select Category
          </MenuItem>
          {loadedCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MuseumSearch;
