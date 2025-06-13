"use client";
import React, { useState } from 'react';
import useGlobalData from '@/hooks/get-global';
import { Box, Grid, Card, CardContent, Typography, Divider, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import WalletsCard, { WalletsCardProps } from './component/w-card';
import GridTable from '@/components/data-table2';
import { ContactEmergency, Deblur } from '@mui/icons-material';
import Tabber from '@/components/tabber';
import Transactions from './component/w-tranaction';
import useCreateData from '@/hooks/post-global';

// Define expected data type from the API
interface WalletStatistics {
    message: string;
    data: {
        withdrawals: {
            USD: number;
            EUR: number;
            TRY: number;
            SAR: number;
        };
        profits: {
            USD: number;
            EUR: number;
            TRY: number;
            SAR: number;
        };
    };
}

function Wallets() {
    
    const { data, isLoading, isFetching, isError, refetch } = useGlobalData<WalletStatistics>({
        dataSourceName: 'api/wallets-statistics/financial',
    });
    const { data: dataWallets, isLoading: lodWallets, isError: errWallets } = useGlobalData<WalletsCardProps>({
        dataSourceName: 'api/wallets-statistics/formated',
    });
    const renderCurrencyTotal = (currencyData: Record<string, number>, currency: string): React.ReactNode => (
        <span style={{ color: '#42a5f5', fontWeight: 'bold' }}>
            {currency} {currencyData[currency]}
        </span>
    );

    if (isLoading || isFetching) {
        return <Typography variant="h5">Loading...</Typography>;
    }

    if (isError) {
        return <Typography variant="h5">An error occurred while fetching data.</Typography>;
    }

    if (!data || !data.data) {
        return <Typography variant="h5">No data available.</Typography>;
    }

    const withdrawals = data.data.withdrawals;
    const profits = data.data.profits;


    if (lodWallets) return <div>Loading...</div>;
    if (errWallets) return <div>Error loading data</div>;
    const dataSourceName = "api/wallets-statistics/income";
    const columns = [
        { headerName: "Number", field: "number", sortable: true },
        { headerName: "Commission", field: "commission", sortable: true },
        { headerName: "Wallet", field: "wallet", sortable: true },
        { headerName: "Created Date", field: "created_at", sortable: true },
        { headerName: "Booking Amount", field: "booking_amount", sortable: true },
        { headerName: "Name Customer", field: "name_customer", sortable: true },
        { headerName: "Name Host", field: "name_host", sortable: true },
        { headerName: "Duration", field: "duration", sortable: true },
        { headerName: "total amount", field: "total_amount", sortable: true },

    ];
   

    return (
        <Box sx={{ flexGrow: 1, pr: 2, }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ContactEmergency />
                            <Typography variant="h5" fontWeight="bold" align="left">
                                Statistics
                            </Typography>
                        </Box>
                        <Divider />
                    </Box>
                </Grid>
                {/* Total Withdrawals */}
                <Grid size={6}>
                    <Card sx={{ padding: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <span>Total Withdrawals</span>
                                    <ArrowDownwardIcon color="error" />
                                </Box>
                            </Typography>
                            <Divider sx={{ margin: '16px 0' }} />
                            <Typography variant="body1">
                                {renderCurrencyTotal(withdrawals, 'USD')} : USD Wallet
                            </Typography>
                            <Typography variant="body1">
                                {renderCurrencyTotal(withdrawals, 'TRY')} : Turkish Lira Cash
                            </Typography>
                            <Typography variant="body1">
                                {renderCurrencyTotal(withdrawals, 'EUR')} : EUR Cash
                            </Typography>
                            <Typography variant="body1">
                                {renderCurrencyTotal(withdrawals, 'SAR')} : SAR Cash
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Profits */}
                <Grid size={6}>
                    <Card sx={{ padding: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <span>Total Profits</span>
                                    <ArrowUpwardIcon color="success" />
                                </Box>
                            </Typography>
                            <Divider sx={{ margin: '16px 0' }} />
                            <Typography variant="body1">
                                {renderCurrencyTotal(profits, 'USD')} : USD Wallet
                            </Typography>
                            <Typography variant="body1">
                                {renderCurrencyTotal(profits, 'TRY')} : Turkish Lira Cash
                            </Typography>
                            <Typography variant="body1">
                                {renderCurrencyTotal(profits, 'EUR')} : EUR Cash
                            </Typography>
                            <Typography variant="body1">
                                {renderCurrencyTotal(profits, 'SAR')} : SAR Cash
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ContactEmergency />
                            <Typography variant="h5" fontWeight="bold" align="left">
                                Wallets
                            </Typography>
                        </Box>
                        <Divider />
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Button size="small" variant="outlined">
                        Add a new wallet
                    </Button>
                </Grid>
                <WalletsCard data={dataWallets?.data} />

                <Tabber
                    tabsData={[
                        {
                            label: "Revenue record",
                            icon: <Deblur />,
                            component: <GridTable dataSourceName={dataSourceName}
                                columns={columns}
                                isCreated={false}
                                toCreateURLPage=' '
                                isShowDetailse={false}
                                isPassDataDetailse={false}
                            />,
                        },
                        {
                            label: "Draw record",
                            icon: <Deblur />,
                            component: <Transactions />,
                        }
                    ]}
                />
            </Grid>
        </Box>
    );
}

export default Wallets;
