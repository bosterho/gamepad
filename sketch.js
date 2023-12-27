const winningScore = 7

let xbox_gamepadIndex = -1;
let msi_gamepadIndex = -1;
let player1, player2
let x1, y1, x2, y2, x3, y3, x4, y4
let player
let players = []


let respawnSound;
function preload() {
  soundFormats('wav', 'mp3')
  respawnSound = loadSound('assets/pop.wav')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player1 = new Player(color(255, 0, 0))
  player2 = new Player(color(0, 0, 255))
  respawn(player1)
  respawn(player2)
}

function draw() {
  background(color(30, 30, 30, 225));

  // Check for the gamepad state on each frame
  const gamepads = navigator.getGamepads();

  if (gamepads) {
    for (let i = 0; i < gamepads.length; i++) {
      const gamepad = gamepads[i];
      if (!gamepad) continue; // Skip null gamepad entries

      if (gamepad.id.includes('Xbox') && xbox_gamepadIndex === -1) {
        xbox_gamepadIndex = gamepad.index;
      } else if (gamepad.id.includes('msi') && msi_gamepadIndex === -1) {
        msi_gamepadIndex = gamepad.index;
      }
      players[xbox_gamepadIndex] = player1
      players[msi_gamepadIndex] = player2
    }

    // Update rectangles based on identified gamepads
    gamepads.forEach(gamepad => {
      if (!gamepad) return; // Skip null gamepad entries

      player = null
      let otherPlayer
      if (gamepad.index === xbox_gamepadIndex) {
        player = player2
        otherPlayer = player1
      }
      if (gamepad.index === msi_gamepadIndex) {
        player = player1
        otherPlayer = player2
      }

      if (player !== null) {
        const buttons = gamepad.buttons

        // A button
        if (buttons[0].pressed) {
          player.pokerLength = 180
        }
        // B button
        if (buttons[1].pressed) {
          if (player.speedX < 10 && player.speedY < 10) {
            player.speedX *= 1.1
            player.speedY *= 1.1
          }
          
        }

        player.rotate(gamepads[gamepad.index])
        player.poker()
        player.move(gamepads[gamepad.index])
        if (pokingBody(player, otherPlayer) == true) {
          if (pokingShield(player, otherPlayer) == false) {
            respawn(otherPlayer)
            player.score += 1
          }
        }

        let winner = null
        if (players[xbox_gamepadIndex].score >= winningScore) {
          winner = "Red"
        }
        if (players[msi_gamepadIndex].score >= winningScore) {
          winner = "Blue"
        }
        
        if (!winner) {
          player.draw()
        } else {
          text(winner + " Wins!", windowWidth / 2, windowHeight / 2)
        }
      }

      // Scoreboard
      fill(255)
      noStroke()
      text("Red: " + players[xbox_gamepadIndex].score, 100, windowHeight - 50)
      text("Blue: " + players[msi_gamepadIndex].score, windowWidth - 100, windowHeight - 50)
    });

    // text(player, windowHeight - 50, 100,)

    
  } else {
    text("Connect a gamepad", width / 2, height / 2);
  }
}
