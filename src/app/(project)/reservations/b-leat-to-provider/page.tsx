import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React, { Suspense } from 'react'
import { getCurrentDateString } from '../../(users)/components/helpers';

function BokingLeatToProviderServices() {

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
    const today = getCurrentDateString();
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage=' '
                    isShowDetailse={false}
                    isPassDataDetailse={false}
                    fixedFilter={[{
                        field: "start_date",
                        operator: ComparisonOperator.Between,
                        value: today
                    }, {
                        field: "start_date",
                        operator: ComparisonOperator.Equals,
                        value: "0"
                    }]} />
            </Suspense >
        </>
    )
}

export default BokingLeatToProviderServices