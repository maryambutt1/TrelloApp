import React from "react";
import { ChevronDown, Trello, User, HelpCircle, Bell } from "react-feather";

export default function Header() {
  return (
    <div className="bg-gray-800 w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-gray-900">
      {" "}
      <div className="left justify-center items-center flex gap-x-2">
        <Trello size={20}></Trello>
        <h3 className="text-white text-lg ">Trello</h3>
        <div className="flex ml-6 mt-1 gap-x-3 ">
          <div className="flex gap-x-2 hover:bg-gray-700 ">
            {" "}
            <h4 className="text-white text-md">Workspaces</h4>
            <ChevronDown size={20}></ChevronDown>
          </div>
          <div className="flex gap-x-2 hover:bg-gray-700">
            <h4 className="text-white text-md">More</h4>
            <ChevronDown size={20}></ChevronDown>
          </div>
        </div>
      </div>
      <div className="flex gap-x-3">
        <div className="center flex items-center ml-auto">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-200 px-3 py-1 rounded-lg text-black"
          />
        </div>
        <div className="right flex items-center space-x-4">
          <HelpCircle size={18} />
          <Bell size={18} />
          <User size={18} />
        </div>
      </div>
    </div>
  );
}
