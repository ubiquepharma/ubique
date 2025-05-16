import Banner from "@/components/global/Banner";
import TrackOrderSection from "@/components/mfg-facility/TrackOrderSection";
import MfgServiceSection from "@/components/MfgServiceSection";
import MainTemplate from "@/templates/MainTemplate";

export const generateMetadata = async ({ params }) => {
  const { facility } = await params;
  const metaData = {
    title:
      "Mfg. Facility | Ubique Pharma | Leading Pharmaceutical Company in India",
    description:
      "Ubique Pharma is a trusted pharmaceutical company in India, committed to delivering high-quality medicines and healthcare solutions. Explore our wide range of innovative and affordable pharmaceutical products for a healthier future.",
    keywords: "about, company, values, team",
  };

  if (
    facility === "product-approval" ||
    facility === "manufacturing-service" ||
    facility === "track-order"
  ) {
    return {
      ...metaData,
    };
  }
  return {
    title: metaData.title,
    description: metaData.description,
    keywords: metaData.keywords,
  };
};
export default async function FacilityPage({ params }) {
  const { facility } = await params;
  return (
    <MainTemplate>
      <Banner />
      {facility === "product-approval" && (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-4xl font-bold text-defined-brown">
            Coming Soon...
          </h1>
        </div>
      )}
      {facility === "manufacturing-service" && <MfgServiceSection />}
      {facility !== "product-approval" &&
        facility !== "manufacturing-service" && <TrackOrderSection />}
    </MainTemplate>
  );
}
