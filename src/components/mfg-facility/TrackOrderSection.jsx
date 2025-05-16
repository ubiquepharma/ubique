import Image from "next/image";
import Link from "next/link";

const TrackOrderSection = () => {
  const img = [
    { icon: "/mfg/dtd.png", link: "https://www.dtdc.in/trace.asp" },
    { icon: "/mfg/bd.png", link: "https://www.bluedart.com/tracking" },
    { icon: "/mfg/del.png", link: "https://www.delhivery.com" },
    { icon: "/mfg/dhl.jpg", link: "https://www.dhl.com/in-en/home.html" },
    { icon: "/mfg/ecom.jpg", link: "https://www.ecomexpress.in/" },
    { icon: "/mfg/fedex.jpg", link: "https://www.fedex.com/en-in/home.html" },
    { icon: "/mfg/gati.jpg", link: "https://www.allcargogati.com/" },
    { icon: "/mfg/pc.jpg", link: "https://www.tpcindia.com/" },
    { icon: "/mfg/oml.jpg", link: "https://omlogistics.co.in/" },
    {
      icon: "/mfg/indpost.jpg",
      link: "https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx",
    },
    { icon: "/mfg/tci.png", link: "https://tcil.com/" },
    {
      icon: "/mfg/vrl.png",
      link: "https://vrlgroup.in/track_consignment.aspx",
    },
    {
      icon: "/mfg/carcel.jpg",
      link: "https://www.crunchbase.com/organization/carcel",
    },
  ];

  return (
    <section>
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 m-8">
        {img.map((item, index) => (
          <div key={index} className="relative">
            <Image
              src={item.icon}
              alt="mfg-img"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded"
            />
            <Link
              href={item.link}
              target="_blank"
              className="absolute inset-0 w-full h-full bg-black opacity-0 hover:opacity-50 hover:cursor-pointer transition-opacity"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrackOrderSection;
