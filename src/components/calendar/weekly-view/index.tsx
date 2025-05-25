import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';

const WeeklyView = ({ date }: { date: Date }) => {
  const weekStart = startOfWeek(date);

  return (
    <Box display="flex" gap={1}>
      {[...Array(7)].map((_, i) => {
        const current = addDays(weekStart, i);
        return (
          <Paper key={i} sx={{ flex: 1, p: 2, bgcolor: isSameDay(current, new Date()) ? 'lightblue' : undefined }}>
            <Typography fontWeight="bold">{format(current, 'EEE d')}</Typography>
            <Typography variant="body2" mt={1}>No Events</Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default WeeklyView;