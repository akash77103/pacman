const width=28
const grid=document.querySelector('.grid')
const scoreDisplay=document.getElementById('score')
let squares=[]
let score=0
//0-pac-dots
// 1-wall
// 2-ghost
// 3-powerPellet
// 4-empty
const layout=[
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

//create board
function createBoard(){
    for(let i=0;i<layout.length;i++){
        const square=document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if(layout[i]===0){
            squares[i].classList.add('pac-dot')
        }
        else if(layout[i]===1){
            squares[i].classList.add('wall')
        }
       else if(layout[i]===3){
            squares[i].classList.add('power-pallet')
        }
        else if(layout[i]===2){
            squares[i].classList.add('ghost-lair')
        }
    }
}
createBoard()

let pacmanCurrentIndexes=490
squares[pacmanCurrentIndexes].classList.add('pacman')

function control(e){
    squares[pacmanCurrentIndexes].classList.remove('pacman')
    switch(e.keyCode){
        case 40:
        console.log('pressed down')
        if(
            !squares[pacmanCurrentIndexes+width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndexes+width].classList.contains('wall') &&
            pacmanCurrentIndexes+width<width*width
        ) pacmanCurrentIndexes+=width
        break
        case 38:
        console.log('pressed up')
        if(
            !squares[pacmanCurrentIndexes-width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndexes-width].classList.contains('wall') &&
            pacmanCurrentIndexes-width>=0) pacmanCurrentIndexes-=width
        break
        case 37:

        console.log('pressed left')
        if(
            !squares[pacmanCurrentIndexes-1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndexes-1].classList.contains('wall') &&
            pacmanCurrentIndexes%width!==0)
             pacmanCurrentIndexes-=1
            if(pacmanCurrentIndexes===364){
                pacmanCurrentIndexes=391
            }
        break
        case 39:
        console.log('pressed right')
        if(
            !squares[pacmanCurrentIndexes+1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndexes+1].classList.contains('wall') &&
            pacmanCurrentIndexes%width<width-1) pacmanCurrentIndexes+=1
            if(pacmanCurrentIndexes===391){
                pacmanCurrentIndexes=364
            }
        break
    }
    squares[pacmanCurrentIndexes].classList.add('pacman')
    pacDoteating()
    powerPallet()
    checkForWin()
    checkForGameOver()
}
 document.addEventListener("keyup",control)

 function pacDoteating(){
    if(squares[pacmanCurrentIndexes].classList.contains('pac-dot')){
        score++
        scoreDisplay.innerHTML=score
        squares[pacmanCurrentIndexes].classList.remove('pac-dot')
        
    }
 }
function powerPallet(){
    if(squares[pacmanCurrentIndexes].classList.contains('power-pallet')){
        score+=10
        ghosts.forEach(ghost=>ghost.isScared=true)
        squares[pacmanCurrentIndexes].classList.remove('power-pallet')
        setTimeout(unScared,10000)
       
    }
}

function unScared(){
    ghosts.forEach(ghost=>ghost.isScared=false)
}


 class Ghost{
    constructor (classname,startIndex,speed){
        this.classname=classname
        this.startIndex=startIndex
        this.speed=speed
        this.currentIndex=startIndex
        this.isScared=false
        this.timerId=NaN
    }
 }
  const ghosts=[
    new Ghost('pinky',348,250),
    new Ghost('blinky',376,250),
    new Ghost('inky',351,300),
    new Ghost('clyde',379,500)
 ]
 ghosts.forEach(ghost=>
    {
    squares[ghost.currentIndex].classList.add(ghost.classname)
squares[ghost.currentIndex].classList.add('ghost')
})
 ghosts.forEach(ghost=>moveGhost(ghost))
 
 function moveGhost(ghost){
    console.log('moved')
    const directions=[-1,+1,-width,+width]
    let direction=directions[Math.floor(Math.random()*directions.length)]
    
    ghost.timerId=setInterval(function(){
        if(
            !squares[ghost.currentIndex+direction].classList.contains('wall') &&
        !squares[ghost.currentIndex+direction].classList.contains('ghost')
    ){
        squares[ghost.currentIndex].classList.remove(ghost.classname)
        squares[ghost.currentIndex].classList.remove('ghost')
        ghost.currentIndex+=direction
        
        squares[ghost.currentIndex].classList.add(ghost.classname)
        squares[ghost.currentIndex].classList.add('ghost')
    }
    else direction=directions[Math.floor(Math.random()*directions.length)] 
    
checkForGameOver()
},ghost.speed)
 }
//  clearInterval(ghost.timerId)

function checkForGameOver(){
if(squares[pacmanCurrentIndexes].classList.contains('ghost')  &&
!squares[pacmanCurrentIndexes].classList.contains('scared-ghost')
)
{
    ghosts.forEach(ghost=>clearInterval(ghost.timerId))
    document.removeEventListener('keyup',control)
    scoreDisplay.innerHTML='You Lose'
}
}

function checkForWin(){
    if(score===274){
        ghosts.forEach(ghost=>clearInterval(ghost.timerId))
        document.removeEventListener('keyup',control)
        scoreDisplay.innerHTML='You win'
    }
}
