//********************************************************************
// BingMaps v8
// BmapQuery: v1.0.0( https://mapapi.org/indexb.php )
// Auther:Daisuke.Yamazaki
// MIT License.
//********************************************************************
"use strict";function _instanceof(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):e instanceof t}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!_instanceof(e,t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}var Bmap=function(){function Bmap(e){_classCallCheck(this,Bmap),this.target=e,this.map=null,this.size=10,this.typeid="load",this.directionsManager=null,this.loc,this.layer=new Microsoft.Maps.Layer,this.watchId,this.tracker=[],this.time=[]}return _createClass(Bmap,[{key:"startMap",value:function startMap(lat,lon,typeid,size){if(""==this.target||""==lat||""==lon||""==typeid||""==size)return!1;this.size=size,this.typeid=typeid,this.map=new Microsoft.Maps.Map(this.target,{center:new Microsoft.Maps.Location(lat,lon),mapTypeId:eval("Microsoft.Maps.MapTypeId."+typeid),zoom:size})}},{key:"setLocation",value:function(e,t){return new Microsoft.Maps.Location(e,t)}},{key:"getCenter",value:function(){return this.map.getCenter()}},{key:"getLat",value:function(){return this.map.getCenter().latitude}},{key:"getLon",value:function(){return this.map.getCenter().longitude}},{key:"changeMap",value:function changeMap(lat,lon,id){if(""==this.map||""==lat||""==lon||""==id)return!1;var loc=new Microsoft.Maps.Location(lat,lon);void 0!==arguments[3]&&""!=arguments[3]?(this.size=arguments[3],this.map.setView({mapTypeId:eval("Microsoft.Maps.MapTypeId."+id),center:loc,zoom:this.size,bounds:loc.bestView})):this.map.setView({mapTypeId:eval("Microsoft.Maps.MapTypeId."+id),center:loc,bounds:loc.bestView})}},{key:"onMap",value:function(e,t){if("object"!=_typeof(this.map)||""==e||"function"!=typeof t)return!1;"viewchangestart"==e&&Microsoft.Maps.Events.addHandler(this.map,"viewchangestart",t),"viewchange"==e&&Microsoft.Maps.Events.addHandler(this.map,"viewchange",t),"viewchangeend"==e&&Microsoft.Maps.Events.addHandler(this.map,"viewchangeend",t),"click"==e&&Microsoft.Maps.Events.addHandler(this.map,"click",t),"dblclick"==e&&Microsoft.Maps.Events.addHandler(this.map,"dblclick",t),"rightclick"==e&&Microsoft.Maps.Events.addHandler(this.map,"rightclick",t),"mousedown"==e&&Microsoft.Maps.Events.addHandler(this.map,"mousedown",t),"mouseout"==e&&Microsoft.Maps.Events.addHandler(this.map,"mouseout",t),"mouseover"==e&&Microsoft.Maps.Events.addHandler(this.map,"mouseover",t),"mouseup"==e&&Microsoft.Maps.Events.addHandler(this.map,"mouseup",t),"mousewheel"==e&&Microsoft.Maps.Events.addHandler(this.map,"mousewheel",t),"maptypechanged"==e&&Microsoft.Maps.Events.addHandler(this.map,"maptypechanged",t)}},{key:"pin",value:function(e,t,o){var a,i,n,s;if(""==this.map||""==e||""==t||""==o)return!1;a=void 0!==arguments[3]&&0!=arguments[3],i=void 0!==arguments[4]&&0!=arguments[4],n=void 0!==arguments[5]&&0!=arguments[5],s=void 0===arguments[6]||1==arguments[6];var r=new Microsoft.Maps.Location(e,t),c=new Microsoft.Maps.Pushpin(r,{color:o,draggable:a,enableClickedStyle:i,enableHoverStyle:n,visible:s});return this.map.entities.push(c),c}},{key:"onPin",value:function(e,t,o){if("object"!==_typeof(e)||""===t||"function"!=typeof o)return!1;"click"==t&&Microsoft.Maps.Events.addHandler(e,"click",o),"mousedown"==t&&Microsoft.Maps.Events.addHandler(e,"mousedown",o),"mouseout"==t&&Microsoft.Maps.Events.addHandler(e,"mouseout",o),"mouseover"==t&&Microsoft.Maps.Events.addHandler(e,"mouseover",o),"mouseup"==t&&Microsoft.Maps.Events.addHandler(e,"mouseup",o)}},{key:"deletePin",value:function(){for(var e=this.map,t=e.entities.getLength()-1;t>=0;t--){_instanceof(e.entities.get(t),Microsoft.Maps.Pushpin)&&e.entities.removeAt(t)}}},{key:"pinText",value:function(e,t,o,a,i){if(""==this.map||""==e||""==t||""==o||""==a||""==i)return!1;var n=new Microsoft.Maps.Location(e,t),s=new Microsoft.Maps.Pushpin(n,{title:o,subTitle:a,text:i});return this.map.entities.push(s),s}},{key:"pinIcon",value:function(e,t,o,a,i,n){if(""==this.map||""==e||""==t||""==o||""==a)return!1;var s=this.map,r=new Microsoft.Maps.Location(e,t);this._createScaledPushpin(r,o,a,i,n,function(e){return s.entities.push(e),e})}},{key:"pinLayer",value:function(e,t,o){var a,i,n,s,r=this.map;if(""==this.map||""==e||""==t||""==o)return!1;a=void 0!==arguments[3]&&0!=arguments[3],i=void 0!==arguments[4]&&0!=arguments[4],n=void 0!==arguments[5]&&0!=arguments[5],s=void 0===arguments[6]||1==arguments[6];var c=new Microsoft.Maps.Location(e,t),l=new Microsoft.Maps.Pushpin(c,{color:o,draggable:a,enableClickedStyle:i,enableHoverStyle:n,visible:s});return this.layer.add(l),r.layers.insert(this.layer),l}},{key:"infoboxLayers",value:function(e,t){var o=this.map,a=[],i=[],n=[];if(""==o||"object"!==_typeof(e)||0===e.length)return!1;for(var s=function(s){var r=new Microsoft.Maps.Location(e[s].lat,e[s].lon);a[s]=new Microsoft.Maps.Layer,a[s].metadata={zoomRange:{min:1,max:20}},i[s]=new Microsoft.Maps.Pushpin(r,{color:e[s].pinColor}),a[s].add(i[s]),n[s]=new Microsoft.Maps.Infobox(r,{maxHeight:e[s].height,maxWidth:e[s].width,title:e[s].title,description:e[s].description,visible:e[s].show}),n[s].setMap(o),Microsoft.Maps.Events.addHandler(i[s],"click",function(){if(!0===t)for(var e=0;e<n.length;e++)n[e].setOptions({visible:!1});n[s].setOptions({visible:!0}),n[s].setMap(o)}),o.layers.insert(a[s])},r=0;r<e.length;r++)s(r)}},{key:"pinLayerClear",value:function(){void 0===arguments[0]?this.layer.clear():this.layer.remove(arguments[0])}},{key:"polyline",value:function(e,t,o){var a={strokeColor:t,strokeThickness:o,strokeDashArray:"object"==_typeof(arguments[3])?arguments[3]:[]},i=new Microsoft.Maps.Polyline(e,a);this.map.entities.push(i)}},{key:"_createScaledPushpin",value:function(e,t,o,a,i,n){var s=new Image;s.onload=function(){var t=document.createElement("canvas");t.width=s.width*o,t.height=s.height*o,t.getContext("2d").drawImage(s,0,0,t.width,t.height);var r=new Microsoft.Maps.Pushpin(e,{icon:t.toDataURL(),anchor:new Microsoft.Maps.Point(a,i)});n&&n(r)},s.src=t}},{key:"infobox",value:function(e,t,o,a){if(""==this.map||""==e||""==t||""==o||""==a)return!1;var i=new Microsoft.Maps.Location(e,t),n=new Microsoft.Maps.Infobox(i,{title:o,description:a});n.setMap(this.map)}},{key:"infoboxHtml",value:function(e,t,o){if(""==this.map||""==e||""==t||""==o)return!1;var a=new Microsoft.Maps.Location(e,t);new Microsoft.Maps.Infobox(a,{htmlContent:o}).setMap(this.map)}},{key:"infoboxIframe",value:function(e,t,o,a,i,n){new Microsoft.Maps.Infobox(this.setLocation(e,t),{maxHeight:o,maxWidth:a,title:i,description:n}).setMap(this.map)}},{key:"onInfobox",value:function(e,t,o,a,i){var n=this.setLocation(e,t);new Microsoft.Maps.Infobox(n,{maxHeight:this.map.getHeight()-50,maxWidth:this.map.getWidth()-50,title:o,description:a,actions:i}).setMap(this.map)}},{key:"getGeocode",value:async function(e,t){t(await this._geocodeQuery(e))}},{key:"_geocodeQuery",value:function(e){var t=this.map;return new Promise(function(o){var a;Microsoft.Maps.loadModule("Microsoft.Maps.Search",function(){(a=new Microsoft.Maps.Search.SearchManager(t))&&a.geocode({where:e,callback:function(e){if(e&&e.results&&e.results.length>0){var a=new Microsoft.Maps.Pushpin(e.results[0].location);return t.entities.push(a),t.setView({bounds:e.results[0].bestView}),o(e.results[0].location)}},errorCallback:function(e){return o(!1)}})})})}},{key:"reverseGeocode",value:async function(e,t){t(await this._reverseGeocode(e))}},{key:"_reverseGeocode",value:function(e){var t=this.map;return new Promise(function(o){var a;if(!a){var i={location:e,callback:function(e){return o(e.name)},errorCallback:function(e){return o("Unable to reverse geocode location.")}};Microsoft.Maps.loadModule("Microsoft.Maps.Search",function(){(a=new Microsoft.Maps.Search.SearchManager(t)).reverseGeocode(i)})}})}},{key:"onGeocode",value:function(e,t){(""!==e&&"string"==typeof e||"function"!=typeof t)&&Microsoft.Maps.Events.addHandler(this.map,e,t)}},{key:"direction",value:function(e,t,o,a){var i,n=this.map,s=arguments[4];Microsoft.Maps.loadModule("Microsoft.Maps.Directions",function(){i=new Microsoft.Maps.Directions.DirectionsManager(n),"walking"==t?i.setRequestOptions({routeMode:Microsoft.Maps.Directions.RouteMode.walking}):i.setRequestOptions({routeMode:Microsoft.Maps.Directions.RouteMode.driving});var r=new Microsoft.Maps.Directions.Waypoint({address:o});i.addWaypoint(r),void 0!==s&&s.forEach(function(e){var t=new Microsoft.Maps.Directions.Waypoint({address:e});i.addWaypoint(t)});var c=new Microsoft.Maps.Directions.Waypoint({address:a});i.addWaypoint(c),i.setRenderOptions({itineraryContainer:e}),Microsoft.Maps.Events.addHandler(i,"directionsError",function(e){alert("Error: "+e.message+"\r\nResponse Code: "+e.responseCode)}),Microsoft.Maps.Events.addHandler(i,"directionsUpdated",function(e){var t=i.getRequestOptions().routeIndex;Math.round(100*e.routeSummary[t].distance);i.getRequestOptions().distanceUnit,Microsoft.Maps.Directions.DistanceUnit.km}),i.calculateDirections()})}},{key:"selectedSuggestion",value:function(e,t){var o=this.map;Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest",function(){new Microsoft.Maps.AutosuggestManager({map:o}).attachAutosuggest(e,t,function(e){o.entities.clear(),o.entities.push(new Microsoft.Maps.Pushpin(e.location)),o.setView({bounds:e.bestView})})})}},{key:"traffic",value:function(){var e=this.map;Microsoft.Maps.loadModule("Microsoft.Maps.Traffic",function(){new Microsoft.Maps.Traffic.TrafficManager(e).show()})}},{key:"getBoundary",value:function(e){var t=this.map,o={entityType:e};Microsoft.Maps.loadModule("Microsoft.Maps.SpatialDataService",function(){Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(t.getCenter(),o,t,function(e){e.results&&e.results.length>0&&t.entities.push(e.results[0].Polygons)},null,function(e,t){console.log(e),console.log(t)})})}},{key:"getMultiBoundary",value:function(e){var t=this.map,o={entityType:"Postcode1"};Microsoft.Maps.loadModule("Microsoft.Maps.SpatialDataService",function(){Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(e,o,t,function(e){e.results&&e.results.length>0&&t.entities.push(e.results[0].Polygons)},null,function(e,t,o){console.log(e),console.log(t),console.log(o)})})}},{key:"getSearchBoundary",value:function(e,t){var o=this.map;Microsoft.Maps.loadModule(["Microsoft.Maps.SpatialDataService","Microsoft.Maps.Search"],function(){var a=new Microsoft.Maps.Search.SearchManager(o),i={where:e,callback:function(e){if(e&&e.results&&e.results.length>0){o.setView({bounds:e.results[0].bestView});var a={entityType:t,getAllPolygons:!0};Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(e.results[0].location,a,o,function(e){e.results&&e.results.length>0&&o.entities.push(e.results[0].Polygons)},null,function(e,t){console.log(e),console.log(t)})}}};a.geocode(i)})}},{key:"startTracking",value:function(e){var t=this.map,o=this.tracker,a=this.time,i=new Microsoft.Maps.Pushpin(t.getCenter(),{visible:!1});t.entities.push(i),this.watchId=navigator.geolocation.watchPosition(function(n){var s=new Microsoft.Maps.Location(n.coords.latitude,n.coords.longitude);i.setLocation(s),i.setOptions({visible:!0}),t.setView({center:s}),!0===e&&console.log(s),o.push(s),a.push(new Date(n.timestamp).toLocaleString())})}},{key:"stopTracking",value:function(){navigator.geolocation.clearWatch(this.watchId),this.map.entities.clear()}},{key:"startTrackingDraw",value:function(e,t){var o,a=this.map,i=this.tracker,n=this.time,s=!1,r="",c=0;void 0!==arguments[2]&&""!=arguments[2]&&(r=arguments[2]),void 0!==arguments[3]&&1==arguments[3]&&(s=!0),0===c&&navigator.geolocation.getCurrentPosition(function(e){var t=new Microsoft.Maps.Location(e.coords.latitude,e.coords.longitude);o=new Microsoft.Maps.Pushpin(t,{visible:!0}),a.entities.push(o)}),this.watchId=navigator.geolocation.watchPosition(function(l){var u=new Microsoft.Maps.Location(l.coords.latitude,l.coords.longitude);o.setLocation(u),a.setView({center:u}),i.push(u);var p=new Date(l.timestamp).toLocaleString();n.push(p);var f={strokeColor:e,strokeThickness:t};a.entities.push(new Microsoft.Maps.Polyline(i,f)),1==s&&(console.log(i),console.log(n)),""!=r&&null!=p&&(document.querySelector(r).innerHTML=p),c++})}},{key:"stopTrackingDraw",value:function(){navigator.geolocation.clearWatch(this.watchId)}},{key:"clearMap",value:function(){this.map.entities.clear()}},{key:"getTrackingData",value:function(){return this.tracker}},{key:"getTrackingSpeed",value:function(){return this.time}},{key:"getTrackingTime",value:function(){return this.time}},{key:"clearTrackingData",value:function(){this.tracker=[],this.time=[]}},{key:"circle",value:function(e,t){var o=this.map,a=arguments[2],i=arguments[3];Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath",function(){navigator.geolocation.getCurrentPosition(function(n){var s=new Microsoft.Maps.Location(n.coords.latitude,n.coords.longitude);o.setView({center:s});var r=Microsoft.Maps.SpatialMath.getRegularPolygon(s,e,36,Microsoft.Maps.SpatialMath.Meters),c=new Microsoft.Maps.Polygon(r,{fillColor:void 0===t.fillColor?"rgba(255,0,0,0.3)":t.fillColor,strokeThickness:void 0===t.strokeWidth?0:t.strokeWidth});o.entities.push(c),"click"!==a&&"mousedown"!==a&&"mouseout"!==a&&"mouseover"!==a&&"mouseup"!==a||"function"!=typeof i||Microsoft.Maps.Events.addHandler(c,a,i);var l=new Microsoft.Maps.Pushpin(s,{color:void 0===t.pinColor?"#ff0000":t.pinColor});o.entities.push(l)})})}},{key:"circleSet",value:function(e,t,o,a){var i=this.map,n=arguments[4],s=arguments[5];Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath",function(){var r=new Microsoft.Maps.Location(e,t),c=Microsoft.Maps.SpatialMath.getRegularPolygon(r,o,36,Microsoft.Maps.SpatialMath.Meters),l=new Microsoft.Maps.Polygon(c,{fillColor:void 0===a.fillColor?"rgba(255,0,0,0.3)":a.fillColor,strokeThickness:void 0===a.strokeWidth?0:a.strokeWidth});i.entities.push(l),"click"!==n&&"mousedown"!==n&&"mouseout"!==n&&"mouseover"!==n&&"mouseup"!==n||"function"!=typeof s||Microsoft.Maps.Events.addHandler(l,n,s);var u=new Microsoft.Maps.Pushpin(r,{color:void 0===a.pinColor?"#ff0000":a.pinColor});i.entities.push(u)})}},{key:"setLocationBoundary",value:function(e,t,o){var a=this.map,i=[],n=void 0!==arguments[3]&&1==arguments[3];function s(){for(var e,t=a.getZoom(),o=0;o<a.layers.length;o++)(e=a.layers[o]).metadata&&e.metadata.zoomRange&&(t>=e.metadata.zoomRange.min&&t<=e.metadata.zoomRange.max?e.setVisible(!0):e.setVisible(!1))}console.log(n),Microsoft.Maps.loadModule(["Microsoft.Maps.SpatialDataService","Microsoft.Maps.Search"],function(){for(var s=new Microsoft.Maps.Search.SearchManager(a),r=0;r<e.length;r++)s.geocode(c(r,t[r]));function c(t,s){return{where:e[t],callback:function(e){if(e&&e.results&&e.results.length>0){var r={entityType:o,getAllPolygons:n};Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(e.results[0].location,r,a,function(e){e.results&&e.results.length>0&&(i[t]=new Microsoft.Maps.Layer,i[t].metadata=void 0===s?{zoomRange:{min:1,max:20}}:{zoomRange:{min:s[0],max:s[1]}},i[t].add(e.results[0].Polygons),a.layers.insert(i[t]))},null,function(e,t){console.log(e),console.log(t)})}}}}}),Microsoft.Maps.Events.addHandler(a,"viewchangeend",s),s()}},{key:"heatMap",value:function(e){var t=this.map;Microsoft.Maps.loadModule(["Microsoft.Maps.GeoJson","Microsoft.Maps.HeatMap"],function(){Microsoft.Maps.GeoJson.readFromUrl(e,function(e){var o=new Microsoft.Maps.HeatMapLayer(e,{radius:5,propertyAsWeight:"mag"});t.layers.insert(o)})})}},{key:"geolocation",value:async function(e){e(await this._getGeolocation())}},{key:"_getGeolocation",value:function(){return new Promise(function(e){navigator.geolocation.getCurrentPosition(function(t){return console.log(t),e(t)})})}}]),Bmap}();