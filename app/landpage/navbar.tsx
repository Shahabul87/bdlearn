"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="p-3 flex bg-white justify-between items-center fixed top-0 left-0 right-0 z-20 shadow-md">
            <Link href="/">
                <div className="flex gap-2 items-center flex-1 cursor-pointer">
                    <Image src="/asset 0.png" alt="Logo" width={48} height={48} />
                    <span className="text-lg font-medium font-display">ToDesktop</span>
                </div>
            </Link>
            <div className={`hidden lg:flex gap-12 ${isMenuOpen ? 'flex' : 'hidden'}`}>
                <Link href="/pricing"><div className="font-medium hover:text-primary cursor-pointer">Pricing</div></Link>
                <Link href="/docs" ><div className="font-medium hover:text-primary cursor-pointer">Docs</div></Link>
                <Link href="/changelog"><div className="font-medium hover:text-primary cursor-pointer">Changelog</div></Link>
                <Link href="/blog" ><div className="font-medium hover:text-primary cursor-pointer">Blogs</div></Link>
                <Link href="/login" f><div className="font-medium hover:text-primary cursor-pointer">Login</div></Link>
            </div>
            <div className="hidden lg:flex flex-1 justify-end">
                <Link href="/developers/electron" >
                    <div className="flex gap-2 items-center border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600 cursor-pointer">
                        <Image src="/asset 1.svg" alt="" width={24} height={24} />
                        <span className="font-display font-medium">Electron Developers</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                </Link>
            </div>

            <button className="p-2 lg:hidden" onClick={handleMenu}>
                <i className="fa-solid fa-bars text-gray-600"></i>
            </button>

            <div className={`fixed z-10 md:hidden bg-white inset-0 p-3 ${isMenuOpen ? 'flex' : 'hidden'}`}>
                <div id="nav-bar" className="flex justify-between">
                    <Link href="/" >
                        <div className="flex gap-2 items-center cursor-pointer">
                            <Image src="/asset 0.png" alt="Logo" width={48} height={48} />
                            <span className="text-lg font-medium font-display">ToDesktop</span>
                        </div>
                    </Link>
                    <button className="p-2 md:hidden" onClick={handleMenu}>
                        <i className="fa-solid fa-xmark text-gray-600"></i>
                    </button>
                </div>
                <div className="mt-6">
                    <Link href="/pricing" ><div className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg cursor-pointer">Pricing</div></Link>
                    <Link href="/docs" ><div className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg cursor-pointer">Docs</div></Link>
                    <Link href="/changelog"><div className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg cursor-pointer">Changelog</div></Link>
                    <Link href="/blog" ><div className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg cursor-pointer">Blogs</div></Link>
                    <Link href="/login" ><div className="font-medium m-3 p-3 hover:bg-gray-50 block rounded-lg cursor-pointer">Login</div></Link>
                </div>
                <div className="h-[1px] bg-gray-300"></div>
                <Link href="/developers/electron" >
                    <div className="mt-6 w-full flex gap-2 items-center px-6 py-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Image src="/asset 1.svg" alt="" width={4} height={4} />
                        <span>Electron Developers</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
