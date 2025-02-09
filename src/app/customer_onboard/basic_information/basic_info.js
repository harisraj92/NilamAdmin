"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { CalendarDays } from "lucide-react";
import { validateForm, calculateAge, handleDateChange, handleImageUpload } from "./validation";


const BasicInformation = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        emailid: "",
        contactNumber: "",
        alternatecontactNumber: "",
        dob: null,
        age: "",
        gender: "",
        language: "",
        subscriptionPlan: "",
        subscriptionStartDate: null,
        subscriptionEndDate: null,
        subscriptionStatus: true,
        profileImage: null,
    });

    const [showCalendar, setShowCalendar] = useState(false);
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setPreviewImage(URL.createObjectURL(file)); // Show preview
        const uploadedFilePath = await handleImageUpload(file);

        if (uploadedFilePath) {
            setSelectedImage(uploadedFilePath);
            setFormData(prev => ({ ...prev, profileImage: uploadedFilePath }));
        } else {
            console.error("Failed to upload image.");
        }
    };

    const handleDateChange = (date, field) => {
        const selectedDate = new Date(date);
        let errors = { ...formErrors };

        if (field === "dob") {
            const age = calculateAge(selectedDate);
            if (age < 18) {
                errors.dob = "Must be at least 18 years old";
            } else {
                errors.dob = "";
            }
            setFormData(prev => ({ ...prev, dob: selectedDate, age }));
            setShowCalendar(false);
        }

        if (field === "subscriptionStartDate") {
            if (formData.subscriptionEndDate && selectedDate >= new Date(formData.subscriptionEndDate)) {
                errors.subscriptionStartDate = "Start Date must be before End Date";
            } else {
                errors.subscriptionStartDate = "";
            }
            setFormData(prev => ({ ...prev, subscriptionStartDate: selectedDate }));
            setShowStartCalendar(false);
        }

        if (field === "subscriptionEndDate") {
            if (formData.subscriptionStartDate && selectedDate <= new Date(formData.subscriptionStartDate)) {
                errors.subscriptionEndDate = "End Date must be after Start Date";
            } else {
                errors.subscriptionEndDate = "";
            }
            setFormData(prev => ({ ...prev, subscriptionEndDate: selectedDate }));
            setShowEndCalendar(false);
        }

        setFormErrors(errors);
    };


    const showValidationAlert = (message) => {
        setAlertMessage(message);
        setAlertType("error");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            showValidationAlert(Object.values(errors).join("\n"));
            return;
        }

        try {
            const convertToLocalDate = (date) => {
                if (!date) return null;
                const localDate = new Date(date);
                localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // Adjust for timezone
                return localDate.toISOString().split("T")[0]; // Keep only the YYYY-MM-DD part
            };

            const formattedData = {
                ...formData,
                dob: convertToLocalDate(formData.dob),
                subscriptionStartDate: convertToLocalDate(formData.subscriptionStartDate),
                subscriptionEndDate: convertToLocalDate(formData.subscriptionEndDate),
                subscriptionStatus: formData.subscriptionStatus === "Active" ? "Active" : "Inactive",
                profileImage: formData.profileImage || "",
            };

            console.log("Sending Data:", formattedData); // Debugging output

            const response = await fetch("/api/customer_onboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (data.success) {
                setAlertMessage("✅ Customer onboarded successfully!");
                setAlertType("success");
                setShowAlert(true);
                setFormData({
                    fullName: "",
                    emailid: "",
                    contactNumber: "",
                    alternatecontactNumber: "",
                    dob: null,
                    age: "",
                    gender: "",
                    language: "",
                    subscriptionPlan: "",
                    subscriptionStartDate: null,
                    subscriptionEndDate: null,
                    subscriptionStatus: false,
                    profileImage: null
                });
                setPreviewImage(null);
                setSelectedImage(null);
                setTimeout(() => setShowAlert(false), 3000);
            } else {
                showValidationAlert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            showValidationAlert("Error submitting form. Please try again.");
        }
    };



    const fetchCustomers = async () => {
        try {
            const response = await fetch("/api/customer_onboard");
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);


    return (
        <div className="mx-auto">
            {showAlert && (
                <div
                    className={`absolute top-28 left-3/4 -translate-x-1/2 max-w-sm w-full ${alertType === "success"
                        ? "bg-green-100 border-l-4 border-green-500 text-green-700"
                        : "bg-red-100 border-l-4 border-red-500 text-red-700"
                        } p-4 rounded-md shadow-lg z-50 transition-transform duration-300 ease-in-out`}
                >
                    <div className="flex">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            {alertType === "success" ? (
                                <svg
                                    className="h-6 w-6 text-green-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6 text-red-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    />
                                </svg>
                            )}
                        </div>
                        {/* Alert Message */}
                        <div className="ml-3">
                            <p className="text-sm font-medium whitespace-pre-line">{alertMessage}</p>
                        </div>
                        {/* Close Button */}
                        <button
                            className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            onClick={() => setShowAlert(false)}
                        >
                            <span className="sr-only">Dismiss</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>
                </div>
            )}

            <form className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT COLUMN */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Full Name <span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input type="text" name="fullName" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Enter Full Name" pattern="[a-zA-Z]*" className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500 px-2" required />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Email ID<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input type="email" name="emailid" value={formData.emailid} onChange={(e) => setFormData({ ...formData, emailid: e.target.value })} placeholder="Enter EmailID" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Please enter a valid EmailID" className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500 px-2" required />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-nowrap">Contact Number<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} placeholder="Enter contactNumber" pattern="^(\+91[\-\s]?)?[6789]\d{9}$" title="Please enter a 10-digit mobile number starting with 6-9" maxLength="10" className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1" required />
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-normal">Alternate Contact Number<span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input type="tel" name="alternatecontactNumber" value={formData.alternatecontactNumber} onChange={(e) => setFormData({ ...formData, alternatecontactNumber: e.target.value })} placeholder="Enter Alternate Contact Number" pattern="^(\+91[\-\s]?)?[6789]\d{9}$" title="Please enter a 10-digit mobile number starting with 6-9" maxLength="10" className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1" required />
                    </div>


                    {/* Date of Birth and Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-[max-content_auto] md:grid-cols-[max-content_auto_max-content_auto] gap-4 items-center w-full relative">

                        {/* Date of Birth Label */}
                        <div className="flex items-center">
                            <label className="text-gray-700 font-medium whitespace-nowrap">
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <span className="text-gray-700 ml-1">:</span>
                        </div>

                        {/* Date Picker Input with Calendar Icon */}
                        <div className="relative w-full">
                            <div className="flex items-center border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer">
                                <input
                                    type="text"
                                    value={formData.dob ? new Date(formData.dob).toDateString() : ""}
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    placeholder="Select Date"
                                    className="flex-grow border-b w-full border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1"
                                    readOnly
                                />

                                <CalendarDays
                                    className="text-gray-500 cursor-pointer ml-2"
                                    size={20}
                                    onClick={() => setShowCalendar(!showCalendar)}
                                />
                            </div>

                            {/* Fixed Calendar Design */}
                            {showCalendar && (
                                <div className="absolute z-50 left-0 mt-2 w-auto bg-white border border-gray-300 rounded-md shadow-lg p-2">
                                    <Calendar
                                        onChange={(date) => handleDateChange(date, "dob")}
                                        value={formData.dob}
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Age Label */}
                        <div className="flex items-center">
                            <label className="text-gray-700 font-medium whitespace-nowrap">
                                Age
                            </label>
                            <span className="text-gray-700 ml-1">:</span>
                        </div>

                        {/* Age Input Field */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="age"
                                value={formData.age}
                                placeholder="Age"
                                readOnly
                                className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1"
                            />
                        </div>
                    </div>


                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-normal">Gender <span className="text-red-500">*</span></label>
                        <div className="flex items-center space-x-4">
                            {/* Male Option */}

                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="hidden peer" />
                                <span className="text-gray-700">:</span>
                                <div className=" ml-5 flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:bg-blue-600 peer-checked:border-blue-600">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                </div>
                                <span className="ml-2 text-gray-600">Male</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="gender" value="FeMale" checked={formData.gender === "FeMale"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="hidden peer" />
                                <div className="flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:bg-blue-600 peer-checked:border-blue-600">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                                </div>
                                <span className="ml-2 text-gray-600">Female</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-normal">Language Preference <span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <input type="text" name="language" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} placeholder="Enter Language" className="flex-grow border-b border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1" required />
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">

                    <div className="flex items-center space-x-3">
                        <label htmlFor="profileImageUpload" className="cursor-pointer">
                            {previewImage ? (
                                <img src={previewImage} alt="Profile Preview" className="w-40 h-40 rounded-full" />
                            ) : (
                                <div>
                                    <div className="profile-icon"></div>
                                    <p>Click here to upload Profile Image</p>
                                </div>


                            )}
                        </label>
                        <input
                            type="file"
                            id="profileImageUpload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {selectedImage && <p className="text-sm text-gray-500">Uploaded: {selectedImage}</p>}
                    </div>

                    {/* Subscription Start Date (Date Picker with Icon) */}
                    <div className="space-y-6">
                        {/* Subscription Plan Dropdown */}
                        <div className="flex items-center space-x-3">
                            <label className="text-gray-700 font-medium whitespace-normal">Subscription Plan <span className="text-red-500">*</span></label>
                            <span className="text-gray-700 ml-1">:</span>
                            <div className="relative w-full">
                                <select
                                    name="subscriptionPlan" value={formData.subscriptionPlan} onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
                                    className="p-3 border-b border-gray-400  w-full  appearance-none bg-white cursor-pointer text-gray-700"
                                >
                                    <option value="">Select a Plan</option>
                                    <option value="Basic" className="bg-gray-200 hover:bg-gray-300 border-b border-gray-400">Basic</option>
                                    <option value="Standard" className="bg-gray-200 hover:bg-gray-300 border-b border-gray-400">Standard</option>
                                    <option value="Full" className="bg-gray-200 hover:bg-gray-300">Full</option>
                                </select>


                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    ▼
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700 font-medium">
                                Subscription Status <span className="text-red-500">*</span>
                            </label>


                            <input
                                type="checkbox"
                                name="subscriptionStatus"
                                checked={formData.subscriptionStatus === "Active"}
                                onChange={(e) => setFormData({ ...formData, subscriptionStatus: e.target.checked ? "Active" : "Inactive" })}
                            />



                        </div>

                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-normal">Subscription Start Date <span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.subscriptionStartDate ? new Date(formData.subscriptionStartDate).toDateString() : ""}
                                onClick={() => setShowStartCalendar(!showStartCalendar)}
                                placeholder="Select Start Date"
                                className="flex-grow border-b w-full border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1"
                                readOnly
                            />

                            <CalendarDays className="absolute right-3 top-1 text-gray-500 cursor-pointer" size={20} onClick={() => setShowStartCalendar(!showStartCalendar)} />

                        </div>
                        {showStartCalendar && (
                            <div className="absolute z-50 bg-white shadow-md rounded-md p-2 mt-1">
                                <Calendar
                                    onChange={(date) => handleDateChange(date, "subscriptionStartDate")}
                                    value={formData.subscriptionStartDate ? new Date(formData.subscriptionStartDate) : ""}
                                    minDate={new Date()}
                                />
                            </div>
                        )}

                    </div>


                    <div className="flex items-center space-x-3">
                        <label className="text-gray-700 font-medium whitespace-normal">Subscription End Date <span className="text-red-500">*</span></label>
                        <span className="text-gray-700">:</span>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.subscriptionEndDate ? new Date(formData.subscriptionEndDate).toDateString() : ""}
                                onClick={() => setShowEndCalendar(!showEndCalendar)}
                                placeholder="Select End Date"
                                className="flex-grow border-b w-full border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1"
                                readOnly
                            />
                            <CalendarDays className="absolute right-3 top-1 text-gray-500 cursor-pointer" size={20} onClick={() => setShowEndCalendar(!showEndCalendar)} />
                        </div>

                        {showEndCalendar && (
                            <div className="absolute z-50 bg-white shadow-md rounded-md p-2 mt-1">
                                <Calendar onChange={(date) => handleDateChange(date, "subscriptionEndDate")} value={formData.subscriptionEndDate} />
                            </div>
                        )}
                    </div>

                </div>

                {/* Buttons */}
                <div className="col-span-1 lg:col-span-2 flex justify-between mt-6">
                    <button type="reset" className="bg-gray-500 text-white px-5 py-2 rounded-md w-1/3 hover:bg-gray-600 transition">Back</button>
                    <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-5 py-2 rounded-md w-1/3 hover:bg-blue-700 transition">Save</button>
                </div>
            </form>

        </div>
    );
};

export default BasicInformation;