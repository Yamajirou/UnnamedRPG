// Item types       //TODO change values
ITEM_GEM = 0;
ITEM_ESSENCE = 0;
ITEM_ARTIFACT = 0;
ITEM_ORE = 0;
ITEM_WEAP = 0;
ITEM_ARMOR = 0;

var Item = cc.Class.extend({
    _itemID: null,
    _itemType: null,
    _sprite: null,
    _description: null,
    _stackable: null,
    ctor:function(itemID){
        this._itemID = itemID;
        //this._itemType = getTypeFromID(itemID);
        
    }
});

function getTypeFromItemID(itemID){
    
};
function getSpriteFromItemID(itemID){
    
};
function getDecriptionFromItemID(itemID){
    
};

var StackableItem = Item.extend({
    ctor:function(itemID){
        this._stackable = true;
        this._super(itemID);
    }
});

var Equipment = Item.extend({
    _requirement:null, // [array]
    _enchants:null, // [array]
    _lvlEnchant:null, //crude, normal, exceptional
    _maxEnchantQt: null,
    ctor:function(itemID){
        this._stackable = false;
        this._super(itemID);
    }
});

var Weapon = Equipment.extend({
    ctor:function(itemID){
        this._super(itemID);
        this._lvlEnchant = new LevelEnchant();
        //if(new equip)
        var enchantQt;
        //enchantQt = random(this._maxEnchantQt);
        this._enchants = new Array();
        for (var i = 0; i < enchantQt; i++){
            this._enchants[i] = new WeaponEnchant();
        }
        
        // if (!new equip)
    }
});




