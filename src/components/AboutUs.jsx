const AboutUs = () => {
  const content = [
    {
      heading: "Nature of Business",
      desc: "Marketing, Third Party Manufacturers, Exporters, Wholesaler, Trader, Distributor",
    },
    {
      heading: "Number of Employees",
      desc: "50+",
    },
    {
      heading: "Year of Establishment",
      desc: "2012",
    },
    {
      heading: "Incorporation No",
      desc: "U47721WB2023PTC260267",
    },
  ];
  const points = [
    {
      title: "Quality",
      desc: "Quality is central to every step at Ubique Pharma. We partner with certified manufacturing units and labs to ensure safety, efficacy, and regulatory compliance. Our products adhere to WHO, FDA, GMP, FSSAI, ISO 9001:2015, and ISO 22000:2018 standards. Every formulation is overseen by skilled quality experts. By offering the latest DCGI-approved molecules, we fulfill market demands with confidence, delivering products that meet global standards and exceed customer expectations.",
      color: "defined-blue",
    },
    {
      title: "Innovation",
      desc: "At Ubique Pharma, innovation is rooted in science and driven by strong on-ground insights. Our field teams maintain close interactions with doctors and patients, allowing us to identify real-world needs. These insights fuel novel ideas and solutions across therapeutic areas. We aim to bridge clinical requirements with advanced research, promoting synergy and progress. By fostering innovation, we remain committed to advancing healthcare and delivering more effective treatment solutions.",
      color: "defined-orange",
    },
    {
      title: "Responsibility",
      desc: "Ubique Pharma believes in giving back to society through responsible actions. We plan to establish the Ubique Welfare Foundation to uplift underprivileged communities and foster social change. Our commitment extends to active participation in CSR initiatives aimed at improving health, education, and sustainable living. Through ethical practices and compassionate outreach, we strive to create a lasting impact and contribute meaningfully to the well-being of individuals and society at large.",
      color: "defined-blue",
    },
    {
      title: "Efficiacy",
      desc: "Efficacy is the foundation of our pharmaceutical solutions at Ubique Pharma. Each product undergoes rigorous research, formulation, and testing to ensure optimal therapeutic results. We comply with global certifications like WHO, GMP, FDA, and ISO standards, guaranteeing reliability and safety. Our scientific team focuses on innovation, new molecules, and advanced delivery systems to improve outcomes. We never compromise on efficacy—our commitment is to deliver treatments that truly make a difference.",
      color: "defined-orange",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-8 md:m-8">
      <h1 className="text-defined-brown text-4xl font-semibold">About Us</h1>
      <p className="text-justify">
        Ubique Pharma Pvt. Ltd. is a rapidly growing pharmaceutical company
        engaged in a diverse range of businesses, including the marketing,
        export, and supply of pharmaceutical products, nutraceutical
        supplements, and third-party manufacturing services both domestically
        and internationally. We are committed to providing products of the
        highest quality and efficacy, sourced from facilities certified by WHO,
        GMP, ISO 9001:2015 and ISO 22000:2018 certification. These facilities
        are operated by a highly skilled and knowledgeable team dedicated to
        adhering to rigorous quality systems, ensuring the delivery of
        world-class products that meet global standards. Our commitment to
        excellence extends beyond manufacturing, as we continuously strive to
        meet the evolving needs of the healthcare industry. We prioritize
        innovation, sustainability, and customer satisfaction, making sure our
        products are not only effective but also safe for all users. With a
        strong focus on research and development, we aim to introduce new and
        advanced solutions that enhance well-being worldwide. Ubique Pharma Pvt.
        Ltd. is poised to continue expanding its global footprint, building
        long-term partnerships, and contributing to the global healthcare
        landscape through quality and innovation.
      </p>

      <h1 className="text-defined-brown text-4xl font-semibold">
        Our Mission and Vision
      </h1>
      <p className="text-justify">
        Our vision is to be a leading global pharmaceutical company, recognized
        for our commitment to excellence in product quality, innovation, and
        customer satisfaction. We aspire to create a healthier world by offering
        cutting-edge healthcare solutions, expanding access to essential
        medicines, and fostering sustainable growth in the pharmaceutical
        industry. We aim to build strong, long-lasting partnerships and make a
        meaningful impact on global health. Our mission is to enhance global
        health by providing high-quality, affordable pharmaceutical products and
        nutraceutical supplements. We aim to deliver safe, effective, and
        innovative healthcare solutions that improve the well-being of
        individuals worldwide. Through continuous research, development, and
        collaboration, we strive to meet the evolving needs of our customers
        while maintaining the highest standards of quality and integrity.
      </p>

      <h1 className="text-defined-brown text-4xl font-semibold">
        Our Key Points:
      </h1>

      <div className="w-full flex flex-col md:flex-row gap-2">
        {points.map((item, index) => (
          <div key={index} className="flex flex-col w-full md:w-[33%]">
            <div
              className={`flex justify-center items-center text-2xl text-white rounded-t w-full p-4 bg-${item.color}`}
            >
              {item.title}
            </div>

            <p
              className={`p-3 text-defined-brown bg-${item.color} bg-opacity-30 h-full text-justify rounded-b`}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full h-full border flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-[40%] border">
          {content.map((item, index) => (
            <div key={index} className="border p-4">
              <h1 className="text-defined-brown text-xl font-semibold">
                {item.heading}
              </h1>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2 lg:w-[60%] border">
          {content.map((item, index) => (
            <div key={index} className="border p-4">
              <p className="text-defined-brown text-xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
