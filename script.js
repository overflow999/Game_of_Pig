(function(){
    'use strict'

    var startGame=document.querySelector('#startgame');
    var gameControl=document.querySelector('#gamecontrol');
    var game=document.querySelector('#game');
    var score=document.querySelector('#score')
    var actionArea=document.querySelector('#actions');
    var gameData={
        dice:['images/1die.jpg','images/2die.jpg','images/3die.jpg','images/4die.jpg','images/5die.jpg','images/6die.jpg'],
        players:['player 1','player 2'],
        score:[0,0],
        roll1:0,
        roll2:0,
        rollsum:0,
        index:0,
        turnsum:0,
        gameEnd:29,

    }
    startGame.addEventListener('click',function(){
        gameControl.innerHTML='<h2>The Game Has Started</h2>'
        gameControl.innerHTML='<button id="quit">Want To Quit?</button>'
        document.querySelector('#quit').addEventListener('click',function(){
            location.reload()
        })
        setupTurn()
    })
    function setupTurn(){
        game.innerHTML=`<p>Roll the dice for ${gameData.players[gameData.index]}</p>`
        actionArea.innerHTML='<button id="roll">Roll The Dice</button>'
        document.querySelector('#roll').addEventListener('click',function(){
           throwDice();
        })
    }

    function throwDice(){
        actionArea.innerHTML=''
        gameData.roll1 = Math.floor(Math.random()*6)+1
        gameData.roll2 = Math.floor(Math.random()*6)+1
        game.innerHTML = `<p>Roll The Dice For ${gameData.players[gameData.index]}</p>`
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}" alt="die">`
        game.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}" alt="die">`
        gameData.rollsum =  gameData.roll1 + gameData.roll2;
        gameData.turnsum += gameData.roll1 + gameData.roll2
        if(gameData.rollsum === 2){
            game.innerHTML='<p>Oh Snap!You got Snake eyes<p/>'
            gameData.score[gameData.index]=0;
            gameData.index ? (gameData.index=0 ):( gameData.index = 1)

            ShowcurrentScore();

            setTimeout(setupTurn,2000)
        } else if(gameData.roll1 ===1 || gameData.roll2 === 1){
            gameData.score[gameData.index]= gameData.score[gameData.index] - gameData.turnsum
            gameData.index ? (gameData.index=0 ):( gameData.index = 1)
            game.innerHTML=`<p>You rolled a 1,switching to ${gameData.players[gameData.index]}</p>`
            setTimeout(setupTurn,2000)
        }

        else{
             gameData.score[gameData.index]=gameData.score[gameData.index] + gameData.rollsum;
            actionArea.innerHTML='<button id="rollagain"> Roll Again</button> or <button id="pass">Pass</button>';
             document.querySelector('#rollagain').addEventListener('click',function(){           
                throwDice();
             });
             document.querySelector('#pass').addEventListener('click',function(){
                gameData.index ? (gameData.index=0 ):( gameData.index = 1);
                setupTurn();
             });
        }
        CheckingwinningCondition();
    }
    
    function CheckingwinningCondition(){
        if(gameData.score[gameData.index]>gameData.gameEnd){
          score.innerHTML = `<h2>Player ${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points</h2>`
          actionArea.innerHTML='';
          document.querySelector('#quit').innerHTML='Start a new Game'
        
        }
        else{
          ShowcurrentScore();
        }
    }
    function ShowcurrentScore(){
        score.innerHTML = `<p>The score for <strong> ${gameData.players[0]} is ${gameData.score[0]} </strong> 
        and the score for <strong> ${gameData.players[1]} is  ${gameData.score[1]}</p>`
    }

}())