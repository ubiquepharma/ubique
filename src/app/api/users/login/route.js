import { connectDB } from "@/lib/connection";
import User from "@/model/user";
import { generateToken } from "@/utils/jsontoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { emailOrPhone, password } = body;

    // Validate input
    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user || !(await user.matchPassword(password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const token = generateToken({ ...user });
    const cookieStore = await cookies();
    cookieStore.set("token", token);
    return NextResponse.json({ ...user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}
