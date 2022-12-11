const getTextNodes = () => {
  const textNodes: TextNode[] =  []
  for (const node of figma.currentPage.selection) {
    if ((node.type == 'FRAME' || node.type == 'GROUP' || node.type == 'SECTION' || node.type == 'COMPONENT' || node.type == 'INSTANCE')) {            
      textNodes.push.apply(textNodes, node.findAll(n => n.type === 'TEXT') as TextNode[])      
    } else if (node.type == 'TEXT') {
      textNodes.push(node)
    }
  }
  console.log("get text nodes")
  console.log(textNodes)
  return textNodes
}
export default getTextNodes