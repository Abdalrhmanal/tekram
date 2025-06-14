"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation';
import CardWalletTransaction from '@/app/(project)/users/components/card-wallet';
import CardPersonDynamic from '@/app/(project)/users/components/card-user';
import useGlobalData from '@/hooks/get-global';
import useGlobalDataT from '@/hooks/git-global';

interface IProfileUsers {
    id?: string | any;
    dataSourceNameWallet?: string;
    dataSourceNameBookings?: string;
    urlAllDatawallet_transactions: string;
    urlAllDatabookings: string;
}

function ProfileUsers({ id, dataSourceNameWallet, dataSourceNameBookings, urlAllDatawallet_transactions, urlAllDatabookings }: IProfileUsers) {

    const { data: wallet_transactions, isLoading, isFetching, isError } = useGlobalDataT({
        dataSourceName: `${dataSourceNameWallet}/${id}`,
        pageSize: 5
    })
    const { data: bookings, isLoading: bookingsLod, isError: bookingsError } = useGlobalDataT({
        dataSourceName: `${dataSourceNameBookings}/${id}`,
        pageSize: 5
    })

    interface UserResponse {
        data?: any; 
        [key: string]: any;
    }

    const { data: user, isLoading: userLod, isError: userError } = useGlobalData<UserResponse>({
        dataSourceName: `api/profile/${id}`,
    })

    const urlAllDatawallet_transactionsTO = `/${urlAllDatawallet_transactions}/${id}`
    const urlAllDatabookingsTO = `/${urlAllDatabookings}/${id}`
    return (
        <>
            <CardPersonDynamic user={user?.data} />
            <br />
            <CardWalletTransaction data={wallet_transactions} title='Wallet Transaction' urlDetailse={urlAllDatawallet_transactionsTO} />
            <br />
            <CardWalletTransaction data={bookings} title='Bookings' urlDetailse={urlAllDatabookingsTO} />
            <br />
        </>
    )
}

export default ProfileUsers;
