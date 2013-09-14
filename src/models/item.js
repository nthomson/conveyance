define(['models/entity', 'lib/helpers'], function(Entity, helpers){
  Item = function(base){    
    Entity.call(this, base);
  }
  
  Item.prototype = Object.create(Entity.prototype);
  
  return Item
})

