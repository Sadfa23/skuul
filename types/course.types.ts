import z from "zod";

export const course_level = z.enum([]);


export const createCourseInputSchema = z.object({
    course_name: z.string().min(1, "course name is required"), 
    description: z.string().min(1, "description is required"), 
    price: z.float64().default(0),  
    course_level: z.enum(["Beginner", "Intermediate", "Advanced"]),
    image_secure_url:z.string().nullable(),
    video_secure_url:z.string().nullable()
})

export type createCourseInput = z.infer<typeof createCourseInputSchema>;

