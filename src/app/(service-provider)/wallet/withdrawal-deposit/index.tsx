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
    const [open, setOpen] = React.useState(false);
    const [depositAmount, setDepositAmount] = React.useState<number | undefined>();
    const [paymentMethod, setPaymentMethod] = React.useState('USD');
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

    const { createData } = useCreateData({
        dataSourceName: `api/wallet/deposit/${id}`
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (!depositAmount || !paymentMethod) return;

        const payload = {
            amount: depositAmount,
            currency: paymentMethod,
            description: description 
        };

        try {
            await createData(payload).then((res) => {
            if (onSuccess) onSuccess();
        });;
            setAlert({
                open: true,
                type: 'success',
                message: 'Deposit completed successfully'
            });
            handleClose();
        } catch (error) {
            setAlert({
                open: true,
                type: 'error',
                message: 'Failed to complete the deposit, please try again later'
            });
        }
    };

    return (
        <>
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
                    Cash
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
                    onClick={handleOpen}
                >
                    <DownloadIcon sx={{ mb: 0.5 }} />
                    Deposit
                </Button>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Deposit to Wallet</DialogTitle>
                <DialogContent>
                    <DialogContentText>Choose the amount you want to deposit:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="depositAmount"
                        label="Deposit Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                    />

                    <DialogContentText>Payment Method</DialogContentText>
                    <Autocomplete
                        fullWidth
                        options={Array.isArray(dataCurrency?.data) ? dataCurrency.data : []}
                        value={paymentMethod}
                        onChange={(event, newValue) => {
                            setPaymentMethod(newValue || '');
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Currency" variant="standard" />
                        )}
                    />

                    <DialogContentText>Note</DialogContentText>
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description / Note"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Deposit</Button>
                </DialogActions>
            </Dialog>

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
