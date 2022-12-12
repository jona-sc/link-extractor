import extractHyperlinkPositionsFromMixedTextNode from "./extractHyperlinkPositionsFromMixedTextNode"
import findFirstParentFrameName from "./findFirstParentFrame"

const findHyperlinksInTextNodes = (nodes: TextNode[]) => {
  console.log("resetting constants")
  let links: {}[] = []

  for (const node of nodes) {
    console.log("finding hyperlink in text node")
    console.log(node)
    if (node.hyperlink && node.hyperlink == figma.mixed) {
      console.log("hyperlink is a mixed object")
      links = links.concat(extractHyperlinkPositionsFromMixedTextNode(node))
    } else if (node.hyperlink) {
      console.log("hyperlink is not mixed")
      console.log(node)
      let parentFrame = findFirstParentFrameName(node)
      links = links.concat({nodeId: node.id, parent: parentFrame, substring: node.characters, url: node.hyperlink.value})
    } else {
      console.log("no hyperlinks found")
    }
  }
  return links
}

export default findHyperlinksInTextNodes