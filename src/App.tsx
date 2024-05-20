import { useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import { initialNodes, nodeTypesLayout } from "./nodes";
import { initialEdges } from "./edges";
import { nodeTypes } from "./nodes";
import NodePanelDraggable from "./nodes/NodePanelDraggable";
import Settings from "./Settings/Settings";
import SaveResult from "./SaveResult";

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodesPanelOpen, setNodesPanelOpen] = useState<boolean>(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("");
  const [settingsPanelMessageText, setSettingsPanelMessageText] =
    useState<string>("");
  const [saveResultVisible, setSaveResultVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  let id = 2;
  const getId = () => `dndnode_${id++}`;

  const onNodesChange = useCallback(
    //@ts-ignore
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    //@ts-ignore
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  /**
   * in this function we are checking if the source node of the edge connection is already
   * occupied , then don't make a connection . This is to allow only one edge from the source
   */
  const onConnect = useCallback(
    //@ts-ignore
    (connection) =>
      //@ts-ignore
      setEdges((eds) => {
        const sourceAlreadyConnected = eds.some((edge) => {
          //@ts-ignore
          return connection.source === edge.source;
        });

        console.log("sourceConnected", sourceAlreadyConnected);

        if (sourceAlreadyConnected) {
          return eds;
        }
        return addEdge(
          { ...connection, markerEnd: { type: MarkerType.Arrow } },
          eds
        );
      }),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      //@ts-ignore
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `test message 1` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  /**
   * we are setting the node id of the selected node on clicking it
   * @param event
   * @param node
   */
  const onNodeClick = (event: any, node: any) => {
    setSelectedNodeId(node.id);
    setNodesPanelOpen(false);
    setSettingsPanelMessageText(node.data.label);
  };

  /*
 here on changing the text in the settings textbox , we are changing the text on the selected nodee
 identified by node id 
 */

  const onTextChange = (event: any) => {
    setSettingsPanelMessageText(event.target.value);
    nodes.map((node) => {
      if (node.id === selectedNodeId) {
        node.data.label = event.target.value;
      }
      return node;
    });
  };

  /***
   * we are keeping track of the unique occupied target handles by cheking the
   * edge array . We are using a set because there can be multiple targetHandle edges on the
   * same node . The size of the set would give the no of nodes that have their targetHandle
   * occupied. Then we are simply checking the given condition for flow to be saved
   */

  const saveFlow = () => {
    setError(false);
    const nodesWithTargetHandleOccupied: Set<string> = new Set();
    //@ts-ignore
    edges.forEach((edge) => nodesWithTargetHandleOccupied.add(edge.target));

    if (
      nodes.length > 1 &&
      nodes.length - 1 > nodesWithTargetHandleOccupied.size
    ) {
      setError(true);
    }
    setSaveResultVisible(true);

    setTimeout(() => {
      setSaveResultVisible(false);
    }, 4000);
  };

  return (
    <main className="main-div">
      <header className="app-header">
        {saveResultVisible && <SaveResult error={error} />}
        <button className="save-button" onClick={saveFlow}>
          Save Changes
        </button>
      </header>
      <div className="chat-flow-container">
        <div className="react-flow-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            //@ts-ignore
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        {nodesPanelOpen ? (
          <div className="node-panel-parent-container">
            <div className="node-panel-container">
              {nodeTypesLayout.map((node, index) => {
                return (
                  <NodePanelDraggable
                    label={node.label}
                    type={node.type}
                    className={node.className}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <Settings
            setNodesPanelOpen={setNodesPanelOpen}
            onTextChange={onTextChange}
            value={settingsPanelMessageText}
          />
        )}
      </div>
    </main>
  );
}
