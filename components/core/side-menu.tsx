'use client';
import { usePathname } from 'next/navigation';
import { AuthRoutes, Routes } from '@/utils/routes';
import Link from 'next/link';
import Image from 'next/image';

export const getActiveClass = (route: string, pathname: string) => {
    return pathname === route ? 'bg-primary/10 text-primary' : 'text-white';
};

export const getParentActiveClass = (route: string, pathname: string) => {
    return pathname.includes(route) ? 'text-primary' : 'text-white';
};

export default function SideMenu() {
    const pathname = usePathname();
    const routes = Object.values(Routes);

    return (
        <aside className="hidden fixed w-[260px] h-full md:block md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-2 bg-secondary-dark">
            <div className="p-4">
                <Link href={AuthRoutes.HOME}>
                    <Image alt="" src="/logo.svg" className="h-8 min-w-10 w-auto" width={40} height={40} />
                </Link>
            </div>
            <ul className={`flex flex-col gap-1 h-full p-4`}>
                {routes
                    .filter((route) => typeof route === 'object')
                    .map((route) => {
                        return (
                            <li key={route.url}>
                                <Link
                                    className={`flex items-center gap-3 px-2.5 py-3 text-sm rounded-md hover:bg-primary/10 ${getActiveClass(route.url, pathname)} transition-colors duration-200`}
                                    href={route.url}
                                >
                                    <route.icon className="w-4 h-4" />
                                    {route.label}
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </aside>
    );
}
