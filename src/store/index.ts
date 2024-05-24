import { create } from "zustand";

interface Position {
  x: number;
  y: number;
}

interface NodeData {
  id: string;
  data: { label: string };
  position: Position;
  type?: string;
}

interface AppState {
  nodeList: NodeData[];
}

interface AppActions {
  createNode: (newNode: NodeData) => void;
}

export const useStore = create<AppState & AppActions>((set) => ({
  nodeList: [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 100, y: 100 },
    },
  ],
  createNode: (newNode) =>
    set((state) => ({ nodeList: [...state.nodeList, newNode] })),
}));
