var App = App || {};

App.Particle = (function(){
    var DAMPING = 0.8;
    var Particle = function(startx, starty, endx, endy){
        var _position = new App.Vector2(startx, starty);
        var _destination = new App.Vector2(endx, endy);
        var _velocity = new App.Vector2(Math.random()*20 - 10,Math.random()*45-25);
        var _self = this;
        var _radius = 3;
        var _reached = false;
        var _color;
        function apply_force(vec){
            _velocity = _velocity.add(vec);
        }
        this.get_position = function(){
            return _position;
        }
        this.set_velocity = function(vec){
            _velocity = vec;
        }
        this.get_velocity = function(){
            return _velocity;
        }
        //retuns true if the step reaches the destination
        this.step = function(){
            if(_reached) return true;
            var direction_to_destination = _destination.sub(_position);
            var distance_to_destination = direction_to_destination.length();
            var unit_direction = direction_to_destination.scale(5/distance_to_destination);
            apply_force(unit_direction);
            _position = _position.add(_velocity);
            _velocity = _velocity.scale(DAMPING);
            if(distance_to_destination < _velocity.length()){
                _reached = true;
                _radius = 3;
            }
            return _reached;
        }
        this.set_radius = function(radius){
            _radius = radius;
        }
        this.get_radius = function(){
            return _radius;
        }
        this.has_reached = function(){
            return _reached;
        }
        this.get_destination = function(){
            return _destination;
        }
        this.set_color = function(color){
            _color = color;
        }
        this.get_color = function(){
            return _color;
        }
    }

    Particle.prototype.display = function(context){
        context.beginPath();
        context.fillStyle = this.get_color();
        if(this.has_reached()){
            context.arc(this.get_destination().x, this.get_destination().y, this.get_radius(), 0, 2 * Math.PI, false);
            context.fill();
            return;
        }
        context.arc(this.get_position().x, this.get_position().y, this.get_radius(), 0, 2 * Math.PI, false);
        context.fill();
    }

    return Particle;
})();
