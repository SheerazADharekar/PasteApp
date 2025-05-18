import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import { FaRegCalendar } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    // console.log(pasteId);
  };

  let handleShare = (pasteId) => {
    const url = `${window.location.origin}/?pasteId=${pasteId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Paste link copied to clipboard!"))
      .catch(() => toast.success("Failed to copy link."));
  };
  return (
    <div>
      <input
        className="p-2 rounded-md min-w-[813px] mt-5 bg-white border border-gray-400 text-black"
        type="search"
        placeholder="Search Here...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col mt-5 border rounded bg-slate-400">
        <h1 className="text-black text-5xl p-2">All Pastes</h1>
        {filteredData.length > 0 ?
          filteredData.map((paste) => {
            return (
              <div className="border pb-5" key={paste?._id}>
                <div className="p-2 text-4xl">{paste.title}</div>
                <div className="pb-6">{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button class>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      <GrEdit />
                    </NavLink>
                  </button>
                  <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                      <FaEye />
                    </NavLink>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    <RiDeleteBin6Line />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    <FaRegCopy />
                  </button>
                  <button onClick={() => handleShare(paste._id)}>
                    <PiShareFat />
                  </button>
                </div>
                <div>
                  <div className="relative top-5 left-72">
                    <FaRegCalendar />
                  </div>
                  {new Date(paste.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            );
          }): <div className="text-4xl border text-orange-600 animate-bounce">No Data Found</div>}
      </div>
    </div>
  );
};

export default Paste;
