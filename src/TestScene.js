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

        this.addChild(new scrollViewTestLayer());

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
