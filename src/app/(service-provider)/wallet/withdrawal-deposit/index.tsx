"use client";
import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Card,
    Autocomplete,
    Snackbar,
    Alert,
    Slide,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import useGlobalData from '@/hooks/get-global';
import useCreateData from '@/hooks/post-global';

function SlideTransition(props: any) {
    return <Slide {...props} direction="left" />;
}

function WithdrawalDeposit({ id, onSuccess }: { id: string | undefined; onSuccess?: (response?: any) => void }) {
    const [depositOpen, setDepositOpen] = React.useState(false);
    const [withdrawOpen, setWithdrawOpen] = React.useState(false);
    const [amount, setAmount] = React.useState<number | undefined>();
    const [currency, setCurrency] = React.useState('USD');
    const [description, setDescription] = React.useState('');
    const [alert, setAlert] = React.useState<{ open: boolean, type: 'success' | 'error', message: string }>({
        open: false,
        type: 'success',
        message: ''
    });

    type CurrencyData = { data: string[] };
    const { data: dataCurrency } = useGlobalData<CurrencyData>({
        dataSourceName: `api/helper/currencies`
    });

    const { createData: depositData, success, isError } = useCreateData({
        dataSourceName: `api/wallet/deposit/${id}`
    });

    const { createData: withdrawData, success: withdrawS, isError: withdrawERR } = useCreateData({
        dataSourceName: `api/wallet/withdraw/${id}`
    });

    const handleAlert = (type: 'success' | 'error', message: string) => {
        setAlert({ open: true, type, message });
    };

    const handleSubmit = async (action: 'deposit' | 'withdraw') => {
        if (!amount || !currency) return;

        const payload = {
            amount,
            currency,
            description: description || (action === 'deposit' ? 'Recharge' : 'Cashout')
        };

        try {
            const res = action === 'deposit'
                ? await depositData(payload)
                : await withdrawData(payload);

            const message =  'Operation completed successfully';
            handleAlert('success', message);
            if (onSuccess) onSuccess();
            action === 'deposit' ? setDepositOpen(false) : setWithdrawOpen(false);
        } catch (error: any) {
            const apiMessage = error?.response?.data?.message;
            const errorsArray = error?.response?.data?.errors;
            const fallbackMessage = 'Operation failed, please try again later';
            const message = apiMessage || (Array.isArray(errorsArray) && errorsArray[0]) || fallbackMessage;

            handleAlert('error', message);
        }
    };


    const renderDialog = (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, action: 'deposit' | 'withdraw') => (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{action === 'deposit' ? 'Deposit to Wallet' : 'Withdraw from Wallet'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {action === 'deposit' ? 'Choose the amount you want to deposit:' : 'Choose the amount you want to withdraw:'}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                <DialogContentText>Currency</DialogContentText>
                <Autocomplete
                    fullWidth
                    options={Array.isArray(dataCurrency?.data) ? dataCurrency.data : []}
                    value={currency}
                    onChange={(event, newValue) => setCurrency(newValue || '')}
                    renderInput={(params) => (
                        <TextField {...params} label="Currency" variant="standard" />
                    )}
                />

                <DialogContentText>Note</DialogContentText>
                <TextField
                    margin="dense"
                    label="Description / Note"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => handleSubmit(action)} color="primary">
                    {action === 'deposit' ? 'Deposit' : 'Withdraw'}
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <>
            <Card
                sx={{ display: 'flex', justifyContent: 'center', gap: 4, p: 2, borderRadius: 2 }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80, py: 2 }}
                    onClick={() => setWithdrawOpen(true)}
                >
                    <UploadIcon sx={{ mb: 0.5 }} />
                    Cash
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80, py: 2 }}
                    onClick={() => setDepositOpen(true)}
                >
                    <DownloadIcon sx={{ mb: 0.5 }} />
                    Deposit
                </Button>
            </Card>

            {renderDialog(depositOpen, setDepositOpen, 'deposit')}
            {renderDialog(withdrawOpen, setWithdrawOpen, 'withdraw')}

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={alert.open}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, open: false })}
                TransitionComponent={SlideTransition}
            >
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.type} sx={{ width: '100%' }} dir="rtl">
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default WithdrawalDeposit;