"use client";
import React, { useState } from "react";
import "./css/globals.css";
import "react-calendar/dist/Calendar.css";
import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";

export default function RootLayout({ children }) {
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMiniSidebar = () => {
    setIsMiniSidebar(!isMiniSidebar);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <html lang="en">
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta name="description" content="Digital Hub for Land Information" />
      <title>NILAM Portal</title>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="preload" href="/images/logo.svg" as="image" type="image/svg+xml" />

      <body className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isMini={isMiniSidebar} isOpen={isMobileSidebarOpen} />

        {/* Mobile Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Fix */}
        <div
          className={`flex-1 min-h-screen transition-all duration-300 ${isMiniSidebar ? "ml-[4.5rem]" : "ml-64"
            }`}
        >
          <Header toggleMiniSidebar={toggleMiniSidebar} toggleMobileSidebar={toggleMobileSidebar} />
          <main className="p-6 pt-20 min-h-screen h-screen overflow-auto">
            <div className="max-h-none overflow-visible">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
