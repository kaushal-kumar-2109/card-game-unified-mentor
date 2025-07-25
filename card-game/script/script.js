//  -------------------------------------------  get the element fron the html  -------------------------------------------  
const board=document.getElementById('board');
const resultboard=document.getElementById('resultboard');
const card_container = document.getElementById('card_container');
const totalMoves=document.getElementById('totalMoves');
const bestscore=document.getElementById("bestscore");
const totalTime=document.getElementById("totalTime");
const bestTimeScore=document.getElementById('bestTimeScore');
// "aceofspades","jackofspades","kingofspades","queenofspades",
// "aceofdiamonds","jackofdiamonds","kingofdiamonds","queenofdiamonds"
const card=["aceofclubs","jackofclubs","kingofclubs","queenofclubs","aceofhearts","jackofhearts","kingofhearts","queenofhearts",
    "aceofclubs","jackofclubs","kingofclubs","queenofclubs","aceofhearts","jackofhearts","kingofhearts","queenofhearts"
]

// -------------------------------------------  game variable  -------------------------------------------  
let privious=false;
let cards,movecount,cards_left,second,minute,hours,timeintervel;
//  -------------------------------------------  game variable end ! -------------------------------------------  


//  -------------------------------------------  finction for the startGame  ------------------------------------------- 
// call by the html start button  
const startGame=()=>{// ====> Step : 1
    movecount=0;
    cards_left=16;
    cards=structuredClone(card);// hard copy of the orginal card set 
    resultboard.style.display='none';
    placeCards();// ====> Step : 2
}
//  -------------------------------------------  startGame function end !  -------------------------------------------  


//  -------------------------------------------   placeCards function   -------------------------------------------  
const placeCards=()=>{
    // create random card and place randomly 
    for(let i=0;i<card.length;i++){
        let index=Math.floor(Math.random() * cards.length);
        let getacrd=cards.splice(index,1)[0];
        let div=document.createElement('div');
        div.setAttribute("class","card");
        div.setAttribute("id",`${getacrd}${i}`);
        div.setAttribute("name",getacrd);
        div.innerHTML=`<img src="./assets/cardpic/${getacrd}.png" alt="${getacrd}">`;
        card_container.appendChild(div);
    }
    setCards();// ====> Step : 3
    startTimmer();// ====> Step : 4
}
//  -------------------------------------------  placeCards function end !  -------------------------------------------  


//  -------------------------------------------   setCards function   -------------------------------------------  
const setCards=()=>{
    // setting the click function (event to all cards)
    for(let child of card_container.children){
        if(child.getAttribute("class")!="result"){
            child.addEventListener("click",()=>{
                child.classList.add('show');
                checkCards(child);// ====> Step : 4
            });
        }
    }
}
//  -------------------------------------------  setCards function end !  -------------------------------------------  


//  -------------------------------------------   checkCards function   -------------------------------------------  
const checkCards = (cardid)=>{
    // if the card selected is first card 
    if(privious==false){
        privious=cardid;
    }
    // if the card Selected is the second card 
    else{
        // if the card selected is already selected
        if(privious.getAttribute("id")==cardid.getAttribute("id")){
            alert("This card already selected !");
        }
        // if the new card is selected
        else{
            // if the the card area same 
            if(privious.getAttribute("name")==cardid.getAttribute("name")){
                movecount++;
                cards_left=cards_left-2;
                privious=false;
                updateData();// ====> Step : 5
            }
            // if cards are diffrent 
            else{
                movecount++;
                updateData();// ====> Step : 5
                setTimeout(() => {
                    privious.classList.remove("show");
                    cardid.classList.remove('show');
                    privious=false;
                }, 1000);
            }
        }
    }
}
//  -------------------------------------------  checkCards function end !   -------------------------------------------  


//   -------------------------------------------  updateData function   -------------------------------------------  
const updateData=()=>{
    totalMoves.innerHTML=` Moves : ${movecount}`;
    console.log(cards_left);
    // if the card remaing is 0 means all card are open 
    if(cards_left<=0){
        gameOver();// ====> Step : 6
    }
}
//  -------------------------------------------  updateDate funtion end !  -------------------------------------------  


//   -------------------------------------------  gameOver function   -------------------------------------------  
const gameOver = ()=>{
    // remove all cards from the game board 
    for(let child of card_container.children){
        setTimeout(() => {
            console.log(child.getAttribute('class'));
            if(child.getAttribute("class")!="result" || child.getAttribute('class')=="card show" || child.getAttribute('class')=="card" ){
                console.log("remove");
                child.remove();
            }
            
        },500);
    }
    // set the message of gameover and restart game 
    setTimeout(() => {
        // when game is over then timer is also stop 
        clearInterval(timeintervel);// ====> Step : 7
        board.innerHTML=`<button> Game Over Restart !</button>`;
        resultboard.style.display='flex';
        bestscore.innerHTML=`${movecount}`;
        movecount=0;
        bestTimeScore.innerHTML=`<span>${hours}</span>:<span>${minute}</span>:<span>${second}</span>`
        totalMoves.innerHTML=` Moves : ${movecount}`;
    }, 1000);
}
//  -------------------------------------------  gameOver function end !  -------------------------------------------  


//  -------------------------------------------   startTimer function  -------------------------------------------  
// when the game is started the the timer also start 
const startTimmer=()=>{
    second=0;
    minute=0;
    hours=0;

    timeintervel=setInterval(() => {
        second++;
        if(second>60){
            second=0;
            minute++;
        }
        if(minute>60){
            minute=0;
            hours++;
        }
        totalTime.innerHTML=`Time : ${hours}:${minute}:${second}`;
    }, 1000);
}
//  -------------------------------------------  setTimer function end !  -------------------------------------------  