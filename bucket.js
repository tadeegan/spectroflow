var App = App || {};

App.Bucket = function(x,y,color) {
    var _xpos = x;
    var _ypos = y;
    this.generate_bubbles = function(number, xpos, ypos, yrange){
        var particles = [];
        for(var i = 0; i < number; i++){
            var particle = new App.Particle(_xpos, _ypos, xpos, ypos+yrange*(i/number));
            particle.set_color(color);
            particle.set_radius(number/2 + Math.random()*2);
            particles.push(particle);
        }
        return particles;
    }
}
