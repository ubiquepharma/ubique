'use client';
import Image from "next/image"
import useElementHeight from "@/hooks/useElementHeight"
import { useEffect, useState } from "react"

const AboutSection = () => {
    const [rightSideHeight, leftSideRef] = useElementHeight();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const content =
      "Ubique embarked on its mission with a core commitment to enhancing health and well-being. Since our inception, we have dedicated ourselves to delivering high-quality, affordable medications Ubique embarked on its mission with a core commitment to enhancing Ubique embarked on its mission with a core commitment to enhancing health and well-being.";
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-4 xl:p-16 lg:p-8">
        <div
          className="md:w-[40%] w-full"
          style={{
            height: isSmallScreen ? "auto" : `${rightSideHeight}px`,
          }}
        >
          <Image
            src={"/images/about.jpeg"}
            alt={"about"}
            width={550}
            height={420}
            className="w-full h-full object-cover rounded"
          />
        </div>

        <div
          className="md:w-[60%] w-full flex flex-col gap-4 p-4"
          ref={leftSideRef}
        >
          <div>
            <h1 className="text-3xl font-bold text-defined-brown">
              About <span className="text-defined-green">Ubique Pharma</span>
            </h1>
            <p className="text-justify mt-4">
              Ubique Pharma Pvt. Ltd. is a rapidly growing pharmaceutical
              company engaged in a diverse range of businesses, including the
              marketing, export, and supply of pharmaceutical products,
              nutraceutical supplements, and third-party manufacturing services
              both domestically and internationally. We are committed to
              providing products of the highest quality and efficacy, sourced
              from facilities certified by WHO, GMP, ISO 9001:2015 and ISO
              22000:2018 certification. These facilities are operated by a
              highly skilled and knowledgeable team dedicated to adhering to
              rigorous quality systems, ensuring the delivery of world-class
              products that meet global standards. Our commitment to excellence
              extends beyond manufacturing, as we continuously strive to meet
              the evolving needs of the healthcare industry. We prioritize
              innovation, sustainability, and customer satisfaction, making sure
              our products are not only effective but also safe for all users.
              With a strong focus on research and development, we aim to
              introduce new and advanced solutions that enhance well-being
              worldwide. Ubique Pharma Pvt. Ltd. is poised to continue expanding
              its global footprint, building long-term partnerships, and
              contributing to the global healthcare landscape through quality
              and innovation.
            </p>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-defined-brown">Mission and Vision</h1>
            <p className="text-justify mt-4">
              Our vision is to be a leading global pharmaceutical company,
              recognized for our commitment to excellence in product quality,
              innovation, and customer satisfaction. We aspire to create a
              healthier world by offering cutting-edge healthcare solutions,
              expanding access to essential medicines, and fostering sustainable
              growth in the pharmaceutical industry. We aim to build strong,
              long-lasting partnerships and make a meaningful impact on global
              health. Our mission is to enhance global health by providing
              high-quality, affordable pharmaceutical products and nutraceutical
              supplements. We aim to deliver safe, effective, and innovative
              healthcare solutions that improve the well-being of individuals
              worldwide. Through continuous research, development, and
              collaboration, we strive to meet the evolving needs of our
              customers while maintaining the highest standards of quality and
              integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection