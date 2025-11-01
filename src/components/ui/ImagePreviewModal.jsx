"use client";
import { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const ImagePreviewModal = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {images.map((item) => (
          <div
            key={item._id}
            className="cursor-pointer group relative overflow-hidden rounded-md"
            onClick={() => setSelectedImage(item.image.secure_url)}
          >
            <Image
              src={item.image.secure_url}
              alt="preview"
              width={500}
              height={500}
              className="rounded-md aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-200 transition"
            >
              <IoClose size={22} />
            </button>
            <Image
              src={selectedImage}
              alt="Selected preview"
              width={1000}
              height={1000}
              className="rounded-lg w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewModal;
