import axios from "axios";
import { useEffect, useState } from "react";
import Actions from "../ui/Actions";
import { IoIosCloseCircleOutline } from "react-icons/io";

const CategoryComponent = ({ heading }) => {
  const [editingId, seteditingId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [categorys, setCategories] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modal]);

  const handleEdit = async (id, category) => {
    try {
      await axios.patch(`/api/category`, { id, category });
      seteditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/category", { data: { id } });

      setdeleteId(null);
      setModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/category", formData);

      if (!res.data.success) {
        alert("Failed to add category. Category must be unique");
      }
      setLoading(false);
      setFormData("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

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
              name="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder={`Enter ${heading}`}
              className="w-[80%] p-3 outline-none bg-white rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-defined-blue text-white shadow-lg p-3 rounded w-[20%] cursor-pointer"
            >
              {loading ? "Adding..." : `Add ${heading}`}
            </button>
          </div>
        </form>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right ">
          <thead class="text-base text-white uppercase bg-defined-blue  ">
            <tr>
              <th scope="col" class="px-6 py-4">
                {heading} name
              </th>
              <th scope="col" class="px-6 py-4 ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categorys?.map((category) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-[#cccccc] ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {editingId === category.id ? (
                    <div className="w-[80%] flex items-center gap-2">
                      <input
                        type="text"
                        name="category"
                        required
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        defaultValue={category.category}
                        placeholder="Category Name"
                        className="w-[80%] p-3 outline-none text-black bg-white rounded"
                      />
                      <button
                        className="bg-defined-green  shadow-lg p-3 rounded w-[20%] cursor-pointer"
                        onClick={() =>
                          handleEdit(category.id, formData.category)
                        }
                      >
                        Submit
                      </button>
                      <IoIosCloseCircleOutline
                        size={30}
                        className="cursor-pointer text-red-500"
                        onClick={() => seteditingId(null)}
                      />
                    </div>
                  ) : (
                    <span>{category.category}</span>
                  )}
                </th>
                <td class="px-6 py-4">
                  <Actions
                    seteditingId={seteditingId}
                    entityId={category.id}
                    setdeleteId={setdeleteId}
                    setModal={setModal}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              <span>Delte id: {deleteId}</span>
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

export default CategoryComponent;
