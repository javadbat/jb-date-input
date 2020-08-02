var HTML = "<div class=\"jb-date-input-web-component\">\r\n    <label><span class=\"label-value\"></span><span>:</span></label>\r\n    <div class=\"input-box\">\r\n        <input class=\"input-box\">\r\n        <div class=\"calendar-trigger\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" id=\"CalendarIcon\" viewBox=\"0 0 44.97 44.46\">\r\n                <defs>\r\n                    <style>.cls-1{fill:#bbb;}.cls-2{fill:#bbb;}</style>\r\n                </defs>\r\n                <g>\r\n                    <path id=\"Path_11948\" data-name=\"Path 11948\" class=\"cls-1\" d=\"M41.91,12H3.67C2,12,.61,12.59.61,13.37S2,14.78,3.67,14.78H41.91c1.69,0,3.06-.63,3.06-1.41S43.6,12,41.91,12Z\" transform=\"translate(0 0)\"/>\r\n                    <path id=\"Path_11946\" data-name=\"Path 11946\" class=\"cls-2\" d=\"M33.73,2.22H33V1.36A1.58,1.58,0,0,0,31.33,0a1.61,1.61,0,0,0-1.69,1.36v.86l-5.88,0V1.48A1.46,1.46,0,0,0,22.31,0h-.12a1.59,1.59,0,0,0-1.7,1.48v.74l-6.07,0V1.36A1.6,1.6,0,0,0,12.76,0C11.93,0,11,.61,11,1.36v.89C4.87,2.58,0,7.18,0,12.79v21.1c0,5.83,5.24,10.57,11.68,10.57h21.6C39.73,44.46,45,39.72,45,33.89V12.79C45,7,40.17,2.22,33.73,2.22ZM42,33.89c0,4.33-3.89,7.85-8.68,7.85H11.69C6.9,41.74,3,38.22,3,33.89V12.79C3,8.67,6.53,5.29,11,5v.68C11,6.4,12,7,12.76,7a1.63,1.63,0,0,0,1.67-1.36V4.93h6.06v.85c0,.75,1,1.23,1.71,1.23s1.56-.48,1.56-1.23V4.93h5.88v.72A1.62,1.62,0,0,0,31.33,7,1.59,1.59,0,0,0,33,5.65V4.93h.3c4.79,0,8.68,3.53,8.68,7.86Z\"/>\r\n                </g>\r\n            </svg>\r\n        </div>\r\n    </div>\r\n    <div class=\"message-box\"></div>\r\n</div>";

var css_248z = ".jb-date-input-web-component {\n  width: 100%;\n  margin: 12px 0; }\n  .jb-date-input-web-component label {\n    width: 100%;\n    margin: 4px 0px;\n    display: block;\n    font-size: 0.8em;\n    color: #1f1735; }\n  .jb-date-input-web-component .input-box {\n    width: 100%;\n    box-sizing: border-box;\n    height: 40px;\n    border: solid 1px #f7f6f6;\n    background-color: #f7f6f6;\n    border-bottom: solid 3px #f7f6f6;\n    border-radius: 16px;\n    margin: 4px 0px;\n    display: block;\n    transition: ease 0.3s all;\n    overflow: hidden;\n    display: flex;\n    justify-content: space-between; }\n    .jb-date-input-web-component .input-box:focus-within {\n      border-color: #1e2832; }\n    .jb-date-input-web-component .input-box input {\n      border: none;\n      width: calc(100% - 36px);\n      box-sizing: border-box;\n      height: 100%;\n      background-color: transparent;\n      padding: 2px 12px 0 12px;\n      display: block;\n      font-family: inherit;\n      font-size: 1.1em;\n      color: #1f1735;\n      margin: 0;\n      border-radius: 0;\n      text-align: right;\n      direction: ltr; }\n      .jb-date-input-web-component .input-box input:focus {\n        outline: none; }\n    .jb-date-input-web-component .input-box .calendar-trigger {\n      display: block;\n      height: 28px;\n      width: 28px;\n      margin: 4px 0 4px 8px;\n      cursor: pointer; }\n      .jb-date-input-web-component .input-box .calendar-trigger svg {\n        width: 100%;\n        height: 100%; }\n  .jb-date-input-web-component .message-box {\n    font-size: 0.7em;\n    padding: 2px 8px;\n    color: #929292; }\n    .jb-date-input-web-component .message-box:empty {\n      padding: 0; }\n    .jb-date-input-web-component .message-box.error {\n      color: red; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpCRGF0ZUlucHV0LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsY0FBYyxFQUFFO0VBQ2hCO0lBQ0UsV0FBVztJQUNYLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGNBQWMsRUFBRTtFQUNsQjtJQUNFLFdBQVc7SUFDWCxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsZ0NBQWdDO0lBQ2hDLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsY0FBYztJQUNkLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLDhCQUE4QixFQUFFO0lBQ2hDO01BQ0UscUJBQXFCLEVBQUU7SUFDekI7TUFDRSxZQUFZO01BQ1osd0JBQXdCO01BQ3hCLHNCQUFzQjtNQUN0QixZQUFZO01BQ1osNkJBQTZCO01BQzdCLHdCQUF3QjtNQUN4QixjQUFjO01BQ2Qsb0JBQW9CO01BQ3BCLGdCQUFnQjtNQUNoQixjQUFjO01BQ2QsU0FBUztNQUNULGdCQUFnQjtNQUNoQixpQkFBaUI7TUFDakIsY0FBYyxFQUFFO01BQ2hCO1FBQ0UsYUFBYSxFQUFFO0lBQ25CO01BQ0UsY0FBYztNQUNkLFlBQVk7TUFDWixXQUFXO01BQ1gscUJBQXFCO01BQ3JCLGVBQWUsRUFBRTtNQUNqQjtRQUNFLFdBQVc7UUFDWCxZQUFZLEVBQUU7RUFDcEI7SUFDRSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGNBQWMsRUFBRTtJQUNoQjtNQUNFLFVBQVUsRUFBRTtJQUNkO01BQ0UsVUFBVSxFQUFFIiwiZmlsZSI6IkpCRGF0ZUlucHV0LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuamItZGF0ZS1pbnB1dC13ZWItY29tcG9uZW50IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMTJweCAwOyB9XG4gIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgbGFiZWwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogNHB4IDBweDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIGNvbG9yOiAjMWYxNzM1OyB9XG4gIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2Y3ZjZmNjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmNmY2O1xuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDNweCAjZjdmNmY2O1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgbWFyZ2luOiA0cHggMHB4O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRyYW5zaXRpb246IGVhc2UgMC4zcyBhbGw7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuICAgIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveDpmb2N1cy13aXRoaW4ge1xuICAgICAgYm9yZGVyLWNvbG9yOiAjMWUyODMyOyB9XG4gICAgLmpiLWRhdGUtaW5wdXQtd2ViLWNvbXBvbmVudCAuaW5wdXQtYm94IGlucHV0IHtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAzNnB4KTtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIHBhZGRpbmc6IDJweCAxMnB4IDAgMTJweDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICBmb250LXNpemU6IDEuMWVtO1xuICAgICAgY29sb3I6ICMxZjE3MzU7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICBkaXJlY3Rpb246IGx0cjsgfVxuICAgICAgLmpiLWRhdGUtaW5wdXQtd2ViLWNvbXBvbmVudCAuaW5wdXQtYm94IGlucHV0OmZvY3VzIHtcbiAgICAgICAgb3V0bGluZTogbm9uZTsgfVxuICAgIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLmlucHV0LWJveCAuY2FsZW5kYXItdHJpZ2dlciB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGhlaWdodDogMjhweDtcbiAgICAgIHdpZHRoOiAyOHB4O1xuICAgICAgbWFyZ2luOiA0cHggMCA0cHggOHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XG4gICAgICAuamItZGF0ZS1pbnB1dC13ZWItY29tcG9uZW50IC5pbnB1dC1ib3ggLmNhbGVuZGFyLXRyaWdnZXIgc3ZnIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTsgfVxuICAuamItZGF0ZS1pbnB1dC13ZWItY29tcG9uZW50IC5tZXNzYWdlLWJveCB7XG4gICAgZm9udC1zaXplOiAwLjdlbTtcbiAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgIGNvbG9yOiAjOTI5MjkyOyB9XG4gICAgLmpiLWRhdGUtaW5wdXQtd2ViLWNvbXBvbmVudCAubWVzc2FnZS1ib3g6ZW1wdHkge1xuICAgICAgcGFkZGluZzogMDsgfVxuICAgIC5qYi1kYXRlLWlucHV0LXdlYi1jb21wb25lbnQgLm1lc3NhZ2UtYm94LmVycm9yIHtcbiAgICAgIGNvbG9yOiByZWQ7IH1cbiJdfQ== */";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",h=/^(\d{4})-?(\d{1,2})?-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={s:c,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,u),i=e-r<0,s=t.clone().add(n+(i?-1:1),u);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:"date",h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,e,n){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),e&&(m[t]=e,r=t);else {var i=t.name;m[i]=t,r=i;}return !n&&r&&(l=r),r||!n&&l},g=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new v(n)},D=d;D.l=M,D.i=y,D.w=function(t,e){return g(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t);}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0;return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}}return new Date(e)}(t),this.init();},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},d.$utils=function(){return D},d.isValid=function(){return !("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=g(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return g(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<g(t)},d.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},d.year=function(t){return this.$g(t,"$y",o)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",n)},d.second=function(t){return this.$g(t,"$s",e)},d.millisecond=function(e){return this.$g(e,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,a){var h=this,f=!!D.u(a)||a,c=D.p(t),d=function(t,e){var n=D.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return f?n:n.endOf(i)},$=function(t,e){return D.w(h.toDate()[t].apply(h.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case o:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case n:return $(M+"Seconds",2);case e:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,a){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[o]=c+"FullYear",h[r]=c+"Hours",h[n]=c+"Minutes",h[e]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(a-this.$W):a;if(f===u||f===o){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).$d;}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,a){var h,f=this;t=Number(t);var c=D.p(a),d=function(e){var n=g(f);return D.w(n.date(n.date()+Math.round(e*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[n]=6e4,h[r]=36e5,h[e]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:D.s(a+1,2,"0"),MMM:c(i.monthsShort,a,h,3),MMMM:c(h,a),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,o,2),ddd:c(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return n.replace(f,function(t,e){return e||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[o]=y/12,c[u]=y,c[a]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[n]=m/6e4,c[e]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,e){return t(e,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});
});

var fa = createCommonjsModule(function (module, exports) {
!function(_,e){module.exports=e(dayjs_min);}(commonjsGlobal,function(_){_=_&&_.hasOwnProperty("default")?_.default:_;var e={name:"fa",weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),weekStart:6,months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),ordinal:function(_){return _},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},relativeTime:{future:"در %s",past:"%s پیش",s:"چند ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"}};return _.locale(e,null,!0),e});
});

function _interopDefault(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var fa$1=_interopDefault(fa);function _slicedToArray(t,r){return _arrayWithHoles(t)||_iterableToArrayLimit(t,r)||_nonIterableRest()}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _iterableToArrayLimit(t,r){var n=[],i=!0,e=!1,a=void 0;try{for(var s,o=t[Symbol.iterator]();!(i=(s=o.next()).done)&&(n.push(s.value),!r||n.length!==r);i=!0);}catch(t){e=!0,a=t;}finally{try{i||null==o.return||o.return();}finally{if(e)throw a}}return n}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var $floor=Math.floor;function mod(t,r){return t-r*$floor(t/r)}function lg(t){return t%4==0&&!(t%100==0&&t%400!=0)}var GE=1721425.5;function g2j(t,r,n){return GE-1+365*(t-1)+$floor((t-1)/4)+-$floor((t-1)/100)+$floor((t-1)/400)+$floor((367*r-362)/12+(r<=2?0:lg(t)?-1:-2)+n)}function j2g(t){var r,n,i,e,a,s,o,u,h,f,d,l;r=$floor(t-.5)+.5,i=$floor((n=r-GE)/146097),e=mod(n,146097),a=$floor(e/36524),s=mod(e,36524),o=$floor(s/1461),u=mod(s,1461),f=400*i+100*a+4*o+(h=$floor(u/365)),4!=a&&4!=h&&f++,d=r-g2j(f,1,1),l=r<g2j(f,3,1)?0:lg(f)?1:2;var c=$floor((12*(d+l)+373)/367);return [f,c,r-g2j(f,c,1)+1]}var PE=1948320.5;function p2j(t,r,n){var i,e;return e=474+mod(i=t-(t>=0?474:473),2820),n+(r<=7?31*(r-1):30*(r-1)+6)+$floor((682*e-110)/2816)+365*(e-1)+1029983*$floor(i/2820)+(PE-1)}function j2p(t){var r,n,i,e,a,s,o,u,h;return i=(t=$floor(t)+.5)-p2j(475,1,1),e=$floor(i/1029983),1029982==(a=mod(i,1029983))?s=2820:(o=$floor(a/366),u=mod(a,366),s=$floor((2134*o+2816*u+2815)/1028522)+o+1),(r=s+2820*e+474)<=0&&r--,[r,n=(h=t-p2j(r,1,1)+1)<=186?Math.ceil(h/31):Math.ceil((h-6)/30),t-p2j(r,n,1)+1]}var jdate={J:function(t,r,n){return j2p(g2j(t,r,n))},G:function(t,r,n){return j2g(p2j(t,r,n))}},REGEX_PARSE=/^(\d{4})[-/]?(\d{1,2})[-/]?(\d{0,2})(.*)?$/,REGEX_FORMAT=/\[.*?\]|jY{2,4}|jM{1,4}|jD{1,2}|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,DATE="date",D="day",M="month",Y="year",W="week",FORMAT_DEFAULT="YYYY-MM-DDTHH:mm:ssZ",fa$2={jmonths:"فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند".split("_")},plugin=function(t,r,n){var i=r.prototype,e=i.$utils(),a=function(t){return "jalali"===t.$C},s=e.prettyUnit||e.p,o=e.isUndefined||e.u,u=e.padStart||e.s,h=e.monthDiff||e.m,f=e.absFloor||e.a,d=function(t){return function(){var r=t.bind(this).apply(void 0,arguments);return r.$C=this.$C,r.isJalali()&&r.InitJalali(),r}};i.startOf=d(i.startOf),i.endOf=d(i.endOf),i.add=d(i.add),i.subtract=d(i.subtract),i.set=d(i.set);var l=i.parse,c=i.init,$=i.startOf,j=i.$set,y=i.add,v=i.format,_=i.diff,b=i.year,p=i.month,m=i.date,g=i.daysInMonth,A=i.toArray;n.$C="gregory",n.$fdow=6,n.calendar=function(t){return n.$C=t,n},i.calendar=function(t){var r=this.clone();return r.$C=t,r.isJalali()&&r.InitJalali(),r},i.isJalali=function(){return a(this)},n.en.jmonths="Farvardin_Ordibehesht_Khordaad_Tir_Mordaad_Shahrivar_Mehr_Aabaan_Aazar_Dey_Bahman_Esfand".split("_"),n.locale("fa",Object.assign({},fa$1,{},fa$2),!0);var E=function(t,r){return n(t,{locale:r.$L,utc:r.$u,calendar:r.$C})};i.init=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};c.bind(this)(t),this.isJalali()&&this.InitJalali();},i.parse=function(t){var r;if(this.$C=t.calendar||this.$C||n.$C,t.jalali&&"string"==typeof t.date&&/.*[^Z]$/i.test(t.date)&&(r=t.date.match(REGEX_PARSE))){var i=_slicedToArray(jdate.G(parseInt(r[1],10),parseInt(r[2],10),parseInt(r[3]||1,10)),3),e=i[0],a=i[1],s=i[2];t.date="".concat(e,"-").concat(a,"-").concat(s).concat(r[4]||"");}return l.bind(this)(t)},i.InitJalali=function(){var t=_slicedToArray(jdate.J(this.$y,this.$M+1,this.$D),3),r=t[0],n=t[1],i=t[2];this.$jy=r,this.$jM=n-1,this.$jD=i;},i.startOf=function(t,r){var i=this;if(!a(this))return $.bind(this)(t,r);var e=!!o(r)||r,u=s(t),h=function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.$jy,a=_slicedToArray(jdate.G(n,r+1,t),3),s=a[0],o=a[1],u=a[2],h=E(new Date(s,o-1,u),i);return (e?h:h.endOf(D)).$set("hour",1)},f=(this.$W+(7-n.$fdow))%7;switch(u){case Y:return e?h(1,0):h(0,0,this.$jy+1);case M:return e?h(1,this.$jM):h(0,(this.$jM+1)%12,this.$jy+parseInt((this.$jM+1)/12,10));case W:return h(e?this.$jD-f:this.$jD+(6-f),this.$jM);default:return $.bind(this)(t,r)}},i.$set=function(t,r){var n=this;if(!a(this))return j.bind(this)(t,r);var i=function(t,r){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n.$jy,e=_slicedToArray(jdate.G(i,r+1,t),3),a=e[0],s=e[1],o=e[2];return n.$d.setFullYear(a),n.$d.setMonth(s-1),n.$d.setDate(o),n};switch(s(t)){case DATE:case D:i(r,this.$jM);break;case M:i(this.$jD,r);break;case Y:i(this.$jD,this.$jM,r);break;default:return j.bind(this)(t,r)}return this.init(),this},i.add=function(t,r){var n=this;if(!a(this))return y.bind(this)(t,r);t=Number(t);var i=!r||1!==r.length&&"ms"!==r?s(r):r;if(["M",M].indexOf(i)>-1){var e=this.$jM+t,o=e<0?-Math.ceil(-e/12):parseInt(e/12,10),u=this.$jD,h=this.set(D,1).add(o,Y).set(M,e-12*o);return h.set(D,Math.min(h.daysInMonth(),u))}if(["y",Y].indexOf(i)>-1)return function(r,i){var e=n.set(DATE,1).set(r,i+t);return e.set(DATE,Math.min(n.$jD,e.daysInMonth()))}(Y,this.$jy);if(["d",D].indexOf(i)>-1){var f=new Date(this.$d);return f.setDate(f.getDate()+t),E(f,this)}return y.bind(this)(t,r)},i.format=function(t,r){var n=this;if(!a(this))return v.bind(this)(t,r);var i=t||FORMAT_DEFAULT,e=(r||this.$locale()).jmonths;return i.replace(REGEX_FORMAT,function(t){if(t.indexOf("[")>-1)return t.replace(/\[|\]/g,"");switch(t){case"YY":return String(n.$jy).slice(-2);case"YYYY":return String(n.$jy);case"M":return String(n.$jM+1);case"MM":return u(n.$jM+1,2,"0");case"MMM":return e[n.$jM].slice(0,3);case"MMMM":return e[n.$jM];case"D":return String(n.$jD);case"DD":return u(n.$jD,2,"0");default:return v.bind(n)(t,r)}})},i.diff=function(t,r,i){if(!a(this))return _.bind(this)(t,r,i);var e=s(r),o=n(t),u=h(this,o);switch(e){case Y:u/=12;break;case M:break;default:return _.bind(this)(t,r,i)}return i?u:f(u)},i.$g=function(t,r,n){return o(t)?this[r]:this.set(n,t)},i.year=function(t){return a(this)?this.$g(t,"$jy",Y):b.bind(this)(t)},i.month=function(t){return a(this)?this.$g(t,"$jM",M):p.bind(this)(t)},i.date=function(t){return a(this)?this.$g(t,"$jD",D):m.bind(this)(t)},i.daysInMonth=function(){return a(this)?this.endOf(M).$jD:g.bind(this)()},A&&(i.toArray=function(){return a(this)?[this.$jy,this.$jM,this.$jD,this.$H,this.$m,this.$s,this.$ms]:A.bind(this)()}),i.clone=function(){return E(this.toDate(),this)};};var jalaliday_cjs_min=plugin;

dayjs_min.extend(jalaliday_cjs_min);
class JBDateInputWebComponent extends HTMLElement {
    static get formAssociated() { return true; }
    get value() {
        return this.getDateValue();
    }
    set value(value) {
        if (this.internals_) {
            this.internals_.setFormValue(value);
        }
        this.setDateValue(value);
        this.updateinputTextFromValue();
    }
    get _inputValue() {
        return this.inputElement.value;
    }
    set _inputValue(value) {
        this.inputElement.value = value;
    }
    constructor() {
        super();
        if (typeof this.attachInternals == "function") {
            //some browser dont support attachInternals
            this.internals_ = this.attachInternals();
        }
        this.initWebComponent();
        this.initProp();
        // js standard input element to more assosicate it with form element
    }
    initWebComponent() {
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._html = `<style>${css_248z}</style>` + '\n' + HTML;
        this._element = document.createElement('template');
        this._element.innerHTML = this._html;
        this._shadowRoot.appendChild(this._element.content.cloneNode(true));
        this.inputElement = this._shadowRoot.querySelector('.input-box input');

        this.registerEventListener();
    }
    registerEventListener() {
        this.inputElement.addEventListener('blur', this.onInputBlur.bind(this));
        this.inputElement.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this.inputElement.addEventListener('keyup', this.onInputKeyup.bind(this));
        this.inputElement.addEventListener('keydown', this.onInputKeydown.bind(this));
    }
    initProp() {
        this.validationList = [];
        this.valueType = this.getAttribute("value-type") || "GREGORIAN";//JALALI,TIME_STAMP
        this.setValueObjNull();
        this.inputFormat = 'YYYY/MM/DD';
        this.inputRegex = /^(?<year>[\d,\s]{4})\/(?<month>[\d,\s]{2})\/(?<day>[\d,\s]{2})$/g;
        this.format = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
        this._inputValue = '    /  /  ';
        this.value = this.getAttribute('value') || '';
        this.validation = {
            isValid: null,
            message: null
        };
    }
    static get observedAttributes() {
        return ['label', 'value-type', 'message', 'value', 'name'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        switch (name) {
            case 'label':
                this._shadowRoot.querySelector('label .label-value').innerHTML = value;
                break;
            case 'message':
                this._shadowRoot.querySelector('.message-box').innerHTML = value;
                break;
            case 'value':
                this.value = value;
                break;
            case 'name':
                this.inputElement.setAttribute('name', value);
                break;
            case 'value-type':
                this.valueType = value;
                break;
        }

    }
    inputChar(char, pos) {
        let newValueArr = this._inputValue.split('');
        newValueArr[pos] = char;
        const newValue = newValueArr.join('');
        const res = this.inputRegex.test(newValue);
        this.inputRegex.lastIndex = 0;
        if (res) {
            this._inputValue = newValue;
        }
    }
    onInputKeyPress(e) {
        //TODO: raise keypress event
        let carretPos = e.target.selectionStart;
        const inputedChar = e.key;
        if (carretPos == 4 || carretPos == 7) {
            // in / pos
            if (inputedChar == '/') {
                e.target.setSelectionRange(carretPos + 1, carretPos + 1);
            }
            if (!isNaN(inputedChar)) {
                carretPos++;
            }
        }
        if (!isNaN(inputedChar)) {
            if (carretPos == 5 && parseInt(inputedChar) > 1) {
                this.inputChar("0", carretPos);
                carretPos++;
            }
            if (carretPos == 8 && parseInt(inputedChar) > 3) {
                this.inputChar("0", carretPos);
                carretPos++;
            }
            this.inputChar(inputedChar, carretPos);
            e.target.setSelectionRange(carretPos + 1, carretPos + 1);
        }

        e.preventDefault();

    }
    onInputKeyup(e) {
        const inputText = e.target.value;
        this.triggerInputValidation(false);
        //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
        this._value = inputText;
    }
    onInputKeydown(e) {
        if (e.keyCode == 8) {
            const carretPos = e.target.selectionStart;
            this.inputChar(' ', carretPos - 1);
            e.target.setSelectionRange(carretPos - 1, carretPos - 1);
            e.preventDefault();
        }
    }
    getDateValue() {
        //this function convert inputed date to expected format base on valueType
        switch (this.valueType) {
            case 'GREGORIAN':
                var { year, month, day } = this._valueObj.gregorian;
                var yearStr = year<1000?( year<100?( year<10?"000"+year:"00"+year):"0"+year):year;
                var monthStr = month<10?"0"+month:month;
                var dayStr = day<10?"0"+day:day;
                var value = this.format.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
                    .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
                    .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
                return value;
            case 'JALALI':
                // eslint-disable-next-line no-redeclare
                var { year, month, day } = this._valueObj.jalali;
                // eslint-disable-next-line no-redeclare
                var yearStr = year<1000?( year<100?( year<10?"000"+year:"00"+year):"0"+year):year;
                // eslint-disable-next-line no-redeclare
                var monthStr = month<10?"0"+month:month;
                // eslint-disable-next-line no-redeclare
                var dayStr = day<10?"0"+day:day;
                // eslint-disable-next-line no-redeclare
                var value = this.format.replace('YYYY', yearStr).replace('MM', monthStr).replace('DD', dayStr)
                    .replace('HH', '00').replace('mm', '00').replace('ss', '00').replace('SSS', '000')
                    .replace('[Z]', 'Ž').replace('Z', '+00:00').replace('Ž', 'Z');
                return value;
            case 'TIME_STAMP':
                return this._valueObj.timeStamp;
        }
    }
    setDateValue(value) {
        //when user change value this function called and update inner value object base on user value
        switch (this.valueType) {
            case "GREGORIAN":
                this.setDateValueFromgregorian(value);
                break;
            case "TIME_STAMP":
                this.setDateValueFromTimeStamp(value);
                break;
            case "JALALI":
                this.setDateValueFromJalali(value);
                break;

        }

    }
    setValueObjNull(){
        // mean we reset calendar value and set it to null
        this._valueObj={
            gregorian: {
                year: null,
                month: null,
                day: null
            },
            jalali: {
                year: null,
                month: null,
                day:null
            },
            timeStamp: null
        };
    }
    setDateValueFromJalali(value) {
        debugger;
        // we replace '[Z]','Ž' and replace it again to Z becuse we dont want Z inside [Z] get replaced with time zone and remain constant Z : `Z--[Z]`=>`+3:30--Z`
        const regexString = this.format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
            .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
            .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
        const regex = new RegExp(regexString, 'g');
        const res = regex.exec(value);
        if(res){
            const date = dayjs_min(`${res.groups.year}-${res.groups.month}-${res.groups.day}`, { jalali: true });
            const jalaliDate = date.calendar('jalali');
            this._valueObj.gregorian = {
                year: date.year(),
                month: date.month() + 1,
                day: date.date()
            };
            this._valueObj.jalali = {
                year: jalaliDate.year(),
                month: jalaliDate.month() + 1,
                day: jalaliDate.date()
            };
            this._valueObj.timeStamp = date.unix();
        }else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            }else {
                this.setValueObjNull();
            }
        }

    }
    setDateValueFromTimeStamp(value) {
        const timeStamp = parseInt(value);
        const date = dayjs_min(timeStamp);
        const jalaliDate = date.calendar('jalali');
        this._valueObj.gregorian = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date()
        };
        this._valueObj.jalali = {
            year: jalaliDate.year(),
            month: jalaliDate.month() + 1,
            day: jalaliDate.date()
        };
        this._valueObj.timeStamp = date.unix();

    }
    setDateValueFromgregorian(value) {
        // we replace '[Z]','Ž' and replace it again to Z becuse we dont want Z inside [Z] get replaced with time zone and remain constant Z : `Z--[Z]`=>`+3:30--Z`
        const regexString = this.format.replace('YYYY', '(?<year>[\\d]{4})').replace('MM', '(?<month>[\\d]{2})').replace('DD', '(?<day>[\\d]{2})')
            .replace('HH', '(?<hour>[\\d]{2})').replace('mm', '(?<minute>[\\d]{2})').replace('ss', '(?<second>[\\d]{2})').replace('SSS', '(?<miliSecond>[\\d]{3})')
            .replace('[Z]', 'Ž').replace('Z', '(?<zone>([\\+,-]\\d{2}:\\d{2}))').replace('Ž', 'Z');
        const regex = new RegExp(regexString, 'g');
        const res = regex.exec(value);
        if (res) {
            this._valueObj.gregorian = {
                day: res.groups.day,
                month: res.groups.month,
                year: res.groups.year
            };
            const date = new dayjs_min(`${res.groups.year}-${res.groups.month}-${res.groups.day}`);
            const jalaliDate = date.calendar('jalali');
            this._valueObj.jalali = {
                day: jalaliDate.date(),
                month: jalaliDate.month(),
                year: jalaliDate.year(),
            };
            this._valueObj.timeStamp = date.unix();
        } else {
            if (value !== null && value !== undefined && value !== '') {
                console.error('your inputed Date doest match defualt or your specified Format');
            }else {
                this.setValueObjNull();
            }
        }
    }
    updateinputTextFromValue() {
        var str = this.inputFormat;
        let { year, month, day } = this._valueObj.jalali;
        if (year < 1000) {
            year = "0" + year;
        }
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        str = str.replace('YYYY', year).replace('MM', month).replace('DD', day);
        this._inputValue = str;
    }
    updateValueObj(inputString) {
        const res = this.inputRegex.exec(inputString);
        this._valueObj.jalali = {
            day: parseInt(res.groups.day),
            month: parseInt(res.groups.month),
            year: parseInt(res.groups.year)
        };
        const date = dayjs_min(`${this._valueObj.jalali.year}-${this._valueObj.jalali.month}-${this._valueObj.jalali.day}`, { jalali: true });
        this._valueObj.gregorian = {
            year: date.year(),
            month: date.month() + 1,
            day: date.date(),
        };
        this._valueObj.timeStamp = date.unix();
    }
    onInputBlur(e) {
        const inputText = e.target.value;
        this.updateValueObj(inputText);
        this.triggerInputValidation(true);
        const validationObject = this.checkInputValidation(inputText);
        const event = new CustomEvent('change', {
            detail: {
                isValid: validationObject.isAllValid,
                validationObject: validationObject,
                valueObject: { ...this._valueObj }
            },
        });
        this.dispatchEvent(event);
    }
    triggerInputValidation(showError = true) {
        // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
        //takeAction determine if we want to show user error in web component difualtManner or developer will handle it by himself
        const inputText = this._shadowRoot.querySelector('.input-box input').value;

        const validationResult = this.checkInputValidation(inputText);

        if (showError == true && !validationResult.isAllValid) {
            const firstFault = validationResult.validationList.find(x => !x.isValid);
            this.showValidationError(firstFault.message);
        } else if (validationResult.isAllValid) {
            this.clearValidationError();
        }
        return validationResult;
    }
    checkInputValidation(value) {
        const validationResult = {
            validationList: [],
            isAllValid: true
        };
        this.validationList.forEach((validation) => {
            const res = this.checkValidation(value, validation);
            validationResult.validationList.push(res);
            if (!res.isValid) {
                validationResult.isAllValid = false;
            }
        });
        return validationResult;
    }
    checkValidation(text, validation) {
        var testRes;
        if (validation.validator instanceof RegExp) {
            testRes = validation.validator.test(text);
            validation.validator.lastIndex = 0;
        }

        if (typeof validation.validator == "function") {
            testRes = validation.validator(text, this._valueObj);
        }

        if (!testRes) {
            return {
                isValid: false,
                message: validation.message,
                validation: validation
            }
        }
        return {
            isValid: true,
            message: '',
            validation: validation
        };
    }
    showValidationError(error) {
        this.validation = {
            isValid: false,
            message: error
        };
        this._shadowRoot.querySelector('.message-box').innerHTML = error;
        this._shadowRoot.querySelector('.message-box').classList.add('error');
    }
    clearValidationError() {
        this.validation = {
            isValid: true,
            message: null
        };
        const text = this.getAttribute('message') || '';
        this._shadowRoot.querySelector('.message-box').innerHTML = text;
        this._shadowRoot.querySelector('.message-box').classList.remove('error');
    }
}
const myElementNotExists = !customElements.get('jb-date-input');
if (myElementNotExists) {
    window.customElements.define('jb-date-input', JBDateInputWebComponent);
}
//# sourceMappingURL=JBDateInput.js.map
