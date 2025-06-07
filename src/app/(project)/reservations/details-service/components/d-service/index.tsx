import useGlobalData from '@/hooks/get-global';
import React from 'react'

function DService({ id }: { id: any; }) {
  const { data, isLoading, isFetching, isError, refetch } = useGlobalData({
        dataSourceName: `api/service-units/${id}/details`
    })
  return (
    <div>DService</div>
  )
}

export default DService