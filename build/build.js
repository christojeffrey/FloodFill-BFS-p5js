var Agent = (function () {
    function Agent(row, col) {
        this.row = row;
        this.col = col;
        this.cell = Cells[row][col];
        this.queueOfCells = new Queue();
        this.queueOfCells.enqueue(this.cell);
    }
    return Agent;
}());
var Cell = (function () {
    function Cell(row, col) {
        this.row = row;
        this.col = col;
        this.row = row;
        this.col = col;
        this.visited = false;
        this.isAgentHere = false;
        this.isTargetHere = false;
        this.isWallHere = false;
        this.isThisCellPartOfPath = false;
        this.previousCell = null;
    }
    Cell.prototype.draw = function () {
        push();
        if (this.isWallHere) {
            fill(0);
        }
        else {
            if (this.isThisCellPartOfPath) {
                fill(255, 0, 255, 90);
            }
            else {
                if (this.visited) {
                    fill(0, 0, 255, 60);
                }
                else {
                    fill(255);
                }
            }
        }
        square(0, 0, squareLength);
        if (this.isAgentHere) {
            this.highlightAsAgent();
        }
        if (this.isTargetHere) {
            this.highlightAsTarget();
        }
        pop();
    };
    Cell.prototype.highlightAsAgent = function () {
        push();
        fill(0, 255, 0);
        square(0, 0, squareLength);
        pop();
    };
    Cell.prototype.highlightAsTarget = function () {
        push();
        fill(255, 0, 0);
        square(0, 0, squareLength);
        pop();
    };
    return Cell;
}());
var Queue = (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (element) {
        this.items.push(element);
    };
    Queue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        else {
            return this.items.shift();
        }
    };
    Queue.prototype.peek = function () {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    };
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Queue.prototype.size = function () {
        return this.items.length;
    };
    return Queue;
}());
var Target = (function () {
    function Target(row, col) {
        this.row = row;
        this.col = col;
        this.row = row;
        this.col = col;
    }
    return Target;
}());
var numberOfShapesControl;
var gridRow;
var gridCol;
var Cells = [];
var canvasWidth;
var canvasHeight;
var agents = [];
var targets = [];
var squareLength;
var walls = [];
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    squareLength = 40;
    gridCol = floor(canvasWidth / squareLength) - 1;
    gridRow = floor(canvasHeight / squareLength) - 1;
    console.log(gridCol, gridRow);
    for (var i = 0; i < gridRow; i++) {
        Cells[i] = [];
        for (var j = 0; j < gridCol; j++) {
            Cells[i][j] = new Cell(i, j);
        }
    }
    agents.push(new Agent(1, 1));
    agents.push(new Agent(4, 30));
    agents.push(new Agent(4, 20));
    targets.push(new Target(8, 14));
    targets.push(new Target(8, 20));
    for (var i = 0; i < gridRow; i++) {
        walls[i] = [];
        for (var j = 0; j < gridCol; j++) {
            walls[i][j] = Math.random() > 0.7;
            console.log(walls[i][j]);
        }
    }
    createCanvas(canvasWidth, canvasWidth);
    for (var i = 0; i < gridRow; i++) {
        for (var j = 0; j < gridCol; j++) {
            for (var k = 0; k < agents.length; k++) {
                if (agents[k].row === i && agents[k].col === j) {
                    Cells[i][j].isAgentHere = true;
                }
            }
            for (var k = 0; k < targets.length; k++) {
                if (targets[k].row === i && targets[k].col === j) {
                    Cells[i][j].isTargetHere = true;
                }
            }
            if (!Cells[i][j].isTargetHere && !Cells[i][j].isAgentHere && walls[i][j]) {
                Cells[i][j].isWallHere = true;
            }
        }
    }
    squareLength = floor(canvasWidth / gridCol);
}
function draw() {
    background(255);
    frameRate(2);
    for (var i = 0; i < gridRow; i++) {
        for (var j = 0; j < gridCol; j++) {
            push();
            var iLoc = i * squareLength;
            var jLoc = j * squareLength;
            translate(jLoc, iLoc);
            Cells[i][j].draw();
            pop();
        }
    }
    for (var i = 0; i < agents.length; i++) {
        doBFSNextLayer(agents[i]);
    }
}
function mouseClicked() { }
function getUnvisitedNeighbors(cell) {
    var neighbors = [];
    var row = cell.row;
    var col = cell.col;
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
function doBFSNextLayer(agent) {
    var nodeInThisLayer = [];
    while (agent.queueOfCells.size() > 0) {
        nodeInThisLayer.push(agent.queueOfCells.dequeue());
    }
    console.log(nodeInThisLayer);
    for (var i = 0; i < nodeInThisLayer.length; i++) {
        var expandNode = nodeInThisLayer[i];
        if (!expandNode.visited) {
            var neighbors = getUnvisitedNeighbors(expandNode);
            for (var i_1 = 0; i_1 < neighbors.length; i_1++) {
                neighbors[i_1].previousCell = expandNode;
                agent.queueOfCells.enqueue(neighbors[i_1]);
            }
            expandNode.visited = true;
            if (expandNode.isTargetHere) {
                console.log("found target");
                var current = expandNode;
                while (current.previousCell) {
                    current.isThisCellPartOfPath = true;
                    current = current.previousCell;
                }
            }
        }
    }
}
//# sourceMappingURL=build.js.map