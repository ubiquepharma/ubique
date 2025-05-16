

import axios from "axios";
import ProductCategorySection from "../components/home/ProductCategorySection";
import AboutSection from "../components/home/AboutSection";
import ProductSection from "../components/home/ProductSection";
import EnquiryFormSection from "../components/home/EnquiryFormSection";
import HomeSlider from "@/components/home/HomeSlider";
import MainTemplate from "@/templates/MainTemplate";

export const metadata = {
  title:
    "Home | Ubique Pharma | Leading Pharmaceutical Company in India | Quality Medicines & Healthcare",
  description:
    "Ubique Pharma is a trusted pharmaceutical company in India, committed to delivering high-quality medicines and healthcare solutions. Explore our wide range of innovative and affordable pharmaceutical products for a healthier future.",
};
export default async function Home() {
  const { products, sliders } = await getData();

  return (
    <MainTemplate>
      <HomeSlider sliders={sliders} />
      <ProductCategorySection products={products} />
      <AboutSection />
      <ProductSection products={products} />
      <EnquiryFormSection />
    </MainTemplate>
  );
}

async function getData() {
  try {
    const [productResponse, sliderResponse] = await Promise.all([
      axios.get(`${process.env.API_URL}/product`),
      axios.get(`${process.env.API_URL}/slider?limit=5`),
    ]);

    const products = productResponse.data.data;
    const sliders = sliderResponse.data.data;
    return { products, sliders };
  } catch (error) {
    console.log(error);
    return [];
  }
}
