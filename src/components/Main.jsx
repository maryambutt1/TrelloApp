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
import { v4 as uuidv4 } from "uuid";

export default function Main() {
  const { allBoard, setAllBoard } = useContext(BoardContext);
  const boardData = allBoard.boards[allBoard.active];

  const getCard = (card, index) => {
    const uniqueId = uuidv4();
    let newBoardList = [...boardData.list];
    newBoardList[index].items.push({ id: uniqueId, title: card });
    let board = { ...allBoard };
    board.boards[board.active].list = newBoardList;
    setAllBoard(board);
  };

  const getList = (list) => {
    let newBoardList = [...boardData.list];
    newBoardList.push({
      id: newBoardList.length + 1 + "",
      title: list,
      items: [],
    });
    let board = { ...allBoard };
    board.boards[board.active].list = newBoardList;
    setAllBoard(board);
  };

  function onDragEnd(result) {
    if (!result.destination) {
        console.log("No Destination");
        return;
    }
    const { source, destination, type } = result;

    // If dragging a list
    if (type === "LIST") {
        const newListOrder = Array.from(boardData.list);
        console.log("newlistorder",newListOrder)
        const movedList = newListOrder.splice(source.index, 1)[0];
        console.log("movedlist",movedList)
        newListOrder.splice(destination.index, 0, movedList);

        // Update list IDs and indices
        const updatedListOrder = newListOrder.map((list, index) => ({
            ...list,
            id: index.toString(),
        }));
        console.log("updatedlistorder",updatedListOrder)
        const updatedBoard = {
            ...allBoard,
            boards: allBoard.boards.map((board, i) =>
                i === allBoard.active ? { ...board, list: updatedListOrder } : board
            ),
        };
        console.log("updated board",updatedBoard)
        setAllBoard(updatedBoard);
        return;
    }

    // If dragging a card
    const newList = [...allBoard.boards[allBoard.active].list];
    const sourceList = newList.find(list => list.id === result.source.droppableId);
    const destinationList = newList.find(list => list.id === result.destination.droppableId);

    if (!sourceList || !destinationList) {
        console.log("Source or destination list not found");
        return;
    }

    const sourceItems = sourceList.items;
    const destinationItems = destinationList.items;

    if (!sourceItems || !destinationItems) {
        console.log("Source or destination items not found");
        return;
    }

    const [removed] = sourceItems.splice(result.source.index, 1);
    destinationItems.splice(result.destination.index, 0, removed);

    let updatedBoard = { ...allBoard };
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
        className="text-white p-3 flex justify-between border border-gray-300 bg-gray-800 items-center "
        style={{ backgroundColor: `${boardData.bgcolor}` }}
      >
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
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll gap-x-3">
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
              {(provided, snapshot) => (
                <div
                  className="flex gap-x-2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {boardData.list.map((list, index) => (
                    <Draggable key={list.id} draggableId={list.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            key={list.id}
                            className="w-60 h-fit rounded-md p-2 bg-gray-300 flex-shrink-0"
                          >
                            <div className="list-body">
                              <div className="text-black flex justify-between p-1 items-center">
                                <span>
                                  <b>{list.title}</b>
                                </span>
                                <button className="hover:bg-gray-400 p-1 rounded-sm">
                                  <MoreHorizontal size={16}></MoreHorizontal>
                                </button>
                              </div>
                              <Droppable droppableId={list.id} type="PERSON">
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
                                    {list.items.map((item, index) => (
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
                              <AddCard getCard={(card) => getCard(card, index)} />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <AddList getList={(list) => getList(list)} />
        </div>
      </div>
    </div>
  );
}
