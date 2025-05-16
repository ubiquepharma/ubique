"use client";
import GalleryComponent from "@/components/admin/GalleryComponent";
import LogoutButton from "@/components/LogoutButton";
import { IoPerson } from "react-icons/io5";

const page = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="w-full flex justify-end p-4">
        <LogoutButton />
      </div>
      <GalleryComponent />
    </div>
  );
};

export default page;
