import React, { useState } from "react";
import Loader from "../ui/Loader";
import Bulk from "../ui/Bulk";

const ProductTable = () => {
  const [loading, setLoading] = useState(false);
  const [item, setitem] = useState({});
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const thead = [
    "Brand Name",
    "Category",
    "Molecule & Strength",
    "MRP",
    "PTR",
    "PTS",
    "Packing Size",
    "Action",
    "Bulk Action",
  ];

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("/api/product", { data: { id } });
      alert(res.data.message);
      setDeleteModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="relative overflow-x-auto">
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
        <tbody>
          {products
            ?.filter((product) => {
              const brandMatch = product.brand
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

              // const moleculeMatch = product.moleculeAndStrength.some(
              //   ({ molecule, strength }) =>
              //     (molecule + " " + strength)
              //       .toLowerCase()
              //       .includes(searchTerm.toLowerCase())
              // );

              return brandMatch;
            })
            ?.map((item) => (
              <tr
                key={item.id}
                className="bg-defined-white border-b border-[#cccccc] last:border-transparent"
              >
                <th scope="row" className="px-6 py-4 font-semibold">
                  {item.brand}
                </th>
                <td className="px-6 py-4 font-medium">{item.category}</td>
                <td className="px-6 py-4 font-medium">
                  <div className="line-clamp-2">
                    {item.moleculeAndStrength?.map((item, index) => (
                      <span key={index}>
                        {item.molecule.concat(" ", item.strength)},
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{item.mrp}</td>
                <td className="px-6 py-4 font-medium">{item.ptr}</td>
                <td className="px-6 py-4 font-medium">{item.pts}</td>
                <td className="px-6 py-4 font-medium">{item.packagingsize}</td>
                <td className="px-6 py-4 font-medium">
                  <Toggle id={item.id} isActive={item.active} />
                </td>
                <td className="px-6 py-4">
                  <Bulk
                    setModal={setModal}
                    setEdit={setEdit}
                    setView={setView}
                    setDeleteModal={setDeleteModal}
                    item={item}
                    setitem={setitem}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {products?.length === 0 && !loading && (
        <p className="py-4 text-center font-semibold text-lg text-red-500">
          No Products found. Add One!
        </p>
      )}
      {loading && <Loader />}

      {/* Delete Modal */}
      {deleteModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setDeleteModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center font-medium text-xl">
              Are you sure you want to delete this item?
            </h1>
            <div className="w-full flex items-center justify-center gap-4 mt-4">
              <button
                className="bg-defined-green text-white p-2 rounded shadow-md text-xl"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded shadow-md text-xl cursor-pointer"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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

export default ProductTable;
