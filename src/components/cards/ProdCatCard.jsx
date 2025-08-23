"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProdCatCard = ({ product, toggleBookingModal }) => {
  const router = useRouter();

  const handleViewMore = () => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/our-products/${product.productId}`);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full relative group overflow-hidden border border-gray-300 flex justify-center items-center">
        <Image
          src={product.image.secure_url}
          alt="prod-cat"
          fill
          className="size-[8rem] object-cover rounded-full p-2"
        />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 ease-in-out rounded-full"></div>

        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-full">
          <button
            className="bg-defined-green text-white px-3 py-1 rounded-full text-sm"
            onClick={() => toggleBookingModal(product)}
          >
            Enquiry Now
          </button>
          <button
            className="bg-defined-orange text-white px-3 py-1 rounded-full text-sm"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      </div>
      <h1 className="text-defined-brown mt-2">{product.name}</h1>
    </div>
  );
};

export default ProdCatCard;
