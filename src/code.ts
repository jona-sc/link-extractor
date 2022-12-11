import getTextNodes from "./components/getTextNodes"
import findHyperlinksInTextNodes from "./components/findHyperlinksInTextNodes";
import focusOnTextNode from "./components/focusOnTextNode";

// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  figma.showUI(__html__, { themeColors: true, width: 500, height: 500});

  figma.ui.onmessage = (msg) => {
    if (msg.type === 'get-links') {      
      const textNodes = getTextNodes();
      const links = findHyperlinksInTextNodes(textNodes);
      figma.ui.postMessage(links)
    } else if (msg.type === 'focus-node') {
      console.log("received focus message for " + msg.nodeId)
      focusOnTextNode(msg.nodeId)
    }
  };
}
