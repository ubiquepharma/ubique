import axios from "axios";
import { useEffect, useState } from "react";
import Actions from "../ui/Actions";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loader from "../ui/Loader";

const MoleculeComponent = ({heading}) => {
  const [editingId, seteditingId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [molecules, setMolecules] = useState([]);
  const [modal, setModal] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modal]);

  const handleEdit = async (id, molecule) => {
    try {
      await axios.patch(`/api/molecule`, { id, molecule });
      seteditingId(null);
      fetchMolecules();
    } catch (error) {
      console.error("Error updating molecule:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/molecule", { data: { id } });

      setdeleteId(null);
      setModal(false);
      fetchMolecules();
    } catch (error) {
      console.error("Error deleting molecule:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/molecule", formData);

      if (!res.data.success) {
        alert("Failed to add molecule. Molecule must be unique");
      }
      setLoading(false);
      setFormData("");
      fetchMolecules();
    } catch (error) {
      console.error("Error adding molecule:", error);
    }
  };

  const fetchMolecules = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get("/api/molecule");
      const data = response.data.data;
      setMolecules(data);
      setLoadingTable(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMolecules();
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
              name="molecule"
              onChange={(e) =>
                setFormData({ ...formData, molecule: e.target.value })
              }
              placeholder={`Enter ${heading}`}
              className="w-[80%] p-3 outline-none bg-white rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-defined-green text-white shadow-lg p-3 rounded w-[20%] cursor-pointer"
            >
              {loading ? "Adding..." : `Add ${heading}`}
            </button>
          </div>
        </form>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {heading} name
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {molecules?.map((molecule) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {editingId === molecule.id ? (
                    <div className="w-[80%] flex items-center gap-2">
                      <input
                        type="text"
                        name="molecule"
                        onChange={(e) =>
                          setFormData({ ...formData, molecule: e.target.value })
                        }
                        defaultValue={molecule.molecule}
                        placeholder="Molecule Name"
                        className="w-[80%] p-3 outline-none text-black bg-white rounded"
                      />
                      <button
                        className="bg-defined-green  shadow-lg p-3 rounded w-[20%] cursor-pointer"
                        onClick={() =>
                          handleEdit(molecule.id, formData.molecule)
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
                    <span>{molecule.molecule}</span>
                  )}
                </th>
                <td className="px-6 py-4">
                  <Actions
                    seteditingId={seteditingId}
                    entityId={molecule.id}
                    setdeleteId={setdeleteId}
                    setModal={setModal}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loadingTable && <Loader />}
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

export default MoleculeComponent;