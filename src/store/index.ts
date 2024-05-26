import { create } from "zustand";
import { Edge, Node } from "reactflow";
interface AppState {
  nodeList: Node[];
  edgeList: Edge[];
}

interface AppActions {
  createNewNode: (newNodes: Node) => void;
  createNewEdge: (newEdges: Edge) => void;
  updateNode: (newNodes: Node[]) => void;
  updateEdge: (newEdges: Edge[]) => void;
}

export const useStore = create<AppState & AppActions>((set) => ({
  nodeList: [],
  edgeList: [],
  createNewNode: (newList) =>
    set((state) => ({ nodeList: state.nodeList.concat(newList) })),
  createNewEdge: (newEdge) =>
    set((state) => ({ edgeList: [...state.edgeList, newEdge] })),
  updateNode: (newList) => set({ nodeList: newList }),
  updateEdge: (newEdge) => set({ edgeList: newEdge }),
}));
