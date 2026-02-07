import { z }from "zod"

export const UserRoleEnum = z.enum(["STUDENT", "TUTOR", "ADMIN"]);
export const AuthProviderEnum = z.enum(["credentials", "google", "github", "facebook", "microsoft"]);

export const signupInputSchema = z.object({
    firstname: z.string().min(1, "First name is required"), 
    lastname: z.string().min(1, "Last name is required"), 
    email: z.email("Invalid email"), 
    password: z.string().min(6, "Password must be at least 6 characters"), 
    role: z.enum(["STUDENT", "TUTOR", "ADMIN"]),
    
    //For Oath:- May be removed as the providers to that themselves
    provider: z.enum(["credentials", "google", "github", "facebook", "microsoft"]).optional(), 
    oauthToken: z.string().optional(),
})

export type UserAuthInput = z.infer<typeof signupInputSchema>;

export const loginInputSchema = z.object({
    email :z.email("Invalid email"),
    password:z.string().min(6, "Password must be at least 6 characters")
})

export type UserLoginInput = z.infer<typeof loginInputSchema>