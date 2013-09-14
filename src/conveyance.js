define(['models/player', 'models/obstacle', 'models/enemy', 'levels/level1', 'lib/helpers', 'config'],
function(Player, Obstacle, Enemy, level1, helpers, config) {
  var Conveyance = function() {
    //init
    this.player = new Player(config.player);
    
    this.entities = level1.enemies.map(function(ene){ene.level_speed = config.base_speed; return new Enemy(ene);}).concat(level1.obstacles.map(function(obs){obs.level_speed = config.base_speed; return new Obstacle(obs);}))

    //Don't start the game paused
    this.pause = false;

    window.onkeydown = helpers.key_press.bind(this);
    
    //Handle an firing event
    window.addEventListener('unit:fire', function (e) {
      var o = e.detail.origin;
      var p = e.detail;
      this.entities.push(new Projectile(p));
    }.bind(this), false);
  }
  
  Conveyance.prototype = {
    run: function() {
      if(this.player.active){
        this.update();
        this.redraw(config.canvas.getContext('2d'));
        // start the mainloop
        requestAnimationFrame( this.run.bind(this), config.canvas );
      }
    },
    update: function() {
      // calculate the time since the last frame
      var thisFrame = new Date().getTime();
      var dt = (thisFrame - this.lastFrame)/1000;
      if(!dt){dt = 0;}
      this.lastFrame = thisFrame;
      
      if (!this.pause) {
        this.handle_collisions();

        //Update all of the game's objects
        this.player.update(dt);
        this.entities.forEach(helpers.update_with_dt.bind(dt));

        //Filter objects that are no longer active
        this.entities = this.entities.filter(helpers.filter_active);
      }
    },
    handle_collisions: function() {
      
      //TODO: THIS IS REALLY BAD - WE SHOULD TO OPTIMIZE THIS
      this.entities.forEach(function(first){
        helpers.check_collide(this.player, first);
        this.entities.forEach(function(second){
          if(first != second) {
            helpers.check_collide(first, second);
          }
        })
      }.bind(this));
    },
    redraw: function(context) {
      //Clear the canvas
      context.clearRect(0, 0, config.game_width, config.game_height);
      
      context.fillStyle = '#000';
      
      //Draw the floor
      context.fillRect(0, 400, config.game_width, 80);

      // Draw HUD
      context.fillStyle = this.player.color;
      context.textAlign = "right";
      context.textBaseline = "bottom";
      context.fillText(this.player.ammo, 635, 475);
      
      //Draw all of the game's objects
      this.player.draw(context);
      this.entities.forEach(helpers.draw_with_context.bind(context));
      
    }
  }
  
  return Conveyance;
  
});
