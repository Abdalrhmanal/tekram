import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, format } from 'date-fns';

const events = [
  { date: '2025-05-26', title: 'Team Meeting', color: '#f44336', icon: '📁' },
  { date: '2025-05-26', title: 'Birthday Party', color: '#4caf50', icon: '👤' },
  { date: '2025-05-27', title: 'Important Deadline', color: '#2196f3', icon: '⭐' },
];

const MonthlyView = ({ date }: { date: Date }) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let day = startDate;
  while (day <= endDate) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayEvents = events.filter(event => event.date === dayStr);
      days.push(
        <Paper
          key={day.toString()}
          variant="outlined"
          sx={{ minHeight: 100, p: 1, bgcolor: isSameDay(day, new Date()) ? 'lightblue' : undefined }}
        >
          <Typography variant="caption">{format(day, 'd')}</Typography>
          {dayEvents.map((event, idx) => (
            <Box
              key={idx}
              sx={{ mt: 0.5, p: 0.5, bgcolor: event.color, color: 'white', borderRadius: 1, fontSize: 12 }}
            >
              {event.icon} {event.title}
            </Box>
          ))}
        </Paper>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <Box key={day.toString()} display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {days}
      </Box>
    );
  }

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Stack spacing={1}>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" textAlign="center">
        {weekdays.map(day => <Typography key={day} fontWeight="bold">{day}</Typography>)}
      </Box>
      {rows}
    </Stack>
  );
};

export default MonthlyView;