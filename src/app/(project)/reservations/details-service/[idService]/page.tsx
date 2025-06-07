import Tabber from '@/components/tabber'
import React from 'react'
import DImages from '../components/d-images'
import DQuistions from '../components/d-qustions'
import DPolicy from '../components/d-policy'
import DOrder from '../components/d-order'
import DService from '../components/d-service'
import { Deblur } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useParams } from 'next/navigation'

function DetailsService() {
    const params = useParams()
    const id = params?.idService;
    
    return (
        <>
            <Grid container alignItems="center" sx={{ mb: 3, mt: 2 }} >
                <Grid size={4} display="flex" gap={2} justifyContent="center">
                    <Button variant="contained" color="error">
                        Delete Service
                    </Button>
                    <Button variant="outlined" color="error">
                        Stop Service
                    </Button>
                </Grid>

                <Grid
                    size={8}
                    display="flex"
                    flexDirection="column"
                    alignItems={{ xs: "center", md: "flex-end" }}
                    gap={2}
                >
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid size={6} display="flex" justifyContent="center">
                            <Typography variant="caption" color="primary" fontWeight="bold">
                                حجز سيارة
                            </Typography>
                        </Grid>
                        <Grid size={6} display="flex" justifyContent="center">
                            <Box display="flex" alignItems="center">
                                <Typography variant="body2">
                                    حلب - الفرقان - شارع الاكسبريس
                                </Typography>
                                <LocationOnIcon fontSize="small" color="action" />
                            </Box>
                        </Grid>
                        <Grid size={6} display="flex" justifyContent="center">
                            <Typography variant="h6" fontWeight="bold">
                                BMW X5
                            </Typography>
                        </Grid>
                        <Grid size={6} display="flex" justifyContent="center">
                            <Box display="flex" alignItems="center">
                                <Typography variant="body2">
                                    مزود الخدمة: شركة العامري
                                </Typography>
                                <InfoOutlinedIcon fontSize="small" color="action" />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Tabber
                tabsData={[
                    {
                        label: "Details Order",
                        icon: <Deblur />,
                        component: <DOrder />,
                    },
                    {
                        label: "Details Service",
                        icon: <Deblur />,
                        component: <DService />,
                    },
                    {
                        label: "Images",
                        icon: <Deblur />,
                        component: <DImages />,
                    },
                    {
                        label: "QUistions",
                        icon: <Deblur />,
                        component: <DQuistions />,
                    },
                    {
                        label: "Policy",
                        icon: <Deblur />,
                        component: <DPolicy />,
                    },

                ]}
            />

        </>
    )
}

export default DetailsService