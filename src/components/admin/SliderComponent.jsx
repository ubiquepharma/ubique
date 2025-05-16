import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import Actions from "../ui/Actions";
import ToggleSlider from "../ui/ToggleSlider";
import axios from "axios";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SliderComponent = ({ heading }) => {
  const thead = ["Name", "Image", "Actions", "Active"];

  const [editingId, seteditingId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [sliders, setSliders] = useState([]);

  const [tableLoading, setTableLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const res = await axios.post("/api/slider", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }

      setBtnLoading(false);
      setFormData({});
      fetchSliders();
    } catch (error) {
      console.error("Error adding Slider:", error);
      setBtnLoading(false);
    }
  };

  const fetchSliders = async () => {
    try {
      setTableLoading(true);
      const res = await axios.get("/api/slider");
      const data = res.data.data;
      setSliders(data);
      setTableLoading(false);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      setTableLoading(false);
      return [];
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append id explicitly
      formDataToSend.append("id", id);

      const res = await axios.put("/api/slider", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }

      seteditingId(null);
      setFormData({});
      fetchSliders();
    } catch (error) {
      console.error("Error updating slider:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("/api/slider", { data: { id } });
      alert(res.data.message);
      setdeleteId(null);
      setModal(false);
      fetchSliders();
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          {"Add "}
          {heading}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              name="slider"
              required
              onChange={(e) =>
                setFormData({ ...formData, slider: e.target.value })
              }
              placeholder={`${heading} Name`}
              className="w-[80%] p-3 outline-none bg-white rounded"
            />
            <input
              type="file"
              name="image"
              required
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-[80%] p-3 outline-none bg-white rounded"
            />
            <button
              type="submit"
              disabled={btnLoading}
              className="bg-defined-blue text-white shadow-lg p-3 rounded w-[20%] cursor-pointer"
            >
              {btnLoading ? "Adding..." : `Add ${heading}`}
            </button>
          </div>
        </form>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left">
          <thead className="font-bold text-white bg-defined-blue ">
            <tr>
              {thead.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {heading} {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sliders?.map((item) => (
              <tr
                key={item.id}
                className="bg-defined-white border-b border-defined-brown last:border-transparent"
              >
                <th scope="row" className="px-6 py-4 font-semibold">
                  {editingId === item._id ? (
                    <input
                      type="text"
                      name="slider"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, slider: e.target.value })
                      }
                      placeholder={`${heading} Name`}
                      className="w-[80%] p-3 outline-none bg-white rounded"
                    />
                  ) : (
                    item.slider
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
                          setFormData({ ...formData, image: e.target.files[0] })
                        }
                        className="w-[80%] p-3 outline-none bg-white rounded"
                      />
                      <button
                        className="bg-defined-green text-white shadow-lg p-3 rounded"
                        onClick={() => handleEdit(item._id, formData)}
                      >
                        Update
                      </button>
                      <IoIosCloseCircleOutline
                        size={30}
                        className="cursor-pointer text-red-500"
                        onClick={() => seteditingId(null)}
                      />
                    </div>
                  ) : (
                    <Image
                      src={item.image.secure_url}
                      alt="slider image"
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
                <td className="px-6 py-4 font-medium">
                  <ToggleSlider id={item.id} isActive={item.active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tableLoading && <Loader />}
      </div>

      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50"
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

export default SliderComponent;
