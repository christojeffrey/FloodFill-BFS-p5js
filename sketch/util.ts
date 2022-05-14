function getUnvisitedNeighbors(cell: Cell) {
  let neighbors = [];
  let row = cell.row;
  let col = cell.col;
  if (row > 0) {
    if (!Cells[row - 1][col].visited && !Cells[row - 1][col].isWallHere) {
      neighbors.push(Cells[row - 1][col]);
    }
  }
  if (row < gridRow - 1) {
    if (!Cells[row + 1][col].visited && !Cells[row + 1][col].isWallHere) {
      neighbors.push(Cells[row + 1][col]);
    }
  }
  if (col > 0) {
    if (!Cells[row][col - 1].visited && !Cells[row][col - 1].isWallHere) {
      neighbors.push(Cells[row][col - 1]);
    }
  }
  if (col < gridCol - 1) {
    if (!Cells[row][col + 1].visited && !Cells[row][col + 1].isWallHere) {
      neighbors.push(Cells[row][col + 1]);
    }
  }
  return neighbors;
}

function doBFSNextLayer(agent: any) {
  let nodeInThisLayer = [];
  // get all the node in queue
  while (agent.queueOfCells.size() > 0) {
    nodeInThisLayer.push(agent.queueOfCells.dequeue());
  }
  console.log(nodeInThisLayer);
  for (let i = 0; i < nodeInThisLayer.length; i++) {
    let expandNode = nodeInThisLayer[i];
    if (!expandNode.visited) {
      let neighbors = getUnvisitedNeighbors(expandNode);
      for (let i = 0; i < neighbors.length; i++) {
        neighbors[i].previousCell = expandNode;
        agent.queueOfCells.enqueue(neighbors[i]);
      }
      expandNode.visited = true;
      if (expandNode.isTargetHere) {
        console.log("found target");
        // draw path
        let current = expandNode;
        while (current.previousCell) {
          current.isThisCellPartOfPath = true;
          current = current.previousCell;
        }
      }
    }
  }
}
