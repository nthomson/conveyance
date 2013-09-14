define(['models/entity', 'lib/helpers'], function(Entity, helpers){
  Projectile = function(base){
    Entity.call(this, base);
    //init
    this.direction = base.direction || 'right';
    this.speed = base.speed || 300;
    this.width = base.width || 6;
    this.height = base.height || 6;
    this.origin = base.origin || {}
    
    switch(this.direction) {
      case 'right':
        this.x += (this.origin.width + this.width)
        break;
      case 'left':
        this.x -= (this.origin.width + this.width)
        break;
      case 'up':
        this.y -= (this.origin.height + this.height)
        break;
      case 'down':
        this.y += (this.origin.height + this.height)
        break;
    }
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height);
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height);
  }
  Projectile.prototype = Object.create(Entity.prototype);
  Projectile.prototype.update = function(dt) {
    this.x -= (this.level_speed * dt);
    
    switch(this.direction) {
      
      
      case 'right':
        this.x += (this.speed * dt);
        break;
      case 'left':
       this.x -= (this.speed * dt);
        break;
      case 'up':
        this.y -= (this.speed * dt);
        break;
      case 'down':
        this.y += (this.speed *dt);
        break;
    }
    
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)

    if (this.x < 0 || this.x > 640) this.explode();
  }
  
  Projectile.prototype.collide = function(collided_with) {
    if(!(collided_with instanceof Projectile)){
      this.explode();
    }
  }

  return Projectile
})

