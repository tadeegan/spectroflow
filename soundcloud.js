//soundcloud integration requires jquery
var sound_cloud = {
    hide : function(){

    },
    resolve : function(url){

    }
}
$("#soundcloud-submit").on("click", function(event){
    var soundcloud_url = $("#soundcloud-input").val();
    var resolve_url = "http://api.soundcloud.com/resolve.json?url=" + soundcloud_url + "&client_id=a0235b299e3749780c968e5272467c85";
    $.get(resolve_url, function(response){
        console.log(response);
        if(response.kind === "track"){
            var stream = response.stream_url + "?client_id=a0235b299e3749780c968e5272467c85";
            var player = $("#player");
            player.attr("src", stream);
            $("#soundcloud-container").css("display","none");
            sound();
            $("#player").css("display","");
            setTimeout(function(){
                player.trigger("play");
            }, 1000);
            //
            //player.trigger("play");
        }
    });  
});