import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Divider } from '@mui/material';
import PopUp from '@/components/popup';
import ProfileUsers from '@/app/(project)/profil-user/structure-profil';

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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalBody, setModalBody] = useState<React.ReactNode>(<></>);
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
    const handleOpenModal = (title: string, message: string, body: React.ReactNode) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalOpen(true);
        setModalBody(body)
    };
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
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleOpenModal('Delete Wallet', 'Are you sure you want to delete this wallet?',null)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleOpenModal('Withdraw', 'Please confirm the withdrawal process.',null)}
                                    >
                                        Withdraw
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleOpenModal('Transfer', 'Please confirm the transfer process.',null)}
                                    >
                                        Transfer
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <PopUp
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
                body={modalBody}
            />
        </Box>
    );
};

export default WalletsCard;