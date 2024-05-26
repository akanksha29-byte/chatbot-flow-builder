import { Dispatch, SetStateAction } from "react";
import {
  NodeChange,
  EdgeChange,
  Edge,
  Connection,
  ReactFlowInstance,
  Node,
} from "reactflow";

export interface MainContainerProps {
  showInputBox: boolean;
  inputBoxValue: string;
  onSelectNode: (node: Node) => void;
  onConnect: (params: Edge | Connection) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onChangeMessage: (text: string) => void;
  setReactFlowInstance: Dispatch<SetStateAction<ReactFlowInstance | undefined>>;
  onDropOnCanvas: (e: DragEvent) => void;
  onDragOverCanvas: (e: DragEvent) => void;
  onDragStart: (e: DragEvent) => void;
}
