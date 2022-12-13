const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

const focusNode = (nodeId) => {
  parent.postMessage({ pluginMessage: { type: 'focus-node', nodeId: nodeId } }, '*')
}

const requestLinks = () => {
  parent.postMessage({ pluginMessage: { type: 'get-links' } }, '*')
}

document.getElementById('getLinks').onclick = () => {
  requestLinks()
}

onmessage = (event) => {
  const links = event.data.pluginMessage
  const linkList = document.getElementById("linkList")
  removeAllChildNodes(linkList);
  
  const title = document.createElement("div");
  title.innerHTML = "Links (" + links.length + ")";
  title.className = "title";
  linkList.appendChild(title);

  for (let link of links) { 
    let linkContainer = document.createElement("div")
    linkContainer.className = "linkContainer"

    let linkUrl = document.createElement("div"); 
    linkUrl.className = "linkUrl"

    let linkName = document.createElement("div"); 
    linkName.className = "linkName noSelect"

    let linkFrame = document.createElement("div");
    linkFrame.className = "linkFrame"
    linkFrame.innerHTML = link.parent;

    let linkControls = document.createElement("div"); 
    linkControls.className = "linkControls"

    let focusButton = document.createElement("div")
    focusButton.className = "controlIcon icon icon--search"
    focusButton.id = link.nodeId
    focusButton.onclick = function() {
      focusNode(this.id)
    }
    
    let linkButton = document.createElement("div")
    linkButton.className = "controlIcon icon icon--link-connected"
    linkButton.id = link.url
    linkButton.onclick = function() {
      window.open(link.url)
    }

    let linkDetails = document.createElement("div"); 
    linkDetails.className = "linkDetails" 

    linkName.innerHTML = link.substring;
    linkUrl.innerHTML = link.url; 
    
    linkContainer.appendChild(linkDetails)
    linkDetails.appendChild(linkFrame)
    linkDetails.appendChild(linkName)
    linkDetails.appendChild(linkUrl)
    linkContainer.appendChild(linkControls)
    linkControls.appendChild(focusButton)
    linkControls.appendChild(linkButton)
    linkList.appendChild(linkContainer); 
  }
}
