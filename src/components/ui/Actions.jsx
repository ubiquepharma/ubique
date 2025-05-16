import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Actions = ({ seteditingId, entityId, setModal, setdeleteId }) => {
  return (
    <div className="flex items-center gap-2">
      <MdDeleteForever
        size={20}
        className="text-red-500 cursor-pointer"
        onClick={() => {
          setModal(true);
          setdeleteId(entityId);
        }}
      />
    </div>
  );
};

export default Actions;
