
import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React, { Suspense } from 'react'

function ReservationRequestsProvider() {

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
                    isProfileProvider={true}
                    fixedFilter={[{
                        field: "status",
                        operator: ComparisonOperator.Equals,
                        value: "pending"
                    }]} />
            </Suspense >
        </>
    )
}

export default ReservationRequestsProvider