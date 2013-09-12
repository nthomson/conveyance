define(['models/structure', 'lib/helpers'], function(Structure, helpers){
  Obstacle = function(base){    
    Structure.call(this, base);
  }
  
  Obstacle.prototype = Object.create(Structure.prototype);
  
  return Obstacle
})

