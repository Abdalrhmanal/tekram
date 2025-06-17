"use client";
import React from "react";
import { Typography, Chip, Grid, Avatar, Tooltip, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export const renderCell = (field: string, value: any, row: any, isProfileProvider?: boolean): React.ReactNode => {
    const truncateText = (text?: string, maxLength: number = 15) => {
        if (!text) return "-";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    const router = useRouter();

    switch (field) {
        case "name_host":
            return (
                <>
                    <Grid container spacing={2} alignItems="center">
                        <Box onClick={() => {
                            if (row.host?.id) {
                                router.push(`/profil-user/${row.host.id}`);
                            }
                        }}>
                            <Grid size={2}>
                                <Avatar alt={row.name} src={`http://145.223.116.44:9993/${row.host.logo}`} />
                            </Grid>

                            <Grid size={10}>
                                <Grid container spacing={0.5}>
                                    <Grid size={12}>
                                        <Tooltip title={row.host.name} arrow>
                                            <Typography fontWeight="bold">
                                                {truncateText(row.host.name)}
                                            </Typography>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </>
            );
        case "name_customer":
            return (
                <>
                    <Grid container spacing={2} alignItems="center">
                        <Box onClick={() => {
                            if (row.customer?.id) {
                                router.push(`/profil-user/${row.customer.user_id}`);
                            }
                        }}>
                            <Grid size={2}>
                                <Avatar alt={row.name} src={`http://145.223.116.44:9993/${row.customer.avatar}`} />
                            </Grid>

                            <Grid size={10}>
                                <Grid container spacing={0.5}>
                                    <Grid size={12}>
                                        <Tooltip title={row.customer.name} arrow>
                                            <Typography fontWeight="bold">
                                                {truncateText(row.customer.name)}
                                            </Typography>
                                        </Tooltip>
                                    </Grid>
                                    <Grid size={12}>
                                        <Tooltip title={row.customer.gender} arrow>
                                            <Typography fontWeight="bold">
                                                {truncateText(row.customer.gender)}
                                            </Typography>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </>
            );
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
        case "idPrice":
            return (
                <Typography fontWeight="bold">{`from ${row.price}  ${row.currency}`}</Typography>
            );
        case "iddetails":
            return (
                <div
                    style={{ marginBottom: 24 }}
                    dangerouslySetInnerHTML={{ __html: row.details }}
                />
            );
        case "namehostid":
            return (
                <Typography
                    fontWeight="bold"
                    sx={{ cursor: "pointer", color: "primary.main" }}
                    onClick={() => {
                        if (row.host?.id) {
                            if (isProfileProvider) {
                                router.push(`/reservation-requests/${row.host.id}`);
                            } else {
                                router.push(`/profil-user/${row.host.id}`);
                            }
                        }
                    }}
                >
                    {row.host?.name ?? "-"}
                </Typography>
            );
        case "nameguestid":
            return (<>
                <Typography
                    fontWeight="bold"
                    sx={{ cursor: "pointer", color: "primary.main" }}
                    onClick={() => {
                        if (row.guest?.id) {
                            if (isProfileProvider) {
                                router.push(`/reservation-requests/${row.guest.id}`);
                            } else {
                                router.push(`/profil-user/${row.guest.id}`);
                            }
                        }
                    }}
                >
                    {row.guest?.name ?? "-"}
                </Typography>
            </>

            );
        case "serviceId":
            return (
                <Typography
                    fontWeight="bold"
                    sx={{ cursor: "pointer", color: "primary.main" }}
                    onClick={() => {
                        if (row.unit?.id) {
                            router.push(`/reservations/details-service/${row.unit.id}`);
                        }
                    }}
                >
                    {row.service?.name ?? "-"}
                </Typography>
            );
        case "unitId":
            return (
                <Typography fontWeight="bold">
                    {row.unit?.title ?? "-"}
                </Typography>
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

        case "idsDate":
            const startDate = row.start_date ? new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date(row.start_date)) : '';
            return <Typography fontWeight="bold">{startDate}</Typography>;
        case "iddDate":
            const endDate = row.end_date ? new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date(row.end_date)) : '';
            return <Typography fontWeight="bold">{endDate}</Typography>;

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
