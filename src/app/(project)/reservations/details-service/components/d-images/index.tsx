import useGlobalData from '@/hooks/get-global';
import React from 'react'

function DImages({ id }: { id: any; }) {
    const { data, isLoading, isFetching, isError, refetch } = useGlobalData({
        dataSourceName: `api/service-units/${id}/media`
    })
    return (
        <div>DImages</div>
    )
}

export default DImages