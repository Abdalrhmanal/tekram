import useGlobalData from '@/hooks/get-global';
import React from 'react'

function DQuistions({ id }: { id: any; }) {
  const { data, isLoading, isFetching, isError, refetch } = useGlobalData({
        dataSourceName: `api/service-units/${id}/questions`
    })
  return (
    <div>DQuistions</div>
  )
}

export default DQuistions