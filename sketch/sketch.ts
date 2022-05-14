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

function setup() {
  /*SET GLOBAL VARIABLES */
  setGlobalVariables();

  /*SET GUI */
  createCanvas(canvasWidth, canvasWidth);
  // add start button
  let startButton = createButton("Start");
  startButton.position(50, gridRow * squareLength);
  startButton.mousePressed(() => {
    // set all cells visited to be false
    for (let i = 0; i < gridRow; i++) {
      for (let j = 0; j < gridCol; j++) {
        Cells[i][j].visited = false;
        // set isCellPartOfPath false
        Cells[i][j].isThisCellPartOfPath = false;
        // set queue for all agent
        for (let k = 0; k < agents.length; k++) {
          agents[k].queueOfCells.clear();
          agents[k].queueOfCells.enqueue(agents[k].cell);
        }
      }
    }
  });
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  // white background
  background(255);
  // framerate
  frameRate(8);
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

  // do bfs
  for (let i = 0; i < agents.length; i++) {
    doBFSNextLayer(agents[i]);
  }
}
