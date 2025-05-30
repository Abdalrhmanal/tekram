"use client";
import { Suspense } from 'react';
import GridTable from '@/components/data-table2'
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React from 'react'
import { useParams } from 'next/navigation';

function BookingsDetailse() {
    const params = useParams()
    const id = params?.idBookings;

    const dataSourceName = `api/bookings/${id}`
    const columns = [
        { headerName: "Title", field: "title", sortable: true },
        { headerName: "Image", field: "image", sortable: true },
        { headerName: "Unit Type", field: "unit_type", sortable: true },
        { headerName: "Description", field: "description", sortable: true },
        { headerName: "Address", field: "address", sortable: true },
        { headerName: "Date", field: "idData", sortable: false },
        { headerName: "Status", field: "status", sortable: true },
        { headerName: "Total Amount", field: "total_amount", sortable: true },
        { headerName: "Currency", field: "currency", sortable: false },
        { headerName: "Booking Duration", field: "bookingDuration", sortable: true },
        { headerName: "Rate", field: "rating", sortable: true },
        { headerName: "notes", field: "notes", sortable: true },
    ];

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage=''
                    isShowDetailse={false}
                    /* fixedFilter={{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "user"
                    }} */ />
            </Suspense >
        </>

    )
}

export default BookingsDetailse