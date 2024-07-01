import { resend } from "../lib/resend";
import VerificationEmail from "../../emails/verify";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string, 
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "onboarding@resent.dev",
            to: email,
            subject: "Verify your email",
            react: VerificationEmail({username, otp: verifyCode}),
        });
        return {success: true, message: "Verification email sent"};
    } catch (error) {
        console.error("error sending verification email", error);
        return{success: false, message: "Error sending verification email"};
    }
}
