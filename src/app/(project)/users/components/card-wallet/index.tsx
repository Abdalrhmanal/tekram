"use client";
import {
    Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Card, Divider, Grid, Typography
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getIcon } from '../helpers';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { useRouter } from "next/navigation";
function CardWalletTransaction({ data, title, urlDetailse }: { data?: any; title?: string, urlDetailse?: string }) {
    const router = useRouter();
    return (
        <Box dir="rtl" mr={2}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography fontWeight="bold">{title}</Typography>

                </AccordionSummary>
                <Divider variant="middle" />
                <AccordionDetails>
                    <Box sx={{ mb: 1 }}>
                        {data.map((item: any, index: number) => (
                            <Box key={index} sx={{ p: 2 }}>
                                <Grid container spacing={1} alignItems="center">
                                    {/* Profile Image Section */}
                                    <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                        <Grid size={1} display="flex" justifyContent="flex-start" alignItems="center">
                                            {getIcon(item.type)}
                                        </Grid>
                                        <Grid size={9} display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6" align="center">
                                                {item.messages}
                                            </Typography>
                                        </Grid>
                                        <Grid size={2} display="flex" justifyContent="center" alignItems="center">
                                            <Typography variant="h6" fontWeight="bold" align="center">
                                                {item.quantity} {item.unit}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid size={12} display="flex" justifyContent="flex-end" alignItems="center">
                                        <Typography align="right">{item.deta}</Typography>
                                    </Grid>

                                </Grid>
                                <Divider variant="middle" />
                            </Box>
                        ))}
                        <Box sx={{ mt: 2, ml: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Box
                                sx={{
                                    bgcolor: '#3bcf7a', p: 1, borderRadius: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', width: 'fit-content'
                                }}
                                onClick={() => {
                                    if (urlDetailse) {
                                        router.push(urlDetailse);
                                    }
                                }}
                            >
                                <Typography align="left" sx={{ mr: 1 }}>
                                    Show All
                                </Typography>
                                <ArrowRightAltOutlinedIcon />
                            </Box>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default CardWalletTransaction;