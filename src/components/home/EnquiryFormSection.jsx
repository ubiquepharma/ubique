import Image from "next/image"
import EnquiryFormCard from "../cards/EnquiryFormCard";
const EnquiryFormSection = () => {
  return (
    <section>
      <div className="flex gap-4 flex-col md:flex-row p-8">
        <div className="w-full h-auto md:w-1/2 ">
          <Image
            src={"/images/enq-img.png"}
            alt="enq-img"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded"
          />
        </div>

        <EnquiryFormCard />
      </div>
    </section>
  );
}

export default EnquiryFormSection