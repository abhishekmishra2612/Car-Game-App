// Scripting.......

const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");


let keys = { ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false };
let player = { speed: 5 , score: 0 };
let arrImage = ["images/enemycar1.png", "images/enemycar2.png", "images/enemycar3.png", "images/enemycar4.png"];

const isCollide = (a, b) => {
   let aRect = a.getBoundingClientRect();
   let bRect = b.getBoundingClientRect();

   return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))

}

const moveLines = () => {
   let lines = document.querySelectorAll(".lines");
   lines.forEach((item) => {

      if (item.y >= 700) { item.y = -50 }

      item.y += player.speed;
      item.style.top = item.y + "px";

   })
}

const endGame = () => {
   player.start = false;
   startScreen.classList.remove("hide");
   score.classList.add("hide");
   startScreen.innerText = `Game Over \nYour Score is ${player.score}\nClick here to restart the game`;
}

const moveEnemyCars = (car) => {
   let enemyCar = document.querySelectorAll(".enemyCar");
   enemyCar.forEach((item) => {

      if(isCollide(car, item)){
         endGame();
      }

      if (item.y >= 750) { 
         item.y = -400;
         item.style.left = Math.floor(Math.random()*350) + "px";
      }

      item.y += player.speed;
      item.style.top = item.y + "px";

   })
}

const gamePlay = () => {

   let car = document.querySelector(".car");
   let road = gameArea.getBoundingClientRect();

   player.x = car.offsetLeft;
   player.y = car.offsetTop;

   if (player.start) {

      moveLines();
      moveEnemyCars(car);

      if (keys.ArrowUp && player.y > (road.top + 140)) { player.y -= player.speed }
      else if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed }
      else if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
      else if (keys.ArrowRight && player.x < (road.width - 65)) { player.x += player.speed }

      car.style.top = player.y + "px";
      car.style.left = player.x + "px";

      window.requestAnimationFrame(gamePlay);
      player.score++;
      score.innerText = `Score = ${player.score}`;

   }

}

const start = () => {
   gameArea.innerHTML = "";
   startScreen.classList.add("hide");
   score.classList.remove("hide");

   player.start = true;
   player.score = 0;

   window.requestAnimationFrame(gamePlay);

   for (let i = 0; i < 5; i++) {
      let roadLine = document.createElement("div");
      roadLine.setAttribute("class", "lines");
      roadLine.y = i * 150;
      roadLine.style.top = (i * 150) + "px";
      gameArea.appendChild(roadLine);
   }

   let car = document.createElement("div");
   car.setAttribute("class", "car");
   gameArea.appendChild(car);
   
   for (let i = 0; i < 4; i++) {
      let enemyCar = document.createElement("div");
      enemyCar.setAttribute("class", "enemyCar");
      enemyCar.y = ((i+1) * 350)*-1;
      enemyCar.style.top = (i*350) + "px";
      let ind = Math.floor(Math.random()*4);
      enemyCar.style.backgroundImage = `url(${arrImage[ind]})`;
      enemyCar.style.left = Math.floor(Math.random()*350) + "px";
      gameArea.appendChild(enemyCar);
   }

}


const keyDown = (e) => {
   e.preventDefault();
   keys[e.key] = true;

}

const keyUp = (e) => {
   e.preventDefault();
   keys[e.key] = false;

}


startScreen.addEventListener("click", start);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

