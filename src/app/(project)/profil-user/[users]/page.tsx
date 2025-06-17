"use client";
import React from 'react'
import ProfileUsers from '../structure-profil'
import { useParams, usePathname } from 'next/navigation';

function Profile() {
    const params = useParams()
    const id = params?.users;

    return (
        <>
            <ProfileUsers
                id={id}
                dataSourceNameWallet={`api/wallet/transactions`}
                dataSourceNameBookings={`api/hosts-bookings`}
                urlAllDatawallet_transactions={'api/wallet/transactions'}
                urlAllDatabookings={'api/hosts-bookings'}
            />
        </>
    )
}

export default Profile