var particles = [];

function generateParticles(number, xpos){
       for(var i = 0; i < number; i++){
            var particle = new Particle(xpos,600,200,400);
            particle.set_radius(Math.random()*2+2);
            particles.push(particle);
        }
    }

function start(){
    console.log("starting!");
    var canvas = document.getElementById('flow-canvas');
    var context = canvas.getContext('2d');
    
    setInterval(function(){
        generateParticles(3,100);
        generateParticles(3,300);
        generateParticles(3,500);
        generateParticles(3,700);
        console.log(particles.length);
        context.clearRect (0,0,canvas.width,canvas.height);
        for(var i = 0; i < particles.length; i++){
            var particle = particles[i];
            if(particle.step()){
                console.log("spliceing");
                particles.splice(i,1);
                i--;
            } 
            particle.display(context);
        }
    },1000/60);
    

}

start();