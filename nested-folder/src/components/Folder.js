import React, { useState } from "react";

const Folder = ({
  handleInsertNode = () => {},
  handleDeleteNode = () => {},
  handleRenameNode = () => {},
  explorerData,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  // Add a state to manage the file name edit mode
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(explorerData.name);

  const handleFolder = (e, folder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: folder,
    });
  };

  const onAddFolder = (e) => {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      handleInsertNode(explorerData.id, value, showInput.isFolder);
      setShowInput({
        ...showInput,
        visible: false,
      });
    }
  };

  // Function to handle the file name edit
  const handleEditName = () => {
    setIsEditingName(true);
  };

  // Function to save the new file name
  const saveNewName = () => {
    handleRenameNode(explorerData.id, newName);
    setIsEditingName(false);
  };

  if (explorerData.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder">
          <span onClick={() => setExpand(!expand)}>📁 {explorerData.name}</span>
          <div>
            <button onClick={(e) => handleFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleFolder(e, false)}>File +</button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div className="input-container">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAddFolder}
                className="input-container__input"
                autoFocus
              />
            </div>
          )}
          {explorerData.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
                explorerData={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        {isEditingName ? ( // Display the input field when editing the name
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={saveNewName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveNewName();
              }
            }}
          />
        ) : (
          <span>📄 {explorerData.name}</span>
        )}
        <button onClick={() => handleDeleteNode(explorerData.id)}>
          Delete
        </button>
        <button onClick={handleEditName}>Rename</button>
      </div>
    );
  }
};
export default Folder;
