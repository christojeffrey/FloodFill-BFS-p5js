// GLOBAL VARS & TYPES
let numberOfShapesControl: p5.Element;
let gridRow: number;
let gridCol: number;
let Cells: Cell[][] = [];
let canvasWidth;
let canvasHeight;
let agents: Agent[] = [];
let targets: Target[] = [];
let squareLength: number;
let walls: Boolean[][] = [];
// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");
  // set global variables
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  squareLength = 40;
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
  // create agent
  agents.push(new Agent(1, 1));
  agents.push(new Agent(4, 30));
  agents.push(new Agent(4, 20));
  // create target
  targets.push(new Target(8, 14));
  targets.push(new Target(8, 20));

  // create walls
  // fill wall randomly with true false
  for (let i = 0; i < gridRow; i++) {
    walls[i] = [];
    for (let j = 0; j < gridCol; j++) {
      // random true or false
      // 70% not wall
      walls[i][j] = Math.random() > 0.7;
      console.log(walls[i][j]);
    }
  }

  createCanvas(canvasWidth, canvasWidth);
  // set agent and target in cells
  for (let i = 0; i < gridRow; i++) {
    for (let j = 0; j < gridCol; j++) {
      for (let k = 0; k < agents.length; k++) {
        if (agents[k].row === i && agents[k].col === j) {
          Cells[i][j].isAgentHere = true;
        }
      }
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
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  // white background
  background(255);
  // framerate
  frameRate(2);
  // create square as gridSize
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
  for (let i = 0; i < agents.length; i++) {
    doBFSNextLayer(agents[i]);
  }
}

function mouseClicked() {}
