"use client";
import Image from "next/image";
import { useState } from "react";

const EnquiryFormCard = () => {
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.enquiry ||
      !formData.address ||
      !formData.message
    ) {
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
    *Enquiry:* ${formData.enquiry}
    *Address:* ${formData.address}
    *Message:* ${formData.message}`;
    message = encodeURIComponent(message);

    const dest = "+918617501527";
    const baseUrl = isMobile
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";

    const url = `${baseUrl}?phone=${dest}&text=${message}`;
    window.open(url, "_blank").focus();
  };

  return (
    <div className="w-full h-auto md:w-1/2 relative">
      <Image
        src={"/images/enq-form.png"}
        alt="enq-form"
        width={500}
        height={500}
        className="w-full h-auto md:h-[20rem] object-cover rounded"
      />

      <div className="absolute inset-0 w-full h-full bg-defined-blue opacity-30"></div>

      <div className="absolute inset-0 w-full h-auto flex flex-col gap-2">
        <form
          onSubmit={handleSubmit}
          className="w-[90%] mx-auto py-4 md:py-16 flex flex-col md:gap-8 gap-2"
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 md:p-4 rounded opacity-50 bg-white"
          />
          <input
            type="number"
            placeholder="Mobile No."
            name="mobile"
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            className="w-full p-3 md:p-4 rounded opacity-50 bg-white"
          />
          <select
            name="enquiry"
            placeholder="Enquiry"
            value={formData.enquiry}
            onChange={(e) =>
              setFormData({ ...formData, enquiry: e.target.value })
            }
            id=""
            className="w-full p-3 md:p-4 rounded opacity-50 bg-white"
          >
            <option value="" hidden>
              Select Role
            </option>
            <option value="Distributorship">Distributorship</option>
            <option value="Investor">Investor</option>
            <option value="Marketing">Marketing </option>
            <option value="Others">Others </option>
          </select>
          <input
            type="text"
            placeholder="Address"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-3 md:p-4 rounded opacity-50 bg-white"
          />
          <textarea
            name="message"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Write massege briefly Which you want to Say us:"
            className="w-full p-3 md:p-4 rounded opacity-50 md:max-h-[13rem] bg-white"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-defined-orange text-white p-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryFormCard;
