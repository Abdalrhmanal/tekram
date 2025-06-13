"use client";
import React from 'react'
import { useParams, usePathname } from 'next/navigation';
import ProfileUsers from '@/app/(project)/profil-user/structure-profil';

function Profile() {
    const params = useParams()
    const id = params?.profilecustomar;

    return (
        <>
            <ProfileUsers
                id={`${id}`}
                dataSourceNameWallet={`api/wallet/transactions`}
                dataSourceNameBookings={`api/hosts-bookings`}
                urlAllDatawallet_transactions={'api/wallet/transactions'}
                urlAllDatabookings={'api/hosts-bookings'}
            />
        </>
    )
}

export default Profile