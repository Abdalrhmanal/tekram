'use client';

import React from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Autocomplete,
} from '@mui/material';
import useGlobalData from '@/hooks/get-global';
import useGlobalDataT from '@/hooks/git-global';

interface Option {
    label: string;
    value: string;
}

const durations: Option[] = [
    { label: '1 ساعة', value: '1' },
    { label: '2 ساعة', value: '2' },
    { label: '3 ساعة', value: '3' },
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

    const { data: data, isLoading, isFetching, isError, refetch } = useGlobalDataT<GlobalDataResponse>({
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
    console.log("servicesData", servicesData);

    return (
        <Box p={4} bgcolor="#EEECF9" borderRadius={2}>
            <Typography variant="h6" mb={3} textAlign="right">
                إنشاء طلب حجز يدوي
            </Typography>

            <Grid container spacing={3}>
                {/* المستخدم */}
                <Grid size={6}>
                    <Autocomplete
                        options={customarData}
                        value={selectedUser}
                        onChange={(_, newValue) => setSelectedUser(newValue)}
                        getOptionLabel={(option: any) => option.name || ""}
                        renderInput={(params) => <TextField {...params} label="المستخدم" />}
                    />
                </Grid>



                {/* مزود الخدمة */}
                <Grid size={6}>
                    <Autocomplete
                        options={hostData}
                        value={selectedProvider}
                        onChange={(_, newValue) => setSelectedProvider(newValue)}
                        getOptionLabel={(option: any) => option.name || ""}
                        renderInput={(params) => <TextField {...params} label="مزود الخدمة" />}
                    />
                </Grid>

                {/* الخدمة */}
                <Grid size={12}>
                    <Autocomplete
                        options={servicesData}
                        value={selectedService}
                        onChange={(_, newValue) => setSelectedService(newValue)}
                        getOptionLabel={(option: any) => option?.title || ""}
                        renderOption={(props, option: any) => (
                            <li {...props}>
                                {option.title} {/* يمكنك إضافة تفاصيل أخرى هنا إذا رغبت */}
                            </li>
                        )}
                        renderInput={(params) => <TextField {...params} label="الخدمة" />}
                    />
                </Grid>

                {/* تاريخ بدء الحجز */}
                <Grid size={6}>
                    <TextField
                        fullWidth
                        label="تاريخ بدء الحجز"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                    />
                </Grid>

                {/* مدة الحجز */}
                <Grid size={6}>
                    <Autocomplete
                        options={durations}
                        value={selectedDuration}
                        onChange={(_, newValue) => setSelectedDuration(newValue)}
                        renderInput={(params) => <TextField {...params} label="مدة الحجز" />}
                    />
                </Grid>

                {/* السعر النهائي */}
                <Grid size={12}>
                    <Box
                        textAlign="center"
                        p={2}
                        bgcolor="#F1FAFF"
                        borderRadius={2}
                        fontWeight="bold"
                    >
                        <Typography variant="h6">
                            السعر النهائي: <span style={{ color: '#000' }}>${finalPrice}</span>
                        </Typography>
                    </Box>
                </Grid>

                {/* زر الإنشاء */}
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
                        موافق وإنشاء
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateBooking;
