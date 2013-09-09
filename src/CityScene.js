var CityScene = cc.Scene.extend({
    onEnter:function(){
//        var menu123 = createMenu(this);
        //        menu123.setPosition(cc.p(100,200));
//        var scroll = cc.ScrollView.create(new cc.Size(50, 100), menu123);
//        scroll.setPosition(cc.p(150,200));
        
//        var scroll2 = new scrollViewTestLayer();
        
//        var rba = cc.LayerColor.create(cc.c3b(255,255,0,255), 200, 200);
//        var yellowBackground = cc.LayerColor.create(cc.c4b(255,255,0,255), 32, 100);
//        rba.setPosition(cc.p(250,200));
//        this.addChild(rba);
//        yellowBackground.setPosition(cc.p(150,200));
        
//        this.addChild(yellowBackground);
        
//        scroll.setMouseEnabled(true);
//        this.addChild(scroll);
//        this.addChild(scroll2);
//        var container = new cc.Layer.create();
//        var container = cc.LayerColor.create(cc.c4b(100,50,255,255));
//        var spriteSize = cc.p(32, 32);
//        var logo = new cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
//        var winSize = cc.Director.getInstance().getWinSize();
//        logo.setPosition(new cc.Point(winSize.width/2, winSize.height/2));
//        container.addChild(logo);

//        var scrollView = new cc.ScrollView.create(new cc.Size(800, 480), container);
//        scrollView.setContentSize(new cc.Size(300, 300));
//        scrollView.setPosition(0, 0);
//        scrollView.setContentOffset(new cc.Point(200,100));
//        scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
//        this.addChild(scrollView);



        //-------------Layer testing----------!!
        var l1 = new Layer1();
//        l1.init();
        console.log("Layer 1 - mouse enable: " + l1.isMouseEnabled());
        console.log("Layer 1 - keyboard enable: " + l1.isKeyboardEnabled());
        console.log("Layer 1 - touch enable: " + l1.isTouchEnabled());
//        l1.addChild(logo);
//        l1.setMouseEnabled(true);
        this.addChild(l1);
//        var l2 = new Layer2();
//        l2.init();
//        this.addChild(l2);
        
    }
    
});


function createMenu0(sceneLayer){
    var menu;
    
    var _winSize = cc.Director.getInstance().getWinSize();
    var spriteSize = cc.p(32, 32);
    var menuSprite1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected1 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected2 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSpriteSelected3 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 0, spriteSize.x, spriteSize.y));
    var menuSprite4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected4 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected5 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*1), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSprite6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 1, spriteSize.x, spriteSize.y));
    var menuSpriteSelected6 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*2), spriteSize.y * 1, spriteSize.x, spriteSize.y));
//    menuSprite1.setPosition(cc.p(_winSize.width - 88, 300));
//    menuSprite2.setPosition(cc.p(_winSize.width - 44, 300));
//    menuSprite3.setPosition(cc.p(_winSize.width - 88, 250));
//    menuSprite4.setPosition(cc.p(_winSize.width - 44, 250));
//    menuSprite5.setPosition(cc.p(_winSize.width - 88, 200));
//    menuSprite6.setPosition(cc.p(_winSize.width - 44, 200));
    var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, function(){ console.log("menuItem1");}, sceneLayer);
    var menuItem2 = cc.MenuItemSprite.create(menuSprite2, menuSpriteSelected2, function(){ console.log("menuItem2");}, sceneLayer);
    var menuItem3 = cc.MenuItemSprite.create(menuSprite3, menuSpriteSelected3, function(){ console.log("menuItem3");}, sceneLayer);
    var menuItem4 = cc.MenuItemSprite.create(menuSprite4, menuSpriteSelected4, function(){ console.log("menuItem4");}, sceneLayer);
    var menuItem5 = cc.MenuItemSprite.create(menuSprite5, menuSpriteSelected5, function(){ console.log("menuItem5");}, sceneLayer);
    var menuItem6 = cc.MenuItemSprite.create(menuSprite6, menuSpriteSelected6, function(){ console.log("menuItem6");}, sceneLayer);
//    menuItem1.setPosition(16, 16);
//    menuItem2.setPosition(16, 56);
//    menuItem3.setPosition(16, 96);
//    menuItem4.setPosition(16, 136);
//    menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6);
    menu = cc.Menu.create(menuItem1, menuItem2, menuItem3, menuItem4);
//    menu.alignItemsVerticallyWithPadding(10);
    menu.setContentSize(new cc.Size(100,100));
//    menu.alignItemsInRows(2,2);;
//    menu.alignItemsHorizontallyWithPadding(10);
    menu.setPosition(300,100);
    //fica zuado
    menu.alignItemsInColumns(4,0);
    
//    menu = cc.Menu.create(menuItem1);
    
    return menu;
};

//var MyScrollMenu = cc.Menu.extend({
//                ctor : function () {
//                        this._super();
//                        cc.associateWithNative(this, cc.Layer);
//                        if ('touches' in sys.capabilities || sys.platform === "browser")
//                                this.setTouchEnabled(true);
//                        else if ('mouse' in sys.capabilities)
//                                this.setMouseEnabled(true);
//                },
//                registerWithTouchDispatcher : function () {
//                        Global.director.getTouchDispatcher().addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY + 1000, true);
//                },
//                onTouchBegan : function (touch, e) {
//                        this.touchPY1 = touch.getLocation().y;
//                        if (this._state != cc.MENU_STATE_WAITING || !this._visible || !this._enabled) {
//                                return false;
//                        }
//                        for (var c = this._parent; c != null; c = c.getParent()) {
//                                if (!c.isVisible()) {
//                                        return false;
//                                }
//                        }
//                        this._selectedItem = this._itemForTouch(touch);
//                        if (this._selectedItem) {
//                                this._state = cc.MENU_STATE_TRACKING_TOUCH;
//                                this._selectedItem.selected();
//                                return true;
//                        }
//                },
//                onTouchMoved : function (touch, e) {
//                        this.touchPY2 = touch.getLocation().y;
//                        if (Math.abs(this.touchPY1 - this.touchPY2) > 0 && this._selectedItem) {
//                                this._selectedItem.unselected();
//                                this._selectedItem = null;
//                        }
//                },
//                onTouchEnded : function (touch, e) {
//                        if (this._selectedItem) {
//                                this._selectedItem.unselected();
//                                this._selectedItem.activate();
//                                Global.audioEngine.playEffect(Res.Sounds.Main.click);
//                        }
//                        this._state = cc.MENU_STATE_WAITING;
//                }
//        });
//
//MyScrollMenu.create = function () {
//        var ret = new MyScrollMenu();
//
//        if (arguments.length === 0) {
//                ret.initWithItems(null, null);
//        } else if (arguments.length === 1) {
//                if (arguments[0]instanceof Array) {
//                        ret.initWithArray(arguments[0]);
//                        return ret;
//                }
//        }
//        ret.initWithItems(arguments);
//        return ret;
//};
//var scrollViewTestLayer = cc.Layer.extend({
//                ctor : function () {
//                        this._super();
//                        cc.associateWithNative(this, cc.Layer);
//
//                        if ('touches' in sys.capabilities || sys.platform === "browser")
//                                this.setTouchEnabled(true);
//                        else if ('mouse' in sys.capabilities)
//                                this.setMouseEnabled(true);
//
//                        var container = cc.LayerColor.create(cc.c4b(0, 0, 255, 255), 320, 360);
//                        container.addChild(new MyScrollMenu() );
//
//                        var scrollView = cc.ScrollView.create(cc.size(320, 300), container);
//                        scrollView.setBounceable(true);
//                        scrollView.setDirection(1);
//                        scrollView.updateInset();
//
//                        scrollView.setPosition(cc.p(0, 120));
//                        scrollView.setContentOffset(cc.p(0, 0), true);
//
//                        //scrollView.ignoreAnchorPointForPosition(false);
//
//                        scrollView.setDelegate(this);
////                        var spriteSize = cc.p(32, 32);
////                        var menuSprite11 = cc.Sprite.create(s_menuItens, cc.rect((spriteSize.x*0), spriteSize.y * 0, spriteSize.x, spriteSize.y));
////                        this.addChild(menuSprite11);
//
//                        this.addChild(scrollView);
//                },
//                registerWithTouchDispatcher : function () {
//                        Global.director.getTouchDispatcher().addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY - 100, true);
//                },
//                onTouchBegan : function (touch, e) {
//                        //cc.log(touch.getLocation());
//                        if (cc.rectContainsPoint(cc.rect(0, 120, 320, 300), touch.getLocation())) {
//                                //cc.log(111111);
//                                return false;
//                        } else {
//                                //cc.log(222222);
//                                return true;
//                        }
//                },
//                scrollViewDidScroll : function (view) {
//                        //cc.log('scrollViewDidScroll');
//                },
//                scrollViewDidZoom : function (view) {
//                        //cc.log('scrollViewDidZoom');
//                }
//        });