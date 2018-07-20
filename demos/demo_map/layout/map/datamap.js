(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("datamap",
{ "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[485, 485, 485, 506, 485, 486, 485, 485, 485, 486, 485, 486, 506, 506, 485, 486, 485, 485, 486, 486, 485, 486, 485, 506, 485, 486, 506, 485, 486, 486, 485, 485, 506, 507, 485, 486, 506, 485, 486, 486, 506, 485, 506, 507, 485, 485, 506, 485, 486, 486, 507, 485, 506, 507, 485, 506, 485, 486, 486, 486, 507, 485, 506, 507, 485, 506, 485, 486, 507, 486, 507, 485, 506, 507, 485, 506, 485, 486, 507, 486, 507, 485, 506, 507, 485, 506, 485, 486, 507, 486, 507, 485, 506, 507, 485, 506, 485, 486, 507, 486],
         "height":10,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.1.6",
 "tileheight":32,
 "tilesets":[
        {
         "columns":21,
         "firstgid":1,
         "image":"ground_tiles.png",
         "imageheight":701,
         "imagewidth":672,
         "margin":0,
         "name":"ground_tiles",
         "spacing":0,
         "tilecount":441,
         "tileheight":32,
         "tilewidth":32
        }, 
        {
         "columns":21,
         "firstgid":442,
         "image":"ground_tiles.png",
         "imageheight":701,
         "imagewidth":672,
         "margin":0,
         "name":"ground_tiles",
         "spacing":0,
         "tilecount":441,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "type":"map",
 "version":1,
 "width":10
});