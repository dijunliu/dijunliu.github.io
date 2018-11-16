
$(window).load(function () {
    game.int();
});

var game = {
    mode:"intro",
    ended:true,
    offsetLeft:0,
    slingshotX:140,
    slingshotY:280,
    currtLevel:{},
    maxspeed:3,
    minoffset:0,
    maxoffset:300,
    score:0,
    int:function(){
        loader.init();
        levels.init();
        mouse.init();
        $('.gamelayer').hide();
        $('#gamestartscreen').show();
        game.canvas = document.getElementById('gamecanvas');
        game.context = game.canvas.getContext('2d');
    },
    showLeveScreen:function () {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow');
    },
    start:function () {
        $('.gamelayer').hide();
        $('#gamecanvas').show();
        $('#scorescreen').show();
        game.mode = "intro";
        game.ended = false;
        game.animateFrame = window.requestAnimationFrame(game.animate,game.canvas);
    },

    // 确定移动方向和速度，判断是否到达指定中心位置

    panTo:function(newcenter){
        if(Math.abs(newcenter-game.offsetLeft-game.canvas.width/4)>0 && game.offsetLeft >= game.minoffset&&
           game.offsetLeft <= game.maxoffset){
            var deltaX = Math.round((newcenter-game.offsetLeft-game.canvas.width/4)/2);
            if (Math.abs(deltaX)>game.maxspeed){
                deltaX = game.maxspeed*Math.abs(deltaX)/deltaX;
            }
            game.offsetLeft += deltaX;
        }else{
            return true;
        }
        if (game.offsetLeft < game.minoffset) {
            game.offsetLeft = game.minoffset;
            return true;
        }
        if (game.offsetLeft > game.maxoffset) {
            game.offsetLeft = game.maxoffset;
            return true;
        }
        return false;
    },

    // 通过game.mode决定场景动画，同时切换game.mode

    handlePanning:function(){
        if(game.mode == "intro"){
            if(game.panTo(700)){
                game.mode = "load-next-hero";
            };
        }
        if(game.mode == "wait-for-firing"){
            if(mouse.dragging){
                game.panTo(mouse.x+game.offsetLeft);
            }else {
                game.panTo(game.slingshotX);
            }
        }
        if(game.mode == "load-next-hero"){
            game.panTo(game.slingshotX);
            game.mode == "wait-for-firing";
        }

    },
    drawAllBodies:function(){
        for (var body = box2d.world.GetBodyList();body;body = body.GetNext()){
            var entity = body.GetUserData();
            if(entity){
                entities.draw(entity,body.GetPosition(),body.GetAngle())
            }
        }
    },
    animate:function () {
        game.handlePanning();
        var currentTime = new Date().getTime();
        // if(game.lastTime){
        //     box2d.step((currentTime-game.lastTime)/1000);
        // }
        game.lastTime = currentTime;
        game.context.drawImage(game.currtLevel.backgroundImage,game.offsetLeft/4,0,640,480,0,0,640,480);
        game.context.drawImage(game.currtLevel.foregroundImage,game.offsetLeft,0,640,480,0,0,640,480);
        game.context.drawImage(game.slingshotImage,game.slingshotX,game.slingshotY);
        game.context.drawImage(game.slingshotFrontImage,game.slingshotX,game.slingshotY);
        game.drawAllBodies();
        if(!game.ended){
            game.animateFrame = window.requestAnimationFrame(game.animate,game.canvas);
        }
    }
}





