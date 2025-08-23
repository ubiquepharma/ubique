"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MdDashboardCustomize,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { TfiGallery, TfiLayoutSlider } from "react-icons/tfi";

export default function AdminSideHeader() {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboardCustomize />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <MdProductionQuantityLimits />,
      submenu: [
        { name: "Add & Manage Product", path: "/products/manage" },
        { name: "Add & Manage Category", path: "/products/category" },
      ],
    },
    { name: "Slider", path: "/slider", icon: <TfiLayoutSlider /> },
    { name: "Gallery", path: "/gallery", icon: <TfiGallery /> },
  ];

  const router = useRouter();
  const [active, setActive] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-[20%] p-4 h-screen">
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="w-[20rem] h-auto object-cover"
      />
      <hr />
      <div className="flex flex-col gap-2 mt-4">
        {menu.map((item, index) => (
          <div key={index} className="cursor-pointer">
            <div
              onClick={() => {
                if (item.submenu) {
                  setActive(index);
                  setOpenSubmenu(!openSubmenu);
                } else {
                  setActive(index);
                  setOpenSubmenu(false);
                  router.push(item.path);
                }
              }}
              className={`flex items-center gap-2 p-3 rounded transition-all duration-500 font-bold ${
                active === index ? "bg-gray-200 shadow-lg" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </div>

            {item.submenu && (
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSubmenu ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {item.submenu.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    onClick={() => router.push(sub.path)}
                    className="ml-8 p-2 text-sm text-gray-700 font-bold overflow-y-auto hover:bg-gray-100 rounded cursor-pointer transition-all"
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
