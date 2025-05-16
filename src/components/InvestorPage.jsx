"use client";
import Image from "next/image";
import { useState } from "react";

const InvestorPage = () => {
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
    <section>
      <div className="p-8 m-8">
        <Image
          src={"/images/investor.png"}
          alt="career"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8 flex flex-col gap-4 md:m-8">
        <h1 className="text-defined-brown text-4xl font-semibold">
          Investor Relations
        </h1>
        <p>
          At Ubique Pharma, we are committed to driving growth, innovation, and
          excellence in the pharmaceutical industry. Since our inception in
          2014, we have been dedicated to manufacturing high-quality, affordable
          medications that enhance global health and well-being. Our strong
          foundation in research, regulatory compliance, and advanced
          manufacturing capabilities positions us as a trusted name in the
          industry. <br />
          We continuously invest in cutting-edge technology, robust quality
          assurance, and product innovation to expand our market presence. Our
          diverse portfolio spans key therapeutic areas, ensuring a steady
          pipeline of breakthrough formulations that meet global healthcare
          needs. With a focus on sustainability and ethical business practices,
          Ubique Pharma fosters long-term partnerships and sustainable financial
          growth. <br />
          Our upcoming Ubique Human Welfare Foundation further strengthens our
          Corporate Social Responsibility (CSR) efforts, reinforcing our
          commitment to both investors and society. As we expand into new
          markets and enhance our product offerings, we remain dedicated to
          delivering strong financial performance and creating value for our
          stakeholders. We invite investors to join us on this journey of
          growth, innovation, and impact. Partner with Ubique Pharma, where
          business success aligns with a healthier future for all. Invest with
          confidence.
        </p>
      </div>
      <div className="relative w-full h-auto p-8">
        <div className="absolute inset-0 h-full">
          <Image
            src={"/images/enq-form.png"}
            alt="enq-form"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute inset-0 w-full h-full bg-defined-blue opacity-40"></div>
        </div>
        <div className="relative inset-0 w-full h-full flex flex-col gap-2">
          <form
            onSubmit={handleSubmit}
            className="w-[90%] mx-auto p-4 md:py-8 flex flex-col md:gap-6 gap-2"
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 md:p-4 rounded bg-white/80"
            />
            <input
              type="number"
              placeholder="Mobile No."
              name="mobile"
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              className="w-full p-3 md:p-4 rounded bg-white/80"
            />
            <select
              name="enquiry"
              onChange={(e) =>
                setFormData({ ...formData, enquiry: e.target.value })
              }
              className="w-full p-3 md:p-4 rounded bg-white/80"
            >
              <option value="Select Enquiry" disabled selected hidden>
                Select Enquiry
              </option>
              <option value="Distributorship">Distributorship</option>
              <option value="Investor">Investor</option>
              <option value="Marketing">Marketing </option>
              <option value="Others">Others </option>
            </select>
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-3 md:p-4 rounded bg-white/80"
            />
            <textarea
              name="message"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Write massege briefly Which you want to Say us:"
              className="w-full p-3 md:p-4 rounded bg-white/80 md:max-h-[13rem]"
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
    </section>
  );
};

export default InvestorPage;
