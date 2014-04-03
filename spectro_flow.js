var particles = [];
var num_sections = 100;
var num_buckets = 5;
var buckets = [];
var FPS = 40;

var width = $(window).width() * 3;
var height = $(window).height() - 80;
$("#flow-canvas").attr("width", width);
$("#flow-canvas").attr("height", height);

var padding = height / (num_buckets + 1);

//var colors = ['#00FF00','#FFFF00','#FF0000','#FF00FF','#0000FF','#00FFFF']
var colors = ['#2ECC40','#FFDC00','#FF4136','#0074D9','#7FDBFF'];
for(var i = 0; i < num_buckets; i++){
    var x = width/2;
    var y = padding * i;
    var color = '#00FF00';
    buckets.push(new Bucket(x,y,colors[i]));
}

var particles = [];

function start(){
    console.log("starting!");
    var canvas = document.getElementById('flow-canvas');
    var context = canvas.getContext('2d');
    context.fillStyle    = '#222';  // set text color

    clearStartX = 0;

    setInterval(function(){
        context.clearRect (clearStartX,0,canvas.width - clearStartX,canvas.height);
        var toRemove = 0
        particles.forEach(function(entry) {
          if (!entry.has_reached()) {
              entry.step();
          } else {
              clearStartX = entry.get_destination().x - 15;
              toRemove++;
          }
          entry.display(context);
        });
        // clean up array if it gets too large
        if (toRemove > 300) {
            particles.splice(0, 200);
        }
    },1000/FPS);
}
start();
