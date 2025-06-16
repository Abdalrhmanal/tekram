"use client";
import Profile from '@/app/(project)/profil-user/page'
import ProfileUsers from '@/app/(project)/profil-user/structure-profil';
import { formatDate, getWalletName } from '@/app/(project)/components/helpers';
import { Box, Divider, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react'

function ProfileHostsWelltes() {
    const params = useParams()
    const searchParams = useSearchParams();
    const id = params?.profwallets;

    let welltes = null;
    const rowData = searchParams.get('row');
    if (rowData) {
        try {
            welltes = JSON.parse(decodeURIComponent(rowData));
        } catch (e) {
            welltes = null;
        }
    }
    return (
        <>
            <ProfileUsers
                id={id}
                dataSourceNameWallet={`api/wallet/transactions`}
                dataSourceNameBookings={`api/hosts-bookings`}
                urlAllDatawallet_transactions={'api/wallet/transactions'}
                urlAllDatabookings={'api/hosts-bookings'}
            />
            <Divider style={{ margin: '20px 0' }} />
            <Box sx={{ p: 2, borderRadius: 2 }}>
                {welltes.wallets.map((txn: any) => (
                    <Box
                        key={txn.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 2,
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        {/* Description */}
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {" "}
                            <span style={{ color: "#0077b6", fontWeight: "bold" }}>{txn.balance}</span>{" "}
                           {" "}
                            <span style={{ color: "#0077b6", fontWeight: 600 }}>
                                {getWalletName(txn.currency)}
                            </span>
                        </Typography>
                    </Box>
                ))}
            </Box>
        </>
    )
}

export default ProfileHostsWelltes