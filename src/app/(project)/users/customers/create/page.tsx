import React from 'react'
import CardPersonDiynamec from '../../components/card-user'
import CardWalletTransaction from '../../components/card-wallet';
import DocumentGallery from '../../components/document-gallery';

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

    const wtranszction = [
        {
            messages: 'This is a sample wallet transaction detail.',
            deta: '2025-05-10 12:00:00',
            type: 'Deposit',
            quantity: 100,
            unit: 'USD'
        }, {
            messages: 'Another Transaction This is another sample wallet transaction detail.',
            deta: '2025-05-10 12:00:00',
            type: 'Withdrawal',
            quantity: 100,
            unit: 'USD'
        },
        {
            messages: 'This is a sample wallet transaction detail.',
            deta: '2025-05-10 12:00:00',
            type: 'Refund',
            quantity: 100,
            unit: 'USD'
        }, {
            messages: 'Another Transaction This is another sample wallet transaction detail.',
            deta: '2025-05-10 12:00:00',
            type: 'Deduction',
            quantity: 100,
            unit: 'USD'
        }
    ];

    
    return (
        <>
            <CardPersonDiynamec user={user} />
            <br />
            <CardWalletTransaction data={wtranszction} title='Wallet Transaction' urlDetailse='/users/customers' />
            <br />
            <CardWalletTransaction data={wtranszction} title='Wallet Transaction' urlDetailse='/users/customers' />
            <br />
            

        </>
    )
}

export default CreateCustomar;
