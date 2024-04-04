/*! For license information please see 9523.0681e04d.js.LICENSE.txt */
"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[9523],{58838:(t,e,r)=>{function s(t,e){if(!t)throw new Error("null row");const r={};if(e)for(let s=0;s<e.length;s++)r[e[s]]=t[s];else for(let s=0;s<t.length;s++){r[`column-${s}`]=t[s]}return r}function i(t,e){if(!t)throw new Error("null row");if(e){const r=new Array(e.length);for(let s=0;s<e.length;s++)r[s]=t[e[s]];return r}return Object.values(t)}let n;r.d(e,{w:()=>x});class a extends Array{enqueue(t){return this.push(t)}dequeue(){return this.shift()}}n=Symbol.asyncIterator;class o{constructor(){this._values=void 0,this._settlers=void 0,this._closed=void 0,this._values=new a,this._settlers=new a,this._closed=!1}close(){for(;this._settlers.length>0;)this._settlers.dequeue().resolve({done:!0});this._closed=!0}[n](){return this}enqueue(t){if(this._closed)throw new Error("Closed");if(this._settlers.length>0){if(this._values.length>0)throw new Error("Illegal internal state");const e=this._settlers.dequeue();t instanceof Error?e.reject(t):e.resolve({value:t})}else this._values.enqueue(t)}next(){if(this._values.length>0){const t=this._values.dequeue();return t instanceof Error?Promise.reject(t):Promise.resolve({value:t})}if(this._closed){if(this._settlers.length>0)throw new Error("Illegal internal state");return Promise.resolve({done:!0})}return new Promise(((t,e)=>{this._settlers.enqueue({resolve:t,reject:e})}))}}class h{constructor(t,e){if(this.schema=void 0,this.options=void 0,this.shape=void 0,this.length=0,this.rows=null,this.cursor=0,this._headers=[],this.options=e,this.schema=t,!Array.isArray(t)){this._headers=[];for(const e in t)this._headers[t[e].index]=t[e].name}}rowCount(){return this.length}addArrayRow(t,e){Number.isFinite(e)&&(this.cursor=e),this.shape="array-row-table",this.rows=this.rows||new Array(100),this.rows[this.length]=t,this.length++}addObjectRow(t,e){Number.isFinite(e)&&(this.cursor=e),this.shape="object-row-table",this.rows=this.rows||new Array(100),this.rows[this.length]=t,this.length++}getBatch(){let t=this.rows;if(!t)return null;t=t.slice(0,this.length),this.rows=null;return{shape:this.shape||"array-row-table",batchType:"data",data:t,length:this.length,schema:this.schema,cursor:this.cursor}}}class l{constructor(t,e){if(this.schema=void 0,this.options=void 0,this.length=0,this.objectRows=null,this.arrayRows=null,this.cursor=0,this._headers=null,this.options=e,this.schema=t,t){this._headers=[];for(const e in t)this._headers[t[e].index]=t[e].name}}rowCount(){return this.length}addArrayRow(t,e){switch(Number.isFinite(e)&&(this.cursor=e),this._headers||(this._headers=function(t){const e=[];for(let r=0;r<t.length;r++){const t=`column-${r}`;e.push(t)}return e}(t)),this.options.shape){case"object-row-table":const r=s(t,this._headers);this.addObjectRow(r,e);break;case"array-row-table":this.arrayRows=this.arrayRows||new Array(100),this.arrayRows[this.length]=t,this.length++}}addObjectRow(t,e){switch(Number.isFinite(e)&&(this.cursor=e),this._headers||(this._headers=function(t){return Object.keys(t)}(t)),this.options.shape){case"array-row-table":const r=i(t,this._headers);this.addArrayRow(r,e);break;case"object-row-table":this.objectRows=this.objectRows||new Array(100),this.objectRows[this.length]=t,this.length++}}getBatch(){let t=this.arrayRows||this.objectRows;return t?(t=t.slice(0,this.length),this.arrayRows=null,this.objectRows=null,{shape:this.options.shape,batchType:"data",data:t,length:this.length,schema:this.schema,cursor:this.cursor}):null}}class u{constructor(t,e){this.schema=void 0,this.length=0,this.allocated=0,this.columns={},this.schema=t,this._reallocateColumns()}rowCount(){return this.length}addArrayRow(t){this._reallocateColumns();let e=0;for(const r in this.columns)this.columns[r][this.length]=t[e++];this.length++}addObjectRow(t){this._reallocateColumns();for(const e in t)this.columns[e][this.length]=t[e];this.length++}getBatch(){this._pruneColumns();const t=Array.isArray(this.schema)?this.columns:{};if(!Array.isArray(this.schema))for(const e in this.schema){const r=this.schema[e];t[r.name]=this.columns[r.index]}this.columns={};return{shape:"columnar-table",batchType:"data",data:t,schema:this.schema,length:this.length}}_reallocateColumns(){if(!(this.length<this.allocated)){this.allocated=this.allocated>0?this.allocated*=2:100,this.columns={};for(const t in this.schema){const e=this.schema[t],r=e.type||Float32Array,s=this.columns[e.index];if(s&&ArrayBuffer.isView(s)){const t=new r(this.allocated);t.set(s),this.columns[e.index]=t}else s?(s.length=this.allocated,this.columns[e.index]=s):this.columns[e.index]=new r(this.allocated)}}}_pruneColumns(){for(const[t,e]of Object.entries(this.columns))this.columns[t]=e.slice(0,this.length)}}const c={shape:void 0,batchSize:"auto",batchDebounceMs:0,limit:0,_limitMB:0};class d{constructor(t,e){this.schema=void 0,this.options=void 0,this.aggregator=null,this.batchCount=0,this.bytesUsed=0,this.isChunkComplete=!1,this.lastBatchEmittedMs=Date.now(),this.totalLength=0,this.totalBytes=0,this.rowBytes=0,this.schema=t,this.options={...c,...e}}limitReached(){var t,e;return!!(Boolean(null===(t=this.options)||void 0===t?void 0:t.limit)&&this.totalLength>=this.options.limit)||!!(Boolean(null===(e=this.options)||void 0===e?void 0:e._limitMB)&&this.totalBytes/1e6>=this.options._limitMB)}addRow(t){this.limitReached()||(this.totalLength++,this.rowBytes=this.rowBytes||this._estimateRowMB(t),this.totalBytes+=this.rowBytes,Array.isArray(t)?this.addArrayRow(t):this.addObjectRow(t))}addArrayRow(t){if(!this.aggregator){const t=this._getTableBatchType();this.aggregator=new t(this.schema,this.options)}this.aggregator.addArrayRow(t)}addObjectRow(t){if(!this.aggregator){const t=this._getTableBatchType();this.aggregator=new t(this.schema,this.options)}this.aggregator.addObjectRow(t)}chunkComplete(t){t instanceof ArrayBuffer&&(this.bytesUsed+=t.byteLength),"string"==typeof t&&(this.bytesUsed+=t.length),this.isChunkComplete=!0}getFullBatch(t){return this._isFull()?this._getBatch(t):null}getFinalBatch(t){return this._getBatch(t)}_estimateRowMB(t){return Array.isArray(t)?8*t.length:8*Object.keys(t).length}_isFull(){if(!this.aggregator||0===this.aggregator.rowCount())return!1;if("auto"===this.options.batchSize){if(!this.isChunkComplete)return!1}else if(this.options.batchSize>this.aggregator.rowCount())return!1;return!(this.options.batchDebounceMs>Date.now()-this.lastBatchEmittedMs)&&(this.isChunkComplete=!1,this.lastBatchEmittedMs=Date.now(),!0)}_getBatch(t){if(!this.aggregator)return null;null!=t&&t.bytesUsed&&(this.bytesUsed=t.bytesUsed);const e=this.aggregator.getBatch();return e.count=this.batchCount,e.bytesUsed=this.bytesUsed,Object.assign(e,t),this.batchCount++,this.aggregator=null,e}_getTableBatchType(){switch(this.options.shape){case"array-row-table":case"object-row-table":return l;case"columnar-table":return u;case"arrow-table":if(!d.ArrowBatch)throw new Error("TableBatchBuilder");return d.ArrowBatch;default:return h}}}d.ArrowBatch=void 0;const f={parse:function(t,e,r){var s=(e=e||{}).dynamicTyping||!1;_(s)&&(e.dynamicTypingFunction=s,s={});if(e.dynamicTyping=s,e.transform=!!_(e.transform)&&e.transform,e.worker&&f.WORKERS_SUPPORTED){var i=newWorker();return i.userStep=e.step,i.userChunk=e.chunk,i.userComplete=e.complete,i.userError=e.error,e.step=_(e.step),e.chunk=_(e.chunk),e.complete=_(e.complete),e.error=_(e.error),delete e.worker,void i.postMessage({input:t,config:e,workerId:i.id})}var n=null;"string"==typeof t&&(n=new m(e));n||(n=new r(e));return n.stream(t)},unparse:function(t,e){var r=!1,s=!0,i=",",n="\r\n",a='"',o=a+a,h=!1,l=null;!function(){if("object"!=typeof e)return;"string"!=typeof e.delimiter||f.BAD_DELIMITERS.filter((function(t){return-1!==e.delimiter.indexOf(t)})).length||(i=e.delimiter);("boolean"==typeof e.quotes||Array.isArray(e.quotes))&&(r=e.quotes);"boolean"!=typeof e.skipEmptyLines&&"string"!=typeof e.skipEmptyLines||(h=e.skipEmptyLines);"string"==typeof e.newline&&(n=e.newline);"string"==typeof e.quoteChar&&(a=e.quoteChar);"boolean"==typeof e.header&&(s=e.header);if(Array.isArray(e.columns)){if(0===e.columns.length)throw new Error("Option columns is empty");l=e.columns}void 0!==e.escapeChar&&(o=e.escapeChar+a)}();var u=new RegExp(w(a),"g");"string"==typeof t&&(t=JSON.parse(t));if(Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return d(null,t,h);if("object"==typeof t[0])return d(l||c(t[0]),t,h)}else if("object"==typeof t)return"string"==typeof t.data&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:c(t.data[0])),Array.isArray(t.data[0])||"object"==typeof t.data[0]||(t.data=[t.data])),d(t.fields||[],t.data||[],h);throw new Error("Unable to serialize unrecognized input");function c(t){if("object"!=typeof t)return[];var e=[];for(var r in t)e.push(r);return e}function d(t,e,r){var a="";"string"==typeof t&&(t=JSON.parse(t)),"string"==typeof e&&(e=JSON.parse(e));var o=Array.isArray(t)&&t.length>0,h=!Array.isArray(e[0]);if(o&&s){for(var l=0;l<t.length;l++)l>0&&(a+=i),a+=p(t[l],l);e.length>0&&(a+=n)}for(var u=0;u<e.length;u++){var c=o?t.length:e[u].length,d=!1,f=o?0===Object.keys(e[u]).length:0===e[u].length;if(r&&!o&&(d="greedy"===r?""===e[u].join("").trim():1===e[u].length&&0===e[u][0].length),"greedy"===r&&o){for(var g=[],m=0;m<c;m++){var y=h?t[m]:m;g.push(e[u][y])}d=""===g.join("").trim()}if(!d){for(var w=0;w<c;w++){w>0&&!f&&(a+=i);var b=o&&h?t[w]:w;a+=p(e[u][b],w)}u<e.length-1&&(!r||c>0&&!f)&&(a+=n)}}return a}function p(t,e){if(null==t)return"";if(t.constructor===Date)return JSON.stringify(t).slice(1,25);t=t.toString().replace(u,o);var s="boolean"==typeof r&&r||Array.isArray(r)&&r[e]||function(t,e){for(var r=0;r<e.length;r++)if(t.indexOf(e[r])>-1)return!0;return!1}(t,f.BAD_DELIMITERS)||t.indexOf(i)>-1||" "===t.charAt(0)||" "===t.charAt(t.length-1);return s?a+t+a:t}},RECORD_SEP:String.fromCharCode(30),UNIT_SEP:String.fromCharCode(31),BYTE_ORDER_MARK:"\ufeff",BAD_DELIMITERS:["\r","\n",'"',"\ufeff"],WORKERS_SUPPORTED:!1,NODE_STREAM_INPUT:1,LocalChunkSize:10485760,RemoteChunkSize:5242880,DefaultDelimiter:",",Parser:b,ParserHandle:y,ChunkStreamer:g,StringStreamer:m},p=f;function g(t){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(t){var e=v(t);e.chunkSize=parseInt(e.chunkSize),t.step||t.chunk||(e.chunkSize=null);this._handle=new y(e),this._handle.streamer=this,this._config=e}.call(this,t),this.parseChunk=function(t,e){if(this.isFirstChunk&&_(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1;var s=this._partialLine+t;this._partialLine="";var i=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var n=i.meta.cursor;this._finished||(this._partialLine=s.substring(n-this._baseIndex),this._baseIndex=n),i&&i.data&&(this._rowCount+=i.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(_(this._config.chunk)&&!e){if(this._config.chunk(i,this._handle),this._handle.paused()||this._handle.aborted())return;i=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(i.data),this._completeResults.errors=this._completeResults.errors.concat(i.errors),this._completeResults.meta=i.meta),this._completed||!a||!_(this._config.complete)||i&&i.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||i&&i.meta.paused||this._nextChunk(),i}},this._sendError=function(t){_(this._config.error)&&this._config.error(t)}}function m(t){var e;t=t||{},g.call(this,t),this.stream=function(t){return e=t,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var t=this._config.chunkSize,r=t?e.substr(0,t):e;return e=t?e.substr(t):"",this._finished=!e,this.parseChunk(r)}}}function y(t){var e,r,s,i=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,n=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,a=this,o=0,h=0,l=!1,u=!1,c=[],d={data:[],errors:[],meta:{}};if(_(t.step)){var p=t.step;t.step=function(e){if(d=e,y())m();else{if(m(),!d.data||0===d.data.length)return;o+=e.data.length,t.preview&&o>t.preview?r.abort():p(d,a)}}}function g(e){return"greedy"===t.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function m(){if(d&&s&&(A("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+f.DefaultDelimiter+"'"),s=!1),t.skipEmptyLines)for(var e=0;e<d.data.length;e++)g(d.data[e])&&d.data.splice(e--,1);return y()&&function(){if(!d)return;function e(e){_(t.transformHeader)&&(e=t.transformHeader(e)),c.push(e)}if(Array.isArray(d.data[0])){for(var r=0;y()&&r<d.data.length;r++)d.data[r].forEach(e);d.data.splice(0,1)}else d.data.forEach(e)}(),function(){if(!d||!d.data||!t.header&&!t.dynamicTyping&&!t.transform)return d;function e(e,r){var s,i=t.header?{}:[];for(s=0;s<e.length;s++){var n=s,a=e[s];t.header&&(n=s>=c.length?"__parsed_extra":c[s]),t.transform&&(a=t.transform(a,n)),a=C(n,a),"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(a)):i[n]=a}return t.header&&(s>c.length?A("FieldMismatch","TooManyFields","Too many fields: expected "+c.length+" fields but parsed "+s,h+r):s<c.length&&A("FieldMismatch","TooFewFields","Too few fields: expected "+c.length+" fields but parsed "+s,h+r)),i}var r=1;!d.data[0]||Array.isArray(d.data[0])?(d.data=d.data.map(e),r=d.data.length):d.data=e(d.data,0);t.header&&d.meta&&(d.meta.fields=c);return h+=r,d}()}function y(){return t.header&&0===c.length}function C(e,r){return function(e){return t.dynamicTypingFunction&&void 0===t.dynamicTyping[e]&&(t.dynamicTyping[e]=t.dynamicTypingFunction(e)),!0===(t.dynamicTyping[e]||t.dynamicTyping)}(e)?"true"===r||"TRUE"===r||"false"!==r&&"FALSE"!==r&&(i.test(r)?parseFloat(r):n.test(r)?new Date(r):""===r?null:r):r}function A(t,e,r,s){d.errors.push({type:t,code:e,message:r,row:s})}this.parse=function(i,n,a){var o=t.quoteChar||'"';if(t.newline||(t.newline=function(t,e){t=t.substr(0,1048576);var r=new RegExp(w(e)+"([^]*?)"+w(e),"gm");t=t.replace(r,"");var s=t.split("\r"),i=t.split("\n"),n=i.length>1&&i[0].length<s[0].length;if(1===s.length||n)return"\n";for(var a=0,o=0;o<s.length;o++)"\n"===s[o][0]&&a++;return a>=s.length/2?"\r\n":"\r"}(i,o)),s=!1,t.delimiter)_(t.delimiter)&&(t.delimiter=t.delimiter(i),d.meta.delimiter=t.delimiter);else{var h=function(e,r,s,i,n){var a,o,h;n=n||[",","\t","|",";",f.RECORD_SEP,f.UNIT_SEP];for(var l=0;l<n.length;l++){var u=n[l],c=0,d=0,p=0;h=void 0;for(var m=new b({comments:i,delimiter:u,newline:r,preview:10}).parse(e),y=0;y<m.data.length;y++)if(s&&g(m.data[y]))p++;else{var w=m.data[y].length;d+=w,void 0!==h?w>1&&(c+=Math.abs(w-h),h=w):h=0}m.data.length>0&&(d/=m.data.length-p),(void 0===o||c>o)&&d>1.99&&(o=c,a=u)}return t.delimiter=a,{successful:!!a,bestDelimiter:a}}(i,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);h.successful?t.delimiter=h.bestDelimiter:(s=!0,t.delimiter=f.DefaultDelimiter),d.meta.delimiter=t.delimiter}var u=v(t);return t.preview&&t.header&&u.preview++,e=i,r=new b(u),d=r.parse(e,n,a),m(),l?{meta:{paused:!0}}:d||{meta:{paused:!1}}},this.paused=function(){return l},this.pause=function(){l=!0,r.abort(),e=e.substr(r.getCharIndex())},this.resume=function(){l=!1,a.streamer.parseChunk(e,!0)},this.aborted=function(){return u},this.abort=function(){u=!0,r.abort(),d.meta.aborted=!0,_(t.complete)&&t.complete(d),e=""}}function w(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function b(t){var e,r=(t=t||{}).delimiter,s=t.newline,i=t.comments,n=t.step,a=t.preview,o=t.fastMode,h=e=void 0===t.quoteChar?'"':t.quoteChar;if(void 0!==t.escapeChar&&(h=t.escapeChar),("string"!=typeof r||f.BAD_DELIMITERS.indexOf(r)>-1)&&(r=","),i===r)throw new Error("Comment character same as delimiter");!0===i?i="#":("string"!=typeof i||f.BAD_DELIMITERS.indexOf(i)>-1)&&(i=!1),"\n"!==s&&"\r"!==s&&"\r\n"!==s&&(s="\n");var l=0,u=!1;this.parse=function(t,c,d){if("string"!=typeof t)throw new Error("Input must be a string");var f=t.length,p=r.length,g=s.length,m=i.length,y=_(n);l=0;var b=[],v=[],C=[],A=0;if(!t)return I();if(o||!1!==o&&-1===t.indexOf(e)){for(var k=t.split(s),x=0;x<k.length;x++){if(C=k[x],l+=C.length,x!==k.length-1)l+=s.length;else if(d)return I();if(!i||C.substr(0,m)!==i){if(y){if(b=[],O(C.split(r)),L(),u)return I()}else O(C.split(r));if(a&&x>=a)return b=b.slice(0,a),I(!0)}}return I()}for(var R,E=t.indexOf(r,l),S=t.indexOf(s,l),T=new RegExp(w(h)+w(e),"g");;)if(t[l]!==e)if(i&&0===C.length&&t.substr(l,m)===i){if(-1===S)return I();l=S+g,S=t.indexOf(s,l),E=t.indexOf(r,l)}else if(-1!==E&&(E<S||-1===S))C.push(t.substring(l,E)),l=E+p,E=t.indexOf(r,l);else{if(-1===S)break;if(C.push(t.substring(l,S)),F(S+g),y&&(L(),u))return I();if(a&&b.length>=a)return I(!0)}else{for(R=l,l++;;){if(-1===(R=t.indexOf(e,R+1)))return d||v.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:b.length,index:l}),D();if(R===f-1)return D(t.substring(l,R).replace(T,e));if(e!==h||t[R+1]!==h){if(e===h||0===R||t[R-1]!==h){var B=j(-1===S?E:Math.min(E,S));if(t[R+1+B]===r){if(C.push(t.substring(l,R).replace(T,e)),l=R+1+B+p,E=t.indexOf(r,l),S=t.indexOf(s,l),y&&(L(),u))return I();if(a&&b.length>=a)return I(!0);break}var M=j(S);if(t.substr(R+1+M,g)===s){if(C.push(t.substring(l,R).replace(T,e)),F(R+1+M+g),E=t.indexOf(r,l),y&&(L(),u))return I();if(a&&b.length>=a)return I(!0);break}v.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:b.length,index:l}),R++}}else R++}if(y&&(L(),u))return I();if(a&&b.length>=a)return I(!0)}return D();function O(t){b.push(t),A=l}function j(e){var r=0;if(-1!==e){var s=t.substring(R+1,e);s&&""===s.trim()&&(r=s.length)}return r}function D(e){return d||(void 0===e&&(e=t.substr(l)),C.push(e),l=f,O(C),y&&L()),I()}function F(e){l=e,O(C),C=[],S=t.indexOf(s,l)}function I(t,e){return{data:e||!1?b[0]:b,errors:v,meta:{delimiter:r,linebreak:s,aborted:u,truncated:!!t,cursor:A+(c||0)}}}function L(){n(I(void 0,!0)),b=[],v=[]}},this.abort=function(){u=!0},this.getCharIndex=function(){return l}}function v(t){if("object"!=typeof t||null===t)return t;var e=Array.isArray(t)?[]:{};for(var r in t)e[r]=v(t[r]);return e}function _(t){return"function"==typeof t}m.prototype=Object.create(m.prototype),m.prototype.constructor=m;const{ChunkStreamer:C}=p;function A(t){t=t||{},C.call(this,t),this.textDecoder=new TextDecoder(this._config.encoding),this.stream=async function(t){this._input=t;try{for await(const e of t)this.parseChunk(this.getStringChunk(e));this._finished=!0,this.parseChunk("")}catch(e){this._sendError(e)}},this._nextChunk=function(){},this.getStringChunk=function(t){return"string"==typeof t?t:this.textDecoder.decode(t,{stream:!0})}}A.prototype=Object.create(C.prototype),A.prototype.constructor=A;const k="object-row-table",x={id:"csv",module:"csv",name:"CSV",version:"4.1.4",extensions:["csv","tsv","dsv"],mimeTypes:["text/csv","text/tab-separated-values","text/dsv"],category:"table",parse:async(t,e)=>R((new TextDecoder).decode(t),e),parseText:(t,e)=>R(t,e),parseInBatches:function(t,e){var r;"auto"===(e={...e}).batchSize&&(e.batchSize=4e3);const s={...x.options.csv,...null===(r=e)||void 0===r?void 0:r.csv},i=new o;let n=!0,a=null,h=null,l=null;const u={...s,header:!1,download:!1,chunkSize:5242880,skipEmptyLines:!1,step(t){let r=t.data;if(s.skipEmptyLines){if(""===r.flat().join("").trim())return}const o=t.meta.cursor;if(n&&!a){if("auto"===s.header?E(r):Boolean(s.header))return void(a=r.map(S()))}n&&(n=!1,a||(a=T(s.columnPrefix,r.length)),l=function(t,e){const r=e?{}:[];for(let s=0;s<t.length;s++){const i=e&&e[s]||s;switch(typeof t[s]){case"number":case"boolean":r[i]={name:String(i),index:s,type:Float32Array};break;default:r[i]={name:String(i),index:s,type:Array}}}return r}(r,a)),s.optimizeMemoryUsage&&(r=JSON.parse(JSON.stringify(r)));const u=s.shape||k;h=h||new d(l,{shape:u,...e});try{h.addRow(r);const t=h&&h.getFullBatch({bytesUsed:o});t&&i.enqueue(t)}catch(c){i.enqueue(c)}},complete(t){try{const e=t.meta.cursor,r=h&&h.getFinalBatch({bytesUsed:e});r&&i.enqueue(r)}catch(e){i.enqueue(e)}i.close()}};return p.parse(t,u,A),i},options:{csv:{shape:k,optimizeMemoryUsage:!1,header:"auto",columnPrefix:"column",quoteChar:'"',escapeChar:'"',dynamicTyping:!0,comments:!1,skipEmptyLines:!0,delimitersToGuess:[",","\t","|",";"]}}};async function R(t,e){const r={...x.options.csv,...null==e?void 0:e.csv},n=function(t){const e=p.parse(t,{download:!1,dynamicTyping:!0,preview:1});return e.data[0]}(t),a="auto"===r.header?E(n):Boolean(r.header),o={...r,header:a,download:!1,transformHeader:a?S():void 0,error:t=>{throw new Error(t)}},h=p.parse(t,o),l=h.data,u=h.meta.fields||T(r.columnPrefix,n.length),c=r.shape||k;switch(c){case"object-row-table":return{shape:"object-row-table",data:l.map((t=>Array.isArray(t)?s(t,u):t))};case"array-row-table":return{shape:"array-row-table",data:l.map((t=>Array.isArray(t)?t:i(t,u)))};default:throw new Error(c)}}function E(t){return t&&t.every((t=>"string"==typeof t))}function S(){const t=new Set;return e=>{let r=e,s=1;for(;t.has(r);)r=`${e}.${s}`,s++;return t.add(r),r}}function T(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;const r=[];for(let s=0;s<e;s++)r.push(`${t}${s+1}`);return r}},918:(t,e,r)=>{r.d(e,{Z:()=>c,Q:()=>u});var s=r(93896),i=r(81995),n=r(94182),a=r(42035),o=r(65368);var h=r(19799);function l(t,e,r,i){var n,l=(0,s.ly)(t,e,r);switch((i=(0,a.Z)(null==i?",f":i)).type){case"s":var u=Math.max(Math.abs(t),Math.abs(e));return null!=i.precision||isNaN(n=function(t,e){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor((0,o.Z)(e)/3)))-(0,o.Z)(Math.abs(t)))}(l,u))||(i.precision=n),(0,h.jH)(i,u);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN(n=function(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,(0,o.Z)(e)-(0,o.Z)(t))+1}(l,Math.max(Math.abs(t),Math.abs(e))))||(i.precision=n-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN(n=function(t){return Math.max(0,-(0,o.Z)(Math.abs(t)))}(l))||(i.precision=n-2*("%"===i.type))}return(0,h.WU)(i)}function u(t){var e=t.domain;return t.ticks=function(t){var r=e();return(0,s.ZP)(r[0],r[r.length-1],null==t?10:t)},t.tickFormat=function(t,r){var s=e();return l(s[0],s[s.length-1],null==t?10:t,r)},t.nice=function(r){null==r&&(r=10);var i,n,a=e(),o=0,h=a.length-1,l=a[o],u=a[h],c=10;for(u<l&&(n=l,l=u,u=n,n=o,o=h,h=n);c-- >0;){if((n=(0,s.G9)(l,u,r))===i)return a[o]=l,a[h]=u,e(a);if(n>0)l=Math.floor(l/n)*n,u=Math.ceil(u/n)*n;else{if(!(n<0))break;l=Math.ceil(l*n)/n,u=Math.floor(u*n)/n}i=n}return t},t}function c(){var t=(0,i.ZP)();return t.copy=function(){return(0,i.JG)(t,c())},n.o.apply(t,arguments),u(t)}}}]);