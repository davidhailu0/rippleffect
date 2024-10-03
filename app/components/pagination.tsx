'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams, } from 'next/navigation';
import { generatePagination } from '@/app/lib/utils';

export default function Pagination({ totalPages }: { totalPages: number }) {

    const searchParams = useSearchParams()
    const pathName = usePathname()
    const currentPage = Number(searchParams.get("page")) || 1
    const allPages = generatePagination(currentPage, totalPages);
    const createPageURL = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", page.toString())
        return `${pathName}?${params.toString()}`
    }
    return (
        <>
            {/* NOTE: comment in this code when you get to this point in the course */}

            <div className="grid md:inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex gap-1 flex-col md:flex-row">
                    {allPages.map((page, index) => {
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                        if (index === 0) position = 'first';
                        if (index === allPages.length - 1) position = 'last';
                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page as number)}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                            />
                        );
                    })}
                </div>

                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
}) {
    const className = clsx(
        'flex h-12 w-12 items-center justify-center border text-black bg-white',
        {
            'rounded-l-md': position === 'first' || position === 'single',
            'rounded-r-md': position === 'last' || position === 'single',
            'z-10 border-blue-600': isActive,
            'hover:bg-gray-100': !isActive && position !== 'middle',
            'text-gray-300': position === 'middle',
        },
    );

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}) {
    const className = clsx(
        'flex h-12 w-24 items-center justify-center rounded-md border bg-white',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled,
            'mr-2 md:mr-4': direction === 'left',
            'ml-0 md:ml-4': direction === 'right',
        },
    );

    const icon =
        direction === 'left' ? (
            <><ArrowLeftIcon className="w-4 text-black" /><p className='ml-1 text-black'>Previous</p></>
        ) : (
            <><p className='mr-1 text-black'>Next</p><ArrowRightIcon className="w-4 text-black" /></>
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}
