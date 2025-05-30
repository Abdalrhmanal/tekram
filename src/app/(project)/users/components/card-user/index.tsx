import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Card,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';

function CardPersonDynamic({ user }: { user?: any }) {
    console.log("dd", user?.avatar);

    const truncateText = (text: string, maxLength: number = 25) =>
        text != null
            ? (text.length > maxLength ? text.substring(0, maxLength) + "..." : text)
            : "";

        return (
            <Box dir="rtl" mr={2}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography fontWeight="bold">Personal Information</Typography>

                    </AccordionSummary>
                    <Divider variant="middle" />
                    <AccordionDetails>
                        <Box sx={{ mb: 4 }}>
                            <Grid container spacing={2} alignItems="center">
                                {/* Profile Image Section */}
                                <Grid size={4} display="flex" justifyContent="center" alignItems="center">
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                            <img
                                                alt={user?.fullName || "User"}
                                                src={user?.avatar}
                                                width={150}
                                                height={150}
                                                style={{ borderRadius: '5%' }}
                                            />
                                        </Grid>
                                        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                            <Typography variant="h5" fontWeight="bold" align="center">
                                                {user.fullName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Info Section */}
                                <Grid size={8}>
                                    <Grid container spacing={2} direction="column">
                                        <Grid size={12}>
                                            <Grid container spacing={2}>
                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Email
                                                    </Typography>
                                                    <Typography align="right">{truncateText(user.email)}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Mobile Number
                                                    </Typography>
                                                    <Typography align="right">{user.mobile}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        City
                                                    </Typography>
                                                    <Typography align="right">{user.city}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Address
                                                    </Typography>
                                                    <Typography align="right">{truncateText(user.address)}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Registration Date
                                                    </Typography>
                                                    <Typography align="right">{user.registerDate}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    }

    export default CardPersonDynamic;