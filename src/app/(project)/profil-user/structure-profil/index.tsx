"use client";
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import CardWalletTransaction from '@/app/(project)/(users)/components/card-wallet';
import CardPersonDynamic from '@/app/(project)/(users)/components/card-user';
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
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: wallet_transactions } = useGlobalDataT({
        dataSourceName: `${dataSourceNameWallet}/${id}`,
        pageSize: 5
    });
    const { data: bookings } = useGlobalDataT({
        dataSourceName: `${dataSourceNameBookings}/${id}`,
        pageSize: 5
    });

    interface UserResponse {
        data?: any;
        [key: string]: any;
    }

    const { data: user } = useGlobalData<UserResponse>({
        dataSourceName: `api/profile/${id}`,
    });

    const userName = user?.data?.name || 'User';
    const urlAllDatawallet_transactionsTO = `/${urlAllDatawallet_transactions}/${id}`;
    const urlAllDatabookingsTO = `/${urlAllDatabookings}/${id}`;

    useEffect(() => {
        if (userName && searchParams.get("name") !== userName) {
            const params = new URLSearchParams(Array.from(searchParams.entries()));
            params.set("name", userName);
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [userName]);

    return (
        <>
            <CardPersonDynamic user={user?.data} />
            <br />
            <CardWalletTransaction data={wallet_transactions} title='Wallet Transaction' urlDetailse={urlAllDatawallet_transactionsTO} />
            <br />
            <CardWalletTransaction data={bookings} title='Bookings' urlDetailse={urlAllDatabookingsTO} />
            <br />
        </>
    );
}

export default ProfileUsers;