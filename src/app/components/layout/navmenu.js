"use client";
import React from "react";
import Link from "next/link";
import { Home, UserPlus, MapPlus, FileCheck2, CalendarClock, MapPinned, FileText } from "lucide-react";

const NavMenu = ({ isMini }) => {
    return (
        <nav className="mt-4">
            <ul>
                <li>
                    <Link href="/" className="flex items-center px-4 py-3 hover:bg-gray-200 transition-all">
                        <Home className="w-5 h-5 text-gray-600" />
                        <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/customer_onboard" className="flex items-center px-4 py-3 hover:bg-gray-200 transition-all">
                        <UserPlus className="w-5 h-5 text-gray-600" />
                        <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Customer Onboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/property_onboard" className="flex items-center px-4 py-3 hover:bg-gray-200 transition-all">
                        <MapPlus className="w-5 h-5 text-gray-600" />
                        <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Property Onboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/property_verification" className="flex items-center px-4 py-3 hover:bg-gray-200 transition-all">
                        <FileCheck2 className="w-5 h-5 text-gray-600" />
                        <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Property verification</span>
                    </Link>
                </li>
                <li>
                    <Link href="/visit_scheduling" className="flex items-center px-4 py-3 hover:bg-gray-200 transition-all">
                        <CalendarClock className="w-5 h-5 text-gray-600" />
                        <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Visit Scheduling</span>
                    </Link>
                </li>
                <li>
                    <Link href="/visit_execution" className="flex items-center px-4 py-3 hover:bg-gray-200 transition-all">
                        <MapPinned className="w-5 h-5 text-gray-600" />
                        <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Visit Execution</span>
                    </Link>
                </li>
                <li>
                    <Link href="/visit_report" className="flex items-center px-4 py-3 hover:bg-gray-200 transition-all">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Visit Report</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;
