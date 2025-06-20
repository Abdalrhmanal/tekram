import { Chip, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

interface UnitCardDetailsProps {
    value: any;
    row: any;
    isProfileProvider: boolean;
    onSuccess?: (response?: any) => void
}

function ServisecCard({ value, row, isProfileProvider, onSuccess }: UnitCardDetailsProps) {
    const router = useRouter();

    const dateFormat = (date: string | Date) => {
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(new Date(date));
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid size={12} >
                    <Typography
                        fontWeight="bold"
                        sx={{ cursor: "pointer", color: "primary.main" }}
                        onClick={() => {
                            if (row.guest?.id) {
                                if (isProfileProvider) {
                                    router.push(`/bookings/profile/${row.guest.id}`);
                                } else {
                                    router.push(`/profil-user/${row.guest.id}`);
                                }
                            }
                        }}
                    >
                        {row.guest?.name ?? "-"}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <img
                        src={row.image ?? ""}
                        width={'100%'}
                        height={'200px'}
                        alt='Audi A4 2012'
                    />
                </Grid>
                <Grid size={12}>
                    <Typography
                        fontWeight="bold"
                        sx={{ cursor: "pointer", color: "primary.main" }}
                    >
                        {row.title ?? "-"}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Typography align="left">
                        from : {dateFormat(row.start_date)} to : {dateFormat(row.end_date)}
                    </Typography>
                </Grid>
                <Grid size={4}>
                    <Chip
                        label={row.status ? "Active" : "Inactive"}
                        color={row.status ? "success" : "error"}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid size={4}>
                    <Chip
                        label={row.booking_status === 1 ? "Active" : "Inactive"}
                        color={row.booking_status === 1 ? "success" : "error"}
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid size={4}>
                    <Typography align="right">{row.details}</Typography>
                </Grid>
                <Grid size={4}>
                    <Typography align="right">{row.address}</Typography>
                </Grid>
                <Grid size={4}>
                    <Typography align="right">{row.bookingDuration}</Typography>
                </Grid>
                <Grid size={4}>
                    <Typography align="right">{row.rating}</Typography>
                </Grid>
                <Grid size={4}>
                    <Typography align="right">{row.price} {row.currency}</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ServisecCard
