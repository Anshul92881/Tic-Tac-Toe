let boxes=document.querySelectorAll(".box"); //Store all boxes in the variable.
let resetBtn=document.querySelector("#reset-btn"); //Store the reset buttons 
let newGameBtn=document.querySelector("#new-btn"); //Accessing the new-btn id
let msgContainer=document.querySelector(".msg-container"); //Accessing msg-container class
let msg=document.querySelector("#msg"); //Accessing msg id 

//Let there be Two player i.e Player0 and PlayerX.
let turn0=true; //First turn will be of Player0  
let count=0; //To track the no. of total moves

const winPatterns=[ //This is the winning pattern array [2-D array].
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Now we will create Event for Every box.
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box was Clicked."); //Print this statement when the box is clicked.
        //Player0
        if(turn0==true){
            box.innerText="0"; //If the player0 turn then print '0' on clicking the box.
            box.style.color="#0330fc"; 
            turn0=false; //Turn0 will set to false for the next player chance.
        }
        //PlayerX
        else{
            box.innerText="X"; //If turn0 is not true then print 'X'
            box.style.color="Red";
            turn0=true;
        }
//Whenever we click a box and click it again it will change its character to remove this error we will disable the button after once clicked.
        box.disabled=true;
        checkWinner();
        count++; //Counting the moves.
        let isWinner = checkWinner(); 
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// To show Winner on the Screen.
const showWinner=(winner)=>{
    msg.innerText=`Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide"); //
    disabledBoxes();
}

//To Check the Winner through the indexing of 2-D array.
const checkWinner=()=>{
    for(let patterns of winPatterns){
        let pos1Val=boxes[patterns[0]].innerText;
        let pos2Val=boxes[patterns[1]].innerText;
        let pos3Val=boxes[patterns[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("winner",pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};

// To Reset the Game.
const resetGame=()=>{
    let turn0=true; 
    count=0;  
    enabledBoxes(); 
    msgContainer.classList.add("hide"); //Congratulation msg should be hide after clicking the Reset game.
};

//Boxes should be Disabled After winner is announced.
const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

//All the Boxes should be enable for the New Game
const enabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

// Game should be Reset
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

// If the Game is resulted in a Draw
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};