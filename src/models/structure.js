define(['models/entity', 'lib/helpers'], function(Entity, helpers){
  Structure = function(base){    
    Entity.call(this, base);
  }
  
  Structure.prototype = Object.create(Entity.prototype);
  
  return Structure
})

