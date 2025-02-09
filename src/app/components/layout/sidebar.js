"use client";
import React from "react";
import NavMenu from "./navmenu";

const Sidebar = ({ isMini }) => {
    return (
        <aside
            className={`fixed top-20 left-0 h-[calc(100vh-80px)] bg-white text-gray-800 transition-all duration-300 shadow-lg z-50 border-r border-gray-300 
            ${isMini ? "w-[4.5rem]" : "w-64"} flex flex-col`}
        >
            <NavMenu isMini={isMini} />
        </aside>
    );
};

export default Sidebar;
