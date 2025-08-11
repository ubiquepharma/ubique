import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import TradeFormCard from "./TradeFormCard";

const ProductPageCard = ({ product }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);

  const handleViewMore = () => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/products/${product.productId}`);
  };
  const toggleBookingModal = () => {
    setIsModalOpen((prev) => !prev);
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
    <div className="w-auto h-auto flex flex-col gap-2 border shadow-lg rounded">
      <div className="w-full h-auto">
        <Image
          src={product.image.secure_url}
          alt="product"
          width={500}
          height={500}
          className="aspect-square object-cover"
        />
      </div>

      <div className="flex gap-2 p-2 flex-col flex-grow justify-between">
        <h1 className="text-defined-brown font-semibold text-xl">
          {product.brand}
        </h1>
        <div className="flex gap-2 p-2">
          <button
            className="w-1/2 bg-defined-white p-2 rounded-md text-defined-green font-semibold"
            onClick={toggleBookingModal}
          >
            Order Now
          </button>
          <button
            className="w-1/2 bg-defined-white p-2 rounded-md text-defined-orange font-semibold"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
            <div
              ref={modalRef}
              className="w-full sm:w-[90%] md:w-[50%] max-w-md p-6 rounded-lg relative "
            >
              <TradeFormCard
                closeModal={closeModal}
                productName={product.brand}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPageCard;
