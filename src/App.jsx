import { useState } from "react";

import "./App.css";
import PlayingArea from "./components/PlayingArea";

function App() {
  return (
    <div className="flex bg-blue-300 h-screen w-full justify-center items-center">
      <PlayingArea/>
    </div>
  )
}

export default App;
