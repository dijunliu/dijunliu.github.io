var levels = {
    data:[
        {   // First level
            foreground:'desert-foreground',
            background:'clouds-background',
            entities:[
                {type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
                {type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},

                {type:"block", name:"wood", x:520,y:380,angle:90,width:25,height:100},
                {type:"block", name:"glass", x:520,y:280,angle:90,width:25,height:100},
                {type:"villain", name:"burger",x:520,y:205,calories:590},

                {type:"block", name:"wood", x:620,y:380,angle:90,width:25,height:100},
                {type:"block", name:"glass", x:620,y:280,angle:90,width:25,height:100},
                {type:"villain", name:"fries", x:620,y:205,calories:420},

                {type:"hero", name:"orange",x:80,y:405},
                {type:"hero", name:"apple",x:140,y:405},
            ]
        },
        {   // Second level
            foreground:'desert-foreground',
            background:'clouds-background',
            entities:[
                {type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
                {type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},

                {type:"block", name:"wood", x:820,y:380,angle:90,width:100,height:25},
                {type:"block", name:"wood", x:720,y:380,angle:90,width:100,height:25},
                {type:"block", name:"wood", x:620,y:380,angle:90,width:100,height:25},
                {type:"block", name:"glass", x:670,y:317.5,width:100,height:25},
                {type:"block", name:"glass", x:770,y:317.5,width:100,height:25},

                {type:"block", name:"glass", x:670,y:255,angle:90,width:100,height:25},
                {type:"block", name:"glass", x:770,y:255,angle:90,width:100,height:25},
                {type:"block", name:"wood", x:720,y:192.5,width:100,height:25},

                {type:"villain", name:"burger",x:715,y:155,calories:590},
                {type:"villain", name:"fries",x:670,y:405,calories:420},
                {type:"villain", name:"sodacan",x:765,y:400,calories:150},

                {type:"hero", name:"strawberry",x:30,y:415},
                {type:"hero", name:"orange",x:80,y:405},
                {type:"hero", name:"apple",x:140,y:405},
            ]
        }
    ],
    init:function () {
        var html='';
        for(var i =0; i<levels.data.length; i++){
            html +='<input type="button" value="'+(i+1)+'">';
        };
        $('#levelselectscreen').html(html);
        $('#levelselectscreen input').click(function () {
            levels.load(this.value-1);
            $('#levelselectscreen').hide();
        })
    },
    load:function (number) {
        box2d.init();
        var level = levels.data[number];
        $('#score').html("score:"+game.score);
        game.currtLevel.foregroundImage = loader.loadImg("images/backgrounds/"+levels.data[number].foreground+".png");
        game.currtLevel.backgroundImage = loader.loadImg("images/backgrounds/"+levels.data[number].background+".png");
        game.slingshotImage = loader.loadImg("images/slingshot.png");
        game.slingshotFrontImage = loader.loadImg("images/slingshot-front.png");
        for(var i=0; i<level.entities.length;i++){
            entities.create(level.entities[i]);
        }
        if (loader.loaded){
            game.start();
        } else{
            loader.onload = game.start();
        }
    }
}