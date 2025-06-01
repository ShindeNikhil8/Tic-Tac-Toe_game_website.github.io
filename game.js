const button1 = document.querySelector(".btn1");
const page1 = document.querySelector(".page1");
const page2 = document.querySelector(".page2");
const page2Container = document.querySelector(".page2-subpage");
const playerNames = document.querySelector(".naming");
const computerBtn = document.querySelector(".computer");
const friendBtn = document.querySelector(".friend");
const playButton = document.querySelector('.playGame');
const playButtonComp= document.querySelector('.playGameComp');
const balloons1 = document.querySelector(".balloons1");
const balloons2 = document.querySelector(".balloons2");

const page3 =document.querySelector(".page3");
const boxes = document.querySelectorAll(".boxes");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

initialfun();


function initialfun()
{
    page1.classList.add("active");
}

function openPage2()
{
    bgGallery.classList.remove("active");
    page1.classList.remove("active");
    page2.classList.add("active");
    page2Container.classList.add("active");
    settingbtn.classList.add("active");
}


button1.addEventListener("click", openPage2);

//---------------------------------------------------------------------

const player1=document.querySelector("#player1");
const player2=document.querySelector("#player2");
const player1Comp = document.querySelector("#player1Comp");

// function getPlayer1Name()
// {
//     let player=document.querySelector("#player1").value;
//     player1=player;
// }

// function getPlayer2Name()
// {
//     let player=document.querySelector("#player2").value;
//     player2=player;
// }

let currentMode = ""; 

friendBtn.addEventListener("click",() =>{
    currentMode ="friend";
    openNamingFunction();
});

function openNamingFunction()
{
    page2Container.classList.remove("active");
    playerNames.classList.add("active");
    settingbtn.classList.remove("active");
    playButton.classList.remove('active'); // hide play button initially
    player1.value = "";
    player2.value = "";
}
player1Comp.addEventListener("input",checkNames);
player1.addEventListener("input",checkNames);
player2.addEventListener("input",checkNames);

function checkNames()
{
    console.log(currentMode);
    if (currentMode === "computer") {
        if (player1Comp.value.trim() !== "") {
            console.log("hi");
            playButtonComp.classList.add('active');
        } else {
            playButtonComp.classList.remove('active');
        }
    } else if (currentMode === "friend") {
        if (player1.value.trim() !== "" && player2.value.trim() !== "") {
            playButton.classList.add('active');
        } else {
            playButton.classList.remove('active');
        }
    }
}



playButton.addEventListener("click",()=>{
    openPage3();
    startCountdownAndInit();
});

playButtonComp.addEventListener("click",()=>{
    openPage3();
    startCountdownAndInit();
});

let player1Name = "";
let player2Name = "";

function openPage3()
{
   if (currentMode === "friend") {
        player1Name = player1.value.trim();
        player2Name = player2.value.trim();
    } else if (currentMode === "computer") {
        player1Name = player1Comp.value.trim();
        player2Name = "Computer";
    }

    page2.classList.remove("active");
    page3.classList.add("active");
    initGame();  
}

/*----------------------------------------------------------------------------------------------------------------------*/
 page3.classList.remove("active");

let isCountdownRunning = false;


let currentPlayer;
let gameGrid;

const winningPositions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//lets create a function to initalize the game
function initGame() {

    isGameOver = false;

    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${player1Name}`;

    // Show both avatars and both names temporarily
    if (p1Name && p2Name && p1Img && p2Img) {
        p1Name.innerText = player1Name;
        p2Name.innerText = player2Name;
        
        p1Img.style.display = "block";
        p2Img.style.display = "block";
        
        setTimeout(() => {
            p2Img.style.display = "none";
            p2Name.innerText = "";
        }, 5000); 
    }

    // Reset grid UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `boxes boxes${index + 1}`;
    });

     gameInfo.classList.remove("winner");
     gameInfo.classList.remove("tie");
}

function startCountdownAndInit() {

    isCountdownRunning = true;

    page3.style.pointerEvents = "none";

    const countdownContainer = document.getElementById("countdownContainer");
    const countdownText = document.getElementById("countdownText");
    const progressCircle = document.querySelector(".progress");
    const rsgText = document.getElementById("rsgText");

    let timeLeft = 5;

    // Show countdown container and text
    countdownContainer.style.display = "flex";
    rsgText.style.display = "block";

    // Initialize the progress circle stroke
    const totalLength = 314; // circumference of circle
    progressCircle.style.strokeDasharray = totalLength;
    progressCircle.style.strokeDashoffset = "0";

    // Set initial text for countdown and RSG text
    countdownText.innerText = timeLeft;
    rsgText.innerText = "Ready";

    const interval = setInterval(() => {
        timeLeft--;

        countdownText.innerText = timeLeft;
        progressCircle.style.strokeDashoffset = totalLength * (1 - timeLeft / 5);

        // Change the RSG text based on timeLeft
        if (timeLeft === 4) {
            rsgText.innerText = ""; // blank between words if you want
        } else if (timeLeft === 3) {
            rsgText.innerText = "Steady";
        } else if (timeLeft === 1) {
            rsgText.innerText = ""; // optional blank before "Go"
        } else if (timeLeft === 0) {
            rsgText.innerText = "Go";
            
        } else if (timeLeft <= 0) {
            clearInterval(interval);

            page3.style.pointerEvents = "auto";
            countdownContainer.style.display = "none";
            rsgText.style.display = "none";

            isCountdownRunning = false; 

            initGame(); // start the game after countdown
        }
    }, 1000);
}





//event listners on the boxes
boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

//things that are present in handleClick function :
/* 1.if condition checks -> box-clicked is empty or not if empty go to step2
     2. make the box unclick i.e now you cannot change the value/you cannot click on it again no chamge will happen
     3. make box-value -> X or O accordingly
     4. change the player if it is A now then chnage to B
     5. swap the turn i.e if A player played then next player B will play
     6. check if player has won or not
*/     

function handleClick(index)
{
    if (isCountdownRunning) return;
    //unclick happen directly by if function i.e if the box is not empty we cant go in the if cond
    if(gameGrid[index] === "")
    {
        boxes[index].style.pointerEvents = "none";
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //swap karo turn ko
        swapTurn();
        //check game over
        checkGameOver();
    }
}

function swapTurn()
{
    
    if(currentPlayer ==="X")
    {
        currentPlayer ="O";
        gameInfo.innerText = `Current Player - ${player2Name}`;

           
        if(p1Name)
        {
            p2Name.innerText = player2Name;
            p1Name.innerText = "";
        }  
        if (p1Img && p2Img) {
            p1Img.style.display = "none";
            p2Img.style.display = "block";
        }

        if (currentMode === "computer") {
            setTimeout(() => {
                computerMove(); // <-- new function
            }, 1000); // small delay to simulate thinking
        }
        
    }
    else{
        currentPlayer = "X";
        gameInfo.innerText = `Current Player - ${player1Name}`;

            
        if(p2Name)
        {
            p1Name.innerText =player1Name;
            p2Name.innerText = "";
        }
        if (p1Img && p2Img) {
            p1Img.style.display = "block";
            p2Img.style.display = "none";
        }

        
          
    }
}

function computerMove() {

    if (isGameOver) return; 

    // Find all empty boxes
    const emptyIndices = gameGrid
        .map((val, idx) => val === "" ? idx : null)
        .filter(idx => idx !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    // Mark the move
    boxes[randomIndex].innerText = currentPlayer;
    boxes[randomIndex].style.pointerEvents = "none";
    gameGrid[randomIndex] = currentPlayer;

    // Check for win or tie
    checkGameOver();

    // Swap back to player
    if (currentPlayer === "O") {
        swapTurn();
    }
}
let isGameOver = false;
function checkGameOver()
{
    let answer = "";
    winningPositions.forEach((position) => {
        //all 3 boxes should be non empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            //check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //if the player has won disable the pointer event so that the next player will not be able to play his move as he lose
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })    

            //now we know X/O is a winner by coloring the line 
            boxes[position[0]].classList.add("win");    
            boxes[position[1]].classList.add("win"); 
            boxes[position[2]].classList.add("win"); 

        }
    });


    //if we got the winner
    if(answer !== "")
    {

        let winnerName = answer === "X" ? player1Name : player2Name;
        gameInfo.innerText = `Winner Player - ${winnerName} `;
        gameInfo.classList.add("winner");
        if(winnerName==player1Name)
        {
            p1Img.style.display="block";
            p1Name.innerText=player1Name;
            p2Img.style.display="none";
            p2Name.innerText="";
            balloons1.classList.add("active");
            launchBalloons(balloons1);
        }
        else{
            p2Img.style.display="block";
            p2Name.innerText=player2Name;
            p1Img.style.display="none";
            p1Name.innerText="";
            balloons2.classList.add("active");
            launchBalloons(balloons2);
        }
        newGameBtn.classList.add("active");
        isGameOver=true;
        return;
    }

    //lets check when there is no winner i.e tie
    let fillCount =0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    //board is filled, game is tied
    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied !";
        gameInfo.classList.add("tie");
        newGameBtn.classList.add("active");
        p2Img.style.display="block";
        p2Name.innerText=player2Name;
        p1Img.style.display="block";
        p1Name.innerText=player1Name;
        isGameOver=true;
    }

}

newGameBtn.addEventListener("click",initGame);
newGameBtn.addEventListener("click",startCountdownAndInit);



const bgGallery = document.querySelector(".BgGallery");
const settingbtn = document.querySelector(".settingImg");
const backbtn = document.querySelector(".back");
const settingOptions = document.querySelector(".chooseOptions");
const backGroundOption = document.querySelector(".Background");
const AvtarOption = document.querySelector(".Avtar");
const backOptionbtn = document.querySelector(".backOption");
const backOptionbtn2 = document.querySelector(".backOption2");
const backOptionbtn3 = document.querySelector(".backOption3");
const backOptionbtn4 = document.querySelector(".backOption4");
const avtarContainer = document.querySelector(".avtarsContainer");
const backAvtarBtn = document.querySelector(".backAvtarBtn");

backbtn.addEventListener("click",backToSettingOptions);
backOptionbtn.addEventListener("click",backToppage2Container);
backOptionbtn2.addEventListener("click",() =>
{
    page1.classList.add("active");
    page2.classList.remove("active");
});
backOptionbtn3.addEventListener("click",() =>
{
    page2Container.classList.add("active");
    settingbtn.classList.add("active");
    playerNames.classList.remove("active");
});
backOptionbtn4.addEventListener("click",() =>
{
    page2Container.classList.add("active");
    settingbtn.classList.add("active");
    namingComp .classList.remove("active");
});
AvtarOption.addEventListener("click",openAvtars);                 
backGroundOption.addEventListener("click",openBg);
backAvtarBtn.addEventListener("click",backToSettingOptions2);

function backToSettingOptions()
{
    bgGallery.classList.remove("active");
    settingOptions.classList.add("active");
}

function backToSettingOptions2()
{
    avtarContainer.classList.remove("active");
    settingOptions.classList.add("active");
}

function backToppage2Container()
{
    setTimeout(() => {
        settingOptions.classList.remove("active");
        page2Container.classList.add("active");
        settingbtn.classList.add("active");
    }, 200);
}

function openSetting()
{
    setTimeout(() => {
        settingOptions.classList.add("active");
        page2Container.classList.remove("active");
        settingbtn.classList.remove("active");
    }, 550);
}



function selectBackground(event) {
     const selectedSrc = event.target.src;

    // Update page3 background
    page3.style.backgroundImage = `url('${selectedSrc}')`;
    page3.style.backgroundSize = "cover";
    page3.style.backgroundPosition = "center";

    // Remove 'selected' class from all images
    const allImages = document.querySelectorAll('.BgGallery img');
    allImages.forEach(img => img.classList.remove('selected'));

    // Add 'selected' class to the clicked image
    event.target.classList.add('selected');

    // Optional feedback message
    const msg = document.getElementById("bg-msg");
    if (msg) {
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.display = "none";
        }, 1500);
    }   
}


function openBg()
{
    bgGallery.classList.add("active");
    settingOptions.classList.remove("active");
}


function openAvtars()
{
    avtarContainer.classList.add("active");
    settingOptions.classList.remove("active");
}


const p1Img = document.querySelector(".p1Img");
const p2Img = document.querySelector(".p2Img");
const p1Name = document.querySelector(".p1Name");
const p2Name = document.querySelector(".p2Name");


function selectAvtar(event) {
    const selectedSrc = event.target.src;

    // Update Player 1 avatar on page3
    const p1Img = document.querySelector('.p1Img');
    p1Img.src = selectedSrc;

    // Remove 'selected' class from all Player 1 avatar images
    const allImages = document.querySelectorAll('.p1 img');
    allImages.forEach(img => img.classList.remove('selected'));

    // Add 'selected' class to the clicked image
    event.target.classList.add('selected');

    const msg = document.getElementById("img-msg");
    if (msg) {
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.display = "none";
        }, 1500);
    }
}


function selectAvtar2(event) {
    const selectedSrc = event.target.src;

    // Update Player 1 avatar on page3
    const p2Img = document.querySelector('.p2Img');
    p2Img.src = selectedSrc;

    // Remove 'selected' class from all Player 1 avatar images
    const allImages = document.querySelectorAll('.p2 img');
    allImages.forEach(img => img.classList.remove('selected'));

    // Add 'selected' class to the clicked image
    event.target.classList.add('selected');

    const msg = document.getElementById("img-msg");
    if (msg) {
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.display = "none";
        }, 1500);
    }
}


const close= document.querySelector(".Close");
close.addEventListener("click",() => {
    document.querySelector(".close-para").classList.add("active");
    setTimeout(()=>{
        page1.classList.add("active");
        page3.classList.remove("active");
        page2.classList.remove("active");
        playerNames.classList.remove("active");
        namingComp.classList.remove("active");
    },500);
});


//----------------------------------------------------------------------------------------------------------------------

const namingComp = document.querySelector(".namingComp");

computerBtn.addEventListener("click", ()=>{
    currentMode = "computer";
    openNamingFunctionComp();
} );


function openNamingFunctionComp()
{
   page2Container.classList.remove("active");
    namingComp.classList.add("active");
    settingbtn.classList.remove("active");
    playButtonComp.classList.remove('active'); // hide play button initially
    player1Comp.value = ""; // reset
}


function launchBalloons(container) {
    const balloons = container.querySelectorAll("img");
    const directions = ["-100px", "-50px", "0px", "50px", "100px"];
    const startLeftOffsets = [0, 40, 80, 120, 160]; // spacing apart

    balloons.forEach((balloon, index) => {
        // spacing apart horizontally
        balloon.style.left = `${startLeftOffsets[index]}px`;

        // reset animation
        balloon.style.animation = "none";
        balloon.offsetHeight; // trigger reflow

        // set fly direction
        balloon.style.setProperty('--x', directions[index]);

        // animation and delay
        balloon.style.animation = `flyUp 3s ease-in-out forwards`;
        balloon.style.animationDelay = `${index * 0.3}s`;
        balloon.style.opacity = "1";
    });

    setTimeout(() => {
        container.classList.remove("active");
    }, 5000);
}
