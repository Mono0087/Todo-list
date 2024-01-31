(()=>{"use strict";const t={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function e(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const n={date:e({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:e({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:e({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},a={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function r(t){return(e,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,r=n?.width?String(n.width):e;a=t.formattingValues[r]||t.formattingValues[e]}else{const e=t.defaultWidth,r=n?.width?String(n.width):t.defaultWidth;a=t.values[r]||t.values[e]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function o(t){return(e,n={})=>{const a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;const i=o[0],s=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],u=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(i))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(i))return e}(s);let d;return d=t.valueCallback?t.valueCallback(u):u,d=n.valueCallback?n.valueCallback(d):d,{value:d,rest:e.slice(i.length)}}}var i;const s={code:"en-US",formatDistance:(e,n,a)=>{let r;const o=t[e];return r="string"==typeof o?o:1===n?o.one:o.other.replace("{{count}}",n.toString()),a?.addSuffix?a.comparison&&a.comparison>0?"in "+r:r+" ago":r},formatLong:n,formatRelative:(t,e,n,r)=>a[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:r({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:r({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:r({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:r({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:r({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(i.matchPattern);if(!n)return null;const a=n[0],r=t.match(i.parsePattern);if(!r)return null;let o=i.valueCallback?i.valueCallback(r[0]):r[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(a.length)}}),era:o({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:o({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:o({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:o({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:o({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let u={};function d(){return u}Math.pow(10,8);const c=6048e5,l=864e5;function h(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function m(t){const e=h(t);return e.setHours(0,0,0,0),e}function f(t){const e=h(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function g(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function w(t){const e=h(t);return function(t,e){const n=m(t),a=m(e),r=+n-f(n),o=+a-f(a);return Math.round((r-o)/l)}(e,function(t){const e=h(t),n=g(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}(e))+1}function b(t,e){const n=d(),a=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=h(t),o=r.getDay(),i=(o<a?7:0)+o-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function p(t){return b(t,{weekStartsOn:1})}function y(t){const e=h(t),n=e.getFullYear(),a=g(t,0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);const r=p(a),o=g(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=p(o);return e.getTime()>=r.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}function v(t){const e=h(t),n=+p(e)-+function(t){const e=y(t),n=g(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),p(n)}(e);return Math.round(n/c)+1}function M(t,e){const n=h(t),a=n.getFullYear(),r=d(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=g(t,0);i.setFullYear(a+1,0,o),i.setHours(0,0,0,0);const s=b(i,e),u=g(t,0);u.setFullYear(a,0,o),u.setHours(0,0,0,0);const c=b(u,e);return n.getTime()>=s.getTime()?a+1:n.getTime()>=c.getTime()?a:a-1}function k(t,e){const n=h(t),a=+b(n,e)-+function(t,e){const n=d(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=M(t,e),o=g(t,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),b(o,e)}(n,e);return Math.round(a/c)+1}function S(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const L={y(t,e){const n=t.getFullYear(),a=n>0?n:1-n;return S("yy"===e?a%100:a,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):S(n+1,2)},d:(t,e)=>S(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>S(t.getHours()%12||12,e.length),H:(t,e)=>S(t.getHours(),e.length),m:(t,e)=>S(t.getMinutes(),e.length),s:(t,e)=>S(t.getSeconds(),e.length),S(t,e){const n=e.length,a=t.getMilliseconds();return S(Math.trunc(a*Math.pow(10,n-3)),e.length)}},T={G:function(t,e,n){const a=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),a=e>0?e:1-e;return n.ordinalNumber(a,{unit:"year"})}return L.y(t,e)},Y:function(t,e,n,a){const r=M(t,a),o=r>0?r:1-r;return"YY"===e?S(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):S(o,e.length)},R:function(t,e){return S(y(t),e.length)},u:function(t,e){return S(t.getFullYear(),e.length)},Q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return S(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){const a=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return S(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){const a=t.getMonth();switch(e){case"M":case"MM":return L.M(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){const a=t.getMonth();switch(e){case"L":return String(a+1);case"LL":return S(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,e,n,a){const r=k(t,a);return"wo"===e?n.ordinalNumber(r,{unit:"week"}):S(r,e.length)},I:function(t,e,n){const a=v(t);return"Io"===e?n.ordinalNumber(a,{unit:"week"}):S(a,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):L.d(t,e)},D:function(t,e,n){const a=w(t);return"Do"===e?n.ordinalNumber(a,{unit:"dayOfYear"}):S(a,e.length)},E:function(t,e,n){const a=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return S(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){const r=t.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return S(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){const a=t.getDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return S(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){const a=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){const a=t.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){const a=t.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return L.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):L.H(t,e)},K:function(t,e,n){const a=t.getHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):S(a,e.length)},k:function(t,e,n){let a=t.getHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):S(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):L.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):L.s(t,e)},S:function(t,e){return L.S(t,e)},X:function(t,e,n){const a=t.getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return x(a);case"XXXX":case"XX":return P(a);default:return P(a,":")}},x:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"x":return x(a);case"xxxx":case"xx":return P(a);default:return P(a,":")}},O:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+D(a,":");default:return"GMT"+P(a,":")}},z:function(t,e,n){const a=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+D(a,":");default:return"GMT"+P(a,":")}},t:function(t,e,n){return S(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return S(t.getTime(),e.length)}};function D(t,e=""){const n=t>0?"-":"+",a=Math.abs(t),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+e+S(o,2)}function x(t,e){return t%60==0?(t>0?"-":"+")+S(Math.abs(t)/60,2):P(t,e)}function P(t,e=""){const n=t>0?"-":"+",a=Math.abs(t);return n+S(Math.trunc(a/60),2)+e+S(a%60,2)}const E=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},W=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},q={p:W,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return E(t,e);let o;switch(a){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",E(a,e)).replace("{{time}}",W(r,e))}},C=/^D+$/,F=/^Y+$/,H=["D","DD","YY","YYYY"];function O(t){if(!(e=t,e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)||"number"==typeof t))return!1;var e;const n=h(t);return!isNaN(Number(n))}const A=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Y=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,N=/^'([^]*?)'?$/,j=/''/g,z=/[a-zA-Z]/;function I(t,e,n){const a=d(),r=n?.locale??a.locale??s,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,u=h(t);if(!O(u))throw new RangeError("Invalid time value");let c=e.match(Y).map((t=>{const e=t[0];return"p"===e||"P"===e?(0,q[e])(t,r.formatLong):t})).join("").match(A).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:Q(t)};if(T[e])return{isToken:!0,value:t};if(e.match(z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));r.localize.preprocessor&&(c=r.localize.preprocessor(u,c));const l={firstWeekContainsDate:o,weekStartsOn:i,locale:r};return c.map((a=>{if(!a.isToken)return a.value;const o=a.value;return(!n?.useAdditionalWeekYearTokens&&function(t){return F.test(t)}(o)||!n?.useAdditionalDayOfYearTokens&&function(t){return C.test(t)}(o))&&function(t,e,n){const a=function(t,e,n){const a="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(a),H.includes(t))throw new RangeError(a)}(o,e,String(t)),(0,T[o[0]])(u,o,r.localize,l)})).join("")}function Q(t){const e=t.match(N);return e?e[1].replace(j,"'"):t}function G(t,e){const n=h(t);return n.setHours(e),n}function X(){return m(Date.now())}function B(t,e,n){const a=function(t,e){return+h(t)-+h(e)}(t,e)/36e5;return(r=n?.roundingMethod,t=>{const e=(r?Math[r]:Math.trunc)(t);return 0===e?0:e})(a);var r}const J={localStorage:{setTodoLists(t,e){localStorage.setItem(e,JSON.stringify(t))},getTodoLists:t=>JSON.parse(localStorage.getItem(t))}},U=class{constructor(t){this.storageAPI=J[t]}setTodoLists(t,e){this.storageAPI.setTodoLists(t,e)}getTodoLists(t){return this.storageAPI.getTodoLists(t)}},$="LISTS",R=(()=>{const t=new U("localStorage"),e=t.getTodoLists($)||[],n=()=>{t.setTodoLists(e,$)},a=t=>{e.find((t=>"everyday"===t.type)).startOfDay=I(G(X(),t),"HH:mm:ss yyyy/MM/dd"),n()};return{lists:e,setList:(t,a)=>{e.push({name:t,type:a,id:crypto.randomUUID(),todos:[]}),n()},getList:t=>e.find((e=>e.id===t)),setEverydayList:t=>{e.push({name:t,type:"everyday",id:crypto.randomUUID(),todos:[],startOfDay:I(G(X(),8),"HH:mm:ss yyyy/MM/dd")}),n()},setStartOfDay:a,deleteList:t=>{e.forEach(((a,r)=>{a.id===t&&(e.splice(r,1),n())}))},renameList:(t,a)=>{e.forEach(((r,o)=>{r.id===t&&(e[o].name=a,n())}))},addTodo:(t,a)=>{e.find((e=>e.id===t)).todos.push(a),n()},deleteTodo:(t,a)=>{const r=e.find((e=>e.id===t));r.todos.forEach(((t,e)=>{t.id===a&&r.todos.splice(e,1)})),n()},changeTodo:(t,a,r)=>{const o=e.find((e=>e.id===t));o.todos.forEach(((t,e)=>{t.id===a&&(o.todos[e]=r)})),n()},timeUpdate:()=>{const t=e.find((t=>"everyday"===t.type)).startOfDay;if(B(new Date,t)>24){const e=h(t).getHours();a(e)}}}})(),V=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];[...document.querySelectorAll("[data-dropdown]")].forEach((t=>{e.includes(t)||(t.querySelector("[data-dropdown-options]").removeAttribute("data-dropdown-visible"),t.removeAttribute("data-dropdown-active"))}))},K=t=>{const e=t.target.closest("[data-dropdown]");let n=e;e&&e.hasAttribute("data-dropdown-nested")?(n=e.parentElement.closest("[data-dropdown]"),V(e,n)):V(n),e||window.removeEventListener("click",K)};class _{constructor(t){this.element=t}init(){const t=this.element.querySelector("[data-dropdown-btn]"),e=this.element.querySelector("[data-dropdown-options]");t.addEventListener("click",(()=>{t.closest("[data-dropdown]").toggleAttribute("data-dropdown-active"),e.toggleAttribute("data-dropdown-visible"),window.addEventListener("click",K)}))}}const Z=document.querySelector(".container").querySelector("nav"),tt={updateLists(){const t=Z.querySelector("[data-default-lists]"),e=Z.querySelector("[data-custom-lists]");t.innerHTML="",e.innerHTML="",R.lists.forEach((n=>{switch(n.type){case"custom":{const t=tt.createCustomListEl(n);e.appendChild(t);break}default:{const e=tt.createDefaultListEl(n);t.appendChild(e)}}}))},createDefaultListEl(t){const e=function(t,e,n,a,r,o){const i=document.createElement(t);e&&i.classList.add(...e),n&&(i.id=n),r&&(i.innerText=r),a&&a.forEach((t=>{const e=t.cloneNode(!0);i.appendChild(e)})),o&&o.forEach((t=>{i.dataset[t.dataKey]=t.dataValue||""}));for(var s=arguments.length,u=new Array(s>6?s-6:0),d=6;d<s;d++)u[d-6]=arguments[d];return u.forEach((t=>{var e;i.setAttribute(t.key,null!==(e=t.value)&&void 0!==e?e:"")})),i}("li",["".concat(t.type,"-list-item")],null,null,null,[{dataKey:"listId",dataValue:t.id}]);return e.insertAdjacentHTML("afterbegin",'<button class="default-list-list-item_btn" data-nav-el="list-item-btn">'.concat(t.name,"</button>")),e},createCustomListEl(t){const e=document.createElement("li");e.classList.add("".concat(t.type,"-list-item")),e.dataset.listId=t.id,e.insertAdjacentHTML("afterbegin",'<button class="custom-list-item_btn list-item_btn" data-nav-el="list-item-btn">\n          '.concat(t.name,'\n        </button>\n        <div class="list_dropdown-menu" data-dropdown>\n          <button class="dropdown-btn" data-dropdown-btn>\n            <div class="btn-dot"></div>\n            <div class="btn-dot"></div>\n            <div class="btn-dot"></div>\n          </button>\n          <ul class="dropdown-content" data-dropdown-options>\n            <li>\n              <button class="delete-list-btn" data-nav-el="delete-list-btn">\n                Delete\n              </button>\n            </li>\n            <li>\n              <button class="rename-list-btn" data-nav-el="rename-list-btn">\n                Rename\n              </button>\n            </li>\n          </ul>\n        </div>'));const n=e.querySelector("[data-dropdown]");return new _(n).init(),e}},et=tt,nt=document.querySelector("#overlay"),at=()=>{nt.classList.add("visually-hidden"),nt.addEventListener("transitionend",(()=>{nt.classList.add("hidden")}),{capture:!1,once:!0,passive:!1})},rt=()=>{nt.classList.remove("hidden"),setTimeout((()=>{nt.classList.remove("visually-hidden")}),5)},ot=t=>{nt.addEventListener("click",(e=>{e.target.closest("#pop-up-form")||t.hideForm()}),{once:!0})},it=t=>{for(const e of t)if(""===e[1])return!1;return!0},st={showForm(){const t=document.createElement("form");t.id="pop-up-form",t.action="post",t.insertAdjacentHTML("afterbegin",'<h2>Add list</h2>\n       <label for="new-title">Title:</label>\n       <input id="new-title" name= "title" type="text" />\n       <p class="error-para" data-error-para>All fields must be filled up!</p>\n       <button\n         class="btn"\n         id="save-list-btn"\n         type="submit"\n       >\n         Add list\n       </button>'),t.addEventListener("submit",this.checkForm.bind(this)),nt.appendChild(t),rt(),ot(this)},hideForm(){at(),nt.innerHTML=""},checkForm(t){t.preventDefault();const e=nt.querySelector("form"),n=new FormData(e);if(!it(n))return void e.querySelector("[data-error-para]").classList.add("error-active");const a=n.get("title");R.setList(a,"custom"),et.updateLists(),this.hideForm()}},ut={listId:null,showForm(t){this.listId=t;const e=document.createElement("form");e.id="pop-up-form",e.action="post",e.insertAdjacentHTML("afterbegin",'<h2>Rename list</h2>\n       <label for="new-title">Title:</label>\n       <input id="new-title" name= "title" type="text" />\n       <p class="error-para" data-error-para>All fields must be filled up!</p>\n       <button\n         class="btn"\n         id="save-list-btn"\n         type="submit"\n       >\n         Rename\n       </button>'),e.addEventListener("submit",this.checkForm.bind(this)),nt.appendChild(e),rt(),ot(this)},hideForm(){at(),nt.innerHTML=""},checkForm(t){t.preventDefault();const e=nt.querySelector("form"),n=new FormData(e);if(!it(n))return void e.querySelector("[data-error-para]").classList.add("error-active");const a=n.get("title");R.renameList(this.listId,a),et.updateLists(),this.hideForm()}},dt=document.querySelector(".container").querySelector("nav");0===R.lists.length&&(R.setList("Today","default"),R.setList("Week","default"),R.setEverydayList("Everyday"),R.setList("test","custom")),R.timeUpdate(),et.updateLists(),dt.addEventListener("click",(t=>{switch(t.target.dataset.navEl){case"list-item-btn":{const{listId:e}=t.target.parentElement.dataset;break}case"add-project-btn":st.showForm();break;case"delete-list-btn":{const{listId:e}=t.target.closest("[data-list-id]").dataset;R.deleteList(e),et.updateLists();break}case"rename-list-btn":{const{listId:e}=t.target.closest("[data-list-id]").dataset;ut.showForm(e),et.updateLists();break}}})),window.app=R})();