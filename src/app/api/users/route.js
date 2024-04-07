import mongoose from 'mongoose';
import {User} from "../../models/User";

export async function GET() {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
    const users = await User.find();
    return Response.json(users);
}