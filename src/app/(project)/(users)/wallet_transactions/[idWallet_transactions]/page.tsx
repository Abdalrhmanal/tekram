"use client";
import { Suspense } from 'react';
import GridTable from '@/components/data-table2'
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React from 'react'
import { useParams } from 'next/navigation';

function WalletTransactions() {
    const params = useParams()
    const id = params?.idWallet_transactions;

    const dataSourceName = `api/wallet/transactions/${id}`
    const columns = [
        { headerName: "Type", field: "type", sortable: true },
        { headerName: "Direction", field: "direction", sortable: true },
        { headerName: "Description", field: "description", sortable: true },
        { headerName: "Date", field: "idDate", sortable: false },
        { headerName: "Status", field: "status", sortable: true },
        { headerName: "Total Amount", field: "total_amount", sortable: true },
        { headerName: "Currency", field: "Idcurrency", sortable: false },
        { headerName: "Converted amount", field: "converted_amount", sortable: true },
        { headerName: "Rate", field: "exchange_rate", sortable: true },
    ];

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage='/users/WalletTransactions/create'
                    isShowDetailse={false}
                    /* fixedFilter={{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "user"
                    }} */ />
            </Suspense >
        </>

    )
}

export default WalletTransactions