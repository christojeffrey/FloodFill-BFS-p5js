var Agent = (function () {
    function Agent(row, col) {
        this.row = row;
        this.col = col;
        this.queueOfCells = new Queue();
    }
    Agent.prototype.doBFSNextLayer = function () {
        var nodeInThisLayer = [];
        while (this.queueOfCells.size() > 0) {
            nodeInThisLayer.push(this.queueOfCells.dequeue());
        }
        for (var i = 0; i < nodeInThisLayer.length; i++) {
            var expandNode = nodeInThisLayer[i];
            if (!expandNode.visited) {
                expandNode.visited = true;
                var neighbors = expandNode.getUnvisitedNeighbors();
                for (var i_1 = 0; i_1 < neighbors.length; i_1++) {
                    neighbors[i_1].previousCell = expandNode;
                    this.queueOfCells.enqueue(neighbors[i_1]);
                }
                if (expandNode.isTargetHere) {
                    console.log("found target");
                    var current = expandNode;
                    while (current.previousCell) {
                        current.isPartOfPath = true;
                        current = current.previousCell;
                    }
                }
            }
        }
    };
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
        this.isPartOfPath = false;
        this.previousCell = null;
    }
    Cell.prototype.draw = function () {
        push();
        if (this.isWallHere) {
            fill(0);
        }
        else {
            if (this.isPartOfPath) {
                fill(255, 255, 0);
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
        pop();
        if (this.isAgentHere) {
            this.highlightAsAgent();
        }
        if (this.isTargetHere) {
            this.highlightAsTarget();
        }
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
    Cell.prototype.getUnvisitedNeighbors = function () {
        var neighbors = [];
        var row = this.row;
        var col = this.col;
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
function setGlobalVariables() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    squareLength = 50;
    agentCount = 1;
    targetCount = 1;
    gridCol = floor(canvasWidth / squareLength);
    gridRow = floor(canvasHeight / squareLength);
    console.log(gridCol, gridRow);
    for (var i_2 = 0; i_2 < gridRow; i_2++) {
        Cells[i_2] = [];
        for (var j = 0; j < gridCol; j++) {
            Cells[i_2][j] = new Cell(i_2, j);
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
    for (var i_3 = 0; i_3 < gridRow; i_3++) {
        walls[i_3] = [];
        for (var j = 0; j < gridCol; j++) {
            var wallPercentage = 0.3;
            walls[i_3][j] = !(Math.random() > wallPercentage);
        }
    }
    for (var i_4 = 0; i_4 < gridRow; i_4++) {
        for (var j = 0; j < gridCol; j++) {
            for (var k = 0; k < agents.length; k++) {
                if (agents[k].row === i_4 && agents[k].col === j) {
                    Cells[i_4][j].isAgentHere = true;
                }
            }
            for (var k = 0; k < targets.length; k++) {
                if (targets[k].row === i_4 && targets[k].col === j) {
                    Cells[i_4][j].isTargetHere = true;
                }
            }
            if (!Cells[i_4][j].isTargetHere && !Cells[i_4][j].isAgentHere && walls[i_4][j]) {
                Cells[i_4][j].isWallHere = true;
            }
        }
    }
}
function setup() {
    setGlobalVariables();
    createCanvas(canvasWidth, canvasWidth);
    var startButton = createButton("Start");
    startButton.position(50, gridRow * squareLength);
    startButton.mousePressed(function () {
        for (var i = 0; i < gridRow; i++) {
            for (var j = 0; j < gridCol; j++) {
                Cells[i][j].visited = false;
                Cells[i][j].isPartOfPath = false;
                for (var k = 0; k < agents.length; k++) {
                    agents[k].queueOfCells.clear();
                    agents[k].queueOfCells.enqueue(Cells[agents[k].row][agents[k].col]);
                }
            }
        }
    });
    frameRate(10);
}
function draw() {
    background(255);
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
        agents[i].doBFSNextLayer();
    }
}
//# sourceMappingURL=build.js.map