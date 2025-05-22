import React from "react";
import { Typography, Chip, Grid, Avatar } from "@mui/material";

export const renderCell = (field: string, value: any, row: any): React.ReactNode => {
    switch (field) {
        case "company_name":
            return (
                <Typography fontWeight="bold" sx={{ color: "red" }}>{row.company_name || ''}</Typography>
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

        case "created_at":
            const formattedcreated_at = row.created_at ? new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',             
            }).format(new Date(row.created_at)) : '';

            return <>{formattedcreated_at}</>;

        default:
            return value ?? "-";
    }
};
