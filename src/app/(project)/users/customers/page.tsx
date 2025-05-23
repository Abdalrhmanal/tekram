import GridTable from '@/components/data-table2'
import React from 'react'

function Customers() {
    const dataSourceName = "api/customers";
    const columns = [
        { headerName: "ID", field: "id", sortable: true },
        { headerName: "Name", field: "company_name", sortable: false },
        { headerName: "description", field: "description", sortable: true },
        { headerName: "company_email", field: "company_email", sortable: true },
        { headerName: "company_address", field: "company_address", sortable: true },
    ];
    return (
        <>
            <GridTable dataSourceName={dataSourceName} columns={columns} />
        </>
    )
}

export default Customers