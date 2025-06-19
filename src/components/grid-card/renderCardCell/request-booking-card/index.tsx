"use client";

import React, { useState } from "react";
import {
    Typography,
    Chip,
    Grid,
    Button,
    Alert,
    Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useCreateData from "@/hooks/post-global";

interface UnitCardDetailsProps {
    value: any;
    row: any;
    isProfileProvider: boolean;
    onSuccess?: (response?: any) => void
}

const UnitCardDetails: React.FC<UnitCardDetailsProps> = ({
    value,
    row,
    isProfileProvider,
    onSuccess
}) => {
    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const router = useRouter();

    const dateFormat = (date: string | Date) => {
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(new Date(date));
    };

    const {
        isLoading,
        createData,
    } = useCreateData({ dataSourceName: `api/bookings/${row.id}/confirm` });

    const {
        isLoading: cancelLoading,
        createData: cancelData,
    } = useCreateData({ dataSourceName: `api/bookings/${row.id}/cancel` });

    const handleApprove = async () => {
        try {
            await createData({});
            if (onSuccess) {
                onSuccess();
            }
            setAlert({ type: "success", message: "Booking approved successfully." });
        } catch {
            setAlert({ type: "error", message: "Failed to approve booking." });
        }
    };

    const handleReject = async () => {
        try {
            await cancelData({});
            if (onSuccess) {
                onSuccess();
            }
            setAlert({ type: "success", message: "Booking rejected successfully." });
        } catch {
            setAlert({ type: "error", message: "Failed to reject booking." });
        }
    };

    return (
        <>
            {alert && (
                <Box sx={{ mb: 2 }}>
                    <Alert
                        severity={alert.type}
                        onClose={() => setAlert(null)}
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                        {alert.message}
                    </Alert>
                </Box>
            )}
            <Grid container spacing={2} alignItems="center">
                <Grid size={12}>
                    <Typography
                        fontWeight="bold"
                        sx={{ cursor: "pointer", color: "primary.main" }}
                        onClick={() =>
                            row.guest?.id &&
                            router.push(
                                isProfileProvider
                                    ? `/reservation-requests/${row.guest.id}`
                                    : `/profil-user/${row.guest.id}`
                            )
                        }
                    >
                        {row.guest?.name ?? "-"}
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Typography
                        fontWeight="bold"
                        sx={{ cursor: "pointer", color: "primary.main" }}
                        onClick={() =>
                            row.unit?.id &&
                            router.push(`/reservation-requests/details-service/${row.unit.id}`)
                        }
                    >
                        {row.service?.name ?? "-"}
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Typography align="left">
                        from : {dateFormat(row.start_date)} to : {dateFormat(row.end_date)}
                    </Typography>
                </Grid>

                <Grid size={4}>
                    <Chip
                        label={value ? "Active" : "Inactive"}
                        color={value ? "success" : "error"}
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid size={4}>
                    <Typography align="right">{row.duration}</Typography>
                </Grid>

                <Grid size={4}>
                    <Typography align="right">{row.total_amount}</Typography>
                </Grid>

                <Grid size={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApprove}
                        disabled={isLoading}
                    >
                        {isLoading ? "Approving..." : "Approve"}
                    </Button>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleReject}
                        disabled={cancelLoading}
                    >
                        {cancelLoading ? "Rejecting..." : "Reject"}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default UnitCardDetails;
