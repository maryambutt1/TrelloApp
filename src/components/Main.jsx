import React from "react";
import {
  UserPlus,
  Zap,
  TrendingUp,
  Filter,
  MoreHorizontal,
  Edit2,
} from "react-feather";
import AddCard from "./AddCard";
export default function Main() {
  const buttons = [
    { name: "Power-ups", icon: <TrendingUp size={16} className="mr-2" /> },
    { name: "Automation", icon: <Zap size={16} className="mr-2" /> },
    { name: "Filter", icon: <Filter size={16} className="mr-2" /> },
    { name: "Share", icon: <UserPlus size={16} className="mr-2" /> },
  ];

  return (
    <div className="flex flex-col bg-gray-600 w-full">
      <div className="text-white p-3 flex justify-between border border-gray-900 bg-gray-800 items-center ">
        <h2 className="text-lg">
          {" "}
          <b>My Trello Board</b>
        </h2>
        <div className="flex">
          {buttons.map((button, index) => (
            <div className="flex items-center justify-center" key={index}>
              <button className="h-8 text-white px-2 py-1 mr-2 rounded flex justify-center items-center hover:bg-gray-700">
                {button.icon}
                {button.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden gap-x-3">
          <div className="w-60 h-fit rounded-md p-2 bg-gray-200 flex-shrink-0">
            <div className="list-body">
              <div className="text-black flex justify-between p-1 items-center">
                <span>
                  <b>To do</b>
                </span>
                <button className="hover:bg-gray-400 p-1 rounded-sm">
                  <MoreHorizontal size={16}></MoreHorizontal>
                </button>
              </div>
              <div className="">
                <div className="item text-black flex justify-between items-center bg-gray-100 p-2 rounded-lg cursor-pointer hover:border-2 border-blue-500 ">
                  <span>yayy</span>
                  <span>
                    <button className="hover:bg-gray-200 rounded-sm p-1">
                      <Edit2 size={16}></Edit2>
                    </button>
                  </span>
                </div>
                <AddCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
