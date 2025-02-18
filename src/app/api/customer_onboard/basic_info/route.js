import { NextResponse } from "next/server";
import { container } from "@/lib/cosmosClient";
import fs from "fs";
import path from "path";

// ✅ Handle POST request for customer onboarding & file upload
export async function POST(req) {
    try {
        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            // ✅ Handle File Upload
            const formData = await req.formData();
            const file = formData.get("file");

            if (!file) {
                return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
            }

            const filePath = path.join(process.cwd(), "public/uploads", file.name);
            const buffer = Buffer.from(await file.arrayBuffer());

            fs.writeFileSync(filePath, buffer);

            return NextResponse.json({ success: true, message: "File uploaded", filePath: `/uploads/${file.name}` });
        } else {
            // ✅ Handle Customer Onboarding
            const body = await req.json();
            console.log("Received Data:", body);

            if (!body.fullName || !body.emailid || !body.contactNumber) {
                return NextResponse.json({ success: false, error: "Missing required fields!" }, { status: 400 });
            }

            const newItem = { ...body, id: `CUST${Date.now()}` };

            const { resource } = await container.items.create(newItem);

            return NextResponse.json({ success: true, data: resource }, { status: 201 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// ✅ Handle GET request to fetch all customers
export async function GET() {
    try {
        const { resources: customers } = await container.items.query("SELECT * FROM c").fetchAll();
        console.log("📌 All Customers in DB:", customers);

        return NextResponse.json(customers, { status: 200 });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}