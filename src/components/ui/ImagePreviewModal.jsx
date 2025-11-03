"use client";
import { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const ImagePreviewModal = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* Image Grid */}
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-30 right-2 bg-white/80 text-black rounded-full p-2 shadow-md hover:bg-white transition z-50"
          >
            <IoClose size={26} />
          </button>

          {/* Image Container */}
          <div className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Full preview"
              width={1200}
              height={1200}
              className="rounded-xl w-auto h-auto max-w-[90vw] max-h-[75vh] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewModal;
