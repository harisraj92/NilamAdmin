"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Menu } from "lucide-react"; // Import icons

const Header = ({ toggleMiniSidebar }) => {
    return (
        <header className="bg-yellow-100 shadow-md fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-8">
            {/* Left Section: Logo & Hamburger */}
            <div className="flex items-center gap-5">
                {/* Logo (Bigger & Adjusted) */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/logo.svg"
                        width={0}
                        height={0}
                        alt="Logo"
                        priority={true}
                        className="w-[200px] h-auto" // Increased logo size & padding
                    />
                </Link>

                {/* Hamburger Icon (Toggles Mini Sidebar) */}
                <button
                    onClick={toggleMiniSidebar}
                    className="p-3 rounded-md  hover:bg-gray-200"
                >
                    <Menu className="h-5 w-5 text-gray-900" /> {/* Slightly larger icon */}
                </button>
            </div>

            {/* Right Side Icons */}
            <div className="ml-auto">
                <button className="p-3 rounded-full  hover:bg-gray-200">
                    <Bell className="h-5 w-5 text-gray-900" /> {/* Larger notification icon */}
                </button>
            </div>
        </header>
    );
};

export default Header;
