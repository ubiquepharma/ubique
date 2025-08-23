import Banner from "@/components/global/Banner";
import MainTemplate from "@/templates/MainTemplate";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const metaData = {
    title: "Gallery | Ubique Pharma | Leading Pharmaceutical Company in India",
    description:
      "Ubique Pharma is a trusted pharmaceutical company in India, committed to delivering high-quality medicines and healthcare solutions. Explore our wide range of innovative and affordable pharmaceutical products for a healthier future.",
    keywords: "about, company, values, team",
  };

  if (id === "ads" || id === "events") {
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

const renderPageNumbers = (pagination) => {
  let pages = [];
  let startPage = Math.max(1, pagination.currentPage - 2);
  let endPage = Math.min(pagination.totalPages, pagination.currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages.map((pageNumber) => (
    <Link
      key={pageNumber}
      href={`/our-products?page=${pageNumber}`}
      className={`px-4 py-2 mx-1 rounded ${
        pageNumber === pagination.currentPage
          ? "bg-defined-blue text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {pageNumber}
    </Link>
  ));
};

export default async function GalleryPage({ params }) {
  const { id } = await params;
  const { images, pageData } = await getData(id);

  return (
    <MainTemplate>
      <Banner />
      {pageData.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-4xl font-bold text-defined-brown">
            Coming Soon...
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          {images.map((item) => (
            <Image
              key={item._id}
              src={item.image.secure_url}
              alt={id}
              width={500}
              height={500}
              className="rounded-xs aspect-square object-cover"
            />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center my-4">
        <Link
          href={`/our-products?page=${pageData.currentPage - 1}`}
          className={`px-4 py-2 mx-1 rounded text-defined-blue font-medium ${
            pageData.currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Prev
        </Link>

        {renderPageNumbers(pageData)}

        <Link
          href={`/our-products?page=${pageData.currentPage + 1}`}
          className={`px-4 py-2 mx-1 rounded text-defined-blue font-medium ${
            pageData.currentPage === pageData.totalPages
              ? "pointer-events-none opacity-50"
              : ""
          }`}
        >
          Next
        </Link>
      </div>
    </MainTemplate>
  );
}

async function getData(type) {
  const url =
    type === "ads"
      ? `${process.env.API_URL}/visual-aid`
      : `${process.env.API_URL}/events`;
  try {
    const resp = await axios.get(url);

    const data = resp.data.data;
    const pageData = resp.data.pagination;
    return { images: data, pageData };
  } catch (error) {
    console.log(error);
    return [];
  }
}
