//Amount of money
let money = Number(document.getElementById("money").textContent);
const bet_spaces = document.getElementsByClassName("bet_place");
const coin = document.getElementsByClassName("coin");
const dice = document.getElementsByClassName("dice");
const roll = document.getElementById("submit");
const dice_faces = [ "assets\\1.png", "assets\\2.png","assets\\3.png","assets\\4.png","assets\\5.png","assets\\6.png"];
const roll_sound = document.getElementById("sound");

let bet_placed = [];

function reduceMoney(amt, coin){
    money-=amt;
    let coin_val = Number(coin.value);
    coin.value = (coin_val !=0) ? coin_val + amt : amt;
     
    coin.style.visibility = "visible";
}
function coinReset(coin){
    coin.value = 0;
    coin_color(coin);
    coin.style.visibility = "hidden";
}
function bet_bound(){
    if(money<100){
        bet100.disabled=true;
    }
    if(money<50)
    {
        bet50.disabled=true;
    }
    if(money<25)
    {
        bet25.disabled=true;
    }
    if(money<10){
        bet10.disabled=true;
    }
}

function coin_color(coin){
    if(coin.value>9)
    {
        coin.style.borderColor = "blue";
    }
    if(coin.value>24)
    {
        coin.style.borderColor = "green";
    }
    if(coin.value>49)
    {
        coin.style.borderColor = "orange";
    }
    if(coin.value>99)
    {
        coin.style.borderColor = "black";
    }
}
function betting(checkedBet,coin){
    switch(checkedBet.id){
        case "bet5":
            reduceMoney(5,coin);
            bet_bound();
            break;
        case "bet10":
            reduceMoney(10,coin);
            bet_bound();
            if(money<10){
                bet5.checked = true;
            }
            break;
        case "bet25":
            reduceMoney(25,coin);
            bet_bound();
            if(money<25)
            {
                bet10.checked=true;
            }
            break;
        case "bet50":
            reduceMoney(50,coin);
            bet_bound();
            if(money<50)
            {
                bet25.checked=true;
            }
            break;
        case "bet100":
            reduceMoney(100,coin);
            bet_bound();
            
            if(money<100){
                bet50.checked=true;
            }
            break;
    }
}

function roll_animation(dice,delay){
    setTimeout(function(){
        //Changes the images for the dice 
        dice.src = dice_faces[Math.floor(Math.random()*6)];           
    },delay);
    
}
//Function That rolls the dice
function rolling(){
    //Randomizing number
    let rolls = [0,0,0];
    for(let i=0;i<dice.length;i++)
    { 
        //Randomized number, number gets saved to rolls array
        let curr = Math.floor(Math.random()*6)+1;
        rolls[i] = curr;
        
        //Simulates Rolling
        for(let j=0;j<4;j++)
        {
            roll_animation(dice[i],j*300+(j*50));
        }

        //Changes image to right value
        setTimeout(function(){    
            dice[i].src = dice_faces[curr-1];
        },1400);
        
    }
    return rolls;
}
/*
 * 
 *For Placing bets on the board 
 */
for(let i=0; i<bet_spaces.length;i++){

    bet_spaces[i].onclick = function(){
        let checkedBet = document.querySelector('input[name="bets"]:checked');
        betting(checkedBet,coin[i]);
        coin_color(coin[i]);
        bet_placed.push(coin[i]);
        document.getElementById("money").textContent = money;
    }
    coin[i].onclick = function(){
        let checkedBet = document.querySelector('input[name="bets"]:checked');
        betting(checkedBet,coin[i]);
        coin_color(coin[i]);
        bet_placed.push(coin[i]);
        document.getElementById("money").textContent = money;
    }
    

}
/* 
    Rolling Code
*/
submit.onclick = function()
{

    roll_sound.play();
    submit.disabled = true;
    submit.style.color = "yellow";
    submit.style.background = "#3D3D01";
    let win_place;
    let result = rolling();
    let total = result[0]+result[1]+result[2];
    let coin;
    setTimeout(()=>{
        coin = document.getElementById(`${total}c`);
        win_place = document.getElementById(`${total}`);
        win_place.style.color = "black";
        win_place.style.background = "yellow";



        if(coin.value!=0){
        let multiplier = (document.getElementById(`${total}m`).textContent.slice(0,-1));    
        money += coin.value * multiplier;
        console.log("PAYOUT:"+coin.value * multiplier);
        document.getElementById("money").textContent = money;

        coin.value*=multiplier;
    }

    },1800);
    
    setTimeout(()=>{
        for(let i=0;i<bet_placed.length;i++)
        {
            coinReset(bet_placed[i]);
        }
        submit.disabled = false;
        submit.style.color = "#3D3D01";
        submit.style.background = "yellow";
        win_place.style.color = "white";
        win_place.style.background = "#00BE00";

    },3700);
    


    

}
