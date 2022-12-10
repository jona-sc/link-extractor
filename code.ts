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
      links = links.concat({substring: node.characters, url: node.hyperlink.value})
    } else {
      console.log("no hyperlinks found")
    }
  }
  return links
}

const extractHyperlinkPositionsFromMixedTextNode = (node: TextNode) => {
  console.log("extracting hyperlinks from mixed object")
  console.log(node)
  const length = node.characters.length
  let linkPositions: {content: string, url: string, urlPosition: number}[][] = []
  let linkGroup: {content: string, url: string, urlPosition: number}[] = []
  for (let character=0 ; character < length ; character++) {
    let link = node.getRangeHyperlink(character, character+1)
    if (link != null && link !== figma.mixed && link.value) {
      let prevUrl = linkGroup[linkGroup.length-1] ? linkGroup[linkGroup.length-1].url : ""
      let prevPosition = linkGroup[linkGroup.length-1] ? linkGroup[linkGroup.length-1].urlPosition : 0
      let linkPosition = {
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

const extractHyperlinkSegments = (lp: {content: string, url: string, urlPosition: number}[][]) => {
  console.log("finding hyperlink segments for link positions")
  let links: {}[] = [];
  for (let linkGroup=0 ; linkGroup < lp.length ; linkGroup++) {
    let link: {substring: string, url: string} = {
      substring: lp[linkGroup][0].content.substring(lp[linkGroup][0].urlPosition, lp[linkGroup][lp[linkGroup].length-1].urlPosition+1),
      url: lp[linkGroup][0].url
    }
    links.push(link)
  }
  console.log(links)
  return(links)
}

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  figma.showUI(__html__, { themeColors: true, width: 500, height: 500});

  figma.ui.onmessage = msg => {
    if (msg.type === 'get-links') {      
      const textNodes = getTextNodes();
      const links = findHyperlinksInTextNodes(textNodes);
      figma.ui.postMessage(links)
    }
  };
}
