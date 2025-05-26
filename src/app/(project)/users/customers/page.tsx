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
            <GridTable dataSourceName={dataSourceName}
                columns={columns} isCreated={true}
                toCreateURLPage='/users/customers/create'
                isShowDetailse={false}
                fixedFilter={{
                    field: "role.name",
                    operator: ComparisonOperator.Equals,
                    value: "user"
                }} />
        </>
    )
}

export default Customers