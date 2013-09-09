
var DungSceneHudLayer = cc.Layer.extend({
    
    _label: null,
    
    init:function(times){
//        var menuSprite1 = cc.Sprite.create(s_isotile, cc.rect((64*1), 64 * 12, 64, 64));
        var menuSprite1 = cc.MenuItemImage.create(
            "res/CloseNormal.png",
            "res/CloseSelected.png",
            function () {
                console.log("replacing scene -> new GameScene");
                cc.Director.getInstance().replaceScene(new GameScene());
            },this);
//        var menuSpriteSelected1 = cc.Sprite.create(s_isotile, cc.rect(0,64*12+1,64,64));
//        var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, this.menuItemFunc, this);
        var menu = cc.Menu.create(menuSprite1);
        menuSprite1.setPosition(cc.p(40, cc.Director.getInstance().getWinSize().height-40));
//        var menu = cc.Menu.create();
//        menu.setPosition(cc.p(winSize.width - 100, winSize.height - 150));
        menu.setPosition(cc.PointZero());
        this.addChild(menu);
        
        this._label = cc.LabelTTF.create("Times:" + times, "Verdana", 20, cc.size(100, 100), cc.TEXT_ALIGNMENT_RIGHT);
        this._label.setPosition(250, 5);
        this.addChild(this._label);
        
        this.setMouseEnabled(true);
        console.log("mouse enable: " + this.isMouseEnabled());
    }
});

var DungScene = cc.Scene.extend({
    
    _times: 0, //testing
    
    onEnter:function(){
        this._super();
        this._times++;
        var layer = new DungSceneHudLayer();
        layer.init(this._times);
        this.addChild(layer);
        
    }
});


