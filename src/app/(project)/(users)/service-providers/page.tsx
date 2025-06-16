import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React from 'react'
import { Suspense } from 'react';

function ServiceProviders() {

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
                    columns={columns} isCreated={true}
                    toCreateURLPage='/service-providers/create'
                    isShowDetailse={true}
                    fixedFilter={[{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "host"
                    }]}
                />
            </Suspense>
        </>
    )
}

export default ServiceProviders