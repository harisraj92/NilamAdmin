"use client";
import React, { useEffect, useState } from "react";

const AddressDetails = ({ customerId }) => {
    const [flatNumber, setFlatNumber] = useState("");
    const [housename, setHouseName] = useState("");
    const [streetname, setStreetName] = useState("");
    const [village_town_city_name, setVillage_Town_City_Name] = useState("");
    const [districtname, setDistrictName] = useState("");
    const [statename, setStateName] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    // Secondary Address
    const [secondaryFlatNumber, setSecondaryFlatNumber] = useState("");
    const [secondaryHouseName, setSecondaryHouseName] = useState("");
    const [secondaryStreetName, setSecondaryStreetName] = useState("");
    const [secondary_Village_Town_City_Name, setSecondary_Village_Town_City_Name] = useState("");
    const [secondaryDistrictName, setSecondaryDistrictName] = useState("");
    const [secondaryStateName, setSecondaryStateName] = useState("");
    const [secondaryPostalCode, setSecondaryPostalCode] = useState("");
    const [secondaryCountry, setSecondaryCountry] = useState("");



    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    useEffect(() => {
        console.log("📌 Received Customer ID in AddressDetails:", customerId);
    }, [customerId]);

    const showValidationAlert = (message) => {
        setAlertMessage(message);
        setAlertType("error");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("📌 Sending Address for Customer ID:", customerId);

        if (!customerId) {
            console.error("❌ Error: Customer ID is missing!");
            showValidationAlert("❌ Customer ID is missing!");
            return;
        }

        try {
            const apiEndpoint = "/api/customer_onboard/detail_address";

            console.log("🔵 API Endpoint:", apiEndpoint);

            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_id: customerId,
                    flat_number: flatNumber,
                    house_name: housename,
                    street_name: streetname,
                    village_town_city_name: village_town_city_name,
                    district_name: districtname,
                    postal_code: postalcode,
                    country: country,

                    // Secondary Address
                    secondary_flat_number: secondaryFlatNumber,
                    secondary_house_name: secondaryHouseName,
                    secondary_street_name: secondaryStreetName,
                    secondary_village_town_city_name: secondary_Village_Town_City_Name,
                    secondary_district_name: secondaryDistrictName,
                    secondary_state_name: secondaryStateName,
                    secondary_postal_code: secondaryPostalCode,
                    secondary_country: secondaryCountry,


                }),
            });

            console.log("🔵 API Response Status:", response.status);
            console.log("🔵 API Response Headers:", response.headers);

            const text = await response.text();
            console.log("🔵 Raw Response Text:", text);

            let data;
            if (text) {
                data = JSON.parse(text);
                console.log("🔵 Parsed Response Data:", data);
            }

            if (!response.ok) {
                console.error("❌ API Error:", data.error || response.statusText);
                showValidationAlert(`❌ API Error: ${data.error || response.statusText}`);
                return;
            }

            console.log("✅ Address details saved successfully!", data);
            showValidationAlert("✅ Address details saved successfully!");
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            showValidationAlert("❌ Error submitting form. Please try again.");
        }
    };

    return (
        <div>
            {showAlert && (
                <div className={`p-4 rounded-md shadow-lg ${alertType === "success" ? "bg-green-100 border-l-4 border-green-500 text-green-700"
                    : "bg-red-100 border-l-4 border-red-500 text-red-700"}`}>
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm font-medium whitespace-pre-line">{alertMessage}</p>
                        </div>
                        <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={() => setShowAlert(false)}>
                            ✖
                        </button>
                    </div>
                </div>
            )}

            <h2 className="text-lg font-bold mb-4 text-gray-600">Customer ID: {customerId || "Loading..."}</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                <div>
                    <h2 className="font-bold text-lg mb-2 text-gray-600">Primary Address</h2>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Door / Flat Number:<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={flatNumber}
                            onChange={(e) => setFlatNumber(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Apartment / House Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={housename}
                            onChange={(e) => setHouseName(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Village/Town/City Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={village_town_city_name}
                            onChange={(e) => setVillage_Town_City_Name(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">District Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={districtname}
                            onChange={(e) => setDistrictName(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">State Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={statename}
                            onChange={(e) => setStateName(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Postal Code<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="number"
                            value={postalcode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Country<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2 text-gray-600">Secondary Address</h2>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Door / Flat Number:<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={secondaryFlatNumber}
                            onChange={(e) => setSecondaryFlatNumber(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Apartment / House Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={secondaryHouseName}
                            onChange={(e) => setSecondaryHouseName(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Village/Town/City Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={secondary_Village_Town_City_Name}
                            onChange={(e) => setSecondary_Village_Town_City_Name(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">District Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={secondaryDistrictName}
                            onChange={(e) => setSecondaryDistrictName(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">State Name<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={secondaryStateName}
                            onChange={(e) => setSecondaryStateName(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Postal Code<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="number"
                            value={secondaryPostalCode}
                            onChange={(e) => setSecondaryPostalCode(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Country<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input
                            type="text"
                            value={secondaryCountry}
                            onChange={(e) => setSecondaryCountry(e.target.value)}
                            className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500  w-full px-2 py-1"
                        />
                    </div>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md w-full hover:bg-blue-700 transition">
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddressDetails;
