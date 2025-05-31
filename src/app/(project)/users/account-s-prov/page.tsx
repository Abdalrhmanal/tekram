import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React, { Suspense } from 'react'

function AccountSProv() {
    const dataSourceName = "api/host-requests";
    const columns = [
        { headerName: "Name", field: "name", sortable: true },
        { headerName: "City", field: "city", sortable: true },
        { headerName: "Phone Number", field: "phone", sortable: true },
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

export default AccountSProv