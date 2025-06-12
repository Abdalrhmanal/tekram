import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React, { Suspense } from 'react'

function Paused() {

    const dataSourceName = "api/service-units";
    const columns = [
        { headerName: "Title", field: "title", sortable: true },
        { headerName: "image", field: "image", sortable: true },
        { headerName: "Address", field: "address", sortable: true },
        { headerName: "Status", field: "status", sortable: true },
        { headerName: "Booking Duration", field: "bookingDuration", sortable: true },
        { headerName: "Price", field: "idPrice", sortable: true },
        { headerName: "Rating", field: "rating", sortable: true },
        { headerName: "Details", field: "details", sortable: true },

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
                      fixedFilter={[{
                          field: "status",
                          operator: ComparisonOperator.Equals,
                          value: "inactive"
                      }]} />
            </Suspense >
        </>
    )
}

export default Paused