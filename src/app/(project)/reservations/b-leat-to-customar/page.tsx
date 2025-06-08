import GridTable from '@/components/data-table2';
import React, { Suspense } from 'react'

function BokingLeatToCustomar() {

    const dataSourceName = "api/bookings-all";
    const columns = [
        { headerName: "Guest Name", field: "nameguestid", sortable: true },
        { headerName: "Host Name", field: "namehostid", sortable: true },
        { headerName: "Service", field: "serviceId", sortable: true },
        { headerName: "Start Date", field: "idsDate", sortable: true },
        { headerName: "End Date", field: "iddDate", sortable: true },
        { headerName: "Unit", field: "unitId", sortable: true },
        { headerName: "Status", field: "status", sortable: true },
        { headerName: "Duration", field: "duration", sortable: true },
        { headerName: "total amount", field: "total_amount", sortable: true },

    ];

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage=' '
                    isShowDetailse={false}
                    isPassDataDetailse={false}
                   /*  fixedFilter={{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "user"
                    }} */ />
            </Suspense >
        </>
    )
}

export default BokingLeatToCustomar