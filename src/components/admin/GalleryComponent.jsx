import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import Actions from "../ui/Actions";
import axios from "axios";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";

const PopupComponent = () => {
  const thead = ["Name", "Image", "Actions"];

  const [formData, setFormData] = useState({});
  const [aids, setAids] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState("Visual Aid");

  const [editingId, seteditingId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [modal, setModal] = useState(false);

  const [tableLoading, setTableLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      let res = null;

      if (gallery === "Visual Aid") {
        res = await axios.post("/api/visual-aid", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post("/api/events", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (!res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);

        if (gallery === "Visual Aid") {
          fetchAids();
        } else {
          fetchEvents();
        }
        setFormData({});
        e.target.reset();
      }
    } catch (error) {
      console.error("Error adding entry:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const fetchAids = async (page = pagination.currentPage) => {
    try {
      setTableLoading(true);
      const res = await axios.get(`/api/visual-aid?page=${page}&limit=10`);
      const data = res.data.data;
      setAids(data);
      setTableLoading(false);
      setPagination({
        currentPage: res.data.pagination.currentPage,
        totalPages: res.data.pagination.totalPages,
        totalProducts: res.data.pagination.totalProducts,
      });
    } catch (error) {
      console.error("Error fetching Visual Aids:", error);
      setTableLoading(false);
    }
  };

  const fetchEvents = async (page = pagination.currentPage) => {
    try {
      setTableLoading(true);
      const res = await axios.get(`/api/events?page=${page}&limit=10`);
      const data = res.data.data;
      setEvents(data);
      setTableLoading(false);
      setPagination({
        currentPage: res.data.pagination.currentPage,
        totalPages: res.data.pagination.totalPages,
        totalProducts: res.data.pagination.totalProducts,
      });
    } catch (error) {
      console.error("Error fetching Events:", error);
      setTableLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
      if (gallery === "Visual Aid") {
        fetchAids(page);
      } else {
        fetchEvents(page);
      }
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

  const handleDelete = async (id) => {
    try {
      let res = null;

      if (gallery === "Visual Aid") {
        res = await axios.delete("/api/visual-aid", { data: { id } });
      } else {
        res = await axios.delete("/api/events", { data: { id } });
      }

      alert(res.data.message);
      setdeleteId(null);
      setModal(false);

      if (gallery === "Visual Aid") {
        fetchAids();
      } else {
        fetchEvents();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (gallery === "Visual Aid") {
      fetchAids();
    } else {
      fetchEvents();
    }
  }, [gallery]);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          {"Add "}
          {gallery}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              name="galleryName"
              required
              onChange={(e) =>
                setFormData({ ...formData, galleryName: e.target.value })
              }
              placeholder={`${gallery} Name`}
              className="w-[25%] p-3 outline-none bg-white rounded"
            />
            <select
              name="gallery"
              id=""
              className="w-[25%] p-3 outline-none bg-white rounded"
              onChange={(e) => setGallery(e.target.value)}
            >
              <option value="Visual Aid" selected>
                Visual Aid
              </option>
              <option value="Events">Events</option>
            </select>
            <input
              type="file"
              name="image"
              required
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-[25%] p-3 outline-none bg-white rounded"
            />
            <button
              type="submit"
              disabled={btnLoading}
              className="bg-defined-blue text-white text-lg shadow-lg p-3 rounded w-[25%] cursor-pointer"
            >
              {btnLoading ? "Adding..." : `Add ${gallery}`}
            </button>
          </div>
        </form>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left">
          <thead className="font-bold text-white bg-defined-blue">
            <tr>
              {thead.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {gallery} {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {(gallery === "Visual Aid" ? aids : events)?.map((item) => (
              <tr
                key={item.id}
                className="bg-defined-white border-b border-[#cccccc]  last:border-transparent"
              >
                <th scope="row" className="px-6 py-4 font-semibold">
                  {editingId === item._id ? (
                    <input
                      type="text"
                      name={gallery === "Visual Aid" ? "visualAid" : "event"}
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [gallery === "Visual Aid" ? "visualAid" : "event"]:
                            e.target.value,
                        })
                      }
                      defaultValue={
                        gallery === "Visual Aid" ? item.visualAid : item.event
                      }
                      placeholder="Name"
                      className="w-full p-3 outline-none bg-white rounded"
                    />
                  ) : gallery === "Visual Aid" ? (
                    item.visualAid
                  ) : (
                    item.event
                  )}
                </th>
                <td className="px-6 py-4 font-medium">
                  {editingId === item._id ? (
                    <div className="flex gap-4">
                      <input
                        type="file"
                        name="image"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            image: e.target.files[0],
                          })
                        }
                        className="w-full p-3 outline-none bg-white rounded"
                      />

                      <IoIosCloseCircleOutline
                        size={30}
                        className="cursor-pointer text-red-500"
                        onClick={() => seteditingId(null)}
                      />
                    </div>
                  ) : (
                    <Image
                      src={item.image.secure_url}
                      alt={
                        gallery === "Visual Aid"
                          ? "visualAid image"
                          : "event image"
                      }
                      width={100}
                      height={100}
                      className="w-[10rem] h-auto object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <Actions
                    seteditingId={seteditingId}
                    entityId={item._id}
                    setdeleteId={setdeleteId}
                    setModal={setModal}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tableLoading && <Loader />}
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

      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-10 z-50"
          onClick={() => {
            setModal(false);
          }}
        >
          <div
            className="bg-gray-300 p-6 rounded shadow-lg w-full h-auto max-w-[50%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-2 top-1 cursor-pointer">
              <IoIosCloseCircleOutline
                size={35}
                className="text-red-500 font-medium"
                onClick={() => setModal(false)}
              />
            </div>
            <div className="w-full h-auto flex flex-col gap-6">
              <h1 className="text-center font-medium text-xl">
                Are you sure you want to delete this item?
              </h1>

              <div className="w-full flex items-center justify-center gap-4 h-auto">
                <button
                  className="bg-defined-green text-white p-2 rounded shadow-md text-xl"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded shadow-md text-xl"
                  onClick={() => handleDelete(deleteId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
