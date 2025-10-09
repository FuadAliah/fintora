import React from 'react';
import { UserProfile } from '@/app/_components/user-profile';

const Header = () => {
    return (
        <header className="py-4 px-8">
            <div className="flex justify-end items-center mx-auto">
                <UserProfile />
            </div>
        </header>
    );
};

export default Header;
