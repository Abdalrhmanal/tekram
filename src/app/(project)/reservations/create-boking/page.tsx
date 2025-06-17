"use client";

import React from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Autocomplete,
} from '@mui/material';
import useGlobalDataT from '@/hooks/git-global';

interface Option {
    label: string;
    value: string;
}

const durations: Option[] = [
    { label: '1 hour', value: '1' },
    { label: '2 hours', value: '2' },
    { label: '3 hours', value: '3' },
];

const CreateBooking = () => {
    const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
    const [selectedProvider, setSelectedProvider] = React.useState<any | null>(null);
    const [selectedService, setSelectedService] = React.useState<Option | null>(null);
    const [selectedDuration, setSelectedDuration] = React.useState<Option | null>(null);
    const [bookingDate, setBookingDate] = React.useState('');

    interface GlobalDataResponse {
        data?: any[];
        [key: string]: any;
    }

    const { data, isLoading, isFetching, isError, refetch } = useGlobalDataT<GlobalDataResponse>({
        dataSourceName: 'api/customers',
        pageSize: 100000,
    });
    const { data: dataServices, isLoading: serviceLod, isFetching: serviceFTH, isError: serviceERR } = useGlobalDataT<GlobalDataResponse>({
        dataSourceName: 'api/service-units',
        pageSize: 100000,
    });
    const finalPrice = 120;
    const customarData = (data?.data || []).filter(
        (user: any) => user.host_id === null
    );
    const hostData = (data?.data || []).filter(
        (user: any) => user.host_id !== null && user.host_id !== undefined && user.host_id !== ""
    );
    const servicesData = (dataServices?.data || []);

    return (
        <Box p={4} bgcolor="#EEECF9" borderRadius={2}>
            <Typography variant="h6" mb={3} textAlign="right">
                Create Manual Booking Request
            </Typography>

            <Grid container spacing={3}>
                {/* User */}
                <Grid size={6}>
                    <Autocomplete
                        options={customarData}
                        value={selectedUser}
                        onChange={(_, newValue) => setSelectedUser(newValue)}
                        getOptionLabel={(option: any) => option.name || ""}
                        renderInput={(params) => <TextField {...params} label="User" />}
                    />
                </Grid>

                {/* Provider */}
                <Grid size={6}>
                    <Autocomplete
                        options={hostData}
                        value={selectedProvider}
                        onChange={(_, newValue) => setSelectedProvider(newValue)}
                        getOptionLabel={(option: any) => option.name || ""}
                        renderInput={(params) => <TextField {...params} label="Provider" />}
                    />
                </Grid>

                {/* Service */}
                <Grid size={12}>
                    <Autocomplete
                        options={servicesData}
                        value={selectedService}
                        onChange={(_, newValue) => setSelectedService(newValue)}
                        getOptionLabel={(option: any) => option?.title || ""}
                        renderOption={(props, option: any) => (
                            <li {...props}>
                                {option.title}
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} label="Service" />}
                    />
                </Grid>

                {/* Booking Date */}
                <Grid size={6}>
                    <TextField
                        fullWidth
                        label="Booking Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                    />
                </Grid>

                {/* Duration */}
                <Grid size={6}>
                    <Autocomplete
                        options={durations}
                        value={selectedDuration}
                        onChange={(_, newValue) => setSelectedDuration(newValue)}
                        renderInput={(params) => <TextField {...params} label="Duration" />}
                    />
                </Grid>

                {/* Final Price */}
                <Grid size={12}>
                    <Box
                        textAlign="center"
                        p={2}
                        bgcolor="#F1FAFF"
                        borderRadius={2}
                        fontWeight="bold"
                    >
                        <Typography variant="h6">
                            Final Price: <span style={{ color: '#000' }}>${finalPrice}</span>
                        </Typography>
                    </Box>
                </Grid>

                {/* Create Button */}
                <Grid size={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(to right, #2196f3, #42a5f5)',
                            color: '#fff',
                            borderRadius: 2,
                            fontWeight: 'bold',
                            py: 1.5,
                        }}
                    >
                        Confirm & Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateBooking;