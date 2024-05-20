import { Handle, Position } from "reactflow";
import "./ChatMessageNode.css";
import { FaWhatsapp } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

interface CustomNode {
  data: any;
}

const ChatMessageNode: React.FC<CustomNode> = ({ data }) => {
  return (
    <>
      <div className="send-message-container">
        <div className="send-message-header">
          <div className="send-message-text">
            <BsChatDots size={12} />
            <span>Send Message</span>
          </div>
          <span className="whatsapp-icon">
            <FaWhatsapp size={16} />
          </span>
        </div>
        <div className="send-message-body">{data.label}</div>
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default ChatMessageNode;
