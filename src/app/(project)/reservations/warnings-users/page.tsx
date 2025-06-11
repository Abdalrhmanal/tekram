import Tabber from '@/components/tabber'
import { Deblur } from '@mui/icons-material'
import React from 'react'
import WarningCustomar from './components/w-customar'
import WarnningSProvider from './components/w-services-provider'

function WarningsUsers() {

    return (
        <>
            <Tabber
                tabsData={[
                    {
                        label: "Warning Customars",
                        icon: <Deblur />,
                        component: <WarningCustomar />,
                    },
                    {
                        label: "Warning Services Provider ",
                        icon: <Deblur />,
                        component: <WarnningSProvider />,
                    }

                ]}
            />
        </>
    )
}

export default WarningsUsers