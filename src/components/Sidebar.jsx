import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";

const Sidebar = () => {
  const blankBoard = {
    name: "",
    bgcolor: "#FFFFFF",
    list: [],
  };

  const [collapsed, setCollapsed] = useState(false);
  const [showpop, setShowpop] = useState(false);
  const [boardData, setBoarddata] = useState(blankBoard);

  return (
    <div
      className={`bg-gray-800 h-[calc(100vh-3rem)] border-r-[#d6486c29] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[45px]" : "w-[280px]"
      }`}
    >
      {collapsed && (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm"
          >
            <ChevronRight size={18}></ChevronRight>
          </button>
        </div>
      )}
      {!collapsed && (
        <div>
          <div className="workspace p-4 flex justify-between border-b border-b-[#7e2d3829] text-white">
            <h4>Trello's Workspace</h4>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm p-1"
            >
              <ChevronLeft size={18}></ChevronLeft>
            </button>
          </div>
          <div className="boardlist">
            <div className="flex justify-between px-3 py-3 text-white">
              <h6>Your Boards</h6>
              <Popover
                isOpen={showpop}
                positions={["right", "top", "bottom", "left"]} // preferred positions by priority
                content={
                  <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-gray-500 text-white rounded">
                    <button
                      onClick={() => setShowpop(!showpop)}
                      className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded"
                    >
                      <X size={16}></X>
                    </button>
                    <h4 className="py-3">Create Board</h4>
                    <img src="https://placehold.co/200x120/png" alt="" />
                    <div className="mt-3 flex flex-col items-start w-full">
                      <label htmlFor="title">
                        Board Title <span>*</span>
                      </label>
                      <input
                        value={boardData.name}
                        onChange={(e) =>
                          setBoarddata({ ...boardData, name: e.target.value })
                        }
                        type="text"
                        className="mb-2 h-8 px-2 w-full bg-gray-400 rounded-sm"
                      />
                      <label htmlFor="Color">Board Color</label>
                      <input
                        value={boardData.bgcolor}
                        onChange={(e) =>
                          setBoarddata({
                            ...boardData,
                            bgcolor: e.target.value,
                          })
                        }
                        type="color"
                        className="mb-2 h-8 px-2 w-full bg-gray-400 rounded-sm"
                      />
                      <button
                        onClick={() => {}}
                        className="w-full rounded h-8 bg-blue-700 mt-2 hover:bg-blue-600"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={() => setShowpop(!showpop)}
                  className="hover:bg-slate-600 p-1 rounded-sm"
                >
                  <Plus size={16}></Plus>
                </button>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
