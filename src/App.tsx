import React from "react";
import MainContainer from "./components/Main";
import HeaderContainer from "./components/Header";
import "./App.css";
import "reactflow/dist/style.css";

function App() {
  return (
    <>
      <HeaderContainer />
      <MainContainer />
    </>
  );
}

export default App;
