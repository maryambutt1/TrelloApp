import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { BoardContext } from "./context/BoardContext";
import { useState, useEffect } from "react";
import { fetchBoards } from "./services/api";

const defaultBoard = {
  active: 0,
  boards: [
    {
      name: "Sample Board",
      bgcolor: "#808080",
      list: [
        {
          id: "1",
          title: "To do",
          items: [{ id: "cdrFt", title: "Project Description 1" }],
        },
        {
          id: "2",
          title: "In Progress",
          items: [{ id: "cdrFv", title: "Project Description 2" }],
        },
        {
          id: "3",
          title: "Done",
          items: [{ id: "cdrFb", title: "Project Description 3" }],
        },
      ],
    },
  ],
};

function App() {
  const [allBoard, setAllBoard] = useState({
    boards: [],
    active: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const initializeBoards = async () => {
      try {
        const boards = await fetchBoards();
        if (boards && boards.length > 0) {
          setAllBoard({ boards, active: 0 });
          setDataFetched(true);
        } else {
          setAllBoard(defaultBoard);
          setDataFetched(false);
        }
      } catch (error) {
        console.error("Error initializing boards:", error);
        setAllBoard(defaultBoard);
        setDataFetched(false);
      }
    };

    initializeBoards();
  }, []);

  if (!allBoard?.boards?.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BoardContext.Provider value={{ allBoard, setAllBoard }}>
        <Header />
        <div className="content flex">
          <Sidebar setDataFetched={setDataFetched} />
          <Main dataFetched={dataFetched} />
        </div>
      </BoardContext.Provider>
    </>
  );
}

export default App;
