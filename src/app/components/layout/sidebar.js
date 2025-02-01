"use client";
import React from "react";
import NavMenu from "./navmenu";

const Sidebar = ({ isMini }) => {
    return (
        <aside
            className={`fixed top-20 left-0 h-[calc(100vh-80px)] bg-white text-gray-800 transition-all duration-300 shadow-lg ${isMini ? "w-16" : "w-64"
                } border-r border-gray-300`} // Adds a border to separate sidebar
        >
            <NavMenu isMini={isMini} />
        </aside>
    );
};

export default Sidebar;
