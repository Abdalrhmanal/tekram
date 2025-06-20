import { Box, Divider } from '@mui/material'
import React from 'react'
import ServisecNow from './services-now'
import ServisecLater from './servisec-later'

function ServisecReserved() {

    return (
        <>
            <Box>
                <ServisecNow />
                <Divider sx={{ my: 2 }} />
                <ServisecLater />
            </Box>
        </>
    )
}

export default ServisecReserved