"use client";
import React from "react";
import { Home, Users, Settings } from "lucide-react"; // Icons for nav items

const NavMenu = ({ isMini }) => {
    return (
        <nav className="mt-4">
            <ul>
                <li className="flex items-center px-4 py-3 hover:bg-gray-200  transition-all">
                    <Home className="w-5 h-5 text-gray-600" />
                    <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Dashboard</span>
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-gray-200  transition-all">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Users</span>
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-gray-200  transition-all">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className={`ml-3 transition-all ${isMini ? "hidden" : "inline-block"}`}>Settings</span>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;
