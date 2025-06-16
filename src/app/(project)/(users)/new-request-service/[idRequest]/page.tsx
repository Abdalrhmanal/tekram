"use client";
import useGlobalData from '@/hooks/get-global';
import useCreateData from '@/hooks/post-global';
import { Box, Button, Checkbox, Chip, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import { truncateText } from '../../components/helpers';
import DocumentGallery from '../../components/document-gallery';

function DetailsNewRequest() {
    const route = useRouter()
    const params = useParams()
    const id = params?.idRequest;
    type HostDataType = {
        data?: any;
    };

    const { data: hostRSData, isLoading, isFetching, isError } = useGlobalData<HostDataType>({
        dataSourceName: `api/host-services-requests/${id}`,
    });
    const [approvedServices, setApprovedServices] = useState<string[]>([]);
    const [showRejectReason, setShowRejectReason] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    // عند تأكيد الرفض
    const handleRejectConfirm = () => {
        if (!rejectReason.trim()) {
            // يمكنك عرض رسالة تنبيه هنا إذا أردت
            return;
        }
        rejectData({ admin_notes: rejectReason });
        route.push('/users/account-s-prov')
    };
    // عند تغيير الشيكبوكس
    const handleServiceCheck = (serviceId: string, checked: boolean) => {
        setApprovedServices((prev) =>
            checked
                ? [...prev, serviceId]
                : prev.filter((id) => id !== serviceId)
        );
    };

    // عند الضغط على زر Approve
    const handleApprove = () => {
        if (approvedServices.length === 0) {
            // يمكنك عرض رسالة تنبيه هنا إذا أردت
            return;
        }
        approveData({ services: approvedServices });
        route.push('/users/account-s-prov')
    };

    const { isLoading: approveLod, isError: approveError, success: approveSucces, createData: approveData } = useCreateData({
        dataSourceName: `api/host-services-requests/${id}/approve`
    })

    const { isLoading: rejectLod, isError: rejectError, success: rejectSucces, createData: rejectData } = useCreateData({
        dataSourceName: `api/host-services-requests/${id}/reject`
    })

    return (
        <>
            <Box >
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid size={12}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ContactMailOutlinedIcon />
                                <Typography variant="h5" fontWeight="bold" align="left">
                                    Order Details
                                </Typography>
                            </Box>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid size={8}>
                        <Box sx={{ mb: 4, bgcolor: '#fff', padding: 2, borderRadius: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                {/* Profile Image Section */}
                                <Grid size={4} display="flex" justifyContent="center" alignItems="center">
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                            <img
                                                alt={hostRSData?.data?.name}
                                                src={hostRSData?.data?.image}
                                                width={150}
                                                height={150}
                                                style={{ borderRadius: '5%' }}
                                            />
                                        </Grid>
                                        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                            <Typography variant="h5" fontWeight="bold" align="center">
                                                {hostRSData?.data?.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Info Section */}
                                <Grid size={8}>
                                    <Grid container spacing={2} direction="column">
                                        <Grid size={12}>
                                            <Grid container spacing={2}>
                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Email
                                                    </Typography>
                                                    <Typography align="right">{truncateText(hostRSData?.data?.email)}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Mobile Number
                                                    </Typography>
                                                    <Typography align="right">{hostRSData?.data?.phone}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        City
                                                    </Typography>
                                                    <Typography align="right">{hostRSData?.data?.city}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Address
                                                    </Typography>
                                                    <Typography align="right">{truncateText(hostRSData?.data?.address)}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid size={4}>
                        <Box sx={{ mb: 4, bgcolor: '#fff', padding: 2, borderRadius: 2 }}>
                            <Typography variant="h5" fontWeight="bold" align="left" >
                                Service Type
                            </Typography>
                            <Divider />
                            <Grid container spacing={2} sx={{ p: 2 }}>
                                {hostRSData?.data?.requested_services.map((item: any) => (
                                    <Grid key={item.id} display="flex" justifyContent="center">
                                        <Chip
                                            label={item.type}
                                            color="primary"
                                            variant="outlined"
                                            sx={{ margin: '0 5px' }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ContactMailOutlinedIcon />
                                <Typography variant="h5" fontWeight="bold" align="left">
                                    Documents provided
                                </Typography>
                            </Box>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <DocumentGallery documents={hostRSData?.data?.license_files} />
                    </Grid>
                    <Grid size={12}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ContactMailOutlinedIcon />
                                <Typography variant="h5" fontWeight="bold" align="left">
                                    Procedures
                                </Typography>
                            </Box>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Typography textAlign="end" mb={1}>
                            Approval for:
                        </Typography>

                        <Grid container spacing={2} justifyContent="flex-end">
                            {hostRSData?.data?.requested_services.map((service: any) => (
                                <Grid size={3} key={service.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={approvedServices.includes(service.id)}
                                                onChange={(e) =>
                                                    handleServiceCheck(service.id, e.target.checked)
                                                }
                                            />
                                        }
                                        label={service.type}
                                        sx={{ justifyContent: "end", width: "100%", m: 0 }}
                                        labelPlacement="start"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box mt={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(to right, #2196f3, #4fc3f7)",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    py: 1.2,
                                }}
                                onClick={handleApprove}
                                disabled={approveLod}
                            >
                                {approveLod ? "plees white..." : "Approve"}
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3, borderColor: "error.main" }} />

                        <Typography color="error" fontWeight="bold" textAlign="end" mb={1}>
                            Reject Order
                        </Typography>

                        <Typography color="textSecondary" textAlign="end">
                            The order is not compatible, delete the order
                        </Typography>

                        {!showRejectReason && (
                            <Box mt={2}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    sx={{ fontWeight: "bold", borderRadius: 2, py: 1.2 }}
                                    onClick={() => setShowRejectReason(true)}
                                >
                                    Rejection
                                </Button>
                            </Box>
                        )}

                        {showRejectReason && (
                            <Box mt={2}>
                                <TextField
                                    label="Reason for rejection"
                                    value={rejectReason}
                                    onChange={e => setRejectReason(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={2}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    sx={{ fontWeight: "bold", borderRadius: 2, py: 1.2 }}
                                    onClick={handleRejectConfirm}
                                    disabled={rejectLod}
                                >
                                    {rejectLod ? "Sending..." : "Confirm Rejection"}
                                </Button>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default DetailsNewRequest