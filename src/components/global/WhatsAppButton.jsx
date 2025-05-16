import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
export default function WhatsAppButton() {
  return (
    <Link
      className="fixed bottom-14 right-8 z-[1100]"
      href="https://wa.me/918617501527"
      target="_blank"
      referrerPolicy="no-referrer"
    >
      <div className="group flex items-center">
        <div className="bg-defined-green text-white w-[3rem] h-[3rem] flex items-center rounded-full shadow-lg cursor-pointer overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[10rem]">
          <IoLogoWhatsapp size={30} className="ml-2 flex-shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity duration-300 whitespace-nowrap">
            WhatsApp
          </span>
        </div>
      </div>
    </Link>
  );
}
