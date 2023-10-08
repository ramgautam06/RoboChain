//Array to trace indices
let gridData = [];

// const variables
const numRows = 10;
const numCols = 10;
const robotIndex = 0;
const unitTravelVechain = 0.01;

//TextBox
var textbox = document.getElementById("myTextbox");

//Robot Coordinates
xRobot = 0;
yRobot = 0;

//Task Map
let robotTasksMap = new Map([
  [1, "Change Diaper"],
  [2, "Feed Milk"],
  [3, "Play with Baby"],
  [4, "Sing for Baby"],
  [5, "Dance for Baby"],
  [6, "Tell Story for Baby"],
  [7, "No Task"],
]);

//Cost Map
let robotCostMap = new Map([
  [1, 2],
  [2, 1],
  [3, 0.5],
  [4, 0.5],
  [5, 0.8],
  [6, 1],
  [7, 0],
]);

function btnCreateGrid() {
  // Create a 2D array and store data in it
  const grid = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numCols);
    for (let j = 0; j < numCols; j++) {
      grid[i][j] = i * numCols + j + 1;
    }
  }

  // Store the 2D array data in the global array
  gridData = grid;
  var gridContainer = document.getElementById("gridContainer");
  gridContainer.innerHTML = "";
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      var gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.textContent = " ";
      gridContainer.appendChild(gridItem);
    }
  }

  // set robot position
  setRobotGrid(robotIndex);

  // set baby position
  setBabyPosition();
}

//Computing cost of task and travel
function btnComputeCost() {
  let min = 1;
  let max = 7;
  let taskId = Math.floor(Math.random() * (max - min + 1)) + min;

  //coordinates robot position, coordinates baby position
  let totalCost =
    workDoneCost(taskId) +
    travelCost(babyCoordinates()[0], babyCoordinates()[1], xRobot, yRobot);
  textbox.value = totalCost.toString();
}

/**
 * Local Functions
 **/
function setRobotGrid(robotIndex) {
  var gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(function (item, index) {
    if (index === robotIndex) {
      item.textContent = "R";
    }
  });
}

//set the baby position
function setBabyPosition() {
  var min = 1;
  var max = 100;
  var babyPosition = Math.floor(Math.random() * (max - min + 1)) + min;

  var gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(function (item, index) {
    if (index === babyPosition) {
      item.textContent = "B";
    }
  });
}

// compute the distance
function travelCost(x1, y1, x2, y2) {
  const manhattanDis =
    Math.abs(parseInt(x2) - parseInt(x1)) +
    Math.abs(parseInt(y2) - parseInt(y1));
  console.log("Manhatan Distance " + manhattanDis * unitTravelVechain);
  return manhattanDis * unitTravelVechain;
}

function workDoneCost(taskId) {
  let cost = 0;
  switch (taskId) {
    case 1:
      cost = robotCostMap.get(1);
      break;
    case 2:
      cost = robotCostMap.get(2);
      break;
    case 3:
      cost = robotCostMap.get(3);
      break;
    case 4:
      cost = robotCostMap.get(4);
      break;
    case 5:
      cost = robotCostMap.get(5);
      break;
    case 6:
      cost = robotCostMap.get(6);
      break;
    case 7:
      cost = robotCostMap.get(7);
      break;
    default:
      cost = 0;
  }
  return cost;
}

// location where baby
function babyCoordinates() {
  //Getting Index of the baby
  let indexToCoordinate = null;
  var gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(function (item, index) {
    // console.log(item.textContent);
    if (item.textContent === "B") {
      console.log("Index Coordinates are: " + index);
      indexToCoordinate = index;
    }
  });

  //Getting the coordinates of the baby
  let count = 0;
  var coordinateList = [];
  var isBreak = false;
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      count = count + 1;
      if (count === indexToCoordinate) {
        coordinateList.push(i);
        coordinateList.push(j);
        console.log("The vaue of i is " + i);
        console.log("The vaue of j is " + j);
        isBreak = true;
        break;
      }
    }
    if (isBreak) {
      break;
    }
  }
  return coordinateList;
}

/**
 * Local Functions Done
 */

/** ------ STARTING  VECHIAN HERE ------ */
