  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useSearchParams } from "react-router-dom";
  import { addToPastes, updateToPastes } from "../redux/pasteSlice"
import toast from "react-hot-toast";

  const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");

    const dispatch =useDispatch();
    const allPastes =useSelector((state)=>state.paste.pastes)
    //Edit
      useEffect(() => {
        if (pasteId) {
          const paste =allPastes.find((p)=>p._id ===pasteId)
          setTitle(paste.title)
          setValue(paste.content)
        }
      }, [pasteId])

    let createPaste=()=>{
      if (!title.trim() || !value.trim()) {
    toast.error("Both title and content are required!");
    return;
  }
      const paste={
        title:title,
        content:value,
        _id: pasteId ||
        Date.now().toString(36),
        createdAt:new Date().toISOString()
      }

    
      
      if(pasteId){
        //update
        dispatch(updateToPastes(paste))
      }
      else{
        //create
        dispatch(addToPastes(paste))
      }
      //after creation or updation
      setTitle("");
      setValue("");
      setSearchParams({});
    }
    return (
      <div>
        <div className="flex flex-row gap-7 place-content-between">
          <input
            className="p-2 rounded-md mt-2 w-[66%] pl-5 bg-white border border-gray-400  text-black"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createPaste} className="p-2 rounded-1xl mt-2 text-white bg-blue-700 hover:bg-blue-900">
            {pasteId ? "Update My Paste" : "create My Paste"}
          </button>
        </div>
        <div className="mt-8">
          <textarea
            className="rounded-2xl mt-4 min-w-[500px] p-4 bg-white border border-gray-400 text-black"
            value={value}
            placeholder="Write Your Content Here...."
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          />
        </div>
      </div>
    );
  };

  export default Home;
