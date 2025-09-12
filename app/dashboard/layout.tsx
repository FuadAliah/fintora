import Header from '@/components/core/header';
import SideMenu from '@/components/core/side-menu';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row">
                <div className="order-2 md:order-none w-full md:w-[260px]">
                    <SideMenu />
                </div>

                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 px-8">{children}</main>
                </div>
            </div>
        </>
    );
}

export default layout;
