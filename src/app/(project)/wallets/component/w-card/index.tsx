import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Divider } from '@mui/material';

// Define the wallet data interface
export interface WalletData {
    currency: string;
    total_balance: number;
    admin_share: number;
    hosts_share: number;
    users_share: number;
    debt: number;
}

export interface WalletsCardProps {
    data?: WalletData[];
}

const WalletsCard = ({ data }: WalletsCardProps) => {
    if (!data || data.length === 0) {
        return <Typography variant="h5">No data available</Typography>;
    }

    // دوال التنسيق الملونة
    const renderCurrencyTotal = (wallet: WalletData) => (
        <span style={{ color: '#42a5f5', fontWeight: 'bold' }}>
            {wallet.currency} {wallet.total_balance}
        </span>
    );
    const renderCurrencyDebtTotal = (wallet: WalletData) => (
        <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
            {wallet.currency} {wallet.debt}
        </span>
    );
    const renderCurrencyAdminShareTotal = (wallet: WalletData) => (
        <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>
            {wallet.currency} {wallet.admin_share}
        </span>
    );

    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2}>
                {data.map((wallet, index) => (
                    <Grid size={4} key={index}>
                        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {renderCurrencyTotal(wallet)}
                                </Typography>

                                <Divider sx={{ marginY: 2 }} />

                                <Typography variant="body2" gutterBottom>
                                    Admin Share: <strong>{renderCurrencyAdminShareTotal(wallet)}</strong>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Hosts Share: <strong style={{ color: '#2196f3' }}>{wallet.currency} {wallet.hosts_share}</strong>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Users Share: <strong style={{ color: '#2196f3' }}>{wallet.currency} {wallet.users_share}</strong>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Debt: <strong>{renderCurrencyDebtTotal(wallet)}</strong>
                                </Typography>

                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                    <Button size="small" variant="outlined" color="error">
                                        Delete
                                    </Button>
                                    <Button size="small" variant="outlined">
                                        Withdraw
                                    </Button>
                                    <Button size="small" variant="outlined">
                                        Transfer
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WalletsCard;