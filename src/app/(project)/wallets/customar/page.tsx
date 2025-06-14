import GridTable from '@/components/data-table2';
import { ComparisonOperator } from '@/components/data-table2/type/type';
import React, { Suspense } from 'react'

function WalletsCustomars() {

    const dataSourceName = `api/wallet/users-wallets`
    const columns = [
        { headerName: "Nomper", field: "number", sortable: true },
        { headerName: "Name", field: "name", sortable: true },
    ];

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <GridTable dataSourceName={dataSourceName}
                    columns={columns}
                    isCreated={false}
                    toCreateURLPage=''
                    isShowDetailse={true}
                    isPassDataDetailse={true}
                    fixedFilter={[{
                        field: "roles.name",
                        operator: ComparisonOperator.Equals,
                        value: "user"
                    }]} />
            </Suspense >
        </>

    )
}

export default WalletsCustomars