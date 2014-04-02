function Bucket(x,y,color){
    var _color = color;
    var _xpos = x;
    var _ypos = y; 
    function generate_bubbles(number, xpos, ypos, yrange){
        var particles = [];
        for(var i = 0; i < number; i++){
            var particle = new Particle(_xpos, _pos, xpos, ypos+yrange*(i/number));
            particle.set_color(color);
            particle.set_radius(2);
            particles.push(particle);
        }
        return particles;
    }
}