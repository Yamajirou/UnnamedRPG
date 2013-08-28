var Layer1 = cc.Layer.extend({    
    ctor:function(){
        this._super();
        console.log("Layer 1.init()");
        this.setMouseEnabled(true);
        console.log("Layer 1 - mouse enable: " + this.isMouseEnabled());
        this.setKeyboardEnabled(true);
        this.setTouchEnabled(true);
        this.setMousePriority(0);
        var background = cc.LayerColor.create(cc.c4b(0, 0, 255, 255), 320, 360);
//        this.setScale(0.50,0.50);
        this.setContentSize(new cc.Size(10,10));
        this.addChild(createMenu1(), 1, DYNAMIC_MENU_TAG);
        this.addChild(background);
    },
    onMouseDown:function(event){
        console.log("onMouseDown");
        this._startingPosition = event.getLocation();
    },
    onMouseUp:function(event){
        console.log("Layer1");
        var minRange = 10;
        if((this._startingPosition.x + minRange) > event.getLocation().x){
            // movendo para direita
            this.removeChildByTag(DYNAMIC_MENU_TAG);
            this.addChild(createMenu2(), 1 ,DYNAMIC_MENU_TAG);
        }
        if((this._startingPosition.x + minRange) < event.getLocation().x){
            // movendo para direita
//            this.removeChildByTag(DYNAMIC_MENU_TAG);
            this.addChild(createMenu1(), 1 ,DYNAMIC_MENU_TAG);
        }
        
        console.log(event.getDelta());
    },
    onKeyUp:function(keyCode){
        console.log("key");
    },
    onTouchBegan:function(touch, event){
        console.log("touch");
    },
    onMouseDragged:function(event){
//        console.log("mouseDragged");
//        console.log(event.getLocation());
//        console.log("mouseDragged");
        
        
        
    }
});


var Layer2 = cc.Layer.extend({
    ctor:function(){
        this._super();
        console.log("Layer 2.init()");
        this.setMouseEnabled(true);
        console.log("Layer 2 - mouse enable: " + this.isMouseEnabled());
        this.setMousePriority(1);
    },
    onMouseUp:function(event){
        console.log("layer 2");
    }
});



var MyScrollMenu = cc.Menu.extend({
                ctor : function () {
                        this._super();
                        cc.associateWithNative(this, cc.Layer);
                        if ('touches' in sys.capabilities || sys.platform === "browser")
                                this.setTouchEnabled(true);
                        else if ('mouse' in sys.capabilities)
                                this.setMouseEnabled(true);
                },
                registerWithTouchDispatcher : function () {
                        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY + 1000, true);
                },
                onTouchBegan : function (touch, e) {
                        console.log("onTouchBegan");
                        this.touchPY1 = touch.getLocation().y;
                        console.log("this._state = " + this._state);
                        console.log("cc.MENU_STATE_WAITING = " + cc.MENU_STATE_WAITING);
                        console.log("this._visible = " + this._visible);
                        console.log("this._enabled = " + this._enabled);
                        
                        if (this._state != cc.MENU_STATE_WAITING || !this._visible || !this._enabled) {
                                console.log("IF - returning false ")
                                return false;
                        }
                        for (var c = this._parent; c != null; c = c.getParent()) {
                                if (!c.isVisible()) {
                                        console.log("FOR - returning false");
                                        return false;
                                }
                        }
                        this._selectedItem = this._itemForTouch(touch);
                        if (this._selectedItem) {
                                console.log("this._selectedItem");
                                this._state = cc.MENU_STATE_TRACKING_TOUCH;
                                this._selectedItem.selected();
                                return true;
                        }
                },
                onTouchMoved : function (touch, e) {
                        this.touchPY2 = touch.getLocation().y;
                        if (Math.abs(this.touchPY1 - this.touchPY2) > 0 && this._selectedItem) {
                                this._selectedItem.unselected();
                                this._selectedItem = null;
                        }
                },
                onTouchEnded : function (touch, e) {
                        console.log("onTouchEnded");
                        if (this._selectedItem) {
                                console.log("this._selectedItem");
                                this._selectedItem.unselected();
                                this._selectedItem.activate();
//                                cc.AudioEngine.getInstance().playEffect(Res.Sounds.Main.click);
                        }
                        this._state = cc.MENU_STATE_WAITING;
                }
        });

MyScrollMenu.create = function () {
        var ret = new MyScrollMenu();

        if (arguments.length == 0) {
                ret.initWithItems(null, null);
        } else if (arguments.length == 1) {
                if (arguments[0] instanceof Array) {
                        ret.initWithArray(arguments[0]);
                        return ret;
                }
        }
        ret.initWithItems(arguments);
        return ret;
};
var scrollViewTestLayer = cc.Layer.extend({
                ctor : function () {
                        this._super();
                        cc.associateWithNative(this, cc.Layer);

                        if ('touches' in sys.capabilities || sys.platform === "browser")
                                this.setTouchEnabled(true);
                        else if ('mouse' in sys.capabilities)
                                this.setMouseEnabled(true);

                        var container = cc.LayerColor.create(cc.c4b(0, 0, 255, 255), 320, 360);
                        
                        var _winSize = cc.Director.getInstance().getWinSize();
                        var spriteSize = cc.p(32, 32);
                        var menuSprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
                        var menuSpriteSelected1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 0, spriteSize.x, spriteSize.y));
                        var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, function(){ console.log("it works!");}, this);
                        menuItem1.setPosition(16, 16);
//                        menuItem1.setVertexZ(10);
//                        menuItem1.setEnabled(true);
//                        menuItem1.setVisible(true);
//                        var menu = new MyScrollMenu();
//                        var menu = MyScrollMenu.create(menuItem1);
                        var menu = MyScrollMenu.create();
//                        var menu = cc.Menu.create();
//                        var menu = new cc.Menu();

                        // adiciona o menuItem quando eh new MyScrollMenu()
                        // no MyScrollMenu.create() ele nao adicionar o menuItem (pelo menos nao da pra ver)
                        // se usar o new MyScrollMenu() ele nao inicializa algumas variaveis
                        // que está no initWithArray
                        
                        addMenuItens(menu);

//                        menu.addChild(menuItem1);
//                        menu.setEnabled(true);
//                        menu.setVisible(true);
                        console.log("menu.isEnabled() = " + menu.isEnabled());
                        container.addChild(menu);
                        

                        var scrollView = cc.ScrollView.create(cc.size(100, 150), container);
                        scrollView.setBounceable(true);
                        scrollView.setDirection(1);
                        scrollView.updateInset();

                        scrollView.setPosition(cc.p(100, 120));
                        scrollView.setContentOffset(cc.p(0, -220), true);

                        console.log("scrollView.getPosition().y = " + scrollView.getPosition().y);
                        console.log("container.getContentSize().height = " + container.getContentSize().height);
                        
                        menu.setPosition(cc.p(50,(scrollView.getPosition().y + container.getContentSize().height - 32)));
                        
                        //scrollView.ignoreAnchorPointForPosition(false);

                        scrollView.setDelegate(this);
//                        var spriteSize = cc.p(32, 32);
//                        var menuSprite11 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
//                        this.addChild(menuSprite11);
                        this.addChild(scrollView);
                },
                registerWithTouchDispatcher : function () {
                        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY - 100, true);
                },
                onTouchBegan : function (touch, e) {
                        //cc.log(touch.getLocation());
                        if (cc.rectContainsPoint(cc.rect(0, 120, 320, 300), touch.getLocation())) {
                                //cc.log(111111);
                                return false;
                        } else {
                                //cc.log(222222);
                                return true;
                        }
                },
                scrollViewDidScroll : function (view) {
                        //cc.log('scrollViewDidScroll');
                },
                scrollViewDidZoom : function (view) {
                        //cc.log('scrollViewDidZoom');
                }
        });
        
        
function addMenuItens(menu){
    var spriteSize = cc.p(32, 32);
    var menuSprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    
    var menuSpriteSelected1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 1, spriteSize.x, spriteSize.y));
//    menuSprite1.setPosition(cc.p(_winSize.width - 88, 300));
//    menuSprite2.setPosition(cc.p(_winSize.width - 44, 300));
//    menuSprite3.setPosition(cc.p(_winSize.width - 88, 250));
//    menuSprite4.setPosition(cc.p(_winSize.width - 44, 250));
//    menuSprite5.setPosition(cc.p(_winSize.width - 88, 200));
//    menuSprite6.setPosition(cc.p(_winSize.width - 44, 200));
    var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, function(){ console.log("menuItem1");}, menu);
    var menuItem2 = cc.MenuItemSprite.create(menuSprite2, menuSpriteSelected2, function(){ console.log("menuItem2");}, menu);
    var menuItem3 = cc.MenuItemSprite.create(menuSprite3, menuSpriteSelected3, function(){ console.log("menuItem3");}, menu);
    var menuItem4 = cc.MenuItemSprite.create(menuSprite4, menuSpriteSelected4, function(){ console.log("menuItem4");}, menu);
    var menuItem5 = cc.MenuItemSprite.create(menuSprite5, menuSpriteSelected5, function(){ console.log("menuItem5");}, menu);
    var menuItem6 = cc.MenuItemSprite.create(menuSprite6, menuSpriteSelected6, function(){ console.log("menuItem6");}, menu);
    
    menu.addChild(menuItem1);
    menu.addChild(menuItem2);
    menu.addChild(menuItem3);
    menu.addChild(menuItem4);
    menu.addChild(menuItem5);
    menu.addChild(menuItem6);
    
    menu.alignItemsInRows(3,3);
//    menu.setPosition(200,200);
//    menu.alignItemsVerticallyWithPadding(10);
    return menu;
}        
        
function createMenu1(){
    var menu;
    
    //TODO see plist
    //www.gamefromscratch.com/post/2012/08/14/Cocos2D-HTML-Tutorial-6-Spritesheets.aspx
    //cc.Sprite.createWithSpriteFrameName
    
    var spriteSize = cc.p(32, 32);
    var menuSprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    
    var menuSpriteSelected1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 1, spriteSize.x, spriteSize.y));
//    menuSprite1.setPosition(cc.p(_winSize.width - 88, 300));
//    menuSprite2.setPosition(cc.p(_winSize.width - 44, 300));
//    menuSprite3.setPosition(cc.p(_winSize.width - 88, 250));
//    menuSprite4.setPosition(cc.p(_winSize.width - 44, 250));
//    menuSprite5.setPosition(cc.p(_winSize.width - 88, 200));
//    menuSprite6.setPosition(cc.p(_winSize.width - 44, 200));
    var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, function(){ console.log("menuItem1");}, menu);
    var menuItem2 = cc.MenuItemSprite.create(menuSprite2, menuSpriteSelected2, function(){ console.log("menuItem2");}, menu);
    var menuItem3 = cc.MenuItemSprite.create(menuSprite3, menuSpriteSelected3, function(){ console.log("menuItem3");}, menu);
    var menuItem4 = cc.MenuItemSprite.create(menuSprite4, menuSpriteSelected4, function(){ console.log("menuItem4");}, menu);
    var menuItem5 = cc.MenuItemSprite.create(menuSprite5, menuSpriteSelected5, function(){ console.log("menuItem5");}, menu);
    var menuItem6 = cc.MenuItemSprite.create(menuSprite6, menuSpriteSelected6, function(){ console.log("menuItem6");}, menu);
//    var menuItem6 = cc.MenuItemSprite.create();
//    menuItem1.setPosition(16,0);
//    menuItem2.setPosition(16, 50);
//    menuItem3.setPosition(16, 100);
//    menuItem4.setPosition(16, 150);
    menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6);
//    menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4);
    
    menu.alignItemsInRows(3,3);
//    menu.setPosition(200,200);
//    menu.alignItemsVerticallyWithPadding(10);
    return menu;
};
        
function createMenu2(){
    var menu;
    
    //TODO see plist
    //www.gamefromscratch.com/post/2012/08/14/Cocos2D-HTML-Tutorial-6-Spritesheets.aspx
    //cc.Sprite.createWithSpriteFrameName
    
    var spriteSize = cc.p(32, 32);
    var menuSprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*3), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*4), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*5), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*3), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*4), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*5), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    
    var menuSpriteSelected1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*3), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*4), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*5), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*3), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*4), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*5), spriteSize.y * 1, spriteSize.x, spriteSize.y));
//    menuSprite1.setPosition(cc.p(_winSize.width - 88, 300));
//    menuSprite2.setPosition(cc.p(_winSize.width - 44, 300));
//    menuSprite3.setPosition(cc.p(_winSize.width - 88, 250));
//    menuSprite4.setPosition(cc.p(_winSize.width - 44, 250));
//    menuSprite5.setPosition(cc.p(_winSize.width - 88, 200));
//    menuSprite6.setPosition(cc.p(_winSize.width - 44, 200));
    var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, function(){ console.log("menuItem1");}, menu);
    var menuItem2 = cc.MenuItemSprite.create(menuSprite2, menuSpriteSelected2, function(){ console.log("menuItem2");}, menu);
    var menuItem3 = cc.MenuItemSprite.create(menuSprite3, menuSpriteSelected3, function(){ console.log("menuItem3");}, menu);
    var menuItem4 = cc.MenuItemSprite.create(menuSprite4, menuSpriteSelected4, function(){ console.log("menuItem4");}, menu);
    var menuItem5 = cc.MenuItemSprite.create(menuSprite5, menuSpriteSelected5, function(){ console.log("menuItem5");}, menu);
    var menuItem6 = cc.MenuItemSprite.create(menuSprite6, menuSpriteSelected6, function(){ console.log("menuItem6");}, menu);
//    var menuItem6 = cc.MenuItemSprite.create();
//    menuItem1.setPosition(16,0);
//    menuItem2.setPosition(16, 50);
//    menuItem3.setPosition(16, 100);
//    menuItem4.setPosition(16, 150);
//    menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6);
    menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6);
    
    menu.alignItemsInRows(3,3);
//    menu.setPosition(200,200);
//    menu.alignItemsVerticallyWithPadding(10);
    return menu;
};