import { connectDB } from "@/lib/connection";
// import generateCustomId from "@/middlewares/generateCustomId";
import Molecule from "@/model/molecule";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const data = await Molecule.find({});
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}

export async function POST(req) {
  try {
    await connectDB();

    const { molecule } = await req.json();
    if (!molecule) {
      return NextResponse.json({ message: "Please Enter a molecule name" });
    }

    await Molecule.create({ molecule });
    return NextResponse.json({ message: "Molecule Created Successfully!", success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, molecule } = await req.json();

    if (!id || !molecule) {
      return NextResponse.json({
        message: "ID and molecule name are required.",
        success: false,
      });
    }

    const updatedMolecule = await Molecule.findOneAndUpdate(
      { id }, 
      { molecule },
      { new: true }
    );

    if (!updatedMolecule) {
      return NextResponse.json({
        message: "Molecule not found!",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Molecule Updated Successfully!",
      success: true,
      data: updatedMolecule,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}


export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

     if (!id) {
       return NextResponse.json({
         message: "ID is required.",
         success: false,
       });
     }

    await Molecule.findOneAndDelete({ id });
    return NextResponse.json({ message: "Molecule Deleted Successfully!", success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}