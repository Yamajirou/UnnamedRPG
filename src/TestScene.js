var TestScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
//        var menu;
//        menu = createMenu(this);
//        menu.setColor(cc.c4b(0, 0, 255, 255));
        // TODO create NewMenu from cc.Menu.extend
        // tentar mudar o limite
        // pegar o drag down e trocar os itens do menu
        // see CityScene -> createMenu
        
        
        /// um layer manager com a posicao dos outros layers
        // ao passar em tal lugar, disable tal layer e enable outro
        // see LayerMultiplex or not..
        //... nao funciona com o mobile!!!
        
        
        
         //-------------Layer testing----------!!
//        var l1 = new Layer1();
//        l1.init();
//        console.log("Layer 1 - mouse enable: " + l1.isMouseEnabled());
//        console.log("Layer 1 - keyboard enable: " + l1.isKeyboardEnabled());
//        console.log("Layer 1 - touch enable: " + l1.isTouchEnabled());
//        l1.addChild(logo);
//        l1.setMouseEnabled(true);
//        var spriteSize = cc.p(32, 32);
//        var menuSprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
//        menuSprite1.setPosition(500,300);
//        this.addChild(l1,1,1);
//        l1.addChild(menuSprite1);
//        var l2 = new Layer2();
//        l2.init();
//        this.addChild(l2,5,1);
        
//        var clayer = cc.LayerColor.create(cc.c4b(100, 100, 100, 255), 320, 360);
//        var clayer2 = cc.LayerColor.create(cc.c4b(0, 0, 100, 255), 320, 360);
//        
//
//        this.addChild(clayer);
//        this.addChild(clayer2);
//
//        clayer.setPosition(50,50);
//        clayer2.setPosition(150,50);
//        
//        var actionTo = cc.MoveTo.create(0.1, cc.p(clayer.getPosition().x + 200, clayer.getPosition().y));
//        var actionTo2 = cc.MoveTo.create(0.1, cc.p(clayer2.getPosition().x + 200, clayer2.getPosition().y));
//        clayer.runAction(actionTo);
//        clayer2.runAction(actionTo2);
        
//        console.log("isDone = " + actionTo.isDone());
//        clayer.scheduleOnce(function(){clayer.setPosition(clayer.getPosition().x - 200, clayer.getPosition().y); console.log("isDone = " + actionTo.isDone());}, 0.5);
        
        this.addChild(new scrollViewTestLayer());
//        this.addChild(popupInfo(), 1, 1);
        
//        var spriteSize = cc.p(32, 32);
//        var sprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*3), spriteSize.y * 0, spriteSize.x, spriteSize.y));
//        var sprite2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*3), spriteSize.y * 0, spriteSize.x, spriteSize.y));
//        var menuItem1 = cc.MenuItemSprite.create(sprite1, sprite2, function(){ console.log("popupInfo");}, this);
//        var menu = cc.Menu.create( menuItem1);
//        this.addChild(menu);
        

//        var _winSize = cc.Director.getInstance().getWinSize();
//        var spriteSize = cc.p(32, 32);
//        var menuSprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
//        var menuSpriteSelected1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
//        var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, function(){ console.log("aaa");}, this);
//        menuItem1.setPosition(116, 116);
//        var menu = cc.Menu.create();
//        menu.addChild(menuItem1);
//        this.addChild(menu);
//        this.addChild(menu);
    }
})
;
