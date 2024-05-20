import type { Node, NodeTypes } from "reactflow";
import ChatMessageNode from "./ChatMessageNode/ChatMessageNode";

export const initialNodes = [
  {
    id: "dndnode_0",
    type: "MessageNode",
    position: { x: 0, y: 0 },
    data: { label: "Chat node" },
  },
  {
    id: "dndnode_1",
    type: "MessageNode",
    position: { x: 400, y: -100 },
    data: { label: "Second Chat node" },
  },
] satisfies Node[];

export const nodeTypes = {
  MessageNode: ChatMessageNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

export const nodeTypesLayout = [
  {
    type: "MessageNode",
    label: "Message",
    className: "message-node-draggable-element",
  },
];
