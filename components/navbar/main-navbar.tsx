"use client"

import { useState } from "react";
import { MenuItem, HoveredLink,} from "./navbar-menu";
import Link from "next/link";
import { HoverBorderGradient } from "./hover-border-gradient";

export const MainNavBar =()=>{

    const [active, setActive] = useState<string | null>(null);
    return (
        <div className="relative"> 
                <div onMouseLeave={() => setActive(null)} className ="w-full h-[80px] grid grid-cols-12 p-4 px-6 fixed inset-x-0 z-50 top-0 bg-blue-600">
                        <div className ="col-span-1 flex items-center justify-center">
                        <Link href = "/">
                            <HoverBorderGradient
                                containerClassName="rounded-full"
                                as="button"
                                className="dark:bg-black bg-white text-blue dark:text-white flex items-center space-x-2"
                                >
                                <span className="text-blue-600 font-semibold">iSham</span>
                            </HoverBorderGradient>
                        </Link>
                        </div>
                        <div className ="col-span-5 flex items-center justify-center space-x-6">
                               <MenuItem setActive={setActive} active={active} item="প্রাথমিক">
                                    <div className="flex flex-col space-y-4 text-sm">
                                        <HoveredLink href="/narsary">নার্সারি</HoveredLink>
                                        <HoveredLink href="/classone">প্রথম শ্রেণী</HoveredLink>
                                        <HoveredLink href="/classtwo">দ্বিতীয় শ্রেণী</HoveredLink>
                                        <HoveredLink href="/classthree">তৃতীয় শ্রেণী</HoveredLink>
                                        <HoveredLink href="/classfour">চতুর্থ শ্রেণী</HoveredLink>
                                        <HoveredLink href="/classfive">পঞ্চম শ্রেণী</HoveredLink>
                                    </div>
                                </MenuItem>
                                <MenuItem setActive={setActive} active={active} item="মাধ্যমিক">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/classsix">ষষ্ঠ শ্রেণী</HoveredLink>
                                    <HoveredLink href="/classseven">সপ্তম শ্রেণী</HoveredLink>
                                    <HoveredLink href="/classeight">অষ্টম শ্রেণী</HoveredLink>
                                    <HoveredLink href="/classnine">নবম শ্রেণী</HoveredLink>
                                    <HoveredLink href="/classten">দশম শ্রেণী</HoveredLink>
                                </div>
                                </MenuItem>
                                <MenuItem setActive={setActive} active={active} item="উচ্চ মাধ্যমিক">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/classeleven"> একাদশ শ্রেণী</HoveredLink>
                                    <HoveredLink href="/classtwelve">দ্বাদশ শ্রেণী</HoveredLink>
                                </div>
                                </MenuItem>
                                <MenuItem setActive={setActive} active={active} item="বিশ্ববিদ্যালয়">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/engineeringuniversity">ইঞ্জিনিয়ারিং বিশ্ববিদ্যালয়</HoveredLink>
                                    <HoveredLink href="/medicalcollege">মেডিকেল কলেজ</HoveredLink>
                                    <HoveredLink href="/publicuniversity">পাবলিক বিশ্ববিদ্যালয় </HoveredLink>
                                    <HoveredLink href="/nationaluniversity">জাতীয় বিশ্ববিদ্যালয়</HoveredLink>
                                </div>
                                </MenuItem>
                                <MenuItem setActive={setActive} active={active} item="দক্ষ শিক্ষা ">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/web-dev">কম্পিউটার সিস্টেমস শিখুন (Computer systems)</HoveredLink>
                                    <HoveredLink href="/interface-design">নেটওয়ার্ক প্রোগ্রামিং শিখুন (Network programming)</HoveredLink>
                                    <HoveredLink href="/seo">মেশিন লার্নিং শিখুন (Machine learning)</HoveredLink>
                                    <HoveredLink href="/branding">প্রোগ্রামিং শিখুন (Programming)</HoveredLink>
                                    <HoveredLink href="/branding">আর্টিফিশিয়াল ইন্টেলিজেন্স (AI) শিখুন </HoveredLink>
                                    <HoveredLink href="/branding">ডাটা সাইন্স শিখুন (Data science)</HoveredLink>
                                    <HoveredLink href="/branding">হাই লেভেল ম্যাথ কনসেপ্ট শিখুন </HoveredLink>
                                </div>
                                </MenuItem>
                        </div>
                        <div className ="col-span-3 flex items-center justify-center text-white">এখানে টপিক সার্চ করুন </div>
                        <div className=" col-span-1 flex items-center justify-center">
                            <Link href="/blog" className=" text-white no-underline hover:underline hover:text-yellow-400 p-4">
                                Blog
                            </Link>
                        </div>
                        <div className=" col-span-1 flex items-center justify-center">
                            <Link href="/auth/login" className=" text-white no-underline hover:underline hover:text-yellow-500 p-4">
                                Login
                            </Link>
                        </div>
                       
                        <div className ="col-span-1 flex items-center justify-center">
                            <Link href="/auth/register" className=" text-white no-underline hover:underline hover:text-yellow-500 p-4">
                                Signup
                            </Link>
                        </div>
                </div>
        </div>
    )
}