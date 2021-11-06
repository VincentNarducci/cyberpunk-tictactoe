let xClass = 'x'
let oClass = 'o'
let winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let squares = document.querySelectorAll('[data-square]')
let game = document.getElementById('game')
let turnMessage = document.querySelector('[data-turn-message]')
let winMessage = document.querySelector('[data-win-message]')
let winner = document.querySelector('winner')
let messages = document.getElementById('messages')
let reset = document.getElementById('reset')
let xturn

ticTacToe()

reset.addEventListener('click', ticTacToe)

function
ticTacToe(){
    game.classList.remove('disable')
    turnMessage.innerHTML = `<span style="color: #fd008a;">X Turn<span>`
    xturn = false;
squares.forEach(square => {
    square.classList.remove(xClass)
    square.classList.remove(oClass)
    square.removeEventListener('click', handleClick)
    square.addEventListener('click', handleClick, { once: true } )
})

gameHoverClass()
messages.classList.remove('show')
}

function handleClick(e) {
    let square = e.target
    let currentClass = xturn ? oClass : xClass
    placeTic(square, currentClass)
    if (isWin(currentClass)){
        gameOver(false)
    } else if (isDraw()){
        gameOver(true)
    } else {
        
    switchTurns()
    switchTurnMessage()
    gameHoverClass()
}
}
function switchTurnMessage(){
    if (xturn == true) {
        turnMessage.innerHTML = `<span style="color: #5ce6ff;">O Turn<span>`
    } else {
        turnMessage.innerHTML = `<span style="color: #fd008a;">X Turn<span>`
    }
}

function gameOver(draw){
    disableSquares()
    turnMessage.innerText = `Game Over`
    if (draw){
        winMessage.innerText = 'Draw'
    } else {
        winMessage.innerText = `${xturn ? "O" : "X"} Win`
    }
    messages.classList.add('show')
}

function disableSquares() {
    game.classList.add('disable')
}

function isDraw() {
    return [...squares].every(square => {
       return square.classList.contains(xClass) || square.classList.contains(oClass)
    })
}

function placeTic(square, currentClass) {
    square.classList.add(currentClass)
}

function switchTurns(){
    xturn = !xturn
}

function gameHoverClass(){
 game.classList.remove(xClass)
 game.classList.remove(oClass)
 if (xturn){
     game.classList.add(oClass)
 } else {
     game.classList.add(xClass)
 }
}

function isWin(currentClass){
    return winPattern.some(combination => {
        return combination.every(index =>{
            return squares[index].classList.contains(currentClass)
        }) 
    }) 
}