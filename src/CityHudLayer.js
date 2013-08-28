//MENU TYPES
ITEM_MENU = 0;
BLACKSMITH_MENU = 1;

DYNAMIC_MENU_TAG = "DynamicMenu";


var CityHudLayer = cc.Layer.extend({
    
    _tmxMap: null,
    _buildings: null,
    
    _currentMenuType: null,
    _currentMenuItensAmount: null,
    
    _player: null, 
    _winSize: null,
    
    
    
    // labels
    _goldLabel: null,
    _stoneLabel: null,
    _woodLabel: null,
    _clothLabel: null,
    
    // tmx layers names
    _terrainLayer: "Terrain",
    _objectLayer: "Objects",
    _hudLayer: "HUDLayer",
    
    init: function(map){
        this._super();
        
        console.log("CityHudLayer.init()");
        
        // ----------- variable initialization ------------
        this._currentMenuType = ITEM_MENU;
        this._currentMenuItensAmount = 6;
        this._tmxMap = map;
        
        this._player = new UserInfo();
        
        this._winSize = cc.Director.getInstance().getWinSize();
        
        this._buildings = new Array(10);
        for (var i = 0; i < 10; i++) {
          this._buildings[i] = new Array(10);
          for (var j = 0; j < 10; j++){
              this._building[i][j] = null;
          }
        }
        
        // ----------- menu -------------
        this.loadStaticMenu();
        this.loadDynamicMenu(this._currentMenuType);
        
        
        // ----------- enabling input ---------------
        this.setMouseEnabled(true);
        this.setKeyboardEnabled(true);
//        this.setTouchEnabled(true);
        console.log("Mouse enable: " + this.isMouseEnabled());
        console.log("Keyboard enable: " + this.isKeyboardEnabled());
        console.log("Touch enable: " + this.isTouchEnabled());
    },
            
    onMouseDown: function(event){
        
    },
    
    loadStaticMenu: function(){
        this._goldLabel = cc.LabelTTF.create("Gold: " + this._player._gold, "Verdana", 20, cc.size(100, 30), cc.TEXT_ALIGNMENT_LEFT);
        this._goldLabel.setPosition(20, this._winSize.y - 30);
        this.addChild(this._goldLabel);
        
        
        
    },
        
    loadDynamicMenu: function(menuType){
        if(menuType === this._currentMenuType){
            return;
        }
        var menu;
        switch(menuType){
            case BLACKSMITH_MENU:
                this.loadBlackmisthMenu();
                break;
        }
        
        if(menu){
            this.removeChildByTag(DYNAMIC_MENU_TAG); //precisa?
            this.addChild(menu, 1, DYNAMIC_MENU_TAG);
        }
        
    },
    
    loadBlacksmithMenu: function(){
        
    }
    
});

