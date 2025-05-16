"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import TradeFormCard from "../cards/TradeFormCard";
const ProductDetails = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mobile || !formData.quantity) {
      alert("Please fill all the fields");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Please enter a valid mobile number");
      return;
    }

    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);

    let message = `*Name:* ${formData.name}
    *Mobile:* ${formData.mobile}
    *Quantity:* ${formData.quantity}
    *Email:* ${formData.email}
    *Purpose:* ${formData.purpose}
    *Location:* ${formData.location}
    *Message:* ${formData.message}`;
    message = encodeURIComponent(message);

    const dest = "+918617501527";
    const baseUrl = isMobile
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";

    const url = `${baseUrl}?phone=${dest}&text=${message}`;
    window.open(url, "_blank").focus();
  };

  const toggleBookingModal = () => {
    setIsModalOpen((prev) => !prev);
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

  const content = [
    { desc: product?.businessType, title: "Business Type" },
    {
      desc: product?.category,
      title: "Type",
    },
    { desc: product?.applicationType, title: "Application" },
    { desc: product?.packagingsize, title: "Packaging Size" },
    { desc: product?.expireDate, title: "Expiry Date" },
  ];

  return (
    <section>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:mx-8">
          {/* Left */}
          <div className="w-full md:w-[40%]">
            <Image
              src={product?.image?.secure_url}
              alt="products"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-2 w-full md:w-[60%] p-4">
            <h1 className="text-defined-blue text-2xl font-semibold">
              {product?.brand}
            </h1>

            <div className="text-lg text-defined-brown">
              <p>
                <span className="text-defined-green font-bold">
                  ₹{product?.mrp}
                </span>
              </p>
              <p>{product?.moq} (MOQ)</p>
            </div>

            <div className="border grid grid-cols-1 place-items-stretch justify-between justify-items-stretch">
              {content.map((item, index) => (
                <div
                  key={index}
                  className="border flex-1 flex flex-col lg:flex-row"
                >
                  <h1 className="text-defined-brown text-xl font-semibold border-r p-0.5 basis-full lg:basis-1/2">
                    {item.title}
                  </h1>
                  <p className="text-defined-brown text-xl border-l p-0.5 basis-full lg:basis-1/2">{item.desc}</p>
                </div>
              ))}
            </div>
            {/* <div className="w-full h-full border ">
            </div> */}

            <div className="flex text-lg">
              <p className="w-1/2">Medicine Type</p>
              <p>{product?.medicineType}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-[#00A86A]">Preferred Buyer From</p>
              <p className="w-1/2">Worldwide</p>
            </div>

            <div className="flex gap-2 p-2 text-white">
              <button className="w-1/2 md:w-[25%] bg-defined-green p-2 rounded-md">
                <a href="tel:+918617501527">Request to Call</a>
              </button>
              <button
                className="w-1/2 md:w-[25%] bg-defined-orange p-2 rounded-md"
                onClick={toggleBookingModal}
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex p-8 gap-4 flex-col md:mx-8">
          <h1 className="text-defined-brown text-2xl font-semibold">
            Composition Details
          </h1>
          <p>{product?.composition}</p>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
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

        {/* form */}
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-defined-blue text-2xl font-semibold text-center">
            Looking For Medicine
          </h1>
          <div className="w-full h-auto relative">
            <Image
              src={"/images/enq-form.png"}
              alt="enq-form"
              width={500}
              height={500}
              className="w-full h-[40rem] object-cover rounded"
            />

            <div className="absolute inset-0 w-full h-full bg-defined-blue opacity-30"></div>

            <div className="absolute inset-0 w-full h-auto flex flex-col gap-2">
              <form
                onSubmit={handleSubmit}
                className="w-[90%] mx-auto py-4 md:py-16 flex flex-col md:gap-8 gap-2"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/50"
                  />
                  <input
                    type="number"
                    placeholder="Mobile No."
                    name="mobile"
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/50"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Email Id"
                    name="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/50"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Purpose"
                    name="purpose"
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/50"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/50"
                  />
                </div>
                <textarea
                  name="message"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  id=""
                  rows={"4"}
                  placeholder="Message"
                  className="w-full p-3 md:p-4 rounded bg-white/50"
                />
                <button
                  type="submit"
                  className="bg-defined-orange text-white p-4 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
