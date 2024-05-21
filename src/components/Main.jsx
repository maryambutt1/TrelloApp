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
import AddList from "./AddList";
import { createList, createCard } from "../services/api";

export default function Main() {
  const { allBoard, setAllBoard } = useContext(BoardContext);
  const boardData = allBoard.boards[allBoard.active];

  const getCard = async (card, listId, listIndex) => {
    try {
      const createdCard = await createCard({ title: card, listId });

      const newCard = {
        id: createdCard._id,
        title: createdCard.title,
      };

      const updatedBoardData = { ...boardData };

      const updatedList = { ...updatedBoardData.list[listIndex] };
      updatedList.cards = Array.isArray(updatedList.cards) ? updatedList.cards : [];

      updatedList.items.push(newCard);

      updatedBoardData.list[listIndex] = updatedList;

      setAllBoard((prevAllBoard) => {
        const updatedAllBoard = { ...prevAllBoard };
        updatedAllBoard.boards[prevAllBoard.active] = updatedBoardData;
        return updatedAllBoard;
      });
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const getList = async (list) => {
    try {
      const createdList = await createList({ title: list, boardId: boardData._id });
      const newList = {
        id: createdList._id,
        title: createdList.title,
        items: [],
      };
      const newBoardList = [...boardData.list, newList];
      const updatedBoard = { ...allBoard };
      updatedBoard.boards[updatedBoard.active].list = newBoardList;
      setAllBoard(updatedBoard);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { source, destination, type } = result;

    if (type === "LIST") {
      const newListOrder = Array.from(boardData.list);
      const movedList = newListOrder.splice(source.index, 1)[0];
      newListOrder.splice(destination.index, 0, movedList);

      const updatedBoard = {
        ...allBoard,
        boards: allBoard.boards.map((board, i) =>
          i === allBoard.active ? { ...board, list: newListOrder } : board
        ),
      };
      setAllBoard(updatedBoard);
      return;
    }

    const newList = [...allBoard.boards[allBoard.active].list];
    const sourceList = newList.find((list) => list.id === source.droppableId);
    const destinationList = newList.find((list) => list.id === destination.droppableId);

    if (!sourceList || !destinationList) {
      return;
    }

    const sourceItems = sourceList.items;
    const destinationItems = destinationList.items;

    if (!sourceItems || !destinationItems) {
      return;
    }

    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);

    const updatedBoard = { ...allBoard };
    updatedBoard.boards[updatedBoard.active].list = newList;
    setAllBoard(updatedBoard);
  }

  const buttons = [
    { name: "Power-ups", icon: <TrendingUp size={16} className="mr-2" /> },
    { name: "Automation", icon: <Zap size={16} className="mr-2" /> },
    { name: "Filter", icon: <Filter size={16} className="mr-2" /> },
    { name: "Share", icon: <UserPlus size={16} className="mr-2" /> },
  ];

  return (
    <div
      className="flex flex-col w-full"
      style={{ backgroundColor: `${boardData.bgcolor}` }}
    >
      <div
        className="text-white p-3 flex justify-between border border-gray-300 bg-gray-800 items-center"
        style={{ backgroundColor: `${boardData.bgcolor}` }}
      >
        <h2 className="text-lg">
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
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll gap-x-3">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
              {(provided) => (
                <div className="flex gap-x-2" {...provided.droppableProps} ref={provided.innerRef}>
                  {boardData.list && boardData.list.length > 0 ? (
                    boardData.list.map((list, index) => (
                      <Draggable key={list.id} draggableId={list.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className="w-60 h-fit rounded-md p-2 bg-gray-300 flex-shrink-0">
                              <div className="list-body">
                                <div className="text-black flex justify-between p-1 items-center">
                                  <span>
                                    <b>{list.title}</b>
                                  </span>
                                  <button className="hover:bg-gray-400 p-1 rounded-sm">
                                    <MoreHorizontal size={16} />
                                  </button>
                                </div>
                                <Droppable droppableId={list.id} type="PERSON">
                                  {(provided, snapshot) => (
                                    <div
                                      className="py-1"
                                      ref={provided.innerRef}
                                      style={{
                                        backgroundColor: snapshot.isDraggingOver ? "lightgray" : "transparent",
                                      }}
                                      {...provided.droppableProps}
                                    >
                                      {list.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <div className="item text-black flex justify-between items-center bg-gray-100 p-2 rounded-lg cursor-pointer hover:border border-gray-500 mb-2">
                                                <span>{item.title}</span>
                                                <span>
                                                  <button className="hover:bg-gray-200 rounded-sm p-1">
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
                                <AddCard
                                  getCard={(card) => {
                                    const listId = boardData.list[index].id;
                                    getCard(card, listId, index);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div></div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <AddList getList={getList} />
        </div>
      </div>
    </div>
  );
}
