var particles = [];
var num_sections = 100;
var num_buckets = 5;
var buckets = [];
var FPS = 40;

var width = $(window).width() - 10;
var height = ($(document).height() - 80);
$("#flow-canvas").attr("width", width);
$("#flow-canvas").attr("height", height);

var url_selector = $("#soundcloud-container");
url_selector.css("right",($("#flow-canvas").width() - url_selector.width())/2);
url_selector.css("bottom", ($("#flow-canvas").height() - url_selector.height())/2)

$("#player").css("display","none");

var padding = height / (num_buckets + 1);

//var colors = ['#00FF00','#FFFF00','#FF0000','#FF00FF','#0000FF','#00FFFF']
var colors = ['#2ECC40','#FFDC00','#FF4136','#0074D9','#7FDBFF'];
for(var i = 0; i < num_buckets; i++){
    var x = width;
    var y = padding + padding * i;
    var color = '#00FF00';
    buckets.push(new Bucket(x,y,colors[i]));
}

var particles = [];

var trim_width = 0;

function start(){
    var canvas = document.getElementById('flow-canvas');
    var context = canvas.getContext('2d');
    context.fillStyle    = '#222';  // set text color

    clearStartX = 0;

    setInterval(function(){
        clear_canvas();

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
        if (particles.length > 1000) {
            trim_width = particles[300].get_position().x + 40;
            particles.splice(0, 300);
        }
    },1000/FPS);
}
function clear_canvas(){
    var canvas = document.getElementById('flow-canvas');
    var context = canvas.getContext('2d');
    context.clearRect (trim_width,0,canvas.width,canvas.height);
}
start();
