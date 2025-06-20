"use client";
import { ComparisonOperator, GlobalDataType } from '@/components/data-table2/type/type';
import GridCard from '@/components/grid-card';
import useGlobalDataT from '@/hooks/git-global';
import { Box, Chip, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'

function ServisecNow() {
    const dataSourceName = "api/hosts-bookings";
  
    const filterData = [
        {
            field: "is_started",
            operator: ComparisonOperator.Equals,
            value: "1"
        },
        {
            field: "is_completed",
            operator: ComparisonOperator.Equals,
            value: "0"
        }
    ];
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
    const filterLogic = "OR";
    const { data: GlobalData, isLoading: GlobalLoading, refetch, isError } = useGlobalDataT<GlobalDataType>({
        dataSourceName,
        enabled: true,
        filter_Conditions: filterData,
        filter_Logic: filterLogic,
        setOldDataAsPlaceholder: true,
    });
    return (
        <>
            <Box>
                <Typography variant="h6" color="initial">Servisec Now</Typography>
                <Grid container spacing={2} alignItems="center">
                    {GlobalData?.data.map((row, index) => (<>
                        <Grid size={4} key={index}>
                            <Grid size={12} >
                                <Typography
                                    fontWeight="bold"
                                    sx={{ cursor: "pointer", color: "primary.main" }}
                                    onClick={() => {
                                        if (row.guest?.id) {
                                            router.push(`/bookings/profile/${row.guest.id}`);
                                        }
                                    }
                                    }
                                >
                                    {row.guest?.name ?? "-"}
                                </Typography>
                            </Grid >
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
                    ))}
                </Grid>
            </Box >

        </>
    )
}

export default ServisecNow