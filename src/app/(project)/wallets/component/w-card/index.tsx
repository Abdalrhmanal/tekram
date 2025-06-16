import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Divider, Alert } from '@mui/material';
import PopUp from '@/components/popup';
import Withdraw from '../w-withdraw';

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

interface WithdrawProps {
    onSuccess?: (response?: any) => void;
    onCancel?: () => void;
}

const WalletsCard = ({ data }: WalletsCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalBody, setModalBody] = useState<React.ReactNode>(<></>);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const renderAlert = () =>
        alert && (
            <Box
                sx={{
                    position: 'fixed',
                    top: 32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1400,
                    minWidth: 300,
                    maxWidth: 400,
                }}
            >
                <Alert
                    severity={alert.type}
                    onClose={() => setAlert(null)}
                    sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                    {alert.message}
                </Alert>
            </Box>
        );
    const handleWithdrawSuccess = (response: any) => {
        if (response?.status === 200 || response?.status === 201) {
            setAlert({ type: 'success', message: response?.message || 'تم تنفيذ السحب بنجاح.' });
        } else {
            setAlert({ type: 'error', message: response?.message || 'حدث خطأ أثناء تنفيذ العملية.' });
        }
        setModalOpen(false);
    };

    const handleWithdrawCancel = () => {
        setModalOpen(false);
    };

    const handleOpenModal = (title: string, message: string, body: React.ReactNode) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalOpen(true);
        setModalBody(body);
    };

    if (!data || data.length === 0) {
        return <Typography variant="h5">No data available</Typography>;
    }

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
            {renderAlert()}
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
                                        onClick={() => handleOpenModal('Delete Wallet', 'Are you sure you want to delete this wallet?', null)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() =>
                                            handleOpenModal(
                                                'Withdraw',
                                                '',
                                                <Withdraw
                                                    onSuccess={handleWithdrawSuccess}
                                                    onCancel={handleWithdrawCancel}
                                                />
                                            )
                                        }
                                    >
                                        Withdraw
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handleOpenModal('Transfer', 'Please confirm the transfer process.', null)}
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