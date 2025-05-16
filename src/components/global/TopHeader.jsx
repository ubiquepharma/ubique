"use client";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
const TopHeader = () => {
  return (
    <div className="z-[60] w-full ">
      <div className=" bg-defined-blue h-[3rem] hidden md:flex justify-between sm:gap-2 md:gap-0 items-center  text-white">
        <div className="flex gap-4 w-full  sm:rounded-br-0 md:rounded-br-[4rem]  sm:px-4 md:px-6 sm:text-xs lg:text-sm xlg:text-base">
          <div className="flex md:gap-2 sm:gap-1 items-center sm:text-[10px] lg:text-sm xlg:text-base font-medium">
            <BiSolidPhoneCall size={20} className="text-white" />
            <Link href="tel:03561358188">0356 1358188</Link>{" "}
          </div>
          <Link
            href="mailto:info@ubiquepharma.com"
            className="flex md:gap-2 sm:gap-1 items-center font-semibold md:flex"
          >
            <MdEmail size={20} className="text-white" />
            <span>info@ubiquepharma.com</span>
          </Link>
          <span className="font-semibold">GSTIN: 19AAFFU0535M1ZV</span>
        </div>
        <div className="flex gap-4 sm:px-4 md:px-6 sm:text-xs lg:text-sm xlg:text-base">
          <div className="flex items-center gap-4">
            <FaGoogle size={20} className="text-white" />
            <a href={"https://www.facebook.com/share/16J1aeKmHh"} target="_blank">
              <FaFacebook size={20} className="text-white" />
            </a>
            <FaXTwitter size={20} className="text-white" />
            <FaLinkedin size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
