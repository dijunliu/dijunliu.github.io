(function(){
    var vendors = ['o','webkit','moz','ms'];
    var lastTime = 0;
    for(var i=0; i<vendors.length&&!window.requestAnimationFrame; i++){
        window.requestAnimationFrame = window[vendors[i]+'requestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[i]+'CancelAnimationFrame']||
            window[vendors[i]+'CancelRequestAnimationFrame'];
    }
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame =function (callback,element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0,16-(currTime-lastTime));
            var id = window.setTimeout(callback(),timeToCall);
            lastTime =currTime+timeToCall;
            return id;
        }
    }
    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id){
            clearTimeout(id);
        }
    }

}());