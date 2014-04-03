(function() {
    var context,
        soundSource,
        soundBuffer,
        analyser,
        source,
        audioElement,
        bucketNumber = 5,
        bucket1low=0,
        bucket1hi=80,
        bucket2low=81,
        bucket2hi=250,
        bucket3low=600,
        bucket3hi=800,
        bucket4low=2001,
        bucket4hi=6000,
        bucket5low=6001,
        bucket5hi=16000,
        cutbpm = 521.7,
        goldlovebpm = 413.8,
        bpm = cutbpm;

    var current_interval = 1;
    var bubble_padding = 10;

    function freqToIndex(frequency) {
    	return Math.round(frequency/22050 * 1024);
    }
    
    function numDots(num) {
    	return Math.round(25*num/500);
    }

    // Step 1 - Initialise the Audio Context
    // There can be only one!
    function init() {
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }
        audioElement = document.getElementById("player");
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0;
        analyser.maxDecibels = 0;
        audioElement.addEventListener("canplay", function() {
            source = context.createMediaElementSource(audioElement);
            source.connect(analyser);
            source.connect(context.destination);
            setInterval(function(){
              update();
                },bpm);
        });
    }
    function update() {
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        var dataArray = [0,0,0,0,0];
        analyser.getByteFrequencyData(frequencyData);

//    	console.log(freqToIndex(bucket1low),freqToIndex(bucket1hi),freqToIndex(bucket2low),freqToIndex(bucket2hi),freqToIndex(bucket3low),freqToIndex(bucket3hi),freqToIndex(bucket4low),freqToIndex(bucket4hi),freqToIndex(bucket5low),freqToIndex(bucket5hi));
    	
    	for(var i = freqToIndex(bucket1low); i < freqToIndex(bucket1hi); i++){
    		dataArray[0]+=frequencyData[i];
    	}
    	for(var i = freqToIndex(bucket2low); i < freqToIndex(bucket2hi); i++){
    		dataArray[1]+=frequencyData[i];
    	}
    	for(var i = freqToIndex(bucket3low); i < freqToIndex(bucket3hi); i++){
    		dataArray[2]+=frequencyData[i];
    	}
    	for(var i = freqToIndex(bucket4low); i < freqToIndex(bucket4hi); i++){
    		dataArray[3]+=frequencyData[i];
    	}
    	for(var i = freqToIndex(bucket5low); i < freqToIndex(bucket5hi); i++){
    		dataArray[4]+=frequencyData[i];
    	}

    	dataArray[0]= numDots(Math.round(dataArray[0]/(freqToIndex(bucket1hi) - freqToIndex(bucket1low))));
    	dataArray[1]= numDots(Math.round(dataArray[1]/(freqToIndex(bucket2hi) - freqToIndex(bucket2low))));
    	dataArray[2]= numDots(Math.round(dataArray[2]/(freqToIndex(bucket3hi) - freqToIndex(bucket3low))));
    	dataArray[3]= numDots(Math.round(dataArray[3]/(freqToIndex(bucket4hi) - freqToIndex(bucket4low))));
    	dataArray[4]= numDots(Math.round(dataArray[4]/(freqToIndex(bucket5hi) - freqToIndex(bucket5low))));
    	
    	var bubbles = 0;
		for(var i = 0; i < 5; i++){
            var num_bubbles = dataArray[i];
            var range = num_bubbles*6;
            var generated_particles = buckets[i].generate_bubbles(num_bubbles, current_interval * 8, bubbles*bubble_padding + 5, num_bubbles*bubble_padding);
            bubbles += dataArray[i];
            for(j in generated_particles){
                particles.push(generated_particles[j]);
            }
		}
        current_interval++;
    }
    init();
}());
