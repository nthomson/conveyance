define(['models/entity', 'models/projectile', 'lib/helpers'], function(Entity, Projectile, helpers){
  Unit = function(base){
    Entity.call(this, base);
    this.ammo = base.ammo || -1;
  }
  Unit.prototype = Object.create(Entity.prototype);
  Unit.prototype.fire = function() {
    this.ammo--;
    var event = new CustomEvent('unit:fire', {
      'detail': {
        origin: this,
        x: this.x + this.width / 2,
        y: this.y - this.height / 2,
        direction: this.direction,
        color: this.color,
        level_speed: this.level_speed
      }
    });
    dispatchEvent(event);
  }
  Unit.prototype.collide = function(collided_with){
    if(collided_with instanceof Projectile) {
      this.explode();
      console.log('Collided!')
    }
  }
  return Unit
})
