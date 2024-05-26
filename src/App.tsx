import React, { useCallback } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  addEdge,
  Edge,
  Connection,
  Node,
  ReactFlowInstance,
} from "reactflow";
import { useStore } from "./store";
import MainContainer from "./components/Main";
import HeaderContainer from "./components/Header";
import { v4 } from "uuid";
import "./App.css";
import "reactflow/dist/style.css";

function App() {
  const { updateNode, updateEdge, nodeList, edgeList, createNewNode } =
    useStore();

  const [inputBoxValue, setInputBoxValue] = React.useState({
    show: false,
    value: "",
    nodeId: "",
  });

  const [reactFlowInstance, setReactFlowInstance] = React.useState<
    ReactFlowInstance | undefined
  >(undefined);

  const handleNodesChange = React.useCallback(
    (changes: NodeChange[]) => {
      updateNode(applyNodeChanges(changes, nodeList));
    },
    [nodeList]
  );

  const handleEdgesChange = React.useCallback((changes: EdgeChange[]) => {
    updateEdge(applyEdgeChanges(changes, edgeList));
  }, []);

  const handleNodeConnect = React.useCallback((params: Edge | Connection) => {
    updateEdge(addEdge(params, edgeList));
  }, []);

  const handleSelectNode = (node: Node) => {
    setInputBoxValue({
      show: true,
      value: node?.data?.label,
      nodeId: node?.id,
    });
  };

  const handleChangeMessage = (text: string) => {
    if (text) {
      setInputBoxValue((prev) => ({ ...prev, value: text }));
      const tempNodeList = [...nodeList];
      tempNodeList.forEach((node) => {
        if (inputBoxValue.nodeId === node.id) {
          node.data.label = text;
        }
      });
      updateNode(tempNodeList);
    } else {
      // show alert that message can't be empty
    }
  };

  const handleDropOnCanvas = useCallback(
    (event: DragEvent) => {
      event?.preventDefault();

      const data = event?.dataTransfer?.getData("application/reactflow");

      if (!data) return;

      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: v4(),
        position,
        data: JSON.parse(data),
      };

      createNewNode(newNode);
    },
    [reactFlowInstance]
  );

  const handleDragOverCanvas = useCallback((event: DragEvent) => {
    if (event) {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    }
  }, []);

  const handleDragStart = useCallback((event: DragEvent) => {
    event.dataTransfer?.setData(
      "application/reactflow",
      JSON.stringify({
        label: `Text Message ${nodeList.length + 1}`,
      })
    );
  }, []);

  return (
    <>
      <HeaderContainer />
      <MainContainer
        showInputBox={inputBoxValue.show}
        inputBoxValue={inputBoxValue.value}
        onConnect={handleNodeConnect}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onChangeMessage={handleChangeMessage}
        onSelectNode={handleSelectNode}
        onDropOnCanvas={handleDropOnCanvas}
        onDragOverCanvas={handleDragOverCanvas}
        onDragStart={handleDragStart}
        setReactFlowInstance={setReactFlowInstance}
      />
    </>
  );
}

export default App;
