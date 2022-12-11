const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

const focusNode = (nodeId) => {
  console.log("sending focus message for node" + nodeId)
  parent.postMessage({ pluginMessage: { type: 'focus-node', nodeId: nodeId } }, '*')
}

document.getElementById('getLinks').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'get-links' } }, '*')
}

onmessage = (event) => {
  const links = event.data.pluginMessage
  const linkList = document.getElementById("linkList")
  
  removeAllChildNodes(linkList)

  const title = document.createElement("div")
  title.innerHTML = "Links (" + links.length + ")"
  title.className = "title"
  linkList.appendChild(title)

  for (let link of links) { 
    let linkContainer = document.createElement("div")
    linkContainer.className = "linkContainer"

    let linkUrl = document.createElement("div"); 
    linkUrl.className = "linkUrl"

    let linkName = document.createElement("div"); 
    linkName.className = "linkName noSelect"

    let linkControls = document.createElement("div"); 
    linkControls.className = "linkControls"

    let nodeId = link.nodeId
    let focusButton = document.createElement("div")
    focusButton.className = "controlIcon icon icon--search icon--white"
    focusButton.id = nodeId
    focusButton.onclick = function() {
      focusNode(this.id)
    }

    let linkDetails = document.createElement("div"); 
    linkDetails.className = "linkDetails" 

    linkName.innerHTML = link.substring;
    linkUrl.innerHTML = link.url; 
    
    linkContainer.appendChild(linkDetails)
    linkDetails.appendChild(linkName)
    linkDetails.appendChild(linkUrl)
    linkContainer.appendChild(linkControls)
    linkControls.appendChild(focusButton)
    linkList.appendChild(linkContainer); 
  }
}
