"use client";
import React, { useState } from "react";
import BasicInformation from "./basic_information/basic_info";
import AddressDetails from "./address_details/address_details";
import IdentityDocuments from "./identity_documents";
import OccupationIncome from "./occupation_income";
import PlotInformation from "./plot_info";

const TABS = [
    { label: "Basic Information", component: "basic_info" },
    { label: "Address Details", component: "address_details" },
    { label: "Identity & Documents", component: "identity_documents" },
    { label: "Occupation and Income", component: "occupation_income" },
    { label: "Plot Information", component: "plot_info" },
];

const Customer_Onboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [customerId, setCustomerId] = useState(null);  // ✅ Store customer_id

    return (
        <div className="w-full mx-auto p-6">
            {/* Tabs Header */}
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">Customer Onboarding</h2>
            <div className="flex border-b">
                {TABS.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`p-3 text-sm sm:text-base ${activeTab === index
                            ? "bg-white border-b-2 border-primary font-semibold"
                            : "bg-primary hover:bg-gray-300 "
                            } flex-1 text-center transition-all`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-2 mt-6">
                {activeTab === 0 && <BasicInformation setCustomerId={setCustomerId} />}
                {activeTab === 1 && <AddressDetails customerId={customerId} />}
                {activeTab === 2 && <IdentityDocuments />}
                {activeTab === 3 && <OccupationIncome />}
                {activeTab === 4 && <PlotInformation />}
            </div>
        </div>
    );
};

export default Customer_Onboard;
