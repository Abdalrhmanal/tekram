"use client";
import React from "react";
import { Typography, Chip, Grid, Avatar, Tooltip, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export const renderCardCell = (field: string, value: any, row: any, isProfileProvider: boolean): React.ReactNode => {
    const truncateText = (text?: string, maxLength: number = 15) => {
        if (!text) return "-";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    const router = useRouter();

    switch (field) {
        case "unitId":
            return (
                <>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={2}>
                            ff fff
                        </Grid>

                        <Grid size={10}>
                            gg fff f
                        </Grid>
                    </Grid >
                </>
            );
        default:
            break;
    }
};
