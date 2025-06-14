"use client";
import React from 'react'
import ProfileUsers from './structure-profil'
import { usePathname } from 'next/navigation';

function Profile({id}: {id?: string | any}) {
 /*    const pathname = usePathname();
    const id = pathname.split('/').pop(); */

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