"use client";
import { IoPerson } from "react-icons/io5";
import PackageComponent from "@/components/admin/PackageComponent";

const page = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="w-full flex justify-end p-4">
        <IoPerson size={30} />
      </div>
      <PackageComponent heading="Package" />
    </div>
  );
};

export default page;
