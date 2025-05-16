"use client";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import Link from "next/link";
import Toggle from "@/components/ui/Toggle";
import Bulk from "@/components/ui/Bulk";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js

// Dynamically import NewProductForm to only render on the client side
const NewProductForm = dynamic(
  () => import("@/components/admin/NewProductForm"),
  { ssr: false }
);
import axios from "axios";
import Loader from "@/components/ui/Loader";
import LogoutButton from "@/components/LogoutButton";

const ProductsPage = ({ showSection }) => {
  const thead = [
    "Brand Name",
    "Category",
    "Composition",
    "MRP",
    "MOQ",
    "Business Type",
    "Application Type",
    "Packing Size",
    "Action",
    "Bulk Action",
  ];

  const [products, setProducts] = useState([]);
  const [categorys, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [item, setitem] = useState({});
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const info = [
    { name: "Total Products", value: products.length },
    { name: "Total Categories", value: categorys.length },
  ];
  const fetchProducts = async (
    selectedCategory = "",
    page = 1,
    searchTerm = ""
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/product?category=${selectedCategory}&page=${page}&limit=10&search=${searchTerm}`
      );
      setProducts(response.data.data);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        totalProducts: response.data.pagination.totalProducts,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    fetchProducts(selectedCategory);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchProducts(selectedCategory, 1, value);
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modal]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      const data = response.data.data;
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [modal]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchProducts(selectedCategory, page);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    let startPage = Math.max(1, pagination.currentPage - 2);
    let endPage = Math.min(pagination.totalPages, pagination.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages.map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`px-4 py-2 mx-1 rounded ${
          pageNumber === pagination.currentPage
            ? "bg-defined-blue text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {pageNumber}
      </button>
    ));
  };

  const handleEditClick = (product) => {
    setEdit(true);
    setModal(true);
    setitem(product);
  };

  // Handle Delete button click
  const handleDeleteClick = async (product) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmation) {
        const response = await axios.delete(
          `/api/product/${product.productId}`
        );

        if (response.data.success) {
          alert("Product deleted successfully!");
          fetchProducts();
        } else {
          alert("Error deleting product!");
        }
      }
    } catch (error) {
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col gap-4 relative">
      {/* Top Section */}
      <div className="flex justify-between items-center p-4">
        <select
          name="category"
          className="p-2 rounded bg-white"
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categorys.map((item) => (
            <option key={item.id} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>

        <div className="flex justify-around items-center gap-4">
          <input
            type="text"
            placeholder="Search by Brand & compotition"
            className="p-2 rounded text-sm bg-white outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <button
            className="bg-green-500 text-white p-2 rounded flex items-center gap-1 justify-center cursor-pointer"
            onClick={() => setModal(true)}
          >
            <IoIosAddCircleOutline className="text-xl font-bold" />
            Add New
          </button>
          <LogoutButton />
        </div>
      </div>
      <hr />

      {showSection && (
        <div className="flex gap-2 p-4 w-full">
          <div className="flex gap-2 w-1/2">
            {info.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 p-6 shadow-lg bg-white rounded-lg w-1/2 h-auto"
              >
                <h1 className="text-3xl font-bold text-center text-gray-700 w-[80%]">
                  {item.name}
                </h1>
                <p className="text-4xl font-bold text-green-600">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 w-1/2">
            <div
              className="flex flex-col items-center gap-1 p-6 shadow-lg bg-white rounded-lg w-1/2 h-auto cursor-pointer"
              onClick={() => setModal(true)}
            >
              <h1 className="text-3xl font-bold text-center text-gray-700 w-[80%]">
                Add Product
              </h1>
              <p className="text-4xl font-bold text-green-600">
                <IoIosAddCircleOutline />
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 p-6 shadow-lg bg-white rounded-lg w-1/2 h-auto">
              <Link
                href="/products/manage"
                className="flex flex-col gap-2 items-center justify-center"
              >
                <h1 className="text-3xl font-bold text-gray-700 text-center w-[80%]">
                  Manage Product
                </h1>
                <p className="text-4xl font-bold text-green-600">
                  <MdProductionQuantityLimits />
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className=" overflow-x-auto w-full">
        <table className="w-full text-left">
          <thead className="text-sm font-bold text-white bg-defined-blue">
            <tr>
              {thead.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <div className=" !w-full">
              <Loader />
            </div>
          ) : (
            <tbody>
              {products
                ?.filter((product) => {
                  const brandMatch = product.brand
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  const compositionMatch = product.composition
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  const categoryMatch = product.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  return brandMatch || compositionMatch || categoryMatch;
                })
                ?.map((item) => (
                  <tr
                    key={item.productId}
                    className="bg-defined-white border-b border-[#cccccc] last:border-transparent"
                  >
                    <th scope="row" className="px-6 py-4 font-semibold">
                      {item.brand}
                    </th>
                    <td className="px-6 py-4 font-medium">{item.category}</td>
                    <td className="px-6 py-4 font-medium">
                      <div className="line-clamp-2  font-medium">
                        {item.composition}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{item.mrp}</td>
                    <td className="px-6 py-4 font-medium">{item.moq}</td>
                    <td className="px-6 py-4 font-medium">
                      {item?.businessType}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {item?.applicationType}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {item.packagingsize}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <Toggle id={item.productId} isActive={item.active} />
                    </td>
                    <td className="px-6 py-4">
                      <Bulk
                        handleEditClick={() => handleEditClick(item)}
                        handleDeleteClick={() => handleDeleteClick(item)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        {products?.length === 0 && !loading && (
          <p className="py-4 text-center font-semibold text-lg text-red-500">
            No Products found. Add One!
          </p>
        )}
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-4 py-2 mx-1 rounded text-defined-blue font-medium"
        >
          Prev
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-4 py-2 mx-1 rounded  text-defined-blue font-medium"
        >
          Next
        </button>
      </div>

      {/* Main Modal */}
      {modal && isClient && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          onClick={() => {
            setModal(false);
            setEdit(false);
            setView(false);
          }}
        >
          <div
            className="bg-gray-300 p-6 rounded shadow-lg w-full max-w-[50%] relative h-[70vh] overflow-hidden overflow-y-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-2 top-1 cursor-pointer">
              <IoIosCloseCircleOutline
                size={35}
                className="text-red-500 font-medium"
                onClick={() => {
                  setModal(false);
                  setEdit(false);
                  setView(false);
                }}
              />
            </div>
            <NewProductForm
              item={item}
              edit={edit}
              view={view}
              setModal={setModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
