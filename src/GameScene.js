function isoCoordsForPoint(point, layerSizeAux) {

//http://stackoverflow.com/questions/5611982/click-detection-in-a-2d-isometric-grid
//http://stackoverflow.com/questions/6915555/how-to-transform-mouse-location-in-isometric-tiling-map
//http://www.cocos2d-iphone.org/forums/topic/most-efficient-way-to-pick-a-tile-with-the-mouse-in-an-isometric-map/
//http://www.cocos2d-x.org/boards/6/topics/6884

//http://www.cocos2d-iphone.org/forums/topic/is-there-an-existing-tutorial-for-isometric-game-like-farmville/

    var mapHeight = layerSizeAux.height;
    var mapWidth = layerSizeAux.width;
    var tileWidth = 64;
    var tileHeight = 32;

    //return pixel coords of grid coords
    var posY = mapHeight - point.x / tileWidth + mapWidth / 2 - point.y / tileHeight;
    var posX = mapHeight + point.x / tileWidth - mapWidth / 2 - point.y / tileHeight;

    if (posX < 0)
        posX = 0;
    if (posY < 1)
        posY = 1;
    if (posX > mapWidth - 1)
        posX = mapWidth - 1;
    if (posY > mapHeight)
        posY = mapHeight;
    posX = Math.floor(posX);
    posY = Math.floor(posY);
    return (new cc.Point(posX, posY));
}
;


function tilePosFromLocation(location, tileMap) {
// Tilemap position must be subtracted, in case the tilemap position is scrolling
    var pos = ccpSub(location, tileMap.getPosition());
    var halfMapWidth = tileMap.getMapSize().width * 0.5;
    var mapHeight = tileMap.getMapSize().height;
    var tileWidth = tileMap.getTileSize().width;
    var tileHeight = tileMap.getTileSize().height;
    var tilePosDiv = new cc.Point(pos.x / tileWidth, pos.y / tileHeight);
    var inverseTileY = mapHeight - tilePosDiv.y;
// Cast to int makes sure that result is in whole numbers
    var posX = (inverseTileY + tilePosDiv.x - halfMapWidth);
    var posY = (inverseTileY - tilePosDiv.x + halfMapWidth);
// make sure coordinates are within isomap bounds
    posX = MAX(0, posX);
    posX = MIN(tileMap.getMapSize().width - 1, posX);
    posY = MAX(0, posY);
    posY = MIN(tileMap.getMapSize().height - 1, posY);

    posX = Math.floor(posX);
    posY = Math.floor(posY);


    return new cc.Point(posX, posY);
}
;

function MAX(a, b) {
    if (a > b)
        return a;
    return b;
}
;

function MIN(a, b) {
    if (a < b)
        return a;
    return b;
}
;

function ccpSub(v1, v2)
{
    return new cc.Point(v1.x - v2.x, v1.y - v2.y);
}
;

var HUDLayer = cc.Layer.extend({
    _label: null,
    _mouseDragged: null,
    _draggingStartPoint: null,
    _draggingEndPoint: null,
    _currentGID: null,
    _tmxMap: null,
    _menuStartingXOffset: null,
    _isBuilding: null,
    _winSize: null,
    _dragSprite: null,
    _dragSpriteTag: null,
    _dragPosition: null,
    _tileTaken: null,
    _terrainLayer: "Terrain",
    _objectLayer: "Objects",
    _hudLayer: "HUDLayer",
    
    init: function(tmxMap) {
        
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();
        
        console.log("HUDLayer.init()");
        
        //this.label = new cc.LabelTTF();
        this._tmxMap = tmxMap;
        this._mouseDragged = false;
        this._draggingStartPoint = cc.p(-1, -1);
        this._draggingEndPoint = cc.p(-1, -1);
        this._dragPosition = cc.p(-1, -1);
        this._currentGID = -1;
        this._isBuilding = false;
        this._tileTaken = false;
        this._dragSpriteTag = "auxSprite";
        this._winSize = cc.Director.getInstance().getWinSize();
        
        
        //cc.LabelTTF.create(label, fontName, fontSize, dimensions, alignment)
        //this.label = cc.LabelTTF.create("alignment left", "Verdana", 32, cc.size(winSize.width, 50), cc.TEXT_ALIGNMENT_LEFT);
        this._label = cc.LabelTTF.create("Label", "Verdana", 20, cc.size(100, 100), cc.TEXT_ALIGNMENT_RIGHT);
        this._label.setPosition(250, 5);
        this.addChild(this._label);

        // ----- Menu ------
        var menuSprite1 = cc.Sprite.create(s_isotile, cc.rect((64*1), 64 * 12, 64, 64));
        var menuSprite2 = cc.Sprite.create(s_isotile, cc.rect((64*4), 64 * 12, 64, 64));
        var menuSprite3 = cc.Sprite.create(s_isotile, cc.rect((64*9), 64 * 12, 64, 64));
        
//        var menuSpriteSelected1 = cc.Sprite.create(s_isotile, cc.rect(0,64*12+1,64,64));
//        var menuItem1 = cc.MenuItemSprite.create(menuSprite1, menuSpriteSelected1, this.menuItemFunc, this);
//        var menu = cc.Menu.create(menuItem1);
////        var menu = cc.Menu.create();
//        menu.alignItemsVertically();
        this._menuStartingXOffset = this._winSize.width - 100;
        
        
//        menu.setPosition(cc.p(winSize.width - 100, winSize.height - 150));
//        this.addChild(menu);

        menuSprite1.setPosition(cc.p(this._winSize.width - 100, this._winSize.height - 150));
        menuSprite2.setPosition(cc.p(this._winSize.width - 100, this._winSize.height - 200));
        menuSprite3.setPosition(cc.p(this._winSize.width - 100, this._winSize.height - 250));
        this.addChild(menuSprite1);
        this.addChild(menuSprite2);
        this.addChild(menuSprite3);

        // --- enabling mouse and keyboard -----
        //console.log(this.isKeyboardEnabled());
        this.setMouseEnabled(true);
        this.setKeyboardEnabled(true);
//        this.setTouchEnabled(true);
        console.log("mouse enable: " + this.isMouseEnabled());
        console.log("keyboard enable: " + this.isKeyboardEnabled());
    },
            
    onMouseDown: function(event) {

        if(!this._isBuilding){
            this._dragPosition = tilePosFromLocation(event.getLocation(), this._tmxMap);
        }
        
        if (!this.mouseDragged) {
            if(event.getLocation().x > this._menuStartingXOffset){
                //dragging from menu
                this._isBuilding = true;
                
                console.log("height = " + this._winSize.height);
                
                //case with menu options
                if (event.getLocation().y <= this._winSize.height - 150 && 
                        event.getLocation().y > this._winSize.height - 200){
                    // sprite 1 - gid=122
                    this._currentGID = 122;
//                    this._dragSprite = cc.Sprite.create(s_isotile, cc.rect((64*1), 64 * 12, 64, 64));
//                    this._dragSprite.setPosition(cc.p(this._winSize.width - 100, this._winSize.height - 150));
                }else if (event.getLocation().y <= this._winSize.height - 200 && 
                        event.getLocation().y > this._winSize.height - 250){
                    // sprite 2 - gid=125
                    this._currentGID = 125;
//                    this._dragSprite = cc.Sprite.create(s_isotile, cc.rect((64*4), 64 * 12, 64, 64));
//                    this._dragSprite.setPosition(cc.p(this._winSize.width - 100, this._winSize.height - 200));
                }else if (event.getLocation().y <= this._winSize.height - 250 && 
                        event.getLocation().y > this._winSize.height - 300){
                    // sprite 3 - gid=130
                    this._currentGID = 130;
//                    this._dragSprite = cc.Sprite.create(s_isotile, cc.rect((64*9), 64 * 12, 64, 64));
//                    this._dragSprite.setPosition(cc.p(this._winSize.width - 100, this._winSize.height - 250));
                }
                console.log("_currentGID = " + this._currentGID);
//                this._dragSprite.setOpacity(130);
//                this.addChild(this._dragSprite, 10, this._dragSpriteTag);
            }
            //TODO check the dragging sprite
            this._draggingStartPoint = event.getLocation();
            
        }
    },
            
    onMouseDragged: function(event) {
        this._mouseDragged = true;
        if(this._isBuilding){
            var currentDragPosition = tilePosFromLocation(event.getLocation(), this._tmxMap);
            if(this._dragPosition !== currentDragPosition){
                console.log("this.dragPosition !== currentDragPosition");
                var layer = this._tmxMap.getLayer(this._hudLayer);
                //this._dragSprite.setPosition(event.getLocation());
                layer.removeTileAt(this._dragPosition);
                layer.setTileGID(this._currentGID, currentDragPosition, 0);
                layer.getTileAt(currentDragPosition).setOpacity(150);
                var layer2 = this._tmxMap.getLayer(this._objectLayer);
                if(layer2.getTileGIDAt(currentDragPosition) != 0){
                    layer.getTileAt(currentDragPosition).setColor(new cc.Color3B(250,50,50));
                    this._tileTaken = true;
                }else{
                    this._tileTaken = false;
                }
                this._dragPosition = currentDragPosition;
            }
        }
        //TODO if(isBuilding) { follow_mouse_with_sprite = true}
        //TODO if(GID != -1){ GID = checkspriteGID()}
        console.log("onMouseDragged");
    },
            
    /*
     menuItemFunc: function(){
     console.log("menuItemFunc");
     },

    onTouchesMoved: function(pTouch, pEvent) {
        //        var layerHud = map.getLayer(HUDMapLayer);
        console.log("onTouchesMoved");

    },
     */
            
    onMouseUp: function(event) {
        console.log("onMouseUp");
        this._label.setString(event.getLocation().x + ", " + event.getLocation().y);
        var pos = event.getLocation();
//        console.log(event.getLocation());

        var layer2 = this._tmxMap.getLayer(this._objectLayer);

        //pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y
        console.log("pos(" + pos.x + ", " + pos.y + ")");
        console.log("layer = " + layer2.getLayerSize().width + ", " + layer2.getLayerSize().height);
        //console.log("layer(" + layer2.width + ", " + layer2.height + ")");

        var func1 = isoCoordsForPoint(pos, layer2.getLayerSize());
        console.log("func1(" + func1.x + ", " + func1.y + ")");
        var tilePosition = tilePosFromLocation(event.getLocation(), this._tmxMap);
        console.log("tilePosFromLocation = " + tilePosition.x + ", " + tilePosition.y);

        console.log("tileGITat(" + tilePosition.x + ", " + tilePosition.y + ") = " + layer2.getTileGIDAt(tilePosition));
        if (this._mouseDragged && this._isBuilding) {
            if(this._currentGID !== -1){
                this._draggingEndPoint = tilePosFromLocation(event.getLocation(), this._tmxMap);
                //TODO put sprite, change GID

                //gid = id do tile; pos = position do tile; flags = ? (numero)
                //cc.TMXLayer.setTileGID(gid, pos, flags)
                if(!this._tileTaken){
                    layer2.setTileGID(this._currentGID, this._draggingEndPoint, 0);
                    this._tileTaken = false;
                }
                this._currentGID = -1;
            }
        }
        if(this._dragPosition.x !== -1){
            var layer = this._tmxMap.getLayer(this._hudLayer);
            layer.removeTileAt(this._dragPosition);
        }
        this._dragPosition = cc.p(-1, -1);
        this.removeChild(this._dragSprite, true);
        this._mouseDragged = false;
        this._isBuilding = false;
        //console.log("tilePosFromLocation = " + Math.floor(tilePosition.x) + ", " + Math.floor(tilePosition.y));
        //layer2.removeTileAt(new cc.Point(Math.floor(tilePosition.x), Math.floor(tilePosition.y)));
        //console.log(layer2.getTileAt(event.getLocation()));
        //console.log(layer2.getTileAt(165,240));
    },
            
    onKeyUp: function(keyCode) {
        if (keyCode === cc.KEY.space) {
            var layer1 = this._tmxMap.getLayer(this._terrainLayer);
            var w = layer1.getLayerSize().width;
            var h = layer1.getLayerSize().height;

            for (var px = 0; px < w; px++) {
                for (var py = 0; py < h; py++) {
                    var p = layer1.getPositionAt(new cc.Point(px, py));
                    console.log("tile(" + px + ", " + py + ") = " + "position(" + p.x + ", " + p.y + ")");
                }
            }
        }
    }
});


var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        //var map = cc.TMXTiledMap.create("../mapas/map/mapa1.tmx", "../mapas/map/TileA2.png");
        this.map = new cc.TMXTiledMap();
        this.map.initWithTMXFile(s_SmallMap);

        var layer = new HUDLayer();
        layer.init(this.map);
        
        /*
        var backgroundLayer = new cc.Layer.create();
        backgroundLayer.init();
        var winSize = 640;
        var placeMenuItem1 = cc.Sprite.create(s_tileBuilding, cc.rect((64*0), 64 * 3, 64, 64));
        var placeMenuItem2 = cc.Sprite.create(s_tileBuilding, cc.rect((64*0), 64 * 3, 64, 64));
        var placeMenuItem3 = cc.Sprite.create(s_tileBuilding, cc.rect((64*0), 64 * 3, 64, 64));
        placeMenuItem1.setPosition(cc.p(winSize.width - 100, winSize.height - 150));
        placeMenuItem2.setPosition(cc.p(winSize.width - 100, winSize.height - 200));
        placeMenuItem3.setPosition(cc.p(winSize.width - 100, winSize.height - 250));
        backgroundLayer.addChild(placeMenuItem1);
        backgroundLayer.addChild(placeMenuItem2);
        backgroundLayer.addChild(placeMenuItem3);
        this.addChild(backgroundLayer);
        */
        
        this.addChild(this.map);
        console.log("asd");

        this.addChild(layer);
    }

});