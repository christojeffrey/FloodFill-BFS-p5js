class Cell {
  // buat nentuin how the cell will be drawn
  isVisited: boolean;
  isWall: boolean;
  isPath: boolean;

  //buat overlay kotak diatas cell
  isTargetHere: boolean;
  isAgentHere: boolean;

  row: number;
  col: number;
  previousCell: Cell;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.isVisited = false;
    this.isAgentHere = false;
    this.isTargetHere = false;
    this.isWall = false;
    this.isPath = false;
    this.previousCell = null;
  }
  // draw
  draw() {
    push();
    if (this.isWall) {
      // black
      fill(0);
    } else {
      if (this.isPath) {
        // yellow
        fill(255, 255, 0);
      } else {
        if (this.isVisited) {
          // blue
          fill(0, 0, 255, 90);
        } else {
          // white
          fill(255);
        }
      }
    }
    square(0, 0, squareLength);
    pop();

    if (this.isAgentHere) {
      // console.log("agent", this.x, this.y);
      // fill(0, 255, 0);
      this.highlightAsAgent();
    }
    if (this.isTargetHere) {
      this.highlightAsTarget();
    }
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

  getUnisVisitedNeighbors() {
    let neighbors = [];
    let row = this.row;
    let col = this.col;
    if (row > 0) {
      if (!Cells[row - 1][col].isVisited && !Cells[row - 1][col].isWall) {
        neighbors.push(Cells[row - 1][col]);
      }
    }
    if (row < gridRow - 1) {
      if (!Cells[row + 1][col].isVisited && !Cells[row + 1][col].isWall) {
        neighbors.push(Cells[row + 1][col]);
      }
    }
    if (col > 0) {
      if (!Cells[row][col - 1].isVisited && !Cells[row][col - 1].isWall) {
        neighbors.push(Cells[row][col - 1]);
      }
    }
    if (col < gridCol - 1) {
      if (!Cells[row][col + 1].isVisited && !Cells[row][col + 1].isWall) {
        neighbors.push(Cells[row][col + 1]);
      }
    }
    return neighbors;
  }
}
