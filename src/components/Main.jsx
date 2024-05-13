import React from "react";
import { UserPlus, Zap, TrendingUp, Filter } from "react-feather";

export default function Main() {
  const buttons = [
    { name: "Power-ups", icon: <TrendingUp size={16} className="mr-2" /> },
    { name: "Automation", icon: <Zap size={16} className="mr-2" /> },
    { name: "Filter", icon: <Filter size={16} className="mr-2" /> },
    { name: "Share", icon: <UserPlus size={16} className="mr-2" /> },
  ];

  return (
    <div className="flex flex-col bg-[#ee6eae] w-full">
      <div className="text-white p-3 flex justify-between border border-pink-800 bg-[#af1e66] items-center ">
        <h2 className="text-lg">
          {" "}
          <b>My Trello Board</b>
        </h2>
        <div className="flex">
          {buttons.map((button, index) => (
            <div className="flex items-center justify-center" key={index}>
              <button className="h-8 text-white px-2 py-1 mr-2 rounded flex justify-center items-center hover:bg-pink-500">
                {button.icon}
                {button.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
