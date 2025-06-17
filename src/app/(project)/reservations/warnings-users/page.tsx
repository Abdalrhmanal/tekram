import Tabber from '@/components/tabber'
import { Deblur } from '@mui/icons-material'
import React, { Suspense } from 'react'
import WarningCustomar from './components/w-customar'
import WarnningSProvider from './components/w-services-provider'

function WarningsUsers() {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </>
    )
}

export default WarningsUsers