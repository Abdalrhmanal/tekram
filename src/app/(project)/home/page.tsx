import GridTable from '@/components/data-table2';
import React from 'react'

function HomePage() {
    const dataSourceName = "api/companies";
    const columns = [
       { headerName: "ID", field: "id", sortable: true }, 
      { headerName: "Name", field: "company_name", sortable: false },
      { headerName: "description", field: "description", sortable: true },
      { headerName: "company_email", field: "company_email", sortable: true },
      { headerName: "company_address", field: "company_address", sortable: true },
    ];
    return (
        <>
            HomePage
            <GridTable dataSourceName={dataSourceName} columns={columns} />
        </>
    )
}

export default HomePage