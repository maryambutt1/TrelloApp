import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { BoardContext } from "./context/BoardContext";
import { useState } from "react";

function App() {
  const boardData = {
    active:0, //which board is active rn
    boards:[
      {
        name:'My Trello Board',
        bgcolor:'#808080',
        list:[
          {id:"1",title:"To do",items:[{id:"cdrFt",title:"Project Description 1"}]},
          {id:"2",title:"In Progress",items:[{id:"cdrFv",title:"Project Description 2"}]},
          {id:"3",title:"Done",items:[{id:"cdrFb",title:"Project Description 3"}]}
        ]
      }
      
    ]
  }
  const [allBoard,setAllBoard]=useState(boardData)
  return (
    <>
    <BoardContext.Provider value={{allBoard,setAllBoard}}>
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
