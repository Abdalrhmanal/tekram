"use client";

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import MonthlyView from './monthly-view';
import WeeklyView from './weekly-view';
import DailyView from './daily-view';

export type ViewType = 'month' | 'week' | 'day';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');

  const handleViewChange = (_: any, newView: ViewType) => {
    if (newView) setView(newView);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  const goToPrevious = () => {
    if (view === 'day') setSelectedDate(subDays(selectedDate, 1));
    else if (view === 'week') setSelectedDate(subWeeks(selectedDate, 1));
    else setSelectedDate(subMonths(selectedDate, 1));
  };

  const goToNext = () => {
    if (view === 'day') setSelectedDate(addDays(selectedDate, 1));
    else if (view === 'week') setSelectedDate(addWeeks(selectedDate, 1));
    else setSelectedDate(addMonths(selectedDate, 1));
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <ToggleButtonGroup value={view} exclusive onChange={handleViewChange}>
          <ToggleButton value="month">MONTH</ToggleButton>
          <ToggleButton value="week">WEEK</ToggleButton>
          <ToggleButton value="day">DAY</ToggleButton>
        </ToggleButtonGroup>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={goToPrevious}><ChevronLeft /></IconButton>
          <TextField
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={handleDateChange}
            size="small"
          />
          <IconButton onClick={goToNext}><ChevronRight /></IconButton>
        </Box>
      </Box>

      {view === 'month' && <MonthlyView date={selectedDate} />}
      {view === 'week' && <WeeklyView date={selectedDate} />}
      {view === 'day' && <DailyView date={selectedDate} />}
    </Box>
  );
};

export default Calendar;
