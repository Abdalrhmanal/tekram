import GridTable from '@/components/data-table2';
import React, { Suspense } from 'react'

function ServiceDeplye() {

const dataSourceName = "api/service-units";
    const columns = [
        { headerName: "Title", field: "title", sortable: true },
        { headerName: "image", field: "image", sortable: true },
        { headerName: "Address", field: "address", sortable: true },
        { headerName: "Status", field: "status", sortable: true },
        { headerName: "Booking Duration", field: "bookingDuration", sortable: true },
        { headerName: "Price", field: "idPrice", sortable: true },
        { headerName: "Rating", field: "rating", sortable: true },
        { headerName: "Details", field: "iddetails", sortable: true },

    ];


    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage=' '
                    isShowDetailse={true}
                    isPassDataDetailse={true}
                   /*  fixedFilter={{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "user"
                    }} */ />
            </Suspense >
        </>
    )
}

export default ServiceDeplye