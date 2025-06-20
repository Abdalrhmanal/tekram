import Calendar from '@/components/calendar';
import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import GridCard from '@/components/grid-card';
import Tabber from '@/components/tabber';
import { Deblur } from '@mui/icons-material';
import React, { Suspense } from 'react'
import ServisecReserved from './component/services-reserved';

function BookingsProvider() {

    /*  const dataSourceName = "api/bookings-all";
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
 
     ]; */

    return (
        <>
            {/*  <Suspense fallback={<div>Loading...</div>}>
                <GridCard dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage=' '
                    isShowDetailse={false}
                    isPassDataDetailse={false}
                    fixedFilter={[{
                        field: "status",
                        operator: ComparisonOperator.Equals,
                        value: "pending"
                    }]} />
            </Suspense > */}
            <Tabber
                tabsData={[
                    {
                        label: "Delivery and receipt times",
                        icon: <Deblur />,
                        component: <Calendar /> ,
                    },
                    {
                        label: "Reserved services",
                        icon: <Deblur />,
                        component: <ServisecReserved />,
                    },
                    {
                        label: "Booking times for each service",
                        icon: <Deblur />,
                        component: <Calendar />,
                    }
                ]}
            />
        </>
    )
}

export default BookingsProvider