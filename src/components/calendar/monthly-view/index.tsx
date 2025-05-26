import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
} from '@mui/material';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
} from 'date-fns';
import DailyView from '../daily-view';

const events = [
  { date: '2025-05-26', title: 'Team Meeting', color: '#f44336', icon: '📁' },
  { date: '2025-05-26', title: 'Birthday Party', color: '#4caf50', icon: '👤' },
  { date: '2025-05-27', title: 'Important Deadline', color: '#2196f3', icon: '⭐' },
];

const MonthlyView = ({ date }: { date: Date }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  if (selectedDate) {
    const dayEvents = events
      .filter((event) => event.date === format(selectedDate, 'yyyy-MM-dd'))
      .map((event, idx) => ({
        id: `${event.date}-${idx}`,
        title: event.title,
        startTime: '09:00',
        endTime: '10:00',
        color: event.color,
      }));

    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{format(selectedDate, 'EEEE, dd MMMM yyyy')}</Typography>
          <Button variant="outlined" size="small" onClick={() => setSelectedDate(null)}>
            ⬅ العودة للشهر
          </Button>
        </Box>
        <DailyView date={selectedDate} events={dayEvents} />
      </Box>
    );
  }

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
          onClick={() => setSelectedDate(day)}
          sx={{
            minHeight: 100,
            p: 1,
            bgcolor: isSameDay(day, new Date()) ? 'lightblue' : undefined,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#f5f5f5' },
          }}
        >
          <Typography variant="caption">{format(day, 'd')}</Typography>
          {dayEvents.map((event, idx) => (
            <Box
              key={idx}
              sx={{
                mt: 0.5,
                p: 0.5,
                bgcolor: event.color,
                color: 'white',
                borderRadius: 1,
                fontSize: 12,
              }}
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
        {weekdays.map(day => (
          <Typography key={day} fontWeight="bold">
            {day}
          </Typography>
        ))}
      </Box>
      {rows}
    </Stack>
  );
};

export default MonthlyView;
