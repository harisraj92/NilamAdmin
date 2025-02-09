"use client";
import React from "react";
import { Users, Landmark, ClipboardCheck, MapPin } from "lucide-react"; // Icons

const stats = [
  { value: 10, label: "Total Customers Onboarded", icon: Users },
  { value: 6, label: "Total Properties Onboarded", icon: Landmark },
  { value: 2, label: "Total Properties Verified for Onboarding", icon: ClipboardCheck },
  { value: 2, label: "Total Properties Verified for Visited", icon: MapPin },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((item, index) => (
        <div key={index} className="flex items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md">
          <div className="p-3 bg-gray-100 rounded-lg">
            <item.icon className="w-10 h-10 text-gray-400" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{item.value}</h2>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
