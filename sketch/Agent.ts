class Agent {
  row: number;
  col: number;
  queueOfCells: Queue;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.queueOfCells = new Queue();
  }

  //method
  doBFSNextLayer() {
    let nodeInThisLayer = [];
    // 1. get all the node in queue. semua node di dalam queue saat ini pasti berada di layer atau depth yang sama.
    while (this.queueOfCells.size() > 0) {
      nodeInThisLayer.push(this.queueOfCells.dequeue());
    }

    //2. untuk tiap node di layer ini, jadikan dia expand node.
    for (let i = 0; i < nodeInThisLayer.length; i++) {
      let expandNode = nodeInThisLayer[i];
      if (!expandNode.isVisited) {
        // 3. untuk setiap expandNode, jika expandNode belum dikunjungi, set isVisited menjadi true dan dapatkan neighboring node dari expandNode.
        expandNode.isVisited = true;
        let neighbors = expandNode.getUnisVisitedNeighbors();
        // 4. untuk setiap neighboring node, set expandNode sebagai previous cell, dan tambahkan dia ke dalam queue agent(kita tambahkan layer selanjutnya ke dalam queue)
        for (let i = 0; i < neighbors.length; i++) {
          neighbors[i].previousCell = expandNode;
          this.queueOfCells.enqueue(neighbors[i]);
        }

        //5. cek apakah expandNode merupakan target. jika iya, set atribut 'apakah cell tersebut bagian dari path' pada setiap cell menjadi true
        if (expandNode.isTargetHere) {
          console.log("found target");

          // set cell as path
          let current = expandNode;
          while (current.previousCell) {
            current.isPath = true;
            current = current.previousCell;
          }
        }
      }
    }
  }
}
