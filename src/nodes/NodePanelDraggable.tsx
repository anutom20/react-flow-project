import { BsChatText } from "react-icons/bs";

interface NodePanelDraggable {
  label: string;
  type: string;
  className: string;
}

const onDragStart = (event: any, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

const NodePanelDraggable: React.FC<NodePanelDraggable> = ({
  label,
  type,
  className,
}) => {
  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      draggable
      className={className}
    >
      <BsChatText size={24} />
      <span>{label}</span>
    </div>
  );
};

export default NodePanelDraggable;
