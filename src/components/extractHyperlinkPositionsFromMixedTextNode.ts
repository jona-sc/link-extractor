import extractHyperlinkSegments from "./extractHyperlinkSegments"

const extractHyperlinkPositionsFromMixedTextNode = (node: TextNode) => {
  console.log("extracting hyperlinks from mixed object")
  console.log(node)
  const length = node.characters.length
  let linkPositions: typeof linkGroup[] = []
  let linkGroup: {nodeId: string, content: string, url: string, urlPosition: number}[] = []
  for (let character=0 ; character < length ; character++) {
    let link = node.getRangeHyperlink(character, character+1)
    if (link != null && link !== figma.mixed && link.value) {
      let prevUrl = linkGroup[linkGroup.length-1] ? linkGroup[linkGroup.length-1].url : ""
      let prevPosition = linkGroup[linkGroup.length-1] ? linkGroup[linkGroup.length-1].urlPosition : 0
      let linkPosition = {
        nodeId: node.id,
        content: node.characters,
        url: link.value,
        urlPosition: character
      }
      if (prevUrl == "") {
        linkGroup.push(linkPosition)
      } else if (prevUrl !== linkPosition.url && prevPosition+1 !== linkPosition.urlPosition) {
        linkPositions.push(linkGroup)
        linkGroup = [linkPosition]
        linkGroup.push(linkPosition)
      } else if (prevUrl == linkPosition.url && prevPosition+1 == linkPosition.urlPosition) {
        linkGroup.push(linkPosition)
      }
    }
  }
  linkPositions.push(linkGroup)
  console.log("there are links at the following positions:")
  console.log(linkPositions)
  return extractHyperlinkSegments(linkPositions)
}

export default extractHyperlinkPositionsFromMixedTextNode