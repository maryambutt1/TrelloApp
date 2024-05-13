import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Plus } from "react-feather";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-[#af1e66] h-[calc(100vh-3rem)] border-r-[#d6486c29] transition-all linear duration-500 flex-shrink-0 ${
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
              <button
                onClick={() => {}}
                className="hover:bg-slate-600 p-1 rounded-sm"
              >
                <Plus size={16}></Plus>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
