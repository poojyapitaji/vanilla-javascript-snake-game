const canvas_border_color       =   "black"
const canvas_background_color   =   "white"
const snake_color               =   "skyblue"
const snake_border_color        =   "skyblue"
const food_color                =   "green"
const food_border_color         =   "#1abc9c"
const speed                     =   50

let velocity_x          = 10
let velocity_y          = 0
let food_x              = Math.floor(Math.random() * 60) * 10
let food_y              = Math.floor(Math.random() * 60) * 10
let isChangingDirection = false
let initSnakeLength     = 5

let snake = [
    {x: 300, y: 300},
    {x: 290, y: 300},
    {x: 280, y: 300},
    {x: 270, y: 300},
    {x: 260, y: 300}
]

const canvas = document.getElementById("canvas")
const canvas_ctx = canvas.getContext("2d")

const startButton = document.getElementById("start")
const restartButton = document.getElementById("restart")

startButton.addEventListener("click", () => {
    startGame()
})

restartButton.addEventListener("click", () => {
    food_x      = Math.floor(Math.random() * 60) * 10
    food_y      = Math.floor(Math.random() * 60) * 10
    snake.splice(0, snake.length - initSnakeLength)
    snake[0].x  = 300
    snake[0].y  = 300
    startGame()
}) 

document.addEventListener("keydown", changeDirection)

clearCanvas()
drawSnake()
drawFood()

function startGame() {

    startButton.style.display = "none"
    restartButton.style.display = "none";

    if(isGameEnd()) {
        restartButton.style.display = "block"
        return
    }

    if(foodEat()) {
        food_x = Math.floor(Math.random() * 60) * 10
        food_y = Math.floor(Math.random() * 60) * 10
        addTail()
    }

    
    isChangingDirection = false

    setTimeout(function onTick() {

        clearCanvas()
        drawSnake()
        drawFood()
        foodEat()
        moveSnake()
        startGame()

    },speed)

}

function clearCanvas() {

    canvas_ctx.fillStyle    = canvas_background_color
    canvas_ctx.strokestyle  = canvas_border_color
    canvas_ctx.fillRect(0, 0, canvas.width, canvas.height)
    canvas_ctx.strokeRect(0, 0, canvas.width, canvas.height)

}

function drawSnake() {

    snake.forEach(drawSnakeBody)

}

function drawSnakeBody(snake) {

    canvas_ctx.fillStyle    = snake_color
    canvas_ctx.strokestyle  = snake_border_color
    canvas_ctx.fillRect(snake.x, snake.y, 10, 10)
    canvas_ctx.strokeRect(snake.x, snake.y, 10, 10)

}

function drawFood() {

    canvas_ctx.fillStyle    = food_color
    canvas_ctx.strokestyle  = food_border_color
    canvas_ctx.fillRect(food_x, food_y, 10, 10)
    canvas_ctx.strokeRect(food_x, food_y, 10, 10)

}

function moveSnake() {

    const head = {
        x: snake[0].x + velocity_x,
        y: snake[0].y + velocity_y
    }

    snake.unshift(head)
    snake.pop()

}

function changeDirection(e) {

   const LEFT_KEY   =   37
   const RIGHT_KEY  =   39
   const UP_KEY     =   38
   const DOWN_KEY   =   40

   if(isChangingDirection) return
   isChangingDirection = true

   const keyPressed = e.keyCode;
   const goingUp    =   velocity_y  ===    -10
   const goingDown  =   velocity_y  ===    10
   const goingLeft  =   velocity_x  ===    -10
   const goingRight =   velocity_x  ===    10

   if(keyPressed === LEFT_KEY && !goingRight)
   {
       velocity_x = -10
       velocity_y = 0
   }

   if(keyPressed === UP_KEY && !goingDown)
   {
       velocity_x = 0
       velocity_y = -10
   }

   if(keyPressed === RIGHT_KEY && !goingLeft)
   {
       velocity_x = 10
       velocity_y = 0
   }

   if(keyPressed === DOWN_KEY && !goingUp)
   {
       velocity_x = 0
       velocity_y = 10
   }

}

function foodEat() {
    if(snake[0].x === food_x && snake[0].y === food_y) return true
}

function addTail() {
    snake.push(`
    {x: ${snake[snake.length - 1].x + 10}, y: ${snake[snake.length - 1].y + 10}}
    `)
}

function isGameEnd() {

    for(let i = 4; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }

    const hitLeftWall   = snake[0].x < 0
    const hitRightWall  = snake[0].x > canvas.width - 10
    const hitTopWall    = snake[0].y < 0
    const hitBottomWall = snake[0].y > canvas.height - 10

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall

}