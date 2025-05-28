window.onload = function () {
  buildGrid();
  generateCells(2, 0);
  tileDirection();
  updateScore();
  updateBestScore();
};

// Функция для создания JS-сетки //
function buildGrid() {
  var game = document.getElementsByClassName("game");
  var grid = document.getElementsByClassName("game-grid");
  var size = 4;
  var table = document.createElement("DIV");

  table.className += "game-grid";
  table.id = " ";
  table.dataset.value = 0;

  for (var i = 0; i < size; i++) {
    var tableRow = document.createElement("DIV");
    table.appendChild(tableRow);
    tableRow.id = "table_row" + (i + 1);
    tableRow.className += "grid-row";

    for (var j = 0; j < size; j++) {
      var tableCell = document.createElement("DIV");
      tableCell.id = "" + (i + 1) + (j + 1);
      tableCell.className += "grid-cells";
      tableRow.appendChild(tableCell);
    }
    document.body.appendChild(table);
  }
  return table;
}

// Функция для создания ячеек //
function generateCells(tileCount, timeOut) {
  for (var i = 0; i < tileCount; i++) {
    for (var value = 1; value < 2; value++) {
      var random1 = Math.floor(Math.random() * 4 + 1);
      var random2 = Math.floor(Math.random() * 4 + 1);
      var check = document.getElementById("" + random1 + random2);
      if (check.innerHTML != "") {
        value = 0;
      }
    }

    var randomNum = Math.floor(Math.random() * 4 + 1);
    if (randomNum == 1) {
      randomNum = 2;
    }
    if (randomNum == 3) {
      randomNum = 4;
    }
    var location = document.getElementById("" + random1 + random2);
    var tile = document.createElement("DIV");
    location.appendChild(tile);

    // Присваивает тайлу значение 2 или 4
    tile.innerHTML = "" + randomNum;

    tileColors(randomNum, tile);
    tile.data = "" + randomNum;
    tile.id = "table_tile" + random1 + random2;
    location.className += " active";
    tile.dataset.value = "" + randomNum;

    // Создание класса тайла для возможности внесения изменений
    if (timeOut == 0) {
      tile.className = "tile " + randomNum;
    } else {
      setTimeout(function () {
        tile.className = "tile " + randomNum;
      }, 10);
    }
  }
}

// Направление тайла с помощью клавиш стрелок //
document.addEventListener("keydown", tileDirection);

function tileDirection(evt) {
  evt = evt || window.event;
  // Стрелка вверх
  if (evt.keyCode == "38") {
    var count = 2;
    for (var i = 2; i > 1; i--) {
      for (var j = 1; j < 5; j++) {
        tileMovement(i, j, -1, 0, 1, 0);
      }
      if (i == 2) {
        i += count;
        count++;
      }
      if (count > 4) {
        break;
      }
    }
    resetCells();
  }

  // Стрелка вниз
  else if (evt.keyCode == "40") {
    var count = -2;
    for (var i = 3; i < 4; i++) {
      for (var j = 1; j < 5; j++) {
        tileMovement(i, j, 1, 0, 4, 0);
      }
      if (i == 3) {
        i += count;
        count--;
      }
      if (count < -4) {
        break;
      }
    }
    resetCells();
  }

  // Стрелка влево
  else if (evt.keyCode == "37") {
    var count = 2;
    for (var i = 2; i > 1; i--) {
      for (var j = 1; j < 5; j++) {
        tileMovement(j, i, 0, -1, 0, 1);
      }
      if (i == 2) {
        i += count;
        count++;
      }
      if (count > 4) {
        break;
      }
    }
    resetCells();
  }

  // Стрелка вправо
  else if (evt.keyCode == "39") {
    var count = -2;
    for (var i = 3; i < 4; i++) {
      for (var j = 1; j < 5; j++) {
        tileMovement(j, i, 0, 1, 0, 4);
      }
      if (i == 3) {
        i += count;
        count--;
      }
      if (count < -4) {
        break;
      }
    }
    resetCells();
  }
}

// Перемещение плитки //
function tileMovement(x, y, X, Y) {
  var tile = document.getElementById("table_tile" + x + y);
  this.check = document.getElementById("" + x + y);
  var xVar = x + X;
  var yVar = y + Y;

  // Проверка сетки, чтобы убедиться, что это 4x4 сетка
  if (
    xVar > 0 &&
    xVar < 5 &&
    yVar > 0 &&
    yVar < 5 &&
    this.check.className == "grid-cells active"
  ) {
    var around = document.getElementById("" + xVar + yVar);

    if (around.className == "grid-cells active") {
      var aroundTile = document.getElementById("table_tile" + xVar + yVar);

      if (aroundTile.innerHTML == tile.innerHTML) {
        var value = tile.dataset.value * 2;
        aroundTile.dataset.value = "" + value;
        aroundTile.className = "tile " + value;
        aroundTile.innerHTML = "" + value;
        tileColors(value, aroundTile);
        this.check.removeChild(tile);
        this.check.className = "grid-cells";
        around.className = "grid-cells active merged";
        document.getElementsByClassName("game-grid").id = "moved";
        document.getElementsByClassName("game-grid").className =
          "game-grid " + value;

        // Берёт сумму объединённых плиток и добавляет эту сумму к очкам в верхней части страницы
        var gameGrid = document.getElementById(" ");
        var scoreVal = parseInt(gameGrid.dataset.value);
        var updatedScore = value + scoreVal;

        gameGrid.dataset.value = updatedScore;
        var score = document.getElementById("value");
        score.innerHTML = "" + updatedScore;

        var best = document.getElementById(" ");
        var bestVal = parseInt(best.dataset.value);
        var updatedBest = bestVal;
        best.dataset.value = updatedBest;
        var bestScore = document.getElementById("best");
        bestScore.innerHTML = "" + updatedBest;

        updateBestScore();
      }
    } else if (around.className == "grid-cells") {
      around.appendChild(tile);
      around.className = "grid-cells active";
      tile.id = "table_tile" + xVar + yVar;
      this.check.className = "grid-cells";
      document.getElementsByClassName("game-grid").id = "moved";
    }
  }
}
// Функция для обработки свайпов
function setupSwipe() {
  let touchStartX = 0;
  let touchStartY = 0;
  const gameArea = document.querySelector('.game-board');

  gameArea.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
  }, { passive: false });

  gameArea.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });

  gameArea.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);
    
    // Определяем направление свайпа
    if (Math.max(absDiffX, absDiffY) > 30) { // Порог чувствительности
      if (absDiffX > absDiffY) {
        // Горизонтальный свайп
        if (diffX > 0) {
          simulateKeyPress(39); // Вправо
        } else {
          simulateKeyPress(37); // Влево
        }
      } else {
        // Вертикальный свайп
        if (diffY > 0) {
          simulateKeyPress(40); // Вниз
        } else {
          simulateKeyPress(38); // Вверх
        }
      }
    }
  }, { passive: false });
}

// Симуляция нажатия клавиши
function simulateKeyPress(keyCode) {
  const event = new KeyboardEvent('keydown', {
    keyCode: keyCode,
    which: keyCode,
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}

// Обработка кнопок управления
function setupMobileControls() {
  document.getElementById('up').addEventListener('click', () => simulateKeyPress(38));
  document.getElementById('down').addEventListener('click', () => simulateKeyPress(40));
  document.getElementById('left').addEventListener('click', () => simulateKeyPress(37));
  document.getElementById('right').addEventListener('click', () => simulateKeyPress(39));
  
  // Добавляем обработку долгого нажатия
  const buttons = document.querySelectorAll('.control-btn');
  buttons.forEach(btn => {
    btn.addEventListener('touchstart', function(e) {
      this.isPressed = true;
      const direction = this.id;
      const simulate = () => {
        if (this.isPressed) {
          switch(direction) {
            case 'up': simulateKeyPress(38); break;
            case 'down': simulateKeyPress(40); break;
            case 'left': simulateKeyPress(37); break;
            case 'right': simulateKeyPress(39); break;
          }
          setTimeout(simulate, 150); // Повтор каждые 150мс
        }
      };
      simulate();
      e.preventDefault();
    });
    
    btn.addEventListener('touchend', function(e) {
      this.isPressed = false;
      e.preventDefault();
    });
    
    btn.addEventListener('touchcancel', function() {
      this.isPressed = false;
    });
  });
}

// Инициализация сенсорного управления
window.addEventListener('load', function() {
  setupSwipe();
  setupMobileControls();
});

function resetCells() {
  let count = 0;
  
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      const cell = document.getElementById(`${i}${j}`);

      if (cell.innerHTML != "") {
        count++;
      } else {
        cell.className = "grid-cells"
      }
      
      if (cell.className == "grid-cells active merged") cell.className = "grid-cells active";
    }
  }

  if (count == 16) {
    document.getElementById("lose").style.opacity = "1";
    document.getElementById("restart").style.opacity = "1";
  } else if (document.getElementsByClassName("game-grid").id == "moved") {
    generateCells(1, 1);
  }
}

function updateScore(additionalScore = 0) {
  const gameGrid = document.querySelector(".game-grid");
  let scoreVal = parseInt(gameGrid.dataset.value) || 0;
  scoreVal += additionalScore;
  gameGrid.dataset.value = scoreVal;

  document.getElementById("value").innerHTML = scoreVal;
  updateBestScore();
}

function updateBestScore() {
  const gameGrid = document.querySelector(".game-grid");
  let scoreVal = parseInt(gameGrid.dataset.value) || 0;
  let bestScore = localStorage.getItem("highScore") || 0;

  if (scoreVal > bestScore) {
    localStorage.setItem("highScore", scoreVal);
    bestScore = scoreVal;
  }

  document.getElementById("best").innerHTML = bestScore;
}

// Стилизация для всех различных плиток
function tileColors(value, tile) {
  const colors = {
    2: { background: "#E1F5FE", color: "black" },
    4: { background: "#B3E5FC", color: "black" },
    8: { background: "#81D5FA", color: "black" },
    16: { background: "#4FC2F8", color: "white" },
    32: { background: "#03a9f5", color: "white" },
    64: { background: "#0288d1", color: "white" },
    128: { background: "#00579c", color: "white", fontSize: "50px" },
    256: { background: "#e0c3fc", color: "black", fontSize: "50px" },
    512: { background: "#dab6fc", color: "black", fontSize: "50px" },
    1024: { background: "#bbadff", color: "white", fontSize: "40px" },
    2048: { background: "#9b93fc", color: "white", fontSize: "40px" },
    4096: { background: "#8e6bf2", color: "white", fontSize: "40px" }
  };

  const tileStyle = colors[value];
  tile.style.background = tileStyle.background;
  tile.style.color = tileStyle.color;
  if (tileStyle.fontSize) {
    tile.style.fontSize = tileStyle.fontSize;
  }
}

// Перезапустить игру
function restart() {
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      const cell = document.getElementById(`${i}${j}`);
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
      cell.className = "grid-cells";
    }
  }
  document.querySelector(".game-grid").dataset.value = 0;
  updateScore();
  generateCells(2, 0);
  document.getElementById("lose").style.opacity = "0";
  document.getElementById("restart").style.opacity = "0";
}

document.getElementById("restartIcon").addEventListener("click", restart);
document.getElementById("restart").addEventListener("click", restart);
