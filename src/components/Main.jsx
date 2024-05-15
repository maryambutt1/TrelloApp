import React, { useContext } from "react";
import {
  UserPlus,
  Zap,
  TrendingUp,
  Filter,
  MoreHorizontal,
  Edit2,
} from "react-feather";
import { BoardContext } from "../context/BoardContext";
import AddCard from "./AddCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Main() {
  const { allBoard, setAllBoard } = useContext(BoardContext);
  const boardData = allBoard.boards[allBoard.active];

  const getCard = (card,index) => {
    let newBoardList = [...boardData.list];
    newBoardList[index].items.push({id:'abc',title:card});
    let board={...allBoard};
    board.boards[board.active].list=newBoardList;
    setAllBoard(board);

  };

  function onDragEnd(result){
    if(!result.destination){
        console.log("No Destination");
        return;
    }
    const newList = [...boardData.list];
    const sourceId = parseInt(result.source.droppableId);
    const destinationId = parseInt(result.destination.droppableId);
    const [removed] = newList[sourceId - 1].items.splice(result.source.index,1);
    newList[destinationId - 1].items.splice(result.destination.index,0,removed);

    let board = {...allBoard};
    board.boards[board.active].list = newList;
    setAllBoard(board);
}


  const buttons = [
    { name: "Power-ups", icon: <TrendingUp size={16} className="mr-2" /> },
    { name: "Automation", icon: <Zap size={16} className="mr-2" /> },
    { name: "Filter", icon: <Filter size={16} className="mr-2" /> },
    { name: "Share", icon: <UserPlus size={16} className="mr-2" /> },
  ];

  return (
    <div className="flex flex-col w-full" style={{backgroundColor:`${boardData.bgcolor}`}}>
      <div className="text-white p-3 flex justify-between border border-gray-900 bg-gray-800 items-center ">
        <h2 className="text-lg">
          {" "}
          <b>{boardData.name}</b>
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
          <DragDropContext onDragEnd={onDragEnd}>
            {boardData?.list &&
              boardData.list.map((x, i) => {
                return (
                  <div
                    key={i}
                    className="w-60 h-fit rounded-md p-2 bg-gray-200 flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="text-black flex justify-between p-1 items-center">
                        <span>
                          <b>{x.title}</b>
                        </span>
                        <button className="hover:bg-gray-400 p-1 rounded-sm">
                          <MoreHorizontal size={16}></MoreHorizontal>
                        </button>
                      </div>
                      <Droppable droppableId={x.id} type="PERSON">
                        {(provided, snapshot) => (
                          <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "lightgray"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {x.items &&
                              x.items.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="item text-black flex justify-between items-center bg-gray-100 p-2 rounded-lg cursor-pointer hover:border border-gray-500 mb-2">
                                        <span>{item.title}</span>
                                        <span>
                                          <button className="hover:bg-gray-200 rounded-sm p-1 ">
                                            <Edit2 size={16} />
                                          </button>
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                     
                        <AddCard getCard={(card) => getCard(card, i)} />
                     
                    </div>
                  </div>
                );
              })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
