import axios from "axios";
import { useState } from "react";

const TogglePopup = ({ id, isActive, gallery }) => {
  const [toggle, setToggle] = useState(isActive);
  const handleToggle = async () => {
    try {
      const newStatus = !toggle;
      setToggle(newStatus);

      if (gallery === "Visual Aid") {
        await axios.patch("/api/visual-aid", {
          id,
          active: newStatus,
        });
      }else{
        await axios.patch("/api/events", {
          id,
          active: newStatus,
        });
      }
    } catch (error) {
      console.error("Error updating popup status:", error);
      alert("Failed to update popup status.");
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer relative">
      <input
        checked={toggle}
        onChange={handleToggle}
        type="checkbox"
        className="sr-only peer"
      />

      <div
        className={`relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full ${
          toggle ? "peer-checked:bg-blue-600" : "dark:bg-gray-700 "
        } transition-all`}
      ></div>
      <div
        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-all ${
          toggle
            ? "peer-checked:translate-x-full"
            : "rtl:peer-checked:-translate-x-full"
        } `}
      ></div>
    </label>
  );
};

export default TogglePopup;
