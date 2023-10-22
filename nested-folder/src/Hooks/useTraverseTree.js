const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, nodeId) => {
    if (tree.id === nodeId) {
      return null;
    }
    const updatedItems = tree.items.filter((item) => {
      const updateItem = deleteNode(item, nodeId);
      return updateItem !== null;
    });
    return { ...tree, items: updatedItems };
  };

  const renameNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      return { ...tree, name: newName };
    }
    const updatedItem = tree.items.map((item) => {
      return renameNode(item, nodeId, newName);
    });
    return { ...tree, items: updatedItem };
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
