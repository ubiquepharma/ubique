import { connectDB } from "@/lib/connection";
import User from "@/model/user";

import mongoose from "mongoose";

export default async function GET(req, { params }) {
  try {
    await connectDB();
    const id = (await params).id;
    const user = await User.findOne({
      $or: [
        { userId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });
    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
    return NextResponse.json({ ...user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const id = (await params).id;
    const user = await User.deleteOne({
      $or: [
        { userId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}
