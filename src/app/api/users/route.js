import { connectDB } from "@/lib/connection";
import User from "@/model/user";

import { generateCustomId } from "@/utils/generateCustomId";
import { generateToken } from "@/utils/jsontoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get("userId");

    // Build the query object based on the received query params
    const query = {};
    if (userId) query.userId = userId;

    // Find users matching the query
    const users = await User.find(query);
    return NextResponse.json({ ...users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, password } = body;
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or Phone already in use" },
        { status: 400 }
      );
    }
    const userId = await generateCustomId(User, "userId", "userId");

    // Create a new user
    const data = new User({
      userId,
      name,
      email,
      phone,
      password,
    });

    // Save the new user to the database
    const newUser = await data.save();

    // Generate a JWT token (if applicable, adjust according to your authentication setup)
    const token = generateToken({ ...newUser._doc });
    const cookieStore = await cookies();
    cookieStore.set("token", token);
    return NextResponse.json({ ...newUser._doc }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}
