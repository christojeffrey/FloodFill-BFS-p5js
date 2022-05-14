class Agent {
  row: number;
  col: number;
  cell: Cell;
  queueOfCells: Queue;
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.cell = Cells[row][col];
    this.queueOfCells = new Queue();
  }
}
