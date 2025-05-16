"use client";
import Image from "next/image";
import { useState } from "react";

const TradeFormCard = ({ closeModal, productName }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    product: productName,
    quantity: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.product ||
      !formData.quantity ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Please enter a valid mobile number");
      return;
    }

    const dest = "+918617501527";
    const message = `*Name:* ${formData.name}
*Phone:* ${formData.mobile}
*Product:* ${formData.product}
*Quantity:* ${formData.quantity}
*email:* ${formData.email}
*Message:* ${formData.message}`;

    const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
    const baseUrl = isMobile
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";

    const url = `${baseUrl}?phone=${dest}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank").focus();
  };

  return (
    <div className="relative w-full mx-auto transition-all duration-300 ease-in-out rounded-lg">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-xl border text-white hover:text-red-500 p-2 rounded-full transition-all duration-300 z-[100] pointer-events-auto"
      >
        ✖
      </button>

      {/* Background Image */}
      <Image
        src={"/images/enq-img.png"}
        alt="enq-form"
        width={500}
        height={500}
        className="w-full h-[35rem] object-cover rounded"
      />

      <div className="absolute inset-0 w-full h-full bg-defined-blue opacity-50"></div>

      {/* Form */}
      <div className="absolute inset-0 w-full h-auto flex flex-col gap-2 p-6">
        <form
          className="w-full max-w-md mx-auto py-16 flex flex-col gap-4 p-3 rounded-lg"
          onSubmit={handleFormSubmit}
        >
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-1/2 p-3 rounded border bg-white/70"
            />
            <input
              type="number"
              placeholder="Mobile No."
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="w-1/2 p-3 rounded border bg-white/70"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Product Name"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-1/2 p-3 rounded border bg-white/70"
            />
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleChange}
              className="w-1/2 p-3 rounded border bg-white/70"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded border bg-white/70"
          />
          <textarea
            name="message"
            placeholder="Write message briefly which you want to say to us:"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded border resize-none bg-white/70"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-defined-orange text-white p-4 rounded hover:bg-orange-600 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeFormCard;
