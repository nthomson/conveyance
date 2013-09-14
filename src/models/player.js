define(['models/unit', 'models/projectile', 'models/enemy', 'models/obstacle', 'lib/helpers'], function(Unit, Projectile, Enemy, Obstacle, helpers){
  Player = function(base){
    Unit.call(this, base);

    this.x = base.x || 50;
    this.y = base.y || 400;
    this.width = base.width || 15;
    this.height = base.height || 15;
    this.color = base.color || '#1e76b0';
    
    this.grounded = true;
    this.jump_sin_wave_pos = 0;
    this.jump_height = 64;
    this.half_pi = Math.PI / 2;
    this.jump_hang_time = .5;
    this.jump_sin_wave_speed = this.half_pi / this.jump_hang_time;
    this.fall_multiplier = 1.5;
  }
  Player.prototype = Object.create(Unit.prototype);
  Player.prototype.update = function(dt) {
    //jumping
    if (!this.grounded) {
      // the last position on the sine wave
      var lastHeight = this.jump_sin_wave_pos;
      //the new position on the sine wave
      this.jump_sin_wave_pos += this.jump_sin_wave_speed * dt;
 
      //we have fallen off the bottom of the sine wave, so continue falling
      //at a predetermined speed
      if (this.jump_sin_wave_pos >= Math.PI) {
        this.grounded = true;
 
        this.y = 400;
        //otherwise move along the sine wave
      }
      else {
        this.y -= (Math.sin(this.jump_sin_wave_pos) - Math.sin(lastHeight)) * this.jump_height;
        //this.grounded = true;
      }
    }
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)
  }
  Player.prototype.jump = function () {
    if(this.grounded) {
      this.grounded = false;
      this.jump_sin_wave_pos = 0;
    }
  }
  
  Player.prototype.collide = function(collided_with) {
    Unit.prototype.collide.call(this, collided_with);
    
    if(collided_with instanceof Enemy) {
      this.explode();
    }
    if(collided_with instanceof Obstacle) {
      this.explode();
    }
  }

  return Player
})

