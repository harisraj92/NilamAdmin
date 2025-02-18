export const validateAddressDetails = (formData) => {
    let errors = {};

    // General Patterns
    const alphaRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    const alphaNumericRegex = /^[A-Za-z0-9\s,.-]+$/; // Allows letters, numbers, spaces, and basic address symbols
    const postalCodeRegex = /^[0-9]{5,10}$/; // Allows only numbers, length 5-10

    Object.keys(formData).forEach((key) => {
        let value = formData[key].trim();

        // ✅ Required Field Check
        if (!value) {
            errors[key] = `${key.replace(/_/g, " ")} is required`;
            return;
        }

        // ✅ Address Specific Validations
        if (key.includes("door_flat_no") || key.includes("street_city_town_village")) {
            if (!alphaNumericRegex.test(value)) {
                errors[key] = `${key.replace(/_/g, " ")} should contain only letters, numbers, spaces, commas, dots, or hyphens`;
            }
        }

        if (key.includes("apartment_house_name") || key.includes("district_state") || key.includes("country")) {
            if (!alphaRegex.test(value)) {
                errors[key] = `${key.replace(/_/g, " ")} should contain only alphabets and spaces`;
            }
        }

        if (key.includes("postal_code")) {
            if (!postalCodeRegex.test(value)) {
                errors[key] = `${key.replace(/_/g, " ")} should be a valid number (5-10 digits)`;
            }
        }

        // ✅ Prevent Multiple Spaces or Repeated Special Characters
        if (/\s{2,}/.test(value)) {
            errors[key] = `${key.replace(/_/g, " ")} should not contain consecutive spaces`;
        }

        if (/[,.-]{2,}/.test(value)) {
            errors[key] = `${key.replace(/_/g, " ")} should not have repeated special characters`;
        }

        // ✅ Restrict Excessive Length
        if (value.length > 100) {
            errors[key] = `${key.replace(/_/g, " ")} should not exceed 100 characters`;
        }
    });

    return errors;
};
