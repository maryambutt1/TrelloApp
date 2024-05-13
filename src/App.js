import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
function App() {
  return (
    <>
      <Header />
      <div className="content flex">
        <Sidebar />
        <Main />
      </div>
    </>
  );
}

export default App;
