function findFirstParentFrameName(node: SceneNode | BaseNode) {
  let parent = node.parent;
  while (parent && parent.type !== 'FRAME') {
    parent = parent.parent;
  }
  if (parent) {
    return parent.name;
  } else {
    return "";
  }
}
export default findFirstParentFrameName