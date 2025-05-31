import GridTable from '@/components/data-table2';
import React, { Suspense } from 'react'

function NewRequestServices() {

    const dataSourceName = "api/host-services-requests";
    const columns = [
        { headerName: "Name", field: "host_name", sortable: true },
        { headerName: "City", field: "cihost_cityty", sortable: true },
        { headerName: "Phone Number", field: "host_phone", sortable: true },
        { headerName: "Status", field: "status", sortable: true },
        { headerName: "Services", field: "idservices", sortable: false },
    ];

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage=''
                    isShowDetailse={true}
                    isPassDataDetailse={false}
                    /* fixedFilter={{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "user"
                    }} */ />
            </Suspense>
        </>
    )
}

export default NewRequestServices