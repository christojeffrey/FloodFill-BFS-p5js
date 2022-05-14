var Agent = (function () {
    function Agent(row, col) {
        this.row = row;
        this.col = col;
        this.cell = Cells[row][col];
        this.queueOfCells = new Queue();
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
                    fill(0, 0, 255, 90);
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
    Queue.prototype.clear = function () {
        this.items = [];
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
var agentCount;
var targetCount;
function setup() {
    setGlobalVariables();
    createCanvas(canvasWidth, canvasWidth);
    var startButton = createButton("Start");
    startButton.position(50, gridRow * squareLength);
    startButton.mousePressed(function () {
        for (var i = 0; i < gridRow; i++) {
            for (var j = 0; j < gridCol; j++) {
                Cells[i][j].visited = false;
                Cells[i][j].isThisCellPartOfPath = false;
                for (var k = 0; k < agents.length; k++) {
                    agents[k].queueOfCells.clear();
                    agents[k].queueOfCells.enqueue(agents[k].cell);
                }
            }
        }
    });
}
function draw() {
    background(255);
    frameRate(8);
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
function setGlobalVariables() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    squareLength = 20;
    agentCount = 2;
    targetCount = 10;
    gridCol = floor(canvasWidth / squareLength) - 1;
    gridRow = floor(canvasHeight / squareLength) - 1;
    console.log(gridCol, gridRow);
    for (var i_1 = 0; i_1 < gridRow; i_1++) {
        Cells[i_1] = [];
        for (var j = 0; j < gridCol; j++) {
            Cells[i_1][j] = new Cell(i_1, j);
        }
    }
    var i = 0;
    while (i < agentCount) {
        var row = floor(random(0, gridRow));
        var col = floor(random(0, gridCol));
        var isContain = false;
        for (var j = 0; j < agents.length; j++) {
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
    i = 0;
    while (i < targetCount) {
        var row = floor(random(0, gridRow));
        var col = floor(random(0, gridCol));
        var isContain = false;
        for (var j = 0; j < targets.length; j++) {
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
    for (var i_2 = 0; i_2 < gridRow; i_2++) {
        walls[i_2] = [];
        for (var j = 0; j < gridCol; j++) {
            walls[i_2][j] = Math.random() > 0.7;
        }
    }
    for (var i_3 = 0; i_3 < gridRow; i_3++) {
        for (var j = 0; j < gridCol; j++) {
            for (var k = 0; k < agents.length; k++) {
                if (agents[k].row === i_3 && agents[k].col === j) {
                    Cells[i_3][j].isAgentHere = true;
                }
            }
            for (var k = 0; k < targets.length; k++) {
                if (targets[k].row === i_3 && targets[k].col === j) {
                    Cells[i_3][j].isTargetHere = true;
                }
            }
            if (!Cells[i_3][j].isTargetHere && !Cells[i_3][j].isAgentHere && walls[i_3][j]) {
                Cells[i_3][j].isWallHere = true;
            }
        }
    }
    squareLength = floor(canvasWidth / gridCol);
}
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
            for (var i_4 = 0; i_4 < neighbors.length; i_4++) {
                neighbors[i_4].previousCell = expandNode;
                agent.queueOfCells.enqueue(neighbors[i_4]);
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