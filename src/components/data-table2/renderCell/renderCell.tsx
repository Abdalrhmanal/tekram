import React from "react";
import { Typography, Chip, Grid, Avatar, Tooltip } from "@mui/material";

export const renderCell = (field: string, value: any, row: any): React.ReactNode => {
    const truncateText = (text?: string, maxLength: number = 15) => {
        if (!text) return "-";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };


    switch (field) {
        case "name":
            return (
                <>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={2}>
                            <Avatar alt={row.name} src={`http://145.223.116.44:9993/${row.avatar}`} />
                        </Grid>

                        <Grid size={10}>
                            <Grid container spacing={0.5}>
                                <Grid size={12}>
                                    <Tooltip title={row.name} arrow>
                                        <Typography fontWeight="bold">
                                            {truncateText(row.name)}
                                        </Typography>
                                    </Tooltip>
                                </Grid>
                                <Grid size={12}>
                                    <Tooltip title={row.email} arrow>
                                        <Typography fontWeight="bold">
                                            {truncateText(row.email)}
                                        </Typography>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            );
        case "idCurrency":
            return (
                <Typography fontWeight="bold">{`from ${row.from_currency} to ${row.to_currency}`}</Typography>
            );
        case "date":
            const formattedDate = row.date ? new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date(row.date)) : '';
            return <Typography fontWeight="bold">{formattedDate}</Typography>;
        case "idDate":
            const formattedDateFrom = row.start_date ? new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date(row.start_date)) : '';
            const formattedDateTo = row.end_date ? new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date(row.end_date)) : '';
            return <Typography fontWeight="p">{formattedDateFrom + " to " + formattedDateTo}</Typography>;
        case "created_at":
            const formattedcreated_at = row.created_at ? new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(new Date(row.created_at)) : '';

            return <>{formattedcreated_at}</>;
        case "is_active":
        case "status":
            return (
                <Chip
                    label={value ? "Active" : "Inactive"}
                    color={value ? "success" : "error"}
                    variant="outlined"
                    size="small"
                />
            );

        case "idservices":
            if (Array.isArray(row.services)) {
                return (
                    <Grid container spacing={0.5}>
                        {row.services.map((service: string, idx: number) => (
                            <Grid key={idx}>
                                <Chip
                                    label={service}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        ))}
                    </Grid>
                );
            }
            return "-";
        case "image":
            return (
                <img
                    alt={row?.title || "User"}
                    src={row?.image}
                    width={75}
                    height={75}
                    style={{ borderRadius: '15%' }}
                />
            );
        default:
            return value ?? "-";
    }
};
