import React from 'react';

export default async function Transactions() {
    const res = await fetch('http://localhost:3000/api/transaction');
    const data = await res.json();
    console.log(data.data);
    return <div>page</div>;
}
