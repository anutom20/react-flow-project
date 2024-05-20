import { Dispatch, SetStateAction } from "react";
import "./Settings.css";

interface Settings {
  setNodesPanelOpen: Dispatch<SetStateAction<boolean>>;
  onTextChange: (event: any) => void;
  value: string;
}

const Settings: React.FC<Settings> = ({
  setNodesPanelOpen,
  onTextChange,
  value,
}) => {
  return (
    <div className="message-container">
      <div className="header">
        <button className="back-button" onClick={() => setNodesPanelOpen(true)}>
          ←
        </button>
        <h2>Message</h2>
      </div>
      <div className="message-body">
        <label htmlFor="message-text">Text</label>
        <textarea
          id="message-text"
          className="message-textarea"
          onChange={onTextChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default Settings;
