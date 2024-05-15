const GameLoad = {};
class GameRow {
  constructor(leftSideWidth, roadWith, trap, gold, sideColor) {
    this.leftSide = leftSideWidth;
    this.road = roadWith;
    this.rightSide = 1 - roadWith - leftSideWidth;
    this.trap = trap;
    this.gold = gold;
    this.sideColor = sideColor;
  }
}
class Game {
  constructor() {
    this.map = [];

    this.isPaused = true;
    this.isOver = false;

    this.roadSide = "white";

    this.ROAD_WIDTH = 0.4;
    this.ROW_COUNT = 10;
    this.STEP_WIDTH = 0.005;
    this.TRAP_ODDS = 0.05;
    this.TRAP_SIZE = 0.15;
    this.INCREASE_TRAP_ODDS_BY = 0.025;

    this.GOLD_ODDS = 0.1;
    this.GOLD_SIZE = 0.1;

    this.trapCount = 0;
    this.leftSide = 0.3;
    this.rowsWithoutTrap = -10;
    this.directionIsLeft = this.getIsLeftDirection();
    this.directionSteps = this.getDirectionSteps();

    this.score = 0;

    this.generateMap();
  }

  generateMap() {
    while (this.map.length < this.ROW_COUNT) {
      this.generateRow();
    }
  }

  generateRow() {
    let trap = false;
    let gold = false;

    if (this.directionIsLeft) {
      this.leftSide = this.leftSide - this.STEP_WIDTH;
    } else {
      this.leftSide = this.leftSide + this.STEP_WIDTH;
    }
    this.directionSteps--;

    if (this.directionSteps === 0) {
      this.directionIsLeft = this.getIsLeftDirection();
      this.directionSteps = this.getDirectionSteps();
    }
    if (this.leftSide <= 0.1) {
      this.directionIsLeft = false;
    }
    if (this.leftSide >= 0.9 - this.ROAD_WIDTH) {
      this.directionIsLeft = true;
    }

    this.rowsWithoutTrap++;
    if (this.rowsWithoutTrap > 10 && this.getOdds(this.TRAP_ODDS)) {
      trap = true;
      this.trapCount++;
      this.rowsWithoutTrap = 0;

      if (this.trapCount > 0 && this.trapCount % 3 === 0) {
        this.TRAP_ODDS += this.INCREASE_TRAP_ODDS_BY;
      }
    } else if (this.getOdds(this.GOLD_ODDS)) {
      gold = true;
    }

    this.sideColor = this.sideColor === "white" ? "red" : "white";

    this.map.push(
      new GameRow(this.leftSide, this.ROAD_WIDTH, trap, gold, this.sideColor)
    );
  }

  getIsLeftDirection() {
    return Math.random() < 0.5;
  }

  getDirectionSteps() {
    return Math.floor(Math.random() * 15) + 1;
  }

  getOdds(odds) {
    return Math.random() < odds;
  }
}

GameLoad.load = function () {
  const app = document.querySelector("#app");
  const map = document.querySelector("#map");
  const scoreBoard = document.createElement("div");
  const scoreCounter = document.createElement("span");
  const player = document.createElement("div");
  const outerMenu = document.createElement("div");
  const menu = document.createElement("div");
  const menuTitle = document.createElement("div");
  const personalBestDiv = document.createElement("div");
  const gamesPlayedDiv = document.createElement("div");
  const playGame = document.createElement("div");
  const increasePlayerSensitivity = document.createElement("span");
  const decreasePlayerSensitivity = document.createElement("span");

  let game = new Game();

  const leftButton = document.createElement("button");
  leftButton.id = "left-button";
  leftButton.textContent = "←";
  leftButton.addEventListener("click", () => movePlayerLeft());

  const rightButton = document.createElement("button");
  rightButton.id = "right-button";
  rightButton.textContent = "→";
  rightButton.addEventListener("click", () => movePlayerRight());

  const upButton = document.createElement("button");
  upButton.id = "up-button";
  upButton.textContent = "↑";
  upButton.addEventListener("click", () => movePlayerUp());

  const downButton = document.createElement("button");
  downButton.id = "down-button";
  downButton.textContent = "↓";
  downButton.addEventListener("click", () => movePlayerDown());

  const pauseButton = document.createElement("button");
  pauseButton.id = "pause-button";
  pauseButton.textContent = "||";
  pauseButton.addEventListener("click", () => {
    if (game.isOver) return;
    if (game.isPaused) {
      closeMenu();
    } else {
      playGame.innerHTML = "continue";
      openMenu();
    }
  });

  // Append buttons to the app container
  const controlsContainer = document.createElement("div");
  controlsContainer.classList.add("controls-container");
  controlsContainer.appendChild(leftButton);
  controlsContainer.appendChild(rightButton);
  controlsContainer.appendChild(upButton);
  controlsContainer.appendChild(downButton);
  pauseButton.style.marginBottom = "60px";
  app.appendChild(controlsContainer);
  app.appendChild(pauseButton);

  let PLAYER_SENSITIVITY = window.innerWidth * game.STEP_WIDTH;
  const MIN_BACKGROUND_INTERVAL = 150;
  const MAX_BACKGROUND_INTERVAL = 50;
  const roadColor = "#636164";

  let backgroundInterval;
  let bestScoreCookie = getCookie("bestScore");
  let gamesPlayedCookie = getCookie("gamesPlayed");
  let bestScore = bestScoreCookie === null ? 0 : parseInt(bestScoreCookie);
  let gamesPlayed =
    gamesPlayedCookie === null ? 0 : parseInt(gamesPlayedCookie);

  initialHtmlSetUp();

  // listeners for moving object
  const keyState = {};
  window.addEventListener(
    "keydown",
    function (e) {
      keyState[e.code] = true;
    },
    true
  );
  window.addEventListener(
    "keyup",
    function (e) {
      keyState[e.code] = false;
    },
    true
  );

  // menu listeners
  playGame.addEventListener("click", () => {
    if (game.isOver) {
      continouseHtmlSetUp();
    }
    closeMenu();
  });

  // sensitivity listeners
  decreasePlayerSensitivity.addEventListener("click", () => {
    PLAYER_SENSITIVITY = PLAYER_SENSITIVITY * 0.5;
  });
  increasePlayerSensitivity.addEventListener("click", () => {
    PLAYER_SENSITIVITY = PLAYER_SENSITIVITY * 3;
  });

  // generates background
  function backGroundMover() {
    setTimeout(function () {
      if (!game.isPaused && !game.isOver) {
        generateNewFrame();
        scoreCounter.innerHTML = `${game.score} x `;
      }
      backGroundMover();
    }, backgroundInterval);
  }
  backGroundMover();

  // player movement
  setInterval(() => {
    if (!game.isPaused && !game.isOver) {
      movementLoop();
      checkPlayerLocation();
    }
  }, 10);

  function movementLoop() {
    if (keyState["KeyA"]) {
      movePlayerLeft();
    }
    if (keyState["KeyD"]) {
      movePlayerRight();
    }
    if (keyState["KeyW"]) {
      movePlayerUp();
    }
    if (keyState["KeyS"]) {
      movePlayerDown();
    }
  }

  function checkPlayerLocation() {
    let playerTopLeft = document.elementsFromPoint(
      player.offsetLeft,
      player.offsetTop
    );
    let playerTopRight = document.elementsFromPoint(
      player.offsetLeft + player.offsetWidth,
      player.offsetTop
    );
    let playerBottomLeft = document.elementsFromPoint(
      player.offsetLeft,
      player.offsetTop + player.offsetHeight
    );
    let playerBottomRight = document.elementsFromPoint(
      player.offsetLeft + player.offsetWidth,
      player.offsetTop + player.offsetHeight
    );
    let playerMiddle = document.elementsFromPoint(
      player.offsetLeft + player.offsetWidth / 2,
      player.offsetTop + player.offsetHeight / 2
    );

    if (
      playerTopLeft.find((x) => x.classList.contains("off-road")) ||
      playerTopRight.find((x) => x.classList.contains("off-road")) ||
      playerBottomLeft.find((x) => x.classList.contains("off-road")) ||
      playerBottomRight.find((x) => x.classList.contains("off-road")) ||
      playerMiddle.find((x) => x.classList.contains("off-road"))
    ) {
      endGame();
      return;
    }

    if (
      playerTopLeft.find((x) => x.classList.contains("trap")) ||
      playerTopRight.find((x) => x.classList.contains("trap")) ||
      playerBottomLeft.find((x) => x.classList.contains("trap")) ||
      playerBottomRight.find((x) => x.classList.contains("trap")) ||
      playerMiddle.find((x) => x.classList.contains("trap"))
    ) {
      endGame();
      return;
    }

    document.querySelectorAll(".gold").forEach((gold) => {
      if (
        playerTopLeft.find((x) => x === gold) ||
        playerTopRight.find((x) => x === gold) ||
        playerBottomLeft.find((x) => x === gold) ||
        playerBottomRight.find((x) => x === gold) ||
        playerMiddle.find((x) => x === gold)
      ) {
        gold.remove();
        game.score++;
      }
    });
  }

  function generateNewFrame() {
    game.map.splice(0, 1);
    game.generateRow();

    let elementToBeRemoved = map.lastElementChild;

    map.removeChild(elementToBeRemoved);
    generateRowDiv(
      game.map[game.map.length - 1],
      game.map[game.map.length - 2]
    );
  }

  function endGame() {
    game.isOver = true;
    menuTitle.innerHTML = "Game over";
    playGame.innerHTML = "play";
    bestScore = bestScore < game.score ? game.score : bestScore;
    setCookie("bestScore", bestScore);
    setCookie("gamesPlayed", ++gamesPlayed);

    openMenu();
  }

  function openMenu() {
    personalBestDiv.innerHTML = bestScore;
    gamesPlayedDiv.innerHTML = gamesPlayed;
    outerMenu.style.display = "flex";
    game.isPaused = true;
    app.style.animationPlayState = "paused";
  }

  function closeMenu() {
    outerMenu.style.display = "none";
    game.isPaused = false;
    app.style.animationPlayState = "running";
    menuTitle.innerHTML = "Racing game";
  }

  function playerPositionSetUp() {
    player.style.width =
      ((game.ROAD_WIDTH / 2 - game.TRAP_SIZE / 2) / 2) * 100 + "%";
    player.style.left = window.innerWidth / 2 - player.offsetWidth / 2 + "px";
    player.style.top = window.innerHeight - player.offsetWidth * 2.3 + "px";
  }

  function movePlayerLeft() {
    let x = player.offsetLeft;
    if (x > PLAYER_SENSITIVITY) {
      player.style.left = x - PLAYER_SENSITIVITY + "px";
    }
  }

  function movePlayerRight() {
    let x = player.offsetLeft;
    if (x < window.innerWidth - player.offsetWidth - PLAYER_SENSITIVITY) {
      player.style.left = x + PLAYER_SENSITIVITY + "px";
    }
  }

  function movePlayerUp() {
    let y = player.offsetTop;
    if (y > PLAYER_SENSITIVITY) {
      player.style.top = y - PLAYER_SENSITIVITY + "px";
    }
    setSpeed();
  }

  function movePlayerDown() {
    let y = player.offsetTop;
    if (y < window.innerHeight - player.offsetHeight - PLAYER_SENSITIVITY) {
      player.style.top = y + PLAYER_SENSITIVITY + "px";
    }
    setSpeed();
  }

  function setSpeed() {
    let heightPercentage =
      player.offsetTop / (window.innerHeight - player.offsetHeight);
    backgroundInterval =
      MAX_BACKGROUND_INTERVAL +
      heightPercentage * (MIN_BACKGROUND_INTERVAL - MAX_BACKGROUND_INTERVAL);
    // app.style.animationDuration = 5 + (heightPercentage * (10 - 5)) + "s";
  }

  function initialHtmlSetUp() {
    let goldPhoto = document.createElement("span");
    let sensitivityBox = document.createElement("div");
    let menuLeftBox = document.createElement("div");
    let menuRightBox = document.createElement("div");
    let personalBestDivText = document.createElement("div");
    let gamesPlayedDivText = document.createElement("div");
    let sensitivityBoxText = document.createElement("div");
    let navigationBox = document.createElement("div");
    let navigationBoxText = document.createElement("div");
    let innerMenu = document.createElement("div");
    navigationBoxText.id = "navigation-box";
    scoreCounter.innerHTML = `0 x `;

    playGame.innerHTML = "Play";
    menuTitle.innerHTML = "Racing game";
    decreasePlayerSensitivity.innerHTML = " x0.5 ";
    increasePlayerSensitivity.innerHTML = " x3.0 ";
    personalBestDivText.innerHTML = " High score";
    personalBestDivText.style.marginBottom = "20px";
    gamesPlayedDivText.innerHTML = " Games played";
    gamesPlayedDivText.style.marginBottom = "20px";
    sensitivityBoxText.innerHTML = "  Sensitivity  ";
    sensitivityBoxText.style.marginBottom = "20px";
    decreasePlayerSensitivity.style.marginBottom = "20px";
    increasePlayerSensitivity.style.marginBottom = "20px";
    scoreBoard.style.marginBottom = "20px";
    navigationBoxText.innerHTML = "  Use The WASD Keys For Car Control.";
    navigationBoxText.style.marginBottom = "20px";

    gamesPlayedDiv.style.marginBottom = "20px";
    personalBestDiv.style.marginBottom = "20px";
    scoreBoard.classList.add("score");
    goldPhoto.classList.add("gold");
    goldPhoto.classList.add("gold-counter");
    playGame.classList.add("play-button");
    outerMenu.classList.add("outer-menu");
    menu.classList.add("menu");
    menuTitle.classList.add("title");
    decreasePlayerSensitivity.classList.add("sensitivity-button");
    increasePlayerSensitivity.classList.add("sensitivity-button");
    player.id = "player";
    innerMenu.style.display = "inline-flex";

    sensitivityBox.append(decreasePlayerSensitivity);
    sensitivityBox.append(increasePlayerSensitivity);
    navigationBox.append(navigationBoxText);
    menuLeftBox.appendChild(personalBestDivText);
    menuLeftBox.appendChild(gamesPlayedDivText);
    menuLeftBox.appendChild(sensitivityBoxText);
    menuRightBox.appendChild(personalBestDiv);
    menuRightBox.appendChild(gamesPlayedDiv);
    menuRightBox.appendChild(sensitivityBox);
    innerMenu.appendChild(menuLeftBox);
    innerMenu.appendChild(menuRightBox);
    menu.appendChild(navigationBoxText);

    scoreBoard.appendChild(scoreCounter);
    scoreBoard.appendChild(goldPhoto);
    outerMenu.appendChild(menu);
    menu.append(menuTitle);
    menu.appendChild(innerMenu);
    menu.append(playGame);
    app.prepend(scoreBoard);
    app.prepend(player);
    app.prepend(outerMenu);

    continouseHtmlSetUp();
    openMenu();
  }

  function continouseHtmlSetUp() {
    backgroundInterval = MIN_BACKGROUND_INTERVAL;
    map.innerHTML = "";

    game = new Game();
    for (let i = 0; i < game.map.length; i++) {
      if (i === 0) {
        generateRowDiv(game.map[i], null);
      } else {
        generateRowDiv(game.map[i], game.map[i - 1]);
      }
    }
    playerPositionSetUp();
  }

  function generateRowDiv(gameRow, previousGameRow) {
    const rowDiv = document.createElement("div");
    const leftDiv = document.createElement("div");
    const roadDiv = document.createElement("div");
    const parentRoadDiv = document.createElement("div");
    const rightDiv = document.createElement("div");

    const roadLeftTriangle = document.createElement("div");
    const roadRightTriangle = document.createElement("div");

    let leftRoadSide = document.createElement("div");
    let rightRoadSide = document.createElement("div");

    roadLeftTriangle.style.width = 0;
    roadLeftTriangle.style.height = 0;
    roadRightTriangle.style.width = 0;
    roadRightTriangle.style.height = 0;

    if (previousGameRow !== null) {
      roadLeftTriangle.style.borderLeft =
        window.innerWidth * game.STEP_WIDTH + "px solid transparent";
      if (gameRow.leftSide < previousGameRow.leftSide) {
        roadLeftTriangle.style.borderTop =
          window.innerHeight / game.ROW_COUNT + `px solid ${gameRow.sideColor}`;
      } else {
        roadLeftTriangle.style.borderBottom =
          window.innerHeight / game.ROW_COUNT + `px solid ${gameRow.sideColor}`;
      }

      roadRightTriangle.style.borderRight =
        window.innerWidth * game.STEP_WIDTH + "px solid transparent";
      if (gameRow.leftSide < previousGameRow.leftSide) {
        roadRightTriangle.style.borderBottom =
          window.innerHeight / game.ROW_COUNT + `px solid ${gameRow.sideColor}`;
      } else {
        roadRightTriangle.style.borderTop =
          window.innerHeight / game.ROW_COUNT + `px solid ${gameRow.sideColor}`;
      }
      leftRoadSide = roadRightTriangle.cloneNode(true);
      rightRoadSide = roadLeftTriangle.cloneNode(true);
      leftRoadSide.style.borderRightColor = roadColor;
      rightRoadSide.style.borderLeftColor = roadColor;
    }

    rowDiv.classList.add("row");
    leftDiv.classList.add("off-road");
    rightDiv.classList.add("off-road");
    roadDiv.classList.add("road");
    parentRoadDiv.classList.add("parent-road");

    leftDiv.style.width = gameRow.leftSide * 100 + "%";
    parentRoadDiv.style.width = gameRow.road * 100 + "%";
    rightDiv.style.width = gameRow.rightSide * 100 + "%";
    // rightDiv.style.width =  100 + "%";
    rowDiv.style.height = window.innerHeight / game.ROW_COUNT + "px";

    parentRoadDiv.appendChild(roadLeftTriangle);
    parentRoadDiv.appendChild(leftRoadSide);
    parentRoadDiv.appendChild(roadDiv);
    parentRoadDiv.appendChild(rightRoadSide);
    parentRoadDiv.appendChild(roadRightTriangle);

    if (gameRow.trap) {
      const trapDiv = document.createElement("div");

      const randomTrap = Math.floor(Math.random() * 5) + 1;

      switch (randomTrap) {
        case 1:
          trapDiv.style.content = "url('img/GameImages/f1.1.car.png')";
          break;
        case 2:
          trapDiv.style.content = "url('img/GameImages/f1.3.car.png')";
          break;
        case 3:
          trapDiv.style.content = "url('img/GameImages/f1.4.car.png')";
          break;
        case 4:
          trapDiv.style.content = "url('img/GameImages/f1.5.car.png')";
          break;
        case 5:
          trapDiv.style.content = "url('img/GameImages/f1.6.car.png')";
          break;
        default:
          trapDiv.style.content = "url('img/GameImages/f1.1.car.png')";
      }

      trapDiv.classList.add("trap");
      roadDiv.appendChild(trapDiv);
      let margin = Math.random() * (1 - game.TRAP_SIZE);
      trapDiv.style.marginLeft = margin * 100 + "%";
      // trapDiv.style.width = game.TRAP_SIZE * 100 + "%";
    }

    if (gameRow.gold) {
      const goldDiv = document.createElement("div");
      goldDiv.classList.add("gold");
      roadDiv.appendChild(goldDiv);
      let margin = Math.random() * (1 - game.GOLD_SIZE);
      goldDiv.style.marginLeft = margin * 100 + "%";
      goldDiv.style.width = game.GOLD_SIZE * 100 + "%";
    }

    rowDiv.appendChild(leftDiv);
    rowDiv.appendChild(parentRoadDiv);
    rowDiv.appendChild(rightDiv);
    map.prepend(rowDiv);
  }

  function setCookie(name, val) {
    document.cookie = `${name}=${val}`;
  }

  function getCookie(name) {
    let val = document.cookie;
    let startIndex = val.indexOf(`${name}=`);

    if (startIndex != -1) {
      let endIndex = val.indexOf(";", startIndex);
      endIndex = endIndex !== -1 ? endIndex : val.length;
      val = val.substring(startIndex + name.length + 1, endIndex);
      return val;
    }
    return null;
  }
};
