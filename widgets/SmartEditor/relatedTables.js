// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/Evented dojo/on dojo/string dojo/keys dojo/string dojo/dom-attr dojo/dom-style dojo/_base/lang dojo/_base/array dojo/dom-construct esri/graphic jimu/dijit/Message dijit/_WidgetBase ./presetUtils dojo/query esri/tasks/RelationshipQuery dojo/dom-geometry dojo/dom-class".split(" "),function(v,w,n,r,p,x,k,t,f,q,l,y,u,z,A,g,B,C,m){return v([z,w],{newRelatedFeature:{},_validRelations:[],isSaveEnable:!1,postCreate:function(){this._validRelations=[]},startup:function(){this._createTable()},
_createTable:function(){var b;b=l.create("div",{"class":"relatedTablesContainer"},this.domNode);q.forEach(this.relationshipInfo,f.hitch(this,function(a,c){a.featureLayer&&a.hasOwnProperty("relationshipId")&&this._createRelatedTableItem(a,b,c)}));0<g(".relatedTableTitleContainer",this.domNode).length?this.emit("addRelatedItemContent",!0):this.emit("addRelatedItemContent",!1)},_getKeyField:function(b){var a,c;a=b;b=b.toLowerCase();for(c in this.parentFeature.attributes)if(b===c.toLowerCase()){a=c;break}return a},
_createRelatedTableItem:function(b,a,c){var d,e,h={};if(e=this.layerInfosObj.getLayerOrTableInfoById(b.featureLayer.id))d=l.create("div",{"class":"relatedTableTitleContainer"},a),k.set(d,"layerId",e.id),k.set(d,"relationshipId",b.relationshipId),k.set(d,"parentFeatureOID",this.parentFeature.attributes[this.parentFeature._layer.objectIdField]),n(d,"click",f.hitch(this,function(a){a=k.get(a.currentTarget,"relatedRecordCount");(null===a||a&&0!==parseInt(a,10))&&this.emit("titleClicked",e.id,b.relationshipId,
!1,this.parentFeatureIndexInAI,this.parentFeature.attributes[this.parentFeature._layer.objectIdField],this.newRelatedFeature[b.relationshipId].foreignKeyField)})),a=l.create("div",{"class":"relatedTableTitle esriCTEllipsis relatedTableFields",innerHTML:e.title,tabindex:"-1",title:e.title,"aria-label":e.title,role:"button"},d),n(a,"keydown",f.hitch(this,function(a){a.keyCode!==p.ENTER&&a.keyCode!==p.SPACE||d.click()})),l.create("div",{"class":"esriCTLoadingIcon hidden"},d),l.create("div",{"class":"esriCTRelatedTableRecordsCount"},
d),h=this._checkRelationShip(e,b.relationshipId),h.isValidRelation?(this._createNewGraphics(b.relationshipId,e.id,h.primaryKeyField,h.foreignKeyField),this._validRelations.push(b)):l.destroy(d),this._canAddFeatures(b,e)&&"Table"===e.layerObject.type&&(a=r.substitute(this.nls.createNewFeatureLabel,{layerTitle:e.title}),a=l.create("div",{"class":"relatedTableIcons itemTitleCreateNew relatedTableFields",title:this.nls.addNewFeature,"aria-label":a,role:"button",tabindex:"-1"},d),k.set(a,"tableId",e.id),
n(a,"click",f.hitch(this,function(a){this._createNewButtonClick(a,b,e,d)})),n(a,"keydown",f.hitch(this,function(a){a.keyCode!==p.ENTER&&a.keyCode!==p.SPACE||this._createNewButtonClick(a,b,e,d)}))),this.relationshipInfo.length-1===c&&m.add(a,"esriCTLastRelatedItem"),h.isValidRelation&&this.getRelatedRecordsCount(b.relationshipId,e.id)},_createNewButtonClick:function(b,a,c,d){b.stopPropagation();b=this.newRelatedFeature[a.relationshipId];this.isSaveEnable?u({message:this.nls.pendingFeatureSaveMsg}):
(this.parentFeature.attributes.hasOwnProperty(b.primaryKeyField)||(b.primaryKeyField=this._getKeyField(b.primaryKeyField)),void 0===this.parentFeature.attributes[b.primaryKeyField]||null===this.parentFeature.attributes[b.primaryKeyField]?(a=A.getFieldInfoByFieldName(this.parentFieldInfos,b.primaryKeyField).label||b.primaryKeyField,a=x.substitute(this.nls.invalidRelationShipMsg,{parentKeyField:a}),u({message:a})):(this.newRelatedFeature[a.relationshipId].attributes[this.newRelatedFeature[a.relationshipId].foreignKeyField]=
this.parentFeature.attributes[this.newRelatedFeature[a.relationshipId].primaryKeyField],this.emit("addRelatedRecord",this.newRelatedFeature[a.relationshipId],d,c.id,this.parentFeatureIndexInAI,this.newRelatedFeature[a.relationshipId].foreignKeyField)))},_canAddFeatures:function(b,a){a=a.layerObject.getEditCapabilities();return!b.allowUpdateOnly&&b._editFlag&&a.canCreate?!0:!1},_checkRelationShip:function(b,a){var c,d,e,h=!0;c=this._getRelationShipById(this.parentFeature._layer,a);b=this._getRelationShipById(b.layerObject,
a);c&&c.keyField&&b&&b.keyField?(d=c.keyField,e=b.keyField):h=!1;return{isValidRelation:h,foreignKeyField:e,primaryKeyField:d}},_createNewGraphics:function(b,a,c,d){var e;e={};a=this.layerInfosObj.getLayerOrTableInfoById(a);0<a.layerObject.templates.length?e=a.layerObject.templates[0].prototype.attributes:0<a.layerObject.types.length&&(e=a.layerObject.types[0].templates[0].prototype.attributes);e=new y(null,null,f.clone(e));e.attributes.hasOwnProperty(d)&&(e.attributes[d]=this.parentFeature.attributes[c]);
this.newRelatedFeature[b]=e;this.newRelatedFeature[b].primaryKeyField=c;this.newRelatedFeature[b].foreignKeyField=d;this.newRelatedFeature[b].featureLayer=a;return!0},_getRelationShipById:function(b,a){var c;q.some(b.relationships,f.hitch(this,function(b){if(b.id===a)return c=b,!0}));return c},updateFeatureInstance:function(b){this.parentFeature&&(this.parentFeature.attributes=f.clone(b))},displayRelatedRecordCount:function(b,a){var c,d,e,h;a=g("[relationshipid \x3d "+a+"]",this.domNode);e=g(".relatedTableIcons.itemTitleCreateNew",
this.domNode);d=g(".esriCTLoadingIcon",a[0])[0];m.add(d,"hidden");c=g(".esriCTRelatedTableRecordsCount",a[0])[0];m.remove(c,"hidden");d=g(".relatedTableTitle",a[0])[0];k.set(c,"innerHTML","("+b+")");h=r.substitute(this.nls.relatedFeatureCount,{layerTitle:d.innerHTML,featureCount:b});k.set(d,"aria-label",h);k.set(a[0],"relatedRecordCount",b);c=C.position(c).w;if("auto"===c||void 0===c||""===c||0===c)c=8+7*b.toString().length;c=0<e.length?c+35:c+10;t.set(d,"width","calc(100% - "+c+"px)");0===b?m.add(a[0],
"esriCTRelatedTableTitleDefaultCursor"):m.remove(a[0],"esriCTRelatedTableTitleDefaultCursor")},updateRelatedRecordsCount:function(){q.forEach(this._validRelations,f.hitch(this,function(b){this.getRelatedRecordsCount(b.relationshipId,b.featureLayer.id)}))},_showLoadingIndicator:function(b){var a,c,d;c=g("[relationshipid \x3d "+b+"]",this.domNode);b=g(".relatedTableIcons.itemTitleCreateNew",this.domNode);d=g(".esriCTLoadingIcon",c[0])[0];a=g(".esriCTRelatedTableRecordsCount",c[0])[0];c=g(".relatedTableTitle",
c[0])[0];m.remove(d,"hidden");m.add(a,"hidden");a=20;a=0<b.length?a+35:a+10;t.set(c,"width","calc(100% - "+a+"px)")},getRelatedRecordsCount:function(b,a){var c,d,e;d=this.parentFeature._layer;e=this.parentFeature.attributes[this.parentFeature._layer.objectIdField];c=new B;a=this.layerInfosObj.getLayerOrTableInfoById(a).layerObject.objectIdField;c.returnGeometry=!1;c.outSpatialReference=this.mapSpatialReference;c.relationshipId=b;c.objectIds=[e];c.outFields=[a];this._showLoadingIndicator(b);d.queryRelatedFeatures(c,
f.hitch(this,function(a){(a=a[e]&&a[e].features)?this.displayRelatedRecordCount(a.length,b):this.displayRelatedRecordCount(0,b)}),f.hitch(this,function(){this.displayRelatedRecordCount(0,b)}))}})});