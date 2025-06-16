"use client";
import React from 'react'
import CardWalletTransaction from '../../components/card-wallet';
import { useParams, useSearchParams } from 'next/navigation';
import useGlobalData from '@/hooks/git-global';
import CardPersonDynamic from '../../components/card-user';

function DetailseCustomar() {
    const params = useParams()
    const searchParams = useSearchParams();
    const id = params?.idCustomar;

    const { data: wallet_transactions, isLoading, isFetching, isError } = useGlobalData({
        dataSourceName: `api/wallet/transactions/${id}`,
        pageSize: 5
    })
    const { data: bookings, isLoading: bookingsLod, isError: bookingsError } = useGlobalData({
        dataSourceName: `api/bookings/${id}`,
        pageSize: 5
    })


    let user = null;
    const rowData = searchParams.get('row');
    if (rowData) {
        try {
            user = JSON.parse(decodeURIComponent(rowData));
        } catch (e) {
            user = null;
        }
    }
    const urlAllDatawallet_transactions = `/users/wallet_transactions/${id}`
    const urlAllDatabookings = `/users/bookings/${id}`
    return (
        <>
            <CardPersonDynamic user={user} />
            <br />
            <CardWalletTransaction data={wallet_transactions} title='Wallet Transaction' urlDetailse={urlAllDatawallet_transactions} />
            <br />
            <CardWalletTransaction data={bookings} title='Wallet Transaction' urlDetailse={urlAllDatabookings} />
            <br />
        </>
    )
}

export default DetailseCustomar;
