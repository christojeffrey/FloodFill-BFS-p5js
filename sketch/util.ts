function setGlobalVariables() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  squareLength = 20;
  agentCount = 2;
  targetCount = 10;
  gridCol = floor(canvasWidth / squareLength) - 1;
  gridRow = floor(canvasHeight / squareLength) - 1;
  console.log(gridCol, gridRow);
  //create cells
  for (let i = 0; i < gridRow; i++) {
    Cells[i] = [];
    for (let j = 0; j < gridCol; j++) {
      Cells[i][j] = new Cell(i, j);
    }
  }

  // create distinct agent randomly
  let i = 0;
  while (i < agentCount) {
    let row = floor(random(0, gridRow));
    let col = floor(random(0, gridCol));
    // agents doesnt contain this new agent
    // check if agents contain agent
    let isContain = false;
    for (let j = 0; j < agents.length; j++) {
      if (agents[j].row == row && agents[j].col == col) {
        isContain = true;
        break;
      }
    }
    if (!isContain) {
      agents.push(new Agent(row, col));
      i++;
    }
  }
  // create  distinct target randomly
  i = 0;
  while (i < targetCount) {
    let row = floor(random(0, gridRow));
    let col = floor(random(0, gridCol));
    // targets doesnt contain this new target
    // check if targets contain target
    let isContain = false;
    for (let j = 0; j < targets.length; j++) {
      if (targets[j].row == row && targets[j].col == col) {
        isContain = true;
        break;
      }
    }
    if (!isContain) {
      targets.push(new Target(row, col));
      i++;
    }
  }

  // create walls
  // fill wall randomly with true false
  for (let i = 0; i < gridRow; i++) {
    walls[i] = [];
    for (let j = 0; j < gridCol; j++) {
      // random true or false
      // 70% not wall
      walls[i][j] = Math.random() > 0.7;
    }
  }

  // set agent and target in cells
  for (let i = 0; i < gridRow; i++) {
    for (let j = 0; j < gridCol; j++) {
      // set agent
      for (let k = 0; k < agents.length; k++) {
        if (agents[k].row === i && agents[k].col === j) {
          Cells[i][j].isAgentHere = true;
        }
      }
      // set target
      for (let k = 0; k < targets.length; k++) {
        if (targets[k].row === i && targets[k].col === j) {
          Cells[i][j].isTargetHere = true;
        }
      }
      // set walls
      // jika bukan target, bukan agent, dan berdasarkan hasil random, ada wall, maka set wall true
      if (!Cells[i][j].isTargetHere && !Cells[i][j].isAgentHere && walls[i][j]) {
        Cells[i][j].isWallHere = true;
      }
    }
  }
  squareLength = floor(canvasWidth / gridCol);
  // P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
}

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
