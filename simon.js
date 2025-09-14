let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "blue"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    console.log(`Flashing button: ${btn.id}`);
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    console.log(`User clicked: ${btn.id}`);
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    console.log(`\n--- Level ${level} ---`);

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.getElementById(randColor);
    gameSeq.push(randColor);
    console.log(`Game sequence so far: ${gameSeq.join(", ")}`);

    gameFlash(randBtn);
}

function checkAns() {
    let idx = userSeq.length - 1;
    console.log(`Checking user input at index ${idx}: ${userSeq[idx]} vs ${gameSeq[idx]}`);

    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct input so far.");
        if (userSeq.length === gameSeq.length) {
            console.log("Full sequence correct. Advancing to next level...");
            setTimeout(levelUp, 1000);
        }
    } else {
        console.log("Wrong input! Game Over.");
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);
        resetGame();
    }
}

function btnPress(event) {
    let btn = event.target;
    let userColor = btn.id;
    userSeq.push(userColor);
    userFlash(btn);
    console.log(`User sequence so far: ${userSeq.join(", ")}`);
    checkAns();
}

function resetGame() {
    console.log("Resetting game...");
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}
