import React from 'react'
import { useParams,useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipboardCopy } from 'lucide-react';
import toast from 'react-hot-toast';
const ViewPaste = () => {
  const {id} =useParams()
  const allPastes =useSelector((state)=>state.paste.pastes)

  const paste =allPastes.filter((p)=>p._id===id)[0]
  let handleCopy=()=>{
    navigator.clipboard.writeText(paste.content)
    .then(()=>{
      toast.success("Copied to clipboard!")
    })
    .catch((err)=>{
      console.log(err);
      toast.error("Error while copying")
      
    })
  }
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[66%] pl-5 text-black border border-gray-400 bg-white"
          type="text"
          placeholder="Enter Title Here"
          value={paste.title}
          disabled
          // onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update My Paste" : "create My Paste"}
        </button> */}
      </div>
      <div className="relative mt-8 w-fit">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 text-black bg-white border border-gray-400"
          value={paste.content}
          placeholder="Enter Content Here"
          disabled
          // onChange={(e) => setValue(e.target.value)}
          rows={20}
          
        />
        <button 
        onClick={handleCopy}
        className='absolute top-4 right-0.5 bg-gray-400 rounded-lg text-gray-100 p-2  hover:bg-gray-600 transition'
        >
          <ClipboardCopy size={18}/>
        </button>
      </div>
    </div>
  )
}

export default ViewPaste