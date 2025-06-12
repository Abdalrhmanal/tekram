"use client";
import Tabber from '@/components/tabber'
import React from 'react'

import { Deblur } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useParams } from 'next/navigation'
import useCreateData from '@/hooks/post-global';
import useDeleteData from '@/hooks/delete-of1';
import DOrder from '../../reservations/details-service/components/d-order';
import DService from '../../reservations/details-service/components/d-service';
import DImages from '../../reservations/details-service/components/d-images';
import DQuistions from '../../reservations/details-service/components/d-qustions';
import DPolicy from '../../reservations/details-service/components/d-policy';

function DetailsService() {
    const params = useParams()
    const id = params?.idService;
    const { isLoading, isError, success, deleteData } = useDeleteData({
        dataSourceName: `/api/service-units/${id}`,
    });

    const { isLoading: stopLog, isError: stopError, success: stopSucces, createData } = useCreateData({
        dataSourceName: `api/service-units/${id}`,
    })
    return (
        <>
            <Grid container alignItems="center" sx={{ mb: 3, mt: 2 }} >
                <Grid size={4} display="flex" gap={2} justifyContent="center">
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteData()}
                        disabled={isLoading}
                    >
                        حذف الخدمة
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => createData({ status: "stopped" })}
                        disabled={stopLog}
                    >
                        إيقاف الخدمة مؤقتًا
                    </Button>
                </Grid>

                <Grid
                    size={8}
                    display="flex"
                    flexDirection="column"
                    alignItems={{ xs: "center", md: "flex-end" }}
                    textAlign={{ xs: "center", md: "right" }}
                    gap={2}
                >
                    <Typography variant="caption" color="primary" fontWeight="bold">
                        حجز سيارة
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                        BMW X5
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">
                            حلب - الفرقان - شارع الاكسبريس
                        </Typography>
                        <LocationOnIcon fontSize="small" color="action" />
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">
                            مزود الخدمة: شركة العامري
                        </Typography>
                        <InfoOutlinedIcon fontSize="small" color="action" />
                    </Box>
                </Grid>
            </Grid>


            <Tabber
                tabsData={[
                    {
                        label: "Details Order",
                        icon: <Deblur />,
                        component: <DOrder id={id} />,
                    },
                    {
                        label: "Details Service",
                        icon: <Deblur />,
                        component: <DService id={id} />,
                    },
                    {
                        label: "Images",
                        icon: <Deblur />,
                        component: <DImages id={id} />,
                    },
                    {
                        label: "QUistions",
                        icon: <Deblur />,
                        component: <DQuistions id={id} />,
                    },
                    {
                        label: "Policy",
                        icon: <Deblur />,
                        component: <DPolicy id={id} />,
                    },

                ]}
            />

        </>
    )
}

export default DetailsService