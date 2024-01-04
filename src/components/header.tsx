import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className='bg-gray-700 w-full flex p-2 gap-20 mb-10' >
            <div className='border-r-white border border-y-[20px]'></div>
            <Link href={"/ssr"} className="place-self-center">SSR </Link>
            <div className='border-r-white border border-y-[20px]'></div>
            <Link href={"/csr"} className="place-self-center">CSR </Link>
            <div className='border-r-white border border-y-[20px]'></div>
        </header>
    )
}