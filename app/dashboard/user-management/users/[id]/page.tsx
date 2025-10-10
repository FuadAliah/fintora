'use client';

import { useEffect, useState } from 'react';

export default function UserPage({ params }: { params: { id: string } }) {
    const [user, setUser] = useState('');
    console.log('id', params.id);

    const fetchUser = async () => {
        try {
            const query = new URLSearchParams({
                id: params.id.toString(),
            });

            const res = await fetch(`/api/users?${query.toString()}`);

            const data = await res.json();
            setUser(data.data || []);
        } catch (err) {
            console.error('Error fetching user:', err);
        }
    };

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    return (
        <div>
            <h1>{JSON.stringify(user)}</h1>
            {/* <p>{user.email}</p> */}
        </div>
    );
}
