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
	var posY = mapHeight - point.x/tileWidth + mapWidth/2 - point.y/tileHeight;
	var posX = mapHeight + point.x/tileWidth - mapWidth/2 - point.y/tileHeight;

	if(posX<0)
		posX=0;
	if(posY<1)
		posY=1;
	if(posX>mapWidth-1)
		posX=mapWidth-1;
	if(posY>mapHeight)
		posY=mapHeight;
	return (new cc.Point(posX,posY));
};


function tilePosFromLocation(location, tileMap){
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
};

function MAX (a, b){
	if(a > b)
		return a;
	return b;
};

function MIN (a, b){
	if(a < b)
		return a;
	return b;
};

function ccpSub(v1, v2)
{
    return new cc.Point(v1.x - v2.x, v1.y - v2.y);
};

var HUDLayer = cc.Layer.extend({

	/*
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,
	*/
	
    init:function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();
		//this.label = new cc.LabelTTF();
		
		//cc.LabelTTF.create(label, fontName, fontSize, dimensions, alignment)
		//this.label = cc.LabelTTF.create("alignment left", "Verdana", 32, cc.size(winSize.width, 50), cc.TEXT_ALIGNMENT_LEFT);
		this.label = cc.LabelTTF.create("LAbel", "Verdana", 20, cc.size(100, 100), cc.TEXT_ALIGNMENT_RIGHT);
		this.label.setPosition(250, 5);
		this.addChild(this.label);
		
		
		
		console.log("HUDLayer.init");
		//console.log(this.isKeyboardEnabled());
		this.setMouseEnabled(true);
		this.setKeyboardEnabled(true);
		console.log("mouse enable: " + this.isMouseEnabled());
		console.log("keyboard enable: " + this.isKeyboardEnabled());
	},
	
	/*
	onTouchesMoved: function(pTouch, pEvent){
		
		var layerHud = map.getLayer(HUDMapLayer);
	
	},
	
	*/
	onMouseUp:function(event){
		console.log("onMouseUp");
		this.label.setString(event.getLocation().x + ", " + event.getLocation().y);
		var pos = event.getLocation();
		console.log(event.getLocation());
		
		var layer2 = map.getLayer(objectLayer);
		
		//pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y
		console.log("pos(" + pos.x + ", " + pos.y + ")");
		console.log("layer = " + layer2.getLayerSize().width + ", " + layer2.getLayerSize().height);
		//console.log("layer(" + layer2.width + ", " + layer2.height + ")");
		
		var pppp = isoCoordsForPoint(pos, layer2.getLayerSize());
		console.log("pppp(" + pppp.x + ", " + pppp.y + ")");
		var tilePosition = tilePosFromLocation(event.getLocation(), map);
		console.log("tilePosFromLocation = " + tilePosition.x + ", " + tilePosition.y);
		
		console.log("tileGITat(" + tilePosition.x + ", " + tilePosition.y + ") = " + layer2.getTileGIDAt(tilePosition));
		
		//gid = id do tile; pos = position do tile; flags = ? (numero)
		//cc.TMXLayer.setTileGID(gid, pos, flags)
		layer2.setTileGID(121, tilePosition, 0);
		
		
		//console.log("tilePosFromLocation = " + Math.floor(tilePosition.x) + ", " + Math.floor(tilePosition.y));
		
		
		
		//layer2.removeTileAt(new cc.Point(Math.floor(tilePosition.x), Math.floor(tilePosition.y)));
		
		//console.log(layer2.getTileAt(event.getLocation()));
		//console.log(layer2.getTileAt(165,240));
	},

	onKeyUp:function(keyCode){
		
		if(keyCode == cc.KEY.space){
			var layer1 = map.getLayer(layerName);
			var w = layer1.getLayerSize().width;
			var h = layer1.getLayerSize().height;
			
			for(var px = 0; px < w; px++){
				for(var py = 0; py < h; py++){
					var p = layer1.getPositionAt(new cc.Point(px,py))
					console.log("tile(" + px + ", " + py + ") = " + "position(" + p.x + ", " + p.y + ")" );
				}
			}
		}
	}
	
	
	
});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HUDLayer();
        layer.init();
		
		//var map = cc.TMXTiledMap.create("../mapas/map/mapa1.tmx", "../mapas/map/TileA2.png");
		map = new cc.TMXTiledMap()
		map.initWithTMXFile(s_SmallMap);
		layerName = "Terrain";
		objectLayer = "Objects";
		//HUDMapLayer = "HUDLayer";
		//console.log("childs = " + map.getChildrenCount());
		
		
		
		this.addChild(map);
		console.log ("asd");
		
		
        this.addChild(layer);
    }
	
});




