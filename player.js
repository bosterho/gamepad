class Player{
    constructor(color) {
      this.color = color
      this.x = 0
      this.y = 0
			this.prev_x = 0
			this.prev_y = 0
      this.angle = 0
      this.cur_angle = 0
      this.pokerLength = 60
      this.pokerTipX = 0
      this.pokerTipY = 0
      this.bodySize = 40
      this.front_x1 = 0
      this.front_y1 = 0
      this.front_x2 = 0
      this.front_y2 = 0
			this.speedX = 0
			this.speedY = 0
			this.rotSpeed = 0
			this.score = 0
			this.smoothDx = 0
			this.smoothDy = 0
			this.dx = 0
			this.dy = 0
			this.yAxis = 0
    }
    move(gamepad) {
      if (abs(gamepad.axes[0]) > 0.1) {
				this.speedX += gamepad.axes[0] * 0.2
      }
  
      if (abs(gamepad.axes[1]) > 0.01) {
				this.speedY += gamepad.axes[1] * 0.2
      }

			// if (abs(gamepad.axes[2]) > 0.01) {
			// 	this.speedX += gamepad.axes[2] * 0.1
      // }

			this.yAxis = 3
			if (gamepad.index == msi_gamepadIndex) {
				this.yAxis = 5
			}
			// if (abs(gamepad.axes[this.yAxis]) > 0.1) {
			// 	this.speedY += gamepad.axes[this.yAxis] * 0.1
      // }

			
			// bounce off left wall
			if (this.x - (this.bodySize/2) < 0) {
				this.speedX = abs(this.speedX) * bounciness
			}

			// bounce off right wall
			if (this.x + (this.bodySize/2) > windowWidth) {
				this.speedX = -abs(this.speedX) * bounciness
			}

			// bounce off bottom wall
			if (this.y + (this.bodySize/2) > windowHeight) {
				this.speedY = -abs(this.speedY) * bounciness
			}

			// bounce off top wall
			if (this.y - (this.bodySize/2) < 0) {
				this.speedY = abs(this.speedY) * bounciness
			}

			this.prev_x = this.x
			this.prev_y = this.y
			this.x += this.speedX
			this.y += this.speedY

			// add drag
			this.speedX *= 0.97
			this.speedY *= 0.97
  
      let shield_width = 0.8
      this.front_x1 = this.x + cos(this.angle - shield_width) * 40
      this.front_y1 = this.y + sin(this.angle - shield_width) * 40
      this.front_x2 = this.x + cos(this.angle + shield_width) * 40
      this.front_y2 = this.y + sin(this.angle + shield_width) * 40
    }

    rotate(gamepad) {
      // let a = gamepad.axes[2]
      // if (abs(a) > 0.05) {
			// 	this.rotSpeed += a * 0.01
      // }
			// this.angle += this.rotSpeed

			// this.rotSpeed *= 0.94
			this.yAxis = 3
			if (gamepad.index == msi_gamepadIndex) {
				this.yAxis = 5
			}

			// rightThumbstick = false
			// if (abs(gamepad.axes[2] > 0.1) || abs(gamepad.axes[this.yAxis]) > 0.1) {
			// 	rightThumbstickActive = true
			// }
			// if (rightThumbstickActive) {
				// this.angle = atan2(gamepad.axes[this.yAxis], gamepad.axes[2])
				// this.angle += (gamepad.axes[this.yAxis] * gamepad.axes[2]) * 0.1
			// } else {
				// this.angle = atan2(this.y - this.prev_y, this.x - this.prev_x)
			// }
			this.angle += (gamepad.axes[this.yAxis]) * 0.1
			this.angle += (gamepad.axes[2]) * 0.1

			
			

			// this.cur_angle = atan2(this.y - this.prev_y, this.x - this.prev_x)
			// this.angle += (this.cur_angle - this.angle) * 0.1
			// console.log(this.angle)

			// this.dx = this.x - this.prev_x
			// this.dy = this.y - this.prev_y
			// console.log(this.speedX)
			// this.smoothDx = this.smoothDx + (this.dx - this.smoothDx) * map(abs(this.speedX), 0, 3, 0.1, 0.005)
			// this.smoothDy = this.smoothDy + (this.dy - this.smoothDy) * map(abs(this.speedY), 0, 3, 0.1, 0.005)
			// this.angle = atan2(this.smoothDy, this.smoothDx)

    }

		poker() {
			if (this.pokerLength > 60) {
				this.pokerLength -= 6
			}
		}

  
    draw() {
			stroke(255)
			strokeWeight(3)
			fill(this.color)
      circle(this.x, this.y, this.bodySize)
      this.pokerTipX = this.x + cos(this.angle) * this.pokerLength,
      this.pokerTipY = this.y + sin(this.angle) * this.pokerLength

			// poker
      line(
        this.x + cos(this.angle) * (this.bodySize / 2),
        this.y + sin(this.angle) * (this.bodySize / 2),
        this.pokerTipX,
        this.pokerTipY
      )
			circle(this.pokerTipX, this.pokerTipY,5)

			// shield
      line(
        this.front_x1,
        this.front_y1,
        this.front_x2,
        this.front_y2
      )
    }
  }
  
  function respawn(player) {
    player.x = random(100, width-100)
    player.y = random(100, height-100)
    player.angle = random(0, TWO_PI)
    respawnSound.play()
  }