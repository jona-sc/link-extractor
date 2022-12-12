const extractHyperlinkSegments = (lp: {nodeId: string, parent: string, content: string, url: string, urlPosition: number}[][]) => {
  console.log("finding hyperlink segments for link positions")
  let links: {}[] = [];
  for (let linkGroup=0 ; linkGroup < lp.length ; linkGroup++) {
    let link: {nodeId: string, parent: string, substring: string, url: string} = {
      parent: lp[linkGroup][0].parent,
      nodeId: lp[linkGroup][0].nodeId,
      substring: lp[linkGroup][0].content.substring(lp[linkGroup][0].urlPosition, lp[linkGroup][lp[linkGroup].length-1].urlPosition+1),
      url: lp[linkGroup][0].url
    }
    links.push(link)
  }
  console.log(links)
  return(links)
}

export default extractHyperlinkSegments