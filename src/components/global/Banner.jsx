"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pageData = {
    "/contact": "Contact Us",
    "/about": "About Us",
    "/career": "Career",
    "/investor": "Investor",
    "/gallery": "Gallery",
    "/our-products": "Our Products",
  };

  const mfgTitles = {
    "track-order": "Track Your Order",
    "product-approval": "Product Approval List",
    "manufacturing-service": "Manufacturing Service",
  };

  const galleryTitles = {
    ads: "ads",
    events: "Events",
  };

  let title = pageData[pathname] || "Page";

  if (pathname.startsWith("/mfg-facility")) {
    const facility = pathname.split("/")[2];
    title = mfgTitles[facility] || "Mfg. Facility";
  }

  if (pathname.startsWith("/our-gallery")) {
    const id = pathname.split("/")[2];
    title = galleryTitles[id] || "Gallery";
  }

  if (pathname.startsWith("/our-products/")) {
    title = "Our Products";
  }

  return (
    <div className="w-full h-[10rem] relative">
      <Image
        src="/banner.jpg"
        alt="product form"
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="absolute inset-0 flex justify-center items-center flex-col text-white z-10">
        <h1 className="text-4xl font-semibold capitalize">{title}</h1>
      </div>
    </div>
  );
};

export default Banner;
