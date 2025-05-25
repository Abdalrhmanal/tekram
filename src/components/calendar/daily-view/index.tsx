import React, { useMemo, useState } from 'react';
import { format, isSameDay } from 'date-fns';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';

interface Event {
  id: string;
  title: string;
  startTime: string; // e.g., "13:00"
  endTime: string;
  color: string;
}

interface DailyViewProps {
  date: Date;
  events?: Event[];
}

const DailyView: React.FC<DailyViewProps> = ({ date, events = [] }) => {
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('24');
  const theme = useTheme();

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const formatHour = (hour: number) =>
    timeFormat === '12'
      ? `${hour % 12 || 12} ${hour >= 12 ? 'PM' : 'AM'}`
      : `${hour.toString().padStart(2, '0')}:00`;

  const handleFormatChange = (_: any, newFormat: '12' | '24') => {
    if (newFormat) setTimeFormat(newFormat);
  };
  const current = new Date();
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{format(date, 'EEEE, dd MMMM yyyy')}</Typography>
        <ToggleButtonGroup value={timeFormat} exclusive onChange={handleFormatChange} size="small">
          <ToggleButton value="12">12-hour</ToggleButton>
          <ToggleButton value="24">24-hour</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={1}>
        {hours.map((hour) => {
          const isCurrentHour =
            isSameDay(date, current) && current.getHours() === hour;

          return (
            <Grid key={hour} size={4}>
              <Paper
                elevation={1}
                variant="outlined"
                sx={{
                  minHeight: 100,
                  p: 1,
                  bgcolor: isCurrentHour ? 'lightblue' : undefined,
                }}
              >
                <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                  {formatHour(hour)}
                </Typography>
                {events
                  .filter((e) => e.startTime.startsWith(hour.toString().padStart(2, '0')))
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((event) => (
                    <Box
                      key={event.id}
                      sx={{
                        px: 1,
                        py: 0.5,
                        bgcolor: event.color,
                        borderRadius: 1,
                        fontSize: 13,
                        mt: 0.5,
                        color: '#fff',
                      }}
                    >
                      <Typography variant="body2" mt={1}>{event.title || 'no title'}</Typography>
                    </Box>
                  ))}
                <Typography variant="body2" mt={1}>No Events</Typography>
              </Paper>
            </Grid>
          );
        })}

      </Grid>
    </Box>
  );
};

export default DailyView;
