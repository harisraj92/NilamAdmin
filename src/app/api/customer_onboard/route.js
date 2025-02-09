import { NextResponse } from "next/server";
import { container } from "@/lib/cosmosClient";

// ✅ Handle POST request to insert a customer
export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Received Data:", body);

        if (!body.fullName || !body.emailid || !body.contactNumber) {
            return NextResponse.json({ success: false, error: "Missing required fields!" }, { status: 400 });
        }

        const newItem = { ...body, id: `CUST${Date.now()}` };

        const { resource } = await container.items.create(newItem);

        return NextResponse.json({ success: true, data: resource }, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


// ✅ Handle GET request to fetch all customers
export async function GET() {
    try {
        const { resources } = await container.items.readAll().fetchAll();
        return NextResponse.json({ success: true, data: resources }, { status: 200 });

    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
