export const dynamic = "force-dynamic";

import Banner from "@/components/global/Banner";
import ProductPageSection from "@/components/products/ProductPageSection";
import MainTemplate from "@/templates/MainTemplate";
import axios from "axios";
import Link from "next/link";

export const metadata = {
  title: "Products | Ubique Pharma | Leading Pharmaceutical Company in India",
  description:
    "Ubique Pharma is a trusted pharmaceutical company in India, committed to delivering high-quality medicines and healthcare solutions. Explore our wide range of innovative and affordable pharmaceutical products for a healthier future.",
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

export default async function Products({ searchParams }) {
  const page = (await searchParams).page || 1;
  const { products, pageData } = await getData(page);

  return (
    <MainTemplate>
      <Banner />
      <ProductPageSection products={products} />
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

async function getData(page = 1) {
  try {
    const res = await axios.get(`${process.env.API_URL}/category`);

    const category = res.data.data;
    const categories = category.map((cat) => cat.category);
    const res1 = await axios.get(`${process.env.API_URL}/product?page=${page}`);
    const pageData = res1.data.pagination;
    async function getProducts() {
      const result = {};

      for (const cat of categories) {
        const response = await axios.get(
          `${process.env.API_URL}/product?category=${cat}&limit=6`
        );

        result[cat] = response.data.data;
      }

      return result;
    }

    const data = await getProducts();
    return {
      products: data,
      pageData,
    };
  } catch (error) {
    console.log(error);
    return [];
  }
}
