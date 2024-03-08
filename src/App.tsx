import React from "react";
import "./App.css";
import Top from "./components/01top/Top";
import Nav from "./components/nav/Nav";
import End from "./components/99end/End";
import BottomNav from "./components/bottomNav/BottomNav";

function App() {
  return (
    <div className="App" style={{ position: "relative", overflow: "hidden" }}>
      <Top />
      <Nav />
      <BottomNav />
      <End />
    </div>
  );
}

export default App;
