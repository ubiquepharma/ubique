import AboutUs from "@/components/AboutUs";
import Banner from "@/components/global/Banner";
import MainTemplate from "@/templates/MainTemplate";

export const metadata = {
  title: "About | Ubique Pharma | Leading Pharmaceutical Company in India",
  description:
    "Ubique Pharma is a trusted pharmaceutical company in India, committed to delivering high-quality medicines and healthcare solutions. Explore our wide range of innovative and affordable pharmaceutical products for a healthier future.",
};
export default function About() {
  return (
    <MainTemplate>
      <Banner />
      <AboutUs />
    </MainTemplate>
  );
}
