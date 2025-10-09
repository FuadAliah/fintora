'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Routes } from '@/utils/routes';
import Link from 'next/link';
import Image from 'next/image';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown } from 'lucide-react';

export const getActiveClass = (route: string, pathname: string) => {
    return pathname === route ? 'bg-primary/10 text-primary' : 'text-white';
};

export const getParentActiveClass = (route: string, pathname: string) => {
    return pathname.includes(route) ? 'text-primary' : 'text-white';
};

export default function SideMenu() {
    const pathname = usePathname();
    const routes = Object.values(Routes);

    const [openCollapsible, setOpenCollapsible] = useState<Record<string, boolean>>({});

    const toggleOpenCollapsible = (url: string, value: boolean) => {
        setOpenCollapsible((prev) => ({ ...prev, [url]: value }));
    };

    return (
        <aside className="hidden fixed w-[260px] h-full md:block md:row-start-2 md:row-end-3 md:col-start-1 md:col-end-2 bg-secondary-dark">
            <div className="p-4">
                <Link href={Routes.HOME}>
                    <Image alt="" src="/logo.svg" className="h-8 min-w-10 w-auto" width={40} height={40} />
                </Link>
            </div>
            <ul className={`flex flex-col gap-1 h-full p-4`}>
                {routes
                    .filter((route) => typeof route === 'object')
                    .map((route) => {
                        const isOpen = openCollapsible[route.url] || false;
                        return (
                            <li key={route.url}>
                                {!route?.children ? (
                                    <Link
                                        className={`flex items-center gap-3 px-2.5 py-3 text-sm rounded-md hover:bg-primary/10 ${getActiveClass(route.url, pathname)} transition-colors duration-200`}
                                        href={route.url}
                                    >
                                        <route.icon className="w-4 h-4" />
                                        {route.label}
                                    </Link>
                                ) : (
                                    <Collapsible
                                        open={isOpen}
                                        onOpenChange={(val) => toggleOpenCollapsible(route.url, val)}
                                        className={getParentActiveClass(route.url, pathname)}
                                    >
                                        <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 px-2.5 py-3 text-sm rounded-md hover:bg-primary/10 transition-transform duration-200">
                                            <span className="flex items-center gap-3">
                                                <route.icon className="w-4 h-4" />
                                                {route.label}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="ml-6 flex flex-col gap-1">
                                            {route.children.map((child) => (
                                                <Link
                                                    key={child.url}
                                                    href={child.url}
                                                    className={`block px-3.5 py-2.5 text-sm rounded-md hover:bg-primary/10 ${getActiveClass(child.url, pathname)} transition-colors duration-200`}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </aside>
    );
}
