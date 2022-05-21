// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;
let gridRow: number;
let gridCol: number;
let Cells: Cell[][] = [];
let canvasWidth: number;
let canvasHeight: number;
let agents: Agent[] = [];
let targets: Target[] = [];
let squareLength: number;
let walls: Boolean[][] = [];
let agentCount: number;
let targetCount: number;

function setGlobalVariables() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  squareLength = 15;
  agentCount = 7;
  targetCount = 15;
  gridCol = floor(canvasWidth / squareLength);
  gridRow = floor(canvasHeight / squareLength);
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
      // 30% wall
      let wallPercentage = 0.3;
      walls[i][j] = !(Math.random() > wallPercentage);
    }
  }

  // set agent, target,wall in cells if that cell is agent, target, wall
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
        Cells[i][j].isWall = true;
      }
    }
  }
}

/*
 
FUNGSI SETUP AKAN DIPANGGIL SAAT PERTAMA KALI DILOAD KE BROWSER

 */
function setup() {
  /*SET GLOBAL VARIABLES */
  setGlobalVariables();

  /*SET GUI */
  createCanvas(canvasWidth, canvasWidth);
  // add start button
  let startButton = createButton("Start");
  startButton.position(50, gridRow * squareLength);
  startButton.mousePressed(() => {
    // set all cells isVisited to be false
    for (let i = 0; i < gridRow; i++) {
      for (let j = 0; j < gridCol; j++) {
        Cells[i][j].isVisited = false;
        // set isCellPartOfPath false
        Cells[i][j].isPath = false;
        // set queue for all agent
        for (let k = 0; k < agents.length; k++) {
          agents[k].queueOfCells.clear();
          agents[k].queueOfCells.enqueue(Cells[agents[k].row][agents[k].col]);
        }
      }
    }
  });
  // framerate
  frameRate(5);
}

/* 

FUNGSI DRAW AKAN DIPANGGIL BROWSER SETIAP KALI GANTI FRAME

*/
function draw() {
  // white background
  background(255);

  // draw cells
  for (let i = 0; i < gridRow; i++) {
    for (let j = 0; j < gridCol; j++) {
      push();
      let iLoc = i * squareLength;
      let jLoc = j * squareLength;
      // notice kalo j loc dulu baru i loc. begitulah cara nge draw disini
      translate(jLoc, iLoc);

      Cells[i][j].draw();
      pop();
    }
  }

  // do flood fill
  for (let i = 0; i < agents.length; i++) {
    agents[i].doBFSNextLayer();
  }
}
