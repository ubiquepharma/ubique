import { IoEye } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Bulk = ({ handleEditClick, handleDeleteClick }) => {
  return (
    <div className="flex items-center gap-2">
      <FaRegEdit
        size={20}
        onClick={handleEditClick}
        className="text-defined-green cursor-pointer"
      />
      <MdDeleteForever
        size={20}
        onClick={handleDeleteClick}
        className="text-red-500 cursor-pointer"
      />
    </div>
  );
};

export default Bulk;
