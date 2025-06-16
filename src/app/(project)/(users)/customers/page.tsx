import { Suspense } from 'react';
import GridTable from '@/components/data-table2'
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React from 'react'

function Customers() {
    const dataSourceName = "api/customers";
    const columns = [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "City", field: "city", sortable: true },
        { headerName: "Phone Number", field: "phone_number", sortable: true },
        { headerName: "Address", field: "address", sortable: true },
        { headerName: "Status", field: "is_active", sortable: true },
        { headerName: "wallet", field: "walletId", sortable: true },
    ];

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage='/customers/create'
                    isShowDetailse={true}
                    fixedFilter={[{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "user"
                    }]} />
            </Suspense >
        </>

    )
}

export default Customers