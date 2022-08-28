#!/usr/bin/env node
"use strict";var e=require("child_process"),t=require("chalk"),n=require("chokidar"),r=require("console-table-printer"),a=require("@actions/core"),i=require("fs"),o=require("path"),c=require("yargs");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=s(t),u=s(a),d=s(c),h=function(){return h=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},h.apply(this,arguments)};function f(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}function p(e,t,n,r){return new(n||(n=Promise))((function(a,i){function o(e){try{s(r.next(e))}catch(e){i(e)}}function c(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}s((r=r.apply(e,t||[])).next())}))}function v(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}function b(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,i=n.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(a)throw a.error}}return o}function m(e,t,n){if(n||2===arguments.length)for(var r,a=0,i=t.length;a<i;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}var g={},y=["Files","Lines of Library","Lines of Definitions","Lines of TypeScript","Lines of JavaScript","Lines of JSON","Lines of Other","Nodes of Library","Nodes of Definitions","Nodes of TypeScript","Nodes of JavaScript","Nodes of JSON","Nodes of Other","Identifiers","Symbols","Types","Instantiations","Memory used","Assignability cache size","Identity cache size","Subtype cache size","Strict subtype cache size","I/O Read time","Parse time","ResolveModule time","ResolveTypeReference time","Program time","Bind time","Check time","printTime time","Emit time","Total time"],w={field:"white",branch:"lightgreen",initial:"blue",previous:"yellow",current:"cyan"},k={lightgreen:"[1m[32m"},O="✓",N="⛌",S="✔️",B="❌",T={style:{headerTop:{left:" ",mid:" ",right:" ",other:"⠀"},headerBottom:{left:" ",mid:" ",right:" ",other:"⠀"},tableBottom:{left:"⠀",mid:"⠀",right:"⠀",other:"⠀"},vertical:" "}},j=function(t){return new Promise((function(n){e.exec(t,(function(e,t,r){n({error:e,stdout:t,stderr:r})}))}))},x=function(e){var t=e.$0,n=e.path;return p(void 0,void 0,void 0,(function(){var e,r,a,i;return v(this,(function(o){switch(o.label){case 0:if(!n)return[2];o.label=1;case 1:return o.trys.push([1,3,,4]),[4,j("tsc -p ".concat(n," --extendeddiagnostics -noEmit"))];case 2:return e=o.sent(),r=e.error,a=e.stdout,i=a.indexOf("Files:"),r&&console.error("".concat(t,":\n"),a.substring(0,i)),-1===i?(console.log(a),[2]):[2,a.substring(i)];case 3:return o.sent(),[2];case 4:return[2]}}))}))},F=function(e,t){var n,r=e.visibleFields;if(t){var a=t.split("\n");return null===(n=Object.entries(r))||void 0===n?void 0:n.reduce((function(e,t){var n,r,i,o=b(t,2),c=o[0],s=o[1].label,l=parseInt(c);if(null===(r=a[l])||void 0===r?void 0:r.startsWith(s)){var u=null===(i=a[l].match(/\d.*/))||void 0===i?void 0:i[0];return u?h(h({},e),((n={})[s]=u,n)):e}return e}),{})}},A=function(e){return p(void 0,void 0,void 0,(function(){var t,n,r,a,i,o,c,s,l,u,d,h,f,p;return v(this,(function(v){switch(v.label){case 0:return t=e.$0,n=e.path,r=e.branch,a=e.initial,i=e.github,o=e.target,console.log("".concat(t,": Preparing...")),console.log("".concat(t,": Please do not make any changes in your workspace until preparing process is done.")),n?(c=g,[4,j(i?"git rev-parse --short HEAD":"git branch --show-current")]):[2];case 1:return c.currentBranchName=v.sent().stdout.trim(),a?(s=g,l=F,u=[e],[4,x(e)]):[3,3];case 2:s.initial=l.apply(void 0,u.concat([v.sent()]))||{},v.label=3;case 3:return g.branchName=r?r.trim():void 0,g.branchName&&g.branchName!==g.currentBranchName?(d=g,[4,I(e,g.branchName)]):[3,5];case 4:d.branch=v.sent(),v.label=5;case 5:return i&&o&&(null===(f=process.env)||void 0===f?void 0:f.GITHUB_BASE_REF)&&(null===(p=process.env)||void 0===p?void 0:p.GITHUB_BASE_REF)!==g.branchName?(g.targetName=process.env.GITHUB_BASE_REF,h=g,[4,I(e,g.targetName)]):[3,7];case 6:h.target=v.sent(),v.label=7;case 7:return console.log("".concat(t,": Preparing process done :)")),[2]}}))}))},I=function(e,t){return p(void 0,void 0,void 0,(function(){var n,r,a,i,o,c,s,l,u,d,h,f,p;return v(this,(function(v){switch(v.label){case 0:return n=e.$0,(r=e.github)&&(null===(p=process.env)||void 0===p?void 0:p.CI)?[4,j('git config --global user.email "test@ts-benchmark.com"')]:[3,3];case 1:return v.sent(),[4,j('git config --global user.name "ts-benchmark"')];case 2:v.sent(),v.label=3;case 3:return[4,j("git add .")];case 4:return v.sent(),r?(i=!1,[3,9]):[3,5];case 5:return c=Boolean,[4,j("git diff --name-only --cached")];case 6:return(o=c.apply(void 0,[v.sent()||!1]))?(s=Boolean,[4,j("git branch --list ".concat(g.branchName))]):[3,8];case 7:o=s.apply(void 0,[v.sent()||!1]),v.label=8;case 8:i=o,v.label=9;case 9:return(a=i)?[4,j("git commit -m ".concat(n,"-temp-commit"))]:[3,11];case 10:v.sent(),v.label=11;case 11:return[4,j("git checkout ".concat(t))];case 12:return v.sent(),u=F,d=[e],[4,x(e)];case 13:return l=u.apply(void 0,d.concat([v.sent()]))||{},[4,j("git checkout ".concat(g.currentBranchName))];case 14:return v.sent(),(f=a)?[4,j("git log -1 --pretty=%B")]:[3,16];case 15:f=v.sent().stdout.trim(),v.label=16;case 16:return h=f,a&&h==="".concat(n,"-temp-commit")?[4,j("git reset HEAD~")]:[3,18];case 17:v.sent(),v.label=18;case 18:return[2,l]}}))}))},E=function(e){return p(void 0,void 0,void 0,(function(){var t,n,a,c,s,d,p,y,j,A;return v(this,(function(v){switch(v.label){case 0:return t=e.save,n=e.$0,c=F,s=[e],[4,x(e)];case 1:if(a=c.apply(void 0,s.concat([v.sent()])),d=function(e,t,n){var r=e.visibleFields;void 0===n&&(n=!0);var a=Object.keys(t);if(t&&(null==a?void 0:a.length)){var i=(null==g?void 0:g.tableColumns)||m(["field"],b(a),!1).map((function(e){var t="branch"===e||"target"===e?g["".concat(e,"Name")]:e;return{name:e,alignment:"left",color:null==w?void 0:w[e],title:t.charAt(0).toUpperCase()+t.slice(1)}})),o=!1,c=Object.entries(r).reduce((function(e,r){var i=b(r,2);i[0];var c=i[1],s=c.label,l=c.max,u=!0,d="",f=h({field:s},a.reduce((function(e,r){var a,i,c=null===(i=null==t?void 0:t[r])||void 0===i?void 0:i[s];return!n||"current"!==r||!l||parseFloat(c)<l||(o=!0,u=!1,d="Current benchmark result ".concat(c," > ").concat(l)),h(h({},e),((a={})[r]=c,a))}),{}));return m(m([],b(e),!1),[h(h({},f),{succeed:u,failureDetails:d})],!1)}),[]);return{colorMap:k,columns:m(m([],b(i),!1),b(o?[{name:"succeed",color:"green",alignment:"center",title:"Succeed"},{name:"failureDetails",alignment:"left",title:"Failure details"}]:[]),!1),rows:o?c:c.map((function(e){return e.succeed,e.failureDetails,f(e,["succeed","failureDetails"])})),hasBenchmarkFailed:o}}}(e,h(h(h(h(h({},(null==g?void 0:g.branch)?{branch:g.branch}:{}),(null==g?void 0:g.target)?{target:g.target}:{}),(null==g?void 0:g.initial)?{initial:g.initial}:{}),(null==g?void 0:g.previous)?{previous:g.previous}:{}),a?{current:a}:{})),p=new r.Table(h(h(h({},e.github?T:{rowSeparator:!0}),(I=d,I?h(h({},I),{rows:null==I?void 0:I.rows.map((function(e){var t=e.succeed,n=e.current,r=f(e,["succeed","current"]);return h(h(h({},r),{current:!1===t?l.default.red(n):n}),void 0===t?{}:{succeed:t?l.default.green(O):l.default.red(N)})}))}):I)),{title:"<{ ".concat(n," result }>")})).render(),console.log("\n\n",p.replace(/ /g,"⠀")),t&&(g.previous=a),(null===(A=process.env)||void 0===A?void 0:A.CI)&&e.github){(null==d?void 0:d.hasBenchmarkFailed)&&u.default.setFailed("Action failed, Please check failure details"),y=void 0;try{j=JSON.parse(i.readFileSync(o.resolve(process.cwd(),"package.json"),"utf8")),y=j.name}catch(e){}u.default.summary.addRaw('<h3 align="center"><{ <a href="https://www.npmjs.com/package/'.concat(n,'">').concat(n,"</a> }></h3>")).addBreak().addTable(function(e){if(!e)return[];var t=e.columns,n=e.rows;return m([t.map((function(e){var t=e.title,n=e.name;return{data:t||n,header:!0}}))],b(n.map((function(e){return Object.values(e).map((function(e){return"boolean"==typeof e?e?S:B:e}))}))),!1)}(d)),y&&u.default.summary.addBreak().addRaw('<small align="right">📊 This test has been performed by '.concat(n," for supporting ").concat(y," 🎉</small>")).addRaw("<h6>Thanks for using ".concat(n," 🌝</h6>")),u.default.summary.addBreak().write()}return[2]}var I}))}))};!function(){p(this,void 0,void 0,(function(){var e,t,r,a,i,o,c;return v(this,(function(s){return e=d.default.scriptName("ts-benchmark").usage("\nUsage:\n $0 -ts path/to/targeted/package/types -p path/to/test/project/that/use/the/target/package").option("path",{alias:"p",describe:"A relative path to project that will be benchmarked.",type:"string",default:"./"}).option("watch",{alias:"w",describe:"A relative path to a directory or a file that trigger benchmark process on any changes.",type:"string"}).option("branch",{alias:"b",describe:"Another git branch name to be benchmarked and compared with the current branch.",type:"string"}).option("save",{alias:"s",describe:"To save and show the previous benchmark result.",type:"boolean",default:!1}).option("initial",{alias:"i",describe:"To save and show the initial benchmark result.",type:"boolean",default:!1}).option("fields",{alias:"f",describe:"To pick and show specific fields of benchmark result by its index numbers.\n Check how this option value format: https://www.npmjs.com/package/ts-benchmark#fields",type:"array"}).option("github",{alias:"g",describe:"To integrate result with github workflow.\n Check how this option value format: https://www.npmjs.com/package/ts-benchmark#fields",type:"boolean"}).option("target",{alias:"t",describe:"Useful for benchmarking targeted branch of github pull request.\n Check how this option value format: https://www.npmjs.com/package/ts-benchmark#fields",type:"boolean"}).wrap(Math.min(100,d.default.terminalWidth())).help().argv,t=e.$0,r=e.save,a=e.watch,i=e.fields,o=e.initial,r&&!a&&console.warn("".concat(t,': "save" option is not available when watch mode is inactive!')),o&&!a&&console.warn("".concat(t,': "initial" option is not available when watch mode is inactive!')),c=function(e){return e&&"string"!=typeof e?null==e?void 0:e.reduce((function(e,t){var n,r=b("number"==typeof t?[t,void 0]:t.split("/").map((function(e){return parseInt(e)})),2),a=r[0],i=r[1],o=a-1;try{return(null==y?void 0:y[o])?h(h({},e),((n={})[o]={label:null==y?void 0:y[o],max:i},n)):e}catch(t){return e}}),{}):y.reduce((function(e,t,n){var r;return h(h({},e),((r={})[n]={label:t},r))}),{})}(i),e.visibleFields=c,function(e){p(void 0,void 0,void 0,(function(){var t,r,a,i,o,c;return v(this,(function(s){switch(s.label){case 0:return t=e.$0,r=e.watch,a=e.branch,i=e.initial,o=e.target,i||a||o?[4,A(e)]:[3,2];case 1:s.sent(),s.label=2;case 2:return r?(c="\n".concat(t,": I am looking for changes... (0_0)\n"),console.log(c),n.watch(r,{persistent:!0}).on("change",(function(){return p(void 0,void 0,void 0,(function(){return v(this,(function(t){switch(t.label){case 0:return[4,E(e)];case 1:return t.sent(),console.log(c),[2]}}))}))}))):E(e),[2]}}))}))}(e),[2]}))}))}();
