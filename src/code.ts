import getTextNodes from "./components/getTextNodes"
import findHyperlinksInTextNodes from "./components/findHyperlinksInTextNodes";
import focusOnTextNode from "./components/focusOnTextNode";

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  figma.showUI(__html__, { themeColors: true, width: 500, height: 500});

  const postLinksFromSelection = () => {
    const textNodes = getTextNodes();
    const links = findHyperlinksInTextNodes(textNodes);
    figma.ui.postMessage(links)
  }

  figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-links') {      
      postLinksFromSelection()
    } else if (msg.type === 'focus-node') {
      focusOnTextNode(msg.nodeId)
    }
  };

  figma.on("run", (event) => {
    postLinksFromSelection()
  })
}
