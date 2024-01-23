import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';

import dayjs from 'dayjs';

export default function TimeRangeInput() {
  const [value, setValue] = useState(() => [
    dayjs('2023-04-17T08:00'),
    dayjs('2023-04-17T22:00'),
  ]);

  //   console.log(value[0].$d);
  //   console.log(new Date(value[0].$d).toLocaleTimeString());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MultiInputTimeRangeField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: ({ position }) => ({
            label: position === 'start' ? 'From' : 'To',
          }),
        }}
      />
    </LocalizationProvider>
  );
}
