var particles = [];
var num_sections = 100;
var num_buckets = 5;
var buckets = [];

var width = $("#flow-canvas").width();
var height = $("#flow-canvas").height();
var padding = width / (num_buckets + 1);

for(var i = 0; i < num_buckets; i++){
    var x = padding + padding*i;
    var y = height - 30;
    var color = '#00FF00';
    buckets.push(new Bucket(x,y,color));
}
/*
function start(){
    console.log("starting!");
    var canvas = document.getElementById('flow-canvas');
    var context = canvas.getContext('2d');
    
    setInterval(function(){
        generateParticles(3,100, 200, 100,'#00FF00');
        generateParticles(3,300, 400, 100,'#FFFF00');
        generateParticles(3,500, 800, 100,'#FF0000');
        generateParticles(3,700, 900, 100,'#0000FF');
        console.log(particles.length);
        context.clearRect (0,0,canvas.width,canvas.height);
        for(var i = 0; i < particles.length; i++){
            var particle = particles[i];
            particle.step();
            particle.display(context);
        }
    },1000/60);
    

}

start();
*/