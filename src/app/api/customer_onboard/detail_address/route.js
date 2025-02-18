import { NextResponse } from "next/server";
import { container } from "@/lib/cosmosClient"; // Ensure correct import

export async function POST(request) {
    try {
        const data = await request.json();
        console.log("📌 Received Data:", data);

        const { customer_id, flat_number, house_name, street_name, village_town_city_name, district_name, state_name, postal_code, country, secondary_flat_number, secondary_house_name, secondary_street_name, secondary_village_town_city_name, secondary_district_name, secondary_state_name, secondary_postal_code, secondary_country } = data;

        if (!customer_id) {
            console.error("❌ Missing Customer ID!");
            return NextResponse.json({ success: false, error: "❌ Customer ID is required!" }, { status: 400 });
        }

        // ✅ Debugging Query
        console.log("📌 Checking Customer ID in Database:", customer_id);

        const querySpec = {
            query: "SELECT * FROM c WHERE c.id = @customer_id",
            parameters: [{ name: "@customer_id", value: customer_id }]
        };

        const { resources } = await container.items.query(querySpec).fetchAll();
        const customer = resources.length > 0 ? resources[0] : null;

        console.log("📌 Found Customer in DB:", customer);

        if (!customer) {
            console.error("❌ Customer Not Found in Database:", customer_id);
            return NextResponse.json({ success: false, error: "❌ Customer not found in DB!" }, { status: 404 });
        }

        // ✅ Ensure Address Details Object Exists
        if (!customer.address_details) {
            customer.address_details = {};
        }

        // ✅ Update Address in the Database
        customer.address_details.permanent_address = {
            door_flat_no: flat_number,
            apartment_house_name: house_name,
            street_name: street_name,
            village_town_city_name: village_town_city_name,
            district_state_name: district_name,
            state_name: state_name,
            postal_code: postal_code,
            country: country,
        };

        // ✅ Update Secondary Address in the Database
        customer.address_details.secondary_address = {
            door_flat_no: secondary_flat_number,
            apartment_house_name: secondary_house_name,
            street_name: secondary_street_name,
            village_town_city_name: secondary_village_town_city_name,
            district_state_name: secondary_district_name,
            state_name: secondary_state_name,
            postal_code: secondary_postal_code,
            country: secondary_country,
        };

        console.log("📌 Updating Customer Data...");
        console.log("📌 Customer ID:", customer.id);
        console.log("📌 Partition Key (Ensure correct field):", customer.partitionKey); // Debug partition key

        // ✅ Save Updated Customer Data in CosmosDB
        const { resource: updatedCustomer } = await container
            .item(customer.id, customer.partitionKey) // Use correct partition key
            .replace(customer);

        console.log("✅ Customer Data Updated Successfully:", updatedCustomer);

        return NextResponse.json({
            success: true,
            message: "✅ Address details (both permanent & secondary) saved successfully!",
            data: updatedCustomer,
        }, { status: 200 });

    } catch (error) {
        console.error("❌ INTERNAL SERVER ERROR:", error);
        return NextResponse.json({
            success: false,
            error: "❌ Internal Server Error"
        }, { status: 500 });
    }
}
