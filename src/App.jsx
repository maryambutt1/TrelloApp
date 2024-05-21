import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { BoardContext } from "./context/BoardContext";
import { useState, useEffect } from "react";
import { fetchBoards } from "./services/api"; 

function App() {
  // Initialize state with an empty boards array and active index 0
  const [allBoard, setAllBoard] = useState({
    boards: [],
    active: 0,
  });

  useEffect(() => {
    const initializeBoards = async () => {
      try {
        const boards = await fetchBoards();
        // If boards are fetched successfully, set them in state
        if (boards && boards.length > 0) {
          setAllBoard({ boards, active: 0 });
        } else {
          // If no boards are fetched, set default board
          setAllBoard({
            active: 0,
            boards: [
              {
                name: 'My Trello Board',
                bgcolor: '#808080',
                list: [
                  { id: "1", title: "To do", items: [{ id: "cdrFt", title: "Project Description 1" }] },
                  { id: "2", title: "In Progress", items: [{ id: "cdrFv", title: "Project Description 2" }] },
                  { id: "3", title: "Done", items: [{ id: "cdrFb", title: "Project Description 3" }] }
                ]
              }
            ]
          });
        }
      } catch (error) {
        // If an error occurs during fetch, log error and set default board
        console.error('Error initializing boards:', error);
        setAllBoard({
          active: 0,
          boards: [
            {
              name: 'My Trello Board',
              bgcolor: '#808080',
              list: [
                { id: "1", title: "To do", items: [{ id: "cdrFt", title: "Project Description 1" }] },
                { id: "2", title: "In Progress", items: [{ id: "cdrFv", title: "Project Description 2" }] },
                { id: "3", title: "Done", items: [{ id: "cdrFb", title: "Project Description 3" }] }
              ]
            }
          ]
        });
      }
    };

    initializeBoards();
  }, []);

  // Show a loading state until boards are loaded
  if (!allBoard.boards.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BoardContext.Provider value={{ allBoard, setAllBoard }}>
        <Header />
        <div className="content flex">
          <Sidebar />
          <Main />
        </div>
      </BoardContext.Provider>
    </>
  );
}

export default App;
