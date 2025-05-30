"use client";
import React from 'react'
import CardPersonDiynamec from '../../components/card-user'
import CardWalletTransaction from '../../components/card-wallet';
import DocumentGallery from '../../components/document-gallery';
import { useParams, useSearchParams } from 'next/navigation';
import useGlobalData from '@/hooks/git-global';

function DetailseCustomar() {
    const params = useParams()
    const searchParams = useSearchParams();
    const id = params?.idCustomar;

    const { data: wallet_transactions, isLoading, isFetching, isError } = useGlobalData({
        dataSourceName: `api/wallet/transactions/${id}`,
        pageSize : 5
    })
    const { data: bookings, isLoading: bookingsLod, isError: bookingsError } = useGlobalData({
        dataSourceName: `api/bookings/${id}`,
        pageSize : 5
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

    return (
        <>
            <CardPersonDiynamec user={user} />
            <br />
            <CardWalletTransaction data={wallet_transactions} title='Wallet Transaction' urlDetailse='/users/customers' />
            <br />
            <CardWalletTransaction data={bookings} title='Wallet Transaction' urlDetailse='/users/customers' />
            <br />


        </>
    )
}

export default DetailseCustomar;
