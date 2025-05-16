import axios from "axios";
import { useState } from "react";

const Toggle = ({ id, isActive }) => {
    const [toggle, setToggle] = useState(isActive);
  const handleToggle = async () => {
    try {
      const newStatus = !toggle;
      setToggle(newStatus);

      await axios.patch("/api/slider", {
        id,
        active: newStatus,
      });

    } catch (error) {
      console.error("Error updating slider status:", error);
      alert("Failed to update slider status.");
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

export default Toggle;
