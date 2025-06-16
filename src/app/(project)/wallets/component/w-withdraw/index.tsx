import React, { useState } from "react";
import Cookies from "js-cookie";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Stack,
} from "@mui/material";
import useCreateData from "@/hooks/post-global";

const MAX_WITHDRAW = 500;


interface WithdrawProps {
    onSuccess?: (response?: any) => void;
    onCancel?: () => void;
}

function Withdraw({ onSuccess, onCancel }: WithdrawProps) {
    const rawCookie = Cookies.get("user_data");
    const parsedCookie = rawCookie ? JSON.parse(decodeURIComponent(rawCookie)) : null;
    const id = parsedCookie?.id;

    const [amount, setAmount] = useState<number>(0);

    const { isLoading, isError, success, createData } = useCreateData({
        dataSourceName: `api/wallet/withdraw/${id}`,
    });

    const handleWithdraw = () => {
        const withdrawAmount = Math.min(amount, MAX_WITHDRAW);

        createData({
            amount: withdrawAmount,
            currency: "USD",
            description: "Cashout",
        }).then((res) => {
            if (onSuccess) onSuccess();
        });
    };

    React.useEffect(() => {
        if (success && onSuccess) {
            onSuccess();
        }
        // eslint-disable-next-line
    }, [success]);

    return (
        <Box mx="auto" mt={1}>
            <Stack spacing={2}>
                <Typography variant="h6" textAlign="right">
                    أدخل الرقم الذي سحبته من المحفظة
                </Typography>

                <TextField
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    fullWidth
                    inputProps={{ min: 0 }}
                />

                <Alert severity="info" sx={{ textAlign: "right", backgroundColor: "#f3f9fc" }}>
                    الحد الأعلى للسحب: ${MAX_WITHDRAW} والباقي سيتم إضافته كدين
                </Alert>

                <Box >
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onCancel}
                        sx={{ m: 1 }}
                    >
                        إلغاء
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleWithdraw}
                        disabled={isLoading || !amount}
                        sx={{ m: 1 }}
                    >
                        موافق
                    </Button>
                </Box>

                {isError && <Alert severity="error">حدث خطأ أثناء تنفيذ العملية.</Alert>}
                {success && <Alert severity="success">تم تنفيذ السحب بنجاح.</Alert>}
            </Stack>
        </Box>
    );
}

export default Withdraw;