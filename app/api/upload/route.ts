import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ Configure Cloudinary using your env variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ✅ Detect resource type automatically (handles both image and video)
    const resourceType = file.type.startsWith("video/") ? "video" : "image";

    // ✅ Convert File to Buffer (required for Cloudinary upload stream)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Upload to Cloudinary and return result
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: resourceType,
            folder: "courses",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // ✅ Return both url and secure_url so frontend can store them
    return NextResponse.json({
      url: result.url,
      secure_url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
/*
export async function POST(req:NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
          }
      
          // Convert file to buffer
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
      
          const cloudinaryFormData = new FormData();
          cloudinaryFormData.append("file", new Blob([buffer]), file.name);
          cloudinaryFormData.append("upload_preset", "file upload");
      
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dwsow7iee/auto/upload",
            {
              method: "POST",
              body: cloudinaryFormData,
            }
          );
      
        const data = await response.json();
        return NextResponse.json({ data });
        
    } catch (error:any) {
        console.log("Error uploading file", error.message)
        return NextResponse.json({
            success: false,
            error
        })
    }
    
}
    */

