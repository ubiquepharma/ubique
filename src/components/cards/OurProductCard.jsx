"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TradeFormCard from "./TradeFormCard";
import { useCallback, useEffect, useRef, useState } from "react";

const OurProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);
  const router = useRouter();
  const handleViewMore = () => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/products/${product.productId}`);
  };

  const toggleBookingModal = (productName) => {
    setIsModalOpen(true);
    setSelectedProduct(productName);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div className="w-[19rem] h-auto flex flex-col justify-between flex-grow gap-2 shadow-lg rounded group">
      <div className="relative w-full h-auto">
        <Image
          src={product.image.secure_url}
          alt="products"
          width={500}
          height={500}
          className="aspect-square object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-2 items-start justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-white p-4">
          <h1 className="font-semibold text-xl">{product.brand}</h1>
          <p>Pack Size : {product.packagingsize}</p>
          <p>MRP:{product.mrp}</p>
          <p>PTR: {product.moq}</p>
          <p>Product Type: {product.category}</p>
        </div>
      </div>
      <h1 className="text-defined-brown font-semibold text-center">
        {product.brand}
      </h1>
      <div className="flex gap-2 p-2">
        <button
          className="w-1/2 bg-defined-blue p-2 rounded-md text-white"
          onClick={() => toggleBookingModal(product.brand)}
        >
          Enquiry Now
        </button>
        <button
          className="w-1/2 bg-defined-orange p-2 rounded-md text-white"
          onClick={handleViewMore}
        >
          View More
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
          <div
            ref={modalRef}
            className="w-full sm:w-[90%] md:w-[50%] max-w-md p-6 rounded-lg relative"
          >
            <TradeFormCard
              closeModal={closeModal}
              productName={selectedProduct}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OurProductCard;
