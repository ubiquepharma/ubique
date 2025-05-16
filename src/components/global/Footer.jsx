"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaCircleDot } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Products", path: "/products" },
    { name: "Career", path: "/career" },
    { name: "Investor", path: "/investor" },
    { name: "Gallery", path: "/gallery/visual-ads" },
    { name: "Contact Us", path: "/contact" },
  ];

  const quickLinks2 = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Vision", path: "/about" },
    { name: "Our Product", path: "/products" },
    { name: "CSR", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleBookingModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <footer className="relative w-full p-6 lg:p-8 border-t-4 border-defined-orange">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-defined-blue"></div>

      {/* Content */}
      <div className="relative z-10 text-white">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section */}
            <div className="flex flex-col gap-4 w-full lg:w-[45%]">
              <Image
                src="/logo-white.png"
                alt="logo"
                width={186}
                height={52}
                className="h-[4rem]"
              />
              <div className=" text-white">
                <div className="flex items-center gap-2">
                  <LuPhoneCall />
                  <Link href={"tel:03561358188"}>
                    <span>0356 1358188</span>
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmail />
                  <Link href={"mailto:info@ubiquepharma.com"}>
                    <span>info@ubiquepharma.com</span>
                  </Link>
                </div>
                <div className="flex gap-2 w-full xl:w-[80%]">
                  <IoLocationSharp className="text-lg" />
                  <span>
                    Solanipuram, Civil Line, Roorkee- <br /> 247667 (UK) India
                  </span>
                </div>
                <div className="flex gap-2 w-full xl:w-[80%]">
                  <IoLocationSharp className="text-lg" />
                  <span>
                    RO: Papiva Para. Dabaram-II. <br /> Siliguri-734006. (WB)
                    India
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-[55%] lg:flex-row">
              {/* Quick Links */}
              <div className="w-1/2">
                <h1 className="font-bold">Quick Links</h1>
                <ul className="text-white">
                  {quickLinks.map((item, index) => (
                    <li key={index} className="py-1 flex gap-1 items-center">
                      <FaCircleDot size={10} />{" "}
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="w-1/2">
                <h1 className="font-bold">Quick Links</h1>
                <ul className="text-white">
                  {quickLinks2.map((item, index) => (
                    <li key={index} className="py-1 flex gap-1 items-center">
                      <FaCircleDot size={10} />{" "}
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full h-full lg:w-[35%] relative z-20">
              <Image
                src={"/images/contact.png"}
                alt="enq-form"
                width={500}
                height={500}
                className="w-full h-[12rem] object-cover"
              />

              <div className="flex gap-4 p-3">
                <a
                  href="https://www.facebook.com/share/16J1aeKmHh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M30 15C30 22.4871 24.5145 28.6928 17.3438 29.8178V19.3359H20.8389L21.5039 15H17.3438V12.1863C17.3438 10.9998 17.925 9.84375 19.7883 9.84375H21.6797V6.15234C21.6797 6.15234 19.9629 5.85938 18.3217 5.85938C14.8957 5.85938 12.6562 7.93594 12.6562 11.6953V15H8.84766V19.3359H12.6562V29.8178C5.48555 28.6928 0 22.4871 0 15C0 6.71602 6.71602 0 15 0C23.284 0 30 6.71602 30 15Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M20.8389 19.3359L21.5039 15H17.3438V12.1863C17.3438 11 17.9249 9.84375 19.7882 9.84375H21.6797V6.15234C21.6797 6.15234 19.9631 5.85938 18.322 5.85938C14.8956 5.85938 12.6562 7.93594 12.6562 11.6953V15H8.84766V19.3359H12.6562V29.8177C13.42 29.9375 14.2027 30 15 30C15.7973 30 16.58 29.9375 17.3438 29.8177V19.3359H20.8389Z"
                      fill="white"
                    />
                  </svg>
                </a>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M15 30C6.717 30 0 23.283 0 15C0 6.717 6.717 0 15 0C23.283 0 30 6.717 30 15C30 23.283 23.283 30 15 30Z"
                    fill="url(#paint0_linear_322_273)"
                  />
                  <path
                    d="M15.0001 6.60599C17.7331 6.60599 18.0571 6.61499 19.1371 6.66599C20.1361 6.71099 20.6791 6.87899 21.0391 7.01999C21.5161 7.20599 21.8581 7.42799 22.2151 7.78499C22.5721 8.14199 22.7941 8.48399 22.9801 8.96099C23.1211 9.32099 23.2861 9.86399 23.3341 10.863C23.3821 11.943 23.3941 12.267 23.3941 15C23.3941 17.733 23.3851 18.057 23.3341 19.137C23.2891 20.136 23.1211 20.679 22.9801 21.039C22.7941 21.516 22.5721 21.858 22.2151 22.215C21.8581 22.572 21.5161 22.794 21.0391 22.98C20.6791 23.121 20.1361 23.286 19.1371 23.334C18.0571 23.382 17.7331 23.394 15.0001 23.394C12.2671 23.394 11.9431 23.385 10.8631 23.334C9.86406 23.289 9.32106 23.121 8.96106 22.98C8.48406 22.794 8.14206 22.572 7.78506 22.215C7.42806 21.858 7.20606 21.516 7.02006 21.039C6.87906 20.679 6.71406 20.136 6.66606 19.137C6.61806 18.057 6.60606 17.733 6.60606 15C6.60606 12.267 6.61506 11.943 6.66606 10.863C6.71106 9.86399 6.87906 9.32099 7.02006 8.96099C7.20606 8.48399 7.42806 8.14199 7.78506 7.78499C8.14206 7.42799 8.48406 7.20599 8.96106 7.01999C9.32106 6.87899 9.86406 6.71399 10.8631 6.66599C11.9431 6.61499 12.2671 6.60599 15.0001 6.60599ZM15.0001 4.76099C12.2191 4.76099 11.8711 4.77299 10.7791 4.82399C9.69006 4.87499 8.94606 5.04599 8.29206 5.30099C7.62006 5.55899 7.04706 5.90999 6.48006 6.47999C5.91006 7.04999 5.56206 7.61999 5.29806 8.29499C5.04606 8.94599 4.87206 9.68999 4.82106 10.782C4.77006 11.874 4.75806 12.222 4.75806 15.003C4.75806 17.784 4.77006 18.132 4.82106 19.224C4.87206 20.313 5.04306 21.057 5.29806 21.711C5.55906 22.38 5.91006 22.953 6.48006 23.52C7.05006 24.09 7.62006 24.438 8.29506 24.702C8.94606 24.954 9.69006 25.128 10.7821 25.179C11.8741 25.23 12.2221 25.242 15.0031 25.242C17.7841 25.242 18.1321 25.23 19.2241 25.179C20.3131 25.128 21.0571 24.957 21.7111 24.702C22.3801 24.441 22.9531 24.09 23.5201 23.52C24.0901 22.95 24.4381 22.38 24.7021 21.705C24.9541 21.054 25.1281 20.31 25.1791 19.218C25.2301 18.126 25.2421 17.778 25.2421 14.997C25.2421 12.216 25.2301 11.868 25.1791 10.776C25.1281 9.68699 24.9571 8.94299 24.7021 8.28899C24.4411 7.61999 24.0901 7.04699 23.5201 6.47999C22.9501 5.90999 22.3801 5.56199 21.7051 5.29799C21.0541 5.04599 20.3101 4.87199 19.2181 4.82099C18.1291 4.77299 17.7811 4.76099 15.0001 4.76099Z"
                    fill="white"
                  />
                  <path
                    d="M15.0001 9.74097C12.0961 9.74097 9.74109 12.096 9.74109 15C9.74109 17.904 12.0961 20.259 15.0001 20.259C17.9041 20.259 20.2591 17.904 20.2591 15C20.2591 12.096 17.9041 9.74097 15.0001 9.74097ZM15.0001 18.414C13.1161 18.414 11.5861 16.887 11.5861 15C11.5861 13.113 13.1161 11.586 15.0001 11.586C16.8841 11.586 18.4141 13.113 18.4141 15C18.4141 16.887 16.8841 18.414 15.0001 18.414Z"
                    fill="white"
                  />
                  <path
                    d="M20.4661 10.764C21.1454 10.764 21.6961 10.2133 21.6961 9.53396C21.6961 8.85464 21.1454 8.30396 20.4661 8.30396C19.7868 8.30396 19.2361 8.85464 19.2361 9.53396C19.2361 10.2133 19.7868 10.764 20.4661 10.764Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_322_273"
                      x1="4.39341"
                      y1="25.6066"
                      x2="25.6066"
                      y2="4.39341"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFD521" />
                      <stop offset="0.055" stopColor="#FFD020" />
                      <stop offset="0.124" stopColor="#FEC01E" />
                      <stop offset="0.2" stopColor="#FCA71B" />
                      <stop offset="0.282" stopColor="#FA8316" />
                      <stop offset="0.368" stopColor="#F85510" />
                      <stop offset="0.456" stopColor="#F51E09" />
                      <stop offset="0.5" stopColor="#F30005" />
                      <stop offset="0.503" stopColor="#F20007" />
                      <stop offset="0.597" stopColor="#E1003B" />
                      <stop offset="0.688" stopColor="#D30067" />
                      <stop offset="0.776" stopColor="#C70088" />
                      <stop offset="0.859" stopColor="#BF00A0" />
                      <stop offset="0.936" stopColor="#BB00AF" />
                      <stop offset="1" stopColor="#B900B4" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                    fill="#007AB9"
                  />
                  <path
                    d="M23.9623 16.2071V22.3913H20.3769V16.6216C20.3769 15.1728 19.8592 14.1835 18.5611 14.1835C17.5704 14.1835 16.9819 14.8496 16.722 15.4945C16.6276 15.725 16.6032 16.0451 16.6032 16.3683V22.391H13.0176C13.0176 22.391 13.0657 12.619 13.0176 11.6075H16.6035V13.1356C16.5963 13.1476 16.5861 13.1594 16.5797 13.1709H16.6035V13.1356C17.08 12.4024 17.9298 11.3543 19.8349 11.3543C22.1938 11.3543 23.9623 12.8955 23.9623 16.2071ZM9.26662 6.40942C8.04011 6.40942 7.23767 7.21453 7.23767 8.27232C7.23767 9.30766 8.01684 10.136 9.21956 10.136H9.24282C10.4934 10.136 11.271 9.30766 11.271 8.27232C11.2472 7.21453 10.4934 6.40942 9.26662 6.40942ZM7.45078 22.3913H11.0351V11.6075H7.45078V22.3913Z"
                    fill="#F1F2F2"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M15 0C6.71601 0 0 6.71601 0 15C0 23.284 6.71601 30 15 30C23.284 30 30 23.284 30 15C30 6.71601 23.284 0 15 0Z"
                    fill="black"
                  />
                  <path
                    d="M16.641 13.6425L23.0623 6.17822H21.5406L15.965 12.6593L11.5118 6.17822H6.37549L13.1096 15.9788L6.37549 23.8062H7.89722L13.7852 16.962L18.4882 23.8062H23.6245L16.6406 13.6425H16.641ZM8.44551 7.32377H10.7828L21.5413 22.7128H19.204L8.44551 7.32377Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="bg-defined-gray w-full my-4" />
        <div className="text-sm text-white flex flex-col md:flex-row justify-between items-center">
          <h1>
            © 2025{" "}
            <span>
              <Link href="/"> Ubique Pharma</Link>
            </span>{" "}
            - All Rights Reserved
          </h1>
          <h1>
            Design & Developed By:{" "}
            <span className="font-semibold">
              <a target="_blank" href="https://rebootai.in/">
                Reboot AI Pvt. Ltd.
              </a>
            </span>
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
