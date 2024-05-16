import React, { useState } from "react";
import { Plus, X } from "react-feather";

export default function AddList(props) {
  const [show, setShow] = useState(false);
  const [list, setList] = useState('');

  const savelist = () => {
    if (!list) {
      return;
    } 
    props.getList(list);
    setList("");
    setShow(!show);
  };

  const close=()=>{
    setList('');
    setShow(!show);
  }

  return (
    <div className="">
      <div className="flex flex-col h-fit flex-shrink-0 mr-3 w-60 bg-gray-300 bg-opacity-40 hover:bg-gray-400 rounded-md p-1 ">
        {show && (
          <div>
            <textarea
            value={list}
            onChange={(e)=>setList(e.target.value)}
              className="p-1 w-full rounded-lg border-2 bg-gray-100 text-black"
              placeholder="Enter a title for this list..."
              cols="30"
              rows="2"
            ></textarea>

            <div className="flex p-1">
              <div className="flex gap-x-2">
                <button
                  onClick={() => savelist()}
                  className="text-white px-2 py-1 rounded items-center hover:bg-blue-700 bg-blue-600"
                >
                  Add list
                </button>
                <button
                  onClick={() => close()}
                  className="hover:bg-gray-400 text-black rounded p-2"
                >
                  <X size={18}></X>
                </button>
              </div>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className="flex items-center gap-x-2 hover:bg-gray-400 p-1 rounded w-full h-8 text-black cursor-pointer "
          >
            <Plus size={18}></Plus>
            Add a list
          </button>
        )}
      </div>
    </div>
  );
}
