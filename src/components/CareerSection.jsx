"use client";
import Image from "next/image";
import { useState } from "react";

const CareerSection = () => {
  const [formData, setFormData] = useState({});

   const handleSubmit = (e) => {
     e.preventDefault();
     
     if (
       !formData.name ||
       !formData.mobile ||
       !formData.location ||
       !formData.role ||
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
    *Location:* ${formData.location}
    *Role:* ${formData.role}
    *Message:* ${formData.message}
    `;
     message = encodeURIComponent(message);

     const dest = "+918617501527";
     const baseUrl = isMobile
       ? "https://api.whatsapp.com/send"
       : "https://web.whatsapp.com/send";

     const url = `${baseUrl}?phone=${dest}&text=${message}`;
     window.open(url, "_blank").focus();
   };

  return (
    <section>
      <div className="p-8 md:m-8">
        <Image
          src={"/career/career.png"}
          alt="career"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />

        <p className="text-defined-brown p-4 text-lg">
          At Ubique Pharma Pvt. Ltd., we believe in fostering a dynamic and
          growth-oriented work environment where talent thrives. We offer
          exciting career opportunities for passionate professionals in
          pharmaceuticals, nutraceuticals, marketing, research, and
          manufacturing. Our team-driven culture encourages innovation,
          continuous learning, and professional development. Join us to be part
          of a visionary organization committed to excellence, global healthcare
          advancement, and employee success. Explore a rewarding career with us
          and contribute to shaping the future of healthcare.
        </p>

        {/* Form TODO */}
        <div className="flex flex-col gap-4 p-4">
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
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/80"
                  />
                  <input
                    type="number"
                    placeholder="Mobile No."
                    name="mobile"
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/80"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    name="location"
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Location"
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/80"
                  />
                  <select
                    name="role"
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    id=""
                    className="w-full md:w-1/2 p-3 md:p-4 rounded bg-white/80"
                  >
                    <option value="" disabled selected hidden>
                      Select Role
                    </option>
                    <option value="MR">MR</option>
                    <option value="ASM">ASM</option>
                    <option value="RSM">RSM </option>
                    <option value="ZSM">ZSM </option>
                    <option value="Office Staff">Office Staff </option>
                    <option value="Others">Others </option>
                  </select>
                </div>
                <textarea
                  name="message"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  id=""
                  rows={"4"}
                  placeholder="Message"
                  className="w-full p-3 md:p-4 rounded bg-white/80"
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

export default CareerSection;