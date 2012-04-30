//     Zepto.js
//     (c) 2010, 2011 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
window.FiveApps={instance:{}};(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function v(a){return{}.toString.call(a)=="[object Function]"}function w(a){return a instanceof Object}function x(a){return a instanceof Array}function y(a){return typeof a.length=="number"}function z(b){return b.filter(function(b){return b!==a&&b!==null})}function A(a){return a.length>0?[].concat.apply([],a):a}function B(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})}function C(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function D(a){return a.filter(function(a,b,c){return c.indexOf(a)==b})}function E(a){return a in i?i[a]:i[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function F(a,b){return typeof b=="number"&&!k[C(a)]?b+"px":b}function G(a){var b,c;return h[a]||(b=g.createElement(a),g.body.appendChild(b),c=j(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),h[a]=c),h[a]}function H(b,c){c===a&&l.test(b)&&RegExp.$1,c in q||(c="*");var d=q[c];return d.innerHTML=""+b,f.call(d.childNodes)}function I(a,b){return a=a||e,a.__proto__=I.prototype,a.selector=b||"",a}function J(b,d){if(!b)return I();if(d!==a)return J(d).find(b);if(v(b))return J(g).ready(b);if(b instanceof I)return b;var e;return x(b)?e=z(b):m.indexOf(b.nodeType)>=0||b===window?(e=[b],b=null):l.test(b)?(e=H(b.trim(),RegExp.$1),b=null):b.nodeType&&b.nodeType==3?e=[b]:e=c(g,b),I(e,b)}function K(b,c){return c===a?J(b):J(b).filter(c)}function L(a,b,c,d){return v(b)?b.call(a,c,d):b}function M(a,b,c){var d=a%2?b:b.parentNode;d&&d.insertBefore(c,a?a==1?d.firstChild:a==2?b:null:b.nextSibling)}function N(a,b){b(a);for(var c in a.childNodes)N(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=window.document,h={},i={},j=g.defaultView.getComputedStyle,k={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+)[^>]*>/,m=[1,9,11],n=["after","prepend","before","append"],o=g.createElement("table"),p=g.createElement("tr"),q={tr:g.createElement("tbody"),tbody:o,thead:o,tfoot:o,td:p,th:p,"*":g.createElement("div")},r=/complete|loaded|interactive/,s=/^\.([\w-]+)$/,t=/^#([\w-]+)$/,u=/^[\w-]+$/;return J.extend=function(a){return f.call(arguments,1).forEach(function(c){for(b in c)a[b]=c[b]}),a},J.qsa=c=function(a,b){var c;return a===g&&t.test(b)?(c=a.getElementById(RegExp.$1))?[c]:e:f.call(s.test(b)?a.getElementsByClassName(RegExp.$1):u.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},J.isFunction=v,J.isObject=w,J.isArray=x,J.map=function(a,b){var c,d=[],e,f;if(y(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return A(d)},J.each=function(a,b){var c,d;if(y(a)){for(c=0;c<a.length;c++)if(b(c,a[c])===!1)return a}else for(d in a)if(b(d,a[d])===!1)return a;return a},J.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,indexOf:e.indexOf,concat:e.concat,map:function(a){return J.map(this,function(b,c){return a.call(b,c,b)})},slice:function(){return J(f.apply(this,arguments))},ready:function(a){return r.test(g.readyState)?a(J):g.addEventListener("DOMContentLoaded",function(){a(J)},!1),this},get:function(b){return b===a?this:this[b]},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return this.forEach(function(b,c){a.call(b,c,b)}),this},filter:function(a){return J([].filter.call(this,function(b){return b.parentNode&&c(b.parentNode,a).indexOf(b)>=0}))},end:function(){return this.prevObject||J()},andSelf:function(){return this.add(this.prevObject||J())},add:function(a,b){return J(D(this.concat(J(a,b))))},is:function(a){return this.length>0&&J(this[0]).filter(a).length>0},not:function(b){var c=[];if(v(b)&&b.call!==a)this.each(function(a){b.call(this,a)||c.push(this)});else{var d=typeof b=="string"?this.filter(b):y(b)&&v(b.item)?f.call(b):J(b);this.forEach(function(a){d.indexOf(a)<0&&c.push(a)})}return J(c)},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!w(a)?a:J(a)},last:function(){var a=this[this.length-1];return a&&!w(a)?a:J(a)},find:function(a){var b;return this.length==1?b=c(this[0],a):b=this.map(function(){return c(this,a)}),J(b)},closest:function(a,b){var d=this[0],e=c(b||g,a);e.length||(d=null);while(d&&e.indexOf(d)<0)d=d!==b&&d!==g&&d.parentNode;return J(d)},parents:function(a){var b=[],c=this;while(c.length>0)c=J.map(c,function(a){if((a=a.parentNode)&&a!==g&&b.indexOf(a)<0)return b.push(a),a});return K(b,a)},parent:function(a){return K(D(this.pluck("parentNode")),a)},children:function(a){return K(this.map(function(){return f.call(this.children)}),a)},siblings:function(a){return K(this.map(function(a,b){return f.call(b.parentNode.children).filter(function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return this.map(function(){return this[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),j(this,"").getPropertyValue("display")=="none"&&(this.style.display=G(this.nodeName))})},replaceWith:function(a){return this.each(function(){J(this).before(a).remove()})},wrap:function(a){return this.each(function(){J(this).wrapAll(J(a)[0].cloneNode(!1))})},wrapAll:function(a){return this[0]&&(J(this[0]).before(a=J(a)),a.append(this)),this},unwrap:function(){return this.parent().each(function(){J(this).replaceWith(J(this).children())}),this},hide:function(){return this.css("display","none")},toggle:function(b){return(b===a?this.css("display")=="none":b)?this.show():this.hide()},prev:function(){return J(this.pluck("previousElementSibling"))},next:function(){return J(this.pluck("nextElementSibling"))},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var c=this.innerHTML;J(this).empty().append(L(this,b,a,c))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(w(c))for(b in c)this.setAttribute(b,c[b]);else this.setAttribute(c,L(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.removeAttribute(a)})},data:function(a,b){return this.attr("data-"+a,b)},val:function(b){return b===a?this.length>0?this[0].value:null:this.each(function(a){this.value=L(this,b,a,this.value)})},offset:function(){if(this.length==0)return null;var a=this[0].getBoundingClientRect();return{left:a.left+window.pageXOffset,top:a.top+window.pageYOffset,width:a.width,height:a.height}},css:function(c,d){if(d===a&&typeof c=="string")return this.length==0?a:this[0].style[B(c)]||j(this[0],"").getPropertyValue(c);var e="";for(b in c)e+=C(b)+":"+F(b,c[b])+";";return typeof c=="string"&&(e=C(c)+":"+F(c,d)),this.each(function(){this.style.cssText+=";"+e})},index:function(a){return a?this.indexOf(J(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return this.length<1?!1:E(a).test(this[0].className)},addClass:function(a){return this.each(function(b){d=[];var c=this.className,e=L(this,a,b,c);e.split(/\s+/g).forEach(function(a){J(this).hasClass(a)||d.push(a)},this),d.length&&(this.className+=(c?" ":"")+d.join(" "))})},removeClass:function(b){return this.each(function(c){if(b===a)return this.className="";d=this.className,L(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(E(a)," ")}),this.className=d.trim()})},toggleClass:function(b,c){return this.each(function(d){var e=L(this,b,d,this.className);(c===a?!J(this).hasClass(e):c)?J(this).addClass(e):J(this).removeClass(e)})}},"filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(a){var b=J.fn[a];J.fn[a]=function(){var a=b.apply(this,arguments);return a.prevObject=this,a}}),["width","height"].forEach(function(b){J.fn[b]=function(c){var d,e=b.replace(/./,function(a){return a[0].toUpperCase()});return c===a?this[0]==window?window["inner"+e]:this[0]==g?g.documentElement["offset"+e]:(d=this.offset())&&d[b]:this.each(function(a){var d=J(this);d.css(b,L(this,c,a,d[b]()))})}}),n.forEach(function(a,b){J.fn[a]=function(a){var c=w(a)?a:H(a);if(!("length"in c)||c.nodeType)c=[c];if(c.length<1)return this;var d=this.length,e=d>1,f=b<2;return this.each(function(a,g){for(var h=0;h<c.length;h++){var i=c[f?c.length-h-1:h];N(i,function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&window.eval.call(window,a.innerHTML)}),e&&a<d-1&&(i=i.cloneNode(!0)),M(b,g,i)}})};var c=b%2?a+"To":"insert"+(b?"Before":"After");J.fn[c]=function(b){return J(b)[a](this),this}}),I.prototype=J.fn,J}();window.FiveApps.Zepto=Zepto,function(a){function f(a){return a._zid||(a._zid=d++)}function g(a,b,d,e){b=h(b);if(b.ns)var g=i(b.ns);return(c[f(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||g.test(a.ns))&&(!d||a.fn==d)&&(!e||a.sel==e)})}function h(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function i(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function j(b,c,d){a.isObject(b)?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function k(b,d,e,g,i){var k=f(b),l=c[k]||(c[k]=[]);j(d,e,function(c,d){var e=i&&i(d,c),f=e||d,j=function(a){var c=f.apply(b,[a].concat(a.data));return c===!1&&a.preventDefault(),c},k=a.extend(h(c),{fn:d,proxy:j,sel:g,del:e,i:l.length});l.push(k),b.addEventListener(k.e,j,!1)})}function l(a,b,d,e){var h=f(a);j(b||"",d,function(b,d){g(a,b,d,e).forEach(function(b){delete c[h][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function p(b){var c=a.extend({originalEvent:b},b);return a.each(o,function(a,d){c[a]=function(){return this[d]=m,b[a].apply(b,arguments)},c[d]=n}),c}function q(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.qsa,c={},d=1,e={};e.click=e.mousedown=e.mouseup=e.mousemove="MouseEvents",a.event={add:k,remove:l},a.fn.bind=function(a,b){return this.each(function(){k(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){l(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){k(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return l(d,b,a),c}})})};var m=function(){return!0},n=function(){return!1},o={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){return this.each(function(e,f){k(f,c,d,b,function(c){return function(d){var e,g=a(d.target).closest(b,f).get(0);if(g)return e=a.extend(p(d),{currentTarget:g,liveFired:f}),c.apply(g,[e].concat([].slice.call(arguments,1)))}})})},a.fn.undelegate=function(a,b,c){return this.each(function(){l(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return c===undefined||a.isFunction(c)?this.bind(b,c):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return c===undefined||a.isFunction(c)?this.unbind(b,c):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){return typeof b=="string"&&(b=a.Event(b)),q(b),b.data=c,this.each(function(){this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,h){d=p(typeof b=="string"?a.Event(b):b),d.data=c,d.target=h,a.each(g(h,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){if(a)this.bind(b,a);else if(this.length)try{this.get(0)[b]()}catch(c){}return this}}),a.Event=function(a,b){var c=document.createEvent(e[a]||"Events"),d=!0;if(b)for(var f in b)f=="bubbles"?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c}}(Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/(BlackBerry).*Version\/([\d.]+)/);d&&(c.version=d[1]),c.webkit=!!d,e&&(b.android=!0,b.version=e[2]),g&&(b.ios=!0,b.version=g[2].replace(/_/g,"."),b.iphone=!0),f&&(b.ios=!0,b.version=f[2].replace(/_/g,"."),b.ipad=!0),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),j&&(b.blackberry=!0,b.version=j[2])}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a,b){function k(a){return a.toLowerCase()}function l(a){return d?d+a:k(a)}var c="",d,e,f,g={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;a.each(g,function(a,e){if(i.style[a+"TransitionProperty"]!==b)return c="-"+k(a)+"-",d=e,!1}),a.fx={off:d===b&&i.style.transitionProperty===b,cssPrefix:c,transitionEnd:l("TransitionEnd"),animationEnd:l("AnimationEnd")},a.fn.animate=function(b,c,d,e){return a.isObject(c)&&(d=c.easing,e=c.complete,c=c.duration),c&&(c/=1e3),this.anim(b,c,d,e)},a.fn.anim=function(d,e,f,g){var h,i={},k,l=this,m,n=a.fx.transitionEnd;e===b&&(e=.4),a.fx.off&&(e=0);if(typeof d=="string")i[c+"animation-name"]=d,i[c+"animation-duration"]=e+"s",n=a.fx.animationEnd;else{for(k in d)j.test(k)?(h||(h=[]),h.push(k+"("+d[k]+")")):i[k]=d[k];h&&(i[c+"transform"]=h.join(" ")),a.fx.off||(i[c+"transition"]="all "+e+"s "+(f||""))}return m=function(){var b={};b[c+"transition"]=b[c+"animation-name"]="none",a(this).css(b),g&&g.call(this)},e>0&&this.one(n,m),setTimeout(function(){l.css(i),e<=0&&setTimeout(function(){l.each(function(){m.call(this)})},0)},0),this},i=null}(Zepto),function(a){function g(b,c,d){var e=a.Event(c);return a(b).trigger(e,d),!e.defaultPrevented}function h(a,b,c,e){if(a.global)return g(b||d,c,e)}function i(b){b.global&&a.active++===0&&h(b,null,"ajaxStart")}function j(b){b.global&&!--a.active&&h(b,null,"ajaxStop")}function k(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||h(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;h(b,c,"ajaxSend",[a,b])}function l(a,b,c){var d=c.context,e="success";c.success.call(d,a,e,b),h(c,d,"ajaxSuccess",[b,c,a]),n(e,b,c)}function m(a,b,c,d){var e=d.context;d.error.call(e,c,b,a),h(d,e,"ajaxError",[c,d,a]),n(b,c,d)}function n(a,b,c){var d=c.context;c.complete.call(d,b,a),h(c,d,"ajaxComplete",[b,c]),j(c)}function o(){}function q(b,d,e,f){var g=a.isArray(d);a.each(d,function(d,h){f&&(d=e?f:f+"["+(g?"":d)+"]"),!f&&g?b.add(h.name,h.value):(e?a.isArray(h):c(h))?q(b,h,e,d):b.add(d,h)})}var b=0,c=a.isObject,d=window.document,e,f;a.active=0,a.ajaxJSONP=function(c){var e="jsonp"+ ++b,f=d.createElement("script"),g=function(){a(f).remove(),e in window&&(window[e]=o),n(h,c,"abort")},h={abort:g},i;return window[e]=function(b){clearTimeout(i),a(f).remove(),delete window[e],l(b,h,c)},f.src=c.url.replace(/=\?/,"="+e),a("head").append(f),c.timeout>0&&(i=setTimeout(function(){h.abort(),n(h,c,"timeout")},c.timeout)),h},a.ajaxSettings={type:"GET",beforeSend:o,success:o,error:o,complete:o,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},crossDomain:!1,timeout:0},a.ajax=function(b){var d=a.extend({},b||{});for(e in a.ajaxSettings)d[e]===undefined&&(d[e]=a.ajaxSettings[e]);i(d),d.crossDomain||(d.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(d.url)&&RegExp.$2!=window.location.host);if(/=\?/.test(d.url))return a.ajaxJSONP(d);d.url||(d.url=window.location.toString()),d.data&&!d.contentType&&(d.contentType="application/x-www-form-urlencoded"),c(d.data)&&(d.data=a.param(d.data));if(d.type.match(/get/i)&&d.data){var g=d.data;d.url.match(/\?.*=/)?g="&"+g:g[0]!="?"&&(g="?"+g),d.url+=g}var h=d.accepts[d.dataType],j={},n=/^([\w-]+:)\/\//.test(d.url)?RegExp.$1:window.location.protocol,p=a.ajaxSettings.xhr(),q;d.crossDomain||(j["X-Requested-With"]="XMLHttpRequest"),h&&(j.Accept=h),d.headers=a.extend(j,d.headers||{}),p.onreadystatechange=function(){if(p.readyState==4){clearTimeout(q);var a,b=!1;if(p.status>=200&&p.status<300||p.status==0&&n=="file:"){if(h=="application/json"&&!/^\s*$/.test(p.responseText))try{a=JSON.parse(p.responseText)}catch(c){b=c}else a=p.responseText;b?m(b,"parsererror",p,d):l(a,p,d)}else m(null,"error",p,d)}},p.open(d.type,d.url,!0),d.contentType&&(d.headers["Content-Type"]=d.contentType);for(f in d.headers)p.setRequestHeader(f,d.headers[f]);return k(p,d)===!1?(p.abort(),!1):(d.timeout>0&&(q=setTimeout(function(){p.onreadystatechange=o,p.abort(),m(null,"timeout",p,d)},d.timeout)),p.send(d.data),p)},a.get=function(b,c){return a.ajax({url:b,success:c})},a.post=function(b,c,d,e){return a.isFunction(c)&&(e=e||d,d=c,c=null),a.ajax({type:"POST",url:b,data:c,success:d,dataType:e})},a.getJSON=function(b,c){return a.ajax({url:b,success:c,dataType:"json"})},a.fn.load=function(b,c){if(!this.length)return this;var e=this,f=b.split(/\s/),g;return f.length>1&&(b=f[0],g=f[1]),a.get(b,function(b){e.html(g?a(d.createElement("div")).html(b).find(g).html():b),c&&c.call(e)}),this};var p=encodeURIComponent;a.param=function(a,b){var c=[];return c.add=function(a,b){this.push(p(a)+"="+p(b))},q(c,a,b),c.join("&").replace("%20","+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a){function d(a){return"tagName"in a?a:a.parentNode}function e(a,b,c,d){var e=Math.abs(a-b),f=Math.abs(c-d);return e>=f?a-b>0?"Left":"Right":c-d>0?"Up":"Down"}function g(){b.last&&Date.now()-b.last>=f&&(a(b.target).trigger("longTap"),b={})}var b={},c,f=750;a(document).ready(function(){a(document.body).bind("touchstart",function(a){var e=Date.now(),h=e-(b.last||e);b.target=d(a.touches[0].target),c&&clearTimeout(c),b.x1=a.touches[0].pageX,b.y1=a.touches[0].pageY,h>0&&h<=250&&(b.isDoubleTap=!0),b.last=e,setTimeout(g,f)}).bind("touchmove",function(a){b.x2=a.touches[0].pageX,b.y2=a.touches[0].pageY}).bind("touchend",function(d){b.isDoubleTap?(a(b.target).trigger("doubleTap"),b={}):b.x2>0||b.y2>0?((Math.abs(b.x1-b.x2)>30||Math.abs(b.y1-b.y2)>30)&&a(b.target).trigger("swipe")&&a(b.target).trigger("swipe"+e(b.x1,b.x2,b.y1,b.y2)),b.x1=b.x2=b.y1=b.y2=b.last=0):"last"in b&&(c=setTimeout(function(){c=null,a(b.target).trigger("tap"),b={}},250))}).bind("touchcancel",function(){b={}})}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","longTap"].forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}})}(Zepto);
/*
	Shows a user feedback layer on top of the app.
	The user can type some comments and commit it 
	back to the developer.
*/
if(typeof FiveApps == 'undefined'){FiveApps={}}
FiveApps.Feedback = function() {
	var self = this
	self.mood = "neutral" // smiley mood
	self.appID = '4f7ad8fac4393415f10001e5' // App ID
	self.apiEndpoint = 'https://5apsps.com/api/feedback/'+self.appID
	self.feedbackString = false // text string with feedback
	self.html = false // HTML  String Layer
	self.bagde = true // shows a badge with event to open a layer
	self.badgePosition = 'top' // Position of the Badge: top, left, right, bottom
	self.categories = ["question","suggestion","problem"]
	self.moods = ['positive','neutral','negative']
	self.category = false
	self.controller = {}
	self.models = {}
	self.views = {}
	self.helper = {}
	self.lang = 'de'
	self.wording = {
		de: {
			badge: {
				text: 'Feedback'
			},
			info: {
				header: 'Bewerte Diese App',
				desc: 'Hier kannst Du eine Applikation bewerten und den Entwicklern Feedback geben',
				inputFeedback: 'dein Feedback ...',
				close: 'Schliessen'
			},
			buttons: {
				send: 'Senden',
				cancel: 'Abbrechen'
			},
			response: {
				success: {
					header: 'Danke!',
					desc: 'Deine Bewertung wurde abgesendet!'
				},
				error: {
					header: 'Fehler',
					desc: 'Deine Bewertung konnte nicht abgesendet werden!'
				}
			}
		}
	}
	// Init
	self.init = function() {
		self.views.appendBadge()
		self.events()
		if(window.localStorage.FiveAppsUserRef) {
			self.userref = window.localStorage.FiveAppsUserRef
		} else {
			self.userref = self.helper.generateUserId()
			window.localStorage.setItem('FiveAppsUserRef',self.userref)
		}
	}

	// define some events after the layer opened
	self.events = function() {
		// Click on the Badge
		var elem = FiveApps.Zepto('body')
		elem.on('click','#FiveAppsFeedbackBadge',self.controller.open) // click on the badge
		elem.on('click','#FiveAppsFeedback .FAF_smileys span', self.controller.clickMood) // click on a smiley
		elem.on('click','#FiveAppsFeedback .FAF_send', self.controller.clickSendFeedback) // click on send
		elem.on('click','#FiveAppsFeedback .FAF_cancel',self.controller.close) // click on cancel/close
		elem.on('click','#FiveAppsFeedback .FAF_back', self.views.showForm) // click on back 
		elem.on('focus','#FiveAppsFeedback textarea', function(){ console.log('BUG!')})
	}
	// Open a layer
	// Append html for the feedback layer
	// call all needed events and remove 
	// the badge from DOM
	self.controller.open = function() {
		self.views.showForm()
		// kill the badge from the dom
		self.views.removeBadge()
	}
	// Close layer
	// remove the layer html elements from the DOM
	// and append the Feedback Badge again
	self.controller.close = function() {
		// kill the feedback layer from the dom
		self.views.removeLayer()
		// bring the badge back
		self.views.appendBadge()
	}
	// get the feedback from textarea
	self.controller.addFeedback = function(feedbackString) {
		if(feedbackString){
			self.feedbackString = feedbackString
		}
	}
	// get the mood
	self.controller.addMood = function(moodId) {
		if(moodId) {
			self.mood = self.moods[moodId]
		}
	}
	// gets the values from the feedback form, stores it
	// and trigger an ajax call to the api, submitting all data
	self.controller.clickSendFeedback = function(event){
		// get the actual textarea content 
		self.controller.addFeedback(FiveApps.Zepto('#FiveAppsFeedback textarea').val())
		// get the selected category
		self.category = self.categories[FiveApps.Zepto('#FiveAppsFeedback .FAF_category select').val()]
		// send all infos to 5Apps
		self.models.sendFeedback(
			function(){self.views.showResponse(self.wording[self.lang].response.success)},
			function(){self.views.showResponse(self.wording[self.lang].response.error)}
		)
		console.log(self.wording[self.lang].response.err)
	}
	// user event: user clicks on a star:
	self.controller.clickMood = function(event){
		var clickedMood = FiveApps.Zepto(this).attr('data-vote')
		// get the selected star as voting
		self.controller.addMood(clickedMood)
		// remove all active css-classes from all stars
		FiveApps.Zepto('#FiveAppsFeedback .FAF_smileys span').removeClass('active')
		FiveApps.Zepto('#FiveAppsFeedback .FAF_smileys span').eq(clickedMood).addClass('active')
	}
	// genrates a random user_id and returns it
	self.helper.generateUserId = function() {
		var date = +new Date()
		return date+(Math.ceil(Math.random()*10000000000))
	}
	// ajax call to 5apps
	self.models.sendFeedback = function(callback, callbackErr) {
		Zepto.ajax({
			type: 'POST',
			url: self.apiEndpoint,
			data: {
				category: self.category,
				comment: self.feedbackString,
				mood: self.mood,
				userref: self.userref
			},
			success: function(response){
				if(typeof callback == 'function'){callback(response)}
			},
			error: function(response){
				if(typeof callbackErr == 'function'){callbackErr(response)}
			}
		})
	}


	// construct the badge and append it to DOM
	self.views.appendBadge = function() {
		// define HTML
		self.html = '<div id="FiveAppsFeedbackBadge" class="'+self.badgePosition+'">'+self.wording[self.lang].badge.text+'</div>'
		// put it in before </body>
		FiveApps.Zepto('body').append(self.html)
	}
	// just removes the badge html from dom
	self.views.removeBadge = function() {
		FiveApps.Zepto('#FiveAppsFeedbackBadge').remove()
	}
	// construct the layer and append it to dom
	self.views.appendLayer = function() {
		self.html = '<div id="FiveAppsFeedback"></div>';
		FiveApps.Zepto('body').append(self.html)
	}
	self.views.removeLayer = function() {
		FiveApps.Zepto('#FiveAppsFeedback').remove()
	}
	self.views.putFeedbackForm = function(){
		var feedback = self.feedbackString === false ? self.wording[self.lang].info.inputFeedback : self.feedbackString
		var moodBlock = ''
		for(var key in self.moods) {
			var active = self.mood == self.moods[key] ? ' active': ''
			moodBlock = moodBlock + '<span class="FAF_smiley'+active+'" data-vote="'+key+'"></span>'
		}
		var catBlock = '<select>'
		for(var key in self.categories) {
			var selected = self.category == self.categories[key] ? ' selected': ''
			catBlock = catBlock + '<option value="'+key+'"'+selected+'>'+self.categories[key]+'</option>'
		}
		catBlock = catBlock+'</select>'
		self.html = '<h1>'+self.wording[self.lang].info.header+'</h1>\
			<p>'+self.wording[self.lang].info.desc+'</p>\
			<div class="FAF_category">'+catBlock+'</div>\
			<div class="FAF_smileys">'+moodBlock+'</div>\
			<textarea>'+feedback+'</textarea>\
			<a class="FAF_button FAF_cancel">'+self.wording[self.lang].buttons.cancel+'</a>\
			<a class="FAF_button FAF_send">'+self.wording[self.lang].buttons.send+'</a>';
		FiveApps.Zepto('#FiveAppsFeedback').html(self.html)
	}
	// shows a response after the request
	self.views.putResponse = function(obj) {
		self.html = '<h1>'+obj.header+'</h1>\
			<p>'+obj.desc+'</p>\
			<a class="FAF_button FAF_cancel">Schliessen</a>\
			<a class="FAF_button FAF_back">Zurück</a>';
		FiveApps.Zepto('#FiveAppsFeedback').html(self.html)
	}
	self.views.showForm = function() {
		self.views.removeLayer()
		// Append HTML
		self.views.appendLayer()
		// Append HTML
		self.views.putFeedbackForm()
	}
	// shows a response after the request
	self.views.showResponse = function(obj) {
		self.views.removeLayer()
		// Append HTML for the Feedback Layer
		self.views.appendLayer()
		// Append HTML for the Response
		self.views.putResponse(obj)
	}
	// removes the layer completly
	self.views.removeLayer = function() {
		FiveApps.Zepto('#FiveAppsFeedback').remove()
	}
	self.init()
}
FiveApps.Zepto(function() {
	FiveApps.instance.Feedback = new FiveApps.Feedback
})
FiveApps.Zepto(function() {
 			var styleElem = document.createElement("style");
 			styleElem.setAttribute("data-injected-css", "yea");
 			styleElem.setAttribute("type", "text/css");
 			styles = document.getElementsByTagName("style");
 			domTarget = document.getElementsByTagName("head")[0];
 			domTarget.appendChild(styleElem);
 			var content = "#FiveAppsFeedback * { 	border: 0px; 	padding: 0px; 	margin: 0px; 	font: normal normal 14px/18px \"Helvetica Neue\", Arial, Helvetica, Geneva, sans-serif; 	text-decoration: none; 	text-transform: none; 	text-align: left; 	white-space: normal; 	background-color: none; } #FiveAppsFeedbackBadge { 	cursor: pointer; 	border: 1px solid #c0c0c0; 	display: inline-block; 	width: 100px; 	padding: 10px; 	position: absolute; 	text-align: center; 	font: normal normal 14px/18px \"Helvetica Neue\", Arial, Helvetica, Geneva, sans-serif; 	-moz-box-shadow: 0 -1px 25px #d0d0d0; 	-webkit-box-shadow: 0 -1px 25px #d0d0d0; 	box-shadow: 0 -1px 25px #d0d0d0; 	opacity: 1; } #FiveAppsFeedbackBadge.top { 	border-top-style: none; 	margin-left: -50px; 	top: 0px; 	left: 50%; } #FiveAppsFeedbackBadge.right { 	border-bottom-style: none; 	right: -42px; 	top: 50%; 	margin-top: -50px; 	-webkit-transform: rotate(-90deg); } #FiveAppsFeedbackBadge.left { 	border-bottom-style: none; 	left: -42px; 	top: 50%; 	margin-top: -50px; 	-webkit-transform: rotate(90deg); } #FiveAppsFeedbackBadge.bottom { 	border-bottom-style: none; 	margin-left: -50px; 	bottom: 0px; 	left: 50%; } #FiveAppsFeedback { 	opacity: 0.8; 	margin: 27px auto; 	border: 1px solid #b5b5b5; 	max-width: 200px; 	padding: 20px; 	-moz-box-shadow: 0 3px 20px #bdbdbd; 	-webkit-box-shadow: 0 3px 20px #bdbdbd; 	box-shadow: 0 3px 20px #bdbdbd; 	color: #595959; } #FiveAppsFeedback h1 { 	font-size: 18px; 	font-weight: normal; 	margin-bottom: 18px; 	font-style: normal; 	color: #3e3e3e; } #FiveAppsFeedback p { 	margin-bottom: 18px; } #FiveAppsFeedback select { 	width: 100%; } #FiveAppsFeedback .FAF_smileys { 	margin-top: 18px; 	height: 46px; } #FiveAppsFeedback .FAF_smileys span { 	cursor: pointer; 	margin-right: 1%; 	margin-left: 1%; 	height: 100%; 	width:  30%; 	display: inline-block; 	background-size: 75%; 	opacity: 0.4; } #FiveAppsFeedback .FAF_smileys span.active { 	opacity: 1; } #FiveAppsFeedback .FAF_smileys span:nth-child(1){ 	background: url(\"data:image/svg+xml;utf8,<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'	 width='50px' height='50px' viewBox='0 0 50 50' enable-background='new 0 0 50 50' xml:space='preserve'><path fill='#000000' d='M24.991,0C11.189,0,0,11.189,0,24.992c0,13.802,11.189,24.992,24.991,24.992	c13.803,0,24.992-11.189,24.992-24.992C49.983,11.189,38.794,0,24.991,0z M37.259,13.716c1.133,0,2.052,0.918,2.052,2.051	c0,1.133-0.919,2.052-2.052,2.052c-1.134,0-2.052-0.918-2.052-2.052C35.207,14.634,36.125,13.716,37.259,13.716z M12.259,13.716	c1.133,0,2.051,0.918,2.051,2.051c0,1.133-0.918,2.052-2.051,2.052c-1.133,0-2.052-0.918-2.052-2.052	C10.207,14.634,11.125,13.716,12.259,13.716z M42.541,31.449c-2.633,7.15-9.486,12.26-17.55,12.26	c-7.236,0-13.497-4.114-16.608-10.127c-0.178-0.344-0.851-1.951,0.222-2.526c1.455-0.78,1.903,0.394,1.903,0.394	c2.475,5.541,8.022,9.408,14.483,9.408c6.461,0,12.009-3.867,14.483-9.408c0,0,0.729-1.9,2.027-1.537	C42.903,30.304,42.541,31.449,42.541,31.449z'/></svg>\") no-repeat center;	 } #FiveAppsFeedback .FAF_smileys span:nth-child(2){ 	background: url(\"data:image/svg+xml;utf8,<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'	 width='50px' height='50px' viewBox='0 0 50 50' enable-background='new 0 0 50 50' xml:space='preserve'><path fill='#000000' d='M24.991,0C11.189,0,0,11.189,0,24.992c0,13.802,11.189,24.992,24.991,24.992	c13.803,0,24.992-11.189,24.992-24.992C49.983,11.189,38.794,0,24.991,0z M37.259,13.716c1.133,0,2.052,0.918,2.052,2.051	c0,1.133-0.919,2.052-2.052,2.052c-1.134,0-2.052-0.918-2.052-2.052C35.207,14.634,36.125,13.716,37.259,13.716z M12.259,13.716	c1.133,0,2.051,0.918,2.051,2.051c0,1.133-0.918,2.052-2.051,2.052c-1.133,0-2.052-0.918-2.052-2.052	C10.207,14.634,11.125,13.716,12.259,13.716z M42.283,35.161H7.909c-0.739,0-1.339-0.71-1.339-1.587s0.6-1.587,1.339-1.587h34.374	c0.741,0,1.341,0.71,1.341,1.587S43.024,35.161,42.283,35.161z'/></svg>\") no-repeat center;	 } #FiveAppsFeedback .FAF_smileys span:nth-child(3){ 	background: url(\"data:image/svg+xml;utf8,<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'	 width='50px' height='50px' viewBox='0 0 50 50' enable-background='new 0 0 50 50' xml:space='preserve'><path fill='#000000' d='M24.991,0C11.189,0,0,11.189,0,24.992c0,13.802,11.189,24.992,24.991,24.992	c13.803,0,24.992-11.189,24.992-24.992C49.983,11.189,38.794,0,24.991,0z M37.259,13.716c1.133,0,2.052,0.918,2.052,2.051	c0,1.133-0.919,2.052-2.052,2.052c-1.134,0-2.052-0.918-2.052-2.052C35.207,14.634,36.125,13.716,37.259,13.716z M12.259,13.716	c1.133,0,2.051,0.918,2.051,2.051c0,1.133-0.918,2.052-2.051,2.052c-1.133,0-2.052-0.918-2.052-2.052	C10.207,14.634,11.125,13.716,12.259,13.716z M41.502,38.662c-1.299,0.363-2.027-1.537-2.027-1.537	c-2.475-5.541-8.022-9.408-14.483-9.408c-6.46,0-12.008,3.867-14.483,9.408c0,0-0.641,1.02-1.903,0.394	c-1.091-0.541-0.4-2.183-0.222-2.526c3.111-6.013,9.372-10.127,16.608-10.127c8.063,0,14.917,5.109,17.55,12.26	C42.541,37.125,42.903,38.271,41.502,38.662z'/></svg>\") no-repeat center;	 } #FiveAppsFeedback input { 	border: 1px solid #b5b5b5; 	padding: 9px; 	color: #7e7e7e; 	display: block; 	margin-bottom: 18px; 	margin-top: 18px; 	width: 100%; 	font-size: 12px; 	line-height: 18px; 	box-sizing: border-box; 	-webkit-box-sizing:border-box; 	-moz-box-sizing: border-box; 	-ms-box-sizing: border-box; 	-moz-box-shadow: inset 0 -4px 20px #f3f3f3; 	-webkit-box-shadow: inset 0 -4px 20px #f3f3f3; 	box-shadow: inset 0 -4px 20px #f3f3f3; } #FiveAppsFeedback textarea { 	border: 1px solid #b5b5b5; 	padding: 9px; 	color: #7e7e7e; 	display: block; 	margin-bottom: 18px; 	margin-top: 18px; 	width: 100%; 	font-size: 12px; 	line-height: 18px; 	min-height: 70px; 	box-sizing: border-box; 	-webkit-box-sizing:border-box; 	-moz-box-sizing: border-box; 	-ms-box-sizing: border-box; 	-moz-box-shadow: inset 0 -4px 20px #f3f3f3; 	-webkit-box-shadow: inset 0 -4px 20px #f3f3f3; 	box-shadow: inset 0 -4px 20px #f3f3f3; } #FiveAppsFeedback .FAF_button { 	cursor: pointer; 	margin-bottom: 0px; 	display: inline-block; 	padding: 9px; 	border: 1px solid #b5b5b5; 	width: 39%; 	text-align: center; 	-moz-box-shadow: 0 2px 5px #cecece; 	-webkit-box-shadow: 0 2px 5px #cecece; 	box-shadow: 0 2px 5px #cecece; 	opacity: 1; 	background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.046, rgb(229, 229, 229)), color-stop(0.615, white), to(#fefefe)); 	background-image: -moz-linear-gradient(90deg, rgb(229, 229, 229) 4.6%, white 61.5%, #fefefe 100%); 	overflow: hidden;           /* required for text-overflow */ 	text-overflow: ellipsis;    /* for IE and WebKit (Safari, Chrome) */ 	-o-text-overflow: ellipsis; } #FiveAppsFeedback .FAF_button.FAF_cancel { 	float: right; } #FiveAppsFeedback:after { 	content: ''; 	clear: both; 	display: block; }";
 			if (styleElem.styleSheet) {
 				styleElem.styleSheet.cssText = content;
 			} else {
 				styleElem.innerHTML = content;
 			}
 		});