import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded!" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure directory exists
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, file.name);
        await writeFile(filePath, buffer);

        return NextResponse.json({ success: true, filePath: `/uploads/${file.name}` }, { status: 201 });

    } catch (error) {
        console.error("Upload API error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
