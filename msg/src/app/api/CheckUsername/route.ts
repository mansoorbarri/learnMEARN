import dbConnect from "@/config/dbConnect";
import UesrModel from "@/model/UserModel";
import {z} from "zod";
import { usernameValidation } from "@/validation/usernameValidation";

const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async funtion GET(req: Request) {
    await dbConnect();
    try {
        const {searchParams} = new URL(req.url);
        const queryParam = {
            username: searchParams.get("username")
        }
    } catch (error) {
        console.error("Error in check username", error);
        return Response.json(success: false, message: "Error in check username", error);
    }
}
