class Cell {
  visited: boolean;
  isAgentHere: boolean;
  isTargetHere: boolean;
  isWallHere: boolean;

  // variable untuk reconstruct
  isThisCellPartOfPath: boolean;
  previousCell: Cell;

  constructor(public row: number, public col: number) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.isAgentHere = false;
    this.isTargetHere = false;
    this.isWallHere = false;
    this.isThisCellPartOfPath = false;
    this.previousCell = null;
  }
  // draw
  draw() {
    push();
    // translate(0, 0);
    // draw a shape with fill color black
    // fill(0);
    if (this.isWallHere) {
      fill(0);
    } else {
      if (this.isThisCellPartOfPath) {
        // purple
        fill(255, 0, 255, 90);
      } else {
        if (this.visited) {
          // blue
          fill(0, 0, 255, 90);
        } else {
          fill(255);
        }
      }
    }
    square(0, 0, squareLength);

    if (this.isAgentHere) {
      // console.log("agent", this.x, this.y);
      // fill(0, 255, 0);
      this.highlightAsAgent();
    }
    if (this.isTargetHere) {
      this.highlightAsTarget();
    }
    pop();
  }
  // highlightAsAgent
  highlightAsAgent() {
    // console.log("heu");
    push();
    // translate(0, 0);
    fill(0, 255, 0);
    square(0, 0, squareLength);
    pop();
  }
  // hightlightAsTarget
  highlightAsTarget() {
    push();
    // translate(0, 0);
    fill(255, 0, 0);
    square(0, 0, squareLength);
    pop();
  }
}
