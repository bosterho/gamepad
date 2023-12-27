class Player{
    constructor(color) {
      this.color = color
      this.x = 0
      this.y = 0
			this.prev_x = 0
			this.prev_y = 0
      this.angle = 0
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
    }
    move(gamepad) {
      if (abs(gamepad.axes[0]) > 0.1) {
				this.speedX += gamepad.axes[0] * 0.1
      }
  
      if (abs(gamepad.axes[1]) > 0.01) {
				this.speedY += gamepad.axes[1] * 0.1
      }

			// if (abs(gamepad.axes[2]) > 0.01) {
			// 	this.speedX += gamepad.axes[2] * 0.1
      // }

			let yAxis = 3
			if (gamepad.index == msi_gamepadIndex) {
				yAxis = 5
			}
			// if (abs(gamepad.axes[yAxis]) > 0.1) {
			// 	this.speedY += gamepad.axes[yAxis] * 0.1
      // }

			// bounce off walls side to side
			if (this.x + (this.bodySize/2) > windowWidth || this.x - (this.bodySize/2) < 0) {
				this.speedX = -this.speedX
			}

			// bounce off walls up and
			if (this.y + (this.bodySize/2) > windowHeight || this.y - (this.bodySize/2) < 0) {
				this.speedY = -this.speedY
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
			let yAxis = 3
			if (gamepad.index == msi_gamepadIndex) {
				yAxis = 5
			}

			let rightThumbstickActive = false
			if (abs(gamepad.axes[2] > 0.1) || abs(gamepad.axes[yAxis] > 0.1)) {
				rightThumbstickActive = true
			}

			let smoothed_y = this.y - this.prev_y
			let smoothed_x = this.x - this.prev_x
			// smoothed_y *= map(gamepad.axes[yAxis], 0, -1, 0, 0.01)
			smoothed_y *= 0.01
			smoothed_x *= 0.01
			this.angle = atan2(smoothed_y, smoothed_x)
			
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