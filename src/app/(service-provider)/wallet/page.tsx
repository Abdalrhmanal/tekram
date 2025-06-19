"use client";
import React from 'react';
import {
    Box,
    Typography,
    Card,
    Button,
    IconButton,
    Stack,
    Avatar,
    Grid,
    Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import useGlobalData from '@/hooks/get-global';
import Cookies from "js-cookie";
import { Skeleton } from '@mui/material';
import { formatDateTime, getIcon, iconByType } from '@/app/(project)/(users)/components/helpers';



function WalletProvider() {
    const userDataCookie = Cookies.get("user_data");

    let id: string | undefined = undefined;
    if (userDataCookie) {
        try {
            const userData = JSON.parse(decodeURIComponent(userDataCookie));
            id = userData.userId;
        } catch {
            id = undefined;
        }
    }

    const { data = {}, isLoading, isError, refetch } = useGlobalData({
        dataSourceName: `api/helper/user-wallets/${id}`
    });
    const { data: dataRecord, isLoading: lodRecord, isError: errRecord, refetch: refRedord } = useGlobalData({
        dataSourceName: `api/wallet/transactions`
    });
    const wallets = (data as { data?: { wallets?: any[] } })?.data?.wallets || [];

    return (
        <Box p={2} sx={{ direction: 'rtl', bgcolor: '#f8f9fa' }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    overflowX: "auto",
                    pb: 1,
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": { height: 8 },
                    "&::-webkit-scrollbar-thumb": { bgcolor: "#ccc", borderRadius: 4 },
                }}
            >
                {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                minWidth: 250,
                                bgcolor: '#3a3a3a',
                                color: 'white',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center',
                                flex: "0 0 auto",
                            }}
                        >
                            <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: "#555", mx: "auto" }} />
                            <Skeleton variant="text" width={100} height={40} sx={{ bgcolor: "#666", mx: "auto", mt: 2 }} />
                        </Card>
                    ))
                    : wallets.map((wallet: any) => (
                        <Card
                            key={wallet.id}
                            sx={{
                                minWidth: 250,
                                bgcolor: '#3a3a3a',
                                color: 'white',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center',
                                flex: "0 0 auto",
                            }}
                        >
                            <Typography variant="subtitle2">{wallet.currency}</Typography>
                            <Typography variant="h3" fontWeight={600} my={1}>
                                {wallet.balance}
                            </Typography>
                        </Card>
                    ))}

            </Box>

            <Box
                sx={{
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                    mt: -6
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 4,
                        p: 2,
                        borderRadius: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: 80,
                            py: 2,
                        }}
                    >
                        <UploadIcon sx={{ mb: 0.5 }} />
                        سحب
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            minWidth: 80,
                            py: 2,
                        }}
                    >
                        <DownloadIcon sx={{ mb: 0.5 }} />
                        إيداع
                    </Button>
                </Card>
            </Box>

            <Stack direction="row" justifyContent="space-between" mt={4} mb={1}>
                <Typography variant="h6">The Record</Typography>
            </Stack>

            <Stack spacing={2}>
                {lodRecord
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <Box key={index} sx={{ p: 2 }}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                    <Grid size={1} display="flex" justifyContent="flex-start" alignItems="center">
                                        <Skeleton variant="circular" width={32} height={32} />
                                    </Grid>
                                    <Grid size={9} display="flex" justifyContent="flex-start" alignItems="center">
                                        <Skeleton variant="text" width="100%" height={28} />
                                    </Grid>
                                    <Grid size={2} display="flex" justifyContent="center" alignItems="center">
                                        <Skeleton variant="text" width="80%" height={28} />
                                    </Grid>
                                </Grid>

                                <Grid size={12} display="flex" justifyContent="flex-end" alignItems="center">
                                    <Skeleton variant="text" width="30%" height={20} />
                                </Grid>
                            </Grid>
                            <Divider variant="middle" sx={{ mt: 1 }} />
                        </Box>
                    ))
                    : Array.isArray((dataRecord as any)?.data) &&
                    (dataRecord as any).data.map((item: any, index: number) => (
                        <Box key={item.id} sx={{ p: 2 }}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                    <Grid size={1} display="flex" justifyContent="flex-start" alignItems="center">
                                        {iconByType(item.type || item.unit_type)}
                                    </Grid>
                                    <Grid size={9} display="flex" justifyContent="flex-start" alignItems="center">
                                        <Typography variant="h6" align="center">
                                            {item.description} {item.status}
                                        </Typography>
                                    </Grid>
                                    <Grid size={2} display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant="h6" fontWeight="bold" align="center">
                                            {item.total_amount} {item.from_currency}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid size={12} display="flex" justifyContent="flex-end" alignItems="center">
                                    <Typography align="right">
                                        {`in: ${formatDateTime(item.created_at)}`}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Divider variant="middle" />
                        </Box>
                    ))
                }
            </Stack>
        </Box>
    );
}

export default WalletProvider;