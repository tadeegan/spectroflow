var particles = [];
var num_sections = 100;
var num_buckets = 5;
var buckets = [];
var FPS = 40;

var width = $(window).width()- 20;
var height = $(window).height();
$("#flow-canvas").attr("width", width);
$("#flow-canvas").attr("height", height);

var padding = height / (num_buckets + 1);

var colors = ['#00FF00','#FFFF00','#FF0000','#FF00FF','#0000FF','#00FFFF']
for(var i = 0; i < num_buckets; i++){
    var x = width - 30;
    var y = padding + padding * i;
    var color = '#00FF00';
    buckets.push(new Bucket(x,y,colors[i]));
}

var particles = [];

function start(){
    console.log("starting!");
    var canvas = document.getElementById('flow-canvas');
    var context = canvas.getContext('2d');
    
    setInterval(function(){
        context.clearRect (0,0,canvas.width,canvas.height);
        for(var i = 0; i < particles.length; i++){
            var particle = particles[i];
            particle.step();
            particle.display(context);
        }
    },1000/FPS);
    

}
start();
