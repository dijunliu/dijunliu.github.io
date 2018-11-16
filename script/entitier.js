var entities = {
    definition:{
        "glass":{
            fullHealth:100,
            density:2.4,
            friction:0.4,
            restitution:0.15,
        },
        "wood":{
            fullHealth:500,
            density:0.7,
            friction:0.4,
            restitution:0.4,
        },
        "dirt":{
            density:3.0,
            friction:1.5,
            restitution:0.2,
        },
        "burger":{
            shape:"circle",
            fullHealth:40,
            radius:25,
            density:1,
            friction:0.5,
            restitution:0.4,
        },
        "sodacan":{
            shape:"rectangle",
            fullHealth:80,
            width:40,
            height:60,
            density:1,
            friction:0.5,
            restitution:0.7,
        },
        "fries":{
            shape:"rectangle",
            fullHealth:50,
            width:40,
            height:50,
            density:1,
            friction:0.5,
            restitution:0.6,
        },
        "apple":{
            shape:"circle",
            radius:25,
            density:1.5,
            friction:0.5,
            restitution:0.4,
        },
        "orange":{
            shape:"circle",
            radius:25,
            density:1.5,
            friction:0.5,
            restitution:0.4,
        },
        "strawberry":{
            shape:"circle",
            radius:15,
            density:2.0,
            friction:0.5,
            restitution:0.4,
        }
    },
    create:function (entity) {
        var defination = entities.definition[entity.name];
        // 同时将entity所有参数初始化在一个对象中，结构繁杂，所以将基础参数放在entities对象中，
        // 将其他fixture参数放在defination对象中，通过entity.name链接。
        switch (entity.type) {
        //判断entity类型，根据不同类型将defination数据初始化到entity对象中，选择绘制函数。
            case "block":
                entity.health = defination.fullHealth;
                entity.fullhealth = defination.fullHealth;
                entity.shape = "rectangle";
                entity.sprite = loader.loadImg("images/entities/"+entity.name+".png");
                box2d.createRectangle(entity,defination);
                break;
            case "ground":
                entity.shape = "rectangle";
                box2d.createRectangle(entity,defination);
                break;
            case "villain":
            case "hero":
                entity.health = defination.fullHealth;
                entity.fullhealth = defination.fullHealth;
                entity.sprite = loader.loadImg("images/entities/"+entity.name+".png");
                entity.shape = defination.shape;
                if(entity.shape == "rectangle"){
                    entity.width = defination.width;
                    entity.height = defination.height;
                    box2d.createRectangle(entity,defination);
                }else if(entity.shape == "circle"){
                    entity.radius = defination.radius;
                    box2d.createCircle(entity,defination);
                }
                break;
            default:
                console.log("无法识别的entity类型： "+entity.type);
                break;
        }
    },
    draw:function (entity,position,angle) {
        game.context.translate(position.x*box2d.scale,position.y*box2d.scale);
        game.context.rotate(angle);
        switch (entity.type) {
            case "block":
                game.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
                    -entity.width/2,-entity.height/2,entity.width,entity.height);
                break;
            case "villain":
            case "hero":
                if(entity.shape == "circle"){
                    game.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
                        -entity.radius,-entity.radius,entity.radius*2,entity.radius*2);
                    break;
                }else if(entity.shape == "rectangle"){
                    game.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
                        -entity.width/2,-entity.height/2,entity.width,entity.height);
                    break;
                }
            case "ground":
                break;
        }
        game.context.translate(-position.x*box2d.scale,-position.y*box2d.scale);
        game.context.rotate(-angle);
    }
}