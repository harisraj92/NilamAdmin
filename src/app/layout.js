"use client";
import React, { useState } from "react";
import "./css/globals.css";
import "react-calendar/dist/Calendar.css";
import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";

export default function RootLayout({ children }) {
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);
  const toggleMiniSidebar = () => {
    setIsMiniSidebar(!isMiniSidebar);
  };
  return (
    <html lang="en">
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta name="description" content="Digital Hub for land Information" />
      <title>NILAM Portal</title>
      <link rel="shortcut icon" href="./images/favicon.ico" />
      <link rel="preload" href="/images/logo.svg" as="image" type="image/svg+xml" />
      <body className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isMini={isMiniSidebar} />

        {/* Main Content */}
        <div className={`flex-1 min-h-screen transition-all ${isMiniSidebar ? "ml-16" : "ml-64"}`}>
          <Header toggleMiniSidebar={toggleMiniSidebar} />
          <main className="p-6 pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
