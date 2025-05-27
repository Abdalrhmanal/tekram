import React from 'react'
import CardPersonDiynamec from '../../components/card-user'

function CreateCustomar() {
    const user = {
        fullName: 'Amer Ahmed Al-Mohammad',
        email: 'kareem.happal@gmail.com',
        mobile: '0934565412',
        city: 'Aleppo',
        address: 'Al-Zahra Association',
        registerDate: '2025/05/10',
        image: '/images/image.png',
    };
    return (
        <>
            <CardPersonDiynamec user={user} />
        </>
    )
}

export default CreateCustomar