node.require("fs"),node.require("nedb"),node.require("path"),node.require("mkdirp"),_g.animate_duration_delay=320,_g.execPath=node.path.dirname(process.execPath),_g.inputIndex=0,_g.lang="zh_cn",_g.path={db:process.cwd()+"/data/",pics:{ships:process.cwd()+"/pics/ships/",items:process.cwd()+"/pics/items/"}},_g.pathMakeObj=function(a){for(var e in a)"object"==typeof a[e]?_g.pathMakeObj(a[e]):node.mkdirp.sync(a[e])},_g.pathMakeObj(_g.path),_g.data={entities:{},items:{},item_types:{},ships:{},ship_id_by_type:[],ship_types:{},ship_classes:{}};var _db={entities:new node.nedb({filename:_g.path.db+"/entities.json"}),items:new node.nedb({filename:_g.path.db+"/items.json"}),item_types:new node.nedb({filename:_g.path.db+"/item_types.json"}),item_type_collections:new node.nedb({filename:_g.path.db+"/item_type_collections.json"}),ships:new node.nedb({filename:_g.path.db+"/ships.json"}),ship_types:new node.nedb({filename:_g.path.db+"/ship_types.json"}),ship_type_collections:new node.nedb({filename:_g.path.db+"/ship_type_collections.json"}),ship_type_order:new node.nedb({filename:_g.path.db+"/ship_type_order.json"}),ship_classes:new node.nedb({filename:_g.path.db+"/ship_classes.json"}),ship_series:new node.nedb({filename:_g.path.db+"/ship_series.json"}),ship_namesuffix:new node.nedb({filename:_g.path.db+"/ship_namesuffix.json"})};_g.ship_type_order=[],_g.ship_type_order_map={},_g.statSpeed={5:"低速",10:"高速"},_g.statRange={1:"短",2:"中",3:"长",4:"超长"},_g.getStatSpeed=function(a){return a=parseInt(a),_g.statSpeed[a]},_g.getStatRange=function(a){return a=parseInt(a),_g.statRange[a]},_g.getName=function(a,e){return e=e||"",a?(a[_g.lang]||a.ja_jp)+(a.suffix?e+(_g.data.ship_namesuffix[a.suffix][_g.lang]||_g.data.ship_namesuffix[a.suffix].ja_jp):""):null},_frame.app_main={page:{},page_dom:{},bgimg_dir:"./app/assets/images/homebg",bgimgs:[],loading:["dbs","bgimgs","db_namesuffix"],loaded:function(a,e){_frame.app_main.loading.splice(_frame.app_main.loading.indexOf(a),1),_frame.app_main.loading.length||_frame.app_main.is_loaded||(setTimeout(function(){_frame.app_main.is_loaded&&_frame.dom.layout.addClass("ready")},e?300:1e3),$window.on("hashchange.pagechange",function(){_frame.app_main.load_page_func(_g.uriHash("page"))}),_frame.app_main.load_page_func(_g.uriHash("page")),_frame.app_main.is_loaded=!0)},change_bgimg:function(a){function e(a){setTimeout(function(){a.remove()},_g.animate_duration_delay)}if(!_frame.app_main.bgimgs.length)return!1;var t=a&&a.length?a:_frame.app_main.bgimgs,i=t[_g.randInt(t.length)],s=_frame.app_main.cur_bgimg_el?_frame.app_main.cur_bgimg_el.css("background-image"):null;for(s=s?s.split("/"):null,s=s?s[s.length-1].split(")"):null,s=s?s[0]:null;i==s;)i=t[_g.randInt(t.length-1)];var n="."+_frame.app_main.bgimg_dir+"/blured/"+i;i="."+_frame.app_main.bgimg_dir+"/"+i,s&&e(_frame.app_main.cur_bgimg_el),_frame.app_main.cur_bgimg_el=$("<div/>").css("background-image","url("+i+")").appendTo(_frame.dom.bgimg).add($("<s"+(_frame.app_main.change_bgimg_fadein?' class="fadein"':"")+"/>").css("background-image","url("+n+")").appendTo(_frame.dom.nav)).add($("<s"+(_frame.app_main.change_bgimg_fadein?' class="fadein"':"")+"/>").css("background-image","url("+n+")").appendTo(_frame.dom.main)),_frame.app_main.change_bgimg_fadein=!0},toggle_hidecontent:function(){_frame.dom.layout.toggleClass("hidecontent")},load_page:function(a){_g.uriHash("page",a)},load_page_func:function(a){return _frame.app_main.cur_page!=a&&a?(_frame.app_main.page_dom[a]||(_frame.app_main.page_dom[a]=$('<div class="page" page="'+a+'"/>').appendTo(_frame.dom.main),node.fs.readFile("./app/page/"+a+".html","utf8",function(e,t){if(e)throw e;_frame.app_main.page_dom[a].html(t),_frame.app_main.page[a]&&_frame.app_main.page[a].init&&_frame.app_main.page[a].init(_frame.app_main.page_dom[a]),_p.initDOM(_frame.app_main.page_dom[a])})),_frame.app_main.page_dom[a].removeClass("off"),_frame.app_main.cur_page&&(_frame.dom.navs[_frame.app_main.cur_page].removeClass("on"),_frame.app_main.page_dom[_frame.app_main.cur_page].addClass("off")),_frame.dom.navs[a].addClass("on"),_frame.dom.layout.hasClass("ready")&&_frame.app_main.change_bgimg(),void(_frame.app_main.cur_page=a)):a},init:function(){function a(a){return $("<button />").on("click",function(){_frame.app_main.load_page(a)})}function e(){function a(){s.length?setTimeout(function(){e()},50):setTimeout(function(){_frame.app_main.loaded("dbs")},500)}var t=s[0];s.shift(),_db[t].loadDatabase(function(e){function i(){for(var a in _g.ship_type_order){var e=parseInt(a);if("object"==typeof _g.ship_type_order[a])for(var t in _g.ship_type_order[a])_g.ship_type_order_map[_g.ship_type_order[a][t]]=e;else _g.ship_type_order_map[_g.ship_type_order[a]]=e}}if(e);else switch(t){case"ship_namesuffix":_db.ship_namesuffix.find({}).sort({id:1}).exec(function(e,t){_g.data.ship_namesuffix=[{}].concat(t),_frame.app_main.loaded("db_namesuffix"),a()});break;case"ship_type_order":_db.ship_type_order.find({}).sort({id:1}).exec(function(e,t){for(var s in t)_g.ship_type_order.push(t[s].types.length>1?t[s].types:t[s].types[0]);i(),_db.ships.find({}).sort({type:1,"class":1,class_no:1,time_created:1,"name.suffix":1}).exec(function(e,t){for(var i in t)_g.data.ships[t[i].id]=t[i],"undefined"==typeof _g.data.ship_id_by_type[_g.ship_type_order_map[t[i].type]]&&(_g.data.ship_id_by_type[_g.ship_type_order_map[t[i].type]]=[]),_g.data.ship_id_by_type[_g.ship_type_order_map[t[i].type]].push(t[i].id);a()})});break;default:_db[t].find({},function(e,i){"undefined"==typeof _g.data[t]&&(_g.data[t]={});for(var s in i)_g.data[t][i[s].id]=i[s];a()})}})}if(_frame.app_main.is_init)return!0;if(_frame.dom.nav=$("<nav/>").appendTo(_frame.dom.layout),_frame.dom.logo=$('<button class="logo" />').on({"animationend, webkitAnimationEnd":function(){$(this).addClass("ready-animated")}}).appendTo(_frame.dom.nav),_frame.dom.navlinks=$("<div/>").appendTo(_frame.dom.nav),_frame.dom.main=$("<main/>").appendTo(_frame.dom.layout),_frame.dom.bgimg=$('<div class="bgimg" />').appendTo(_frame.dom.layout),_frame.app_main.nav&&_frame.app_main.nav.length){_frame.dom.navs={};for(var t in _frame.app_main.nav){var i=_frame.app_main.nav[t];_frame.dom.navs[i.page]=a(i.page).html(i.title).appendTo(_frame.dom.navlinks),0!=t||_g.uriHash("page")||_frame.dom.navs[i.page].trigger("click")}}node.fs.readdir(_frame.app_main.bgimg_dir,function(a,e){var t=_config.get("bgimgs"),i=[];t=t?t.split(","):[];for(var s in e){var n=node.fs.lstatSync(_frame.app_main.bgimg_dir+"/"+e[s]);if(!n.isDirectory())if(_frame.app_main.bgimgs.push(e[s]),t.length)$.inArray(e[s],t)<0&&i.push(e[s]);else{var p=parseInt(n.mtime.valueOf());i.length?p>i[1]&&(i=[e[s],p]):i=[e[s],p]}}t.length||i.pop(),_config.set("bgimgs",_frame.app_main.bgimgs),_frame.app_main.change_bgimg(i),_frame.app_main.loaded("bgimgs")});var s=[];for(var t in _db)s.push(t);e(),_frame.app_main.is_init=!0}},_frame.app_main.page.ships={},_frame.app_main.page.ships.init=function(){},_frame.app_main.page.equipments={},_frame.app_main.page.equipments.init=function(){},_frame.app_main.page.equipments.gen_helper_equipable_on=function(a){var e="";for(var t in _g.data.item_types[a].equipable_on_type){var i=_g.data.item_types[a].equipable_on_type[t];e+="<span>"+_g.data.ship_types[i].full_zh+(parseInt(t)<_g.data.item_types[a].equipable_on_type.length-1?",&nbsp;":"")+"</span>"}return'<em class="helper" data-tip="<h4 class=item_equipable_on>可装备于</h4>'+e+'">?</em>'},_frame.infos={show:function(a,e,t){switch(_frame.infos.dom||(_frame.infos.dom={nav:$('<div class="infos"/>').appendTo(_frame.dom.nav),main:$('<div class="page infos"/>').appendTo(_frame.dom.main)},_frame.infos.dom.back=$('<button class="back" icon="arrow-left"/>').html("返回").on("click",function(){_frame.infos.hide()}).appendTo(_frame.infos.dom.nav),_frame.infos.dom.historyback=$('<button class="history"/>').html("").on("click",function(){_frame.infos.historyback()}).appendTo(_frame.infos.dom.nav)),_frame.dom.layout.addClass("infos-show"),a){case"__ship__":a=_frame.infos.__ship(e),_frame.infos.dom.main.attr("data-infostype","shipinfo");break;case"__equipment__":a=_frame.infos.__equipment(e),_frame.infos.dom.main.attr("data-infostype","equipmentinfo")}var i=a.append?a[0].outerHTML.hashCode():a.hashCode();if(_frame.infos.curContent!=i){var s=a.append?a:$(a);e&&e.attr("data-infos-history-skip-this")&&s.attr("data-infos-history-skip-this",!0),_frame.infos.dom.main.children().length&&s.addClass("fadein"),t?(_frame.infos.dom.main.children().filter('[data-infos-history-skip-this="true"]').remove(),_frame.infos.dom.main.children().slice(2).remove(),_frame.infos.dom.main.children().eq(0).addClass("off"),_frame.infos.dom.historyback.html(t).addClass("show")):(_frame.infos.dom.historyback.html("").removeClass("show"),_frame.infos.dom.main.empty()),s.appendTo(_frame.infos.dom.main),_p.initDOM(s),_frame.infos.curContent=i}setTimeout(function(){_frame.dom.layout.addClass("infos-on")},1)},hide:function(){_frame.dom.layout.removeClass("infos-on"),_frame.dom.navlinks.children("button:last-of-type").on("transitionend.infos_hide",function(a){a.currentTarget==a.target&&"top"==a.originalEvent.propertyName&&0==parseInt($(this).css("top"))&&(_frame.dom.layout.removeClass("infos-show"),_frame.infos.dom.main.attr("data-infostype",""),$(this).off("transitionend.infos_hide"))})},historyback:function(){_frame.infos.dom.main.children().slice(1).remove(),_frame.infos.dom.main.children().eq(0).removeClass("off").addClass("fadein"),_frame.infos.dom.historyback.empty().removeClass("show"),_frame.infos.dom.main.children().eq(0).hasClass("ship")?_frame.infos.dom.main.attr("data-infostype","shipinfo"):_frame.infos.dom.main.children().eq(0).hasClass("equipment")&&_frame.infos.dom.main.attr("data-infostype","equipmentinfo")}},_frame.infos.init=function(){return _frame.infos.is_init?!0:($body.on("click._infos","[data-infos]",function(a){if("input"!=a.target.tagName.toLowerCase()||"compare"!=a.target.className){var e=$(this);_frame.infos.show(e.attr("data-infos"),e,e.attr("data-infos-history"))}}),_frame.infos.is_init=!0,!0)},_frame.infos.__ship=function(a){function e(a,e){return e||0!=a&&"0"!=a?-1==a||"-1"==a?'<small class="zero">?</small>':a:'<small class="zero">-</small>'}function t(a,t,i){function n(a,e,t){return Math.floor(e+(t-e)*a/99)}var p=0,o=null;switch(a){case"hp":p=e(s.stat.hp),o=s.stat.hp>=90?s.stat.hp+9:s.stat.hp>=70?s.stat.hp+8:s.stat.hp>=50?s.stat.hp+7:s.stat.hp>=40?s.stat.hp+6:s.stat.hp>=30?s.stat.hp+5:s.stat.hp+4,o>s.stat.hp_max&&(o=s.stat.hp_max);break;case"asw":p=e(n(99,s.stat.asw,s.stat.asw_max),/^(5|8|9|12)$/.test(s.type)),o=e(n(150,s.stat.asw,s.stat.asw_max),/^(5|8|9|12)$/.test(s.type));break;case"evasion":case"los":p=e(n(99,s.stat[a],s.stat[a+"_max"])),o=e(n(150,s.stat[a],s.stat[a+"_max"]));break;case"speed":p=_g.getStatSpeed(s.stat.speed);break;case"range":p=_g.getStatRange(s.stat.range);break;case"luck":p=s.stat.luck+"<sup>"+s.stat.luck_max+"</sup>",o=s.stat.luck+3+"<sup>"+s.stat.luck_max+"</sup>";break;case"fuel":case"ammo":p=e(s.consum[a]),o=e(Math.floor(.85*s.consum[a]));break;default:p=e(s.stat[a+"_max"]||s.stat[a])}$("<span/>").html('<small class="stat-'+a+'">'+t+"</small><em"+(o?' class="lvl99"':"")+">"+p+"</em>"+(o?'<em class="lvl150">'+o+"</em>":"")).appendTo(i)}function i(a,e){if(!T.stat[a])return"";switch(a){case"range":return"<span>射程: "+_g.getStatRange(T.stat[a])+"</span>";default:var t=parseInt(T.stat[a]);return"<span>"+(t>0?"+":"")+t+" "+e+"</span>"}}var s=_g.data.ships[a.data("shipid")];debugmode&&console.log(s);var n=$('<div class="ship"/>'),p=_g.getName(s.name,"・")||"舰娘",o=[];$('<div class="title"/>').html('<h2 data-content="'+p+'">'+p+"</h2><small>"+(s["class"]?_g.data.ship_classes[s["class"]].name_zh+"级":"")+(s.class_no?"<em>"+s.class_no+"</em>号舰":"")+(s.type?" / "+_g.data.ship_types[s.type].full_zh:"")+"</small>").appendTo(n);var _="_input_g"+parseInt(_g.inputIndex),d="_input_g"+(parseInt(_g.inputIndex)+1),r=parseInt(_config.get("ship_infos_lvl")||99),l=$('<div class="stats"/>').html('<div class="title"><h4 data-content="基础属性">基础属性</h4><span><label for="'+_+'" class="lvl99">99</label><label for="'+d+'" class="lvl150">150</label></span></div>').prepend($('<input type="radio" name="ship_infos_lvl" id="'+_+'" value="99"/>').prop("checked",99==r).on("change",function(){_config.set("ship_infos_lvl",$(this).val())})).prepend($('<input type="radio" name="ship_infos_lvl" id="'+d+'" value="150"/>').prop("checked",150==r).on("change",function(){_config.set("ship_infos_lvl",$(this).val())})).appendTo(n),m=$('<div class="stat"/>').appendTo(l),h=$('<div class="stat"/>').appendTo(l),c=$('<div class="stat"/>').appendTo(l),f=$('<div class="stat consum"/>').appendTo(l);_g.inputIndex+=2,t("hp","耐久",m),t("armor","装甲",m),t("evasion","回避",m),t("carry","搭载",m),t("fire","火力",h),t("torpedo","雷装",h),t("aa","对空",h),t("asw","对潜",h),t("speed","航速",c),t("range","射程",c),t("los","索敌",c),t("luck","运",c),t("fuel","油耗",f),t("ammo","弹耗",f);for(var u=$('<div class="equipments"/>').html('<h4 data-content="初始装备 & 搭载量">初始装备 & 搭载量</h4>').appendTo(n),g=0;4>g;){var b=$("<button/>").appendTo(u),v=$("<i/>").appendTo(b),y=$("<small/>").appendTo(b),k=$("<em/>").appendTo(b);if("undefined"==typeof s.slot[g])b.addClass("no");else if("undefined"!=typeof s.equip[g]&&s.equip[g]&&""!==s.equip[g]){var T=_g.data.items[s.equip[g]],x="assets/images/itemicon/"+_g.data.item_types[T.type].icon+".png";b.attr({"data-tip-position":"left","data-tip":'<h3 class="itemstat"><s style="background-image: url('+x+')"></s><strong data-content="'+T.name.zh_cn+'">'+T.name.zh_cn+"</strong><small>"+_g.data.item_types[T.type].name.zh_cn+"</small></h3>"+i("fire","火力")+i("torpedo","雷装")+i("aa","对空")+i("asw","对潜")+i("bomb","爆装")+i("hit","命中")+i("armor","装甲")+i("evasion","回避")+i("los","索敌")+i("range","射程")}),y.html(T.name.zh_cn.replace(/（([^（^）]+)）/g,"<small>($1)</small>")),k.html(s.slot[g]),v.css("background-image","url("+x+")")}else b.addClass("empty"),y.html("--未装备--"),k.html(s.slot[g]);g++}$('<span class="entity"/>').html("<strong>声优</strong><span>"+_g.data.entities[s.rels.cv].name[_g.lang]+"</span>").appendTo(n),$('<span class="entity"/>').html("<strong>画师</strong><span>"+_g.data.entities[s.rels.illustrator].name[_g.lang]+"</span>").appendTo(n);var w=$('<div class="remodels"/>').html('<h4 data-content="改造">改造</h4>').appendTo(n),q=_p.el.flexgrid.create().appendTo(w);s.series&&_db.ship_series.find({id:s.series},function(a,e){function t(a){a=a.replace(/\\/g,"/");try{var e=node.fs.lstatSync(a);e&&e.isFile()&&(c++,$('<input type="radio" name="ship_'+s.id+'_illustrations" value="'+c+'"/>').prop("checked",1==c).insertBefore(z),$('<span class="container"/>').html('<img src="'+a+'" data-filename="'+p+" - "+c+'.webp"/>').appendTo(z))}catch(t){}}if(!a&&e&&e.length){for(var i in e[0].ships){var n=parseInt(i),_=_g.data.ships[e[0].ships[i].id],d=_.name.zh_cn+(_.name.suffix?"・"+_g.data.ship_namesuffix[_.name.suffix].zh_cn:""),r='<h3 class="shipinfo"><strong data-content="'+d+'">'+d+"</strong>"+(_.type?"<small>"+_g.data.ship_types[_.type].full_zh+"</span>":"")+"</h3>",l=n?e[0].ships[n-1].next_lvl:null,m=n?e[0].ships[n-1].next_blueprint:null;if(q.appendDOM($('<button class="unit" data-shipid="'+e[0].ships[i].id+'" data-infos="__ship__"/>').attr({"data-tip":r,"data-infos-history":_frame.infos.dom.historyback.html()?_frame.infos.dom.historyback.html():null,"data-infos-history-skip-this":!0}).addClass(e[0].ships[i].id==s.id?"on":"").addClass(m?"blueprint":"").html('<i><img src="'+_g.path.pics.ships+"/"+e[0].ships[i].id+'/0.webp"/></i>'+(l?"<strong>"+l+"</strong>":""))),e[0].ships[i].id==s.id)if(e[0].ships[i].illust_delete){if(n&&(o.push(e[0].ships[n-1].id),e[0].ships[n-1].illust_extra&&e[0].ships[n-1].illust_extra.length&&e[0].ships[n-1].illust_extra[0]))for(var h in e[0].ships[n-1].illust_extra)o.push("extra_"+e[0].ships[n-1].illust_extra[h])}else if(o.push(e[0].ships[i].id),e[0].ships[i].illust_extra&&e[0].ships[i].illust_extra.length&&e[0].ships[i].illust_extra[0])for(var h in e[0].ships[i].illust_extra)o.push("extra_"+e[0].ships[i].illust_extra[h])}var c=0;for(var i in o)t(_g.path.pics.ships+"/"+o[i]+"/8.webp"),t(_g.path.pics.ships+"/"+o[i]+"/9.webp")}});var C=$('<aside class="illustrations"/>').appendTo(n),z=$("<div/>").appendTo(C);return n},_frame.infos.__equipment=function(a){function e(a,e){if(t.stat[a]){var i="";switch(a){case"range":i="<span>射程: "+_g.getStatRange(t.stat[a])+"</span>";break;default:var s=parseInt(t.stat[a]);i="<span>"+(s>0?"+":"")+s+" "+e+"</span>"}$("<span/>").html(i).appendTo(n)}}var t=_g.data.items[a.data("equipmentid")];debugmode&&console.log(t);var i=$('<div class="equipment"/>');$('<div class="title"/>').html('<h2 data-content="'+t.name.zh_cn+'">'+t.name.zh_cn+"</h2><small>"+(t.type?_g.data.item_types[t.type].name.zh_cn+_frame.app_main.page.equipments.gen_helper_equipable_on(t.type):"")+"</small>").appendTo(i);var s=$('<div class="stats"/>').html('<h4 data-content="属性">属性</h4>').appendTo(i),n=$('<div class="stat"/>').appendTo(s);e("fire","火力"),e("torpedo","雷装"),e("aa","对空"),e("asw","对潜"),e("bomb","爆装"),e("hit","命中"),e("armor","装甲"),e("evasion","回避"),e("los","索敌"),e("range","射程");var p=$('<div class="equipped"/>').html('<h4 data-content="初始装备于">初始装备于</h4>').appendTo(i),o=_p.el.flexgrid.create().appendTo(p);if(t.default_equipped_on&&t.default_equipped_on.length)for(var _ in t.default_equipped_on){var d=_g.data.ships[t.default_equipped_on[_]];o.appendDOM($('<button class="unit" data-infos="__ship__"/>').attr({"data-shipid":t.default_equipped_on[_],"data-infos":"__ship__","data-infos-history":'<span class="equipment"><span>'+(t.type?"<small>"+_g.data.item_types[t.type].name.zh_cn+"</small><br/>":"")+t.name.zh_cn+"</span></span>","data-infos-history-skip-this":!0}).html('<img src="'+_g.path.pics.ships+"/"+t.default_equipped_on[_]+'/0.webp"/><span>'+(t.type?"<small>"+_g.data.ship_types[d.type].full_zh+"</small>":"")+_g.getName(d.name,"・")+"</span>"))}else o.addClass("no").html("暂无初始配置该装备的舰娘...");var r=$('<aside class="illustrations"/>').appendTo(i);try{var l=_g.path.pics.items+"/"+t.id+"/card.webp",m=node.fs.lstatSync(l);m&&m.isFile()&&$('<img src="'+l+'" data-filename="'+t.name.zh_cn+'.webp"/>').appendTo(r)}catch(h){}return i},_p.el.tablelist={init_el:function(a){return a.data("tablelist")?!0:void a.data({tablelist:new _tablelist(a)})},init:function(a,e){a=a||$body,e=e||a.find(".tablelist"),e.each(function(){_p.el.tablelist.init_el($(this))})}};var _tablelist=function(a){this.dom={container:a},a.hasClass("ships")?this.listtype="ships":a.hasClass("equipments")&&(this.listtype="equipments"),this._index=this.global_index,this.global_index++,this.init()};_tablelist.prototype.global_index=0,_tablelist.prototype._ships_columns=["  ",["火力","fire"],["雷装","torpedo"],["对空","aa"],["对潜","asw"],["耐久","hp"],["装甲","armor"],["回避","evasion"],["搭载","carry"],["航速","speed"],["射程","range"],["索敌","los"],["运","luck"],["油耗","consum_fuel"],["弹耗","consum_ammo"]],_tablelist.prototype._ships_header_checkbox=[],_tablelist.prototype._ships_last_item=null,_tablelist.prototype._ships_append_item=function(a,e){function t(a,e){return e||0!=a&&"0"!=a?-1==a||"-1"==a?'<small class="zero">?</small>':a:'<small class="zero">-</small>'}var i=this,s=$('<tr class="row" data-shipid="'+a.id+'" data-header="'+e+'" data-infos="__ship__"/>').attr({"data-shipedit":i.dom.container.hasClass("shiplist-edit")?"true":null}).insertAfter(i._ships_last_item),n=0,p=a.name.zh_cn+(a.name.suffix?"<small>"+_g.data.ship_namesuffix[a.name.suffix].zh_cn+"</small>":""),o=$('<input type="checkbox" class="compare"/>').on("click, change",function(a,t){$(this).prop("checked")?s.attr("compare-checked",!0):s.removeAttr("compare-checked"),i._ships_compare_btn_show($(this).prop("checked")),t||i._ships_header_checkbox[e].trigger("docheck")});i._ships_last_item=s,i._ships_header_checkbox[e].data("ships",i._ships_header_checkbox[e].data("ships").add(s)),s.data("checkbox",o);for(var _ in a.carry)n+=a.carry[_];for(var _ in i._ships_columns)switch(i._ships_columns[_][1]){case" ":$("<th/>").html('<img src="'+_g.path.pics.ships+"/"+a.id+'/0.webp" contextmenu="disabled"/><strong>'+p+"</strong>").prepend(o).appendTo(s);break;case"asw":$('<td data-stat="asw" data-value="'+a.stat.asw_max+'"/>').html(t(a.stat.asw_max,/^(5|8|9|12)$/.test(a.type))).appendTo(s);break;case"hp":$('<td data-stat="hp" data-value="'+a.stat.hp+'"/>').html(t(a.stat.hp)).appendTo(s);break;case"carry":$('<td data-stat="carry" data-value="'+a.stat.carry+'"/>').html(t(a.stat.carry)).appendTo(s);break;case"speed":$('<td data-stat="speed" data-value="'+a.stat.speed+'"/>').html(_g.getStatSpeed(a.stat.speed)).appendTo(s);break;case"range":$('<td data-stat="range" data-value="'+a.stat.range+'"/>').html(_g.getStatRange(a.stat.range)).appendTo(s);break;case"luck":$('<td data-stat="luck" data-value="'+a.stat.luck+'"/>').html(a.stat.luck+"<sup>"+a.stat.luck_max+"</sup>").appendTo(s);break;case"consum_fuel":$('<td data-stat="consum_fuel" data-value="'+a.consum.fuel+'"/>').html(a.consum.fuel).appendTo(s);break;case"consum_ammo":$('<td data-stat="consum_ammo" data-value="'+a.consum.ammo+'"/>').html(a.consum.ammo).appendTo(s);break;default:$('<td data-stat="'+i._ships_columns[_][1]+'" data-value="'+a.stat[i._ships_columns[_][1]+"_max"]+'"/>').html(t(a.stat[i._ships_columns[_][1]+"_max"])).appendTo(s)}return a.remodel_next&&_g.data.ships[a.remodel_next]&&_g.ship_type_order_map[a.type]==_g.ship_type_order_map[_g.data.ships[a.remodel_next].type]&&a.name.ja_jp==_g.data.ships[a.remodel_next].name.ja_jp&&s.addClass("premodeled"),s},_tablelist.prototype._ships_append_all_items=function(){function a(t,i){if(_g.data.ship_id_by_type[t]){if(!i){if("object"==typeof _g.ship_type_order[t])var s=_g.data.ship_types[_g.ship_type_order[t][0]];else var s=_g.data.ship_types[_g.ship_type_order[t]];var n="_input_g"+parseInt(_g.inputIndex);e._ships_last_item=$('<tr class="typetitle"><th colspan="'+(e._ships_columns.length+1)+'"><label for="'+n+'">'+s.full_zh+"<small>["+s.code+"]</small></label></th></tr>").appendTo(e.dom.tbody);for(var p=0;9>p;)$('<tr class="empty"/>').appendTo(e.dom.tbody),p++;e._ships_header_checkbox[t]=$('<input type="checkbox" id="'+n+'"/>').on({change:function(){var a=$(this);a.data("ships").filter(":visible").each(function(){$(this).data("checkbox").prop("checked",a.prop("checked")).trigger("change",[!0])})},docheck:function(){var a=$(this).data("ships").filter(":visible"),e=a.filter("[compare-checked=true]");$(this).prop(e.length?e.length<a.length?{checked:!1,indeterminate:!0}:{checked:!0,indeterminate:!1}:{checked:!1,indeterminate:!1})}}).data("ships",$()).prependTo(e._ships_last_item.find("th")),_g.inputIndex++}e._ships_append_item(_g.data.ships[_g.data.ship_id_by_type[t][i]],t),setTimeout(function(){i>=_g.data.ship_id_by_type[t].length-1?a(t+1,0):a(t,i+1)},0)}else e.mark_high(),_frame.app_main.loaded("tablelist_"+e._index,!0),delete e._ships_last_item}var e=this;a(0,0)},_tablelist.prototype._ships_compare_btn_show=function(a){!a&&this.dom.tbody.find('input[type="checkbox"].compare:checked').length||a?this.dom.msg_container.attr("data-msgs","comparestart"):this.dom.msg_container.removeAttr("data-msgs")},_tablelist.prototype._ships_compare_start=function(){this.dom.msg_container.removeAttr("data-msgs"),this._ships_last_viewtype=this.dom.filter_container.attr("viewtype"),this.dom.filter_container.attr("viewtype","compare"),_config.set("shiplist-viewtype",this._ships_last_viewtype),this.mark_high()},_tablelist.prototype._ships_compare_end=function(){this.dom.tbody.find('input[type="checkbox"].compare:checked').prop("checked",!1).trigger("change"),this.dom.filter_container.attr("viewtype",this._ships_last_viewtype),delete this._ships_last_viewtype,this.dom.msg_container.removeAttr("data-msgs"),this.mark_high()},_tablelist.prototype._ships_compare_continue=function(){this.dom.filter_container.attr("viewtype",this._ships_last_viewtype),delete this._ships_last_viewtype,this.dom.msg_container.attr("data-msgs","comparestart"),this.mark_high()},_tablelist.prototype._ships_init=function(){function a(a){var e=$("<thead/>"),t=$("<tr/>").appendTo(e);for(var i in a)"object"==typeof a[i]?$('<td data-stat="'+a[i][1]+'"/>').html('<div class="th-inner">'+a[i][0]+"</div>").appendTo(t):$("<th/>").html('<div class="th-inner">'+a[i]+"</div>").appendTo(t);return e}var e=this;_frame.app_main.loading.push("tablelist_"+this._index),_frame.app_main.is_loaded=!1,this.dom.filter_container=$('<div class="options"/>').appendTo(this.dom.container),this.dom.filters=$('<div class="filters"/>').appendTo(this.dom.filter_container),this.dom.exit_compare=$('<div class="exit_compare"/>').append($('<button icon="close"/>').html("结束对比").on("click",function(){e._ships_compare_end()})).append($('<button icon="checkbox-checked"/>').html("继续选择").on("click",function(){e._ships_compare_continue()})).appendTo(this.dom.filter_container),this.append_option("checkbox","hide-premodel","仅显示同种同名舰最终版本","false"===_config.get("shiplist-filter-hide-premodel")?null:!0,null,{onchange:function(a,t){_config.set("shiplist-filter-hide-premodel",t.prop("checked")),e.dom.filter_container.attr("filter-hide-premodel",t.prop("checked"))}}),this.append_option("radio","viewtype",null,[["card",""],["list",""]],null,{radio_default:_config.get("shiplist-viewtype"),onchange:function(a,t){t.is(":checked")&&(_config.set("shiplist-viewtype",t.val()),e.dom.filter_container.attr("viewtype",t.val()))}}),this.dom.filters.find("input").trigger("change"),this.dom.table_container=$('<div class="fixed-table-container"/>').appendTo(this.dom.container),this.dom.table_container_inner=$('<div class="fixed-table-container-inner"/>').appendTo(this.dom.table_container),this.dom.table=$('<table class="ships hashover hashover-column"/>').appendTo(this.dom.table_container_inner),a(e._ships_columns).appendTo(this.dom.table),this.dom.tbody=$("<tbody/>").appendTo(this.dom.table),_g.data.ship_types?e._ships_append_all_items():$("<p/>").html("暂无数据...").appendTo(e.dom.table_container_inner),this.dom.msg_container=$('<div class="msgs"/>').appendTo(this.dom.container),_config.get("hide-compareinfos")||this.dom.msg_container.attr("data-msgs","compareinfos");var t=$('<div class="compareinfos"/>').html("点击舰娘查询详细信息，勾选舰娘进行对比").appendTo(this.dom.msg_container);$("<button/>").html("&times;").on("click",function(){e.dom.msg_container.removeAttr("data-msgs"),_config.set("hide-compareinfos",!0)}).appendTo(t);$('<div class="comparestart"/>').html("开始对比").on("click",function(){e._ships_compare_start()}).appendTo(this.dom.msg_container)},_tablelist.prototype._equipments_columns=["  ",["火力","fire"],["雷装","torpedo"],["对空","aa"],["对潜","asw"],["爆装","bomb"],["命中","hit"],["装甲","armor"],["回避","evasion"],["索敌","los"],["射程","range"]],_tablelist.prototype._equipments_append_item=function(a,e){function t(a,e){return e||0!=a&&"0"!=a?a:'<small class="zero">-</small>'}var i=this,s=$('<tr class="row" data-equipmentid="'+a.id+'" data-equipmentcollection="'+e+'" data-infos="__equipment__"/>').attr({"data-equipmentedit":i.dom.container.hasClass("equipmentlist-edit")?"true":null}).appendTo(this.dom.tbody);for(var n in i._equipments_columns)switch(i._equipments_columns[n][1]){case" ":$("<th/>").html(a.name.zh_cn).appendTo(s);break;case"range":$('<td data-stat="range" data-value="'+a.stat.range+'"/>').html(_g.getStatRange(a.stat.range)).appendTo(s);break;default:$('<td data-stat="'+i._equipments_columns[n][1]+'" data-value="'+a.stat[i._equipments_columns[n][1]]+'"/>').html(t(a.stat[i._equipments_columns[n][1]])).appendTo(s)}return s},_tablelist.prototype._equipments_append_all_items=function(){function a(t,i){if(_g.data.item_id_by_type[t]){if(!i){var s=_g.data.item_types[_g.item_type_order[t]];$('<tr class="typetitle" data-equipmentcollection="'+_g.data.item_id_by_type[t].collection+'"><th colspan="'+(e._equipments_columns.length+1)+'"><span style="background-image: url(../app/assets/images/itemicon/'+s.icon+'.png)"></span>'+s.name.zh_cn+_frame.app_main.page.equipments.gen_helper_equipable_on(s.id)+"</th></tr>").appendTo(e.dom.tbody)}e._equipments_append_item(_g.data.items[_g.data.item_id_by_type[t].equipments[i]],_g.data.item_id_by_type[t].collection),setTimeout(function(){i>=_g.data.item_id_by_type[t].equipments.length-1?a(t+1,0):a(t,i+1)},0)}else _frame.app_main.loaded("tablelist_"+e._index,!0)}var e=this;a(0,0)},_tablelist.prototype._equipments_init=function(){function a(a){var e=$("<thead/>"),t=$("<tr/>").appendTo(e);for(var i in a)"object"==typeof a[i]?$('<td data-stat="'+a[i][1]+'"/>').html('<div class="th-inner">'+a[i][0]+"</div>").appendTo(t):$("<th/>").html('<div class="th-inner">'+a[i]+"</div>").appendTo(t);return e}var e=this;if(!_g.data.item_id_by_type){_g.data.item_id_by_type=[],_g.item_type_order=[];var t={},i={};for(var s in _g.data.item_type_collections)for(var n in _g.data.item_type_collections[s].types)t[_g.data.item_type_collections[s].types[n]]=s,_g.item_type_order.push(_g.data.item_type_collections[s].types[n]),i[_g.data.item_type_collections[s].types[n]]=_g.item_type_order.length-1;for(var s in _g.data.items){var p=i[_g.data.items[s].type];_g.data.item_id_by_type[p]||(_g.data.item_id_by_type[p]={collection:t[_g.data.items[s].type],equipments:[]}),_g.data.item_id_by_type[p].equipments.push(_g.data.items[s].id)}}_frame.app_main.loading.push("tablelist_"+this._index),_frame.app_main.is_loaded=!1,this.dom.filter_container=$('<div class="options"/>').appendTo(this.dom.container),this.dom.filters=$('<div class="filters"/>').appendTo(this.dom.filter_container);var o=!1;for(var s in _g.data.item_type_collections){var _="_input_g"+parseInt(_g.inputIndex);$('<input type="radio" name="equipmentcollection" id="'+_+'" value="'+s+'"/>').prop("checked",!o).prependTo(this.dom.container),$('<label class="tab container" for="'+_+'" data-equipmentcollection="'+s+'"/>').html("<i></i><em></em><span>"+_g.data.item_type_collections[s].name.zh_cn.replace(/\&/g,"<br/>")+"</span>").appendTo(e.dom.filters),o=!0,_g.inputIndex++}this.dom.table_container=$('<div class="fixed-table-container"/>').appendTo(this.dom.container),this.dom.table_container_inner=$('<div class="fixed-table-container-inner"/>').appendTo(this.dom.table_container),this.dom.table=$('<table class="equipments hashover hashover-column"/>').appendTo(this.dom.table_container_inner),a(e._equipments_columns).appendTo(this.dom.table),this.dom.tbody=$("<tbody/>").appendTo(this.dom.table),e._equipments_append_all_items(),this.dom.msg_container=$('<div class="msgs"/>').appendTo(this.dom.container),_config.get("hide-equipmentsinfos")||this.dom.msg_container.attr("data-msgs","equipmentsinfos");var d=$('<div class="equipmentsinfos"/>').html("点击装备查询初装舰娘等信息").appendTo(this.dom.msg_container);$("<button/>").html("&times;").on("click",function(){e.dom.msg_container.removeAttr("data-msgs"),_config.set("hide-equipmentsinfos",!0)}).appendTo(d)},_tablelist.prototype.append_option=function(a,e,t,i,s,n){function p(){switch(a){case"text":case"number":case"hidden":var t=$('<input type="'+a+'" name="'+e+'" id="'+_+'" />').val(i);break;case"select":var t=$('<select name="'+e+'" id="'+_+'" />'),s=$('<option value=""/>').html("").appendTo(t);for(var p in i){if("object"==typeof i[p])var o=$('<option value="'+("undefined"==typeof i[p].val?i[p].value:i[p].val)+'"/>').html(i[p].title||i[p].name).appendTo(t);else var o=$('<option value="'+i[p]+'"/>').html(i[p]).appendTo(t);"undefined"!=typeof n["default"]&&o.val()==n["default"]&&o.prop("selected",!0)}i&&i.length||(s.remove(),$('<option value=""/>').html("...").appendTo(t)),n["new"]&&($('<option value=""/>').html("==========").insertAfter(s),$('<option value="___new___"/>').html("+ 新建").insertAfter(s),t.on("change.___new___",function(){var a=$(this);"___new___"==a.val()&&(a.val(""),n["new"](t))}));break;case"checkbox":var t=$('<input type="'+a+'" name="'+e+'" id="'+_+'" />').prop("checked",i);break;case"radio":var t=$();for(var p in i){var d,r,l=!1;i[p].push?(r=i[p][0],d=i[p][1]):(r=i[p].val||i[p].value,d=i[p].title||i[p].name),n.radio_default&&n.radio_default==r&&(l=!0),t=t.add($('<input type="radio" name="'+e+'" id="'+_+"-"+r+'" ischecked="'+l+'" />').val(r).prop("checked",l||!l&&0==p)),t=t.add($('<label for="'+_+"-"+r+'"/>').html(d))
}}return n.required&&t.prop("required",!0),n.onchange&&(t.on("change.___onchange___",function(a){n.onchange(a,$(this))}),n["default"]&&t.trigger("change")),e||t.attr("name",null),t}n=n||{};var o=$("<p/>").addClass(e).appendTo(this.dom.filters),_="_input_g"+parseInt(_g.inputIndex),t=t?$('<label for="'+_+'"/>').html(t).appendTo(o):null,d=p().appendTo(o);return"checkbox"==a&&t&&t.insertAfter(d),s&&$('<label for="'+_+'"/>').html(s).appendTo(o),_g.inputIndex++,o},_tablelist.prototype.sort_column=function(a,e,t){if(!t){var i=this.dom.tbody;i&&i.length||(i=this.dom.table.find("tbody")),t=i.find("tr.row:visible")}a=a||1,this._tmp_values=[],this._tmp_value_map_cell={};var s=this;t.find("td:nth-of-type("+a+")").each(function(){var a=$(this),e=$(this).data("value");e=parseFloat(e),$.inArray(e,s._tmp_values)<0&&s._tmp_values.push(e),s._tmp_value_map_cell[e]||(s._tmp_value_map_cell[e]=$()),s._tmp_value_map_cell[e]=s._tmp_value_map_cell[e].add(a)}),this._tmp_values.sort(function(a,t){return e?a-t:t-a});var n=[];for(var p in this._tmp_values)n.push(this._tmp_value_map_cell[this._tmp_values[p]]);return delete this._tmp_values,delete this._tmp_value_map_cell,n},_tablelist.prototype.mark_high=function(){var a=this.dom.tbody;a&&a.length||(a=this.dom.table.find("tbody"));var e=a.find("tr.row:visible");e.find("td[data-value]").removeClass("sort-first sort-second"),e.eq(0).find("td[data-value]").each(function(a){var t=!1;if(!$(this).data("stat").match(/\b(speed|range)\b/)){$(this).data("stat").match(/\b(consum_fuel|consum_ammo)\b/)&&(t=!0);var i=_tablelist.prototype.sort_column(a+1,t,e),s=Math.min(6,Math.ceil(e.length/2)+1);i.length>1&&i[0].length<s&&(i[0].addClass("sort-first"),i.length>2&&i[1].length<s&&i[1].addClass("sort-second"))}})},_tablelist.prototype.init=function(){return this.is_init?!0:(this["_"+this.listtype+"_init"]&&this["_"+this.listtype+"_init"](),void(this.is_init=!0))};