"use client";
import { IoPerson } from "react-icons/io5";
import CategoryComponent from "@/components/admin/CategoryComponent";
import LogoutButton from "@/components/LogoutButton";

const page = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="w-full flex justify-end p-4">
        <LogoutButton />
      </div>
      <CategoryComponent heading="Category" />
    </div>
  );
};

export default page;
