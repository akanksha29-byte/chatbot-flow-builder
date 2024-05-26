import ReactFlow, { Controls, Background } from "reactflow";
import React, { SyntheticEvent } from "react";
import { MainContainerProps } from "../../store/types";
import { useStore } from "../../store";
import "./style.scss";

const MainContainer: React.FC<MainContainerProps> = (props) => {
  const { nodeList, edgeList } = useStore();

  const {
    showInputBox,
    inputBoxValue,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onSelectNode,
    onChangeMessage,
    setReactFlowInstance,
    onDropOnCanvas,
    onDragOverCanvas,
    onDragStart,
  } = props;
  return (
    <div className="main-container">
      <div className="board-container">
        <ReactFlow
          nodes={nodeList}
          edges={edgeList}
          fitView
          onInit={setReactFlowInstance}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => onSelectNode(node)}
          onDrop={onDropOnCanvas}
          onDragOver={onDragOverCanvas}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="side-container">
        {showInputBox ? (
          <div>
            <div className="input-container">
              <input
                type="text"
                className="Enter text"
                value={inputBoxValue}
                onChange={(e: SyntheticEvent) => {
                  const { value } = e.target as HTMLInputElement;
                  onChangeMessage(value);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="node-container" draggable onDragStart={onDragStart}>
            Message
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
