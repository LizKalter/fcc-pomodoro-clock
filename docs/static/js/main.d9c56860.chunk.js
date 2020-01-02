(this["webpackJsonpfcc-pomodoro-clock"]=this["webpackJsonpfcc-pomodoro-clock"]||[]).push([[0],{12:function(e,t,n){e.exports=n(23)},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n.n(s),i=n(5),a=n.n(i),c=n(3),o=n(4),u=n(11);n(22),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l={breakLength:5,sessionLength:25,isPaused:!0,isInSession:!0,timeLeft:1500},m=null,E=function(e){return e.breakLength<60?e.isInSession?{breakLength:e.breakLength+1}:{breakLength:e.breakLength+1,timeLeft:e.timeLeft+60}:{breakLength:e.breakLength}},f=function(e){return e.breakLength>1?e.isInSession?{breakLength:e.breakLength-1}:{breakLength:e.breakLength-1,timeLeft:e.timeLeft-60}:{breakLength:e.breakLength}},L=function(e){return e.sessionLength<60?e.isInSession?{sessionLength:e.sessionLength+1,timeLeft:e.timeLeft+60}:{sessionLength:e.sessionLength+1}:{sessionLength:e.sessionLength}},g=function(e){return e.sessionLength>1?e.isInSession?{sessionLength:e.sessionLength-1,timeLeft:e.timeLeft-60}:{sessionLength:e.sessionLength-1}:{sessionLength:e.sessionLength}},b=function(e){return 0===e.timeLeft?e.isInSession?{isInSession:!1,timeLeft:60*e.breakLength}:{isInSession:!0,timeLeft:60*e.sessionLength}:{timeLeft:e.timeLeft-1}},h=Object(o.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INCREMENT_BREAK":return Object.assign({},e,E(e));case"DECREMENT_BREAK":return Object.assign({},e,f(e));case"INCREMENT_SESSION":return Object.assign({},e,L(e));case"DECREMENT_SESSION":return Object.assign({},e,g(e));case"RESET":return clearInterval(m),Object.assign({},l,{isReset:!e.isReset});case"PAUSE_TIMER":return Object.assign({},e,{isPaused:!0});case"START_TIMER":return Object.assign({},e,{isPaused:!1,isReset:!1});case"TICK":return Object.assign({},e,b(e));default:return e}}),Object(o.a)(u.a));var d=Object(c.b)((function(e){return{breakLength:e.breakLength}}),(function(e){return{incrementBreak:function(){e({type:"INCREMENT_BREAK"})},decrementBreak:function(){e({type:"DECREMENT_BREAK"})}}}))((function(e){return r.a.createElement("div",{className:"break"},r.a.createElement("div",{id:"break-label"},"Break Length"),r.a.createElement("button",{id:"break-decrement",onClick:e.decrementBreak},"-"),r.a.createElement("span",{id:"break-length"},e.breakLength),r.a.createElement("button",{id:"break-increment",onClick:e.incrementBreak},"+"))}));var k=Object(c.b)((function(e){return{sessionLength:e.sessionLength}}),(function(e){return{incrementSession:function(){e({type:"INCREMENT_SESSION"})},decrementSession:function(){e({type:"DECREMENT_SESSION"})}}}))((function(e){return r.a.createElement("div",{className:"session"},r.a.createElement("div",{id:"session-label"},"Session Length"),r.a.createElement("button",{id:"session-decrement",onClick:e.decrementSession},"-"),r.a.createElement("span",{id:"session-length"},e.sessionLength),r.a.createElement("button",{id:"session-increment",onClick:e.incrementSession},"+"))}));var S=Object(c.b)((function(e){return{timeLeft:e.timeLeft,isReset:e.isReset}}),null)((function(e){var t=Object(s.useRef)(null);return null!=t.current&&(0!==e.timeLeft||e.isReset?e.isReset&&!t.current.paused&&(t.current.pause(),t.current.currentTime=0):t.current.play()),r.a.createElement("audio",{id:"beep",src:"https://goo.gl/65cBl1",ref:t})}));var I=Object(c.b)((function(e){return{timeLeft:e.timeLeft,isPaused:e.isPaused,isInSession:e.isInSession}}),(function(e){return{pauseTimer:function(){e((clearInterval(m),{type:"PAUSE_TIMER"}))},startTimer:function(){e((function(e){clearInterval(m),m=setInterval((function(){return e({type:"TICK"})}),1e3),e({type:"START_TIMER"})}))}}}))((function(e){var t=Math.floor(e.timeLeft/60),n=e.timeLeft%60,s=t<10?"0"+t:t,i=n<10?"0"+n:n;return r.a.createElement("div",{className:"timer"},r.a.createElement("div",{id:"timer-label"},e.isInSession?"Session":"Break"),r.a.createElement("div",{id:"time-left"},s,":",i),r.a.createElement("button",{id:"start_stop",onClick:e.isPaused?e.startTimer:e.pauseTimer},e.isPaused?"Start":"Stop"),r.a.createElement(S,null))}));var p=Object(c.b)(null,(function(e){return{reset:function(){e({type:"RESET"})}}}))((function(e){return r.a.createElement("button",{id:"reset",onClick:e.reset},"Reset")}));a.a.render(r.a.createElement(c.a,{store:h},r.a.createElement((function(){return r.a.createElement("div",{className:"pomodoro-clock"},r.a.createElement(d,null),r.a.createElement(k,null),r.a.createElement(I,null),r.a.createElement(p,null))}),null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[12,1,2]]]);
//# sourceMappingURL=main.d9c56860.chunk.js.map