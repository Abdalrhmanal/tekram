import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React, { Suspense } from 'react'

function ReservationsAll() {
    const dataSourceName = "api/bookings-all";
    const columns = [
        { headerName: "Guest Name", field: "nameguestid", sortable: true },
        { headerName: "Host Name", field: "namehostid", sortable: true },
        { headerName: "Service", field: "serviceId", sortable: true },
        { headerName: "Unit", field: "unitId", sortable: true },
        { headerName: "Status", field: "status", sortable: true },
        { headerName: "Duration", field: "duration", sortable: true },
        { headerName: "total amount", field: "total_amount", sortable: true },
        { headerName: "Date", field: "idDate", sortable: true },
    ];

    /* 
    {
            "guest": {
                "id": "7067a0f9-cae6-49fc-8634-e8020f17469b",
                "name": "test dali"
            },
            "host": {
                "id": "33968b9e-26d3-4ef6-9f49-40f9f31e332b",
                "name": "\u0627\u0644\u062c\u0631\u064a\u062f \u0645\u0633\u0627\u0647\u0645\u0629 \u0639\u0627\u0645\u0629"
            },
            "service": {
                "id": "b86964a0-7c85-4027-93d6-0ecdda4f6f1c",
                "name": "\u0627\u0644\u0639\u0631\u0641\u062c  \u0630.\u0645.\u0645 Service"
            },
            "unit": {
                "id": "64418076-618c-4a41-8a90-74c171e29a93",
                "title": "dolorem"
            },
        }
    
    */
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

export default ReservationsAll