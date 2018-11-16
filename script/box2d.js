var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

var box2d = {
    scale:30,
    timeStep:1/60,
    velocityIterration:8,
    positionIterration:3,
    init:function () {
        var gravity = new b2Vec2(0,9.8);
        var allowsleep = true;
        box2d.world = new  b2World(gravity,allowsleep);

        //初始化box2d-debug绘制环境
        var debugContext = document.getElementById('debugcanvas').getContext('2d');
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(box2d.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        box2d.world.SetDebugDraw(debugDraw);
    },
    createRectangle:function (entity,definition) {
        var bodydef = new b2BodyDef;
        if(entity.isStatic){
            bodydef.type = b2Body.b2_staticBody;
        }else{
            bodydef.type = b2Body.b2_dynamicBody;
        }
        bodydef.position.x = entity.x/box2d.scale;
        bodydef.position.y = entity.y/box2d.scale;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = definition;
        fixtureDef.friction = definition;
        fixtureDef.restitution = definition;

        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(entity,entity);

        var body =box2d.world.CreateBody(bodydef);
        var fixture = body.CreateFixture(fixtureDef);
        body.SetUserData(entity);
        return body;
    },
    createCircle:function (entity,definition) {
        var bodydef = new b2BodyDef;
        if(entity.isStatic){
            bodydef.type = b2Body.b2_staticBody;
        }else{
            bodydef.type = b2Body.b2_dynamicBody;
        }
        bodydef.position.x = entity.x/box2d.scale;
        bodydef.position.y = entity.y/box2d.scale;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new b2CircleShape(entity);

        var body =box2d.world.CreateBody(bodydef);
        var fixture = body.CreateFixture(fixtureDef);
        body.SetUserData(entity);
        return body;
    },
    step:function (timestep) {
        if(timestep>1/30){
            timestep = 1/30;
        }
        box2d.world.Step(timestep,8,3);
    }
}


