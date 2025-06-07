import useGlobalData from '@/hooks/get-global';
import React from 'react'

function DPolicy({ id }: { id: any; }) {
    const { data, isLoading, isFetching, isError, refetch } = useGlobalData({
        dataSourceName: `api/service-units/${id}/cancellation-policies`
    })
    return (
        <div>
            DPolicy
        </div>
    )
}

export default DPolicy