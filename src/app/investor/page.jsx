import Banner from "@/components/global/Banner";
import InvestorPage from "@/components/InvestorPage";
import MainTemplate from "@/templates/MainTemplate";

export const metadata = {
  title: "Investor | Ubique Pharma | Leading Pharmaceutical Company in India",
  description:
    "Ubique Pharma is a trusted pharmaceutical company in India, committed to delivering high-quality medicines and healthcare solutions. Explore our wide range of innovative and affordable pharmaceutical products for a healthier future.",
};

export default function Investor() {
  return (
    <MainTemplate>
      <Banner />
      <InvestorPage />
    </MainTemplate>
  );
}
