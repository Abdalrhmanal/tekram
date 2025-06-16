import useCreateData from '@/hooks/post-global';
import React from 'react'

function Transfer() {

    const { isLoading, isError, success, createData } = useCreateData({
        dataSourceName: `api/wallet/transfer/`,
    });
    return (
        <>
            Transfer
        </>
    )
}

export default Transfer