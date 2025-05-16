"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoPerson } from "react-icons/io5";

const LogoutButton = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileImageRef = useRef(null);
  const profileDropdownRef = useClickOutside(() =>
    setIsProfileDropdownOpen(false)
  );

  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/users/logout");
    if (response.ok) {
      router.push("/reboots");
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <span ref={profileImageRef} className="sm:w-[3rem] lg:w-fit">
        <button onClick={toggleProfileDropdown}>
          <IoPerson size={20} />
        </button>
        {isProfileDropdownOpen && (
          <div
            ref={profileDropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <div className="px-4 py-2 text-gray-700">
              <span className="block text-sm">Admin</span>
            </div>
            <div className="border-t border-gray-200"></div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 flex justify-between items-center text-left text-gray-700 hover:bg-gray-100"
            >
              Logout
              <IoIosLogOut />
            </button>
          </div>
        )}
      </span>
    </div>
  );
};

export default LogoutButton;
