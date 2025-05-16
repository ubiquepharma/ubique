"use client";
import dynamic from "next/dynamic";
import { useState, useRef, useCallback, useEffect } from "react";
import ProdCatCard from "../cards/ProdCatCard";
import TradeFormCard from "../cards/TradeFormCard";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const ProductCategorySection = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const toggleBookingModal = () => {
    setIsModalOpen(true);
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

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="mb-4 relative">
      <div className="flex flex-col gap-4 justify-center items-center p-4">
        <h1 className="text-defined-brown text-4xl font-semibold">
          Product Categories
        </h1>

        {Slider && (
          <div className="w-full">
            <Slider {...settings}>
              {products?.map((product) => (
                <div key={product.id} className="px-2">
                  <ProdCatCard
                    product={product}
                    toggleBookingModal={toggleBookingModal}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
          <div
            ref={modalRef}
            className="w-full sm:w-[90%] md:w-[50%] max-w-md p-6 rounded-lg relative"
          >
            <TradeFormCard closeModal={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductCategorySection;
