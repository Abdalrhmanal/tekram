import GridTable from '@/components/data-table2'
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
            <GridTable dataSourceName={dataSourceName} columns={columns} />
        </>
    )
}

export default Customers