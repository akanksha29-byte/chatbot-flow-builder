import ReactFlow, { Controls, Background } from "reactflow";
import "./style.scss";

const MainContainer = () => {
  return (
    <div className="main-container">
      <div className="board-container">
        <ReactFlow>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="side-container">
        <div className="node-container">Message</div>
      </div>
    </div>
  );
};

export default MainContainer;
