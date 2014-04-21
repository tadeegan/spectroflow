"use strict";

var App = App || {};
(function() {
    var num_sections = 100;
    var num_buckets = 5;
    var FPS = 40;

    App.buckets = [];
    App.particles = [];
    App.width = window.innerWidth - 10;
    App.height = window.innerHeight - 80;
    App.trim_width = 0;

    var flowCanvas = document.getElementById('flow-canvas');
    flowCanvas.setAttribute('width', App.width);
    flowCanvas.setAttribute('height', App.height);

    var padding = App.height / (num_buckets + 1);
    var colors = ['#2ECC40','#FFDC00','#FF4136','#0074D9','#7FDBFF'];
    for(var i = 0; i < num_buckets; i++) {
        var x = App.width;
        var y = padding + padding * i;
        App.buckets.push(new App.Bucket(x,y,colors[i]));
    }

    function start() {
        var canvas = document.getElementById('flow-canvas');
        var context = canvas.getContext('2d');
        var clearStartX = 0;

        context.fillStyle = '#222'; // set text color

        setInterval(function() {
            App.clear_canvas();

            var toRemove = 0;
            var particles = App.particles;
            for (var i = 0, l = particles.length; i < l; ++i) {
                var entry = particles[i];
                if (!entry.has_reached()) {
                    entry.step();
                }
                else {
                    clearStartX = entry.get_destination().x - 15;
                    toRemove++;
                }
                entry.display(context);
            }
            if (particles.length > 1000) {
                App.trim_width = particles[300].get_position().x + 40;
                particles.splice(0, 300);
            }
        }, 1000 / FPS);
    }

    App.clear_canvas = function() {
        var canvas = document.getElementById('flow-canvas');
        var context = canvas.getContext('2d');
        context.clearRect(App.trim_width,0,canvas.width,canvas.height);
    }

    start();
})();