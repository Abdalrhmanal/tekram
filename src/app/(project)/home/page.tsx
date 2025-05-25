import Calendar from '@/components/calendar';
import GridTable from '@/components/data-table2';
import { Container } from '@mui/material';
import React from 'react'

function HomePage() {
    /* const dataSourceName = "api/companies";
    const columns = [
       { headerName: "ID", field: "id", sortable: true }, 
      { headerName: "Name", field: "company_name", sortable: false },
      { headerName: "description", field: "description", sortable: true },
      { headerName: "company_email", field: "company_email", sortable: true },
      { headerName: "company_address", field: "company_address", sortable: true },
    ]; */
    return (
        <>
            HomePage
            {/* <GridTable dataSourceName={dataSourceName} columns={columns} /> */}
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Calendar />
            </Container>
        </>
    )
}

export default HomePage