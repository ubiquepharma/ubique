const MfgServiceSection = () => {
    const content = [
      {
        title: "Global Expertise in Contract Manufacturing",
        desc: "Global Expertise in Contract Manufacturing We offer comprehensive manufacturing solutions across various segments, meeting the needs of businesses worldwide. Whether you are a startup or an established brand, our team adapts to your specific requirements to deliver tailored manufacturing solutions.",
      },
      {
        title: "Premium Packaging & Presentation",
        desc: "Our products are presented with attractive, world-class packaging that not only protects your product but also enhances its visual appeal. We understand the importance of first impressions, and our packaging reflects the quality and value of your brand.",
      },
      {
        title: "100% Efficacy and Quality Assurance",
        desc: "Our commitment to 100% efficacy ensures that every product we manufacture meets the highest standards of performance and reliability. We maintain rigorous quality control processes to ensure that each batch meets your specifications and exceeds industry standards.",
      },
      {
        title: "Timely Delivery, Every Time",
        desc: "We recognize the importance of timely delivery for businesses operating in fast-paced markets. With a streamlined production and logistics process, we ensure that your products arrive when promised, enabling you to meet market demands without delays.",
      },
      {
        title: "Comprehensive Documentation & COA Reports",
        desc: "Transparency is key to building trust. That’s why we provide a Certificate of Analysis (COA) with each batch, offering detailed insights into the quality and specifications of the products you receive. This report serves as an assurance of the product's integrity and consistency.",
      }
    ];
  return (
    <section>
      <div className="p-8 m-8 flex flex-col gap-8 text-defined-brown">
        <p className="text-xl">
          We specialize in providing high-quality contract manufacturing
          services for a wide range of industries, catering to both domestic and
          international markets. Our commitment to excellence is evident in
          every aspect of our operations—from the products we manufacture to the
          world-class packaging, timely delivery, and 100% efficacy we guarantee
          with every batch.
        </p>
        <h1 className="text-4xl font-semibold">Our Key Offerings:</h1>
        <ul>
         {content.map((item, index) => (
            <li key={index} className='flex flex-col gap-2'>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MfgServiceSection