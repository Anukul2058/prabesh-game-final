// variables
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
let height = window.innerHeight - 100
let score = document.querySelector('.score')
const bombsdiv = document.querySelector(".bombs")
const arrowsdiv = document.querySelector(".arrows")
var audio = new Audio('explosion.wav');
let final_score = document.querySelector('.final-score')
let bombs = []
let arrows = []
let score_num = 0
let lives = 4
let l1 = document.getElementById('health h1')
let l2 = document.getElementById('health h2')
let l3 = document.getElementById('health h3')
let cooldown = 0;




// college function
function keyup(event) {

    let player = document.getElementById('player');
    if (event.keyCode == 37) {
        leftPressed = false;
        lastPressed = 'left';
    }
    if (event.keyCode == 39) {
        rightPressed = false;
        lastPressed = 'right';
    }
    if (event.keyCode == 38) {
        upPressed = false;
        lastPressed = 'up';
    }
    if (event.keyCode == 40) {
        downPressed = false;
        lastPressed = 'down';
    }

    player.className = 'character stand ' + lastPressed;
}

// college function
function move() {
    let player = document.getElementById('player');
    let positionLeft = player.offsetLeft;
    let positionTop = player.offsetTop;
    if (downPressed) {
        let newTop = positionTop + 1;

        let element = document.elementFromPoint(player.offsetLeft, newTop + 32);
        if (element.classList.contains('sky') == false) {
            player.style.top = newTop + 'px';
        }

        if (leftPressed == false) {
            if (rightPressed == false) {
                player.className = 'character walk down';
            }
        }
    }
    if (upPressed) {
        let newTop = positionTop - 1;

        let element = document.elementFromPoint(player.offsetLeft, newTop);
        if (element.classList.contains('sky') == false) {
            player.style.top = newTop + 'px';
        }

        if (leftPressed == false) {
            if (rightPressed == false) {
                player.className = 'character walk up';
            }
        }
    }
    if (leftPressed) {
        let newLeft = positionLeft - 1;

        let element = document.elementFromPoint(newLeft, player.offsetTop);
        if (element.classList.contains('sky') == false) {
            player.style.left = newLeft + 'px';
        }


        player.className = 'character walk left';
    }
    if (rightPressed) {
        let newLeft = positionLeft + 1;

        let element = document.elementFromPoint(newLeft + 32, player.offsetTop);
        if (element.classList.contains('sky') == false) {
            player.style.left = newLeft + 'px';
        }

        player.className = 'character walk right';
    }

}

// college function
function keydown(event) {
    if (event.keyCode == 37) {
        leftPressed = true;
    }
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    if (event.keyCode == 38) {
        upPressed = true;
    }
    if (event.keyCode == 40) {
        downPressed = true;
    }
}


function myLoadFunction() {
    timeout = setInterval(move, 10);
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);



// when the start button is clicked....

document.querySelector('.start').addEventListener('click', () => {
    lives = 4;
    let score_num = 0
    score.textContent = score_num

    gsap.to('#player', { opacity: 1, duration: 1.5, ease: 'Power3easeIn' })

    let player_name = document.getElementById('player_name').value
    let name = document.querySelector('.name')
    name.innerHTML = player_name
    document.querySelector('.input-area').style.display = 'none'
    gsap.to('.start', { duration: 2, opacity: 0, display: 'none' })

    document.querySelector('.game-over').style.display = 'none'





    // 1) first of all the bombs are created when start button is clicked.. the below function creates bombs
    // 2) after creation of bombs on the DOM , the bomb is dropped using css animation.

    let creating_bombs = setInterval(() => {

        const bomb = document.createElement('div')
        bomb.classList.add('bomb')
        bombsdiv.appendChild(bomb)




        bomb.style.left = Math.floor(Math.random() * 1200) + 'px'
        bombs.push(bomb)


    }, 2000)




    // 7) when space button is pressed arrow is created in the DOM.. and arrow is thrown up using css animations..
    document.addEventListener('keyup', event => {
        if (event.code === 'Space' && cooldown == 0) {
            let arrow = document.createElement('div')
            arrow.classList.add('arrows')
            document.body.appendChild(arrow)
            arrows.push(arrow)

            let playerX = document.getElementById('player').offsetLeft
            let playerY = document.getElementById('player').offsetTop
            arrow.style.top = playerY + 'px'
            arrow.style.left = playerX + 'px'
            cooldown = 30;


        }





    })
    let set_cooldown = setInterval(() => {
        if (cooldown > 0) {
            cooldown -= 2;
        }
    }, 50)




    // 3) While falling the position of the bomb is tracked by using the read explosion function which is executed every 10 miliseconds.
    // 
    
    let read_explosion = setInterval(() => {
        bombs.forEach(bomb => {
            // 4) when the bomb reaches certain height the explosion is added.
            if (bomb.offsetTop >= height) { 
                let explosionX = bomb.offsetLeft
                let explosionY = bomb.offsetTop
                const explosion = document.createElement("div")
                
                explosion.classList.add("explosion")
                // explosionDiv.appendChild(explosion)
                document.body.appendChild(explosion)
                bomb.remove()
                explosion.style.left = explosionX + "px"
                explosion.style.top = explosionY + "px"
                audio.play();
                gsap.to('.explosion', { opacity: 0, duration: 1.5, ease: 'Power2easeOut', display: 'none' })
                let player = document.getElementById('player');
                let playerX = player.offsetLeft
                let playerY = player.offsetTop

                let x = explosionX - playerX
                let y = explosionY - playerY
                // 5) distance between the player position and explosion is calculated..
                let distancelol = Math.sqrt(x * x + y * y)
                var l1 = document.getElementById('h1')
                var l2 = document.getElementById('h2')
                var l3 = document.getElementById('h3')
                // 6) then lives of the player is deduced..
                if (distancelol < 60) {
                    console.log("oi k cha")
                    lives = lives - 1
                    console.log(lives)
                }


                if (lives === 3) {

                    l1.style.display = 'none'



                    // console.log('3')

                }
                if (lives === 2) {
                    // gsap.from('#player', { opacity: 0, duration: 1, ease: 'bouce' })

                    l2.style.display = 'none'

                    // console.log('2')

                }
                // 6) When all life is removed the below code is executed which displays game-over divison
                if (lives === 1) {
                    gsap.to('#player', { opacity: 0, duration: 1.5, ease: 'Power3easeIn' })

                    document.querySelector('.game-over').style.display = 'block'

                    gsap.to('.start', { opacity: 1, duration: 2, display: 'block' })
                    pause = true
                    l1.style.display = 'block'
                    l2.style.display = 'block'
                    const explodes = document.querySelectorAll('.explosion')
                    explodes.forEach(explode => {
                        explode.remove()
                    })
                    bombs = []
                    document.querySelectorAll(".bomb").forEach(bomb => {
                        bomb.remove()
                    })
                    clearInterval(creating_bombs)


                }
            }
            // 8) this fuction checks the position of moving arrow and moving bomb and calculates their distance..
            arrows.forEach(arrow => {
                let arrow_X = arrow.offsetLeft
                let arrow_Y = arrow.offsetTop
                let bombX = bomb.offsetLeft
                let bombY = bomb.offsetTop

                let x = arrow_X - bombX
                let y = arrow_Y - bombY
                let distance = Math.sqrt(x * x + y * y);
                if (arrow_Y < 30) {
                    arrow.remove()
                }

            //  9) this function removes the moving arrow and moving bombs when collided and increases the score.
                if (distance < 20) {
                    bomb.remove();
                    arrow.remove();
                    arrows = []

                    score_num++
                    score.textContent = score_num
                    final_score.textContent = score_num


                }
            })
        })
    }, 10)
})




