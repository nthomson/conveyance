define(['models/unit', 'models/projectile', 'lib/helpers'], function(Unit, Projectile, helpers){
  Player = function(base){
    Unit.call(this, base);

    this.x = base.x || 50;
    this.y = base.y || 400;
    this.width = base.width || 15;
    this.height = base.height || 15;
    this.color = base.color || '#1e76b0';
    
    this.grounded = true;
    this.jumpSinWavePos = 0;
    this.jumpHeight = 64;
    this.halfPI = Math.PI / 2;
    this.jumpHangTime = .5;
    this.jumpSinWaveSpeed = this.halfPI / this.jumpHangTime;
    this.fallMultiplyer = 1.5;
  }
  Player.prototype = Object.create(Unit.prototype);
  Player.prototype.update = function(dt) {
    //jumping
    if (!this.grounded) {
      // the last position on the sine wave
      var lastHeight = this.jumpSinWavePos;
      //the new position on the sine wave
      this.jumpSinWavePos += this.jumpSinWaveSpeed * dt;
 
      //we have fallen off the bottom of the sine wave, so continue falling
      //at a predetermined speed
      if (this.jumpSinWavePos >= Math.PI) {
        this.grounded = true;
 
        this.y = 400;
        //otherwise move along the sine wave
      }
      else {
        this.y -= (Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
        //this.grounded = true;
      }
    }
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)
  }
  Player.prototype.jump = function () {
    if(this.grounded) {
      this.grounded = false;
      this.jumpSinWavePos = 0;
    }
  }

  return Player
})

