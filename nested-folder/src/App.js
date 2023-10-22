import { useState } from "react";
import explorer from "./Data/FolderData";
import Folder from "./components/Folder";
import useTraverseTree from "./Hooks/useTraverseTree";
import "./App.css";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode, renameNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finaleTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finaleTree);
  };
  const handleDeleteNode = (nodeId) => {
    const finaleTree = deleteNode(explorerData, nodeId);
    setExplorerData(finaleTree);
  };

  const handleRenameNode = (nodeId, newName) => {
    const finaleData = renameNode(explorerData, nodeId, newName);
    setExplorerData(finaleData);
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
        explorerData={explorerData}
      />
    </div>
  );
}
