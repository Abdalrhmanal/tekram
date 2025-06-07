import useGlobalData from '@/hooks/get-global';
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';

interface Policy {
    id: string | number;
    is_default: boolean;
    key: string;
    description: string;
    value: string | number;
    operation: string;
}

interface PoliciesResponse {
    data: Policy[];
}

function DPolicy({ id }: { id: any; }) {
    const { data, isLoading, isFetching, isError, refetch } = useGlobalData<PoliciesResponse>({
        dataSourceName: `api/service-units/${id}/cancellation-policies`
    });

    const policies = data?.data || [];

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography color="error">Error loading policies.</Typography>;
    if (!policies.length) return <Typography>No cancellation policies found.</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Cancellation Policies
            </Typography>
            <Grid container spacing={2}>
                {policies.map((policy: any) => (
                    <Grid size={6} key={policy.id}>
                        <Card variant="outlined" sx={{ borderColor: policy.is_default ? 'primary.main' : 'grey.300' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Chip
                                        label={policy.is_default ? "Default" : "Custom"}
                                        color={policy.is_default ? "primary" : "default"}
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                    <Typography fontWeight="bold" color="primary.main">
                                        {policy.key.replace(/_/g, ' ')}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    {policy.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Value: <b>{policy.value}</b> | Operation: <b>{policy.operation}</b>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default DPolicy;