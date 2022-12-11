const focusOnTextNode = (nodeId: string) => {
  console.log("focusing on node " + nodeId)
  let node = figma.currentPage.findOne(n => n.id === nodeId)
  if (node && node.type == 'TEXT' ) { figma.viewport.scrollAndZoomIntoView([node]) }
}

export default focusOnTextNode