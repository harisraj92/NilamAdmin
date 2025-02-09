// validation.js

// Function to calculate age based on DOB
export const calculateAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// Function to handle date changes and validation
export const handleDateChange = (date, field, formData, setFormData, setFormErrors, showValidationAlert) => {
    const today = new Date();
    const selectedDate = new Date(date);
    let errors = { ...formData };

    if (field === "dob") {
        const age = calculateAge(selectedDate);
        if (age < 18) {
            errors.dob = "Must be at least 18 years old";
        } else {
            delete errors.dob;
        }

        setFormData(prev => ({
            ...prev,
            dob: date,
            age: age // Ensure it's stored as a number
        }));
    }

    if (field === "subscriptionStartDate") {
        if (selectedDate < today) {
            errors.subscriptionStartDate = "Subscription Start Date cannot be in the past";
        } else if (formData.subscriptionEndDate && selectedDate >= new Date(formData.subscriptionEndDate)) {
            errors.subscriptionStartDate = "Start Date must be before End Date";
        } else {
            delete errors.subscriptionStartDate;
        }

        setFormData(prev => ({
            ...prev,
            subscriptionStartDate: date
        }));
    }

    if (field === "subscriptionEndDate") {
        if (!formData.subscriptionStartDate) {
            errors.subscriptionEndDate = "Select Subscription Start Date first";
        } else if (selectedDate <= new Date(formData.subscriptionStartDate)) {
            errors.subscriptionEndDate = "End Date must be after Start Date";
        } else if (selectedDate > new Date(formData.subscriptionStartDate).setFullYear(new Date(formData.subscriptionStartDate).getFullYear() + 5)) {
            errors.subscriptionEndDate = "End Date cannot be more than 5 years after Start Date";
        } else {
            delete errors.subscriptionEndDate;
        }

        setFormData(prev => ({
            ...prev,
            subscriptionEndDate: date
        }));
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
        showValidationAlert(Object.values(errors).join("\n"));
    }
};

// Function to validate form fields before submission
export const validateForm = (formData) => {
    let errors = {};

    // ✅ Full Name Validation
    if (!formData.fullName) {
        errors.fullName = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
        errors.fullName = "Full Name should only contain letters and spaces";
    } else if (formData.fullName.length < 2) {
        errors.fullName = "Full Name should be at least 2 characters long";
    } else if (formData.fullName.length > 50) {
        errors.fullName = "Full Name should not exceed 50 characters";
    } else if (/\s{2,}/.test(formData.fullName)) {
        errors.fullName = "Full Name should not contain multiple consecutive spaces";
    } else if (!/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(formData.fullName.trim())) {
        errors.fullName = "Each word in Full Name should start with a capital letter";
    }

    // ✅ Email Validation
    if (!formData.emailid) {
        errors.emailid = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.emailid)) {
        errors.emailid = "Invalid email format";
    }

    // ✅ Contact Number Validation
    if (!formData.contactNumber) {
        errors.contactNumber = "Contact Number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) {
        errors.contactNumber = "Invalid contact number format";
    }

    // ✅ Alternate Contact Number Validation
    if (formData.alternatecontactNumber) {
        if (!/^[6-9]\d{9}$/.test(formData.alternatecontactNumber)) {
            errors.alternatecontactNumber = "Invalid alternate contact number";
        }
        if (formData.alternatecontactNumber === formData.contactNumber) {
            errors.alternatecontactNumber = "Alternate Contact Number should be different from Primary Contact Number";
        }
    }

    // ✅ Date of Birth Validation
    if (!formData.dob) {
        errors.dob = "Date of Birth is required";
    } else {
        const dobDate = new Date(formData.dob);
        const today = new Date();
        const age = calculateAge(formData.dob);

        if (dobDate > today) {
            errors.dob = "Date of Birth cannot be in the future";
        } else if (age < 18) {
            errors.dob = "Must be at least 18 years old";
        } else if (age > 120) {
            errors.dob = "Please enter a valid Date of Birth";
        }
    }

    // ✅ Gender, Language, and Subscription Plan Validation
    if (!formData.gender) errors.gender = "Gender selection is required";
    if (!formData.language) errors.language = "Language preference is required";
    if (!formData.subscriptionPlan) errors.subscriptionPlan = "Subscription Plan is required";

    // ✅ Subscription Start Date Validation
    if (!formData.subscriptionStartDate) {
        errors.subscriptionStartDate = "Subscription Start Date is required";
    } else if (new Date(formData.subscriptionStartDate) < new Date()) {
        errors.subscriptionStartDate = "Subscription Start Date cannot be in the past";
    }

    // ✅ Subscription End Date Validation
    if (!formData.subscriptionEndDate) {
        errors.subscriptionEndDate = "Subscription End Date is required";
    } else if (
        formData.subscriptionStartDate &&
        new Date(formData.subscriptionEndDate) <= new Date(formData.subscriptionStartDate)
    ) {
        errors.subscriptionEndDate = "Subscription End Date must be after Subscription Start Date";
    } else if (
        formData.subscriptionStartDate &&
        new Date(formData.subscriptionEndDate) > new Date(formData.subscriptionStartDate).setFullYear(new Date(formData.subscriptionStartDate).getFullYear() + 5)
    ) {
        errors.subscriptionEndDate = "Subscription End Date cannot be more than 5 years after Start Date";
    }

    return errors;
};

export async function handleImageUpload(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/customer_onboard/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        console.log("Upload Response:", data); // Debugging log

        if (data && data.success && data.filePath) {
            return data.filePath; // Save this path for user profile
        } else {
            console.error("Upload error:", data?.error || "File path is missing in the response", data);
            return null;
        }
    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
}
