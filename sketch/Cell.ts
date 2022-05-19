class Cell {
  // buat nentuin how the cell will be drawn
  visited: boolean;
  isWallHere: boolean;
  isPartOfPath: boolean;

  //buat overlay kotak diatas cell
  isTargetHere: boolean;
  isAgentHere: boolean;

  previousCell: Cell;

  constructor(public row: number, public col: number) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.isAgentHere = false;
    this.isTargetHere = false;
    this.isWallHere = false;
    this.isPartOfPath = false;
    this.previousCell = null;
  }
  // draw
  draw() {
    push();
    if (this.isWallHere) {
      // black
      fill(0);
    } else {
      if (this.isPartOfPath) {
        // yellow
        fill(255, 255, 0);
      } else {
        if (this.visited) {
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

  getUnvisitedNeighbors() {
    let neighbors = [];
    let row = this.row;
    let col = this.col;
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
}
