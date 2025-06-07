import useGlobalData from '@/hooks/get-global';
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Typography, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const daysEn: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function getAvailabilityColor(status: string) {
  if (status.includes("محجوز") || status.toLowerCase().includes("booked")) return "error";
  if (status.includes("فارغ") || status.toLowerCase().includes("available")) return "success";
  return "default";
}

function DOrder({ id }: { id: any; }) {
  const { data, isLoading, isFetching, isError, refetch } = useGlobalData({
    dataSourceName: `api/service-units/${id}/order-details`
  });

  const notes = data?.data?.notes;

  return (
    <>
      <Box dir="ltr" ml={2}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight="bold">Days Pricing & Availability</Typography>
          </AccordionSummary>
          <Divider variant="middle" />
          <AccordionDetails>
            <Box sx={{ mb: 1 }}>
              <Grid container spacing={1} alignItems="center" >
                <Grid size={4}>
                  <Typography fontWeight="bold" color="primary">Day</Typography>
                </Grid>
                <Grid size={4}>
                  <Typography fontWeight="bold" color="primary">Price</Typography>
                </Grid>
                <Grid size={4}>
                  <Typography fontWeight="bold" color="primary">Availability</Typography>
                </Grid>
                {data?.data?.by_days &&
                  Object.entries(data.data.by_days).map(([day, info]: any) => {
                    const availability = data.data.available_times?.[day] ?? "-";
                    const color = getAvailabilityColor(availability);
                    return (
                      <React.Fragment key={day}>
                        <Grid size={4}>
                          <Typography>{daysEn[day] || day}</Typography>
                        </Grid>
                        <Grid size={4}>
                          <Chip
                            label={`${info.price} ${info.currency}`}
                            color="info"
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid size={4}>
                          <Chip
                            label={availability}
                            color={color as any}
                            variant="filled"
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              color: color === "error" ? "#fff" : undefined,
                              background: color === "success" ? "#afa00" : undefined,
                            }}
                          />
                        </Grid>
                      </React.Fragment>
                    );
                  })}
              </Grid>
            </Box>
            {notes && (
              <Box mt={3}>
                <Typography color="error" fontWeight="bold" variant="body1" textAlign="center">
                  {notes}
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}

export default DOrder